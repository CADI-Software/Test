import { L, arrow } from '../../tools/kit.mjs';

const box = (y, text, l, o = {}, cls = 'ts') => `
<g ${L(l, 'up', o)}>
  <rect x="24" y="${y}" width="352" height="42" rx="12" class="fp"/>
  <text x="200" y="${y + 27}" class="mid ${cls}">${text}</text>
</g>`;
const chips = (items, y, l, c = '') => items.map(([t, x, w], i) => `<g ${L(l, 'pop', { d: 0.6 + i * 1.2 })}><rect x="${x}" y="${y}" width="${w}" height="34" rx="10" class="fp"/><text x="${x + w / 2}" y="${y + 22}" class="mid ts ${c}">${t}</text></g>`).join('');

// ---------- 1: A headline every few months ----------
const head = (y, big, s1, s2, c, d) => `
<g ${L(0, 'up', { d })}>
  <rect x="24" y="${y}" width="352" height="62" rx="14" class="fp"/>
  <text x="44" y="${y + 42}" class="tx tb f${c}">${big}</text>
  <text x="360" y="${y + 27}" class="end ts">${s1}</text>
  <text x="360" y="${y + 47}" class="end ts fm">${s2}</text>
</g>`;
const s1 = `
${head(36, '8.6 MJ', 'from one laser shot', 'April 2025', 'b', 0.5)}
${head(108, '22 min', 'one plasma, held', 'February 2025', 'a', 5)}
${head(180, '69 MJ', 'of fusion energy in 5 seconds', 'late 2023', 'd', 9)}
<text x="200" y="276" class="mid tm tb fd" ${L(1, 'up')}>each one is real</text>
<text x="200" y="304" class="mid ts fm" ${L(2, 'up')}>but each one measures something different</text>
${box(328, 'three questions for every fusion headline', 3)}`;

// ---------- 2: What has to happen ----------
const s2 = `
<g ${L(0, 'up')}>
  <text x="200" y="46" class="mid ts fm">two light nuclei merge</text>
  <circle cx="110" cy="106" r="26" class="fk sa"/><text x="110" y="112" class="mid tm tb fa">D</text>
  <circle cx="290" cy="106" r="30" class="fk sb"/><text x="290" y="112" class="mid tm tb fb">T</text>
</g>
<g ${L(1, 'up')}>
  <text x="110" y="156" class="mid ts fm">deuterium</text><text x="290" y="158" class="mid ts fm">tritium</text>
</g>
${box(334, 'result: helium + a fast neutron + energy', 1, { d: 3 })}
<g ${L(2, 'up')}>
  ${arrow(192, 106, 146, 106, 'c')}${arrow(208, 106, 250, 106, 'c')}
  <text x="134" y="78" class="ts fc tb">+</text><text x="318" y="74" class="ts fc tb">+</text>
  <text x="200" y="190" class="mid ts fc">both positive: they push each other away</text>
</g>
<text x="200" y="226" class="mid tm tb" ${L(3, 'up')}>enough speed = enough heat</text>
<g ${L(4, 'up')}>
  <text x="200" y="278" class="mid tx tb fb">150 million °C</text>
  <text x="200" y="304" class="mid ts fm">matter becomes a plasma</text>
</g>`;

// ---------- 4: Three numbers at once ----------
const pillar = (x, big, sub, c) => `<rect x="${x}" y="64" width="104" height="104" rx="14" class="fp"/><text x="${x + 52}" y="114" class="mid tl tb f${c}">${big}</text><text x="${x + 52}" y="142" class="mid ts fm">${sub}</text>`;
const s4 = `
<text x="200" y="42" class="mid ts fm" ${L(0, 'up')}>three things, at the same moment</text>
<g ${L(1, 'up')}>${pillar(24, 'hot', 'fast collisions', 'c')}</g>
<g ${L(1, 'up', { d: 4 })}>${pillar(148, 'dense', 'many collisions', 'a')}<text x="138" y="122" class="mid tm fm">×</text></g>
<g ${L(2, 'up')}>${pillar(272, 'long', 'heat stays in', 'd')}<text x="262" y="122" class="mid tm fm">×</text></g>
<g ${L(3, 'up')}>
  <text x="200" y="212" class="mid tl tb fb">= the triple product</text>
  <text x="200" y="236" class="mid ts fm">the real scoreboard of fusion research</text>
</g>
<g ${L(4, 'up')}>
  <text x="200" y="286" class="mid ts fm">like lighting damp wood:</text>
  <text x="200" y="308" class="mid ts">enough heat, on enough wood, for long enough</text>
  <text x="200" y="340" class="mid ts fb tb">until the fire feeds itself</text>
</g>`;

// ---------- 5: Two ways to hold it ----------
const s5 = `
<g ${L(0, 'up')}>
  <rect x="24" y="40" width="166" height="226" rx="14" class="fp"/><text x="107" y="68" class="mid tm tb fa">magnets</text>
  <rect x="210" y="40" width="166" height="226" rx="14" class="fp"/><text x="293" y="68" class="mid tm tb fb">lasers</text>
</g>
<g ${L(1, 'up')}>
  <ellipse cx="107" cy="126" rx="56" ry="30" class="fn sa s3"/><ellipse cx="107" cy="126" rx="22" ry="9" class="fn sa s1"/>
  <text x="107" y="180" class="mid ts fm">a ring: the tokamak</text>
</g>
<g ${L(2, 'up')}>
  <text x="107" y="212" class="mid ts">very thin fuel</text>
  <text x="107" y="234" class="mid ts tb fa">seconds to minutes</text>
</g>
<g ${L(3, 'up')}>
  <circle cx="293" cy="126" r="9" class="fb"/>
  ${arrow(293, 82, 293, 110, 'b', { size: 7 })}${arrow(293, 170, 293, 142, 'b', { size: 7 })}${arrow(247, 126, 277, 126, 'b', { size: 7 })}${arrow(339, 126, 309, 126, 'b', { size: 7 })}
  ${arrow(261, 94, 281, 114, 'b', { size: 7 })}${arrow(325, 94, 305, 114, 'b', { size: 7 })}${arrow(261, 158, 281, 138, 'b', { size: 7 })}${arrow(325, 158, 305, 138, 'b', { size: 7 })}
  <text x="293" y="196" class="mid ts fm">a crushed pellet</text>
  <text x="293" y="218" class="mid ts">denser than lead</text>
  <text x="293" y="240" class="mid ts tb fb">a billionth of a second</text>
</g>
<g ${L(4, 'up')}>
  <text x="200" y="306" class="mid tm tb">one bets on time, one on density</text>
  <text x="200" y="334" class="mid ts fm">that is why their records look so different</text>
</g>`;

// ---------- 6: Record one: the laser shot ----------
const beams = Array.from({ length: 12 }, (_, i) => { const a = (i * 30 * Math.PI) / 180; return `<line x1="${(100 + 62 * Math.cos(a)).toFixed(1)}" y1="${(112 + 62 * Math.sin(a)).toFixed(1)}" x2="${(100 + 16 * Math.cos(a)).toFixed(1)}" y2="${(112 + 16 * Math.sin(a)).toFixed(1)}" class="sc s1"/>`; }).join('');
const s6 = `
<text x="200" y="38" class="mid ts fm" ${L(0, 'up')}>National Ignition Facility, California</text>
<g ${L(1, 'up')}>
  ${beams}<circle cx="100" cy="112" r="8" class="fb"/>
  <text x="196" y="92" class="tm tb">192 laser beams</text>
  <text x="196" y="114" class="ts fm">capsule: peppercorn size</text>
  <text x="196" y="142" class="ts fd tb">2022: more out than in</text>
</g>
<g ${L(2, 'up')}>
  <text x="24" y="212" class="ts">laser light in</text><rect x="124" y="198" width="37" height="18" rx="5" class="fc"/><text x="170" y="212" class="ts fc tb">2 MJ</text>
  <text x="24" y="242" class="ts">fusion out</text><rect x="124" y="228" width="155" height="18" rx="5" class="fd"/><text x="288" y="242" class="ts fd tb">8.6 MJ</text>
  <text x="200" y="280" class="mid tl tb fb">gain: about 4</text>
</g>
${box(298, 'ignition: the fuel heats itself', 3)}
<text x="200" y="366" class="mid ts fm" ${L(4, 'up')}>an open question for 60 years, now answered</text>`;

// ---------- 7: What the gain leaves out ----------
const s7 = `
<text x="200" y="40" class="mid ts fm" ${L(0, 'up')}>energy out, compared with which energy in?</text>
<g ${L(1, 'up')}>
  <text x="24" y="126" class="ts fc">laser light onto the capsule: 2 MJ</text><rect x="24" y="134" width="3" height="14" rx="1" class="fc"/>
  <text x="24" y="176" class="ts fd">fusion energy out: 8.6 MJ</text><rect x="24" y="184" width="10" height="14" rx="2" class="fd"/>
</g>
<g ${L(2, 'up')}>
  <text x="24" y="76" class="ts">drawn from the grid: about 300 MJ</text><rect x="24" y="84" width="352" height="14" rx="4" class="fm"/>
</g>
<text x="200" y="232" class="mid tm tb fc" ${L(3, 'up')}>back: about 3% of what went in</text>
<text x="200" y="266" class="mid ts" ${L(4, 'up')}>8.6 MJ would boil about 25 litres of water</text>
<g ${L(5, 'up')}>
  <rect x="24" y="292" width="170" height="60" rx="12" class="fp"/><text x="109" y="316" class="mid ts fm">today</text><text x="109" y="338" class="mid ts tb">about 1 shot a day</text>
</g>
<g ${L(5, 'up', { d: 4 })}>
  <rect x="206" y="292" width="170" height="60" rx="12" class="fp sc"/><text x="291" y="316" class="mid ts fm">a power plant</text><text x="291" y="338" class="mid ts tb fc">about 10 per second</text>
</g>`;

// ---------- 8: Two kinds of gain ----------
const node = (i, t, c = '') => `<rect x="115" y="${40 + i * 54}" width="150" height="32" rx="10" class="fp ${c}"/><text x="190" y="${61 + i * 54}" class="mid ts">${t}</text>`;
const down = (i) => arrow(190, 74 + i * 54, 190, 92 + i * 54, 'm', { size: 6 });
const s8 = `
<g ${L(0, 'up')}>
  ${node(2, 'into the fuel', 'sb')}${down(2)}${node(3, 'fusion heat', 'sb')}
  <path d="M272 164 H284 V218 H272" class="fn sb"/>
  <text x="292" y="180" class="ts tb fb">physics gain</text><text x="292" y="198" class="ts fm">fusion ÷</text><text x="292" y="214" class="ts fm">into the fuel</text>
</g>
<g ${L(1, 'up')}>
  ${node(0, 'electricity in')}${down(0)}${node(1, 'lasers or heaters')}${down(1)}${down(3)}${node(4, 'turbine')}${down(4)}${node(5, 'electricity out')}
  <path d="M108 56 H96 V326 H108" class="fn sd"/>
  <text x="88" y="186" class="end ts tb fd">plant gain</text><text x="88" y="204" class="end ts fm">electricity</text><text x="88" y="220" class="end ts fm">out ÷ in</text>
</g>
<g ${L(2, 'up')}>
  <text x="276" y="270" class="ts fc tb">only about 40%</text><text x="276" y="288" class="ts fm">becomes power</text>
</g>
<text x="200" y="372" class="mid ts fc tb" ${L(3, 'up')}>plant gain above 1: nobody yet</text>
<g ${L(4, 'up')}>
  <text x="292" y="58" class="ts fm">physics gain</text><text x="292" y="76" class="ts fm">needed:</text>
  <text x="292" y="98" class="ts tb">magnets 10+</text><text x="292" y="118" class="ts tb">lasers 50+</text>
</g>`;

// ---------- 9: Record two: the long plasma ----------
const s9 = `
<g ${L(0, 'up')}>
  <text x="200" y="40" class="mid ts fm">WEST tokamak, France, February 2025</text>
  <text x="200" y="92" class="mid tx tb fa">22 minutes</text>
  <rect x="24" y="110" width="352" height="16" rx="8" class="fa"/>
</g>
<text x="200" y="152" class="mid ts fm" ${L(0, 'up', { d: 6 })}>1,337 seconds</text>
${chips([['plain hydrogen', 24, 110], ['50 million °C', 140, 104], ['≈ no fusion energy', 250, 126]], 184, 1)}
<g ${L(2, 'up')}>
  <text x="200" y="262" class="mid tm tb fb">what was tested: endurance</text>
  <text x="200" y="288" class="mid ts fm">walls, heating and control, without a break</text>
</g>
${box(316, 'one number pushed far, two still low', 3)}`;

// ---------- 10: Record three: the most energy ----------
const s10 = `
<g ${L(0, 'up')}>
  <text x="200" y="40" class="mid ts fm">JET tokamak, England, late 2023</text>
  <text x="200" y="94" class="mid tx tb fd">69 MJ</text>
  <text x="200" y="118" class="mid ts fm">of fusion energy, in 5 seconds</text>
</g>
<g ${L(1, 'up')}>
  <rect x="24" y="140" width="352" height="64" rx="14" class="fp"/>
  <text x="200" y="166" class="mid ts tb">real fuel: deuterium + tritium</text>
  <text x="200" y="188" class="mid ts fm">only 0.2 milligrams of it</text>
</g>
<g ${L(2, 'up')}>
  <text x="24" y="242" class="ts">heating in</text><rect x="116" y="229" width="240" height="16" rx="5" class="fc"/>
  <text x="24" y="272" class="ts">fusion out</text><rect x="116" y="259" width="80" height="16" rx="5" class="fd"/>
  <text x="200" y="310" class="mid ts fc tb">physics gain: well below 1</text>
</g>
<text x="200" y="350" class="mid ts fm" ${L(3, 'up')}>built in the 1980s, too small for more, now closed</text>`;

// ---------- 11: The scoreboard ----------
const CX = [186, 246, 306, 360];
const mark = (x, y, ok) => ok ? `<path d="M${x - 9} ${y} l6 7 l12 -15" class="fn sd s3"/>` : `<path d="M${x - 6} ${y} h12" class="fn sm"/>`;
const srow = (y, t, sub, marks) => `<text x="24" y="${y}" class="ts tb">${t}</text><text x="24" y="${y + 18}" class="ts fm">${sub}</text>${marks.map((m, i) => mark(CX[i], y + 4, m)).join('')}`;
const s11 = `
<g ${L(0, 'up')}>
  ${[['real', 'fuel'], ['gain', '> 1'], ['long or', 'often'], ['power', 'to grid']].map(([a, b], i) => `<text x="${CX[i]}" y="48" class="mid ts fm">${a}</text><text x="${CX[i]}" y="64" class="mid ts fm">${b}</text>`).join('')}
  <path d="M24 78 H384" class="fn sm s1"/>
  <text x="24" y="112" class="ts tb">laser shot</text><text x="24" y="130" class="ts fm">8.6 MJ</text>
  <text x="24" y="166" class="ts tb">long plasma</text><text x="24" y="184" class="ts fm">22 minutes</text>
  <text x="24" y="220" class="ts tb">energy record</text><text x="24" y="238" class="ts fm">69 MJ</text>
</g>
<g ${L(1, 'pop')}>${[1, 1, 0, 0].map((m, i) => mark(CX[i], 116, m)).join('')}</g>
<g ${L(2, 'pop')}>${[0, 0, 1, 0].map((m, i) => mark(CX[i], 170, m)).join('')}</g>
<g ${L(3, 'pop')}>${[1, 0, 0, 0].map((m, i) => mark(CX[i], 224, m)).join('')}</g>
<g ${L(4, 'up')}>
  <rect x="334" y="92" width="52" height="156" rx="10" class="fn sc dash"/>
  <text x="200" y="290" class="mid ts">a power plant needs every box, in one machine</text>
  <text x="200" y="320" class="mid tm tb fc">the last column is empty for everyone</text>
</g>`;

// ---------- 12: The wall ----------
const hits = [[308, 96], [322, 130], [312, 168], [326, 204], [310, 232], [324, 82], [316, 188]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" class="fc"/>`).join('');
const s12 = `
<g ${L(0, 'up')}>
  <ellipse cx="106" cy="156" rx="70" ry="86" class="fb" style="opacity:.28"/><ellipse cx="106" cy="156" rx="70" ry="86" class="fn sb"/>
  <text x="106" y="160" class="mid ts">plasma</text>
  <rect x="298" y="62" width="38" height="190" rx="6" class="fp si"/><text x="317" y="50" class="mid ts fm">the wall</text>
</g>
<g ${L(1, 'up')}>
  ${arrow(168, 112, 292, 100, 'a')}${arrow(176, 146, 292, 142, 'a')}${arrow(176, 176, 292, 186, 'a')}${arrow(164, 210, 292, 228, 'a')}
  <text x="200" y="288" class="mid ts fa tb">fast neutrons carry 80% of the energy</text>
</g>
<g ${L(2, 'pop')}>${hits}</g>
<text x="200" y="312" class="mid ts" ${L(2, 'up')}>each one knocks atoms out of place</text>
<text x="200" y="336" class="mid ts fc tb" ${L(3, 'up')}>swells, turns brittle, becomes radioactive</text>
<text x="200" y="362" class="mid ts fm" ${L(4, 'up')}>never tested for long under this load</text>`;

// ---------- 13: The fuel ----------
const s13 = `
<g ${L(0, 'up')}>
  <rect x="24" y="36" width="170" height="40" rx="12" class="fp sd"/><text x="109" y="61" class="mid ts">deuterium: seawater</text>
  <rect x="206" y="36" width="170" height="40" rx="12" class="fp sc"/><text x="291" y="61" class="mid ts fc tb">tritium: scarce</text>
</g>
<g ${L(1, 'up')}>
  <text x="24" y="108" class="ts fm">today</text><rect x="110" y="96" width="240" height="14" rx="4" class="fc"/>
  <text x="24" y="132" class="ts fm">in 12 years</text><rect x="110" y="120" width="120" height="14" rx="4" class="fc"/>
  <text x="24" y="156" class="ts fm">in 24 years</text><rect x="110" y="144" width="60" height="14" rx="4" class="fc"/>
</g>
<text x="200" y="190" class="mid ts" ${L(2, 'up')}>world stock: a few tens of kilograms</text>
<text x="200" y="212" class="mid ts fc tb" ${L(3, 'up')}>one large plant burns: more than 50 kg a year</text>
<g ${L(4, 'up')}>
  <circle cx="58" cy="270" r="8" class="fa"/><text x="58" y="302" class="mid ts fm">neutron</text>
  ${arrow(74, 270, 108, 270, 'm')}
  <rect x="114" y="250" width="140" height="40" rx="10" class="fp sb"/><text x="184" y="275" class="mid ts">lithium layer</text>
  ${arrow(260, 270, 294, 270, 'm')}
  <circle cx="312" cy="270" r="8" class="fc"/><text x="312" y="302" class="mid ts fm">new tritium</text>
</g>
${box(322, 'must breed more than it burns: never shown', 5)}`;

// ---------- 14: What changed: stronger magnets ----------
const s14 = `
<text x="200" y="38" class="mid ts fm" ${L(0, 'up')}>what changed: stronger magnets</text>
<g ${L(1, 'up')}>
  <text x="24" y="72" class="ts fm">ITER magnets: about 12 tesla</text><rect x="24" y="80" width="168" height="14" rx="4" class="fm"/>
  <text x="24" y="118" class="ts fa tb">new magnet, 2021: 20 tesla</text><rect x="24" y="126" width="280" height="14" rx="4" class="fa"/>
</g>
<g ${L(2, 'up')}>
  <rect x="24" y="160" width="352" height="66" rx="14" class="fp"/>
  <text x="200" y="186" class="mid ts fm">fusion power from the same volume rises with</text>
  <text x="200" y="212" class="mid tm tb fb">field × field × field × field</text>
</g>
<text x="200" y="262" class="mid tl tb" ${L(3, 'up')}>field × 2 → power × 16</text>
<g ${L(4, 'up')}>
  <circle cx="76" cy="330" r="42" class="fn sm s3"/><text x="76" y="334" class="mid ts fm">old size</text>
  <circle cx="182" cy="330" r="12" class="fn sa s3"/>
  <text x="208" y="324" class="ts fa tb">new design</text><text x="208" y="344" class="ts">about 1/40 of the volume</text>
</g>`;

// ---------- 15: Where the projects stand ----------
const tl = (y, year, t, c = '') => `<circle cx="78" cy="${y - 4}" r="5" class="f${c || 'i'}"/><text x="66" y="${y}" class="end ts tb ${c ? 'f' + c : ''}">${year}</text><text x="94" y="${y}" class="ts">${t}</text>`;
const s15 = `
<g ${L(0, 'up')}>
  <text x="200" y="38" class="mid ts fm">plans, not results</text>
  <path d="M78 58 V306" class="fn sm s1"/>
</g>
${box(326, 'ITER goal: 500 MW of fusion from 50 MW of heating', 0, { d: 4, out: 4 })}
<g ${L(1, 'up')}>${tl(222, '2034', 'ITER: first operation', 'm')}${tl(284, '2039', 'ITER: real fuel. No electricity, ever', 'm')}</g>
<g ${L(2, 'up')}>${tl(78, '2027', 'SPARC: planned start, aims at gain &gt; 1', 'a')}</g>
<g ${L(3, 'up')}>${tl(140, '2028', 'Helion: contract with Microsoft', 'b')}<text x="94" y="160" class="ts fm">full power not before 2029 or 2030</text></g>
<text x="200" y="354" class="mid tm tb fc" ${L(4, 'up')}>fusion dates tend to slip</text>`;

// ---------- 16: Three questions ----------
const qrow = (y, n, t, sub, l) => `
<g ${L(l, 'up')}>
  <rect x="24" y="${y}" width="352" height="70" rx="14" class="fp"/>
  <text x="54" y="${y + 46}" class="mid tx tb fb">${n}</text>
  <text x="86" y="${y + 30}" class="tm tb">${t}</text>
  <text x="86" y="${y + 52}" class="ts fm">${sub}</text>
</g>`;
const s16 = `
<text x="200" y="30" class="mid ts fm" ${L(0, 'up')}>for the next fusion headline</text>
${qrow(42, '1', 'real fuel, or a stand-in?', 'no real fuel: no real fusion energy', 1)}
${qrow(122, '2', 'out, compared with which in?', 'into the fuel, or from the socket?', 2)}
${qrow(202, '3', 'how long, and how often?', 'an instant once a day, or all day?', 3)}
<g ${L(4, 'up')}>
  <text x="200" y="312" class="mid ts">no answer to any of the three?</text>
  <text x="200" y="340" class="mid tm tb fc">then it is about hope, not results</text>
</g>`;

// ---------- 17: An honest timeline ----------
const step = (x, y, a, b, c, col) => `<rect x="${x}" y="${y}" width="112" height="${322 - y}" rx="12" class="fp s${col}"/><text x="${x + 56}" y="${y + 26}" class="mid ts fm">${a}</text><text x="${x + 56}" y="${y + 50}" class="mid ts tb f${col}">${b}</text><text x="${x + 56}" y="${y + 68}" class="mid ts tb f${col}">${c}</text>`;
const s17 = `
<text x="200" y="42" class="mid tm tb fb" ${L(0, 'up')}>an estimate, not a fact</text>
<g ${L(1, 'up')}>${step(24, 216, 'next few years', 'gain above 1', 'with magnets', 'a')}</g>
<g ${L(2, 'up')}>${step(144, 150, 'the 2030s', 'first power', 'into a grid', 'b')}</g>
<g ${L(3, 'up')}>${step(264, 84, 'after 2050', 'a real share', 'of world power', 'd')}</g>
<text x="200" y="350" class="mid ts" ${L(4, 'up')}>too late for the climate goals of the next 20 years</text>
<text x="200" y="374" class="mid ts fd tb" ${L(5, 'up')}>as a long bet: more serious than ever</text>`;

// ---------- 18: The short version ----------
const s18 = `
${box(40, 'hot, dense and long enough, all at once', 0)}
${box(96, 'records: real, but one or two boxes each', 1)}
${box(152, 'still open: the wall, the fuel, electricity', 2)}
${box(208, 'new magnets: smaller and faster, not solved', 3)}
<g ${L(4, 'up')}>
  <text x="200" y="298" class="mid ts fm">tomorrow: business</text>
  <text x="200" y="326" class="mid tm tb">pricing: why most charge too little</text>
</g>`;

export default {
  id: '2026-11-26-innovation-02',
  date: '2026-11-26',
  area: 'innovation',
  series: 'Inventions that shape the future',
  episode: 2,
  title: 'Fusion power: what the recent records do and do not mean',
  hook: 'A record laser shot, a plasma held for 22 minutes, the most fusion energy ever. All true. Three questions show how far a power plant still is.',
  level: 2,
  poster: 9,
  voice: 'male',
  scenes: [
    {
      title: 'A headline every few months',
      svg: s1,
      lines: [
        'Every few months, there is a new headline about fusion. A record energy yield from a laser. A plasma held for twenty-two minutes. The most fusion energy ever made in one go.',
        'Each of these records is real.',
        'And yet none of them means that a fusion power plant is around the corner. They measure very different things.',
        'Today you get a small tool: three questions for any fusion headline.',
      ],
    },
    {
      title: 'What has to happen',
      svg: s2,
      lines: [
        { text: 'Fusion means that two light atomic nuclei merge into a heavier one. A tiny part of their mass turns into a lot of energy.', de: [['nuclear fusion', 'Kernfusion'], ['nucleus', 'Atomkern']] },
        'The best fuel is a pair of heavy types of hydrogen: deuterium and tritium. They merge into helium and a fast neutron.',
        'The problem: both nuclei carry a positive charge, so they push each other away.',
        'To get past that push, they must collide at enormous speed. And for particles, speed means temperature.',
        { text: 'On Earth, that takes about 150 million degrees. At that heat, matter is a plasma: a gas of loose, charged particles.', say: 'On Earth, that takes about one hundred and fifty million degrees. At that heat, matter is a plasma: a gas of loose, charged particles.', de: [['plasma', 'Plasma (geladenes Gas)']] },
      ],
    },
    {
      title: 'Three numbers at once',
      svg: s4,
      lines: [
        'Heat alone is not enough. Three things must be right at the same moment.',
        'The fuel must be hot enough, so that a collision can end in fusion. And dense enough, so that there are many collisions.',
        { text: 'And the heat must stay inside long enough, before it leaks away. This holding is called confinement.', de: [['confinement', 'Einschluss']] },
        { text: 'Multiply the three numbers, and you get the triple product. It is the real scoreboard of fusion research.', de: [['triple product', 'Tripelprodukt']] },
        'Think of lighting damp wood. You need enough heat, on enough wood, for long enough, until the fire feeds itself.',
      ],
    },
    {
      title: 'Two ways to hold it',
      svg: s5,
      lines: [
        'No material can touch a plasma at a hundred million degrees. So there are two main ways to hold it.',
        { text: 'The first way uses magnets. The plasma is charged, so a magnetic field can steer it. The usual machine bends it into a ring and is called a tokamak.', de: [['magnetic confinement', 'magnetischer Einschluss']] },
        'Here the fuel is far thinner than air. So it has to be held for a long time: seconds, or better, minutes.',
        { text: 'The second way does the opposite. Lasers crush a tiny pellet of fuel so hard that it becomes denser than lead. Then a billionth of a second is long enough.', de: [['inertial confinement', 'Trägheitsfusion']] },
        'One way bets on time, the other on density. So their records look very different.',
      ],
    },
    {
      title: 'Record one: the laser shot',
      svg: s6,
      lines: [
        'Record number one comes from the laser side, from the National Ignition Facility in California.',
        { text: '192 laser beams hit a capsule the size of a peppercorn. In December 2022, for the first time, more fusion energy came out than laser energy went in.', say: 'One hundred and ninety-two laser beams hit a capsule the size of a peppercorn. In December twenty twenty-two, for the first time, more fusion energy came out than laser energy went in.' },
        { text: 'In April 2025, the record rose to 8.6 megajoules, from about 2 megajoules of laser light. That is a gain of roughly 4.', say: 'In April twenty twenty-five, the record rose to eight point six megajoules, from about two megajoules of laser light. That is a gain of roughly four.' },
        { text: 'The fuel reached ignition: the fusion reactions heated the fuel themselves, which set off even more reactions.', de: [['ignition', 'Zündung']] },
        'For sixty years, nobody knew whether that could be done in a laboratory at all. Now we know.',
      ],
    },
    {
      title: 'What the gain leaves out',
      svg: s7,
      lines: [
        'Now the first of our three questions: energy out, compared with which energy in?',
        { text: 'The gain of 4 compares the fusion energy with the laser light that hit the capsule.', say: 'The gain of four compares the fusion energy with the laser light that hit the capsule.' },
        { text: 'But the lasers themselves are wasteful. To deliver those 2 megajoules, they draw roughly 300 megajoules from the grid.', say: 'But the lasers themselves are wasteful. To deliver those two megajoules, they draw roughly three hundred megajoules from the grid.' },
        'Measured against that, the shot gave back about three percent.',
        { text: 'And the amount is small: enough to bring about 25 litres of water to the boil.', say: 'And the amount is small: enough to bring about twenty-five litres of water to the boil.' },
        'The laboratory fires such a shot about once a day at most. A power plant would need around ten every second, each with a fresh capsule.',
      ],
    },
    {
      title: 'Two kinds of gain',
      svg: s8,
      quiz: {
        q: 'A laser shot draws 400 MJ from the grid. 2 MJ reach the fuel, 10 MJ of fusion heat come out. A turbine turns 40% of heat into power. What is the plant gain?',
        options: [
          { text: '0.01: one percent of the electricity comes back', correct: true, why: 'The turbine makes 4 megajoules of electricity out of the 10 megajoules of heat. Compared with the 400 that were drawn from the grid, that is one hundredth.' },
          { text: '0.025: two and a half percent comes back', why: 'That compares the 10 megajoules of heat with the 400 from the grid. But heat is not electricity yet. The turbine keeps only 40 percent of it, so 4.' },
          { text: '2: twice the energy that went into the fuel', why: 'The 4 megajoules of electricity are right. But the plant gain compares them with all the electricity the plant drew, 400, not with the 2 that reached the fuel.' },
          { text: '5: five times the energy that went into the fuel', why: 'That is the physics gain: 10 out for 2 into the fuel. The plant gain also counts the wasteful lasers before and the turbine after.' },
        ],
        explain: 'Picture a food stall. You hand the cook ingredients worth 2 euros, and the dish he makes is worth 10. Five times the value: that is the physics gain. But you are the owner. To get those ingredients onto his table, you paid 400 euros for rent, staff and power. And the customer does not pay 10 for the dish. After all the losses, 4 euros reach your till. So you spent 400 and got 4 back, which is one hundredth. That is the plant gain. Both numbers are honest. They just answer different questions. A headline almost always quotes the first one. A power company only cares about the second.',
      },
      lines: [
        { text: 'So the word gain can mean very different things. The physics gain compares the fusion energy with the energy that was put into the fuel.', de: [['energy gain', 'Energiegewinn']] },
        'The plant gain compares electricity out with electricity in. It includes every loss: the wasteful lasers or heaters at the start, and the turbine at the end.',
        'A turbine alone turns only about forty percent of the heat into electricity.',
        { text: 'As far as public results show, no fusion machine has reached a plant gain above one. None has fed electricity into a grid.', de: [['net electricity', 'Netto-Strom']] },
        'A rule of thumb: for a plant, the physics gain must be far above one. With magnets, ten or more. With lasers, fifty or more.',
      ],
    },
    {
      title: 'Record two: the long plasma',
      svg: s9,
      quiz: {
        q: 'A tokamak held a plain hydrogen plasma at about 50 million degrees for 22 minutes. What does this record show most directly?',
        options: [
          { text: 'That walls, heating and control survive a long run', correct: true, why: 'With plain hydrogen at this temperature there is almost no fusion. What ran for 22 minutes was the machine itself: its walls, its heating, its control.' },
          { text: 'That the machine made fusion energy for 22 minutes', why: 'Plain hydrogen at 50 million degrees hardly fuses at all. The plasma was hot and stable, but it was not a fire. It was held hot from outside.' },
          { text: 'That the triple product for a power plant was reached', why: 'Time is only one of the three numbers. Temperature and density were well below what a plant needs, so the product stays far too low.' },
          { text: 'That magnets beat lasers, whose shots last an instant', why: 'The two ways cannot be compared by time. Lasers work with extreme density and need only an instant. Magnets work with thin fuel and need long times.' },
        ],
        explain: 'Imagine a team that wants to build an engine for a flight around the world. One day they report: our engine ran for 22 minutes without a break. Then you learn that it ran without load, on a test stand, turned by an electric motor from outside, and with water in the tank instead of fuel. Was the test useless? Not at all. Bearings, cooling and control held for 22 minutes, and before that they failed after seconds. But the test says nothing about power, and nothing about the fuel. The long plasma is that kind of test. It checks the endurance of the machine, not the fusion.',
      },
      lines: [
        { text: 'Record number two comes from the magnet side. In February 2025, a French tokamak called WEST held a plasma for 1,337 seconds. That is 22 minutes.', say: 'Record number two comes from the magnet side. In February twenty twenty-five, a French tokamak called West held a plasma for one thousand three hundred and thirty-seven seconds. That is twenty-two minutes.' },
        'Here comes our second question: was it real fuel, or a stand-in? It was plain hydrogen, at about fifty million degrees. That gives almost no fusion energy.',
        'So what was tested? Endurance. Can the walls, the heating and the control systems run that long without a break?',
        'That is a necessary step, because a plant must run for days. But it is one of the three numbers pushed far, while the other two stay low.',
      ],
    },
    {
      title: 'Record three: the most energy',
      svg: s10,
      lines: [
        { text: 'Record number three: the most fusion energy from a magnetic machine. In late 2023, the European tokamak JET made 69 megajoules in 5 seconds.', say: 'Record number three: the most fusion energy from a magnetic machine. In late twenty twenty-three, the European tokamak Jet made sixty-nine megajoules in five seconds.' },
        { text: 'This time it was the real fuel, deuterium and tritium, and only 0.2 milligrams of it.', say: 'This time it was the real fuel, deuterium and tritium, and only a fifth of a milligram of it.' },
        'But the heating used roughly three times more energy than the fusion gave back. The physics gain was well below one.',
        { text: 'JET was built in the 1980s and was too small to do better. After this run, it was shut down.', say: 'Jet was built in the nineteen eighties and was too small to do better. After this run, it was shut down.' },
      ],
    },
    {
      title: 'The scoreboard',
      svg: s11,
      lines: [
        'Put the three records side by side.',
        'The laser shot had real fuel and a physics gain above one. But it lasts an instant, about once a day.',
        'The long plasma ran for twenty-two minutes, but without real fuel, and without any gain.',
        'The energy record had real fuel, but no gain, and it lasted five seconds.',
        'Each record ticks one or two boxes. A power plant has to tick all of them, in one machine, all day long. And the last box, electricity, is empty for everyone.',
      ],
    },
    {
      title: 'The open box: the wall',
      svg: s12,
      lines: [
        'And there are boxes that no record has touched. The first is the wall.',
        'Four fifths of the fusion energy leave the plasma as fast neutrons. Neutrons carry no charge, so the magnetic field cannot hold them.',
        'They fly straight into the wall. That is how the heat gets out. But each neutron also knocks atoms in the metal out of place.',
        { text: 'Over the years, every atom in the wall is hit many times. The metal swells, turns brittle and becomes radioactive.', de: [['neutron damage', 'Neutronenschäden']] },
        'No material has been tested under this load for long, because no machine can produce it yet.',
      ],
    },
    {
      title: 'The open box: the fuel',
      svg: s13,
      quiz: {
        q: 'A plant breeds 0.95 new tritium atoms for each one it burns. Other reactors supply only a few kilograms a year worldwide. What follows?',
        options: [
          { text: 'Its stock shrinks, and a fleet of such plants cannot run', correct: true, why: 'Below one, the plant uses up more than it makes. The outside supply is tiny, so one plant might be kept alive, but never hundreds of them.' },
          { text: 'It is almost self-sufficient, so the small gap is easy to buy', why: 'Five percent of more than 50 kilograms is over two and a half kilograms a year, for a single plant. That is about what the whole world makes.' },
          { text: 'It can stockpile the missing tritium before it starts up', why: 'A stock does not keep. Half of it is gone after twelve years. And there is nothing to stock up from: the world holds only a few tens of kilograms.' },
          { text: 'It can run on deuterium alone at the same temperature instead', why: 'Deuterium alone fuses far less easily. It would need a much higher triple product, which no machine is close to. Tritium is used because it is the easy case.' },
        ],
        explain: 'Think of a baker who makes sourdough bread. Every day he keeps back a piece of dough as the starter for the next day. Now suppose he always keeps back five percent too little. For a while nobody notices. But the starter gets smaller every single day, and one day there is not enough left to bake. Could he buy more? In this town nobody sells starter, apart from one neighbour who can spare a spoonful a year. Could he fill the cellar with it in advance? It spoils. A fusion plant is in the same position. Tritium cannot be bought in quantity and cannot be stored for long. So a ratio just below one is not almost good enough. It is a plant that slowly runs dry.',
      },
      lines: [
        'The second open box is the fuel. Deuterium comes from seawater. Tritium is the problem.',
        { text: 'Tritium hardly exists in nature, because it decays. Half of any amount is gone after twelve years.', de: [['half-life', 'Halbwertszeit']] },
        'The whole world holds only a few tens of kilograms, a by-product of one type of nuclear reactor.',
        'One large fusion plant would burn more than fifty kilograms a year.',
        { text: 'So every plant must make its own. The wall is wrapped in a layer with lithium. When a neutron hits lithium, new tritium is born.', de: [['breeding blanket', 'Brutmantel']] },
        'The plant must breed a little more than one new atom for each atom it burns. That has never been shown in a full machine.',
      ],
    },
    {
      title: 'What changed: stronger magnets',
      svg: s14,
      lines: [
        'So why all the new optimism, and the private money? One reason is a real technical jump: better magnets.',
        { text: 'Newer superconductors can carry far more current. In 2021, a team near Boston built a large magnet with a field of 20 tesla. The magnets of the giant ITER machine reach about 12.', say: 'Newer superconductors can carry far more current. In twenty twenty-one, a team near Boston built a large magnet with a field of twenty tesla. The magnets of the giant Eater machine reach about twelve.', de: [['superconductor', 'Supraleiter']] },
        'This matters because of a steep rule. The fusion power you get from a given volume rises with the fourth power of the field.',
        'Double the field, and the same volume gives sixteen times the power. So a machine can be much smaller.',
        'Smaller means cheaper and faster to build. That is what made fusion something that start-ups dare to try.',
      ],
    },
    {
      title: 'Where the projects stand',
      svg: s15,
      lines: [
        { text: 'The big public project is ITER, in France. Its goal: a physics gain of 10, which means 500 megawatts of fusion from 50 of heating.', say: 'The big public project is Eater, in France. Its goal: a physics gain of ten, which means five hundred megawatts of fusion from fifty of heating.' },
        { text: 'Its start has been pushed to 2034, and real fuel to 2039. And it will never make electricity. It is an experiment.', say: 'Its start has been pushed to twenty thirty-four, and real fuel to twenty thirty-nine. And it will never make electricity. It is an experiment.' },
        { text: 'The best-known private machine, SPARC, uses the new magnets. It has about a fortieth of the volume, is planned to start in 2027, and aims at a gain above 1.', say: 'The best-known private machine, Spark, uses the new magnets. It has about a fortieth of the volume, is planned to start in twenty twenty-seven, and aims at a gain above one.' },
        { text: 'Another company, Helion, has a contract to supply Microsoft from 2028. Reports from this autumn say that full power is not expected before 2029 or 2030.', say: 'Another company, Helion, has a contract to supply Microsoft from twenty twenty-eight. Reports from this autumn say that full power is not expected before twenty twenty-nine or twenty thirty.' },
        'Note the pattern. These are plans, and fusion dates have almost always slipped.',
      ],
    },
    {
      title: 'Three questions',
      svg: s16,
      quiz: {
        q: 'A company reports: plasma at 100 million degrees, held for a hundredth of a second, in plain hydrogen. No energy figures. What is the fairest reading?',
        options: [
          { text: 'One of three conditions is shown; gain is still open', correct: true, why: 'The temperature is a real and necessary step. But the holding time is very short, the fuel was a stand-in, and nothing is said about energy.' },
          { text: 'Fusion works there, because that is hotter than the sun', why: 'The sun is a poor yardstick. It gets by with less heat because gravity holds its fuel for billions of years. On Earth, heat is only one of three numbers.' },
          { text: 'It is close to a plant: only the fuel has to be swapped now', why: 'Swapping the fuel is the hard part. Real fuel brings fast neutrons, wall damage and the tritium problem. And the holding time is still far too short.' },
          { text: 'It is worthless, because no fusion energy was measured', why: 'That is too harsh. Without this temperature nothing else can follow, and reaching it in a new machine is real progress. It is a step, not a result.' },
        ],
        explain: 'Use the three questions one after the other. Real fuel? No, plain hydrogen, so there was no real fusion energy, no neutrons and no fuel cycle. Energy out against which energy in? The report gives no number at all, which usually means there is nothing to show yet. How long and how often? A hundredth of a second. So what is left is one true thing: the machine can reach the needed temperature. That is like a new restaurant reporting that its oven reaches 250 degrees. Good, and necessary. But nobody has cooked a meal yet, and nobody knows whether the kitchen can serve two hundred guests a night.',
      },
      lines: [
        'Now you have the tool. When the next fusion headline comes, ask three questions.',
        'One: was it real fuel, or a stand-in such as plain hydrogen? Without real fuel, there is no real fusion energy.',
        'Two: energy out, compared with which energy in? Into the fuel, or from the wall socket? The two can differ by a factor of a hundred.',
        'Three: how long, and how often? An instant once a day is a physics result. A power plant means all day, every day.',
        'If an article answers none of the three, it is telling you about hope, not about results.',
      ],
    },
    {
      title: 'An honest timeline',
      svg: s17,
      lines: [
        'So what is a fair expectation? Take this as an estimate, not as a fact.',
        'A magnetic machine with a physics gain above one in the next few years is plausible. That will make headlines.',
        'First pilot plants that feed some electricity into a grid may follow in the twenty thirties, if the wall and the fuel are solved in time.',
        'A real share of the world\'s electricity is something for the second half of this century.',
        'So fusion comes too late for the climate goals of the next twenty years. Those need what already works: sun, wind and storage.',
        'But as a bet on the long run, it has never looked more serious than now.',
      ],
    },
    {
      title: 'The short version',
      svg: s18,
      lines: [
        'The short version. Fusion needs fuel that is hot enough, dense enough, and held long enough, all at once.',
        'The recent records are real, but each ticks only one or two boxes.',
        'Nobody has ticked the hard engineering boxes: a wall that survives, fuel bred inside the plant, and electricity at the end.',
        'Stronger magnets made the machines smaller and brought in private money. That speeds things up, but the open boxes remain.',
        'Tomorrow we turn to business: pricing, and why most small companies charge too little.',
      ],
    },
  ],
  takeaways: [
    'Fusion needs three things at once: fuel that is hot enough, dense enough, and held long enough. Their product is the real scoreboard.',
    'The laser record (8.6 MJ, gain about 4) proved ignition. But measured against the electricity the lasers drew, about 3% came back.',
    'Physics gain compares fusion energy with the energy put into the fuel. Plant gain compares electricity out with electricity in. No machine has a plant gain above 1.',
    'The 22-minute plasma used plain hydrogen: a test of endurance, not of fusion. The 69 MJ record used real fuel, but with a gain well below 1.',
    'Two problems are untouched by any record: walls that survive fast neutrons, and tritium, which each plant has to breed for itself.',
    'Three questions for any headline: Real fuel or a stand-in? Energy out compared with which energy in? How long, and how often?',
  ],
  sources: [
    'Lawrence Livermore National Laboratory, annual report 2025: NIF shot of 7 April 2025 with 8.6 MJ from 2.08 MJ (target gain 4.13)',
    'CEA / IRFM (February 2025): WEST holds a hydrogen plasma for 1,337 seconds; EAST (January 2025): 1,066 seconds',
    'EUROfusion / UKAEA (February 2024): JET final deuterium-tritium run, 69 MJ in 5 seconds from 0.2 mg of fuel',
    'ITER Organization, Baseline 2024: start of research operation 2034, deuterium-tritium operation 2039',
    'Commonwealth Fusion Systems and MIT (2021): 20 tesla high-temperature superconducting magnet; SPARC planned for 2027 (press reports, 2026)',
    'Axios (September 2026): Helion and the timeline of its Orion plant for Microsoft',
    'The timeline in the last part is our own estimate, not a measured fact',
  ],
};
