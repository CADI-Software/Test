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
const card = (x, y, l, title, sub, icon, o = {}) => `
<g ${L(l, 'up', o)}>
  <rect x="${x}" y="${y}" width="170" height="104" rx="14" class="fp"/>
  <g transform="translate(${x + 85} ${y + 32})">${icon}</g>
  <text x="${x + 85}" y="${y + 72}" class="mid ts tb">${title}</text>
  <text x="${x + 85}" y="${y + 91}" class="mid ts fm">${sub}</text>
</g>`;
const check = (cx, cy, c = 'd') => `<circle cx="${cx}" cy="${cy}" r="13" class="fk s${c}"/><path d="M${cx - 6} ${cy} l4 5 l8 -10" class="fn s${c}"/>`;
const cross = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="13" class="fk sc"/><path d="M${cx - 5} ${cy - 5} l10 10 M${cx + 5} ${cy - 5} l-10 10" class="fn sc"/>`;

// ---------- 1: Prepare without predicting ----------
const s1 = `
<g ${L(0, 'pop', { out: 2 })}>
  <text x="200" y="150" class="mid tx tb">how fast? how well?</text>
  <text x="200" y="186" class="mid tm fm">nobody knows</text>
</g>
<g ${L(2, 'up')}>
  <path d="M30 210 H370" class="fn si s3"/>
  <path d="M110 210 V110 M290 210 V110" class="fn si s3"/>
  <path d="M30 196 Q70 150 110 112 Q200 250 290 112 Q330 150 370 196" class="fn sm"/>
  <path d="M110 210 V250 M290 210 V250" class="fn sm"/>
  <path d="M250 40 q-22 0 -22 18 q-16 2 -14 16 q2 12 18 12 h56 q16 0 16 -14 q0 -12 -14 -14 q-2 -18 -22 -18 q-12 0 -18 0" class="fn sm"/>
  <path d="M276 92 l-10 18 h12 l-8 16" class="fn sb"/>
</g>
<g ${L(2, 'up', { d: 5 })}>
  <path d="M30 222 H370" class="fn sd s3"/>
  <text x="200" y="278" class="mid ts fd tb">not a forecast: a safety margin</text>
</g>
<text x="200" y="316" class="mid tl tb fa" ${L(3, 'up')}>no-regret moves</text>
${['work', 'skills', 'money', 'security'].map((t, i) => `<g ${L(4, 'pop', { d: 0.8 + i * 0.9 })}><rect x="${24 + i * 90}" y="340" width="82" height="34" rx="10" class="fp"/><text x="${65 + i * 90}" y="362" class="mid ts">${t}</text></g>`).join('')}`;

// ---------- 2: Three futures, one test ----------
const s2 = `
<g ${L(0, 'up')}>
  <circle cx="56" cy="200" r="12" class="fi"/><text x="56" y="236" class="mid ts fm">today</text>
  <path d="M68 196 C150 180 220 110 300 84" class="fn sd s3"/>
  <text x="320" y="64" class="end ts fd tb">slow: AI stays a tool</text>
</g>
<g ${L(1, 'up')}>
  <path d="M68 200 H300" class="fn sb s3"/>
  <text x="320" y="186" class="end ts fb tb">fast: office work changes</text>
</g>
<g ${L(2, 'up')}>
  <path d="M68 204 C120 230 140 260 170 250 L190 290 L214 262 L236 306 L262 284 L300 316" class="fn sc s3"/>
  <text x="320" y="346" class="end ts fc tb">bumpy: hype and misuse</text>
</g>
<g ${L(3, 'pop')}>${check(324, 84)}${check(324, 200)}${check(324, 316)}</g>
${box(356, 'one test: does this help in all three?', 3, { d: 2 })}`;

// ---------- 3: Jobs are bundles of tasks ----------
const tiles = Array.from({ length: 12 }, (_, i) => ({ x: 40 + (i % 4) * 50, y: 56 + Math.floor(i / 4) * 38, hot: [1, 6, 8, 11].includes(i) }));
const s3 = `
<text x="140" y="38" class="mid ts fm" ${L(0, 'up')}>one job</text>
<g ${L(0, 'pop')}>${tiles.filter((t) => !t.hot).map((t) => `<rect x="${t.x}" y="${t.y}" width="44" height="32" rx="6" class="fp sm s1"/>`).join('')}</g>
<g ${L(0, 'pop')}>${tiles.filter((t) => t.hot).map((t, i) => `<g class="pull" data-l="1" data-fx="state" data-d="${1.5 + i * 0.5}" style="--dx:${270 + (i % 2) * 54 - t.x}px;--dy:${60 + Math.floor(i / 2) * 42 - t.y}px"><rect x="${t.x}" y="${t.y}" width="44" height="32" rx="6" class="fp sc"/></g>`).join('')}</g>
<text x="318" y="38" class="mid ts fc tb" ${L(1, 'up', { d: 2 })}>tasks AI can do</text>
<g ${L(2, 'up')}>
  <text x="40" y="226" class="tx tb fa">4 of 5</text>
  <text x="150" y="216" class="ts">workers: at least a tenth</text><text x="150" y="234" class="ts">of their tasks exposed</text>
</g>
<g ${L(3, 'up')}>
  <text x="40" y="282" class="tx tb fb">1 of 5</text>
  <text x="150" y="272" class="ts">half of their tasks</text><text x="150" y="290" class="ts">or more</text>
</g>
${box(330, 'list your 10 tasks, mark the screen-only ones', 4)}`;
const css3 = `.pull{transition:transform 1.3s cubic-bezier(.4,0,.2,1)}.pull.on{transform:translate(var(--dx),var(--dy))}`;

// ---------- 4: What the first data shows ----------
const CX = (y) => 70 + (y - 2022) * 62;
const s4 = `
<text x="200" y="34" class="mid ts fm" ${L(0, 'up')}>the economy as a whole: no wave of job losses</text>
<g ${L(1, 'up')}>
  <path d="M70 80 V280 H352" class="fn sm"/>
  ${[2022, 2023, 2024, 2025, 2026].map((y) => `<text x="${CX(y)}" y="300" class="mid ts fm">${y}</text>`).join('')}
  <text x="76" y="74" class="ts fm">employment in the most exposed jobs</text>
</g>
<path d="M${CX(2022)} 130 L${CX(2023)} 134 L${CX(2024)} 158 L${CX(2025)} 196 L${CX(2026.5)} 244" class="fn sc s3" ${L(2, 'draw')}/>
<g ${L(2, 'up', { d: 1.2 })}>
  <text x="330" y="264" class="end tm tb fc">age 22 to 25: −19%</text>
</g>
<path d="M${CX(2022)} 130 L${CX(2024)} 126 L${CX(2026.5)} 128" class="fn si s3" ${L(3, 'draw')}/>
<text x="346" y="116" class="end ts" ${L(3, 'up')}>older workers, same jobs</text>
<text x="200" y="330" class="mid ts fb tb" ${L(3, 'up', { d: 3 })}>mostly less hiring, not firing</text>
${box(346, 'an early warning, not proof', 4, {}, 'tm')}`;

// ---------- 5: Where to move your bundle ----------
const s5 = `
<text x="200" y="38" class="mid tm" ${L(0, 'up')}>shift the mix of your tasks toward …</text>
${card(24, 58, 1, 'responsibility', 'someone has to sign', `<path d="M-18 12 H18 M-14 4 q8 -18 14 -6 q4 8 10 -4" class="fn sa"/>`)}
${card(206, 58, 2, 'trust', 'people rely on you', `<circle cx="-11" cy="-6" r="8" class="fn sb"/><circle cx="11" cy="-6" r="8" class="fn sb"/><path d="M-24 16 q13 -20 24 0 q11 -20 24 0" class="fn sb"/>`)}
${card(24, 174, 3, 'the real and unclear', 'problem not yet defined', `<path d="M-16 -12 q16 -10 22 2 q4 10 -8 14 v6" class="fn sd"/><circle cx="-2" cy="18" r="2.4" class="fd"/>`)}
${card(206, 174, 4, 'directing', 'decide and judge', `<path d="M-16 14 L14 -14" class="fn se s3"/><path d="M14 -14 l-12 2 M14 -14 l-2 12" class="fn se"/>`)}
${box(300, 'not a new profession: a different mix', 4, { d: 4 })}`;

// ---------- 6: Who gains from the helper ----------
const bar = (x, h, c, val, label, l, o = {}) => `<g ${L(l, 'up', o)}><rect x="${x}" y="${270 - h}" width="64" height="${h}" rx="6" class="f${c}"/><text x="${x + 32}" y="${258 - h}" class="mid tl tb f${c}">${val}</text><text x="${x + 32}" y="294" class="mid ts">${label}</text></g>`;
const s6 = `
<text x="200" y="38" class="mid ts fm" ${L(0, 'up')}>one company, over 5,000 support agents</text>
<path d="M50 270 H350" class="fn sm s1" ${L(0)}/>
${bar(168, 62, 'm', '+14%', 'on average', 1)}
${bar(64, 150, 'a', '+34%', 'beginners', 2)}
${bar(272, 6, 'b', '≈ 0', 'the best', 2, { d: 2.5 })}
<text x="200" y="326" class="mid ts fa" ${L(3, 'up')}>the tool passes on the know-how of the best</text>
${box(344, 'scarce: knowing when the machine is wrong', 4)}`;

// ---------- 7: The jagged frontier ----------
const JAG = 'M40 300 L80 250 L110 276 L150 190 L186 228 L214 150 L250 196 L286 110 L318 144 L360 70';
const s7 = `
<g ${L(0, 'up')}>
  <path d="${JAG}" class="fn si s3"/>
  <text x="200" y="38" class="mid ts fm">what AI can do: an uneven border</text>
</g>
<g ${L(1, 'up')}>
  <path d="${JAG} V310 H40 Z" class="fd" style="opacity:.16"/>
  <text x="270" y="262" class="mid tm tb fd">inside</text><text x="270" y="282" class="mid ts">25% faster, better rated</text>
  <circle cx="176" cy="250" r="8" class="fd"/>
</g>
<g ${L(2, 'up')}>
  <text x="120" y="98" class="mid tm tb fc">outside</text><text x="120" y="118" class="mid ts">19 points less often right</text>
  <circle cx="186" cy="196" r="8" class="fc"/>
</g>
<g ${L(3, 'up')}>
  <path d="M176 242 V204" class="fn sb dash"/>
  <text x="218" y="330" class="mid ts fb tb">two tasks that look alike</text>
</g>
${box(344, 'find the border by testing, again and again', 4)}`;

// ---------- 8: Feeling fast is not being fast ----------
const s8 = `
<g ${L(0, 'up')}>
  <text x="200" y="38" class="mid ts fm">16 experienced programmers, 246 real tasks</text>
  <path d="M200 70 V230" class="fn sm"/>
  <text x="200" y="250" class="mid ts fm">no change</text>
</g>
<g ${L(1, 'up')}>
  <rect x="124" y="96" width="76" height="40" rx="6" class="fc"/>
  <text x="112" y="122" class="end ts">measured</text>
  <text x="162" y="122" class="mid tm tb" style="fill:var(--k-bg)">19%</text>
  <text x="62" y="150" class="ts fc">slower</text>
</g>
<g ${L(1, 'up', { d: 3.5 })}>
  <rect x="200" y="166" width="80" height="40" rx="6" class="fa"/>
  <text x="292" y="192" class="ts">felt</text>
  <text x="240" y="192" class="mid tm tb" style="fill:var(--k-bg)">20%</text>
  <text x="292" y="220" class="ts fa">faster</text>
</g>
<text x="200" y="286" class="mid ts fm" ${L(2, 'up')}>tools have improved since: newer data are unclear</text>
<text x="200" y="316" class="mid tm fb tb" ${L(3, 'up')}>easy feels fast</text>
${box(338, 'time it, check it, then decide', 4, {}, 'tm')}`;

// ---------- 9: Money ----------
const cols = [['slow', 190, 'd'], ['fast', 262, 'b'], ['bumpy', 334, 'c']];
const s9 = `
<text x="200" y="40" class="mid tm" ${L(1, 'up')}>flexibility beats a clever bet</text>
<g ${L(2, 'up')}>
  ${cols.map(([t, x, c]) => `<text x="${x}" y="92" class="mid ts f${c} tb">${t}</text>`).join('')}
  <rect x="24" y="108" width="352" height="74" rx="14" class="fp"/>
  <text x="40" y="140" class="ts tb">reserve, low costs,</text><text x="40" y="160" class="ts tb">several incomes</text>
</g>
<g ${L(2, 'pop', { d: 5 })}>${cols.map(([, x]) => check(x, 145)).join('')}</g>
<g ${L(3, 'up')}>
  <rect x="24" y="196" width="352" height="74" rx="14" class="fp"/>
  <text x="40" y="228" class="ts tb">everything on</text><text x="40" y="248" class="ts tb">one story</text>
</g>
<g ${L(3, 'pop', { d: 4 })}>${check(190, 233, 'm')}${cross(262, 233)}${cross(334, 233)}</g>
<text x="200" y="300" class="mid ts fm" ${L(3, 'up', { d: 4 })}>a bet pays off in one future only</text>
${box(326, 'general logic, not advice for your own case', 4)}
<text x="200" y="40" class="mid tm fm" ${L(0, 'up', { out: 1 })}>money, when nobody can predict</text>`;

// ---------- 10: If you run a company ----------
const s10 = `
<text x="200" y="72" class="mid tx tb" ${L(0, 'pop', { out: 1 })}>For companies</text>
<g ${L(1, 'up')}>${row(20, 'Test on real work, measure', 'do not buy a promise', `<circle cx="36" cy="30" r="20" class="fn sa"/><path d="M36 18 V30 L46 36" class="fn sa"/>`)}</g>
<g ${L(2, 'up')}>${row(112, 'A human answers for results', 'responsibility stays visible', `<circle cx="36" cy="18" r="10" class="fn sb"/><path d="M16 54 q20 -34 40 0" class="fn sb"/>`)}</g>
<g ${L(3, 'up')}>${row(204, 'No single provider', 'keep your data portable', `<rect x="8" y="14" width="24" height="32" rx="4" class="fn se"/><rect x="44" y="14" width="24" height="32" rx="4" class="fn se"/><path d="M32 30 H44" class="fn se dash"/>`)}</g>
<g ${L(4, 'up')}>
  <text x="200" y="322" class="mid ts fm">what AI cannot copy</text>
  <text x="200" y="350" class="mid tm fd tb">trust · your own data · market access</text>
</g>`;

// ---------- 11: Misuse ----------
const wav = (x0, y) => { const hs = [10, 22, 14, 30, 18, 26, 12, 20, 8]; return hs.map((h, i) => `<path d="M${x0 + i * 10} ${y - h} V${y + h}" class="CLS"/>`).join(''); };
const s11 = `
<g ${L(0, 'up')}>
  ${wav(40, 90).replaceAll('CLS', 'fn sa s3')}
  <text x="80" y="144" class="mid ts fa">your voice</text>
</g>
<g ${L(1, 'up')}>
  ${arrow(146, 90, 236, 90, 'm')}
  <text x="191" y="76" class="mid ts fm">a few seconds</text>
  ${wav(256, 90).replaceAll('CLS', 'fn sc s3')}
  <text x="296" y="144" class="mid ts fc tb">the copy</text>
  <text x="200" y="184" class="mid ts">“I am in trouble, send money now”</text>
</g>
<g ${L(2, 'up')}>
  <rect x="24" y="208" width="352" height="62" rx="14" class="fp"/>
  <rect x="48" y="232" width="30" height="24" rx="5" class="fn sd"/><path d="M54 232 v-8 a9 9 0 0 1 18 0 v8" class="fn sd"/>
  <text x="98" y="236" class="tm tb fd">a code word</text><text x="98" y="256" class="ts fm">family and closest colleagues</text>
</g>
<g ${L(3, 'up')}>
  <rect x="24" y="284" width="352" height="62" rx="14" class="fp"/>
  <path d="M50 302 q-6 14 6 26 q12 12 24 6 l-6 -10 l-6 3 q-8 -5 -12 -13 l3 -6 z" class="fn sb"/>
  <text x="98" y="312" class="tm tb fb">a second channel</text><text x="98" y="332" class="ts fm">hang up, call back on the number you know</text>
</g>
<text x="200" y="376" class="mid ts fm" ${L(3, 'up', { d: 4 })}>both cost nothing</text>`;

// ---------- 12: Keep your own judgment in shape ----------
const step = (x, n, t, c, l, o = {}) => `<g ${L(l, 'pop', o)}><rect x="${x}" y="236" width="104" height="70" rx="14" class="fp"/><circle cx="${x + 52}" cy="258" r="13" class="fk s${c}"/><text x="${x + 52}" y="263" class="mid ts tb f${c}">${n}</text><text x="${x + 52}" y="292" class="mid tm">${t}</text></g>`;
const s12 = `
<text x="200" y="38" class="mid ts fm" ${L(0, 'up')}>the slow risk, on a personal scale</text>
<g ${L(1, 'up')}>
  <text x="200" y="78" class="mid ts">survey of 319 knowledge workers</text>
  ${arrow(110, 150, 110, 108, 'b')}<text x="110" y="174" class="mid ts">trust in the AI</text>
  ${arrow(290, 108, 290, 150, 'c')}<text x="290" y="174" class="mid ts">checking its answers</text>
</g>
<text x="200" y="208" class="mid ts fm" ${L(2, 'up')}>a link, not proof of cause</text>
${step(24, '1', 'think', 'a', 3)}${step(148, '2', 'ask', 'b', 3, { d: 1.5 })}${step(272, '3', 'check', 'd', 3, { d: 3.5 })}
<text x="200" y="346" class="mid ts fm" ${L(3, 'up', { d: 3.5 })}>your own rough answer first</text>`;

// ---------- 13: Your head ----------
const cal = Array.from({ length: 28 }, (_, i) => { const x = 66 + (i % 7) * 39, y = 70 + Math.floor(i / 7) * 39; return i === 6 ? '' : `<rect x="${x}" y="${y}" width="32" height="32" rx="6" class="fp"/>`; }).join('');
const s13 = `
<text x="200" y="38" class="mid ts fm" ${L(0, 'up')}>worry is useful until you have acted</text>
<g ${L(1, 'up')}>${cal}</g>
<g ${L(1, 'pop', { d: 3 })}>
  <rect x="300" y="70" width="32" height="32" rx="6" class="fb"/>
  <text x="316" y="56" class="mid ts fb tb">20 min</text>
</g>
<g ${L(2, 'up')}>
  <text x="200" y="258" class="mid ts">in the slot: read, update your list</text>
  <text x="200" y="280" class="mid ts fm">outside the slot: parked</text>
</g>
${box(308, 'prepare, then live', 3, {}, 'tm')}`;

// ---------- 14: The list ----------
const item = (i, t, l, d) => `<g ${L(l, 'up', { d })}><rect x="24" y="${24 + i * 46}" width="352" height="38" rx="10" class="fp"/><path d="M40 ${43 + i * 46} l5 6 l10 -12" class="fn sd"/><text x="68" y="${48 + i * 46}" class="ts">${t}</text></g>`;
const s14 = `
${item(0, 'know your 10 tasks', 1, 0)}
${item(1, 'shift toward responsibility, trust, judgment', 1, 2.2)}
${item(2, 'use AI, and measure instead of feeling', 1, 5)}
${item(3, 'build a reserve, avoid single bets', 2, 0)}
${item(4, 'a code word and a second channel', 2, 2.2)}
${item(5, 'think first, then ask', 2, 4)}
${box(316, 'no forecast needed: it helps in all three', 3)}
<text x="200" y="384" class="mid ts fm" ${L(3, 'up', { d: 3 })}>that is what being prepared means</text>`;

export default {
  id: '2026-11-21-ki-03',
  date: '2026-11-21',
  area: 'ki',
  series: 'AI risk',
  episode: 2,
  title: 'Preparing for an AI-shaped decade: what you can actually do',
  hook: 'Nobody can forecast how this goes. You do not need to. Six moves for work, skills, money and security that pay off in every future.',
  level: 2,
  poster: 6,
  voice: 'female',
  scenes: [
    {
      title: 'Prepare without predicting',
      svg: s1,
      lines: [
        'Last time, the honest answer was: nobody knows how fast AI will change things, or how well it will go.',
        'That sounds like a reason to do nothing. It is the opposite.',
        { text: 'Engineers build bridges for storms they cannot predict. They do not forecast the storm. They add a safety margin.', de: [['safety margin', 'Sicherheitsreserve']] },
        'Today is about the same idea for your own life: moves that pay off in almost any future. They are called no-regret moves.',
        'We go through four areas: your work, your skills, your money and your security. And at the end, your head.',
      ],
    },
    {
      title: 'Three futures, one test',
      svg: s2,
      lines: [
        'Picture three futures. In the first one, AI stays a useful tool, and change is slow.',
        'In the second, AI takes over a large part of office work within ten years.',
        'In the third, things get bumpy: a hype that bursts, mixed with serious misuse.',
        { text: 'You do not need to know which one comes. For every decision, ask one question: does this help me in all three?', de: [['scenario', 'Szenario']] },
      ],
    },
    {
      title: 'Jobs are bundles of tasks',
      svg: s3,
      css: css3,
      lines: [
        'Start with work. The usual question is: will AI take my job? That is the wrong unit.',
        { text: 'A job is a bundle of maybe twenty different tasks. AI does not take the bundle. It takes single tasks out of it.', de: [['task', 'Aufgabe']] },
        { text: 'One well-known study estimated that four out of five workers in the United States have at least a tenth of their tasks exposed to this technology.', de: [['exposed', 'betroffen']] },
        'And about one in five has half of their tasks exposed, or more.',
        'So list your own ten main tasks. Mark the ones that happen entirely on a screen: writing, summarizing, calculating, coding. Those are the exposed ones.',
      ],
    },
    {
      title: 'What the first data shows',
      svg: s4,
      quiz: {
        q: 'Young workers in exposed jobs: about 19% fewer than expected. Older workers in the same jobs: stable. Mostly less hiring. Which reading is best supported?',
        options: [
          { text: 'AI covers what beginners used to learn on, so the entry door narrows first', correct: true, why: 'This fits all three facts: only the young are affected, only in exposed jobs, and through hiring. The authors still call it a warning sign, not proof.' },
          { text: 'AI replaces experienced workers first, because they cost the most', why: 'Cost would be a motive, but the data show the opposite: older workers in the same jobs stayed stable.' },
          { text: 'It is proven that AI caused the drop, since it began after ChatGPT', why: 'Timing alone is not proof. The authors say the gap gets smaller when education is taken into account, and some trends began earlier.' },
          { text: 'Young people now prefer other careers, so nothing changed for employers', why: 'It cannot be ruled out completely. But a change of taste would hardly hit exactly the most exposed jobs and show up as fewer hires by firms.' },
        ],
        explain: 'Good detective work means finding the story that explains every clue, and then still admitting what is missing. Clue one: only the young are affected. Clue two: only in jobs where AI can do many tasks. Clue three: firms hire fewer, they do not fire more. A story about expensive seniors fails on clue one. A story about young people changing their minds struggles with clues two and three. The entry-door story fits all three. But payroll data cannot show why a firm did not hire someone, so even the best-fitting story remains a strong suspicion, not a verdict.',
      },
      lines: [
        'Is anything visible in the job market yet? For the economy as a whole: no. There is no wave of unemployment.',
        'But one group stands out. Researchers at Stanford follow the payroll data of millions of workers in the United States.',
        { text: 'By the middle of 2026, employment of 22- to 25-year-olds in the most exposed jobs was about 19 percent below that of their peers in other jobs.', say: 'By the middle of twenty twenty-six, employment of twenty-two to twenty-five-year-olds in the most exposed jobs was about nineteen percent below that of their peers in other jobs.' },
        { text: 'Older workers in the very same jobs were stable. And the change came mostly through less hiring, not through firing.', de: [['hiring', 'Neueinstellungen']] },
        { text: 'The authors call this an early warning, not proof. Still, the pattern fits: AI first replaces what beginners learn from books. Experience is protected for now.', de: [['experience', 'Erfahrung']] },
      ],
    },
    {
      title: 'Where to move your bundle',
      svg: s5,
      lines: [
        'So where should you move? Not to a new profession overnight. Shift the mix of tasks inside your work.',
        { text: 'Toward responsibility: tasks where someone has to sign and answer for the result.', de: [['responsibility', 'Verantwortung']] },
        'Toward trust: clients and colleagues who rely on you personally.',
        'Toward the physical world, and toward situations that are unclear, where the problem itself still has to be defined.',
        { text: 'And toward directing the machines: deciding what should be done, and judging whether the result is good.', de: [['judgment', 'Urteilsvermögen']] },
      ],
    },
    {
      title: 'Who gains from the helper',
      svg: s6,
      lines: [
        'Now skills. Experiments show quite clearly who gains most from AI help.',
        { text: 'In a company with over five thousand support agents, an AI assistant raised output by 14 percent on average.', say: 'In a company with over five thousand support agents, an AI assistant raised output by fourteen percent on average.' },
        { text: 'But beginners gained 34 percent, and the most experienced agents gained almost nothing.', say: 'But beginners gained thirty-four percent, and the most experienced agents gained almost nothing.' },
        'The tool handed the beginners the know-how of the best. That is good news if you are new in a field.',
        { text: 'And it has a consequence. Average skill becomes cheap. What becomes scarce is knowing when the machine is wrong.', de: [['scarce', 'knapp']] },
      ],
    },
    {
      title: 'The jagged frontier',
      svg: s7,
      lines: [
        { text: 'That knowledge has a name: the jagged frontier. Researchers tested it with 758 management consultants.', say: 'That knowledge has a name: the jagged frontier. Researchers tested it with more than seven hundred management consultants.', de: [['frontier', 'Grenze']] },
        { text: 'On tasks inside the ability of the AI, consultants with AI were about 25 percent faster, and their work was rated better.', say: 'On tasks inside the ability of the AI, consultants with AI were about twenty-five percent faster, and their work was rated better.' },
        { text: 'Then came one task that looked similar but lay just outside. There, consultants with AI were 19 percentage points less likely to get it right.', say: 'Then came one task that looked similar but lay just outside. There, consultants with AI were nineteen percentage points less likely to get it right.' },
        'They trusted a polished answer that was wrong. The border between the two kinds of tasks is not visible from outside.',
        'You find it only by testing, in your own field, again and again. It moves with every new model.',
      ],
    },
    {
      title: 'Feeling fast is not being fast',
      svg: s8,
      quiz: {
        q: 'You write reports with AI and feel much faster. Taking both studies together, what is the most useful next step?',
        options: [
          { text: 'Time similar reports with and without AI, and check the hard parts', correct: true, why: 'It answers both studies at once: the stopwatch replaces the feeling, and checking the hard parts shows where your tasks cross the frontier.' },
          { text: 'Trust the feeling: the consultants really were faster with AI', why: 'They were, on tasks inside the frontier. But the programmers also felt faster and were slower. The feeling alone cannot tell the two cases apart.' },
          { text: 'Use AI mainly for the parts where your own knowledge is weakest', why: 'It sounds efficient, but those are the parts where you cannot judge the output. That is exactly how the consultants got the outside task wrong.' },
          { text: 'Stop using AI for reports, since the programmers were slower with it', why: 'That stretches one result too far. It was a different kind of task with older tools, and newer measurements are unclear.' },
        ],
        explain: 'Imagine a new shortcut on your way to work. It feels faster, because you keep moving instead of waiting at lights. Whether it really is faster, only the clock can tell you. And it may be faster on dry days and slower when it rains. AI tools are that shortcut. One study shows the feeling can be wrong. The other shows the answer depends on the exact task, in ways you cannot see in advance. Both problems have the same cure: a small, honest test on your own real work, with a clock and a check of the result.',
      },
      lines: [
        { text: 'One more result, and it is humbling. In 2025, a research group measured 16 experienced programmers on 246 real tasks.', say: 'One more result, and it is humbling. In twenty twenty-five, a research group measured sixteen experienced programmers on more than two hundred real tasks.' },
        { text: 'With AI tools, they took 19 percent longer. Afterwards, they believed AI had made them 20 percent faster.', say: 'With AI tools, they took nineteen percent longer. Afterwards, they believed AI had made them twenty percent faster.' },
        'The tools have improved since then, and newer measurements are less clear. The lasting lesson is a different one.',
        { text: 'Your feeling is a bad measuring device here. Working with AI feels easier, and easy feels fast.', de: [['to measure', 'messen']] },
        'So measure. Take a few real tasks, time them with and without the tool, and check the results. Then you know where it truly helps you.',
      ],
    },
    {
      title: 'Money: build slack, do not place bets',
      svg: s9,
      quiz: {
        q: 'Which of these moves passes the three-futures test best, meaning it helps in a slow, a fast and a bumpy future?',
        options: [
          { text: 'Lower your fixed costs and win a second group of customers', correct: true, why: 'More room to move helps whether change is slow, fast or chaotic. It costs something in every future, but it never turns into a trap.' },
          { text: 'Retrain now for a trade that AI clearly cannot do', why: 'A strong move if change is fast. But it is expensive and hard to reverse, and in a slow future you gave up your experience for nothing.' },
          { text: 'Wait with AI tools until the technology has settled down', why: 'It avoids mistakes in a bumpy future. In the slow and the fast future, you lose the practice that everyone around you is collecting.' },
          { text: 'Put a large part of your savings into leading AI companies', why: 'It pays off if the fast future arrives and these firms win. If the hype bursts, the same bet hits you at the worst moment.' },
        ],
        explain: 'Think of packing for a trip without a weather forecast. Shorts are perfect if it is hot. A heavy coat is perfect if it is cold. A light rain jacket is perfect in neither case, but it is the only item you will not regret in any weather. No-regret moves are the rain jacket. They rarely look brilliant, because in each single future there is a move that would have been better. Their value is that they are never the wrong thing. Bold bets are the shorts and the coat: great if you guessed right, costly if you did not.',
      },
      lines: [
        'Now money. I cannot tell you what to do with yours. But the logic of uncertainty gives a clear direction.',
        'When you cannot predict, flexibility is worth more than a clever bet.',
        { text: 'That means a reserve that covers several months of expenses. Low fixed costs. And more than one source of income, or more than one group of customers.', de: [['reserve', 'Rücklage'], ['fixed costs', 'Fixkosten']] },
        'It also means not putting everything on one story. Neither on the AI boom that makes everyone rich, nor on the great collapse.',
        'Run the test from the beginning. A reserve helps in all three futures. A single big bet helps in one.',
      ],
    },
    {
      title: 'If you run a company',
      svg: s10,
      lines: [
        'If you run a company, the same logic applies, with three additions.',
        'First, try AI on real work processes and measure the effect, just as before. Do not buy a promise.',
        'Second, keep a human responsible for every result that leaves the house. Customers forgive a mistake. They do not forgive it when nobody is responsible.',
        { text: 'Third, do not depend on a single provider. Keep your data in a form that you can take elsewhere.', de: [['provider', 'Anbieter']] },
        'And notice what AI cannot copy: the trust of your customers, your own data, and your access to the market. That is where your protection moves.',
      ],
    },
    {
      title: 'Misuse: close the cheap doors',
      svg: s11,
      lines: [
        'Third area: security. Remember misuse from the last episode. One form has already arrived: cloned voices.',
        { text: 'A few seconds of recorded speech can be enough to imitate a voice. Then comes a call: your child, your partner or your boss, in trouble, needing money now.', de: [['fraud', 'Betrug']] },
        'The defense costs nothing. Agree on a code word with your family and your closest colleagues. Whoever asks for money by phone has to know it.',
        'And confirm every urgent payment request through a second channel. Hang up, and call back on the number you know.',
      ],
    },
    {
      title: 'Keep your own judgment in shape',
      svg: s12,
      quiz: {
        q: 'In the survey, people who trusted AI more reported less critical checking. Which statement goes beyond what this result can show?',
        options: [
          { text: 'Using AI makes people worse at thinking critically', correct: true, why: 'This is a claim about cause. A survey at one point in time shows a link only. Perhaps people check less because the tasks were easy, or less careful people trust more.' },
          { text: 'Trust in the tool and checking its answers tend to move in opposite directions', why: 'That is exactly what the survey found, so this statement stays within the data.' },
          { text: 'People who trust their own skill more tend to check more', why: 'The survey reported this second link as well. It is a finding, not a step beyond it.' },
          { text: 'It is sensible to check important answers, even from a tool you trust', why: 'This is advice, not a factual claim about the data. And it is cheap advice that holds whatever the true cause is.' },
        ],
        explain: 'Suppose a survey finds that people who own an umbrella get wet less often. One reading: umbrellas keep you dry. Another: careful people buy umbrellas, and careful people also check the weather and stay inside. The survey alone cannot tell these apart. The AI survey has the same shape. Maybe trusting the tool makes people lazy. Maybe people who check less by nature are the ones who trust more. Maybe they trusted it on tasks that truly needed no checking. To prove a cause, you would have to assign people to use AI or not, and then compare them.',
      },
      lines: [
        'Fourth: the slow risk from last time, dependence. It also exists on a personal scale.',
        { text: 'Researchers asked 319 knowledge workers how they use AI. The more they trusted the AI, the less critical thinking they reported.', say: 'Researchers asked more than three hundred knowledge workers how they use AI. The more they trusted the AI, the less critical thinking they reported.', de: [['critical thinking', 'kritisches Denken']] },
        'The more they trusted themselves, the more they checked. That is a link, not proof of cause. But it suggests a simple rule.',
        'Think first, then ask. Form your own rough answer before you read the answer of the machine. And check what matters.',
      ],
    },
    {
      title: 'Your head: prepare, then live',
      svg: s13,
      lines: [
        { text: 'And finally, your head. Worry is useful as long as it makes you act. After that, it only costs you.', de: [['worry', 'Sorge']] },
        'Therapists use a simple technique for this: a fixed worry time. For example, twenty minutes on the first Sunday of the month.',
        'In that slot, you read your one or two sources and update your list. Outside of it, the topic is parked.',
        'The idea behind it: your mind lets go more easily of something that has a fixed appointment.',
      ],
    },
    {
      title: 'The list',
      svg: s14,
      lines: [
        'Here is the whole list.',
        'Know your ten tasks, and shift toward responsibility, trust and judgment. Use AI, and measure instead of feeling.',
        'Build a reserve, and avoid single bets. Agree on a code word. And think first, then ask.',
        'None of this needs a forecast. All of it helps in a slow, a fast and a bumpy future. That is what being prepared means.',
      ],
    },
  ],
  takeaways: [
    'You cannot forecast how AI develops, but you can choose moves that help in a slow, a fast and a bumpy future (no-regret moves).',
    'AI takes tasks out of jobs, not whole jobs at once. So far the data show fewer entry-level hires in exposed jobs, not mass unemployment.',
    'Shift your mix of tasks toward responsibility, trust, unclear real-world problems, and directing and judging the work of machines.',
    'AI lifts beginners most, and its ability has an uneven border. Feeling faster is not proof: time real tasks and check the results.',
    'With money, flexibility beats a bet: a reserve, low fixed costs, more than one income. This is general logic, not individual advice.',
    'Cheap protection: a code word and a second channel against cloned voices, thinking before asking, and a fixed slot for worry.',
  ],
  sources: [
    'Eloundou et al. (2023): GPTs are GPTs. An early look at the labor market impact potential of large language models',
    'Brynjolfsson, Chandar & Chen: Canaries in the Coal Mine? (Stanford Digital Economy Lab, 2025, revised August 2026)',
    'Brynjolfsson, Li & Raymond (2025): Generative AI at Work, Quarterly Journal of Economics',
    'Dell’Acqua et al. (2023): Navigating the Jagged Technological Frontier (field experiment with 758 consultants)',
    'METR (July 2025): randomized trial with experienced open-source developers; update of February 2026',
    'Lee et al. (2025), CHI: The impact of generative AI on critical thinking (survey of 319 knowledge workers)',
    'International AI Safety Report 2026: employment effects so far',
    'Borkovec et al. (1983): stimulus control for worry (the basis of the “worry time” technique)',
  ],
};
