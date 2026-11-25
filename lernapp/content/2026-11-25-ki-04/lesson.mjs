import { L, arrow, pts } from '../../tools/kit.mjs';

const box = (y, text, l, o = {}, cls = 'ts') => `
<g ${L(l, 'up', o)}>
  <rect x="24" y="${y}" width="352" height="42" rx="12" class="fp"/>
  <text x="200" y="${y + 27}" class="mid ${cls}">${text}</text>
</g>`;
const chips = (items, y, l, c = '') => items.map(([t, x, w], i) => `<g ${L(l, 'pop', { d: 0.6 + i * 1.2 })}><rect x="${x}" y="${y}" width="${w}" height="34" rx="10" class="fp"/><text x="${x + w / 2}" y="${y + 22}" class="mid ts ${c}">${t}</text></g>`).join('');
const dial = (cx, cy, ang, c = 'a', r = 14) => { const a = (ang * Math.PI) / 180; return `<circle cx="${cx}" cy="${cy}" r="${r}" class="fk s${c}"/><line x1="${cx}" y1="${cy}" x2="${(cx + (r - 4) * Math.cos(a)).toFixed(1)}" y2="${(cy + (r - 4) * Math.sin(a)).toFixed(1)}" class="s${c}"/>`; };

// Verlustkurve: loss = (2w - 10)^2
const WX = (w) => 40 + w * 32;
const LY = (loss) => 300 - loss * 3;
const lossOf = (w) => (2 * w - 10) ** 2;
const curve = `<polyline points="${pts(Array.from({ length: 45 }, (_, i) => { const w = 0.6 + i * 0.2; return [WX(w), LY(lossOf(w))]; }))}" class="fn sm s3"/>`;
const axes = `<path d="M40 300 H366" class="fn sm s1"/><text x="360" y="322" class="end ts fm">the weight</text><text x="46" y="62" class="ts fm">the loss</text>${[1, 3, 5, 7].map((w) => `<path d="M${WX(w)} 296 V304" class="fn sm s1"/><text x="${WX(w)}" y="322" class="mid ts fm">${w}</text>`).join('')}`;
const dot = (w, c, r = 8) => `<circle cx="${WX(w).toFixed(1)}" cy="${LY(lossOf(w)).toFixed(1)}" r="${r}" class="f${c}"/>`;

// ---------- 1: Nobody programs it ----------
const grid = Array.from({ length: 24 }, (_, i) => dial(62 + (i % 8) * 40, 96 + Math.floor(i / 8) * 40, (i * 67) % 360, 'a', 13)).join('');
const s1 = `
<g ${L(0, 'up')}>${grid}<text x="200" y="56" class="mid ts fm">hundreds of billions of dials</text></g>
<text x="200" y="244" class="mid tl tb fb" ${L(1, 'up')}>who sets them?</text>
<text x="200" y="272" class="mid ts fm" ${L(1, 'up', { d: 2.5 })}>nobody, by hand</text>
${chips([['one dial', 24, 96], ['one example', 130, 116], ['worked by hand', 256, 120]], 300, 2)}
<text x="200" y="372" class="mid ts fm" ${L(3, 'up')}>slowly, step by step</text>`;

// ---------- 2: The example ----------
const s2 = `
<g ${L(0, 'up')}>
  <path d="M60 150 H340" class="fn sm dash"/>
  <path d="M44 150 v-22 l16 -14 l16 14 v22 z" class="fp si"/><path d="M324 150 v-22 l16 -14 l16 14 v22 z" class="fp si"/>
  <text x="200" y="138" class="mid tm">2 km</text>
  <text x="200" y="60" class="mid ts fm">a delivery: how long will it take?</text>
</g>
<g ${L(1, 'up')}>
  <rect x="40" y="186" width="320" height="56" rx="14" class="fp"/>
  <text x="200" y="221" class="mid tm">time = <tspan class="fa tb">weight</tspan> × distance</text>
</g>
<g ${L(2, 'up')}>
  ${dial(120, 300, -90, 'a', 26)}
  <text x="170" y="296" class="tm tb fa">the weight</text>
  <text x="170" y="318" class="ts fm">one single dial</text>
</g>
<g ${L(3, 'pop')}><text x="326" y="304" class="mid tx tb fa">1</text><text x="326" y="330" class="mid ts fm">a random start</text></g>`;

// ---------- 3: First guess, and how wrong ----------
const s3 = `
<g ${L(0, 'up')}>
  <text x="40" y="70" class="ts">the guess</text><rect x="130" y="56" width="40" height="20" rx="6" class="fa"/><text x="180" y="72" class="tm tb fa">2 min</text>
</g>
<g ${L(1, 'up')}>
  <text x="40" y="110" class="ts">the truth</text><rect x="130" y="96" width="200" height="20" rx="6" class="fd"/><text x="340" y="112" class="tm tb fd">10</text>
</g>
<g ${L(2, 'up')}>
  <path d="M170 134 H330" class="fn sc"/><path d="M170 128 V140 M330 128 V140" class="fn sc"/>
  <text x="250" y="160" class="mid tm fc tb">the error: 8 minutes too low</text>
</g>
<g ${L(3, 'up')}>
  <rect x="40" y="188" width="320" height="86" rx="14" class="fp"/>
  <text x="200" y="218" class="mid ts fm">the loss = the error times itself</text>
  <text x="200" y="256" class="mid tx tb fb">8 × 8 = 64</text>
</g>
<text x="200" y="306" class="mid ts" ${L(4, 'up')}>one number for “how bad”</text>
<text x="200" y="330" class="mid ts fm" ${L(4, 'up', { d: 3 })}>big mistakes count much more than small ones</text>`;

// ---------- 4: The wiggle test ----------
const s4 = `
<g ${L(0, 'up')}>
  ${dial(100, 96, -90, 'a', 30)}<text x="100" y="152" class="mid tm tb fa">1</text>
</g>
<g ${L(1, 'up')}>
  ${arrow(146, 96, 250, 96, 'm')}
  ${dial(300, 96, -78, 'a', 30)}<text x="300" y="152" class="mid tm tb fa">1.01</text>
  <text x="198" y="82" class="mid ts fm">a tiny turn</text>
</g>
<g ${L(2, 'up')}>
  <text x="100" y="206" class="mid tl tb">64</text>
  ${arrow(146, 200, 250, 200, 'd')}
  <text x="300" y="206" class="mid tl tb fd">63.68</text>
  <text x="200" y="236" class="mid ts fd tb">the loss fell: this direction helps</text>
</g>
<g ${L(3, 'up')}>
  <rect x="40" y="262" width="320" height="76" rx="14" class="fp"/>
  <text x="200" y="290" class="mid ts fm">how strongly the loss reacts</text>
  <text x="200" y="320" class="mid tl tb fb">the slope: −32</text>
</g>
<text x="200" y="366" class="mid ts fm" ${L(4, 'up')}>minus means: turn the dial up</text>`;

// ---------- 5: The blind hiker ----------
const s5 = `
<g ${L(0, 'up')}>
  <path d="M30 110 C90 110 110 300 200 300 S 310 110 370 110" class="fn sm s3"/>
  <circle cx="86" cy="156" r="10" class="fb"/>
  <text x="200" y="50" class="mid ts fm">a mountain in thick fog</text>
</g>
<g ${L(1, 'up')}>
  <text x="46" y="74" class="ts fm">height = the loss</text>
  <text x="46" y="94" class="ts fm">position = the setting of the dial</text>
</g>
<g ${L(2, 'up')}>
  ${arrow(98, 172, 132, 232, 'b')}
  <text x="204" y="180" class="mid ts fb tb">feel the slope,</text><text x="204" y="198" class="mid ts fb tb">step downhill</text>
</g>
<g ${L(3, 'pop')}><circle cx="200" cy="300" r="8" class="fd"/></g>
<text x="200" y="328" class="mid ts fd tb" ${L(3, 'up')}>the valley: smallest loss</text>
${box(350, 'this is called gradient descent', 4)}`;

// ---------- 6: One step ----------
const s6 = `
<g ${L(0, 'up')}>${axes}${curve}${dot(1, 'c')}<text x="${WX(1) + 14}" y="${LY(64) - 4}" class="ts fc tb">loss 64</text></g>
<g ${L(1, 'up')}>
  <rect x="150" y="60" width="226" height="74" rx="14" class="fp"/>
  <text x="263" y="86" class="mid ts fm">step = slope × learning rate</text>
  <text x="263" y="116" class="mid tm tb">32 × 0.1 = 3.2</text>
</g>
<g ${L(2, 'up')}>
  ${arrow(WX(1) + 10, LY(64) + 14, WX(4.2) - 10, LY(2.56) - 12, 'b')}
  ${dot(4.2, 'b')}
  <text x="208" y="226" class="mid ts fb tb">weight 4.2</text>
</g>
<g ${L(3, 'up')}>
  <text x="208" y="246" class="mid ts fb">guess 8.4 min</text>
</g>
${box(338, 'loss: from 64 down to 2.56, in one step', 4)}`;

// ---------- 7: And again ----------
const stepRow = (i, w, g, l, c) => `<text x="40" y="${96 + i * 32}" class="ts fm">step ${i}</text><text x="150" y="${96 + i * 32}" class="mid tm tb f${c}">${w}</text><text x="236" y="${96 + i * 32}" class="mid ts">${g}</text><text x="330" y="${96 + i * 32}" class="mid tm tb f${c}">${l}</text>`;
const s7 = `
<g ${L(0, 'up')}>
  <text x="150" y="60" class="mid ts fm">weight</text><text x="236" y="60" class="mid ts fm">guess</text><text x="330" y="60" class="mid ts fm">loss</text>
  <path d="M30 72 H370" class="fn sm s1"/>
  ${stepRow(0, '1', '2 min', '64', 'c')}${stepRow(1, '4.2', '8.4 min', '2.56', 'b')}
</g>
<g ${L(1, 'up')}>${stepRow(2, '4.84', '9.7 min', '0.10', 'd')}</g>
<g ${L(2, 'up')}>
  <text x="40" y="196" class="ts fm">…</text><text x="150" y="196" class="mid tm tb fd">5</text><text x="236" y="196" class="mid ts">10 min</text><text x="330" y="196" class="mid tm tb fd">0</text>
  <text x="200" y="234" class="mid ts fm">the steps shrink as the ground gets flat</text>
</g>
<g ${L(3, 'up')}>
  <rect x="24" y="256" width="352" height="70" rx="14" class="fp sd"/>
  <text x="200" y="284" class="mid tm tb fd">learned: 5 minutes per kilometre</text>
  <text x="200" y="308" class="mid ts fm">nobody told it. It was only told how wrong it was</text>
</g>
<text x="200" y="358" class="mid ts fm" ${L(4, 'up')}>that is all “learning” means here</text>`;

// ---------- 8: Step size ----------
const s8 = `
<g ${L(0, 'up')}>${axes}${curve}${dot(1, 'c')}</g>
<g ${L(1, 'up')}>
  <path d="M${WX(1) + 8} ${LY(64) - 6} C 160 20 300 20 352 72" class="fn sc dash"/>
  <circle cx="352" cy="76" r="8" class="fc"/>
  <text x="204" y="140" class="mid ts fc tb">too big: weight 10.6</text>
  <text x="204" y="158" class="mid ts fc">loss 125, worse than before</text>
</g>
<g ${L(2, 'up')}>
  ${[1.25, 1.5, 1.75, 2.0].map((w) => dot(w, 'e', 4)).join('')}
  <text x="136" y="204" class="ts fe tb">too small:</text>
  <text x="136" y="222" class="ts fe">thousands of steps</text>
</g>
<text x="200" y="352" class="mid tm fb tb" ${L(3, 'up')}>the learning rate: how far each step goes</text>
<text x="200" y="378" class="mid ts fm" ${L(4, 'up')}>one of the most important settings in training</text>`;

// ---------- 9: Two dials, then billions ----------
const s9 = `
<g ${L(0, 'up')}>
  <rect x="24" y="40" width="166" height="150" rx="14" class="fp"/>
  ${dial(107, 92, 30, 'c', 26)}
  <text x="107" y="146" class="mid ts tb">dial A</text>
  <rect x="210" y="40" width="166" height="150" rx="14" class="fp"/>
  ${dial(293, 92, -120, 'd', 26)}
  <text x="293" y="146" class="mid ts tb">dial B</text>
</g>
<g ${L(1, 'up')}>
  <text x="107" y="170" class="mid ts fc">up a bit: loss jumps up</text>
  <text x="293" y="170" class="mid ts fd">up a bit: loss falls a little</text>
</g>
<g ${L(2, 'up')}>
  <text x="107" y="218" class="mid tm tb fc">turn down a lot</text>
  <text x="293" y="218" class="mid tm tb fd">turn up a little</text>
</g>
<text x="200" y="262" class="mid ts fm" ${L(3, 'up')}>every dial gets its own slope</text>
${box(284, 'all dials move at once, each by its own amount', 3, { d: 2.5 })}
<text x="200" y="362" class="mid ts fm" ${L(4, 'up')}>steep slope: big change. Flat slope: small change</text>`;

// ---------- 10: The problem of scale ----------
const s10 = `
<g ${L(0, 'up')}>
  <text x="200" y="60" class="mid ts fm">the wiggle test, for every dial</text>
  ${Array.from({ length: 16 }, (_, i) => dial(52 + (i % 8) * 42, 100 + Math.floor(i / 8) * 42, (i * 53) % 360, 'm', 12)).join('')}
</g>
<g ${L(1, 'up')}>
  <text x="200" y="208" class="mid tm">one full run of the network per dial</text>
  <text x="200" y="246" class="mid tx tb fc">billions of runs</text>
  <text x="200" y="270" class="mid ts fc">for one single step</text>
</g>
<text x="200" y="312" class="mid tm fb tb" ${L(2, 'up')}>impossible</text>
${box(336, 'needed: all slopes at once', 3, {}, 'tm')}`;

// ---------- 11: Backpropagation ----------
const cols = [[70, [110, 170, 230]], [200, [110, 170, 230]], [330, [170]]];
const netLines = (() => { let s = ''; for (let c = 0; c < 2; c++) for (const a of cols[c][1]) for (const b of cols[c + 1][1]) s += `<line x1="${cols[c][0]}" y1="${a}" x2="${cols[c + 1][0]}" y2="${b}" class="sm s1"/>`; return s; })();
const netNodes = cols.map(([x, ys]) => ys.map((y) => `<circle cx="${x}" cy="${y}" r="13" class="fk si"/>`).join('')).join('');
const s11 = `
<g ${L(0, 'up')}>${netLines}${netNodes}</g>
<g ${L(1, 'up')}>
  ${arrow(60, 66, 340, 66, 'a')}
  <text x="200" y="54" class="mid ts fa tb">forward: make the guess</text>
  <text x="330" y="212" class="mid ts fc tb">error</text>
</g>
<g ${L(2, 'up')}>
  ${arrow(340, 276, 60, 276, 'c')}
  <text x="200" y="298" class="mid ts fc tb">backward: pass the blame</text>
</g>
<g ${L(2, 'pop', { d: 2 })}>
  <circle cx="200" cy="110" r="13" class="fc" style="opacity:.85"/><circle cx="200" cy="170" r="13" class="fc" style="opacity:.3"/><circle cx="200" cy="230" r="13" class="fc" style="opacity:.55"/>
</g>
<g ${L(3, 'pop')}>
  <circle cx="70" cy="110" r="13" class="fc" style="opacity:.5"/><circle cx="70" cy="170" r="13" class="fc" style="opacity:.8"/><circle cx="70" cy="230" r="13" class="fc" style="opacity:.2"/>
</g>
<text x="200" y="330" class="mid ts" ${L(3, 'up')}>each one hears: this much of the error is yours</text>
${box(346, 'one backward pass gives every slope', 4)}`;

// ---------- 12: The late parcel ----------
const stage = (x, t, share, c) => `<rect x="${x - 50}" y="110" width="100" height="56" rx="12" class="fp s${c}"/><text x="${x}" y="143" class="mid ts">${t}</text><text x="${x}" y="196" class="mid tm tb f${c}">${share}</text>`;
const s12 = `
<text x="200" y="50" class="mid ts fm" ${L(0, 'up')}>a parcel arrives two hours late</text>
<g ${L(0, 'up')}>
  ${stage(80, 'supplier', '', 'm')}${stage(200, 'warehouse', '', 'm')}${stage(320, 'driver', '', 'm')}
  ${arrow(134, 138, 146, 138, 'm', { size: 7 })}${arrow(254, 138, 266, 138, 'm', { size: 7 })}
</g>
<g ${L(1, 'up')}>
  <text x="320" y="196" class="mid tm tb fc">20 min</text>
  ${arrow(266, 226, 254, 226, 'c', { size: 7 })}
</g>
<g ${L(1, 'up', { d: 2.5 })}><text x="200" y="196" class="mid tm tb fc">70 min</text>${arrow(146, 226, 134, 226, 'c', { size: 7 })}</g>
<g ${L(1, 'up', { d: 4.5 })}><text x="80" y="196" class="mid tm tb fc">30 min</text></g>
<text x="200" y="262" class="mid ts" ${L(2, 'up')}>each stage adjusts in proportion to its share</text>
<text x="200" y="296" class="mid tm fb tb" ${L(3, 'up')}>backpropagation, since 1986</text>
${box(322, 'cost: about one extra run, not billions', 4)}`;

// ---------- 13: A handful at a time ----------
const s13 = `
<g ${L(0, 'up')}>
  ${[0, 1, 2, 3, 4].map((i) => `<rect x="${60 + i * 8}" y="${70 - i * 6}" width="90" height="60" rx="8" class="fp si s1"/>`).join('')}
  <text x="137" y="82" class="mid tm tb">32</text>
  <text x="137" y="158" class="mid ts fm">examples per step</text>
</g>
<g ${L(1, 'up')}>
  <text x="290" y="84" class="mid ts">their blame is averaged</text>
  <text x="290" y="106" class="mid ts fm">then one step</text>
</g>
<g ${L(2, 'up')}>
  <path d="M40 200 C120 200 150 330 220 330 S 320 250 360 250" class="fn sm s3"/>
  <path d="M60 204 L84 230 L92 218 L118 262 L128 250 L152 296 L166 286 L196 322" class="fn sb"/>
  <circle cx="60" cy="204" r="6" class="fb"/><circle cx="196" cy="322" r="6" class="fd"/>
  <text x="250" y="220" class="mid ts fb tb">a shaky compass</text>
</g>
<text x="200" y="364" class="mid ts" ${L(3, 'up')}>each step is a little off, the average heads downhill</text>`;

// ---------- 14: A landscape with a billion directions ----------
const s14 = `
<g ${L(0, 'up')}>
  <path d="M30 90 C70 90 80 220 120 220 S 150 150 180 170 S 220 300 260 300 S 300 240 330 250 S 360 200 372 190" class="fn sm s3"/>
  <text x="200" y="50" class="mid ts fm">not one neat valley</text>
</g>
<g ${L(1, 'pop')}><circle cx="260" cy="296" r="9" class="fd"/></g>
<text x="260" y="330" class="mid ts fd tb" ${L(1, 'up')}>good enough</text>
<g ${L(2, 'up')}>
  <circle cx="120" cy="216" r="7" class="fm"/>
  <text x="120" y="250" class="mid ts fm">could be stuck here</text>
</g>
<text x="200" y="362" class="mid ts" ${L(3, 'up')}>training stops when the loss stops falling</text>`;

// ---------- 15: Learning by heart ----------
const s15 = `
<g ${L(0, 'up')}>
  <path d="M50 70 V280 H360" class="fn sm"/>
  <text x="356" y="302" class="end ts fm">training time</text><text x="56" y="62" class="ts fm">error</text>
  <path d="M56 90 C120 200 200 262 350 274" class="fn sa s3"/>
  <text x="350" y="238" class="end ts fa tb">training examples</text>
</g>
<g ${L(1, 'up')}>
  <path d="M56 96 C110 190 160 214 210 212 S 300 170 350 130" class="fn sc s3"/>
  <text x="346" y="118" class="end ts fc tb">new examples</text>
</g>
<g ${L(2, 'up')}>
  <path d="M210 80 V280" class="fn sb dash"/>
  <text x="210" y="72" class="mid ts fb tb">stop here</text>
</g>
<text x="200" y="332" class="mid tm fc tb" ${L(3, 'up')}>learning by heart, not the pattern</text>
<text x="200" y="358" class="mid ts fm" ${L(4, 'up')}>the real test is always on examples it has never seen</text>`;

// ---------- 16: From delivery times to language ----------
const pbar = (y, w, c, t) => `<rect x="150" y="${y}" width="${w}" height="18" rx="5" class="f${c}"/><text x="${158 + w}" y="${y + 14}" class="ts f${c} tb">${t}</text>`;
const s16 = `
<g ${L(0, 'up')}>
  <text x="40" y="64" class="tl">The sky is</text>
  <rect x="150" y="40" width="90" height="36" rx="9" class="fn sm"/><text x="195" y="65" class="mid tl fm">?</text>
</g>
<g ${L(1, 'up')}>
  <text x="290" y="56" class="mid ts fm">the truth:</text>
  <text x="290" y="78" class="mid tm tb fd">“blue”</text>
</g>
<g ${L(2, 'up')}>
  <text x="40" y="132" class="ts">chance given to “blue”</text>
  <text x="40" y="170" class="ts fm">before</text>${pbar(156, 8, 'c', '2%')}
  <text x="40" y="204" class="ts fm">after</text>${pbar(190, 150, 'd', '62%')}
  <text x="200" y="240" class="mid ts fm">loss: how surprised it was by the true word</text>
</g>
<g ${L(3, 'up')}>
  <text x="200" y="284" class="mid tx tb fb">trillions of words</text>
  <text x="200" y="308" class="mid ts fm">the same step, again and again</text>
</g>
${box(332, 'weeks on thousands of special chips', 4)}`;

// ---------- 17: What learning is not ----------
const xchip = (x, w, t, l, d) => `<g ${L(l, 'up', { d })}><rect x="${x}" y="48" width="${w}" height="38" rx="10" class="fp"/><text x="${x + w / 2}" y="72" class="mid ts">${t}</text><path d="M${x + 10} 58 L${x + w - 10} 78" class="fn sc"/></g>`;
const s17 = `
${xchip(24, 100, 'rules', 0, 1)}${xchip(134, 132, 'stored facts', 0, 2)}${xchip(276, 100, 'insight', 0, 3)}
<g ${L(1, 'up')}>
  <rect x="24" y="112" width="352" height="64" rx="14" class="fp sb"/>
  <text x="200" y="140" class="mid ts fm">the only thing that happens</text>
  <text x="200" y="162" class="mid tm tb fb">less wrong, on the measure</text>
</g>
<g ${L(2, 'up')}>
  <text x="200" y="216" class="mid ts">it gets good at what is measured</text>
  <text x="200" y="238" class="mid ts fc tb">rewarded ≠ meant</text>
</g>
<g ${L(3, 'up')}>
  <text x="200" y="282" class="mid ts">nothing rewards “I do not know”</text>
  <text x="200" y="304" class="mid ts fc tb">so it guesses fluently</text>
</g>
${box(332, 'learning explains its skills and its flaws', 4)}`;

// ---------- 18: The short version ----------
const loopNode = (x, y, t, c) => `<rect x="${x - 62}" y="${y - 20}" width="124" height="40" rx="12" class="fp s${c}"/><text x="${x}" y="${y + 5}" class="mid ts">${t}</text>`;
const s18 = `
<g ${L(0, 'up')}>
  ${loopNode(200, 60, '1 guess', 'a')}
  ${arrow(266, 72, 296, 110, 'm')}
  ${loopNode(300, 136, '2 measure the loss', 'c')}
</g>
<g ${L(1, 'up')}>
  ${arrow(290, 160, 250, 202, 'm')}
  ${loopNode(200, 226, '3 find every slope', 'b')}
  ${arrow(136, 204, 108, 160, 'm')}
  ${loopNode(100, 136, '4 a small step', 'd')}
  ${arrow(110, 112, 140, 74, 'm')}
</g>
<g ${L(2, 'up')}><text x="200" y="134" class="mid ts fm">billions</text><text x="200" y="152" class="mid ts fm">of times</text></g>
<text x="200" y="300" class="mid ts" ${L(2, 'up', { d: 2 })}>no single step is clever. The sum is</text>
<text x="200" y="344" class="mid ts fm" ${L(3, 'up')}>next AI episode: attention</text>`;

export default {
  id: '2026-11-25-ki-04',
  date: '2026-11-25',
  area: 'ki',
  series: 'Understanding AI',
  episode: 2,
  title: 'How a network learns, with one example worked by hand',
  hook: 'Nobody sets the billions of dials. The network is only told how wrong it was. One tiny example shows how that is enough.',
  level: 2,
  poster: 5,
  voice: 'female',
  scenes: [
    {
      title: 'Nobody programs it',
      svg: s1,
      lines: [
        'In the first AI episode, we saw that a neural network is one long formula with adjustable dials, the weights. A large language model has hundreds of billions of them.',
        'Everything the model can do lies in how these dials are set. But who sets them? Nobody could do that by hand.',
        'The answer is a method that sounds like magic and is in fact simple arithmetic. Today we work through it with one single dial and one single example.',
        'We go slowly. If you follow this one example, you understand how every language model in the world was trained.',
      ],
    },
    {
      title: 'The example: one dial',
      svg: s2,
      lines: [
        'Our network has a tiny job. It should predict how long a delivery takes, given the distance.',
        { text: 'The formula is as simple as possible: time equals weight times distance. There is one weight, so one dial.', de: [['weight', 'Gewicht']] },
        { text: 'If the weight is right, the network turns kilometres into minutes correctly. We just do not know the right value yet.', de: [['prediction', 'Vorhersage']] },
        { text: 'So we start the way real training starts: with a random number. Our dial is set to 1.', say: 'So we start the way real training starts: with a random number. Our dial is set to one.' },
      ],
    },
    {
      title: 'First guess, and how wrong',
      svg: s3,
      lines: [
        { text: 'Now we show it one example. A delivery over 2 kilometres. The network multiplies 2 by its weight of 1, and guesses: 2 minutes.', say: 'Now we show it one example. A delivery over two kilometres. The network multiplies two by its weight of one, and guesses: two minutes.' },
        { text: 'We know the truth, because this delivery really happened. It took 10 minutes.', say: 'We know the truth, because this delivery really happened. It took ten minutes.' },
        { text: 'The guess is 8 minutes too low. That gap is called the error.', say: 'The guess is eight minutes too low. That gap is called the error.', de: [['error', 'Fehler']] },
        { text: 'For training, we turn the error into one number that says how bad the guess was. We multiply it by itself: 8 times 8 is 64. This number is called the loss.', say: 'For training, we turn the error into one number that says how bad the guess was. We multiply it by itself: eight times eight is sixty-four. This number is called the loss.', de: [['loss', 'Verlust (Fehlermaß)']] },
        'Multiplying it by itself does two things. Too high and too low count the same. And a big mistake counts far more than a small one.',
      ],
    },
    {
      title: 'The wiggle test',
      svg: s4,
      lines: [
        'Now the key question: in which direction should we turn the dial? Up or down?',
        { text: 'We can simply try. We turn it up a tiny bit, from 1 to 1.01, and run the example again.', say: 'We can simply try. We turn it up a tiny bit, from one to one point zero one, and run the example again.' },
        { text: 'The loss drops from 64 to 63.68. So turning up helps.', say: 'The loss drops from sixty-four to about sixty-three point seven. So turning up helps.' },
        { text: 'And we learn more than the direction. We learn how strongly the loss reacts to this dial. That number is called the slope. Here it is minus 32.', say: 'And we learn more than the direction. We learn how strongly the loss reacts to this dial. That number is called the slope. Here it is minus thirty-two.', de: [['slope', 'Steigung']] },
        'Minus means: when the dial goes up, the loss goes down. And a large number means: this dial matters a lot right now.',
      ],
    },
    {
      title: 'The blind hiker',
      svg: s5,
      lines: [
        'Here is the picture that everyone in this field carries in their head. You stand on a mountain in thick fog, and you want to reach the valley.',
        'Your height is the loss. Your position is the setting of the dial. You cannot see the valley.',
        'But you can feel the ground under your feet. You feel which way it goes down, and how steeply. So you take a step in that direction.',
        'Then you feel again, and step again. You never see the whole mountain, and you still arrive at the bottom.',
        { text: 'This method has a name: gradient descent. Gradient is simply another word for slope.', de: [['gradient descent', 'Gradientenabstieg']] },
      ],
    },
    {
      title: 'One step',
      svg: s6,
      lines: [
        'Back to our dial. This curve shows the loss for every possible weight. We are at the red point, high up on the left.',
        { text: 'How far do we step? We take the slope, 32, and multiply it by a small number, the learning rate. With a learning rate of 0.1, the step is 3.2.', say: 'How far do we step? We take the slope, thirty-two, and multiply it by a small number, the learning rate. With a learning rate of zero point one, the step is three point two.', de: [['learning rate', 'Lernrate']] },
        { text: 'So the weight moves from 1 to 4.2.', say: 'So the weight moves from one to four point two.' },
        { text: 'Run the example again. 2 kilometres times 4.2 gives a guess of 8.4 minutes. Much closer to 10.', say: 'Run the example again. Two kilometres times four point two gives a guess of eight point four minutes. Much closer to ten.' },
        { text: 'The loss fell from 64 to about 2.5. One step, and the guess is no longer absurd.', say: 'The loss fell from sixty-four to about two and a half. One step, and the guess is no longer absurd.' },
      ],
    },
    {
      title: 'And again',
      svg: s7,
      quiz: {
        q: 'The weight is 3, the distance 2 km, the true time 10 minutes. The slope here is −16, the learning rate 0.1. What are the new weight and the new guess?',
        options: [
          { text: 'Weight 4.6, guess 9.2 minutes', correct: true, why: 'The step is 16 times 0.1, so 1.6. A minus slope means turn up: 3 plus 1.6 is 4.6. And 2 kilometres times 4.6 is 9.2 minutes.' },
          { text: 'Weight 1.4, guess 2.8 minutes', why: 'That steps in the wrong direction. A minus slope means the loss falls when the dial goes up, so the 1.6 has to be added, not taken away.' },
          { text: 'Weight 4.6, guess 10 minutes', why: 'The new weight is right. But one step does not land on the truth. The guess is 2 times 4.6, which is 9.2, still a little too low.' },
          { text: 'Weight 19, guess 38 minutes', why: 'That uses the whole slope as the step. The learning rate was forgotten: only a tenth of the slope is taken, so 1.6 and not 16.' },
        ],
        explain: 'Take it in three small moves. First the size of the step: the slope without its sign is 16, and the learning rate is 0.1, so the step is 1.6. Second the direction: a minus slope says that the loss goes down when the weight goes up, so you add. 3 plus 1.6 is 4.6. Third the new guess: the network still does the same thing as before, distance times weight, so 2 times 4.6 is 9.2 minutes. The truth is 10, so there is still a small error, and the next step will be smaller, because the ground is flatter there. Training never jumps to the answer. It walks toward it.',
      },
      lines: [
        { text: 'Now we simply repeat. At the new position, the ground is flatter, so the next step is smaller. The weight goes to 4.84, and the loss to 0.1.', say: 'Now we simply repeat. At the new position, the ground is flatter, so the next step is smaller. The weight goes to about four point eight, and the loss to zero point one.' },
        'Notice what happened. Nobody decided to slow down. The steps shrink by themselves, because the slope shrinks near the valley.',
        { text: 'After a few more steps, the weight settles at 5, and the guess is exactly 10 minutes.', say: 'After a few more steps, the weight settles at five, and the guess is exactly ten minutes.' },
        'The network has learned that one kilometre takes five minutes. Nobody told it that. It was only ever told how wrong it was.',
        'That is all the word learning means here: turning dials a little, again and again, so that the loss gets smaller.',
      ],
    },
    {
      title: 'The size of the step',
      svg: s8,
      quiz: {
        q: 'During training, the loss jumps up and down wildly and keeps getting larger. Which change is the most sensible first try?',
        options: [
          { text: 'Lower the learning rate, so that each step is smaller', correct: true, why: 'A loss that keeps growing is the sign of overshooting: each step lands higher on the other side of the valley. Smaller steps stop that.' },
          { text: 'Train for longer, so that the loss has time to settle', why: 'Patience helps when the loss falls slowly. Here it is rising. More of the same steps only carries the weights further away.' },
          { text: 'Add more layers, so that the network can fit the data', why: 'A bigger network can fit more. But the problem here is not what the network can fit. It is that the steps throw it out of the valley.' },
          { text: 'Raise the learning rate, to get past the bumpy region faster', why: 'Bigger steps are what causes the jumping in the first place. That would make the loss grow even faster.' },
        ],
        explain: 'Go back to the hiker in the fog. Suppose every step she takes is fifty metres long. She feels that the ground goes down to the right, leaps fifty metres, and lands high up on the opposite slope. From there it goes down to the left, so she leaps back, and lands even higher. Her sense of direction is perfect. Her stride is the problem. That is what a rising, jumping loss looks like from the inside. The cure is not more time, and not a bigger body. It is a shorter stride. Only when the loss falls smoothly, but far too slowly, is the opposite cure the right one.',
      },
      lines: [
        'One setting deserves a closer look: the learning rate. It decides how far each step goes.',
        { text: 'Suppose we had been greedy and used 0.3 instead of 0.1. The first step would have thrown the weight from 1 to 10.6, far past the valley. The loss would be 125, worse than at the start.', say: 'Suppose we had been greedy and used zero point three instead of zero point one. The first step would have thrown the weight from one to more than ten, far past the valley. The loss would be one hundred twenty-five, worse than at the start.' },
        'If the rate is far too small, the opposite happens. Each step is safe, but training takes thousands of steps instead of five.',
        { text: 'Choosing this one number well is one of the most important decisions in training any model.', de: [['step size', 'Schrittweite']] },
        'In practice, people often start with larger steps and shrink them as training goes on.',
      ],
    },
    {
      title: 'Two dials, then billions',
      svg: s9,
      quiz: {
        q: 'Dial A turned up a bit: the loss rises steeply. Dial B turned up a bit: the loss falls slightly. What does one training step do?',
        options: [
          { text: 'It turns A down by a lot, and B up by a little', correct: true, why: 'Each dial moves against its own slope, and by an amount that matches how steep it is. A has a steep upward slope, B a gentle downward one.' },
          { text: 'It turns A down by a lot, and leaves B as it is', why: 'A is right. But B also has a slope, even if a small one. Every dial with a slope gets a step, in proportion to it.' },
          { text: 'It turns both down, because the loss has to go down', why: 'The loss has to go down, not the dials. For B, the loss falls when the dial goes up, so B is turned up.' },
          { text: 'It changes only A, the dial with the steepest slope', why: 'That would work, but slowly. Training moves all dials in the same step, each by its own amount. That is what makes it fast.' },
        ],
        explain: 'Think of a shower with two taps, and the water is far too hot. You try the first tap: a small turn makes it much hotter. So you turn that one back firmly. You try the second tap: a small turn makes it a tiny bit cooler. So you turn that one a little further in the same direction. You would not leave the second tap alone just because its effect is small, and you would not turn both the same way just because you want less heat. Each tap gets its own test and its own correction. A network does this for every dial at once, in the same step.',
      },
      lines: [
        'A real network has more than one dial. The good news: the idea does not change at all.',
        'Each dial gets its own wiggle question. If I turn you up a little, does the loss rise or fall, and how strongly?',
        'One dial may answer: turn me down a lot. Another: turn me up a little. A third: I hardly matter at the moment.',
        'Then all dials move in the same step, each by its own amount. A steep slope means a big change. A flat slope means a small one.',
        'The mountain now has billions of directions instead of one. But the hiker does the same thing: feel the slope, step down.',
      ],
    },
    {
      title: 'The problem of scale',
      svg: s10,
      lines: [
        'There is one problem, and for decades it looked like the end of the road.',
        'Our wiggle test needs one full run of the network for every dial. With one dial, that is nothing.',
        'With a hundred billion dials, it is a hundred billion runs. For one single step. And training needs millions of steps.',
        'No computer on earth could do that. What is needed is a way to get all the slopes at once.',
      ],
    },
    {
      title: 'Blame travels backwards',
      svg: s11,
      lines: [
        { text: 'That way exists. It is called backpropagation, and it is the reason modern AI is possible at all.', de: [['backpropagation', 'Fehlerrückführung']] },
        'First, the network runs forward as usual and makes its guess. At the end, we measure the error.',
        'Then the calculation runs backwards. The last layer is told how much of the error it caused. It passes the blame on to the layer before it.',
        'And so on, layer by layer, back to the start. In the end, every single dial knows its share.',
        'That share is exactly the slope we were looking for. One pass forward, one pass backward, and every slope is known.',
      ],
    },
    {
      title: 'The late parcel',
      svg: s12,
      lines: [
        'A comparison helps. A parcel arrives two hours late. Who has to change something?',
        'You go backwards through the chain. The driver lost twenty minutes. The warehouse lost seventy. The supplier lost thirty.',
        'Now each stage can adjust in proportion to its share. You did not have to rerun the whole delivery once for every employee.',
        { text: 'The method was made popular in 1986 by three researchers. One of them was Geoffrey Hinton, who later received a Nobel Prize for this line of work.', say: 'The method was made popular in nineteen eighty-six by three researchers. One of them was Geoffrey Hinton, who later received a Nobel Prize for this line of work.' },
        'Its cost is about one extra run of the network. Not billions. That single trick turned an impossible calculation into a routine one.',
      ],
    },
    {
      title: 'A handful at a time',
      svg: s13,
      lines: [
        'One more detail from real training. We used a single example. A real model learns from billions of them.',
        { text: 'It does not look at all of them before each step. It takes a small handful, called a batch, for instance 32 examples.', say: 'It does not look at all of them before each step. It takes a small handful, called a batch, for instance thirty-two examples.', de: [['batch', 'Stapel']] },
        'The blame from these examples is averaged, and then the dials take one step.',
        'Because each handful is a little different, each step points in a slightly different direction. It is like walking downhill with a shaky compass.',
        'Each step is a bit off. But on average the path leads down, and it gets there far faster than checking everything first.',
      ],
    },
    {
      title: 'A landscape with a billion directions',
      svg: s14,
      lines: [
        'Our curve had one neat valley. The real landscape has no such luck. It is full of dips, ridges and flat plains.',
        'So training does not find the best possible setting. Nobody knows what that would be. It finds a setting that is good enough.',
        'In practice, training simply stops when the loss stops falling.',
        'This is one reason why two training runs of the same model can end with different dials, and slightly different behavior.',
      ],
    },
    {
      title: 'Learning by heart',
      svg: s15,
      quiz: {
        q: 'A network makes 2% errors on its training examples, but 30% errors on new examples of the same kind. What does the gap tell you?',
        options: [
          { text: 'It memorised its examples, not the pattern behind them', correct: true, why: 'The task is the same in both cases. Only the familiarity differs. A network that had found the pattern would be about as good on new examples.' },
          { text: 'Training was stopped too early, before the pattern was found', why: 'After stopping too early, the error is high on both sets. Here it is very low on the training examples, which points the other way.' },
          { text: 'The learning rate was too high, so the loss never settled', why: 'With steps that are too big, the training error itself stays high or jumps. A training error of 2% shows that the steps worked.' },
          { text: 'The new examples are simply harder than the training ones', why: 'It could be, if they came from elsewhere. But the question says they are of the same kind, so difficulty does not explain a gap this size.' },
        ],
        explain: 'Picture two pupils before a maths test. Both practise with the same fifty exercises. One understands the method. The other learns the fifty answers by heart. On those fifty exercises, both get almost everything right, and you cannot tell them apart. Then the test brings new exercises of the same kind. The first pupil is still good. The second one fails. The gap between practice and test is what gives the second pupil away. For a network, the practice set is the training data, and the test must use examples it has never seen. A small gap means it learned the pattern. A large gap means it learned the examples.',
      },
      lines: [
        { text: 'There is a trap on the way, and it has a name: overfitting.', de: [['overfitting', 'Überanpassung']] },
        'A network with enough dials can drive the loss on its examples to almost zero in a lazy way. It simply learns the examples by heart.',
        { text: 'That looks like success. But on a new example, one it has never seen, it fails. It has learned the examples, not the pattern behind them.', de: [['training data', 'Trainingsdaten']] },
        'So a part of the data is always kept aside and never used for training. The error on these unseen examples is the number that counts.',
        'When that number starts to rise while the training error keeps falling, it is time to stop.',
      ],
    },
    {
      title: 'From delivery times to language',
      svg: s16,
      lines: [
        'And now the step to a language model. It is smaller than you might think.',
        'The example is a piece of real text, with the last word hidden. The model guesses a chance for every possible next word.',
        'The truth is the word that really came next. The loss measures how surprised the model was by it.',
        'Then the same thing happens as with our delivery: blame travels backwards, and every dial moves a hair.',
        'This is repeated across trillions of words, for weeks, on thousands of special chips. Each single step is as simple as the one we did by hand.',
      ],
    },
    {
      title: 'What learning is not',
      svg: s17,
      lines: [
        'It is worth saying clearly what does not happen. Nobody writes rules into the model. No facts are stored in a list. No insight is poured in.',
        'The only thing that happens, billions of times, is this: the dials move so that the model is less wrong on the measure it was given.',
        'That has two consequences, and you know both from earlier episodes. A model gets good at exactly what is measured, which is not always what was meant.',
        'And nothing in this process rewards saying “I do not know”. Guessing a likely word always scores better than silence. This is where fluent, confident mistakes come from.',
        'So the way a model learns explains both its skills and its typical flaws.',
      ],
    },
    {
      title: 'The short version',
      svg: s18,
      lines: [
        'The short version. Training is a loop with four steps. Guess. Measure how wrong the guess was. Find the slope for every dial. Take a small step downhill.',
        'Backpropagation is the trick that finds all the slopes in one backward pass.',
        'No single step is clever. The cleverness is in the sum of billions of tiny corrections.',
        'In the next AI episode, we look at attention: the part that lets a language model decide which words matter for each other.',
      ],
    },
  ],
  takeaways: [
    'A network learns by being told how wrong it was, not by being told the answer or any rules.',
    'The loss is one number for how bad a guess was. The slope says, for each dial, which way to turn it and how much it matters.',
    'Gradient descent: take a small step against the slope, and repeat. The steps shrink by themselves near the valley.',
    'The learning rate sets the size of the step. Too big, and training overshoots and gets worse. Too small, and it takes forever.',
    'Backpropagation passes the error backwards through the layers and gives every dial its slope in about one extra run.',
    'A low error on training examples proves little. What counts is the error on examples the network has never seen.',
  ],
  sources: [
    'Rumelhart, Hinton & Williams (1986): Learning representations by back-propagating errors, Nature',
    'Goodfellow, Bengio & Courville (2016): Deep Learning, chapters on optimization and regularization',
    'Robbins & Monro (1951): the origin of stochastic approximation, the basis of training in small batches',
    'The numbers in the delivery example are our own calculation: loss = (2 × weight − 10)²',
  ],
};
