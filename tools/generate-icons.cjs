// Erzeugt alle PNG-Icons aus public/pwa/icons/icon.svg.
// Aufruf: npm run icons
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ICON_DIR = path.join(__dirname, '..', 'public', 'pwa', 'icons');
const svg = fs.readFileSync(path.join(ICON_DIR, 'icon.svg'), 'utf8');

// radius: Eckenrundung in % (0 = randlos, für maskable und Apple)
const OUTPUTS = [
  { file: 'icon-192.png', size: 192, radius: 22 },
  { file: 'icon-512.png', size: 512, radius: 22 },
  { file: 'icon-maskable-512.png', size: 512, radius: 0 },
  { file: 'apple-touch-icon.png', size: 180, radius: 0 },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const { file, size, radius } of OUTPUTS) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(`<!doctype html>
      <style>
        html, body { margin: 0; background: transparent; }
        div { width: ${size}px; height: ${size}px; border-radius: ${radius}%; overflow: hidden; }
        svg { display: block; width: 100%; height: 100%; }
      </style>
      <div>${svg}</div>`);
    await page.screenshot({ path: path.join(ICON_DIR, file), omitBackground: true });
    console.log(`✓ ${file} (${size}×${size})`);
  }
  await browser.close();
})();
