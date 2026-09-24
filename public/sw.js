/*
 * Service Worker für www.alle-noten.de
 *
 * Muss unter https://www.alle-noten.de/sw.js liegen (Web-Root), damit er die ganze Seite abdeckt.
 *
 * Strategie – bewusst vorsichtig, weil es ein Shop ist:
 *   - HTML-Seiten werden NIE gecacht (Preise, Warenkorb, Kundenkonto bleiben immer aktuell).
 *     Ohne Netz erscheint stattdessen die Offline-Seite.
 *   - CSS/JS: zuerst Netz, Cache nur als Rückfall ohne Verbindung.
 *   - Bilder/Schriften: sofort aus dem Cache, im Hintergrund aktualisiert.
 *   - Fremde Domains (Zahlungsanbieter, Tracking …) und alles außer GET wird nicht angefasst.
 *
 * Nach Änderungen an dieser Datei oder an der Offline-Seite VERSION hochzählen.
 */
const VERSION = 'v1';
const PREFIX = 'alle-noten-';
const PRECACHE = `${PREFIX}precache-${VERSION}`;
const ASSET_CACHE = `${PREFIX}assets-${VERSION}`;
const MEDIA_CACHE = `${PREFIX}media-${VERSION}`;

const OFFLINE_URL = '/pwa/offline.html';
const MAX_ASSET_ENTRIES = 80;
const MAX_MEDIA_ENTRIES = 200;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then((cache) => cache.add(new Request(OFFLINE_URL, { cache: 'reload' })))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  const current = [PRECACHE, ASSET_CACHE, MEDIA_CACHE];
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(
      names
        .filter((name) => name.startsWith(PREFIX) && !current.includes(name))
        .map((name) => caches.delete(name))
    );
    if (self.registration.navigationPreload) {
      await self.registration.navigationPreload.enable();
    }
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(event));
    return;
  }

  switch (request.destination) {
    case 'style':
    case 'script':
      event.respondWith(networkFirst(event, ASSET_CACHE, MAX_ASSET_ENTRIES));
      break;
    case 'image':
    case 'font':
      event.respondWith(staleWhileRevalidate(event, MEDIA_CACHE, MAX_MEDIA_ENTRIES));
      break;
    // alles andere (API-Aufrufe, Audio, Downloads …) läuft normal übers Netz
  }
});

async function handleNavigation(event) {
  try {
    const preloaded = await event.preloadResponse;
    if (preloaded) return preloaded;
    return await fetch(event.request);
  } catch (error) {
    const offline = await caches.match(OFFLINE_URL, { cacheName: PRECACHE });
    return offline || Response.error();
  }
}

async function networkFirst(event, cacheName, maxEntries) {
  const { request } = event;
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (isCacheable(response)) {
      event.waitUntil(putAndTrim(cache, request, response.clone(), maxEntries));
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    throw error;
  }
}

async function staleWhileRevalidate(event, cacheName, maxEntries) {
  const { request } = event;
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fromNetwork = fetch(request).then((response) => {
    if (isCacheable(response)) {
      event.waitUntil(putAndTrim(cache, request, response.clone(), maxEntries));
    }
    return response;
  });
  if (cached) {
    event.waitUntil(fromNetwork.catch(() => {}));
    return cached;
  }
  return fromNetwork;
}

function isCacheable(response) {
  return response.status === 200
    && response.type === 'basic'
    && !/no-store/i.test(response.headers.get('Cache-Control') || '');
}

async function putAndTrim(cache, request, response, maxEntries) {
  await cache.put(request, response);
  const keys = await cache.keys();
  for (const key of keys.slice(0, Math.max(0, keys.length - maxEntries))) {
    await cache.delete(key);
  }
}
