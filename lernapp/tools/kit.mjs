// Kleine Helfer zum Schreiben der Szenen-SVGs (Tafel 400 x 400).
// Farbklassen: i=Kreide, m=gedämpft, a=Cyan, b=Bernstein, c=Koralle, d=Grün, e=Violett.
// f<farbe> füllt, s<farbe> zeichnet eine Linie. fn = keine Füllung, fp = Tafelfläche hell, fk = Tafelgrund.

/** Attribute für "erscheint ab Zeile l". fx: fade (Standard) | up | pop | draw | state. */
export function L(l, fx, o = {}) {
  let s = `data-l="${l}"`;
  if (fx && fx !== 'fade') s += ` data-fx="${fx}"`;
  if (o.d != null) s += ` data-d="${o.d}"`;
  if (o.out != null) s += ` data-out="${o.out}"`;
  return s;
}

const r1 = (n) => Math.round(n * 10) / 10;

/** Pfeil von (x1,y1) nach (x2,y2). c = Farbbuchstabe. o.attrs = Attribut-String für die Gruppe. */
export function arrow(x1, y1, x2, y2, c = 'i', o = {}) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const s = o.size || 10;
  const bx = x2 - Math.cos(a) * s;
  const by = y2 - Math.sin(a) * s;
  const p = (d) => `${r1(bx + Math.cos(a + Math.PI / 2) * d)},${r1(by + Math.sin(a + Math.PI / 2) * d)}`;
  return `<g ${o.attrs || ''}><line x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(bx)}" y2="${r1(by)}" class="s${c}${o.dash ? ' dash' : ''}"/><polygon points="${r1(x2)},${r1(y2)} ${p(s * 0.55)} ${p(-s * 0.55)}" class="f${c}"/></g>`;
}

/** Punktliste -> "x,y x,y" für polyline/polygon. */
export const pts = (arr) => arr.map(([x, y]) => `${r1(x)},${r1(y)}`).join(' ');

/** Reproduzierbarer Zufall (0..1), damit Builds stabil bleiben. */
export function rng(seed = 1) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
