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
  <text x="200" y="272" class="mid tm fm">A database full of facts and rules?</text>
</g>
<path d="M118 92 L282 248" class="fn sc s3" ${L(1, 'draw', { out: 2 })}/>
<path d="M282 92 L118 248" class="fn sc s3" ${L(1, 'draw', { d: 0.5, out: 2 })}/>
<g ${L(2, 'up')}>
  <rect x="130" y="140" width="140" height="104" rx="14" class="fp si"/>
  <text x="200" y="126" class="mid ts fm">one very long formula</text>
  <text x="50" y="166" class="mid tm">0.2</text><text x="50" y="198" class="mid tm">0.9</text><text x="50" y="230" class="mid tm">0.1</text>
  ${arrow(76, 192, 124, 192, 'i')}
  ${arrow(276, 192, 324, 192, 'i')}
  <text x="352" y="182" class="mid tm">0.7</text><text x="352" y="214" class="mid tm">0.3</text>
  <text x="50" y="126" class="mid ts fm">in</text><text x="352" y="126" class="mid ts fm">out</text>
</g>
<text x="200" y="74" class="mid tm fb" ${L(3, 'up')}>Image, text, sound → all become numbers</text>
<g ${L(4, 'pop')}>${dials}</g>
<g ${L(4, 'up')}>
  <text x="200" y="282" class="mid tm fa tb">Weights</text>
  <text x="200" y="306" class="mid ts fm">in language models: hundreds of billions</text>
</g>
<g ${L(5, 'up')}>
  <rect x="40" y="330" width="320" height="44" rx="12" class="fp"/>
  <text x="200" y="358" class="mid tm">Skill = how the dials are set</text>
</g>`;

// ---------- Szene 2: Ein Neuron ----------
const s2 = `
<g ${L(0, 'pop')}><circle cx="250" cy="190" r="46" class="fp si"/></g>
<text x="250" y="264" class="mid ts fm" ${L(0)}>Neuron</text>
<g ${L(1, 'up')}>
  <text x="60" y="78" class="mid ts fm">Inputs</text>
  <circle cx="60" cy="120" r="22" class="fn sm"/><text x="60" y="127" class="mid tl">2</text>
  <circle cx="60" cy="260" r="22" class="fn sm"/><text x="60" y="267" class="mid tl">3</text>
  <line x1="84" y1="127" x2="207" y2="174" class="sa"/>
  <line x1="84" y1="253" x2="207" y2="206" class="sc"/>
  <text x="142" y="128" class="mid tm fa tb">× 0.5</text>
  <text x="142" y="262" class="mid tm fc tb">× (−1)</text>
</g>
<text x="142" y="286" class="mid ts fc" ${L(2, 'up')}>counts against</text>
<g ${L(3, 'up')}>
  ${arrow(250, 84, 250, 140, 'b')}
  <text x="250" y="70" class="mid tm fb tb">Bias + 1</text>
  <text x="250" y="202" class="mid tx">Σ</text>
</g>
<g ${L(4, 'up')}>
  ${arrow(298, 190, 348, 190, 'i')}
  <text x="372" y="197" class="mid tl tb">−1</text>
  <rect x="40" y="318" width="320" height="48" rx="12" class="fp"/>
  <text x="200" y="350" class="mid tl">0.5·2 + (−1)·3 + 1 = −1</text>
</g>`;

// ---------- Szene 3: Der Knick ----------
const s3 = `
<g ${L(0)}>
  ${arrow(40, 240, 366, 240, 'm')}
  ${arrow(200, 336, 200, 60, 'm')}
  <text x="362" y="262" class="end ts fm">Input</text>
  <text x="210" y="70" class="ts fm">Output</text>
  <text x="208" y="258" class="ts fm">0</text>
</g>
<path d="M40 240 L200 240" class="fn sc s3" ${L(1, 'draw')}/>
<path d="M200 240 L330 110" class="fn sa s3" ${L(1, 'draw', { d: 3.2 })}/>
<text x="112" y="214" class="mid ts fc" ${L(1, 'up', { d: 2.2 })}>below zero → 0</text>
<text x="322" y="170" class="mid ts fa" ${L(1, 'up', { d: 5 })}>stays</text>
<g ${L(2, 'pop', { d: 2.5 })}><circle cx="140" cy="240" r="8" class="fb"/></g>
<text x="140" y="268" class="mid tm fb tb" ${L(2, 'up', { d: 2.5 })}>−1 → 0</text>
<path d="M40 237 C140 236 176 232 200 220 S 280 150 328 100" class="fn se dash" ${L(3)}/>
<text x="268" y="120" class="end ts fe" ${L(3, 'up')}>soft kink</text>
<g ${L(4)}><circle cx="200" cy="240" r="17" class="fn sb pulse"/></g>
<g ${L(4, 'up')}>
  <rect x="64" y="298" width="272" height="44" rx="12" class="fp"/>
  <text x="200" y="326" class="mid tm">Without the kink: worthless</text>
</g>`;

// ---------- Szene 4: Ohne Knick fällt alles zusammen ----------
const layerBox = (i) => `
  <rect x="40" y="${40 + 66 * i}" width="170" height="46" rx="10" class="fp si"/>
  <text x="125" y="${69 + 66 * i}" class="mid ts">Layer ${i + 1}:  × and +</text>`;
const s4 = `
<g ${L(0, 'up')}>
  ${layerBox(0)}
  ${[1, 2, 3].map((i) => `<g class="lay" data-l="2" data-fx="state" style="--dy:${-66 * i}px">${layerBox(i)}</g>`).join('')}
</g>
<g ${L(1, 'up')}>
  <text x="305" y="60" class="mid ts fm">first × and +</text>
  <text x="305" y="84" class="mid ts fm">then × and +</text>
  <text x="305" y="114" class="mid tm fb tb">= still × and +</text>
</g>
<text x="125" y="116" class="mid tm fa tb" ${L(2, 'up', { d: 1.6 })}>= one single layer</text>
<g ${L(3, 'up')}>
  ${arrow(235, 228, 384, 228, 'm')}
  ${arrow(305, 306, 305, 150, 'm')}
  <path d="M240 292 L372 164" class="fn sa s3"/>
  <text x="305" y="330" class="mid ts fa">straight lines only</text>
</g>
<g ${L(4)}>
  <path d="M240 270 C262 170 284 300 305 228 S 346 150 374 250" class="fn sb s3" data-l="4" data-fx="draw"/>
  <text x="352" y="150" class="mid ts fb">the world</text>
</g>
<g ${L(4, 'up', { d: 3 })}>
  <rect x="30" y="346" width="340" height="42" rx="12" class="fp"/>
  <text x="200" y="373" class="mid tm">The kink is what makes depth useful</text>
</g>`;

// ---------- Szene 5: Ein Neuron zieht eine Grenze ----------
const rnd = rng(7);
const cloud = Array.from({ length: 16 }, () => [70 + rnd() * 260, 70 + rnd() * 250]);
const dist = ([x, y]) => ((x - 60) * 140 - (y - 150) * 280) / 313; // > 0: aktive Seite (oben rechts)
const s5 = `
<g ${L(0)}>
  <rect x="50" y="50" width="300" height="290" rx="10" class="fp"/>
  <text x="200" y="366" class="mid ts fm">Input 1</text>
  <text x="34" y="200" class="mid ts fm" transform="rotate(-90 34 200)">Input 2</text>
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
<text x="296" y="322" class="mid ts fm" ${L(2, 'up', { out: 4 })}>silent</text>
<text x="296" y="78" class="mid ts fa tb" ${L(2, 'up', { out: 4 })}>farther = louder</text>
<g ${L(3, 'up')}>
  ${arrow(200, 220, 236, 148, 'b')}
  <text x="246" y="142" class="ts fb tb">direction</text>
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
<text x="200" y="346" class="mid tm" ${L(2, 'up')}>1969: proven impossible for one neuron</text>
<text x="200" y="376" class="mid tm fd tb" ${L(3, 'up', { d: 3.5 })}>Solution: one layer before it</text>`;

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
<text x="74" y="340" class="ts fm" ${L(1, 'up')}>fold line</text>
<path d="M170 310 L310 170" class="fn sd s3" ${L(2, 'draw')}/>
<text x="262" y="166" class="mid ts fa tb" ${L(2, 'up', { d: 2 })}>blue</text>
<text x="232" y="300" class="mid ts fb tb" ${L(2, 'up', { d: 3 })}>yellow</text>
<g ${L(3, 'up')}>
  ${net}
  <text x="105" y="158" class="mid ts fm">2 neurons with a kink</text>
</g>
<g ${L(3, 'up', { d: 2 })}>${arrow(206, 206, 264, 264, 'i')}</g>
<g ${L(4, 'up')}>
  <rect x="24" y="350" width="352" height="40" rx="12" class="fp"/>
  <text x="200" y="376" class="mid ts">Bend the space until the problem gets easy</text>
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
<text x="200" y="40" class="mid ts fm" ${L(0, 'up')}>Target curve: any relationship</text>
<g ${L(1, 'fade', { out: 2 })}>
  <polyline points="${pts(sample(4))}" class="fn sc s3" data-l="1" data-fx="draw"/>
  <text x="80" y="70" class="mid ts fc tb">2 kinks</text>
</g>
<g ${L(1, 'fade', { d: 3.4, out: 2 })}>
  <polyline points="${pts(sample(10))}" class="fn sb s3" data-l="1" data-d="3.4" data-fx="draw"/>
  <text x="200" y="70" class="mid ts fb tb">8 kinks</text>
</g>
<g ${L(1, 'fade', { d: 6 })}>
  <polyline points="${pts(sample(90))}" class="fn sa s3" data-l="1" data-d="6" data-fx="draw"/>
  <text x="320" y="70" class="mid ts fa tb">1000 kinks</text>
</g>
<text x="200" y="322" class="mid tm" ${L(2, 'up')}>Proven: any shape without jumps</text>
<text x="200" y="350" class="mid tm fb tb" ${L(3, 'up')}>The weights exist. But which ones?</text>
<text x="200" y="380" class="mid tm fa" ${L(4, 'up')}>Finding them is called training</text>`;

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
  <text x="100" y="180" class="mid ts fb tb">wide</text>
  ${deep}
  <text x="290" y="180" class="mid ts fa tb">deep</text>
  <text x="200" y="97" class="mid tl fm">?</text>
</g>
${doubling.map(([t, x, d]) => `<text x="${x}" y="226" class="mid tl tb${t === '1024' ? ' fa' : ''}" ${L(1, 'pop', { d })}>${t}</text>`).join('')}
<text x="200" y="250" class="mid ts fm" ${L(1, 'up')}>layers of paper after each fold</text>
<g ${L(2, 'up')}>
  ${arrow(40, 372, 182, 372, 'm')}
  ${arrow(40, 372, 40, 268, 'm')}
  <path d="M42 370 L174 350" class="fn sb s3"/>
  <path d="M42 370 C120 368 156 340 172 278" class="fn sa s3"/>
  <text x="188" y="284" class="ts fa tb">depth</text>
  <text x="188" y="354" class="ts fb tb">width</text>
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
  ${col(75, 'early layers')}${col(200, 'middle')}${col(325, 'late')}
  ${arrow(133, 183, 142, 183, 'm', { size: 7 })}${arrow(258, 183, 267, 183, 'm', { size: 7 })}
</g>
<g ${L(1, 'up')}>${edges}</g>
<text x="75" y="322" class="mid ts fa tb" ${L(1, 'up')}>Edges</text>
<g ${L(1, 'up', { d: 4.2 })}>${parts}</g>
<text x="200" y="322" class="mid ts fb tb" ${L(1, 'up', { d: 4.2 })}>Textures, parts</text>
<g ${L(2, 'up')}>${objects}</g>
<text x="325" y="322" class="mid ts fd tb" ${L(2, 'up')}>Objects</text>
<g ${L(3, 'up')}>
  <rect x="24" y="340" width="352" height="46" rx="12" class="fp"/>
  <text x="200" y="368" class="mid ts">The network works out what each dial means</text>
</g>`;

// ---------- Szene 11: Von vier Punkten zu Sprache ----------
const words = [
  ['king', 'a', 80, 130, 95, 135], ['queen', 'a', 290, 262, 140, 168], ['emperor', 'a', 190, 270, 70, 195],
  ['apple', 'b', 150, 200, 280, 120], ['pear', 'b', 80, 262, 315, 158],
  ['walk', 'd', 200, 112, 215, 240], ['run', 'd', 325, 190, 270, 268],
];
const s11 = `
<text x="200" y="208" class="mid tx tb" ${L(0, 'pop', { out: 1 })}>And language?</text>
<g ${L(1, 'up')}>
  <text x="66" y="52" class="mid tm tb">king</text>
  ${arrow(102, 47, 134, 47, 'm')}
  <text x="144" y="52" class="tm fm">[ 0.2   −1.3   0.8   … ]</text>
  <rect x="24" y="76" width="352" height="218" rx="14" class="fp"/>
  ${words.map(([w, c, x, y, tx, ty]) => `<g class="w" data-l="2" data-fx="state" style="--dx:${tx - x}px;--dy:${ty - y}px"><circle cx="${x}" cy="${y}" r="6" class="f${c}"/><text x="${x + 11}" y="${y + 5}" class="ts">${w}</text></g>`).join('')}
</g>
<text x="350" y="100" class="end ts fm" ${L(2, 'up', { d: 2 })}>similar things move together</text>
<g ${L(3, 'up')}>
  <text x="200" y="318" class="mid ts fm">Our mini network: 9 weights</text>
  <text x="200" y="340" class="mid tm tb">Language model: hundreds of billions</text>
</g>
<g ${L(4, 'up')}>
  <text x="200" y="370" class="mid tm fa tb">weigh → add → bend</text>
  <text x="200" y="391" class="mid ts fe">+ extra parts such as attention</text>
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
<g ${L(1, 'up')}>${row(26, 'Knowledge is smeared out', 'no single place holds a fact', smear)}</g>
<g ${L(2, 'up')}>${row(124, 'Computing, not looking up', 'even where it saw no examples', extrap)}</g>
<g ${L(3, 'up')}>${row(222, 'Similar things sit close', 'so new cases work too', near)}</g>
<text x="200" y="74" class="mid tx tb" ${L(0, 'pop', { out: 1 })}>Three consequences</text>
<g ${L(4, 'up')}>
  <text x="200" y="350" class="mid tl fa tb">weigh · add · bend</text>
  <text x="200" y="380" class="mid ts fm">Next AI episode: how a network learns</text>
</g>`;

// ---------- Szene: Nur eine Karikatur des Gehirns ----------
const sBio = `
<g ${L(0, 'up')}>
  <path d="M78 116 L52 92 M60 100 L44 110 M75 140 L48 158 M56 152 L40 142 M95 108 L92 78 M92 88 L78 70" class="fn sc"/>
  <path d="M117 132 C150 138 160 120 192 128" class="fn sc"/>
  <circle cx="95" cy="130" r="22" class="fk sc"/>
  <text x="112" y="196" class="mid ts fm">real nerve cell</text>
  <line x1="236" y1="100" x2="274" y2="122" class="sm"/><line x1="236" y1="160" x2="274" y2="138" class="sm"/>
  <circle cx="300" cy="130" r="28" class="fp si"/><text x="300" y="139" class="mid tl">Σ</text>
  <text x="300" y="196" class="mid ts fm">artificial neuron, 1943</text>
</g>
<g ${L(1, 'up')}>
  <path d="M40 244 H62 l4 -28 l4 28 H92 l4 -28 l4 28 H108 l4 -28 l4 28 H156 l4 -28 l4 28 H184" class="fn sc"/>
  <text x="112" y="268" class="mid ts fc tb">pulses, timing matters</text>
</g>
<g ${L(1, 'up', { d: 4 })}>
  <text x="300" y="242" class="mid tl tb fa">0.7</text>
  <text x="300" y="268" class="mid ts fa tb">just one number</text>
</g>
<g ${L(2, 'up')}>
  <text x="64" y="314" class="mid tl tb">86 billion</text><text x="64" y="334" class="mid ts fm">nerve cells</text>
</g>
<g ${L(2, 'up', { d: 2.2 })}>
  <text x="200" y="314" class="mid tl tb">100 trillion</text><text x="200" y="334" class="mid ts fm">connections</text>
</g>
<g ${L(2, 'up', { d: 4.6 })}>
  <text x="338" y="314" class="mid tl tb fb">20 watts</text><text x="338" y="334" class="mid ts fm">power use</text>
</g>
<g ${L(3, 'up')}>
  <rect x="24" y="350" width="352" height="40" rx="12" class="fp"/>
  <text x="200" y="375" class="mid ts">Borrowed: simple units, adjustable connections</text>
</g>`;

// ---------- Szene: Was am Ende herauskommt ----------
const bars = [['blue', 62, 'a'], ['clear', 14, 'm'], ['gray', 9, 'm'], ['dark', 5, 'm'], ['green', 1, 'm']];
const sOut = `
<g ${L(0, 'up')}>
  <text x="34" y="64" class="tl">The sky is</text>
  <rect x="160" y="38" width="96" height="38" rx="9" class="fn sm"/>
</g>
<text x="208" y="64" class="mid tl fm" ${L(0, 'fade', { out: 2 })}>?</text>
<g ${L(1, 'up')}>
  ${bars.map(([w, p, c], i) => `<text x="96" y="${131 + 34 * i}" class="end tm">${w}</text><rect x="108" y="${116 + 34 * i}" width="${(p * 3).toFixed(0)}" height="20" rx="5" class="f${c}"/><text x="${116 + p * 3}" y="${131 + 34 * i}" class="ts fm">${p} %</text>`).join('')}
  <text x="366" y="292" class="end ts fm">example values</text>
</g>
<text x="208" y="64" class="mid tl fa tb" ${L(2, 'pop')}>blue</text>
<text x="200" y="330" class="mid tm fb tb" ${L(2, 'up', { d: 3 })}>appended, then everything runs again</text>
<g ${L(3, 'up')}>
  <rect x="24" y="350" width="352" height="40" rx="12" class="fp"/>
  <text x="200" y="376" class="mid tm">Text is built word by word</text>
</g>`;

export default {
  id: '2026-11-17-ki-01',
  date: '2026-11-17',
  area: 'ki',
  series: 'Understanding AI',
  episode: 1,
  title: 'What a neural network actually computes',
  hook: 'No database, no rules: just weigh, add, bend. And why the kink, of all things, makes everything possible.',
  level: 2,
  poster: 7,
  voice: 'female',
  scenes: [
    {
      title: "No rules, just numbers",
      svg: s1,
      lines: [
        "When you talk to an AI, it's natural to assume there is a giant database of facts and rules inside.",
        "In fact, there is nothing of the kind. Not a single stored sentence, not a single if-then rule.",
        { text: "A neural network is one single, very long formula. Numbers go in, numbers come out.", de: [["neural network", "neuronales Netz"]] },
        "An image is just a list of brightness values. Text is turned into numbers first, too.",
        { text: "Inside the formula are adjustable dials, called weights. Large language models have hundreds of billions of them.", de: [["weights", "Gewichte"]] },
        "Everything the model can do lies in how those dials are set. Today, we look at what the formula actually computes.",
      ],
    },
    {
      title: "One neuron",
      svg: s2,
      lines: [
        "The building block is called a neuron. The name sounds like the brain, but the math behind it is school level.",
        { text: "A neuron receives several numbers as input. Each one is multiplied by its own weight.", de: [["input", "Eingabe"]] },
        "The weight says how much that input matters. A negative weight means: this input counts against.",
        { text: "Then everything is added up, plus one extra number called the bias. It shifts the point at which the neuron switches on.", de: [["bias", "Bias (Verschiebung)"]] },
        { text: "In the example: 0.5 times 2, plus minus 1 times 3, plus 1. That makes minus 1.", say: "In the example: zero point five times two, plus minus one times three, plus one. That makes minus one." },
      ],
    },
    {
      title: "Only a caricature of the brain",
      svg: sBio,
      lines: [
        { text: "How much brain is really in there? The idea dates from 1943, and even then it was a heavy simplification.", say: "How much brain is really in there? The idea dates from nineteen forty-three, and even then it was a heavy simplification." },
        { text: "A real nerve cell fires short pulses, and their timing matters. The artificial neuron knows no time, only a single number.", de: [["nerve cell", "Nervenzelle"]] },
        { text: "Your brain has about 86 billion nerve cells with roughly 100 trillion connections. And it runs on about 20 watts.", say: "Your brain has about eighty-six billion nerve cells with roughly one hundred trillion connections. And it runs on about twenty watts." },
        "Only one principle was borrowed: many simple units, connected with different strengths. Learning means changing those strengths.",
      ],
    },
    {
      title: "The kink",
      svg: s3,
      lines: [
        { text: "Now comes the step that everything depends on. The result is passed through a so-called activation function.", de: [["activation function", "Aktivierungsfunktion"]] },
        { text: "The most popular one is called ReLU, and it is surprisingly simple: anything below zero becomes zero. Anything above stays as it is.", say: "The most popular one is called ray-loo, and it is surprisingly simple: anything below zero becomes zero. Anything above stays as it is." },
        { text: "Drawn as a curve, that is a straight line with a kink. Our minus one from before becomes zero. The neuron stays silent.", de: [["kink", "Knick"]] },
        "There are versions with a softer kink. The idea stays the same.",
        "The kink looks unremarkable. But without it, the whole network would be worthless. That is the first point that is not obvious.",
      ],
    },
    {
      title: "Without the kink, everything collapses",
      quiz: {"q": "You stack 50 layers but remove the kink from every neuron. What can this network do?", "options": [{"text": "Exactly as much as a single layer", "correct": true, "why": "Multiplying and adding 50 times in a row is still just multiplying and adding, so all 50 layers merge into one."}, {"text": "About 50 times as much as one layer", "why": "More layers only help if each layer can do something new. Without the kink, every layer repeats the same kind of step."}, {"text": "Nothing at all, it stops working", "why": "It still computes something: straight-line relationships. It is just no more powerful than one single layer."}], "explain": "Think of currency exchange. Converting euros to dollars and then dollars to yen takes two steps, but one combined rate does the same job in a single step. Layers without a kink behave like that: each one only scales and shifts, and any chain of scaling and shifting can be replaced by one single scaling and shifting. The kink breaks this chain, because it treats values below zero differently from values above zero. That is the one thing a single combined step cannot imitate."},
      svg: s4,
      css: `.lay{transition:transform 1.2s cubic-bezier(.5,0,.2,1),opacity .5s .9s}.lay.on{transform:translateY(var(--dy));opacity:0}`,
      lines: [
        { text: "Imagine a network without the kink. Each layer only multiplies and adds.", de: [["layer", "Schicht"]] },
        "But multiplying and adding, done several times in a row, is still just multiplying and adding.",
        "So a hundred such layers can be merged into a single one. Mathematically, the result is exactly the same.",
        { text: "A network like that could only model straight-line relationships: double the input, double the effect.", de: [["straight-line (linear)", "linear"]] },
        "But the world is not a straight line. The kink is what makes depth useful, because each layer can do something the previous one could not.",
      ],
    },
    {
      title: "A neuron draws a boundary",
      svg: s5,
      css: `.grow{transform-box:fill-box;transform-origin:center;transition:transform .9s cubic-bezier(.2,.8,.2,1),opacity .5s;opacity:0}.grow.on{transform:scale(var(--s));opacity:1}`,
      lines: [
        "What does this mean geometrically? Take two inputs and plot them as a point on a surface.",
        { text: "A neuron draws a straight boundary across that surface. The weights set its direction, the bias sets its position.", de: [["boundary", "Grenze"]] },
        "On one side, the neuron stays silent. On the other, it gets louder the farther the point lies from the boundary.",
        "So a neuron is a detector for one single direction in space. Nothing more.",
        "A layer is many neurons side by side. They all see the same inputs, but each one looks in a different direction.",
      ],
    },
    {
      title: "The crossed-points problem",
      svg: s6,
      lines: [
        "And this is where it gets interesting. Look at these four points: two blue, two yellow, arranged crosswise.",
        { text: "Try to separate them with one single straight line. It cannot be done, however you turn it.", de: [["to separate", "trennen"]] },
        { text: "In the late 1960s, it was proven that a single neuron cannot solve this problem.", say: "In the late nineteen sixties, it was proven that a single neuron cannot solve this problem." },
        "That is one reason why enthusiasm for neural networks collapsed for many years. Yet the solution was just one layer away.",
      ],
    },
    {
      title: "Folding space",
      quiz: {"q": "Why can a network with one extra layer separate the crossed points when a single neuron cannot?", "options": [{"text": "The first layer reshapes the space so that one straight boundary is enough", "correct": true, "why": "The two neurons with a kink fold the sheet. After the fold, one straight line separates blue from yellow."}, {"text": "The extra neurons memorize where the four points are", "why": "Nothing is memorized. The neurons only measure distances from a line. What matters is what that does to the space."}, {"text": "With more neurons, the boundary itself can be drawn as a curve", "why": "Each neuron still draws a straight boundary. It only looks bent once you unfold the space again."}], "explain": "A single neuron can draw only one straight line, and no straight line puts both blue points on one side and both yellow points on the other. The extra layer does not draw a better line. It changes the map instead: it folds the sheet along the diagonal, so the two yellow points land on the same spot, away from the fold, while the blue points stay on the fold. On this new map the problem is easy. Deep networks repeat this move many times: each layer redraws the map for the next one."},
      svg: s7,
      css: css7,
      lines: [
        "The solution is one more layer in front, and you can picture it with a sheet of paper.",
        { text: "Fold the sheet along the diagonal through the two blue points. The yellow points now lie exactly on top of each other.", de: [["to fold", "falten"]] },
        "In the folded sheet, one straight boundary is enough: close to the fold is blue, farther away is yellow.",
        "That is exactly what two neurons with a kink do. Each measures the distance from the diagonal, one on each side.",
        "This is the basic principle of every neural network: bend the space, layer by layer, until the problem becomes easy.",
      ],
    },
    {
      title: "Many kinks make any shape",
      svg: s8,
      lines: [
        "This idea generalizes. Every neuron contributes one kink.",
        "With two kinks, you hit a curve only roughly. With eight, quite well. With a thousand, you can no longer see a difference.",
        { text: "It is mathematically proven: with enough neurons, you can rebuild practically any relationship without jumps, as precisely as you like.", de: [["proof", "Beweis"]] },
        "The catch: the proof only says that suitable weights exist. It does not say how to find them.",
        { text: "Finding them is the real trick. It is called training, and that is the topic of the next AI episode.", de: [["training", "Training (Lernen)"]] },
      ],
    },
    {
      title: "Depth beats width",
      svg: s9,
      lines: [
        "Why are networks built deep, with many layers in a row, instead of one single huge layer?",
        "Think of the paper again. One fold gives two layers, two folds give four. After ten folds, there are more than a thousand.",
        { text: "Each layer folds what the earlier ones already folded. With depth, expressive power can multiply. With width, it only grows slowly.", de: [["depth", "Tiefe"], ["width", "Breite"]] },
        "That is why the field is called deep learning. Depth is not a buzzword. It is the trick for building very complex shapes from few parts.",
      ],
    },
    {
      title: "What the layers learn",
      svg: s10,
      lines: [
        "What forms inside the layers can be made visible. In networks that recognize images, the same pattern shows up again and again.",
        { text: "The early layers respond to edges and color changes. The middle ones respond to textures and parts, such as an eye or a wheel.", de: [["edges", "Kanten"]] },
        "The late layers respond to whole objects. Nobody programmed that. This hierarchy emerges by itself during training.",
        "This may be the most astonishing part: we only build the empty formula. What each dial means, the network works out on its own.",
      ],
    },
    {
      title: "From four points to language",
      svg: s11,
      css: css11,
      lines: [
        "And what does this have to do with language? More than you might think.",
        "A word is also first turned into a list of numbers, so it becomes a point. Only this point lies in a space with thousands of directions instead of two.",
        { text: "The layers bend this space until things with similar meaning end up close together.", de: [["meaning", "Bedeutung"]] },
        "At its core, a language model does the same as our mini network. Just with hundreds of billions of weights instead of nine.",
        { text: "There are some extra parts, above all the so-called attention. But the basic computation stays: weigh, add, bend.", de: [["attention", "Attention (Aufmerksamkeit)"]] },
      ],
    },
    {
      title: "What comes out at the end",
      quiz: {"q": "A language model gets a question on a topic it saw almost no examples of. What happens inside?", "options": [{"text": "It computes an answer anyway, the same way as always", "correct": true, "why": "There is no lookup that could fail. The formula always produces probabilities for the next word, with good grounds or without."}, {"text": "It searches its stored texts and finds nothing", "why": "There are no stored texts to search. The model only has weights, and the formula always produces an output."}, {"text": "It notices the gap and reports that it does not know", "why": "Not automatically. Nothing in the formula checks whether knowledge is missing. Saying “I don't know” has to be learned like any other answer."}], "explain": "A language model has no database and no step where it checks whether it knows something. For every input, the formula produces a probability for each possible next word, and one word is drawn. In familiar territory, those probabilities reflect patterns from many examples. In unfamiliar territory, the same computation still runs and still produces fluent, confident-sounding words. That is why a made-up answer can sound just as convincing as a correct one: from the inside, both come from the same process."},
      svg: sOut,
      lines: [
        "What comes out of a language model at the end? Not a finished sentence, but once again a list of numbers.",
        { text: "For every possible next word, it holds a probability. After “The sky is”, for example: “blue” very high, “green” very low.", de: [["probability", "Wahrscheinlichkeit"]] },
        "One word is drawn from this list and appended. Then the whole formula runs again, for the next word.",
        "So a long text is built word by word, through thousands of runs of the same formula. How that works in detail gets its own episode.",
      ],
    },
    {
      title: "What follows from this",
      svg: s12,
      lines: [
        "Three things follow from this. They explain why AI behaves the way it does.",
        "First: knowledge does not sit in one place. It is smeared across millions of weights. That is why you cannot simply delete a mistake like a row in a database.",
        { text: "Second: the network looks nothing up, it computes. Even where it has never seen examples, it just keeps computing. That is the root of hallucinations.", de: [["hallucination", "Halluzination"]] },
        { text: "Third: the same property is its strength. Because similar things lie close together, it can handle cases it has never seen.", de: [["to generalize", "verallgemeinern"]] },
        "Remember three words: weigh, add, bend. In the next AI episode, we look at how a network finds its weights by itself.",
      ],
    },
  ],
  takeaways: [
    "A neural network is one long formula with adjustable numbers (weights). It contains no rules and no stored sentences.",
    "A neuron computes: inputs times weights, add everything up, add the bias, then pass it through the kink (ReLU: below zero becomes zero).",
    "Without the kink, any number of layers could be merged into a single one. The kink is what makes depth useful.",
    "Geometrically, each neuron draws a boundary. Layers fold the space until a hard problem can be solved with one straight boundary.",
    "Enough neurons can rebuild almost any relationship. Finding the right weights is the real difficulty (training).",
    "Knowledge is spread across the weights. That explains why mistakes are hard to delete, why models hallucinate, and why they can generalize.",
  ],
  sources: [
    "Minsky & Papert: Perceptrons (1969), on why a single neuron cannot solve XOR",
    "Cybenko (1989) and Hornik (1991): universal approximation theorem",
    "Montúfar, Pascanu, Cho & Bengio (2014): On the Number of Linear Regions of Deep Neural Networks",
    "Zeiler & Fergus (2014): Visualizing and Understanding Convolutional Networks",
    "Nair & Hinton (2010): Rectified Linear Units Improve Restricted Boltzmann Machines",
    "McCulloch & Pitts (1943): A Logical Calculus of the Ideas Immanent in Nervous Activity",
    "Azevedo et al. (2009): number of nerve cells in the human brain",
  ],
};
