#!/usr/bin/env node
// Sichtprüfung einer gebauten Lektion:  node tools/preview.cjs <lesson-id> <ausgabe-ordner>
// Startet die Seite lokal, springt in jede Szene (Mitte und Ende) und legt Übersichtsbilder
// (m1.png, m2.png, …) sowie home.png und lesson.png im Ausgabeordner ab.
// Danach die Bilder ansehen: Überlappungen, abgeschnittener Text, leere Tafeln?

const http = require('http');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { chromium } = require('playwright');

const id = process.argv[2];
const out = path.resolve(process.argv[3] || 'preview');
if (!id) { console.error('Aufruf: node tools/preview.cjs <lesson-id> <ausgabe-ordner>'); process.exit(1); }
const site = path.join(__dirname, '..', 'site');
const TYPES = { '.json': 'application/json', '.mp3': 'audio/mpeg', '.html': 'text/html; charset=utf-8' };
const WRAP_A = '<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light}body{margin:0;font:14px system-ui}img{max-width:100%}[hidden]{display:none!important}</style></head><body>';

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  if (url === '/' || url === '/index.html') {
    res.writeHead(200, { 'content-type': TYPES['.html'] });
    return res.end(WRAP_A + fs.readFileSync(path.join(site, 'index.html'), 'utf8') + '</body></html>');
  }
  const file = path.join(site, path.normalize(url));
  if (!file.startsWith(site) || !fs.existsSync(file)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

(async () => {
  fs.mkdirSync(out, { recursive: true });
  for (const f of fs.readdirSync(out)) if (/^(f\d+|m\d+|home|lesson)\.png$/.test(f)) fs.unlinkSync(path.join(out, f));
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port + '/';
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport: { width: 400, height: 860 }, deviceScaleFactor: 1 })).newPage();
  const errs = [];
  page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  page.on('pageerror', (e) => errs.push('Seitenfehler: ' + e.message));
  await page.goto(base);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(out, 'home.png'), fullPage: true });
  await page.goto(base + '#folge-' + id);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(out, 'lesson.png'), fullPage: true });
  const l = await page.evaluate(() => window.kopfkino.lesson());
  if (!l) { console.error('Lektion wurde nicht geladen', errs); process.exit(1); }
  let n = 0;
  for (let i = 0; i < l.scenes.length; i++) {
    const sc = l.scenes[i];
    const end = i + 1 < l.scenes.length ? l.scenes[i + 1].t : l.duration;
    const mid = sc.lines.length > 2 ? sc.lines[Math.ceil(sc.lines.length / 2)].t - 0.1 : end - 0.75;
    for (const t of [mid, end - 0.75]) {
      await page.evaluate((x) => window.kopfkino.seek(x), t);
      await page.waitForTimeout(2300);
      await page.locator('#stage').screenshot({ path: path.join(out, 'f' + String(n++).padStart(2, '0') + '.png') });
    }
  }
  await page.evaluate(() => window.kopfkino.seek(0));
  await page.click('#play');
  await page.waitForTimeout(3500);
  const st = await page.evaluate(() => ({ zeit: document.getElementById('t-now').textContent, laeuft: !document.getElementById('stage').classList.contains('paused'), tonOk: document.getElementById('audio-note').hidden }));
  await browser.close();
  server.close();
  for (let m = 0, start = 0; start < n; m++, start += 9) {
    execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-start_number', String(start), '-i', path.join(out, 'f%02d.png'), '-vf', 'tile=3x3:padding=6:color=white', '-frames:v', '1', path.join(out, 'm' + (m + 1) + '.png')]);
  }
  console.log('Abspieltest:', JSON.stringify(st));
  console.log('Konsolenfehler:', errs.length ? errs : 'keine');
  console.log('Bilder in', out, '(je Szene: Mitte, Ende; 9 pro Übersicht)');
  if (errs.length || !st.laeuft) process.exit(1);
})();
