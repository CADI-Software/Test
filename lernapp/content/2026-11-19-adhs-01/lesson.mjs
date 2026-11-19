import { L, arrow, rng } from '../../tools/kit.mjs';

const box = (y, text, l, o = {}, cls = 'ts') => `
<g ${L(l, 'up', o)}>
  <rect x="24" y="${y}" width="352" height="42" rx="12" class="fp"/>
  <text x="200" y="${y + 27}" class="mid ${cls}">${text}</text>
</g>`;

// ---------- 1: The name is misleading ----------
const s1 = `
<g ${L(0, 'up', { out: 3 })}>
  <rect x="84" y="78" width="64" height="38" rx="15" class="fn sm"/><path d="M100 97 H112 M106 91 V103" class="fn sm"/><circle cx="133" cy="97" r="3.5" class="fm"/>
  <text x="236" y="106" class="mid tx tb">6 hours</text>
  <text x="200" y="146" class="mid ts fm">on one game or project, without a break</text>
</g>
<g ${L(1, 'pop', { out: 3 })}><rect x="120" y="170" width="160" height="40" rx="20" class="fk sa"/><text x="200" y="196" class="mid tm fa tb">hyperfocus</text></g>
<g ${L(2, 'up', { out: 3 })}>
  <text x="200" y="258" class="mid tm fm">too little attention</text>
  <path d="M120 253 H280" class="fn sc"/>
</g>
<text x="200" y="298" class="mid tl tb fb" ${L(2, 'up', { d: 3, out: 3 })}>too little control over it</text>
<g ${L(3, 'up')}>
  <g class="wig"><circle cx="200" cy="44" r="216" class="fn"/><polygon points="200,44 152,252 248,252" class="fb" style="opacity:.3"/></g>
  <rect x="184" y="30" width="32" height="22" rx="6" class="fk sb"/>
  <rect x="30" y="268" width="100" height="36" rx="10" class="fp"/><text x="80" y="291" class="mid ts fm">tax form</text>
  <rect x="150" y="268" width="100" height="36" rx="10" class="fp"/><text x="200" y="291" class="mid ts">new idea</text>
  <rect x="270" y="268" width="100" height="36" rx="10" class="fp"/><text x="320" y="291" class="mid ts fa">phone</text>
  <text x="200" y="326" class="mid ts fm">bright light, loose handle</text>
</g>
${box(344, 'what the brain regulates differently, and why', 4)}`;

// ---------- 2: Common, and mostly inherited ----------
const dots20 = (y, n, c) => Array.from({ length: 20 }, (_, i) => `<circle cx="${146 + i * 11}" cy="${y}" r="4" class="${i < n ? 'f' + c : 'fm'}"${i < n ? '' : ' style="opacity:.35"'}/>`).join('');
const chip = (x, w, t) => `<rect x="${x}" y="268" width="${w}" height="34" rx="10" class="fp"/><text x="${x + w / 2}" y="290" class="mid ts">${t}</text><path d="M${x + 10} 276 L${x + w - 10} 294" class="fn sc"/>`;
const s2 = `
<g ${L(0, 'up')}>
  <text x="40" y="52" class="ts">children</text>${dots20(48, 1, 'c')}<text x="146" y="70" class="ts fc">5 to 7 in 100</text>
  <text x="40" y="104" class="ts">adults</text>${dots20(100, 1, 'b')}<text x="146" y="122" class="ts fb">2 to 3 in 100</text>
</g>
<g ${L(1, 'up')}>
  <text x="40" y="164" class="ts fm">how much is inherited</text>
  <text x="40" y="196" class="ts">ADHD</text>
  <rect x="100" y="184" width="185" height="16" rx="8" class="fc"/><text x="293" y="197" class="tm tb fc">74%</text>
</g>
<g ${L(2, 'up')}>
  <text x="40" y="230" class="ts">height</text>
  <rect x="100" y="218" width="200" height="16" rx="8" class="fm"/><text x="308" y="231" class="tm fm">≈ 80%</text>
</g>
<g ${L(3, 'up')}>${chip(24, 124, 'bad parenting')}${chip(160, 80, 'sugar')}${chip(252, 124, 'too many screens')}</g>
${box(332, 'these can shift symptoms, not create ADHD', 4)}`;

// ---------- 3: The brain's management ----------
const BRAIN = 'M92 172 C84 108 150 62 222 72 C292 62 340 114 328 172 C332 206 304 226 276 226 C268 226 262 230 260 238 L256 258 H234 L234 236 C166 242 100 228 92 172 Z';
const FOLDS = 'M150 112 q28 -22 56 0 M196 156 q30 -22 60 0 M248 112 q22 12 44 -4 M118 170 q24 -18 48 2 M262 190 q20 -14 40 0';
const fn3 = (cx, title, icon) => `<rect x="${cx - 56}" y="284" width="112" height="72" rx="12" class="fp"/>${icon}<text x="${cx}" y="342" class="mid ts">${title}</text>`;
const s3 = `
<text x="200" y="34" class="mid ts fm" ${L(0, 'up')}>executive functions = the management</text>
<g ${L(0, 'up')}><path d="${BRAIN}" class="fp si"/><path d="${FOLDS}" class="fn sm s1"/></g>
<g ${L(1, 'up')}>${fn3(76, 'hold a plan', `<rect x="62" y="296" width="28" height="24" rx="4" class="fn sa"/><path d="M68 304 H84 M68 312 H80" class="fn sa s1"/>`)}</g>
<g ${L(2, 'up')}>${fn3(200, 'stop an impulse', `<path d="M192 296 H208 L216 304 V314 L208 322 H192 L184 314 V304 Z" class="fn sc"/>`)}</g>
<g ${L(2, 'up', { d: 3 })}>${fn3(324, 'start, switch', `<path d="M314 296 L334 309 L314 322 Z" class="fn sd"/>`)}</g>
<g ${L(3)}><ellipse cx="140" cy="150" rx="40" ry="50" class="fa" style="opacity:.32"/></g>
<text x="140" y="268" class="mid ts fa tb" ${L(3, 'up')}>front of the brain</text>
<text x="200" y="384" class="mid ts fb tb" ${L(4, 'up')}>skilled staff, but the manager is often out</text>`;

// ---------- 4 and 10: the synapse ----------
const r4 = rng(11);
const gapDots = (n, cls) => Array.from({ length: n }, (_, i) => `<circle cx="${(196 + r4() * 64).toFixed(1)}" cy="${(140 + r4() * 84).toFixed(1)}" r="5" class="${i % 3 === 2 ? 'fb' : 'fa'} ${cls}"/>`).join('');
const cells = `
  <path d="M36 124 H140 C192 124 192 240 140 240 H36" class="fp si"/>
  <path d="M364 132 H300 C268 132 268 232 300 232 H364" class="fp si"/>
  <path d="M276 160 h-8 M274 182 h-8 M276 204 h-8" class="fn sm"/>
  <text x="88" y="262" class="mid ts fm">sending cell</text><text x="322" y="254" class="mid ts fm">receiving cell</text>`;
const pump = `<path d="M236 252 C220 300 150 300 136 250" class="fn sd flow"/><path d="M136 250 l-3 14 M136 250 l12 8" class="fn sd"/>`;
const s4 = `
<g ${L(0, 'up')}>${cells}
  <circle cx="120" cy="160" r="5" class="fa"/><circle cx="104" cy="196" r="5" class="fb"/><circle cx="136" cy="208" r="5" class="fa"/>
  ${gapDots(4, 'float')}
  <g class="weak" data-l="4" data-fx="state">${gapDots(6, 'float')}</g>
</g>
<g ${L(1, 'up')}><circle cx="46" cy="52" r="6" class="fa"/><text x="60" y="57" class="ts fa tb">dopamine: “this is worth the effort”</text></g>
<g ${L(2, 'up')}><circle cx="46" cy="82" r="6" class="fb"/><text x="60" y="87" class="ts fb tb">noradrenaline: signal above the noise</text></g>
<g ${L(3, 'up')}>${pump}<text x="186" y="318" class="mid ts fd">pumped back in</text></g>
${box(338, 'weaker signal in the circuits that manage', 4)}`;
const css4 = `.weak{transition:opacity 1.4s ease}.weak.on{opacity:.12}`;

const s10 = `
<text x="200" y="52" class="mid tm" ${L(0, 'up')}>a stimulant that calms?</text>
<g ${L(0, 'up')}>${cells}
  <circle cx="120" cy="160" r="5" class="fa"/><circle cx="104" cy="196" r="5" class="fb"/><circle cx="136" cy="208" r="5" class="fa"/>
  ${gapDots(3, 'float')}
  <g class="more" data-l="2" data-fx="state">${gapDots(8, 'float')}</g>
</g>
<g ${L(1, 'up')}>${pump}</g>
<g ${L(1, 'pop', { d: 3.5 })}><path d="M176 280 L198 302 M198 280 L176 302" class="fn sc s3"/></g>
<text x="186" y="330" class="mid ts fc" ${L(1, 'up', { d: 3.5 })}>pump partly blocked</text>
<text x="200" y="88" class="mid ts fa tb" ${L(2, 'up')}>more signal stays in the gap</text>
<text x="200" y="108" class="mid ts fm" ${L(3, 'up')}>a louder conductor, not a sedated orchestra</text>
${box(346, '133 trials: clear effect in the short term', 4)}`;
const css10 = `.more{opacity:0;transition:opacity 1.4s ease}.more.on{opacity:1}`;

// ---------- 5: What brain scans found ----------
const r5 = rng(5);
const sites = (cx, n) => Array.from({ length: n }, () => { const a = r5() * 6.283, d = Math.sqrt(r5()) * 46; return `<circle cx="${(cx + Math.cos(a) * d).toFixed(1)}" cy="${(126 + Math.sin(a) * d).toFixed(1)}" r="4.5" class="fa"/>`; }).join('');
const s5 = `
<g ${L(0, 'up')}>
  <text x="200" y="34" class="mid ts fm">brain scans, 2009</text>
  <circle cx="110" cy="126" r="60" class="fp sm"/><text x="110" y="208" class="mid ts">without ADHD (44)</text>
  <circle cx="290" cy="126" r="60" class="fp sm"/><text x="290" y="208" class="mid ts">with ADHD (53)</text>
</g>
<g ${L(1, 'pop')}>${sites(110, 20)}</g>
<g ${L(1, 'pop', { d: 1.5 })}>${sites(290, 10)}</g>
<text x="200" y="236" class="mid ts fa tb" ${L(1, 'up', { d: 2.5 })}>fewer docking sites for dopamine</text>
<g ${L(2, 'up')}>
  <path d="M60 256 V318 H170" class="fn sm"/>
  <path d="M68 264 L162 310" class="fn sc"/>
  <circle cx="76" cy="272" r="3.5" class="fc"/><circle cx="96" cy="276" r="3.5" class="fc"/><circle cx="112" cy="290" r="3.5" class="fc"/><circle cx="134" cy="294" r="3.5" class="fc"/><circle cx="152" cy="308" r="3.5" class="fc"/>
  <text x="188" y="282" class="ts">fewer sites,</text><text x="188" y="302" class="ts">more attention problems</text>
</g>
<text x="200" y="348" class="mid ts" ${L(3, 'up')}>boring but important = weak “worth it” signal</text>
<text x="200" y="380" class="mid tm fb tb" ${L(4, 'up')}>caring ≠ starting</text>`;

// ---------- 6: Now beats later ----------
const s6 = `
<g ${L(0, 'up')}>
  ${arrow(60, 300, 366, 300, 'm')}${arrow(60, 300, 60, 56, 'm')}
  <text x="70" y="64" class="ts fm">felt value of a reward</text>
  <text x="60" y="320" class="mid ts fm">now</text><text x="348" y="320" class="mid ts fm">later</text>
  <path d="M60 90 C140 106 240 140 350 168" class="fn sm s3"/>
  <text x="330" y="148" class="mid ts fm">typical</text>
</g>
<path d="M60 90 C92 206 180 270 350 288" class="fn sc s3" ${L(1, 'draw')}/>
<text x="336" y="262" class="mid ts fc tb" ${L(1, 'up', { d: 1.5 })}>ADHD</text>
<g ${L(2, 'up')}>
  <circle cx="290" cy="282" r="7" class="fc"/>
  <text x="276" y="212" class="mid ts">report due in 3 weeks:</text><text x="276" y="230" class="mid ts fc">almost no pull</text>
</g>
<g ${L(3, 'up')}>
  <circle cx="72" cy="126" r="8" class="fb"/>
  ${arrow(132, 96, 84, 120, 'b', { size: 8 })}
  <text x="190" y="92" class="mid ts fb tb">the night before</text>
</g>
${box(346, 'putting off and last-minute brilliance: one mechanism', 4)}`;

// ---------- 7: What does work as fuel ----------
const fuel = [['interest', 40, 214, 0.6], ['novelty', 220, 214, 1.5], ['challenge', 40, 254, 2.4], ['urgency', 220, 254, 3.3]];
const s7 = `
<g ${L(0, 'up')}>
  <path d="M120 150 A80 80 0 0 1 280 150" class="fn sm s3"/>
  <path d="M256 94 A80 80 0 0 1 280 150" class="fn sd s3"/>
  <g class="needle" data-l="1" data-fx="state" data-d="4"><path d="M200 150 L140 122" class="fn si s3"/></g>
  <circle cx="200" cy="150" r="7" class="fi"/>
  <text x="200" y="180" class="mid ts fm">activation</text>
</g>
${fuel.map(([t, x, y, d]) => `<g ${L(1, 'pop', { d })}><rect x="${x}" y="${y - 22}" width="140" height="32" rx="10" class="fp"/><text x="${x + 70}" y="${y}" class="mid ts fa tb">${t}</text></g>`).join('')}
<g ${L(1, 'up', { d: 5.5 })}>
  <rect x="130" y="276" width="140" height="32" rx="10" class="fp"/><text x="200" y="298" class="mid ts fm">importance</text>
  <path d="M140 284 L260 300" class="fn sc"/>
</g>
<text x="200" y="344" class="mid ts" ${L(2, 'up')}>strong signal → cannot pull away</text>
<text x="200" y="374" class="mid ts fm" ${L(3, 'up')}>“you can focus when you want to” misses it</text>`;
const css7 = `.needle{transform-origin:200px 150px;transition:transform 1.6s cubic-bezier(.3,1.3,.5,1)}.needle.on{transform:rotate(125deg)}`;

// ---------- 8: The network that will not go quiet ----------
const s8 = `
<g ${L(0, 'up')}>
  <text x="200" y="28" class="mid ts fm">default mode network = the daydream network</text>
  <path d="M120 44 V292" class="fn sm dash s1"/>
  <text x="126" y="172" class="ts fm">task starts</text>
</g>
<g ${L(1, 'up')}>
  <text x="40" y="62" class="ts">typical</text>
  <path d="M40 132 H112 C124 132 124 84 136 84 H360" class="fn sa s3"/>
  <path d="M40 100 q9 -16 18 0 t18 0 t18 0 t18 0 C124 100 124 144 136 144 H360" class="fn se"/>
  <text x="356" y="76" class="end ts fa">task network</text>
  <text x="356" y="160" class="end ts fe">daydream network: quiet</text>
</g>
<g ${L(2, 'up')}>
  <text x="40" y="198" class="ts fc tb">ADHD</text>
  <path d="M40 268 H112 C124 268 124 216 136 216 H176 q12 44 24 0 H246 q12 44 24 0 H314 q10 36 20 0 H360" class="fn sa s3"/>
  <path d="M40 232 q9 -16 18 0 t18 0 t18 0 t18 0 C124 232 124 282 136 282 H176 q12 -44 24 0 H246 q12 -44 24 0 H314 q10 -36 20 0 H360" class="fn se"/>
</g>
<text x="200" y="318" class="mid ts" ${L(3, 'up')}>a whole page read, and nothing arrived</text>
${box(336, 'typical sign: performance that swings', 4, {}, 'tm')}`;

// ---------- 9: A brain on a later schedule ----------
const AX = (age) => 40 + (age - 5) * 32;
const s9 = `
<text x="200" y="36" class="mid ts fm" ${L(0, 'up')}>scans of 223 children with ADHD, 223 without</text>
<g ${L(0, 'up')}>
  <path d="M40 210 H360" class="fn sm"/>
  ${[5, 10, 15].map((a) => `<path d="M${AX(a)} 204 V216" class="fn sm s1"/><text x="${AX(a)}" y="236" class="mid ts fm">${a}</text>`).join('')}
  <text x="200" y="262" class="mid ts fm">age when the cortex reaches its peak</text>
</g>
<g ${L(1, 'up')}>
  <circle cx="${AX(7.5)}" cy="210" r="8" class="fm"/><text x="${AX(7.5)}" y="190" class="mid tm">7.5</text><text x="${AX(7.5)}" y="170" class="mid ts fm">typical</text>
</g>
<g ${L(1, 'up', { d: 3 })}>
  <circle cx="${AX(10.5)}" cy="210" r="9" class="fc"/><text x="${AX(10.5)}" y="190" class="mid tl tb fc">10.5</text><text x="${AX(10.5)}" y="166" class="mid ts fc">ADHD</text>
  ${arrow(AX(7.5), 126, AX(10.5), 126, 'b')}
  <text x="${(AX(7.5) + AX(10.5)) / 2}" y="114" class="mid ts fb tb">about 3 years later</text>
</g>
<text x="200" y="300" class="mid ts fa tb" ${L(2, 'up')}>largest delay: the prefrontal regions</text>
${box(326, 'a later schedule, not a broken plan', 3, {}, 'tm')}`;

// ---------- Adults: the quiet form ----------
const sAdult = `
<g ${L(0, 'up')}>
  <text x="200" y="34" class="mid ts fm">the usual picture: a fidgety boy</text>
  <circle cx="200" cy="80" r="13" class="fn si"/><path d="M200 93 V134 M182 108 H218 M200 134 L186 160 M200 134 L214 160" class="fn si"/>
  <path d="M162 90 q-10 14 0 28 M238 90 q10 14 0 28 M148 80 q-14 24 0 48 M252 80 q14 24 0 48" class="fn sm blink"/>
</g>
<g ${L(1, 'up')}>
  <circle cx="106" cy="248" r="48" class="fp si"/>
  <g class="spin" style="animation-duration:4s"><circle cx="106" cy="248" r="32" class="fn"/><path d="M88 248 a18 18 0 1 1 18 18 a12 12 0 1 1 -12 -12 a6 6 0 1 1 6 6" class="fn sc"/></g>
  <text x="106" y="320" class="mid ts fc tb">inside: racing thoughts</text>
</g>
<g ${L(2, 'up')}>
  <text x="298" y="196" class="mid ts fb tb">the quiet form</text>
  ${['drifting off', 'losing things', 'forgetting dates'].map((t, i) => `<rect x="220" y="${208 + i * 38}" width="156" height="30" rx="10" class="fp"/><text x="298" y="${228 + i * 38}" class="mid ts">${t}</text>`).join('')}
</g>
${box(342, 'often missed, especially in girls and women', 3)}`;

// ---------- 11: Feelings use the same brakes ----------
const wave = (y, amp) => `M40 ${y} q20 ${-amp} 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0`;
const s11 = `
<text x="200" y="40" class="mid ts fm" ${L(0, 'up')}>the same brakes, applied to feelings</text>
<g ${L(0, 'up')}><path d="${wave(120, 24)}" class="fn sm s3"/><text x="44" y="84" class="ts fm">typical</text></g>
<path d="${wave(230, 84)}" class="fn sc s3" ${L(1, 'draw')}/>
<text x="200" y="300" class="mid ts fc tb" ${L(1, 'up', { d: 2 })}>faster, stronger, harder to set aside</text>
${box(328, 'not a character flaw: the same steering problem', 2)}`;

// ---------- 12: Knowing is not the problem ----------
const s12 = `
<text x="200" y="40" class="mid ts fm" ${L(0, 'up')}>Russell Barkley</text>
<g ${L(1, 'up')}>
  <rect x="24" y="64" width="150" height="62" rx="14" class="fp"/><text x="99" y="92" class="mid ts">knowing</text><text x="99" y="112" class="mid ts">what to do</text>
  <path d="M146 78 l6 6 l12 -12" class="fn sd"/>
  <rect x="226" y="64" width="150" height="62" rx="14" class="fp sc"/><text x="301" y="92" class="mid ts">doing</text><text x="301" y="112" class="mid ts">what you know</text>
  <path d="M178 95 H194 M206 95 H222" class="fn sc"/>
  <text x="200" y="156" class="mid ts fc tb">the break is here, not in the knowing</text>
</g>
<g ${L(2, 'up')}>
  <text x="200" y="210" class="mid tm">“just try harder”</text><path d="M128 205 H272" class="fn sc"/>
  <text x="200" y="234" class="mid ts fm">asks the weakest system to fix itself</text>
</g>
<g ${L(3, 'up')}>
  <path d="M120 318 h160 v-18 q0 -8 -8 -8 h-20 l-16 -22 h-58 l-16 22 h-34 q-8 0 -8 8 z" class="fn sb"/>
  <circle cx="158" cy="320" r="12" class="fk sb"/><circle cx="244" cy="320" r="12" class="fk sb"/>
  <text x="200" y="364" class="mid tm fb tb">fast engine, loose steering</text>
  <text x="200" y="386" class="mid ts fm">intelligence does not protect</text>
</g>`;

// ---------- 13: Moving the management outside ----------
const tool = (x, y, l, title, sub, icon, o = {}) => `
<g ${L(l, 'up', o)}>
  <rect x="${x}" y="${y}" width="170" height="104" rx="14" class="fp"/>
  <g transform="translate(${x + 85} ${y + 32})">${icon}</g>
  <text x="${x + 85}" y="${y + 72}" class="mid ts tb">${title}</text>
  <text x="${x + 85}" y="${y + 91}" class="mid ts fm">${sub}</text>
</g>`;
const s13 = `
<text x="200" y="38" class="mid tm" ${L(0, 'up')}>move the management outside</text>
${tool(24, 58, 1, 'make time visible', 'a timer you can see', `<circle cx="0" cy="0" r="16" class="fn sa"/><path d="M0 -9 V0 L7 5" class="fn sa"/>`)}
${tool(206, 58, 1, 'show the next step', 'a note right in your way', `<rect x="-15" y="-16" width="30" height="32" rx="4" class="fn sb"/><path d="M-8 -6 H8 M-8 2 H8 M-8 10 H2" class="fn sb s1"/>`, { d: 4 })}
${tool(24, 174, 2, 'bring the reward closer', 'small payoff, right away', `<rect x="-15" y="-6" width="30" height="22" rx="3" class="fn sd"/><path d="M-18 -6 H18 M0 -6 V16 M0 -6 q-12 -14 -12 -4 q0 4 12 4 q12 0 12 -4 q0 -10 -12 4" class="fn sd s1"/>`)}
${tool(206, 174, 3, 'borrow urgency', 'a deadline with a person', `<circle cx="-12" cy="-6" r="8" class="fn se"/><circle cx="12" cy="-6" r="8" class="fn se"/><path d="M-24 16 q12 -20 24 0 q12 -20 24 0" class="fn se"/>`)}
${box(296, 'the right tools for this kind of brain', 4, {}, 'tm')}
<text x="200" y="372" class="mid ts fm" ${L(4, 'up', { d: 5 })}>next ADHD episode: the bent sense of time</text>`;

export default {
  id: '2026-11-19-adhs-01',
  date: '2026-11-19',
  area: 'adhs',
  series: 'Understanding ADHD',
  episode: 1,
  title: 'Not a lack of attention: what the ADHD brain regulates differently',
  hook: 'Hyperfocus for six hours, but no start on the tax form. The name is misleading: attention is there, the steering is not.',
  level: 2,
  poster: 5,
  voice: 'female',
  scenes: [
    {
      title: 'The name is misleading',
      svg: s1,
      lines: [
        'The name says attention deficit. So how can someone with ADHD spend six hours on a game or a project and forget to eat?',
        { text: 'If attention were simply missing, that would be impossible. It is called hyperfocus, and most people with ADHD know it well.', de: [['attention', 'Aufmerksamkeit']] },
        'So the name is misleading. There is not too little attention. There is too little control over where it goes.',
        'Think of a strong spotlight with a loose handle. The light is bright, but it swings to whatever is most exciting.',
        'Today: what exactly the brain regulates differently, and why willpower alone does not fix it.',
      ],
    },
    {
      title: 'Common, and mostly inherited',
      svg: s2,
      lines: [
        'First, the basics. ADHD is common: roughly five to seven of every hundred children, and about two to three of every hundred adults.',
        { text: 'And it runs in families. Studies of twins put the heritability at about 74 percent.', say: 'And it runs in families. Studies of twins put the heritability at about seventy-four percent.', de: [['heritability', 'Erblichkeit']] },
        { text: 'For comparison: body height is around 80 percent. So ADHD is inherited almost as strongly as how tall you are.', say: 'For comparison: body height is around eighty percent. So ADHD is inherited almost as strongly as how tall you are.' },
        'That rules out the popular explanations. Not bad parenting, not too much sugar, not too many screens.',
        'Those things can make symptoms better or worse. But they do not create the condition.',
      ],
    },
    {
      title: 'The management of the brain',
      svg: s3,
      lines: [
        { text: 'So what is regulated differently? The key term is executive functions. Think of them as the management of the brain.', de: [['executive functions', 'Exekutivfunktionen']] },
        { text: 'They hold a plan in mind while you work. That part is called working memory.', de: [['working memory', 'Arbeitsgedächtnis']] },
        { text: 'They stop an impulse before you act on it. And they get you started on a task, or make you switch to another one.', de: [['impulse control', 'Impulskontrolle']] },
        'These functions sit mainly in the front of the brain, and in its connections to deeper regions.',
        'In ADHD, this management works less reliably. The staff is skilled. But the manager is often out of the office.',
      ],
    },
    {
      title: 'Two messenger substances',
      svg: s4,
      css: css4,
      lines: [
        { text: 'This management depends on two messenger substances: dopamine and noradrenaline.', de: [['messenger substance', 'Botenstoff']] },
        'Dopamine is often called the happiness chemical. That is wrong. It is closer to a signal that says: this is worth your effort.',
        'Noradrenaline works more like a volume control. It makes the important signal stand out from the background noise.',
        { text: 'Nerve cells release these substances into a tiny gap, and then pump them back in. Remember that pump. It comes back later.', de: [['nerve cell', 'Nervenzelle']] },
        'In ADHD, this signaling is weaker in exactly the circuits that do the managing.',
      ],
    },
    {
      title: 'What brain scans found',
      svg: s5,
      lines: [
        { text: 'How do we know? In 2009, researchers scanned 53 adults with ADHD who had never taken medication, and 44 adults without ADHD.', say: 'How do we know? In two thousand nine, researchers scanned fifty-three adults with ADHD who had never taken medication, and forty-four adults without ADHD.' },
        { text: 'In the reward pathway of the ADHD group, they found fewer docking sites for dopamine.', de: [['reward pathway', 'Belohnungssystem']] },
        'And the lower the values, the stronger the attention problems. A follow-up analysis linked low values to lower motivation as well.',
        'What does that mean in daily life? A task that is important but boring produces a weaker “worth it” signal.',
        'It is not that the person does not care. The brain does not deliver the push that turns caring into starting.',
      ],
    },
    {
      title: 'Now beats later',
      svg: s6,
      quiz: {
        q: 'Mara cares a lot about her thesis but cannot start for three weeks. The night before the deadline, she writes well. Which explanation fits best?',
        options: [
          { text: 'The far deadline gave almost no “worth it” signal. Urgency finally supplied it', correct: true, why: 'Caring was there all along. What was missing was the push that turns caring into starting, and a close deadline delivers that push.' },
          { text: 'She did not really care about the thesis until the end', why: 'The research separates caring from starting. Many people with ADHD care intensely and suffer because they still cannot begin.' },
          { text: 'She simply works better at night than during the day', why: 'A late body clock is common with ADHD, but it cannot explain three weeks without a start. Those weeks had nights too.' },
        ],
        explain: 'Imagine a car with a weak starter motor. The engine is fine, and the driver wants to leave. But the car only starts when it rolls downhill. A close deadline is that hill. Three weeks before, the road is flat: the reward is far away, and with ADHD a far reward loses its pull especially fast. The night before, the road drops steeply, urgency floods the system, and the engine catches. From outside, it looks like laziness followed by a miracle. Inside, it is one and the same mechanism.',
      },
      lines: [
        'A second finding fits right in. For everyone, a reward in the future feels smaller than the same reward now.',
        { text: 'With ADHD, this drop is steeper on average. “Later” loses its value faster.', de: [['delay', 'Verzögerung']] },
        'Take a report that is due in three weeks. Today, the deadline has almost no pull. The brain treats it as not real yet.',
        'The night before, everything changes. Urgency supplies the missing signal, and the work suddenly flows.',
        { text: 'This is why putting things off and brilliant last-minute work so often appear in the same person.', de: [['to put off', 'aufschieben']] },
      ],
    },
    {
      title: 'What works as fuel',
      svg: s7,
      css: css7,
      lines: [
        'So what does switch the system on? Clinicians see the same four things again and again.',
        'Interest, novelty, challenge and urgency. Notice what is missing: importance alone is not on the list.',
        'This also explains hyperfocus. When a task delivers a strong signal by itself, the weak steering fails in the other direction. You cannot pull away.',
        'And it explains a painful misunderstanding. Others say: you can focus when you want to. But wanting is not what decides it.',
      ],
    },
    {
      title: 'The network that will not go quiet',
      svg: s8,
      quiz: {
        q: 'A student with ADHD scores 95 percent on one test and 55 percent on a very similar one a week later. What does this pattern suggest?',
        options: [
          { text: 'The ability is there, but access to it is unreliable', correct: true, why: 'Large swings in performance are one of the most typical signs of ADHD. The 95 shows what the student can do when the steering holds.' },
          { text: 'The good result was luck, and the real level is the lower one', why: 'Nobody reaches 95 percent by luck. The high score proves the knowledge exists. The low one shows it could not be used that day.' },
          { text: 'The student did not study for the second test', why: 'That is the usual guess, and often wrong. With ADHD, the same preparation can lead to very different results on different days.' },
        ],
        explain: 'Think of a radio with a loose cable. On some days the music is perfectly clear. On others it cuts out again and again. The station is always broadcasting, and the speakers are fine. The connection is the problem. In ADHD, the daydream network breaks into the task from time to time, and each break costs a piece of the test. So a result measures two things at once: what the student knows, and how well the steering held that day. Judging by the worst day misses the first. Judging by the best day misses the second.',
      },
      lines: [
        { text: 'There is a third piece. Your brain has a network that is active when you daydream. It is called the default mode network.', de: [['default mode network', 'Ruhezustandsnetzwerk']] },
        'When you start a task, this network normally goes quiet, and the task networks take over.',
        'In ADHD, it goes quiet less reliably. It keeps breaking into the task. That is one well-studied explanation for sudden gaps in attention.',
        'You know the result: you read a whole page, and nothing has arrived.',
        { text: 'It also explains the most typical sign of ADHD. Not constant weakness, but performance that swings from day to day.', de: [['to swing', 'schwanken']] },
      ],
    },
    {
      title: 'A brain on a later schedule',
      svg: s9,
      lines: [
        { text: 'Is the ADHD brain damaged? Brain scans of 223 children with ADHD and 223 without point to something else.', say: 'Is the ADHD brain damaged? Brain scans of two hundred twenty-three children with ADHD, and just as many without, point to something else.' },
        { text: 'The outer layer of the brain, the cortex, matures in the same order in both groups. But with ADHD, it reaches its peak about three years later.', de: [['cortex', 'Hirnrinde']] },
        { text: 'The delay is largest in the prefrontal regions, exactly where the management sits.', de: [['prefrontal cortex', 'Stirnhirn']] },
        'So it is a later schedule, not a broken plan. Many children catch up in part. For a large share, symptoms continue into adult life.',
      ],
    },
    {
      title: 'Not only the fidgety boy',
      svg: sAdult,
      lines: [
        'The picture most people have of ADHD is a fidgety boy. That picture misses a lot of people.',
        { text: 'In adults, the visible restlessness often moves inside. It turns into racing thoughts and a constant feeling of being driven.', de: [['inner restlessness', 'innere Unruhe']] },
        'And there is a quiet form with hardly any hyperactivity: drifting off, losing things, forgetting appointments.',
        { text: 'This quiet form is easy to overlook, especially in girls and women. Many are diagnosed late, or never.', de: [['to overlook', 'übersehen']] },
      ],
    },
    {
      title: 'Why a stimulant calms',
      svg: s10,
      css: css10,
      quiz: {
        q: 'Why can a stimulant make a person with ADHD calmer instead of more restless?',
        options: [
          { text: 'It strengthens the signal in the managing circuits, so control improves', correct: true, why: 'More dopamine and noradrenaline stay in the gap. The management gets a clearer signal, and better control looks like calm from outside.' },
          { text: 'It tires the brain, so there is less energy for restlessness', why: 'A stimulant does not tire the brain. It raises activity, but in the circuits that brake and steer.' },
          { text: 'People with ADHD react to stimulants in the opposite way to everyone else', why: 'That is a common myth. Studies show that stimulants act in the same direction in people without ADHD. With ADHD, there is simply more to gain.' },
        ],
        explain: 'Picture a classroom with a substitute teacher whose voice is too quiet. The children are not bad, but nobody is steering, so the room gets loud. Now hand the teacher a microphone. You have added energy to the room, and yet it becomes calmer, because the one who steers can finally be heard. A stimulant works like that microphone. It does not press the children into their seats. It raises the level of the two messenger substances in the steering circuits of the brain, and the calm is a result of better control.',
      },
      lines: [
        { text: 'Now a puzzle. The best-studied ADHD medications are stimulants. Why would a stimulant calm a restless person?', de: [['stimulant', 'Stimulans']] },
        { text: 'Remember the pumps that pull dopamine and noradrenaline back into the cell. The medication partly blocks them.', de: [['reuptake', 'Wiederaufnahme']] },
        'So more of both substances stays in the gap. The signal in the managing circuits gets stronger.',
        'It does not sedate the orchestra. It gives the conductor a louder voice. Control improves, and calm follows.',
        { text: 'A review of 133 controlled trials found clear effects in the short term. Long-term effects are less well studied, and the decision belongs with a doctor.', say: 'A review of one hundred thirty-three controlled trials found clear effects in the short term. Long-term effects are less well studied, and the decision belongs with a doctor.' },
      ],
    },
    {
      title: 'Feelings use the same brakes',
      svg: s11,
      lines: [
        'The same management also brakes emotions. So this part is affected too, even though the official criteria do not list it.',
        { text: 'Frustration, excitement or hurt arrive faster, hit harder, and are harder to set aside.', de: [['emotion regulation', 'Emotionsregulation']] },
        'Studies find this in a large share of adults with ADHD. It is not a character flaw. It is the same steering problem, applied to feelings.',
      ],
    },
    {
      title: 'Knowing is not the problem',
      svg: s12,
      lines: [
        'Put it all together, and one sentence from the researcher Russell Barkley fits well.',
        'ADHD is not a problem of knowing what to do. It is a problem of doing what you know.',
        'That is why advice like “just try harder” fails. It asks the weakest system to fix itself.',
        'And that is why intelligence does not protect. A fast engine does not help when the steering is loose.',
      ],
    },
    {
      title: 'Moving the management outside',
      svg: s13,
      lines: [
        'What follows from all this? If the inner management is unreliable, move parts of it outside your head.',
        'Make time visible, with a clock or timer you can see. And make the next step visible, written where you will trip over it.',
        'Bring the reward closer. A small payoff right after a step works better than a big one next month.',
        'And borrow urgency or interest on purpose: a deadline with another person, working next to someone, or turning a dull task into a race.',
        'These are not crutches. They are the right tools for this kind of brain. The next ADHD episode shows how ADHD bends the sense of time.',
      ],
    },
  ],
  takeaways: [
    'ADHD is not too little attention. It is too little control over where attention goes. Hyperfocus is part of the same problem.',
    'It is common and about 74 percent heritable, close to body height. Parenting, sugar or screens do not create it.',
    'The steering system (executive functions) depends on dopamine and noradrenaline, and this signaling is weaker in ADHD.',
    'Rewards in the future lose their pull faster. Interest, novelty, challenge and urgency switch the system on. Importance alone does not.',
    'The daydream network breaks into tasks, which explains gaps in attention and performance that swings from day to day.',
    'It is a problem of doing, not of knowing. So the practical answer is to move the management outside: visible time, visible next steps, near rewards, borrowed urgency.',
  ],
  sources: [
    'Faraone & Larsson (2019): Genetics of attention deficit hyperactivity disorder (heritability 74 percent across 37 twin studies)',
    'Simon et al. (2009) and later meta-analyses: prevalence of ADHD in adults (about 2.5 percent) and in children',
    'Volkow et al. (2009), JAMA: Evaluating dopamine reward pathway in ADHD; follow-up on motivation in Molecular Psychiatry (2011)',
    'Sonuga-Barke: delay aversion; Jackson & MacKillop (2016): meta-analysis on ADHD and delay discounting',
    'Sonuga-Barke & Castellanos (2007): the default-mode interference hypothesis',
    'Shaw et al. (2007), PNAS: ADHD is characterized by a delay in cortical maturation',
    'Cortese et al. (2018), Lancet Psychiatry: network meta-analysis of 133 trials of ADHD medications',
    'Shaw et al. (2014): Emotion dysregulation in ADHD; Barkley: ADHD and the Nature of Self-Control',
    'Young et al. (2020): expert consensus on ADHD in girls and women; Biederman et al. (2000): decline of hyperactivity with age',
  ],
};
