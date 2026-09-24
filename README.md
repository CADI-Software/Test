# alle-noten.de als App (PWA)

Dieses Paket macht aus **www.alle-noten.de** eine Progressive Web App: installierbar auf dem Handy-Homescreen, mit eigenem App-Icon, Vollbild ohne Browserleiste und einer Offline-Seite. Außerdem ist es die Grundlage, um die App in den **Google Play Store** zu bringen.

> **Wichtig:** Eine PWA muss auf der eigenen Domain laufen. Die Dateien aus `public/` müssen deshalb auf den Webserver von www.alle-noten.de hochgeladen werden. Das kann nur, wer den Shop betreibt bzw. technisch betreut.

## Inhalt

| Datei | Zweck | Kommt auf den Server nach |
|---|---|---|
| `public/sw.js` | Service Worker (Offline-Seite, Caching) | `/sw.js` (muss im Web-Root liegen!) |
| `public/pwa/manifest.json` | App-Name, Icons, Farben, Startseite | `/pwa/manifest.json` |
| `public/pwa/register-sw.js` | Aktiviert den Service Worker | `/pwa/register-sw.js` |
| `public/pwa/offline.html` | Wird angezeigt, wenn keine Verbindung besteht | `/pwa/offline.html` |
| `public/pwa/icons/` | App-Icons (**derzeit Platzhalter**) | `/pwa/icons/` |
| `snippets/head.html` | 5 Zeilen für das `<head>` jeder Shopseite | ins Shop-Template |
| `android/assetlinks.json` | Vorlage für den Play Store | `/.well-known/assetlinks.json` (erst in Schritt 3) |

## Schritt 1 – Logo und Farben anpassen

1. `public/pwa/icons/icon.svg` durch das echte Logo ersetzen (quadratisch, randlos; das Motiv muss im inneren Kreis mit 80 % Durchmesser liegen, weil Android die Ecken abschneidet).
2. PNG-Icons neu erzeugen:
   ```bash
   npm install
   npx playwright install chromium
   npm run icons
   ```
   Ohne Programmierkenntnisse geht es auch mit dem Bildgenerator auf [pwabuilder.com](https://www.pwabuilder.com) – Dateinamen dann wie in `public/pwa/icons/` benennen.
3. Hausfarbe eintragen: `theme_color` in `public/pwa/manifest.json` **und** `theme-color` in `snippets/head.html` (bestimmt die Farbe der Statusleiste). `background_color` ist die Farbe des Startbildschirms.

## Schritt 2 – In den Shop einbauen

1. Inhalt von `public/` ins Web-Root von www.alle-noten.de hochladen (es wird nur `sw.js` im Root angelegt, alles andere liegt unter `/pwa/`).
2. Den Inhalt von `snippets/head.html` ins `<head>` des Shop-Layouts einfügen, sodass er auf jeder Seite erscheint.
3. Prüfen: In Chrome am PC die Seite öffnen → `F12` → **Application** → **Manifest** (keine Fehler) und **Service workers** (Status „activated“). Auf dem Android-Handy bietet Chrome dann „App installieren“ an.

Falls der Shop eine Content-Security-Policy nutzt, müssen `manifest-src 'self'`, `worker-src 'self'` und `script-src 'self'` erlaubt sein.

## Schritt 3 – Google Play Store (Android)

Die PWA wird als **Trusted Web Activity** verpackt – eine kleine Android-App, die die Website im Vollbild öffnet und Updates automatisch von der Website bekommt.

1. Google-Play-Entwicklerkonto anlegen (einmalig 25 $).
2. Auf [pwabuilder.com](https://www.pwabuilder.com) `https://www.alle-noten.de` eingeben → **Package for stores** → **Android**. Package-ID z. B. `de.allenoten.app`. Heraus kommt eine `.aab`-Datei plus Signaturschlüssel. **Schlüssel und Passwörter sicher aufbewahren – ohne sie gibt es keine Updates.** (Alternative für Entwickler: Googles Kommandozeilen-Tool [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap).)
3. `.aab` in der Play Console hochladen. Unter **Test und Release → Einrichtung → App-Integrität** den **SHA-256-Fingerabdruck des App-Signaturschlüssels** kopieren.
4. Fingerabdruck in `android/assetlinks.json` eintragen (Package-ID ggf. anpassen) und die Datei nach `https://www.alle-noten.de/.well-known/assetlinks.json` hochladen. Erst damit verschwindet die Adressleiste in der App.
5. Bei neuen privaten Entwicklerkonten verlangt Google vor der Veröffentlichung einen geschlossenen Test mit mindestens 12 Testern über 14 Tage. Firmenkonten sind davon ausgenommen.

## iPhone

- **Ohne App Store:** Sobald Schritt 2 erledigt ist, können Nutzer in Safari auf **Teilen → Zum Home-Bildschirm** tippen. Die App startet dann im Vollbild mit eigenem Icon.
- **Mit App Store:** Apple lehnt Apps ab, die nur eine verpackte Website sind (Richtlinie 4.2). Dafür braucht es eine native Hülle (z. B. [Capacitor](https://capacitorjs.com)) mit echten App-Funktionen wie Push-Benachrichtigungen, außerdem das Apple Developer Program (99 €/Jahr) und einen Mac mit Xcode.

## So verhält sich der Service Worker

Bewusst vorsichtig, weil es ein Shop ist:

- **Shopseiten (HTML) werden nie zwischengespeichert** – Preise, Warenkorb und Kundenkonto sind immer aktuell. Ohne Netz erscheint die Offline-Seite.
- **CSS/JavaScript:** immer frisch vom Server; nur ohne Verbindung aus dem Cache.
- **Bilder/Schriften:** sofort aus dem Cache (max. 200 Einträge), im Hintergrund aktualisiert.
- **Fremde Domains** (Zahlungsanbieter, Tracking usw.) und Formular-Absendungen werden nicht angefasst.

Nach Änderungen an `sw.js` oder `offline.html` in `sw.js` die Konstante `VERSION` hochzählen (`'v1'` → `'v2'`), damit alle Geräte die neue Fassung laden.
