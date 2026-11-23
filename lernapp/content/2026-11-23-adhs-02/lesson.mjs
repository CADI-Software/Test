import { L, arrow } from '../../tools/kit.mjs';

const box = (y, text, l, o = {}, cls = 'ts') => `
<g ${L(l, 'up', o)}>
  <rect x="24" y="${y}" width="352" height="42" rx="12" class="fp"/>
  <text x="200" y="${y + 27}" class="mid ${cls}">${text}</text>
</g>`;
const row = (y, title, sub, icon) => `
  <rect x="24" y="${y}" width="352" height="84" rx="14" class="fp"/>
  <g transform="translate(34 ${y + 12})">${icon}</g>
  <text x="122" y="${y + 37}" class="tm tb">${title}</text>
  <text x="122" y="${y + 60}" class="ts fm">${sub}</text>`;
const chips = (items, y, l, c = '') => items.map(([t, x, w], i) => `<g ${L(l, 'pop', { d: 0.6 + i * 1.1 })}><rect x="${x}" y="${y}" width="${w}" height="34" rx="10" class="fp"/><text x="${x + w / 2}" y="${y + 22}" class="mid ts ${c}">${t}</text></g>`).join('');
const wedge = (cx, cy, r, a0, a1) => { const p = (a) => `${(cx + r * Math.sin((a * Math.PI) / 180)).toFixed(1)} ${(cy - r * Math.cos((a * Math.PI) / 180)).toFixed(1)}`; return `M${cx} ${cy} L${p(a0)} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${p(a1)} Z`; };
const ticks = (cx, cy, r) => Array.from({ length: 12 }, (_, i) => { const a = (i * Math.PI) / 6; return `<line x1="${(cx + (r - 8) * Math.sin(a)).toFixed(1)}" y1="${(cy - (r - 8) * Math.cos(a)).toFixed(1)}" x2="${(cx + r * Math.sin(a)).toFixed(1)}" y2="${(cy - r * Math.cos(a)).toFixed(1)}" class="sm s1"/>`; }).join('');

// ---------- 1: Late, and honestly surprised ----------
const s1 = `
<g ${L(0, 'up')}>
  <circle cx="200" cy="140" r="84" class="fp si"/>${ticks(200, 140, 84)}
  <path d="M200 140 V78" class="fn si s3"/><circle cx="200" cy="140" r="6" class="fi"/>
</g>
<g ${L(1)}><path d="${wedge(200, 140, 78, 0, 120)}" class="fc" style="opacity:.45"/></g>
<g ${L(1, 'up')}>
  <path d="M200 140 L267.5 179" class="fn sc s3"/>
  <text x="338" y="118" class="mid tm fc tb">20 min</text><text x="338" y="138" class="mid ts fc">vanished</text>
</g>
<text x="200" y="262" class="mid tl tb fb" ${L(2, 'up')}>time blindness</text>
<text x="200" y="286" class="mid ts fm" ${L(2, 'up', { d: 3 })}>measurable, not an excuse</text>
${chips([['the inner clock', 24, 116], ['shrink and stretch', 148, 132], ['visible time', 288, 88]], 316, 3)}`;

// ---------- 2: Now and not now ----------
const days = [['Mon', 120], ['Tue', 190], ['Wed', 260], ['Thu', 330]];
const s2 = `
<g ${L(0, 'up')}>
  <path d="M40 150 H370" class="fn sm"/>
  <circle cx="56" cy="150" r="16" class="fa"/><text x="56" y="196" class="mid tm fa tb">now</text>
  <rect x="88" y="100" width="282" height="100" rx="14" class="fm" style="opacity:.22"/>
  <text x="229" y="88" class="mid tm fm">not now</text>
</g>
<g ${L(1, 'up')}>
  ${days.map(([d, x]) => `<path d="M${x} 142 V158" class="fn sm s1"/><text x="${x}" y="180" class="mid ts fm">${d}</text>`).join('')}
  <g class="jump" data-l="1" data-fx="state" data-d="6"><circle cx="330" cy="150" r="11" class="fb"/><text x="330" y="128" class="mid ts fb tb">Thursday</text></g>
</g>
<text x="200" y="246" class="mid ts fm" ${L(2, 'up')}>the future loses its pull very fast</text>
<g ${L(3, 'up')}>
  <path d="M56 286 H150" class="fn sc s3"/><path d="M56 278 V294 M150 278 V294" class="fn sc"/>
  <text x="160" y="291" class="ts fc tb">short time horizon</text>
  <path d="M56 326 H340" class="fn sm s3"/><path d="M56 318 V334 M340 318 V334" class="fn sm"/>
  <text x="200" y="358" class="mid ts fm">how far ahead the future still feels real</text>
</g>`;
const css2 = `.jump{transition:transform .5s cubic-bezier(.6,0,.2,1)}.jump.on{transform:translateX(-274px)}`;

// ---------- 3 and 4: the inner clock ----------
const metro = (x, y) => `<path d="M${x - 26} ${y + 50} L${x - 10} ${y - 40} H${x + 10} L${x + 26} ${y + 50} Z" class="fp si"/><g class="wig"><circle cx="${x}" cy="${y + 36}" r="52" class="fn"/><path d="M${x} ${y + 36} V${y - 14}" class="fn sb s3"/><circle cx="${x}" cy="${y - 8}" r="6" class="fb"/></g>`;
const flowTicks = (x0, x1, y, n, cls = 'fb') => Array.from({ length: n }, (_, i) => `<circle cx="${(x0 + ((x1 - x0) * i) / (n - 1)).toFixed(1)}" cy="${y}" r="4" class="${cls} blink" style="animation-delay:${-i * 0.2}s"/>`).join('');
const counter = (x, y, t) => `<rect x="${x - 36}" y="${y - 28}" width="72" height="56" rx="10" class="fp si"/><text x="${x}" y="${y + 8}" class="mid tl tb">${t}</text>`;
const s3 = `
<g ${L(1, 'up')}>
  ${metro(80, 150)}
  <text x="80" y="226" class="mid ts fb tb">a metronome</text>
  ${flowTicks(130, 266, 160, 8)}
  ${counter(320, 160, '128')}
  <text x="320" y="226" class="mid ts">a counter</text>
</g>
<text x="200" y="56" class="mid ts fm" ${L(0, 'up')}>no clock organ, but a model that fits the data</text>
<text x="200" y="270" class="mid ts" ${L(1, 'up', { d: 4 })}>many ticks = a long time</text>
<g ${L(2, 'pop')}><rect x="96" y="290" width="208" height="36" rx="18" class="fk sa"/><text x="200" y="313" class="mid ts fa tb">dopamine sets the speed</text></g>
<text x="200" y="362" class="mid ts fm" ${L(3, 'up')}>same regions as attention and movement</text>`;

const gateRow = (y, l, open, a, b, c, col) => `
<g ${L(l, 'up')}>
  ${flowTicks(40, 150, y, 7)}
  <rect x="160" y="${y - 30}" width="10" height="${open ? 14 : 60}" rx="3" class="f${col}"/>
  ${open ? flowTicks(184, 270, y, 6) : flowTicks(184, 196, y, 2, 'fm')}
  ${counter(320, y, c)}
  <text x="40" y="${y - 40}" class="ts tb">${a}</text>
  <text x="40" y="${y + 44}" class="ts f${col} tb">${b}</text>
</g>`;
const s4 = `
<text x="200" y="38" class="mid ts fb tb" ${L(0, 'up')}>the gate: attention</text>
<text x="200" y="60" class="mid ts fm" ${L(1, 'up')}>ticks count only while you attend to time</text>
${gateRow(130, 2, false, 'absorbed in a game: 40 min', 'gate shut: feels like 10', '10', 'c')}
${gateRow(258, 3, true, 'bored in a queue: 5 min', 'gate open: feels like 20', '20', 'd')}
${box(336, 'ADHD: attention swings more, so time does too', 4)}`;

// ---------- 5: What the measurements show ----------
const bell = (mu, c, fill) => { let d = ''; for (let x = 40; x <= 360; x += 8) { const y = 250 - 150 * Math.exp(-((x - mu) ** 2) / (2 * 48 * 48)); d += (d ? ' L' : 'M') + x + ' ' + y.toFixed(1); } return `<path d="${d}" class="fn s${c} s3"/>${fill ? `<path d="${d} L360 250 L40 250 Z" class="f${c}" style="opacity:.14"/>` : ''}`; };
const s5 = `
<text x="200" y="36" class="mid ts fm" ${L(0, 'up')}>55 studies in one analysis, 27 in another</text>
<g ${L(1, 'up')}>
  <text x="200" y="64" class="mid ts">which tone was longer? hold as long as the light</text>
  <path d="M40 250 H360" class="fn sm"/>
  <text x="48" y="272" class="ts fm">less precise</text><text x="352" y="272" class="end ts fm">more precise</text>
</g>
<g ${L(2, 'up')}>${bell(216, 'm', false)}${bell(184, 'c', true)}
  <text x="300" y="118" class="mid ts fm">without ADHD</text><text x="104" y="118" class="mid ts fc tb">with ADHD</text>
</g>
<g ${L(3, 'up')}>
  <path d="M216 96 V250" class="fn si dash"/>
  <text x="120" y="304" class="mid tm fc tb">3 of 4</text><text x="120" y="324" class="mid ts fm">below that average</text>
</g>
<g ${L(4, 'up')}>
  <text x="290" y="304" class="mid tm fa tb">1 of 4</text><text x="290" y="324" class="mid ts fm">above it</text>
  <text x="200" y="364" class="mid ts fb tb">a tendency in a group, not a rule for each person</text>
</g>`;

// ---------- 6: Three kinds of time ----------
const s6 = `
<text x="200" y="72" class="mid tx tb" ${L(0, 'pop', { out: 1 })}>Three kinds of time</text>
<g ${L(1, 'up')}>${row(20, 'Rhythm', 'fractions of a second: tapping', `<path d="M6 44 V16 M24 44 V16 M42 44 V16 M60 44 V16" class="fn sa s3"/>`)}</g>
<g ${L(2, 'up')}>${row(112, 'Felt duration', 'seconds to minutes: how long?', `<path d="M16 6 H56 M16 54 H56 M20 6 Q20 26 36 30 Q52 34 52 54 M52 6 Q52 26 36 30 Q20 34 20 54" class="fn sb"/>`)}</g>
<g ${L(3, 'up')}>${row(204, 'Foresight', 'days to months: when to start?', `<rect x="8" y="10" width="56" height="44" rx="6" class="fn se"/><path d="M8 24 H64 M22 4 V14 M50 4 V14" class="fn se"/><circle cx="48" cy="40" r="5" class="fe"/>`)}</g>
<text x="200" y="322" class="mid ts fm" ${L(4, 'up')}>the first two are measured in the lab</text>
<text x="200" y="350" class="mid tm fe tb" ${L(4, 'up', { d: 2.5 })}>the third causes most of the trouble</text>`;

// ---------- 7: The planning fallacy ----------
const s7 = `
<text x="200" y="38" class="mid tm" ${L(0, 'up')}>the planning fallacy: everybody has it</text>
<g ${L(1, 'up')}>
  <text x="40" y="92" class="ts">predicted</text><rect x="130" y="78" width="136" height="20" rx="6" class="fa"/><text x="276" y="94" class="tm tb fa">34 days</text>
</g>
<g ${L(1, 'up', { d: 3.5 })}>
  <text x="40" y="132" class="ts">needed</text><rect x="130" y="118" width="220" height="20" rx="6" class="fc"/><text x="340" y="158" class="end tm tb fc">55 days</text>
</g>
<text x="200" y="196" class="mid ts fm" ${L(2, 'up')}>planned: the best case, the task alone</text>
<text x="200" y="232" class="mid ts fb tb" ${L(3, 'up')}>with ADHD, on top: the invisible in-between</text>
${chips([['finding the keys', 24, 124], ['the shoes', 158, 84], ['the charger', 252, 124]], 250, 3)}
<text x="200" y="324" class="mid ts fm" ${L(3, 'up', { d: 4.5 })}>and past durations are remembered poorly</text>`;

// ---------- The one-more-thing trap ----------
const sTrap = `
<g ${L(0, 'up')}>
  <path d="M40 120 H360" class="fn sm"/>
  <path d="M300 104 V136" class="fn sa s3"/><text x="300" y="92" class="mid ts fa tb">time to leave</text>
  <rect x="220" y="112" width="80" height="16" rx="5" class="fd" style="opacity:.5"/>
  <text x="260" y="156" class="mid ts fd">10 minutes early</text>
  <text x="120" y="156" class="mid ts fm">being early = waiting</text>
</g>
<g ${L(1, 'up')}>
  <g class="eat" data-l="2" data-fx="state" data-d="2"><rect x="220" y="174" width="70" height="26" rx="6" class="fc"/></g>
  <text x="212" y="192" class="end ts fc tb">one more quick thing</text>
</g>
<g ${L(2, 'up')}>
  <text x="200" y="240" class="mid tm fb tb">delay aversion</text>
  <text x="200" y="262" class="mid ts fm">the quick thing runs over, the buffer is gone</text>
</g>
<g ${L(3, 'up')}>
  <rect x="24" y="286" width="352" height="78" rx="14" class="fp sd"/>
  <path d="M52 334 v-10 a16 16 0 0 1 32 0 v10 M48 328 h8 v14 h-8 z M80 328 h8 v14 h-8 z" class="fn sd"/>
  <text x="104" y="318" class="tm tb fd">make being early pleasant</text>
  <text x="104" y="342" class="ts fm">a podcast or a game, saved for then</text>
</g>`;
const cssTrap = `.eat{transform-box:fill-box;transform-origin:0 50%;transition:transform 1.8s ease}.eat.on{transform:scaleX(1.95)}`;

// ---------- 8: Remembering at the right moment ----------
const s8 = `
<text x="200" y="38" class="mid ts fm" ${L(0, 'up')}>remembering to do something later</text>
<g ${L(1, 'up')}>
  <rect x="24" y="60" width="166" height="190" rx="14" class="fp"/>
  <circle cx="107" cy="118" r="30" class="fn sc"/><path d="M107 100 V118 L120 126" class="fn sc"/>
  <text x="107" y="178" class="mid tm tb fc">by the clock</text>
  <text x="107" y="202" class="mid ts">“call at three”</text>
  <text x="107" y="226" class="mid ts fm">you must keep checking</text>
</g>
<g ${L(2, 'up')}>
  <rect x="210" y="60" width="166" height="190" rx="14" class="fp sd"/>
  <rect x="270" y="92" width="46" height="52" rx="6" class="fn sd"/><path d="M280 104 H306 M285 144 V152 H301 V144" class="fn sd"/><path d="M286 84 q4 -8 0 -14 M300 84 q4 -8 0 -14" class="fn sd s1"/>
  <text x="293" y="178" class="mid tm tb fd">by an event</text>
  <text x="293" y="202" class="mid ts">“when the coffee runs”</text>
  <text x="293" y="226" class="mid ts fm">the signal reminds you</text>
</g>
<g ${L(3, 'up')}>
  <rect x="24" y="270" width="352" height="64" rx="14" class="fp"/>
  <text x="200" y="296" class="mid tm tb">when X happens, then I do Y</text>
  <text x="200" y="318" class="mid ts fm">helped children with ADHD in tests of self-control</text>
</g>`;

// ---------- 9: The body clock ----------
const s9 = `
<g ${L(0, 'up')}>
  <text x="200" y="40" class="mid ts fm">one more clock: the one that makes you sleepy</text>
  <path d="M40 200 H360" class="fn sm"/>
  <text x="44" y="226" class="ts fm">evening</text><text x="356" y="226" class="end ts fm">night</text>
</g>
<g ${L(1, 'up')}>
  <path d="M60 196 C120 196 130 120 190 110 H360" class="fn sm s3"/>
  <text x="150" y="96" class="mid ts fm">typical</text>
  <path d="M60 196 H130 C190 196 200 150 262 140 H360" class="fn sb s3"/>
  <text x="318" y="164" class="mid ts fb tb">ADHD</text>
  <text x="56" y="76" class="ts fm">melatonin</text>
</g>
<g ${L(1, 'up', { d: 5 })}>
  ${arrow(132, 262, 204, 262, 'b')}
  <text x="168" y="286" class="mid ts fb tb">about 1.5 hours later</text>
  <text x="300" y="262" class="mid tm tb">3 of 4</text><text x="300" y="282" class="mid ts fm">adults, one study</text>
</g>
${box(322, 'hard mornings: biology, not a lack of discipline', 2)}`;

// ---------- 10: What it costs ----------
const s10 = `
${chips([['being late', 24, 100], ['deadlines', 134, 96], ['late fees', 240, 136]], 30, 0)}
<g ${L(1, 'up')}>
  <rect x="24" y="92" width="352" height="64" rx="16" class="fp"/>
  <text x="200" y="120" class="mid ts">what others hear:</text>
  <text x="200" y="142" class="mid tm fc tb">“I am not important to you”</text>
  <rect x="24" y="170" width="352" height="64" rx="16" class="fp sa"/>
  <text x="200" y="198" class="mid ts">what usually happened:</text>
  <text x="200" y="220" class="mid tm fa tb">the time was misjudged</text>
</g>
<text x="200" y="270" class="mid tm fb tb" ${L(2, 'up')}>an explanation, not an excuse</text>
<text x="200" y="294" class="mid ts fm" ${L(2, 'up', { d: 3 })}>trying harder to feel time does not work</text>
${box(322, 'move time outside your head', 3, {}, 'tm')}`;

// ---------- 11: Make time visible ----------
const s11 = `
<g ${L(1, 'up')}>
  <rect x="30" y="64" width="150" height="80" rx="12" class="fp si"/>
  <text x="105" y="116" class="mid tx tb">14:37</text>
  <text x="105" y="170" class="mid ts fm">a number to calculate</text>
  <circle cx="295" cy="104" r="46" class="fp si"/>${ticks(295, 104, 46)}
  <path d="${wedge(295, 104, 40, 222, 360)}" class="fa" style="opacity:.5"/>
  <path d="M295 104 L268.2 133.8 M295 104 L316.5 99.4" class="fn si s3"/>
  <text x="295" y="170" class="mid ts fa tb">a piece of a circle</text>
</g>
<g ${L(2, 'up')}>
  <circle cx="150" cy="256" r="48" class="fp si"/>
  <path d="${wedge(150, 256, 42, 0, 250)}" class="fc" style="opacity:.75"/>
  <circle cx="150" cy="256" r="5" class="fi"/>
  <text x="222" y="246" class="ts fc tb">visual timer</text><text x="222" y="266" class="ts fm">the disc shrinks</text>
</g>
${chips([['bathroom', 44, 96], ['next to the screen', 150, 136], ['door', 296, 64]], 330, 3)}
<text x="200" y="38" class="mid ts fm" ${L(0, 'up')}>make time something you can see</text>`;

// ---------- 12: Measure your own time ----------
const logRow = (i, t, g, r) => `<text x="40" y="${110 + i * 34}" class="ts">${t}</text><text x="236" y="${110 + i * 34}" class="mid ts fm">${g}</text><text x="324" y="${110 + i * 34}" class="mid tm tb fc">${r}</text>`;
const s12 = `
<g ${L(0, 'up')}>
  <text x="40" y="68" class="ts fm">one week, recurring tasks</text>
  <text x="236" y="68" class="mid ts fm">guess</text><text x="324" y="68" class="mid ts fc tb">real</text>
  <path d="M30 80 H370" class="fn sm s1"/>
</g>
<g ${L(0, 'up', { d: 3 })}>${logRow(0, 'getting ready', '30', '48')}</g>
<g ${L(1, 'up')}>${logRow(1, 'way to work', '20', '31')}${logRow(2, 'answering mail', '10', '26')}</g>
<g ${L(2, 'up')}>
  <rect x="24" y="210" width="352" height="76" rx="14" class="fp sb"/>
  <text x="200" y="240" class="mid tm tb">measured time, not felt time</text>
  <text x="200" y="266" class="mid tm fb tb">plus a quarter as a buffer</text>
</g>
<text x="200" y="324" class="mid ts fm" ${L(3, 'up')}>your feeling is a bad measuring device</text>
<text x="200" y="350" class="mid ts" ${L(3, 'up', { d: 3 })}>measure once, then trust the number</text>`;

// ---------- 13: Plan backwards ----------
const s13 = `
<g ${L(0, 'up')}>
  <path d="M40 130 H360" class="fn sm"/>
  <circle cx="340" cy="130" r="10" class="fa"/><text x="340" y="104" class="mid ts fa tb">arrive 9:00</text>
</g>
<g ${L(1, 'up')}>
  <rect x="250" y="122" width="80" height="16" rx="5" class="fm"/><text x="290" y="162" class="mid ts fm">travel 25</text>
  ${arrow(330, 190, 252, 190, 'm', { size: 8 })}
</g>
<g ${L(1, 'up', { d: 2.5 })}>
  <rect x="70" y="122" width="176" height="16" rx="5" class="fb"/><text x="158" y="162" class="mid ts fb">get ready 60</text>
  <circle cx="70" cy="130" r="11" class="fd"/><text x="70" y="104" class="mid ts fd tb">start 7:35</text>
</g>
<g ${L(1, 'pop', { d: 5.5 })}>
  <circle cx="70" cy="214" r="18" class="fn sd"/><path d="M70 204 V214 L78 220 M56 196 l-8 -8 M84 196 l8 -8" class="fn sd"/>
  <text x="100" y="219" class="ts fd tb">this time gets the alarm</text>
</g>
<text x="200" y="266" class="mid ts fc" ${L(2, 'up')}>an alarm at 9:00 only says: you are late</text>
<g ${L(3, 'up')}>
  <rect x="24" y="290" width="352" height="74" rx="14" class="fp"/>
  <text x="200" y="318" class="mid ts">when the alarm rings, I stand up</text>
  <text x="200" y="344" class="mid ts">when my shoes are on, I leave</text>
</g>`;

// ---------- 14: The short version ----------
const s14 = `
<g ${L(0, 'up')}>${row(20, 'Sensed less reliably', 'it shrinks, and it stretches', `<path d="M6 30 Q20 6 36 30 T66 30" class="fn sc"/>`)}</g>
<g ${L(1, 'up')}>${row(112, 'Do not train it, replace it', 'the future feels real only when close', `<circle cx="36" cy="30" r="22" class="fn sa"/><path d="M36 14 V30 L48 38" class="fn sa"/>`)}</g>
<g ${L(2, 'up')}>${row(204, 'Visible, measured, backwards', 'and let events do the remembering', `<path d="M10 44 l10 10 l22 -28" class="fn sd s3"/>`)}</g>
<text x="200" y="330" class="mid ts fm" ${L(3, 'up')}>next ADHD episode: love and relationships</text>`;

export default {
  id: '2026-11-23-adhs-02',
  date: '2026-11-23',
  area: 'adhs',
  series: 'Understanding ADHD',
  episode: 2,
  title: 'Time blindness: how ADHD bends the sense of time',
  hook: 'Forty minutes feel like ten, five minutes feel like twenty. Why the inner clock is unreliable with ADHD, and how to replace it.',
  level: 2,
  poster: 3,
  voice: 'female',
  scenes: [
    {
      title: 'Late, and honestly surprised',
      svg: s1,
      lines: [
        'Someone with ADHD arrives twenty minutes late, again. The strange part: they are honestly surprised.',
        'They did not decide that the appointment was unimportant. They looked at the clock, and twenty minutes had simply vanished.',
        { text: 'The researcher Russell Barkley calls this time blindness. It sounds like an excuse. It is a measurable difference in how the brain senses and uses time.', de: [['time blindness', 'Zeitblindheit']] },
        'Today: your inner clock, why time shrinks and stretches, and how to make time visible.',
      ],
    },
    {
      title: 'Two times: now and not now',
      svg: s2,
      css: css2,
      lines: [
        'The psychiatrist Edward Hallowell put it in one sentence. With ADHD, there are only two times: now, and not now.',
        'An appointment next Thursday is not now. It stays not now on Monday, on Tuesday and on Wednesday. Then, without warning, it is now.',
        'Remember the first ADHD episode: a reward in the future loses its pull very fast. The same happens to the future itself.',
        { text: 'Barkley speaks of a short time horizon: the distance into the future that still feels real enough to act on.', de: [['time horizon', 'Zeithorizont']] },
      ],
    },
    {
      title: 'Your inner clock',
      svg: s3,
      lines: [
        'How does a brain sense time at all? There is no single clock organ. But one model has explained the experiments well for decades.',
        { text: 'Imagine a metronome in your head that ticks all the time. A counter adds up the ticks. Many ticks mean: a long time has passed.', de: [['inner clock', 'innere Uhr']] },
        'The speed of the metronome depends partly on dopamine, the messenger substance from the last ADHD episode. More dopamine, faster ticking.',
        'Several brain regions work together here. They are the same ones that manage attention and movement.',
      ],
    },
    {
      title: 'The gate',
      svg: s4,
      quiz: {
        q: 'With ADHD, 40 minutes of gaming can feel like 10, and a 5-minute wait like 20. Which explanation covers both observations at once?',
        options: [
          { text: 'Ticks count only while attention is on time, and attention swings', correct: true, why: 'Absorbed, the gate is shut and ticks are lost, so time shrinks. Bored, the gate is open and every tick counts, so time stretches. One mechanism, both effects.' },
          { text: 'The inner metronome ticks too slowly, so too few ticks are counted', why: 'Too few ticks would explain why the game feels short. But then the wait would feel short as well, and it feels long.' },
          { text: 'The inner metronome ticks too fast, so too many ticks are counted', why: 'Too many ticks would explain the endless wait. But then forty minutes of gaming would feel even longer than forty minutes.' },
          { text: 'Durations fade quickly in memory, so every interval shrinks afterwards', why: 'A fading memory fits the game. But it would shrink the wait too, and the wait is remembered as far too long.' },
        ],
        explain: 'Picture a rain gauge with a lid. The rain falls evenly all day. If someone keeps the lid closed most of the time, the gauge shows little rain, although it rained normally. If the lid stays open the whole time, the gauge fills up quickly. The rain is the ticking, the gauge is the counter, and the lid is your attention. A rain that is simply too weak or too strong would push every reading in the same direction. Only the lid can produce readings that are far too low in one hour and far too high in the next. That is why the two opposite experiences point to the gate, not to the speed of the clock.',
      },
      lines: [
        { text: 'The crucial part of the model sits between the metronome and the counter: a gate.', de: [['gate', 'Tor']] },
        'Ticks are counted only while your attention is on time itself. When your attention is elsewhere, the gate closes, and ticks are lost.',
        'You are absorbed in a game. The gate is nearly shut. Forty minutes pass, but only ten minutes of ticks are counted.',
        'You are waiting in a queue, bored. The gate is wide open, every tick is counted, and five minutes feel like twenty.',
        'With ADHD, attention swings more strongly in both directions. So time shrinks more when you are absorbed, and stretches more when you wait.',
      ],
    },
    {
      title: 'What the measurements show',
      svg: s5,
      lines: [
        { text: 'Is this more than a nice story? Yes. One analysis combined 55 studies, another one 27.', say: 'Is this more than a nice story? Yes. One analysis combined fifty-five studies, another one twenty-seven.' },
        'The tasks are simple. Which of two tones was longer? Or: press the button for exactly as long as the light was on.',
        { text: 'On average, people with ADHD are less accurate in these tasks. And their answers vary more from one try to the next.', de: [['accurate', 'genau']] },
        'The difference is medium-sized. In numbers: about three out of four people with ADHD are less precise than the average person without ADHD.',
        'One in four is more precise. So this is a tendency in a group, not a rule for every single person.',
      ],
    },
    {
      title: 'Three kinds of time',
      svg: s6,
      quiz: {
        q: 'About three in four people with ADHD are less precise at timing than the average person without ADHD. Which conclusion is justified?',
        options: [
          { text: 'A timing test alone cannot show who has ADHD, because the groups overlap', correct: true, why: 'A quarter of the ADHD group scores above the other group’s average, and half of the people without ADHD score below it. A single result fits both groups.' },
          { text: 'Three in four people with ADHD have a disorder of time perception', why: 'Below average is not the same as disordered. Half of all people without ADHD are below that average too.' },
          { text: 'ADHD makes below-average timing three times as likely', why: 'Three in four sounds like three to one. But one in two people without ADHD is below the average as well. Three quarters against one half is one and a half times.' },
          { text: 'In three of four cases, poor timing causes the other ADHD symptoms', why: 'The number compares test results between two groups. It says nothing about what causes what.' },
        ],
        explain: 'Think of body height. Men are taller than women on average, and by a much wider margin than in the timing data. Still, if you only know that someone is 1.72 metres tall, you cannot say whether it is a man or a woman. Both groups contain many people of that height. Average differences describe groups. They do not sort individuals. In the timing data, the two curves overlap even more. So the statement that three in four are below the average of the other group is true, and it is still useless as a test. And remember that the average cuts the comparison group in half: one in two is below it by definition.',
      },
      lines: [
        'Researchers separate three kinds of timing. ADHD affects all three on average.',
        'The first is rhythm: timing in fractions of a second, as in tapping to a beat or catching a ball.',
        { text: 'The second is felt duration: seconds to minutes. How long have I been in the shower?', de: [['duration', 'Dauer']] },
        { text: 'The third is foresight: days, weeks and months. When do I have to start, so that I am finished in time?', de: [['foresight', 'Voraussicht']] },
        'The first two can be measured in a lab. The third one causes most of the trouble in daily life.',
      ],
    },
    {
      title: 'Why everything takes longer than you think',
      svg: s7,
      lines: [
        { text: 'Foresight is hard for everybody. Psychologists call it the planning fallacy.', de: [['planning fallacy', 'Planungsfehlschluss']] },
        { text: 'In a classic study, students predicted they would finish their thesis in 34 days. On average, they needed 55.', say: 'In a classic study, students predicted they would finish their thesis in thirty-four days. On average, they needed fifty-five.' },
        'People plan for the best case. They imagine the task itself, and forget everything around it.',
        'With ADHD, two things come on top. Past durations are remembered poorly. And the time between tasks stays invisible: finding the keys, the shoes, the charger.',
      ],
    },
    {
      title: 'The one-more-thing trap',
      svg: sTrap,
      css: cssTrap,
      lines: [
        'There is a hidden reason for lateness that few people see. Being early means waiting, and waiting is exactly what feels worst.',
        'So the brain avoids it. With ten minutes left, it starts one more quick thing. One more message, one more bit of tidying.',
        { text: 'Researchers call this delay aversion. The quick thing takes longer than planned, as you now know, and the buffer is gone.', de: [['delay aversion', 'Abneigung gegen Warten']] },
        'The fix is to make being early pleasant. Keep something you enjoy for exactly these minutes: a podcast, a game, a chapter.',
      ],
    },
    {
      title: 'Remembering at the right moment',
      svg: s8,
      quiz: {
        q: 'Tom keeps forgetting his tablet at 8 in the morning. Which plan turns a clock-based task into an event-based one?',
        options: [
          { text: 'The box stands on the coffee machine: when I make coffee, I take one', correct: true, why: 'Making coffee happens anyway, and the box is in the way. The event and the object do the remembering. Nobody has to watch the clock.' },
          { text: 'A calendar entry for 8:00, which he checks every morning', why: 'Organised, but still clock-based: he has to remember to open the calendar at the right moment. The remembering is moved, not replaced.' },
          { text: 'Looking at the clock more often between 7 and 8', why: 'That is exactly the weak function: watching the time while doing something else. Asking for more of it rarely works.' },
          { text: 'A reward on Sunday for every week without a missed tablet', why: 'The first ADHD episode explains why this is weak: a reward days away has little pull. And it creates no signal at the right moment.' },
        ],
        explain: 'There are two ways to catch a train. You can keep looking at your watch while you read, which splits your attention the whole time. Or you can sit on the platform and simply notice when the train rolls in. The second way needs no watching, because the event comes to you. A clock-based task is the first way: you have to interrupt yourself at the right minute. An event-based plan is the second: something that happens anyway, and that you cannot miss, carries the reminder. A calendar or a firm intention still leaves the interrupting to you. A box on the coffee machine does it for you.',
      },
      lines: [
        { text: 'There is a second problem besides estimating. You also have to remember the plan at the right moment. Psychologists call this prospective memory.', de: [['prospective memory', 'prospektives Gedächtnis']] },
        'Remembering by the clock, for example calling someone at three, is consistently hard with ADHD. You would have to keep checking the time while doing something else.',
        'Remembering by an event is much easier, as long as the signal is hard to miss. When the coffee machine is running, I take my tablet.',
        'Such when-then plans have helped children with ADHD in experiments on self-control. The signal does the remembering for you.',
      ],
    },
    {
      title: 'The body clock runs late too',
      svg: s9,
      lines: [
        { text: 'There is one more clock, and it also runs differently: the body clock that makes you sleepy.', de: [['body clock', 'biologische Uhr']] },
        'In one study, about three out of four adults with ADHD had a delayed rhythm. The evening rise of the sleep hormone melatonin came about one and a half hours later.',
        'So falling asleep at a normal time is harder, and early mornings cut the night short. That is biology, not a lack of discipline.',
      ],
    },
    {
      title: 'What it costs, and what it does not mean',
      svg: s10,
      lines: [
        'In daily life, all of this adds up: being late, missed deadlines, late fees, and waiting that feels almost painful.',
        'Other people read lateness as a message: I am not important to you. With time blindness, it usually means something else: the time was misjudged.',
        'That is an explanation, not an excuse. The effect on others is real. But the cure is not to try harder to feel time.',
        'The cure is the same as in the first ADHD episode: move it outside your head.',
      ],
    },
    {
      title: 'Make time visible',
      svg: s11,
      lines: [
        { text: 'The first tool is the simplest one: make time something you can see.', de: [['visible', 'sichtbar']] },
        'A digital clock shows a number. You still have to calculate how much is left. A clock with hands shows time as a piece of a circle.',
        'Even better is a visual timer: a colored disc that shrinks as the time runs out. You see how much is left without thinking.',
        'Put clocks where the time gets lost: in the bathroom, next to the screen, and by the door.',
      ],
    },
    {
      title: 'Measure your own time',
      svg: s12,
      quiz: {
        q: 'Lena feels that getting ready takes 30 minutes. Her log says 45, 50, 40, 55 and 50. She must leave at 8:00. When should she start, by the rule?',
        options: [
          { text: 'At 7:00, one hour before leaving', correct: true, why: 'The measured average is 48 minutes. A quarter on top is 12 more, which makes 60. Sixty minutes before 8:00 is 7:00.' },
          { text: 'At 7:12, 48 minutes before leaving', why: 'That is the measured average without any buffer. On three of the five logged days, 48 minutes would not have been enough.' },
          { text: 'At 7:15, 45 minutes before leaving', why: 'That adds a half to the felt 30 minutes. But the rule starts from the measured time, and 45 minutes was enough on only two of five days.' },
          { text: 'At 7:30, 30 minutes before leaving', why: 'That trusts the feeling. According to her own log, 30 minutes has not been enough a single time.' },
        ],
        explain: 'Do it in two steps. Step one: replace the feeling by the measurement. The five logged times add up to 240 minutes. Divided by five, that is 48 minutes. Step two: add the buffer. A quarter of 48 is 12, so the plan is 60 minutes. Why a buffer at all, if 48 is the real average? Because an average is too short about half of the time. Whoever plans with exactly the average will be late on every second day. The quarter on top covers the slower days. And notice the trap in the third answer: adding a generous buffer to a wrong starting number still gives a wrong plan.',
      },
      lines: [
        'The second tool repairs the estimates. For one week, write down your guess before a recurring task, and then the time it really took.',
        { text: 'Most people find a steady factor. Getting ready feels like thirty minutes, and takes almost fifty.', de: [['estimate', 'Schätzung']] },
        { text: 'From then on, use one rule. Plan with the measured time, not with the felt time. And add a quarter on top as a buffer.', de: [['buffer', 'Puffer']] },
        'This is the same advice as with the AI tools: your feeling is a bad measuring device. So measure once, and then trust the number.',
      ],
    },
    {
      title: 'Plan backwards, tie it to events',
      svg: s13,
      lines: [
        'The third tool: plan backwards from the moment you have to arrive.',
        'Subtract the travel time. Subtract the time to get ready. What remains is your start time, and that is the time that gets the alarm.',
        'Not the appointment. An alarm at the time of the appointment only tells you that you are late.',
        'And tie the steps to events instead of clock times. When the alarm rings, I stand up. When my shoes are on, I leave.',
      ],
    },
    {
      title: 'The short version',
      svg: s14,
      lines: [
        'The short version. With ADHD, time is not ignored. It is sensed less reliably: it shrinks when you are absorbed, and stretches when you wait.',
        'The future feels real only when it is close. So do not train your sense of time. Replace it.',
        'Make time visible, measure your real durations, plan backwards, and let events do the remembering.',
        'The next ADHD episode is about love and relationships, where time blindness plays a part as well.',
      ],
    },
  ],
  takeaways: [
    'Time blindness is measurable: on average, people with ADHD sense durations less accurately and with more variation. The groups overlap, so it is a tendency, not a rule.',
    'The inner clock model has a gate: ticks count only while attention is on time. Absorbed, time shrinks; bored, it stretches. With ADHD, both effects are stronger.',
    'There are three kinds of timing: rhythm, felt duration and foresight. Foresight over days and weeks causes most everyday trouble.',
    'Everyone underestimates how long tasks take. With ADHD, poor memory for past durations and the invisible time between tasks come on top.',
    'Remembering by the clock is hard, remembering by a clear event is much easier. Use when-then plans.',
    'Replace the sense of time: visible clocks and timers, measured durations plus a quarter, backward planning with the alarm on the start time.',
  ],
  sources: [
    'Marx et al. (2021): Meta-analysis of altered perceptual timing abilities in ADHD (55 studies)',
    'Zheng et al. (2020): Time perception deficits in children and adolescents with ADHD, a meta-analysis (27 studies)',
    'Noreika, Falter & Rubia (2013): Timing deficits in ADHD, the three domains of timing',
    'Zakay & Block: the attentional gate model of time perception',
    'Buehler, Griffin & Ross (1994): the planning fallacy, with the thesis example',
    'Talbot et al. (2018): review of prospective memory in ADHD; Gawrilow & Gollwitzer (2008, 2011): if-then plans in children with ADHD',
    'Van Veen et al. (2010): delayed melatonin onset in adults with ADHD',
    'Sonuga-Barke et al.: delay aversion in ADHD',
    'Barkley: ADHD and the Nature of Self-Control; Hallowell & Ratey: Driven to Distraction',
  ],
};
