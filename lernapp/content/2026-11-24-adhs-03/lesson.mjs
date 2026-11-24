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
const chips = (items, y, l, c = '') => items.map(([t, x, w], i) => `<g ${L(l, 'pop', { d: 0.6 + i * 1.2 })}><rect x="${x}" y="${y}" width="${w}" height="34" rx="10" class="fp"/><text x="${x + w / 2}" y="${y + 22}" class="mid ts ${c}">${t}</text></g>`).join('');
const moon = (x, y, r = 14) => `<path d="M${x + r * 0.5} ${y - r} a${r} ${r} 0 1 0 ${r * 0.5} ${r * 1.7} a${r * 0.78} ${r * 0.78} 0 1 1 ${-r * 0.5} ${-r * 1.7} z" class="fb"/>`;
const sun = (x, y, r = 14) => `<circle cx="${x}" cy="${y}" r="${r}" class="fb"/>${Array.from({ length: 8 }, (_, i) => { const a = (i * Math.PI) / 4; return `<line x1="${(x + (r + 5) * Math.cos(a)).toFixed(1)}" y1="${(y + (r + 5) * Math.sin(a)).toFixed(1)}" x2="${(x + (r + 13) * Math.cos(a)).toFixed(1)}" y2="${(y + (r + 13) * Math.sin(a)).toFixed(1)}" class="sb"/>`; }).join('')}`;
// Zeitachse von 18:00 bis 12:00 am nächsten Tag
const HX = (h) => 40 + ((h < 18 ? h + 24 : h) - 18) * (320 / 18);
const axis = (y) => `<path d="M40 ${y} H360" class="fn sm"/>${[18, 21, 0, 3, 6, 9, 12].map((h) => `<path d="M${HX(h).toFixed(0)} ${y - 5} V${y + 5}" class="fn sm s1"/><text x="${HX(h).toFixed(0)}" y="${y + 24}" class="mid ts fm">${h}:00</text>`).join('')}`;
const band = (h0, h1, y, c, h = 22) => `<rect x="${HX(h0).toFixed(0)}" y="${y}" width="${(HX(h1) - HX(h0)).toFixed(0)}" height="${h}" rx="6" class="f${c}"/>`;

// ---------- 1: The alarm rings at night ----------
const s1 = `
<g ${L(0, 'up')}>
  ${moon(70, 70)}<circle cx="120" cy="50" r="2.5" class="fi"/><circle cx="310" cy="64" r="2.5" class="fi"/><circle cx="340" cy="120" r="2" class="fi"/><circle cx="56" cy="150" r="2" class="fi"/>
  <circle cx="200" cy="130" r="62" class="fp si"/>
  <path d="M158 80 l-18 -14 M242 80 l18 -14" class="fn si s3"/>
  <text x="200" y="142" class="mid tx tb">6:30</text>
  <text x="200" y="222" class="mid ts fb tb">the alarm rings in the inner night</text>
</g>
${chips([['a late clock', 24, 104], ['a slow start-up', 138, 124], ['no reward', 272, 104]], 250, 1)}
<text x="200" y="322" class="mid ts fm" ${L(1, 'up', { d: 4.5 })}>three things pile up. It is not weak will</text>
${box(340, 'the whole morning, step by step', 2)}`;

// ---------- 2: Two forces ----------
const s2 = `
<g ${L(0, 'up')}>
  <rect x="24" y="40" width="166" height="190" rx="14" class="fp"/>
  <path d="M82 70 H132 M82 170 H132 M86 70 Q86 108 107 120 Q128 132 128 170 M128 70 Q128 108 107 120 Q86 132 86 170" class="fn sa"/>
  <path d="M94 168 Q107 140 120 168 Z" class="fa"/>
  <text x="107" y="198" class="mid tm tb fa">sleep pressure</text>
  <text x="107" y="218" class="mid ts fm">grows while you are up</text>
</g>
<g ${L(1, 'up')}>
  <rect x="210" y="40" width="166" height="190" rx="14" class="fp"/>
  <rect x="258" y="70" width="70" height="90" rx="8" class="fk sb"/>${moon(288, 112, 12)}
  <text x="293" y="198" class="mid tm tb fb">body clock</text>
  <text x="293" y="218" class="mid ts fm">a window at night</text>
</g>
<g ${L(2, 'up')}>
  <text x="200" y="266" class="mid ts">falling asleep: enough pressure + open window</text>
</g>
<g ${L(3, 'up')}>
  <text x="200" y="298" class="mid ts">waking easily: pressure used up + clock on “day”</text>
  <text x="200" y="336" class="mid tm fb tb">both forces must agree</text>
</g>`;

// ---------- 3: The clock runs late ----------
const s3 = `
<g ${L(0, 'up')}>
  ${axis(250)}
  <text x="200" y="40" class="mid tm">3 of 4 people with ADHD: a delayed rhythm</text>
  ${band(23, 7, 100, 'm')}
  <text x="${((HX(23) + HX(7)) / 2).toFixed(0)}" y="92" class="mid ts fm">typical sleep window</text>
</g>
<g ${L(1, 'up')}>
  ${band(0.5, 8.5, 160, 'b')}
  <text x="${((HX(0.5) + HX(8.5)) / 2).toFixed(0)}" y="200" class="mid ts fb tb">with ADHD: 1.5 hours later</text>
  ${arrow(HX(23), 142, HX(0.5), 142, 'b', { size: 8 })}
</g>
<text x="200" y="304" class="mid ts fm" ${L(2, 'up')}>measured in hormones, already in children</text>
<g ${L(3, 'up')}>
  <path d="M${HX(23).toFixed(0)} 150 V236" class="fn sc dash"/>
  <text x="${(HX(23) - 6).toFixed(0)}" y="176" class="end ts fc tb">in bed at 23:00:</text>
  <text x="${(HX(23) - 6).toFixed(0)}" y="194" class="end ts fc">window still shut</text>
</g>`;

// ---------- 4: Why the evening pulls ----------
const s4 = `
<g ${L(0, 'up')}>
  ${moon(60, 60)}
  <text x="218" y="56" class="mid tm">nobody wants anything from you</text>
  <text x="218" y="78" class="mid ts fm">no messages, no demands</text>
</g>
<g ${L(1, 'up')}>
  <path d="M40 220 H360" class="fn sm"/>
  <path d="M40 200 C110 190 160 204 210 180 S 300 110 340 118" class="fn sa s3"/>
  <text x="46" y="240" class="ts fm">morning</text><text x="354" y="240" class="end ts fm">after ten at night</text>
  <text x="300" y="100" class="mid ts fa tb">most awake</text>
</g>
<g ${L(2, 'up')}>
  <rect x="40" y="264" width="44" height="58" rx="7" class="fk sb"/><rect x="47" y="272" width="30" height="36" rx="2" class="fb" style="opacity:.7"/>
  <text x="98" y="288" class="ts fb tb">tablet before bed</text>
  <text x="98" y="308" class="ts fm">clock pushed back by more than an hour</text>
</g>
${box(338, 'stop the interesting, start the boring: the hardest task', 3)}`;

// ---------- 5: The arithmetic of the short night ----------
const s5 = `
<g ${L(0, 'up')}>
  ${axis(150)}
  ${band(1, 6.5, 100, 'c')}
  <path d="M${HX(6.5).toFixed(0)} 84 V150" class="fn si s3"/>
  <text x="${HX(6.5).toFixed(0)}" y="74" class="mid ts tb">alarm 6:30</text>
  <text x="${HX(1).toFixed(0)}" y="74" class="mid ts fc tb">asleep 1:00</text>
</g>
<g ${L(1, 'up')}>
  <text x="120" y="216" class="mid tx tb fc">5.5 h</text><text x="120" y="238" class="mid ts fm">night after night</text>
  <text x="290" y="216" class="mid tx tb">7 to 8 h</text><text x="290" y="238" class="mid ts fm">what most adults need</text>
</g>
<g ${L(2, 'up')}>
  ${band(2, 11, 262, 'b', 16)}
  <text x="${((HX(2) + HX(11)) / 2).toFixed(0)}" y="298" class="mid ts fb tb">weekend: asleep until 11:00</text>
  <text x="200" y="318" class="mid ts fm">it tells the clock: morning starts late</text>
</g>
${box(338, 'social jetlag: two time zones, every weekend', 3)}`;

// ---------- 6: What the alarm really hits ----------
const dial = (cx, cy, hour, c, label, time) => { const a = ((hour % 12) / 12) * 2 * Math.PI; const m = ((hour % 1) * 60 / 60) * 2 * Math.PI; return `<circle cx="${cx}" cy="${cy}" r="52" class="fp s${c}"/><path d="M${cx} ${cy} L${(cx + 28 * Math.sin(a)).toFixed(1)} ${(cy - 28 * Math.cos(a)).toFixed(1)}" class="fn s${c} s3"/><path d="M${cx} ${cy} L${(cx + 42 * Math.sin(m)).toFixed(1)} ${(cy - 42 * Math.cos(m)).toFixed(1)}" class="fn s${c}"/><circle cx="${cx}" cy="${cy}" r="4" class="f${c}"/><text x="${cx}" y="${cy + 80}" class="mid tm tb f${c}">${time}</text><text x="${cx}" y="${cy + 100}" class="mid ts fm">${label}</text>`; };
const s6 = `
<g ${L(0, 'up')}>${dial(107, 110, 6.5, 'i', 'the wall clock', '6:30')}</g>
<g ${L(1, 'up')}>
  ${dial(293, 110, 5, 'b', 'the inner clock', '5:00')}
  ${arrow(170, 110, 230, 110, 'b')}
  <text x="200" y="96" class="mid ts fb tb">−1.5 h</text>
</g>
<g ${L(2, 'up')}>
  <rect x="24" y="238" width="352" height="64" rx="14" class="fp"/>
  ${moon(56, 270, 12)}
  <text x="84" y="264" class="ts">body temperature near its lowest</text>
  <text x="84" y="286" class="ts">melatonin still in the blood</text>
</g>
${box(322, 'woken at five every day, and called lazy', 3, {}, 'tm')}`;

// ---------- 7: A brain that boots slowly ----------
const BRAIN = 'M92 172 C84 108 150 62 222 72 C292 62 340 114 328 172 C332 206 304 226 276 226 C268 226 262 230 260 238 L256 258 H234 L234 236 C166 242 100 228 92 172 Z';
const region = (cx, cy, rx, ry, d, c) => `<g class="lit" data-l="1" data-fx="state" data-d="${d}"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" class="f${c}"/></g>`;
const s7 = `
<text x="200" y="36" class="mid tm" ${L(0, 'up')}>sleep inertia: the fog after waking</text>
<g ${L(0, 'up')}>
  <path d="${BRAIN}" class="fp si"/>
  ${region(286, 160, 30, 40, 1.5, 'a')}${region(222, 130, 34, 40, 4, 'a')}${region(140, 150, 38, 48, 7.5, 'c')}
</g>
<g ${L(1, 'up')}>
  <text x="292" y="286" class="mid ts fa">back: first</text>
  <text x="130" y="286" class="mid ts fc tb">front: last</text>
  <text x="130" y="304" class="mid ts fm">planning, self-control</text>
</g>
<text x="200" y="334" class="mid ts" ${L(2, 'up')}>thicker after a short night, and in the inner night</text>
<text x="200" y="364" class="mid ts fb tb" ${L(3, 'up')}>with ADHD: both, almost every morning</text>`;
const css7 = `.lit{opacity:0;transition:opacity 1.6s ease}.lit.on{opacity:.45}`;

// ---------- 8: A start with no reward ----------
const s8 = `
<g ${L(1, 'up')}>
  <path d="M200 70 V110" class="fn sm"/><path d="M186 250 H214 L200 110 Z" class="fp sm"/>
  <g class="tilt" data-l="2" data-fx="state" data-d="1.5">
    <path d="M70 110 H330" class="fn si s3"/>
    <rect x="40" y="118" width="110" height="64" rx="12" class="fb"/>
    <text x="95" y="146" class="mid ts tb" style="fill:var(--k-bg)">warm bed</text><text x="95" y="166" class="mid ts tb" style="fill:var(--k-bg)">right now</text>
    <rect x="266" y="118" width="94" height="44" rx="12" class="fp sm"/>
    <text x="313" y="138" class="mid ts fm">a benefit,</text><text x="313" y="154" class="mid ts fm">hours away</text>
  </g>
</g>
<text x="200" y="40" class="mid ts fm" ${L(0, 'up')}>starting needs a signal: “this is worth it”</text>
<text x="200" y="290" class="mid ts fc tb" ${L(2, 'up', { d: 3 })}>the most one-sided decision of the day</text>
<g ${L(3, 'up')}>
  <rect x="120" y="314" width="160" height="42" rx="21" class="fk sb"/><text x="200" y="341" class="mid tm fb tb">snooze</text>
  <text x="200" y="382" class="mid ts fm">a small reward now, a bigger problem later</text>
</g>`;
const css8 = `.tilt{transform-origin:200px 110px;transition:transform 1.6s cubic-bezier(.3,1.4,.5,1)}.tilt.on{transform:rotate(-9deg)}`;

// ---------- 9: The circle ----------
const node = (x, y, lines, c) => `<rect x="${x - 72}" y="${y - 24}" width="144" height="48" rx="12" class="fp s${c}"/>${lines.map((t, i) => `<text x="${x}" y="${y + (lines.length === 1 ? 5 : -3 + i * 17)}" class="mid ts">${t}</text>`).join('')}`;
const s9 = `
<g ${L(0, 'up')}>${node(200, 60, ['a short night'], 'c')}</g>
<g ${L(1, 'up')}>
  ${arrow(268, 84, 296, 128, 'm')}
  ${node(292, 160, ['weaker attention', 'and self-control'], 'b')}
  ${arrow(276, 190, 244, 230, 'm')}
  ${node(200, 258, ['a later evening'], 'a')}
  ${arrow(134, 240, 112, 196, 'm')}
  ${arrow(112, 132, 138, 86, 'm')}
  <text x="96" y="168" class="mid ts fm">and again</text>
</g>
<text x="200" y="318" class="mid ts" ${L(2, 'up')}>restlessness: a tired brain keeping itself awake?</text>
<text x="200" y="342" class="mid ts fm" ${L(3, 'up')}>not proven, but better sleep often eases symptoms</text>`;

// ---------- 10: Worth checking ----------
const s10 = `
${card(24, 40, 1, 'restless legs', 'reported by 3 in 10', `<path d="M-18 -14 L-6 4 L-14 18 M6 -14 L14 4 L4 18" class="fn sc s3"/><path d="M-26 0 l-6 4 l6 4 M26 0 l6 4 l-6 4" class="fn sc s1"/>`)}
${card(206, 40, 2, 'medication timing', 'too late delays sleep', `<rect x="-24" y="-8" width="30" height="16" rx="8" class="fn sb"/><path d="M-9 -8 V8" class="fn sb"/><circle cx="18" cy="0" r="11" class="fn sb"/><path d="M18 -6 V0 L23 3" class="fn sb"/>`)}
<text x="200" y="26" class="mid ts fm" ${L(0, 'up')}>more common with ADHD, easy to miss</text>
<g ${L(3, 'up')}>
  <rect x="24" y="170" width="352" height="74" rx="14" class="fp sa"/>
  <text x="200" y="200" class="mid ts">very sleepy by day, despite enough hours in bed?</text>
  <text x="200" y="224" class="mid tm fa tb">a reason to see a doctor</text>
</g>`;

// ---------- 11: Light ----------
const s11 = `
<text x="200" y="36" class="mid tm" ${L(0, 'up')}>the strongest signal for the clock: light</text>
<g ${L(1, 'up')}>
  <rect x="24" y="56" width="166" height="176" rx="14" class="fp"/>
  ${sun(107, 104)}
  <text x="107" y="160" class="mid tm tb fb">morning: bright</text>
  <text x="107" y="182" class="mid ts">even under clouds</text>
  ${arrow(140, 208, 74, 208, 'b')}
  <text x="107" y="226" class="mid ts fb">clock moves earlier</text>
</g>
<g ${L(4, 'up')}>
  <rect x="210" y="56" width="166" height="176" rx="14" class="fp"/>
  ${moon(288, 104)}
  <text x="293" y="160" class="mid tm tb fa">evening: dim</text>
  <text x="293" y="182" class="mid ts">no bright screens</text>
  <text x="293" y="226" class="mid ts fa">clock stops sliding later</text>
</g>
<g ${L(2, 'up')}>
  <rect x="24" y="250" width="352" height="74" rx="14" class="fp"/>
  <text x="200" y="278" class="mid ts">small study: a bright lamp every morning, 3 weeks</text>
  <text x="200" y="300" class="mid ts fm">earlier rhythm, fewer symptoms; no control group</text>
</g>`;

// ---------- 12: Melatonin ----------
const tb = (y, label, w, val, c, extra = '') => `<text x="24" y="${y + 15}" class="ts">${label}</text><rect x="150" y="${y}" width="${Math.max(w, 3)}" height="20" rx="6" class="f${c}"/><text x="${158 + Math.max(w, 3)}" y="${y + 15}" class="ts f${c} tb">${val}</text>${extra}`;
const s12 = `
<text x="200" y="36" class="mid ts fm" ${L(0, 'up')}>a trial with 51 adults with ADHD, three weeks</text>
<text x="200" y="68" class="mid ts fm" ${L(1, 'up')}>how far the inner evening moved earlier</text>
<g ${L(1, 'up')}>${tb(84, 'dummy pill', 0, 'no change', 'm')}</g>
<g ${L(1, 'up', { d: 2.5 })}>${tb(120, 'melatonin', 88, '1 h 28', 'a')}</g>
<g ${L(2, 'up')}>${tb(156, 'melatonin + lamp', 118, '1 h 58', 'b')}</g>
<g ${L(2, 'up', { d: 3.5 })}>
  <rect x="24" y="196" width="352" height="54" rx="14" class="fp"/>
  <text x="200" y="218" class="mid ts">ADHD symptoms: −14%</text>
  <text x="200" y="238" class="mid ts fa tb">only with melatonin alone</text>
</g>
<g ${L(3, 'up')}>
  <text x="200" y="280" class="mid ts fc tb">two weeks later: back where it started</text>
  <text x="200" y="300" class="mid ts fm">real sleep times had barely moved</text>
</g>
${box(322, 'shiftable, if you keep at it. Dose: ask a doctor', 4)}`;

// ---------- 13: Hold the rhythm ----------
const wd = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const wx = (i) => 52 + i * 49;
const s13 = `
<text x="200" y="36" class="mid tm" ${L(0, 'up')}>the clock needs the same signal every day</text>
<g ${L(1, 'up')}>
  ${wd.map((d, i) => `<text x="${wx(i)}" y="76" class="mid ts fm">${d}</text>`).join('')}
  <path d="M30 120 H370" class="fn sm dash"/><text x="30" y="110" class="ts fm">6:30</text>
  ${wd.slice(0, 5).map((d, i) => `<circle cx="${wx(i)}" cy="120" r="8" class="fa"/>`).join('')}
  <text x="150" y="150" class="mid ts fa tb">the fixed point: getting up</text>
</g>
<g ${L(2, 'up')}>
  <circle cx="${wx(5)}" cy="138" r="8" class="fd"/><circle cx="${wx(6)}" cy="138" r="8" class="fd"/>
  <text x="${wx(5) + 40}" y="170" class="mid ts fd tb">+1 h: fine</text>
</g>
<g ${L(2, 'up', { d: 2.5 })}>
  <circle cx="${wx(5)}" cy="212" r="8" class="fc"/><circle cx="${wx(6)}" cy="212" r="8" class="fc"/>
  <path d="M${wx(5)} 150 V200" class="fn sc dash"/>
  <text x="${wx(5) + 24}" y="240" class="mid ts fc tb">+4 h: a week undone</text>
</g>
<text x="200" y="290" class="mid ts" ${L(3, 'up')}>to repay sleep: a short nap after lunch</text>
${box(322, 'hold the time you get up, also on weekends', 3, { d: 3 })}`;

// ---------- 14: The first ten minutes ----------
const s14 = `
<text x="200" y="36" class="mid tm" ${L(0, 'up')}>decide the evening before, not in the fog</text>
${card(24, 56, 1, 'a light alarm', 'bright before the sound', `<circle cx="0" cy="2" r="10" class="fb"/><path d="M-20 2 H-14 M14 2 H20 M0 -18 V-12 M-14 -12 l4 4 M14 -12 l-4 4" class="fn sb"/>`)}
${card(206, 56, 1, 'alarm out of reach', 'you have to stand up', `<circle cx="14" cy="0" r="12" class="fn sa"/><path d="M14 -6 V0 L19 3 M-22 12 H-2" class="fn sa"/><path d="M-12 12 V-6" class="fn sa dash"/>`, { d: 3.5 })}
${card(24, 172, 2, 'a reward that waits', 'coffee on a timer', `<path d="M-14 -8 H10 V8 Q10 14 4 14 H-8 Q-14 14 -14 8 Z" class="fn sd"/><path d="M10 -4 H16 Q20 -4 20 0 Q20 6 10 6" class="fn sd"/><path d="M-6 -16 q4 -4 0 -8 M4 -16 q4 -4 0 -8" class="fn sd s1"/>`)}
${card(206, 172, 3, 'a tiny first step', 'feet on the floor', `<path d="M-14 -14 V6 Q-14 14 -4 14 H12 Q16 14 14 8 L-2 4 V-14 Z" class="fn se"/><path d="M-20 18 H22" class="fn se"/>`)}
<text x="200" y="312" class="mid ts fm" ${L(3, 'up', { d: 3.5 })}>clothes laid out: nothing to choose</text>
${box(330, 'let things do the work', 3, { d: 5 }, 'tm')}`;

// ---------- 15: The short version ----------
const s15 = `
<g ${L(0, 'up')}>${row(20, 'Why it is hard', 'inner night, slow start-up, no reward', moon(36, 30, 14))}</g>
<g ${L(1, 'up')}>${row(112, 'Move the clock', 'morning light, a fixed time to get up', sun(36, 30, 10))}</g>
<g ${L(2, 'up')}>${row(204, 'Protect evening and morning', 'dim screens, a prepared start', `<path d="M10 44 l10 10 l22 -28" class="fn sd s3"/>`)}</g>
<text x="200" y="326" class="mid ts fm" ${L(3, 'up')}>thank you for the question</text>
<text x="200" y="350" class="mid ts" ${L(3, 'up', { d: 2 })}>more questions: write them into the feedback field</text>`;

export default {
  id: '2026-11-24-adhs-03',
  date: '2026-11-24',
  area: 'adhs',
  series: 'Understanding ADHD',
  episode: 3,
  title: 'Why getting up is so hard with ADHD',
  hook: 'For many people with ADHD, the alarm rings in the middle of their inner night. Three causes, and what moves the clock.',
  level: 2,
  poster: 5,
  voice: 'male',
  scenes: [
    {
      title: 'The alarm rings at night',
      svg: s1,
      lines: [
        'You asked why getting up is so hard with ADHD. The short answer: for many, the alarm rings in the middle of their night.',
        'It is not weak will. Three things pile up: a body clock that runs late, a brain that starts up slowly, and a start that offers no reward.',
        'Yesterday’s episode touched on the body clock. Today we look at the whole morning, step by step, and at what helps.',
      ],
    },
    {
      title: 'Two forces put you to sleep',
      svg: s2,
      lines: [
        { text: 'Sleep is controlled by two forces. The first is sleep pressure. It builds up every hour you are awake, like sand in an hourglass.', de: [['sleep pressure', 'Schlafdruck']] },
        'The second is the body clock. It opens a window for sleep at night, announced by the hormone melatonin.',
        'You fall asleep easily only when both agree: enough pressure, and an open window.',
        'And waking up is easy only when the pressure is used up, and the clock has switched to day.',
      ],
    },
    {
      title: 'The clock runs late',
      svg: s3,
      lines: [
        { text: 'With ADHD, the clock is the problem. In about three out of four people with ADHD, the whole rhythm is delayed.', de: [['delayed', 'verschoben']] },
        'Melatonin rises about one and a half hours later than usual. So the sleep window opens later, and it also closes later.',
        'This is not a habit that crept in. It shows up in hormone measurements, and already in children.',
        'It means: at eleven at night, the window is still shut. Going to bed on time only produces lying awake.',
      ],
    },
    {
      title: 'Why the evening pulls',
      svg: s4,
      lines: [
        'Then the evening adds its own pull. At night, nobody wants anything from you. No messages, no demands.',
        'For a brain that fights distraction all day, this is the hour when it finally works well. Many people with ADHD feel most awake after ten.',
        'Screens make it worse. In one experiment, reading on a tablet before bed pushed the body clock back by more than an hour, compared with a printed book.',
        'And stopping something interesting in order to do something boring, like going to bed, is the exact task this brain is worst at.',
      ],
    },
    {
      title: 'The arithmetic of the short night',
      svg: s5,
      quiz: {
        q: 'On holiday, Mara sleeps from 1:00 to 9:00 and feels fine. On workdays she is in bed at 23:00, lies awake until 1:00, and suffers at 6:30. What fits both?',
        options: [
          { text: 'Her sleep window sits late, and an early bedtime does not move it', correct: true, why: 'Free of duties, she drifts to one o’clock. Forced to bed earlier, she still falls asleep at one. The window stays put, only the alarm changes.' },
          { text: 'She needs more sleep than other people do', why: 'On holiday, eight hours are enough for her. The problem on workdays is when she can sleep, not how much she needs.' },
          { text: 'Her evening habits are poor, so she cannot switch off', why: 'Being in bed at 23:00 is disciplined. And on holiday she falls asleep at 1:00 without trouble. Habits do not explain the fixed hour.' },
          { text: 'Stress on workdays keeps her awake and makes mornings hard', why: 'Stress can do that. But it would not explain why she lands on exactly the same hour, one o’clock, when she is free and relaxed.' },
        ],
        explain: 'Think of a shop with fixed opening hours, from one to nine. You can stand at the door at eleven, but it will not open earlier because you are there. That is Mara in bed at 23:00: the waiting is real, but the door stays shut. On holiday she simply arrives when the shop opens and stays until it closes, so everything feels easy. On workdays she has to leave at half past six, long before closing time. The amount of sleep she needs is ordinary. Her habits are fine. What differs from other people is the position of the opening hours, and going to bed earlier does not move them.',
      },
      lines: [
        'Now do the arithmetic. The window opens at one in the morning. The alarm is set for half past six.',
        'That is five and a half hours, night after night. Most adults need seven to eight.',
        'On the weekend, the body takes back what it can, and sleeps until eleven. That feels like recovery. But it tells the clock: morning starts late.',
        { text: 'Researchers call the gap between body clock and alarm clock social jetlag. It is like flying two time zones west every Friday, and back every Monday.', de: [['social jetlag', 'sozialer Jetlag']] },
      ],
    },
    {
      title: 'What the alarm really hits',
      svg: s6,
      quiz: {
        q: 'Jonas’s melatonin rises at 0:30. The usual time is 22:00. His alarm rings at 7:00. Which inner time does it hit, compared with a typical clock?',
        options: [
          { text: 'About 4:30 in the morning', correct: true, why: 'His clock runs two and a half hours late: from 22:00 to 0:30. Seven o’clock minus two and a half hours is half past four.' },
          { text: 'About 5:30 in the morning', why: 'That uses the one and a half hours from the example. But his own delay, from 22:00 to 0:30, is two and a half hours.' },
          { text: 'About 9:30 in the morning', why: 'That adds the delay instead of subtracting it. A late clock means the body is behind the wall clock, not ahead of it.' },
          { text: 'About 7:00 in the morning', why: 'That would be true for a clock without any delay. His melatonin shows a clear shift, so his inner time is earlier.' },
        ],
        explain: 'Treat it like a time zone. Jonas’s body lives two and a half hours west of the place where he actually is. You get that number from the melatonin: it rises at half past midnight instead of at ten, and the difference is two and a half hours. When it is seven on the wall, it is therefore half past four in his body. The direction matters. A body that is behind has an earlier time than the wall clock, so you subtract. And the size matters too: the one and a half hours in the episode were an average. Each person has their own delay.',
      },
      lines: [
        'So what does the alarm hit at half past six? For a typical body clock, half past six is the edge of morning.',
        'For a clock that runs one and a half hours late, the same alarm lands at an inner time of five o’clock.',
        'Body temperature is near its lowest point then, and melatonin is still in the blood. Every signal in the body says: night.',
        'Imagine being woken at five every single day, and being called lazy for struggling. That is the situation.',
      ],
    },
    {
      title: 'A brain that starts up slowly',
      svg: s7,
      css: css7,
      lines: [
        { text: 'Then comes the second problem: sleep inertia. It is the fog in the first minutes after waking.', de: [['sleep inertia', 'Schlaftrunkenheit']] },
        'The brain does not switch on all at once. The regions for planning and self-control, at the front, come back last.',
        'Usually the fog lifts within half an hour. But it is much thicker after a short night, and when you wake during your inner night.',
        'With ADHD, both conditions are met almost every morning. And the part that comes back last is the part that was weaker to begin with: the management.',
      ],
    },
    {
      title: 'A start with no reward',
      svg: s8,
      css: css8,
      lines: [
        'The third problem is the start itself. Remember the first ADHD episode: starting needs a signal that says, this is worth it.',
        'Now look at the choice at half past six. A warm bed, right now. Against a benefit that lies hours away.',
        'For a brain that discounts later rewards steeply, this is the most one-sided decision of the day. And it has to be made in the fog.',
        { text: 'The snooze button is the logical result. It is a small reward now, bought with a slightly bigger problem later.', de: [['snooze button', 'Schlummertaste']] },
      ],
    },
    {
      title: 'A tired brain looks more like ADHD',
      svg: s9,
      lines: [
        'Short sleep then feeds back into the day. Lack of sleep weakens attention and impulse control in everyone.',
        { text: 'With ADHD, it weakens what was already weak. So a bad night makes the symptoms stronger, and stronger symptoms make the next evening later.', de: [['vicious circle', 'Teufelskreis']] },
        'Some researchers go further. They see restlessness partly as a tired brain keeping itself awake, the way an overtired child gets wild instead of sleepy.',
        'That idea is not proven. But it fits an old observation: when sleep improves, ADHD symptoms often ease a little.',
      ],
    },
    {
      title: 'Worth checking with a doctor',
      svg: s10,
      lines: [
        'Two more things belong on the list, because they are more common with ADHD and easy to miss.',
        { text: 'One is restless legs: an urge to move the legs in the evening that keeps you from falling asleep. In a large study, almost three in ten adults with ADHD reported such symptoms.', de: [['restless legs', 'unruhige Beine']] },
        'The other is the timing of medication. A stimulant taken too late in the day can push sleep even further back.',
        'And if you are extremely sleepy during the day despite enough hours in bed, that is a reason to see a doctor.',
      ],
    },
    {
      title: 'Moving the clock: light',
      svg: s11,
      lines: [
        'Now to what helps. The body clock can be moved, and its strongest signal is light.',
        { text: 'Bright light in the morning shifts the clock earlier. Daylight outside is by far the strongest source, even under clouds.', de: [['daylight', 'Tageslicht']] },
        'In a small study, adults with ADHD used a bright lamp every morning for three weeks. Their rhythm moved earlier, and their symptoms improved.',
        'There was no comparison group, though. So treat it as a hint, not as proof.',
        'The evening is the mirror image. Dim light and no bright screen in the last hour keep the clock from sliding later.',
      ],
    },
    {
      title: 'Moving the clock: melatonin',
      svg: s12,
      quiz: {
        q: 'In the trial, melatonin plus lamp shifted the clock most, but only melatonin alone eased symptoms, and real sleep times barely moved. What follows?',
        options: [
          { text: 'The clock can be shifted; that this eases symptoms is not shown', correct: true, why: 'Shift and relief did not go together across the groups, and sleep itself did not change. The trial supports the first step and leaves the second one open.' },
          { text: 'The further the clock is shifted, the more the symptoms improve', why: 'The group with the biggest shift showed no improvement at all. The trial speaks against this simple rule.' },
          { text: 'The morning lamp cancels out the benefit of melatonin', why: 'Tempting, since only the lamp differs. But with about 17 people per group, one odd result may be chance. It needs a repeat first.' },
          { text: 'Melatonin does not work, since everything returned to the start', why: 'A return after stopping shows that the effect needs continued use. It does not show that there was no effect while it was taken.' },
        ],
        explain: 'Imagine three groups of people who want to lose weight. One group does nothing. One eats less, loses two kilos and feels fitter. One eats less and also runs, loses three kilos, but does not feel fitter. Would you conclude that running destroys fitness? Or that weight has nothing to do with it? With small groups, the honest answer is: weight clearly can be changed, and whether that is what makes people feel fitter needs a bigger study. The melatonin trial has exactly this shape. A hormone measurement moved in both treated groups. The outcome people care about moved in one of them, and the daily sleep times in neither.',
      },
      lines: [
        { text: 'The second lever is melatonin itself. A Dutch trial tested it in 51 adults with ADHD and a delayed rhythm.', say: 'The second lever is melatonin itself. A Dutch trial tested it in fifty-one adults with ADHD and a delayed rhythm.' },
        { text: 'A very small dose, taken in the evening for three weeks, moved the inner evening about one and a half hours earlier. A dummy pill did nothing.', de: [['dummy pill', 'Scheinmedikament']] },
        { text: 'With an added morning lamp, the shift was almost two hours. ADHD symptoms dropped by 14 percent, but only in the group without the lamp.', say: 'With an added morning lamp, the shift was almost two hours. ADHD symptoms dropped by fourteen percent, but only in the group without the lamp.' },
        'And two weeks after the trial, everything was back where it started. Actual sleep times had barely moved.',
        'So the clock can be shifted, but only as long as you keep at it, and only if your bedtime moves with it. Dose and timing are a matter for a doctor.',
      ],
    },
    {
      title: 'Hold the rhythm',
      svg: s13,
      quiz: {
        q: 'Which weekend plan protects Monday morning best for someone with a delayed body clock?',
        options: [
          { text: 'Get up at most an hour later than usual, and go into daylight soon after', correct: true, why: 'It keeps the fixed point almost in place and adds the strongest signal for an earlier clock. Lost sleep can be repaid with a short nap.' },
          { text: 'Sleep until noon on both days, to pay back the sleep debt in full', why: 'It does repay sleep. But two late mornings tell the clock that the day starts at noon, and Monday’s alarm lands even deeper in the inner night.' },
          { text: 'Go to bed at 21:00 on Sunday, to be well rested on Monday', why: 'Sensible with a normal clock. With a delayed one, the sleep window is still shut at 21:00, so it mostly produces hours of lying awake.' },
          { text: 'Stay in a darkened room on Sunday morning, to rest properly', why: 'Rest sounds right. But morning light is the signal that moves the clock earlier. A dark morning removes the one thing that helps.' },
        ],
        explain: 'Picture the body clock as a dog that pulls on the lead toward a later time, a little every day. Each morning with light and a fixed time to get up is a tug back. A weekend of sleeping until noon lets go of the lead for two days, and on Monday you start from further away than on Friday. An early bedtime does not help, because the dog cannot be pushed from behind: sleep only comes when the window opens. So the plan that works keeps the morning signal alive on Saturday and Sunday, with a small allowance, and repays the missing sleep at a time that does not move the clock.',
      },
      lines: [
        'The third lever: hold the rhythm. The clock needs the same signal every day.',
        'The most important fixed point is not the bedtime. It is the time you get up, including on weekends.',
        'One hour later on Saturday is fine. Four hours later undoes a week of work.',
        { text: 'That is hard, because the weekend sleep feels so deserved. A short nap after lunch is the better way to pay back sleep debt.', de: [['sleep debt', 'Schlafschuld']] },
      ],
    },
    {
      title: 'The first ten minutes',
      svg: s14,
      lines: [
        'And finally, the first ten minutes. Do not rely on a decision made in the fog. Decide the evening before, and let things do the work.',
        'A light alarm that brightens the room before the sound. And the alarm itself out of reach, so that you have to stand up.',
        'A reward that waits: coffee on a timer, or a favourite podcast that is only allowed in the morning.',
        'And a first step so small that it needs no willpower: feet on the floor. The clothes are already laid out, so nothing has to be chosen.',
      ],
    },
    {
      title: 'The short version',
      svg: s15,
      lines: [
        'The short version. With ADHD, the alarm often rings during the inner night. The brain starts up slowly, and the start offers no reward.',
        'So do not fight the morning with willpower. Move the clock with morning light and a fixed time to get up.',
        'Protect the evening from bright screens, and build the first ten minutes outside your head.',
        'Thank you for the question. If you have another one, write it into the feedback field.',
      ],
    },
  ],
  takeaways: [
    'In about three of four people with ADHD, the body clock runs late: melatonin rises about 1.5 hours later, so the sleep window opens and closes later.',
    'An early alarm then hits the inner night. Going to bed earlier does not move the window, it mostly produces lying awake.',
    'Sleep inertia is thicker after short nights and in the inner night, and the brain regions for planning come back last.',
    'Getting up is a start with no immediate reward, decided in the fog. Short sleep then worsens attention the next day.',
    'The clock can be moved: bright light in the morning, dim light in the evening, and a fixed time to get up, also on weekends.',
    'Low-dose melatonin shifted the clock in a trial, but only while it was taken, and without moving real sleep times. Dose and timing belong with a doctor.',
  ],
  sources: [
    'Borbély (1982): the two-process model of sleep regulation',
    'Van Veen et al. (2010) and Bijlenga et al. (2019): delayed melatonin onset and delayed sleep phase in ADHD (73 to 78 percent)',
    'Chang et al. (2014), PNAS: evening use of light-emitting e-readers delays the circadian clock',
    'Wittmann et al. (2006): social jetlag',
    'Hilditch & McHill (2019): Sleep inertia, current insights',
    'Hegerl & Hensch: the vigilance regulation model of ADHD',
    'van der Ham et al. (2024): sleep problems in adults with ADHD (screening rates)',
    'Rybak et al. (2006): open trial of morning bright light in adult ADHD',
    'van Andel et al. (2021): melatonin with or without bright light in adults with ADHD and delayed sleep phase (51 participants)',
  ],
};
