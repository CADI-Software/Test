import { L, arrow, pts, rng } from '../../tools/kit.mjs';

// ---------- Szene 1: Keine Regeln, nur Zahlen ----------
const dial = (cx, cy, ang, delay) => {
  const r = (ang * Math.PI) / 180;
  return `<g class="wig" style="animation-delay:${delay}s"><circle cx="${cx}" cy="${cy}" r="12" class="fk sa"/><line x1="${cx}" y1="${cy}" x2="${(cx + 8 * Math.cos(r)).toFixed(1)}" y2="${(cy + 8 * Math.sin(r)).toFixed(1)}" class="sa"/></g>`;
};
const dials = [
  [152, 172, -60, 0], [184, 172, 30, -0.7], [216, 172, -120, -1.3], [248, 172, 80, -0.4],
  [152, 212, 140, -1.8], [184, 212, -20, -1.1], [216, 212, 60, -0.2], [248, 212, -150, -1.5],
].map((d) => dial(...d)).join('');

const s1 = `
<g ${L(0, 'up', { out: 2 })}>
  <ellipse cx="200" cy="120" rx="70" ry="18" class="fn sm"/>
  <path d="M130 120v90c0 10 31 18 70 18s70-8 70-18v-90" class="fn sm"/>
  <path d="M130 150c0 10 31 18 70 18s70-8 70-18M130 180c0 10 31 18 70 18s70-8 70-18" class="fn sm s1"/>
  <text x="200" y="272" class="mid tm fm">Datenbank voller Fakten und Regeln?</text>
</g>
<path d="M118 92 L282 248" class="fn sc s3" ${L(1, 'draw', { out: 2 })}/>
<path d="M282 92 L118 248" class="fn sc s3" ${L(1, 'draw', { d: 0.5, out: 2 })}/>
<g ${L(2, 'up')}>
  <rect x="130" y="140" width="140" height="104" rx="14" class="fp si"/>
  <text x="200" y="126" class="mid ts fm">eine sehr lange Formel</text>
  <text x="50" y="166" class="mid tm">0,2</text><text x="50" y="198" class="mid tm">0,9</text><text x="50" y="230" class="mid tm">0,1</text>
  ${arrow(76, 192, 124, 192, 'i')}
  ${arrow(276, 192, 324, 192, 'i')}
  <text x="352" y="182" class="mid tm">0,7</text><text x="352" y="214" class="mid tm">0,3</text>
  <text x="50" y="126" class="mid ts fm">rein</text><text x="352" y="126" class="mid ts fm">raus</text>
</g>
<text x="200" y="74" class="mid tm fb" ${L(3, 'up')}>Bild, Text, Ton → alles wird zu Zahlen</text>
<g ${L(4, 'pop')}>${dials}</g>
<g ${L(4, 'up')}>
  <text x="200" y="282" class="mid tm fa tb">Gewichte</text>
  <text x="200" y="306" class="mid ts fm">bei Sprachmodellen: Hunderte Milliarden</text>
</g>
<g ${L(5, 'up')}>
  <rect x="40" y="330" width="320" height="44" rx="12" class="fp"/>
  <text x="200" y="358" class="mid tm">Können = Stellung der Schrauben</text>
</g>`;

// ---------- Szene 2: Ein Neuron ----------
const s2 = `
<g ${L(0, 'pop')}><circle cx="250" cy="190" r="46" class="fp si"/></g>
<text x="250" y="264" class="mid ts fm" ${L(0)}>Neuron</text>
<g ${L(1, 'up')}>
  <text x="60" y="78" class="mid ts fm">Eingaben</text>
  <circle cx="60" cy="120" r="22" class="fn sm"/><text x="60" y="127" class="mid tl">2</text>
  <circle cx="60" cy="260" r="22" class="fn sm"/><text x="60" y="267" class="mid tl">3</text>
  <line x1="84" y1="127" x2="207" y2="174" class="sa"/>
  <line x1="84" y1="253" x2="207" y2="206" class="sc"/>
  <text x="142" y="128" class="mid tm fa tb">× 0,5</text>
  <text x="142" y="262" class="mid tm fc tb">× (−1)</text>
</g>
<text x="142" y="286" class="mid ts fc" ${L(2, 'up')}>spricht dagegen</text>
<g ${L(3, 'up')}>
  ${arrow(250, 84, 250, 140, 'b')}
  <text x="250" y="70" class="mid tm fb tb">Bias + 1</text>
  <text x="250" y="202" class="mid tx">Σ</text>
</g>
<g ${L(4, 'up')}>
  ${arrow(298, 190, 348, 190, 'i')}
  <text x="372" y="197" class="mid tl tb">−1</text>
  <rect x="40" y="318" width="320" height="48" rx="12" class="fp"/>
  <text x="200" y="350" class="mid tl">0,5·2 + (−1)·3 + 1 = −1</text>
</g>`;

// ---------- Szene 3: Der Knick ----------
const s3 = `
<g ${L(0)}>
  ${arrow(40, 240, 366, 240, 'm')}
  ${arrow(200, 336, 200, 60, 'm')}
  <text x="362" y="262" class="end ts fm">Eingang</text>
  <text x="210" y="70" class="ts fm">Ausgang</text>
  <text x="208" y="258" class="ts fm">0</text>
</g>
<path d="M40 240 L200 240" class="fn sc s3" ${L(1, 'draw')}/>
<path d="M200 240 L330 110" class="fn sa s3" ${L(1, 'draw', { d: 3.2 })}/>
<text x="112" y="214" class="mid ts fc" ${L(1, 'up', { d: 2.2 })}>unter null → 0</text>
<text x="322" y="170" class="mid ts fa" ${L(1, 'up', { d: 5 })}>bleibt</text>
<g ${L(2, 'pop', { d: 2.5 })}><circle cx="140" cy="240" r="8" class="fb"/></g>
<text x="140" y="268" class="mid tm fb tb" ${L(2, 'up', { d: 2.5 })}>−1 → 0</text>
<path d="M40 237 C140 236 176 232 200 220 S 280 150 328 100" class="fn se dash" ${L(3)}/>
<text x="268" y="120" class="end ts fe" ${L(3, 'up')}>weicher Knick</text>
<g ${L(4)}><circle cx="200" cy="240" r="17" class="fn sb pulse"/></g>
<g ${L(4, 'up')}>
  <rect x="64" y="298" width="272" height="44" rx="12" class="fp"/>
  <text x="200" y="326" class="mid tm">Ohne Knick wäre das Netz wertlos</text>
</g>`;

// ---------- Szene 4: Ohne Knick fällt alles zusammen ----------
const layerBox = (i) => `
  <rect x="40" y="${40 + 66 * i}" width="170" height="46" rx="10" class="fp si"/>
  <text x="125" y="${69 + 66 * i}" class="mid ts">Schicht ${i + 1}:  × und +</text>`;
const s4 = `
<g ${L(0, 'up')}>
  ${layerBox(0)}
  ${[1, 2, 3].map((i) => `<g class="lay" data-l="2" data-fx="state" style="--dy:${-66 * i}px">${layerBox(i)}</g>`).join('')}
</g>
<g ${L(1, 'up')}>
  <text x="305" y="60" class="mid ts fm">erst × und +</text>
  <text x="305" y="84" class="mid ts fm">dann × und +</text>
  <text x="305" y="114" class="mid tm fb tb">= wieder × und +</text>
</g>
<text x="125" y="116" class="mid tm fa tb" ${L(2, 'up', { d: 1.6 })}>= eine einzige Schicht</text>
<g ${L(3, 'up')}>
  ${arrow(235, 228, 384, 228, 'm')}
  ${arrow(305, 306, 305, 150, 'm')}
  <path d="M240 292 L372 164" class="fn sa s3"/>
  <text x="305" y="330" class="mid ts fa">kann nur Geraden</text>
</g>
<g ${L(4)}>
  <path d="M240 270 C262 170 284 300 305 228 S 346 150 374 250" class="fn sb s3" data-l="4" data-fx="draw"/>
  <text x="352" y="150" class="mid ts fb">die Welt</text>
</g>
<g ${L(4, 'up', { d: 3 })}>
  <rect x="30" y="346" width="340" height="42" rx="12" class="fp"/>
  <text x="200" y="373" class="mid tm">Erst der Knick macht Tiefe sinnvoll</text>
</g>`;

// ---------- Szene 5: Ein Neuron zieht eine Grenze ----------
const rnd = rng(7);
const cloud = Array.from({ length: 16 }, () => [70 + rnd() * 260, 70 + rnd() * 250]);
const dist = ([x, y]) => ((x - 60) * 140 - (y - 150) * 280) / 313; // > 0: aktive Seite (oben rechts)
const s5 = `
<g ${L(0)}>
  <rect x="50" y="50" width="300" height="290" rx="10" class="fp"/>
  <text x="200" y="366" class="mid ts fm">Eingabe 1</text>
  <text x="34" y="200" class="mid ts fm" transform="rotate(-90 34 200)">Eingabe 2</text>
</g>
<polygon points="50,60 60,50 340,50 350,60 350,295 50,145" class="fa" style="opacity:.14" ${L(2)}/>
<g ${L(0, 'pop')}>
  ${cloud.map((p) => {
    const d = dist(p);
    return d > 6
      ? `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="5" class="fm"/><g class="grow" data-l="2" data-fx="state" style="--s:${(1 + d / 60).toFixed(2)}"><circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="5" class="fa"/></g>`
      : `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="5" class="fm"/>`;
  }).join('')}
</g>
<path d="M50 145 L350 295" class="fn si s3" ${L(1, 'draw')}/>
<text x="296" y="322" class="mid ts fm" ${L(2, 'up', { out: 4 })}>stumm</text>
<text x="296" y="78" class="mid ts fa tb" ${L(2, 'up', { out: 4 })}>je weiter, desto lauter</text>
<g ${L(3, 'up')}>
  ${arrow(200, 220, 236, 148, 'b')}
  <text x="246" y="142" class="ts fb tb">Richtung</text>
</g>
<g ${L(4)}>
  <path d="M90 50 L250 340" class="fn sc dash"/>
  <path d="M50 290 L350 190" class="fn sd dash"/>
  <path d="M300 50 L160 340" class="fn se dash"/>
</g>`;

// ---------- Szene 6: Das Problem über Kreuz ----------
const s6 = `
<g ${L(0, 'up')}>
  <rect x="80" y="70" width="240" height="240" rx="12" class="fp"/>
  <circle cx="120" cy="110" r="15" class="fb"/><circle cx="280" cy="270" r="15" class="fb"/>
  <circle cx="120" cy="270" r="15" class="fa"/><circle cx="280" cy="110" r="15" class="fa"/>
</g>
<g ${L(1, 'fade', { out: 2 })}><line x1="50" y1="190" x2="350" y2="190" class="si dash spin"/></g>
<g ${L(2)}>
  <line x1="60" y1="250" x2="340" y2="130" class="sc dash"/>
  <path d="M186 176 L214 204 M214 176 L186 204" class="fn sc s3"/>
</g>
<text x="200" y="346" class="mid tm" ${L(2, 'up')}>1969 bewiesen: für ein Neuron unlösbar</text>
<text x="200" y="376" class="mid tm fd tb" ${L(3, 'up', { d: 3.5 })}>Lösung: eine Schicht davor</text>`;

// ---------- Szene 7: Der Raum wird gefaltet ----------
const net = (() => {
  const inp = [[40, 60], [40, 120]], hid = [[105, 60], [105, 120]], out = [170, 90];
  let s = '';
  for (const a of inp) for (const b of hid) s += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" class="sm s1"/>`;
  for (const b of hid) s += `<line x1="${b[0]}" y1="${b[1]}" x2="${out[0]}" y2="${out[1]}" class="sm s1"/>`;
  for (const a of inp) s += `<circle cx="${a[0]}" cy="${a[1]}" r="9" class="fk sm"/>`;
  for (const b of hid) s += `<circle cx="${b[0]}" cy="${b[1]}" r="9" class="fk sa"/>`;
  s += `<circle cx="${out[0]}" cy="${out[1]}" r="9" class="fk sd"/>`;
  return s;
})();
const s7 = `
<g ${L(0, 'up')}>
  <polygon points="310,90 310,310 90,310" class="fp"/>
  <circle cx="280" cy="280" r="14" class="fb"/>
  <g class="flap" data-l="1" data-fx="state" data-d="2.2">
    <polygon points="90,90 310,90 90,310" class="fq"/>
    <circle cx="120" cy="120" r="14" class="fb"/>
  </g>
  <circle cx="120" cy="280" r="14" class="fa"/><circle cx="280" cy="120" r="14" class="fa"/>
</g>
<path d="M82 318 L318 82" class="fn si dash" ${L(1)}/>
<text x="74" y="340" class="ts fm" ${L(1, 'up')}>Faltkante</text>
<path d="M170 310 L310 170" class="fn sd s3" ${L(2, 'draw')}/>
<text x="262" y="166" class="mid ts fa tb" ${L(2, 'up', { d: 2 })}>blau</text>
<text x="232" y="300" class="mid ts fb tb" ${L(2, 'up', { d: 3 })}>gelb</text>
<g ${L(3, 'up')}>
  ${net}
  <text x="105" y="158" class="mid ts fm">2 Neuronen mit Knick</text>
</g>
<g ${L(3, 'up', { d: 2 })}>${arrow(206, 206, 264, 264, 'i')}</g>
<g ${L(4, 'up')}>
  <rect x="24" y="350" width="352" height="40" rx="12" class="fp"/>
  <text x="200" y="376" class="mid ts">Raum verbiegen, bis das Problem einfach wird</text>
</g>`;
const css7 = `
.flap{transform-origin:0 0;transform:translate(200px,200px) rotate(-45deg) scaleY(1) rotate(45deg) translate(-200px,-200px);transition:transform 1.8s cubic-bezier(.6,0,.3,1)}
.flap.on{transform:translate(200px,200px) rotate(-45deg) scaleY(-1) rotate(45deg) translate(-200px,-200px)}`;

// ---------- Szene 8: Viele Knicke ergeben jede Form ----------
const f = (x) => {
  const u = ((x - 40) / 320) * 2 * Math.PI;
  return 190 - 62 * Math.sin(u) - 26 * Math.sin(2.5 * u + 0.6);
};
const sample = (n) => Array.from({ length: n }, (_, i) => { const x = 40 + (320 * i) / (n - 1); return [x, f(x)]; });
const s8 = `
<polyline points="${pts(sample(90))}" class="fn sm s3" style="opacity:.55" ${L(0)}/>
<text x="200" y="40" class="mid ts fm" ${L(0, 'up')}>Zielkurve: ein beliebiger Zusammenhang</text>
<g ${L(1, 'fade', { out: 2 })}>
  <polyline points="${pts(sample(4))}" class="fn sc s3" data-l="1" data-fx="draw"/>
  <text x="80" y="70" class="mid ts fc tb">2 Knicke</text>
</g>
<g ${L(1, 'fade', { d: 3.4, out: 2 })}>
  <polyline points="${pts(sample(10))}" class="fn sb s3" data-l="1" data-d="3.4" data-fx="draw"/>
  <text x="200" y="70" class="mid ts fb tb">8 Knicke</text>
</g>
<g ${L(1, 'fade', { d: 6 })}>
  <polyline points="${pts(sample(90))}" class="fn sa s3" data-l="1" data-d="6" data-fx="draw"/>
  <text x="320" y="70" class="mid ts fa tb">1000 Knicke</text>
</g>
<text x="200" y="322" class="mid tm" ${L(2, 'up')}>Bewiesen: jede Form ohne Sprünge</text>
<text x="200" y="350" class="mid tm fb tb" ${L(3, 'up')}>Gewichte existieren. Aber welche?</text>
<text x="200" y="380" class="mid tm fa" ${L(4, 'up')}>Das Finden heißt Training</text>`;

// ---------- Szene 9: Tiefe schlägt Breite ----------
const wide = (() => {
  const ys = [30, 50, 70, 90, 110, 130, 150];
  let s = '';
  for (const y of ys) s += `<line x1="46" y1="90" x2="100" y2="${y}" class="sm s1"/><line x1="100" y1="${y}" x2="154" y2="90" class="sm s1"/>`;
  s += `<circle cx="46" cy="90" r="7" class="fk sm"/><circle cx="154" cy="90" r="7" class="fk sm"/>`;
  for (const y of ys) s += `<circle cx="100" cy="${y}" r="7" class="fk sb"/>`;
  return s;
})();
const deep = (() => {
  const xs = [230, 260, 290, 320, 350], ys = [75, 105];
  let s = '';
  for (let i = 0; i < xs.length - 1; i++) for (const a of ys) for (const b of ys) s += `<line x1="${xs[i]}" y1="${a}" x2="${xs[i + 1]}" y2="${b}" class="sm s1"/>`;
  for (const x of xs) for (const y of ys) s += `<circle cx="${x}" cy="${y}" r="7" class="fk sa"/>`;
  return s;
})();
const doubling = [['2', 44, 0], ['4', 84, 1.2], ['8', 124, 2.2], ['16', 170, 2.9], ['32', 222, 3.5], ['…', 270, 4.2], ['1024', 330, 5.4]];
const s9 = `
<g ${L(0, 'up')}>
  ${wide}
  <text x="100" y="180" class="mid ts fb tb">breit</text>
  ${deep}
  <text x="290" y="180" class="mid ts fa tb">tief</text>
  <text x="200" y="97" class="mid tl fm">?</text>
</g>
${doubling.map(([t, x, d]) => `<text x="${x}" y="226" class="mid tl tb${t === '1024' ? ' fa' : ''}" ${L(1, 'pop', { d })}>${t}</text>`).join('')}
<text x="200" y="250" class="mid ts fm" ${L(1, 'up')}>Lagen nach jeder Faltung</text>
<g ${L(2, 'up')}>
  ${arrow(40, 372, 182, 372, 'm')}
  ${arrow(40, 372, 40, 268, 'm')}
  <path d="M42 370 L174 350" class="fn sb s3"/>
  <path d="M42 370 C120 368 156 340 172 278" class="fn sa s3"/>
  <text x="188" y="284" class="ts fa tb">Tiefe</text>
  <text x="188" y="354" class="ts fb tb">Breite</text>
</g>
<g ${L(3, 'up')}>
  <text x="320" y="318" class="mid tb" style="font-size:25px">Deep</text>
  <text x="320" y="348" class="mid tb" style="font-size:25px">Learning</text>
</g>`;

// ---------- Szene 10: Was die Schichten lernen ----------
const col = (cx, title) => `<rect x="${cx - 55}" y="66" width="110" height="234" rx="12" class="fp"/><text x="${cx}" y="50" class="mid ts fm">${title}</text>`;
const tile = (x, y, inner) => `<rect x="${x}" y="${y}" width="40" height="40" rx="6" class="fk"/>${inner}`;
const edges = [
  tile(30, 82, `<line x1="36" y1="102" x2="64" y2="102" class="sa"/>`),
  tile(80, 82, `<line x1="100" y1="88" x2="100" y2="116" class="sa"/>`),
  tile(30, 132, `<line x1="37" y1="165" x2="63" y2="139" class="sa"/>`),
  tile(80, 132, `<line x1="87" y1="139" x2="113" y2="165" class="sa"/>`),
  tile(30, 182, `<path d="M36 214 Q50 186 64 214" class="fn sa"/>`),
  tile(80, 182, `<rect x="80" y="182" width="20" height="40" rx="6" class="fa" style="opacity:.6"/>`),
  tile(30, 232, `<circle cx="50" cy="252" r="11" class="fn sa"/>`),
  tile(80, 232, `<path d="M88 262 L100 242 L112 262" class="fn sa"/>`),
].join('');
const parts = `
  <ellipse cx="200" cy="112" rx="30" ry="16" class="fn sb"/><circle cx="200" cy="112" r="8" class="fb"/>
  <circle cx="200" cy="184" r="26" class="fn sb"/><circle cx="200" cy="184" r="6" class="fb"/>
  <path d="M200 158 V210 M174 184 H226 M182 166 L218 202 M218 166 L182 202" class="fn sb s1"/>
  <path d="M164 262 l12 -16 l12 16 l12 -16 l12 16 l12 -16 l12 16" class="fn sb"/>
  <path d="M164 280 l12 -16 l12 16 l12 -16 l12 16 l12 -16 l12 16" class="fn sb"/>`;
const objects = `
  <circle cx="325" cy="124" r="34" class="fn sd"/>
  <circle cx="313" cy="116" r="4" class="fd"/><circle cx="337" cy="116" r="4" class="fd"/>
  <path d="M310 136 Q325 150 340 136" class="fn sd"/>
  <path d="M286 244 h78 v-16 q0 -6 -6 -6 h-12 l-10 -16 h-26 l-10 16 h-8 q-6 0 -6 6 z" class="fn sd"/>
  <circle cx="304" cy="246" r="9" class="fk sd"/><circle cx="346" cy="246" r="9" class="fk sd"/>`;
const s10 = `
<g ${L(0, 'up')}>
  ${col(75, 'erste Schichten')}${col(200, 'mittlere')}${col(325, 'hintere')}
  ${arrow(133, 183, 142, 183, 'm', { size: 7 })}${arrow(258, 183, 267, 183, 'm', { size: 7 })}
</g>
<g ${L(1, 'up')}>${edges}</g>
<text x="75" y="322" class="mid ts fa tb" ${L(1, 'up')}>Kanten</text>
<g ${L(1, 'up', { d: 4.2 })}>${parts}</g>
<text x="200" y="322" class="mid ts fb tb" ${L(1, 'up', { d: 4.2 })}>Texturen, Teile</text>
<g ${L(2, 'up')}>${objects}</g>
<text x="325" y="322" class="mid ts fd tb" ${L(2, 'up')}>Objekte</text>
<g ${L(3, 'up')}>
  <rect x="24" y="340" width="352" height="46" rx="12" class="fp"/>
  <text x="200" y="368" class="mid ts">Was die Schrauben bedeuten, findet das Netz selbst</text>
</g>`;

// ---------- Szene 11: Von vier Punkten zu Sprache ----------
const words = [
  ['König', 'a', 80, 130, 95, 135], ['Königin', 'a', 290, 262, 140, 168], ['Kaiser', 'a', 190, 270, 70, 195],
  ['Apfel', 'b', 150, 200, 280, 120], ['Birne', 'b', 80, 262, 315, 158],
  ['laufen', 'd', 200, 112, 215, 240], ['rennen', 'd', 325, 190, 270, 268],
];
const s11 = `
<text x="200" y="208" class="mid tx tb" ${L(0, 'pop', { out: 1 })}>Und Sprache?</text>
<g ${L(1, 'up')}>
  <text x="66" y="52" class="mid tm tb">König</text>
  ${arrow(102, 47, 134, 47, 'm')}
  <text x="144" y="52" class="tm fm">[ 0,2   −1,3   0,8   … ]</text>
  <rect x="24" y="76" width="352" height="218" rx="14" class="fp"/>
  ${words.map(([w, c, x, y, tx, ty]) => `<g class="w" data-l="2" data-fx="state" style="--dx:${tx - x}px;--dy:${ty - y}px"><circle cx="${x}" cy="${y}" r="6" class="f${c}"/><text x="${x + 11}" y="${y + 5}" class="ts">${w}</text></g>`).join('')}
</g>
<text x="350" y="100" class="end ts fm" ${L(2, 'up', { d: 2 })}>Ähnliches rückt zusammen</text>
<g ${L(3, 'up')}>
  <text x="200" y="318" class="mid ts fm">Mini-Netz: 9 Gewichte</text>
  <text x="200" y="340" class="mid tm tb">Sprachmodell: Hunderte Milliarden</text>
</g>
<g ${L(4, 'up')}>
  <text x="200" y="370" class="mid tm fa tb">gewichten → addieren → knicken</text>
  <text x="200" y="391" class="mid ts fe">+ Zusatzbauteile wie Attention</text>
</g>`;
const css11 = `
.w{transition:transform 1.8s cubic-bezier(.4,0,.2,1)}
.w.on{transform:translate(var(--dx),var(--dy))}`;

// ---------- Szene 12: Was daraus folgt ----------
const row = (y, title, sub, icon) => `
  <rect x="24" y="${y}" width="352" height="84" rx="14" class="fp"/>
  <g transform="translate(34 ${y + 12})">${icon}</g>
  <text x="122" y="${y + 37}" class="tm tb">${title}</text>
  <text x="122" y="${y + 60}" class="ts fm">${sub}</text>`;
const smear = (() => {
  const r = rng(3);
  let s = '';
  for (let i = 0; i < 4; i++) for (let j = 0; j < 5; j++) s += `<circle cx="${8 + j * 15}" cy="${8 + i * 15}" r="4.5" class="fa" style="opacity:${(0.2 + r() * 0.8).toFixed(2)}"/>`;
  return s;
})();
const extrap = `
  <path d="M2 46 C14 20 28 30 42 34" class="fn sb"/>
  <circle cx="6" cy="40" r="4" class="fb"/><circle cx="22" cy="27" r="4" class="fb"/><circle cx="40" cy="33" r="4" class="fb"/>
  <path d="M42 34 C54 38 64 20 76 4" class="fn sc dash"/>`;
const near = `
  <circle cx="18" cy="22" r="5" class="fd"/><circle cx="34" cy="14" r="5" class="fd"/><circle cx="30" cy="34" r="5" class="fd"/><circle cx="14" cy="42" r="5" class="fd"/>
  <circle cx="46" cy="30" r="6" class="fn si pulse"/>`;
const s12 = `
<g ${L(1, 'up')}>${row(26, 'Wissen ist verschmiert', 'kein Ort, an dem ein Fakt steht', smear)}</g>
<g ${L(2, 'up')}>${row(124, 'Rechnen statt Nachschlagen', 'auch dort, wo Beispiele fehlen', extrap)}</g>
<g ${L(3, 'up')}>${row(222, 'Ähnliches liegt nah', 'deshalb klappt auch Unbekanntes', near)}</g>
<text x="200" y="74" class="mid tx tb" ${L(0, 'pop', { out: 1 })}>Drei Folgen</text>
<g ${L(4, 'up')}>
  <text x="200" y="350" class="mid tl fa tb">gewichten · addieren · knicken</text>
  <text x="200" y="380" class="mid ts fm">Nächste KI-Folge: Wie ein Netz lernt</text>
</g>`;

// ---------- Szene: Nur eine Karikatur des Gehirns ----------
const sBio = `
<g ${L(0, 'up')}>
  <path d="M78 116 L52 92 M60 100 L44 110 M75 140 L48 158 M56 152 L40 142 M95 108 L92 78 M92 88 L78 70" class="fn sc"/>
  <path d="M117 132 C150 138 160 120 192 128" class="fn sc"/>
  <circle cx="95" cy="130" r="22" class="fk sc"/>
  <text x="112" y="196" class="mid ts fm">echte Nervenzelle</text>
  <line x1="236" y1="100" x2="274" y2="122" class="sm"/><line x1="236" y1="160" x2="274" y2="138" class="sm"/>
  <circle cx="300" cy="130" r="28" class="fp si"/><text x="300" y="139" class="mid tl">Σ</text>
  <text x="300" y="196" class="mid ts fm">künstliches Neuron, 1943</text>
</g>
<g ${L(1, 'up')}>
  <path d="M40 244 H62 l4 -28 l4 28 H92 l4 -28 l4 28 H108 l4 -28 l4 28 H156 l4 -28 l4 28 H184" class="fn sc"/>
  <text x="112" y="268" class="mid ts fc tb">Impulse, der Zeitpunkt zählt</text>
</g>
<g ${L(1, 'up', { d: 4 })}>
  <text x="300" y="242" class="mid tl tb fa">0,7</text>
  <text x="300" y="268" class="mid ts fa tb">nur eine Zahl</text>
</g>
<g ${L(2, 'up')}>
  <text x="70" y="314" class="mid tl tb">86 Mrd.</text><text x="70" y="334" class="mid ts fm">Nervenzellen</text>
</g>
<g ${L(2, 'up', { d: 2.2 })}>
  <text x="200" y="314" class="mid tl tb">100 Billionen</text><text x="200" y="334" class="mid ts fm">Verbindungen</text>
</g>
<g ${L(2, 'up', { d: 4.6 })}>
  <text x="335" y="314" class="mid tl tb fb">20 Watt</text><text x="335" y="334" class="mid ts fm">Verbrauch</text>
</g>
<g ${L(3, 'up')}>
  <rect x="24" y="350" width="352" height="40" rx="12" class="fp"/>
  <text x="200" y="375" class="mid ts">Übernommen: viele Einheiten, verstellbare Verbindungen</text>
</g>`;

// ---------- Szene: Was am Ende herauskommt ----------
const bars = [['blau', 62, 'a'], ['grau', 14, 'm'], ['klar', 9, 'm'], ['weit', 5, 'm'], ['grün', 1, 'm']];
const sOut = `
<g ${L(0, 'up')}>
  <text x="34" y="64" class="tl">Der Himmel ist</text>
  <rect x="196" y="38" width="96" height="38" rx="9" class="fn sm"/>
</g>
<text x="244" y="64" class="mid tl fm" ${L(0, 'fade', { out: 2 })}>?</text>
<g ${L(1, 'up')}>
  ${bars.map(([w, p, c], i) => `<text x="96" y="${131 + 34 * i}" class="end tm">${w}</text><rect x="108" y="${116 + 34 * i}" width="${(p * 3).toFixed(0)}" height="20" rx="5" class="f${c}"/><text x="${116 + p * 3}" y="${131 + 34 * i}" class="ts fm">${p} %</text>`).join('')}
  <text x="366" y="292" class="end ts fm">Beispielwerte</text>
</g>
<text x="244" y="64" class="mid tl fa tb" ${L(2, 'pop')}>blau</text>
<text x="200" y="330" class="mid tm fb tb" ${L(2, 'up', { d: 3 })}>angehängt, dann rechnet alles noch einmal</text>
<g ${L(3, 'up')}>
  <rect x="24" y="350" width="352" height="40" rx="12" class="fp"/>
  <text x="200" y="376" class="mid tm">Text entsteht Wort für Wort</text>
</g>`;

export default {
  id: '2026-11-17-ki-01',
  date: '2026-11-17',
  area: 'ki',
  series: 'KI verstehen',
  episode: 1,
  title: 'Was ein neuronales Netz wirklich rechnet',
  hook: 'Keine Datenbank, keine Regeln: nur gewichten, addieren, knicken. Und warum ausgerechnet der Knick alles möglich macht.',
  level: 2,
  poster: 7,
  scenes: [
    {
      title: 'Keine Regeln, nur Zahlen',
      svg: s1,
      lines: [
        'Wenn du mit einer KI sprichst, liegt ein Gedanke nahe: Da drin steckt eine riesige Datenbank voller Fakten und Regeln.',
        'Tatsächlich steckt nichts davon drin. Kein gespeicherter Satz, keine einzige Wenn-dann-Regel.',
        'Ein neuronales Netz ist eine einzige, sehr lange Rechenformel. Zahlen gehen hinein, Zahlen kommen heraus.',
        'Ein Bild ist dafür eine Liste von Helligkeitswerten. Auch Text wird vorher in Zahlen übersetzt.',
        'In der Formel stecken Stellschrauben, die sogenannten Gewichte. Bei großen Sprachmodellen sind es Hunderte Milliarden.',
        'Alles, was das Modell kann, steckt in der Stellung dieser Schrauben. Heute schauen wir uns an, was die Formel genau rechnet.',
      ],
    },
    {
      title: 'Ein Neuron',
      svg: s2,
      lines: [
        'Der Baustein heißt Neuron. Der Name klingt nach Gehirn, die Rechnung dahinter ist aber Schulmathematik.',
        'Ein Neuron bekommt mehrere Zahlen als Eingabe. Jede wird mit einem eigenen Gewicht multipliziert.',
        'Das Gewicht sagt, wie wichtig dieser Eingang ist. Ein negatives Gewicht bedeutet: Dieser Eingang spricht dagegen.',
        'Dann wird alles addiert, plus eine Extrazahl, den sogenannten Bias. Er verschiebt, ab wann das Neuron anspringt.',
        { text: 'Im Beispiel: 0,5 mal 2, plus minus 1 mal 3, plus 1. Das ergibt minus 1.', say: 'Im Beispiel: Null Komma fünf mal zwei, plus minus eins mal drei, plus eins. Das ergibt minus eins.' },
      ],
    },
    {
      title: 'Nur eine Karikatur des Gehirns',
      svg: sBio,
      lines: [
        'Wie viel Gehirn steckt da wirklich drin? Die Idee stammt von 1943 und war schon damals eine starke Vereinfachung.',
        'Eine echte Nervenzelle feuert kurze Impulse, und es kommt auf deren Zeitpunkt an. Das künstliche Neuron kennt keine Zeit, nur eine Zahl.',
        'Dein Gehirn hat rund 86 Milliarden Nervenzellen mit etwa hundert Billionen Verbindungen. Und es kommt mit ungefähr zwanzig Watt aus.',
        'Übernommen wurde nur ein Prinzip: viele einfache Einheiten, deren Verbindungen unterschiedlich stark sind. Lernen heißt, diese Stärken zu verändern.',
      ],
    },
    {
      title: 'Der Knick',
      svg: s3,
      lines: [
        'Jetzt kommt der Schritt, auf den alles ankommt. Das Ergebnis läuft durch eine sogenannte Aktivierungsfunktion.',
        { text: 'Die beliebteste heißt ReLU und ist verblüffend simpel: Alles unter null wird zu null. Alles darüber bleibt, wie es ist.', say: 'Die beliebteste heißt Relu und ist verblüffend simpel: Alles unter null wird zu null. Alles darüber bleibt, wie es ist.' },
        'Als Kurve ist das eine Gerade mit einem Knick. Unsere minus eins von eben wird zu null. Das Neuron schweigt.',
        'Es gibt Varianten mit weicherem Knick. Die Idee bleibt dieselbe.',
        'Der Knick wirkt unscheinbar. Aber ohne ihn wäre das ganze Netz wertlos. Das ist der erste Punkt, der nicht offensichtlich ist.',
      ],
    },
    {
      title: 'Ohne Knick fällt alles zusammen',
      svg: s4,
      css: `.lay{transition:transform 1.2s cubic-bezier(.5,0,.2,1),opacity .5s .9s}.lay.on{transform:translateY(var(--dy));opacity:0}`,
      lines: [
        'Stell dir ein Netz ohne Knick vor. Jede Schicht multipliziert und addiert nur.',
        'Multiplizieren und Addieren hintereinander ergibt aber wieder nur Multiplizieren und Addieren.',
        'Hundert solcher Schichten lassen sich deshalb mathematisch exakt zu einer einzigen zusammenfassen.',
        'So ein Netz könnte nur gerade Zusammenhänge abbilden: doppelte Eingabe, doppelte Wirkung.',
        'Die Welt ist aber nicht gerade. Erst der Knick macht Tiefe sinnvoll, weil jede Schicht etwas tun kann, was die vorige nicht konnte.',
      ],
    },
    {
      title: 'Ein Neuron zieht eine Grenze',
      svg: s5,
      css: `.grow{transform-box:fill-box;transform-origin:center;transition:transform .9s cubic-bezier(.2,.8,.2,1),opacity .5s;opacity:0}.grow.on{transform:scale(var(--s));opacity:1}`,
      lines: [
        'Was bedeutet das geometrisch? Nimm zwei Eingaben und trag sie als Punkt auf einer Fläche ein.',
        'Ein Neuron zieht durch diese Fläche eine gerade Grenze. Die Gewichte bestimmen ihre Richtung, der Bias ihre Lage.',
        'Auf der einen Seite bleibt es stumm. Auf der anderen wird es umso lauter, je weiter der Punkt von der Grenze entfernt ist.',
        'Ein Neuron ist also ein Detektor für eine einzige Richtung im Raum. Mehr nicht.',
        'Eine Schicht besteht aus vielen Neuronen nebeneinander. Alle sehen dieselben Eingaben, aber jedes schaut in eine andere Richtung.',
      ],
    },
    {
      title: 'Das Problem über Kreuz',
      svg: s6,
      lines: [
        'Und hier wird es spannend. Schau dir diese vier Punkte an: zwei blaue, zwei gelbe, über Kreuz angeordnet.',
        'Versuch, sie mit einer einzigen geraden Linie zu trennen. Es geht nicht, egal wie du sie drehst.',
        'Ende der Sechzigerjahre wurde bewiesen, dass ein einzelnes Neuron dieses Problem nicht lösen kann.',
        'Auch deshalb brach die Begeisterung für neuronale Netze für viele Jahre ein. Dabei war die Lösung nur eine Schicht entfernt.',
      ],
    },
    {
      title: 'Der Raum wird gefaltet',
      svg: s7,
      css: css7,
      lines: [
        'Die Lösung ist eine Schicht davor, und du kannst sie dir mit einem Blatt Papier vorstellen.',
        'Falte das Blatt entlang der Diagonale durch die beiden blauen Punkte. Die gelben Punkte liegen jetzt genau aufeinander.',
        'Im gefalteten Blatt reicht eine einzige gerade Grenze: nah an der Faltkante blau, weiter weg gelb.',
        'Genau das leisten zwei Neuronen mit Knick. Jedes misst den Abstand zur Diagonale, eines auf der einen Seite, eines auf der anderen.',
        'Das ist das Grundprinzip jedes neuronalen Netzes: Schicht für Schicht den Raum so verbiegen, bis das Problem einfach wird.',
      ],
    },
    {
      title: 'Viele Knicke ergeben jede Form',
      svg: s8,
      lines: [
        'Das lässt sich verallgemeinern. Jedes Neuron steuert einen Knick bei.',
        'Mit zwei Knicken triffst du eine Kurve nur grob. Mit acht schon ziemlich gut. Mit tausend siehst du keinen Unterschied mehr.',
        'Es ist mathematisch bewiesen: Mit genügend Neuronen lässt sich praktisch jeder Zusammenhang ohne Sprünge beliebig genau nachbauen.',
        'Der Haken: Der Beweis sagt nur, dass passende Gewichte existieren. Er sagt nicht, wie man sie findet.',
        'Das Finden ist das eigentliche Kunststück. Es heißt Training, und darum geht es in der nächsten KI-Folge.',
      ],
    },
    {
      title: 'Tiefe schlägt Breite',
      svg: s9,
      lines: [
        'Warum baut man Netze tief, mit vielen Schichten hintereinander, statt eine einzige riesige Schicht zu nehmen?',
        'Denk wieder an das Papier. Einmal falten ergibt zwei Lagen, zweimal vier. Nach zehn Faltungen sind es über tausend.',
        'Jede Schicht faltet, was die vorigen schon gefaltet haben. Mit der Tiefe kann sich die Ausdruckskraft vervielfachen, mit der Breite wächst sie nur gemächlich.',
        { text: 'Deshalb heißt das Feld Deep Learning. Tiefe ist kein Modewort, sondern der Trick, mit wenigen Bauteilen sehr komplexe Formen zu bilden.' },
      ],
    },
    {
      title: 'Was die Schichten lernen',
      svg: s10,
      lines: [
        'Was dabei in den Schichten entsteht, kann man sichtbar machen. Bei Netzen, die Bilder erkennen, zeigt sich immer wieder dasselbe Muster.',
        'Die ersten Schichten reagieren auf Kanten und Farbübergänge. Die mittleren auf Texturen und Teile, etwa ein Auge oder ein Rad.',
        'Die hinteren Schichten reagieren auf ganze Objekte. Niemand hat das einprogrammiert. Diese Hierarchie entsteht beim Training von selbst.',
        'Das ist vielleicht das Erstaunlichste: Wir bauen nur die leere Formel. Was die einzelnen Schrauben bedeuten, findet das Netz selbst heraus.',
      ],
    },
    {
      title: 'Von vier Punkten zu Sprache',
      svg: s11,
      css: css11,
      lines: [
        'Und was hat das mit Sprache zu tun? Mehr, als man denkt.',
        'Auch ein Wort wird zuerst in eine Liste von Zahlen übersetzt, also in einen Punkt. Nur liegt der in einem Raum mit Tausenden Richtungen statt zwei.',
        'Die Schichten verbiegen diesen Raum, bis Dinge mit ähnlicher Bedeutung nah beieinander liegen.',
        'Ein Sprachmodell macht im Kern dasselbe wie unser Mini-Netz. Nur mit Hunderten Milliarden Gewichten statt neun.',
        'Dazu kommen einige Zusatzbauteile, vor allem die sogenannte Attention. Die Grundrechnung bleibt: gewichten, addieren, knicken.',
      ],
    },
    {
      title: 'Was am Ende herauskommt',
      svg: sOut,
      lines: [
        'Was kommt bei einem Sprachmodell am Ende heraus? Kein fertiger Satz, sondern wieder eine Liste von Zahlen.',
        'Für jedes mögliche nächste Wort steht dort eine Wahrscheinlichkeit. Nach „Der Himmel ist“ zum Beispiel: „blau“ sehr hoch, „grün“ sehr niedrig.',
        'Aus dieser Liste wird ein Wort gezogen und hinten angehängt. Dann rechnet die ganze Formel noch einmal, für das nächste Wort.',
        'Ein langer Text entsteht also Wort für Wort, durch Tausende Durchläufe derselben Formel. Wie das genau funktioniert, bekommt eine eigene Folge.',
      ],
    },
    {
      title: 'Was daraus folgt',
      svg: s12,
      lines: [
        'Daraus folgen drei Dinge, die erklären, warum sich KI so verhält, wie sie sich verhält.',
        'Erstens: Wissen liegt nicht an einem Ort. Es ist über Millionen Gewichte verschmiert. Deshalb lässt sich ein Fehler nicht einfach löschen wie eine Zeile in einer Datenbank.',
        'Zweitens: Das Netz schlägt nichts nach, es rechnet. Auch dort, wo es nie Beispiele gesehen hat, rechnet es einfach weiter. Das ist die Wurzel von Halluzinationen.',
        'Drittens: Dieselbe Eigenschaft ist seine Stärke. Weil Ähnliches nah beieinander liegt, kommt es auch mit Fällen zurecht, die es nie gesehen hat.',
        'Merk dir drei Wörter: gewichten, addieren, knicken. In der nächsten KI-Folge schauen wir uns an, wie ein Netz seine Gewichte selbst findet.',
      ],
    },
  ],
  takeaways: [
    'Ein neuronales Netz ist eine einzige lange Formel mit verstellbaren Zahlen (Gewichten). Es enthält keine Regeln und keine gespeicherten Sätze.',
    'Ein Neuron rechnet: Eingaben mal Gewichte, alles addieren, plus Bias, dann durch den Knick (ReLU: unter null wird null).',
    'Ohne den Knick ließen sich beliebig viele Schichten zu einer einzigen zusammenfassen. Erst er macht Tiefe sinnvoll.',
    'Geometrisch zieht jedes Neuron eine Grenze. Schichten falten den Raum, bis ein schwieriges Problem mit einer geraden Grenze lösbar ist.',
    'Genügend Neuronen können fast jeden Zusammenhang nachbilden. Die passenden Gewichte zu finden, ist die eigentliche Schwierigkeit (Training).',
    'Wissen liegt verteilt in den Gewichten. Das erklärt, warum Fehler schwer zu löschen sind, warum Modelle halluzinieren und warum sie verallgemeinern können.',
  ],
  sources: [
    'Minsky & Papert: Perceptrons (1969), zur Unlösbarkeit von XOR für ein einzelnes Neuron',
    'Cybenko (1989) und Hornik (1991): universeller Approximationssatz',
    'Montúfar, Pascanu, Cho & Bengio (2014): On the Number of Linear Regions of Deep Neural Networks',
    'Zeiler & Fergus (2014): Visualizing and Understanding Convolutional Networks',
    'Nair & Hinton (2010): Rectified Linear Units Improve Restricted Boltzmann Machines',
    'McCulloch & Pitts (1943): A Logical Calculus of the Ideas Immanent in Nervous Activity',
    'Azevedo et al. (2009): Zahl der Nervenzellen im menschlichen Gehirn',
  ],
};
