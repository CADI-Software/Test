import { L, arrow, rng } from '../../tools/kit.mjs';

const box = (y, text, l, o = {}, cls = 'ts') => `
<g ${L(l, 'up', o)}>
  <rect x="24" y="${y}" width="352" height="42" rx="12" class="fp"/>
  <text x="200" y="${y + 27}" class="mid ${cls}">${text}</text>
</g>`;

// ---------- 1: Always five years away ----------
const s1 = `
${[['2× range', 24], ['10 min charge', 148], ['no fire', 272]].map(([t, x], i) => `<g ${L(0, 'pop', { d: i * 1.3 })}><rect x="${x}" y="34" width="104" height="38" rx="12" class="fp"/><text x="${x + 52}" y="58" class="mid ts fa tb">${t}</text></g>`).join('')}
<g ${L(1, 'up')}>
  <text x="200" y="110" class="mid ts fm">announced for …</text>
  ${[['2020', 70], ['2023', 150], ['2027', 240], ['2028', 320]].map(([t, x], i) => `<text x="${x}" y="146" class="mid tl tb${i < 2 ? ' fm' : ''}">${t}</text>${i < 2 ? `<path d="M${x - 28} 139 H${x + 28}" class="fn sc"/>` : ''}`).join('')}
</g>
<g ${L(2, 'up')}>
  <rect x="130" y="186" width="140" height="58" rx="12" class="fp sd"/>
  <path d="M146 200 H176 V220 H146 Z M186 200 H216 V220 H186 Z M226 200 H256 V220 H226 Z" class="fn sd s1"/>
  <circle cx="160" cy="248" r="10" class="fk sd"/><circle cx="240" cy="248" r="10" class="fk sd"/>
  <text x="200" y="284" class="mid ts fd tb">already on the road: in buses</text>
</g>
${box(308, 'the real question: why so hard for cars?', 3)}
<text x="200" y="380" class="mid ts fm" ${L(4, 'up')}>first: a look inside a normal battery</text>`;

// ---------- cell parts used in several scenes ----------
const layers = (x) => [130, 150, 170, 190, 210, 230, 250].map((y) => `<path d="M${x + 10} ${y} H${x + 80}" class="fn sm s1"/>`).join('');
const anode = `<rect x="40" y="110" width="90" height="160" rx="8" class="fp sa"/>${layers(40)}`;
const cathode = `<rect x="270" y="110" width="90" height="160" rx="8" class="fp sb"/>`;
const ions = [[150, 150], [176, 196], [224, 168], [246, 226], [160, 244]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="6" class="fi float" style="animation-delay:${-i * 0.6}s"/>`).join('');

// ---------- 2: Inside a normal battery ----------
const s2 = `
<g ${L(0, 'up')}>${anode}${cathode}
  <text x="200" y="372" class="mid ts fm">two shelves that store lithium</text>
</g>
<g ${L(1, 'up')}>
  <text x="85" y="296" class="mid ts fa tb">anode</text><text x="315" y="296" class="mid ts fb tb">cathode</text>
</g>
<g ${L(2)}><rect x="130" y="110" width="140" height="160" class="fa" style="opacity:.14"/></g>
<g ${L(2, 'up')}>${ions}<text x="200" y="296" class="mid ts">electrolyte</text><text x="200" y="314" class="mid ts fm">lithium ions swim across</text></g>
<g ${L(3, 'up')}>
  <path d="M85 110 V62 H315 V110" class="fn si"/>
  <circle cx="200" cy="62" r="16" class="fk si"/><path d="M193 62 H207 M200 55 V69" class="fn si s1"/>
  <path d="M100 48 H170" class="fn sd flow"/><path d="M230 48 H300" class="fn sd flow"/>
  <text x="200" y="30" class="mid ts fd tb">electrons take the wire: the current</text>
</g>
<g ${L(4, 'up')}>
  <path d="M200 110 V270" class="fn si dash"/>
  <text x="200" y="340" class="mid ts fm">thin separator in the middle</text>
</g>`;

// ---------- 3: The weak point ----------
const s3 = `
<text x="200" y="40" class="mid ts fm" ${L(0, 'up')}>the liquid: an easy path for ions</text>
<g ${L(0, 'up')}>${anode}${cathode}<rect x="130" y="110" width="140" height="160" class="fa" style="opacity:.14"/>${ions}</g>
<g ${L(1, 'pop', { out: 3 })}>
  <path d="M200 150 C222 174 228 196 214 218 C208 228 192 228 186 218 C172 196 190 186 200 150 Z" class="fc"/>
  <path d="M200 190 C210 202 208 214 200 218 C192 214 192 204 200 190 Z" class="fb"/>
</g>
<text x="200" y="92" class="mid ts fc tb" ${L(1, 'up', { out: 3 })}>a flammable solvent</text>
<text x="200" y="304" class="mid ts fm" ${L(2, 'up', { out: 3 })}>and it rules out the best anode material</text>
<g ${L(3, 'up')}>
  <rect x="130" y="110" width="140" height="160" class="fq sd"/>
  <path d="M140 150 L180 110 M140 200 L230 110 M140 250 L260 130 M170 270 L260 180 M220 270 L260 230" class="fn sd s1"/>
  <text x="200" y="92" class="mid ts fd tb">solid electrolyte</text>
</g>
${box(322, 'replace the liquid with a solid', 3, { d: 2 }, 'tm')}`;

// ---------- 4: The real prize ----------
const unit = (x, y) => [[0, 0], [14, 0], [28, 0], [0, 14], [14, 14], [28, 14]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="5" class="fm"/>`).join('') + `<circle cx="${x + 46}" cy="${y + 7}" r="6" class="fa"/>`;
const metal = Array.from({ length: 28 }, (_, i) => `<circle cx="${236 + (i % 7) * 18}" cy="${82 + Math.floor(i / 7) * 18}" r="6" class="fa"/>`).join('');
const s4 = `
<g ${L(1, 'up')}>
  <rect x="24" y="40" width="166" height="150" rx="14" class="fp"/>
  <text x="107" y="64" class="mid ts tb">graphite</text>
  ${unit(48, 80)}${unit(112, 80)}${unit(48, 118)}${unit(112, 118)}
  <text x="107" y="174" class="mid ts fm">6 carbon hold 1 lithium</text>
</g>
<g ${L(2, 'up')}>
  <rect x="210" y="40" width="166" height="150" rx="14" class="fp sa"/>
  <text x="293" y="64" class="mid ts tb fa">lithium metal</text>
  ${metal}
  <text x="293" y="174" class="mid ts fm">no shelf, only cargo</text>
</g>
<text x="200" y="222" class="mid tl tb fa" ${L(2, 'pop', { d: 3.5 })}>≈ 10× per gram</text>
<g ${L(3, 'up')}>
  <text x="24" y="262" class="ts fm">today</text><rect x="84" y="250" width="160" height="14" rx="7" class="fm"/>
  <text x="24" y="290" class="ts fa tb">goal</text><rect x="84" y="278" width="240" height="14" rx="7" class="fa"/>
  <text x="334" y="291" class="ts fa tb">×1.5</text>
</g>
<g ${L(4, 'up')}>
  <text x="200" y="340" class="mid ts fb tb">test car, 2025: 1,205 km on one charge</text>
  <text x="200" y="362" class="mid ts fm">25% more energy in a pack of the same size</text>
</g>`;

// ---------- 5: Needles ----------
const needles = [[100, 140, 'l12 -4 l8 6 l14 -8'], [100, 176, 'l16 2 l8 -8 l12 6'], [100, 214, 'l10 6 l14 -6 l10 8'], [100, 246, 'l14 -4 l10 8 l10 -6']];
const s5 = `
<g ${L(0, 'up')}>
  <rect x="40" y="110" width="60" height="160" rx="8" class="fa"/><text x="70" y="296" class="mid ts fa tb">lithium</text>
  <rect x="300" y="110" width="60" height="160" rx="8" class="fp sb"/><text x="330" y="296" class="mid ts fb tb">cathode</text>
  <rect x="100" y="110" width="200" height="160" class="fa" style="opacity:.12"/>
  <path d="M200 110 V270" class="fn si dash"/>
</g>
<g ${L(1, 'fade', { out: 4 })}>${needles.map(([x, y, d], i) => `<path d="M${x} ${y} ${d}" class="fn sc" data-l="1" data-fx="draw" data-d="${i * 0.5}"/>`).join('')}</g>
<text x="150" y="96" class="mid ts fc tb" ${L(1, 'up', { out: 4 })}>needles: dendrites</text>
<path d="M134 178 l22 6 l18 -10 l24 8 l20 -6 l26 10 l22 -8 l34 6" class="fn sc s3" ${L(2, 'draw', { out: 4 })}/>
<g ${L(3, 'pop', { out: 4 })}><path d="M300 162 l6 14 l15 -3 l-9 12 l9 12 l-15 -3 l-6 14 l-6 -14 l-15 3 l9 -12 l-9 -12 l15 3 z" class="fb"/></g>
<text x="200" y="326" class="mid ts fb tb" ${L(3, 'up', { out: 4 })}>short circuit inside the cell</text>
<g ${L(4, 'up')}>
  <rect x="180" y="100" width="40" height="180" rx="6" class="fq sd"/>
  <text x="200" y="326" class="mid tm fd tb">the hope: a solid wall</text>
  <text x="200" y="350" class="mid ts fm">too hard for needles to pierce</text>
</g>`;

// ---------- 6: Through ceramic anyway ----------
const s6 = `
<g ${L(0, 'up')}>
  <text x="200" y="44" class="mid ts fm">hard ceramic, seen up close</text>
  <rect x="40" y="60" width="80" height="240" rx="8" class="fa"/><text x="80" y="186" class="mid ts tb" style="fill:var(--k-bg)">lithium</text>
  <rect x="280" y="60" width="80" height="240" rx="8" class="fp sb"/>
  <rect x="120" y="60" width="160" height="240" class="fq"/>
  <path d="M120 140 L160 130 L200 150 L240 135 L280 145 M120 220 L165 235 L205 215 L245 240 L280 225 M160 60 L160 130 L165 235 L158 300 M200 60 L200 150 L205 215 L210 300 M240 60 L240 135 L245 240 L238 300" class="fn sm s1"/>
</g>
<path d="M120 220 L165 235 L205 215" class="fn sc s3" ${L(1, 'draw')}/>
<text x="200" y="326" class="mid ts fc tb" ${L(1, 'up')}>along cracks and grain borders</text>
<path d="M205 215 L245 240 L280 225" class="fn sc s3" ${L(2, 'draw')}/>
<g ${L(2, 'pop', { d: 1.4 })}><path d="M280 207 l5 12 l13 -3 l-8 10 l8 10 l-13 -3 l-5 12 l-5 -12 l-13 3 l8 -10 l-8 -10 l13 3 z" class="fb"/></g>
<text x="200" y="352" class="mid ts fb tb" ${L(3, 'up')}>worst at high current = fast charging</text>
<text x="200" y="380" class="mid ts fm" ${L(4, 'up')}>still debated; finer grains and coatings help</text>`;

// ---------- 7: Solids do not touch well ----------
const zig = (x0, y, up) => { let d = `M${x0} ${y}`; for (let i = 0; i < 8; i++) d += ` l10 ${up ? -14 : 14} l10 ${up ? 14 : -14}`; return d; };
const s7 = `
<g ${L(0, 'up')}>
  <path d="${zig(30, 150, true)} V110 H30 Z" class="fa" style="opacity:.3"/>
  <path d="${zig(30, 150, true)}" class="fn sb"/>
  <text x="110" y="186" class="mid ts fa">liquid: touches everywhere</text>
  <path d="${zig(210, 150, true)}" class="fn sb"/>
  <path d="${zig(220, 122, false)}" class="fn sd"/>
  <text x="290" y="186" class="mid ts fd">solid: only the tips</text>
</g>
<g ${L(1, 'pop')}>${[230, 250, 270, 290, 310, 330, 350].map((x) => `<circle cx="${x}" cy="136" r="3.5" class="fi"/>`).join('')}</g>
<g ${L(2, 'up')}><g class="pulse"><rect x="120" y="232" width="160" height="22" rx="4" class="fa"/></g></g>
<text x="200" y="296" class="mid ts fm" ${L(2, 'up', { out: 3 })}>the anode swells and shrinks: the cell breathes</text>
<g ${L(3, 'up')}>
  <rect x="100" y="210" width="200" height="12" rx="3" class="fm"/><rect x="100" y="264" width="200" height="12" rx="3" class="fm"/>
  ${arrow(200, 196, 200, 210, 'c', { size: 7 })}${arrow(200, 300, 200, 278, 'c', { size: 8 })}
  <text x="322" y="247" class="ts fm">steel plates</text>
</g>
<g ${L(4, 'up')}>
  <text x="110" y="336" class="mid ts fc tb">lab: 20 MPa and more</text>
  <text x="110" y="356" class="mid ts fm">like 2 km under the sea</text>
  <text x="300" y="336" class="mid ts fd tb">car: 1 to 2 MPa</text>
  <text x="300" y="356" class="mid ts fm">about a tenth</text>
</g>`;

// ---------- 8: Every material has a catch ----------
const mat = (y, l, letter, c, title, plus, minus) => `
<g ${L(l, 'up')}>
  <rect x="24" y="${y}" width="352" height="88" rx="14" class="fp"/>
  <circle cx="66" cy="${y + 44}" r="24" class="fk s${c}"/><text x="66" y="${y + 51}" class="mid tl tb f${c}">${letter}</text>
  <text x="110" y="${y + 30}" class="tm tb">${title}</text>
  <text x="110" y="${y + 52}" class="ts fd">+ ${plus}</text>
  <text x="110" y="${y + 72}" class="ts fc">− ${minus}</text>
</g>`;
const s8 = `
<text x="200" y="74" class="mid tx tb" ${L(0, 'pop', { out: 1 })}>Three families</text>
${mat(20, 1, 'S', 'b', 'Sulfides', 'conduct like a liquid', 'toxic gas when they meet moisture')}
${mat(118, 2, 'O', 'a', 'Oxide ceramics', 'stable, safe to handle', 'brittle, baked at about 1000 °C')}
${mat(216, 3, 'P', 'e', 'Polymers', 'easy to produce', 'work only warm: 60 to 80 °C')}
${box(326, 'the bus: truly solid, but heated all the time', 4)}`;

// ---------- 9: Making kilometres of it ----------
const s9 = `
<g ${L(0, 'up')}>
  <text x="200" y="40" class="mid ts fm">the factory: kilometres of one thin layer</text>
  <circle cx="64" cy="104" r="30" class="fp si"/><circle cx="64" cy="104" r="8" class="fn si s1"/>
  <circle cx="336" cy="104" r="30" class="fp si"/><circle cx="336" cy="104" r="8" class="fn si s1"/>
  <path d="M64 74 H336" class="fn sd s3"/>
</g>
<g ${L(1, 'up')}>
  <circle cx="110" cy="214" r="28" class="fn sm"/><text x="110" y="262" class="mid ts fm">a human hair</text>
  <rect x="220" y="208" width="120" height="10" rx="2" class="fd"/><text x="280" y="262" class="mid ts fd tb">the layer: thinner</text>
</g>
<g ${L(2, 'pop')}><circle cx="214" cy="74" r="9" class="fn sc pulse"/></g>
<text x="200" y="160" class="mid ts fc tb" ${L(2, 'up')}>one pinhole = one failed cell</text>
<g ${L(3, 'up')}>
  <path d="M50 296 C110 340 240 356 350 360" class="fn sb s3"/>
  <text x="56" y="290" class="ts fb">cost of liquid batteries</text>
  <text x="200" y="388" class="mid ts fm">over 30 years of getting cheaper</text>
</g>`;

// ---------- 10: Really safer? ----------
const s10 = `
<g ${L(1, 'up')}>
  <rect x="24" y="40" width="166" height="120" rx="14" class="fp"/>
  <path d="M86 78 l14 14 l28 -28" class="fn sd s3"/>
  <text x="107" y="124" class="mid ts tb fd">less to burn</text><text x="107" y="144" class="mid ts fm">no flammable liquid</text>
</g>
<g ${L(2, 'up')}>
  <rect x="210" y="40" width="166" height="120" rx="14" class="fp"/>
  <path d="M293 58 L319 102 H267 Z" class="fn sb"/><path d="M293 74 V88" class="fn sb s3"/><circle cx="293" cy="95" r="2.6" class="fb"/>
  <text x="293" y="124" class="mid ts tb fb">lithium metal reacts</text><text x="293" y="144" class="mid ts fm">Sandia study, 2022</text>
</g>
<g ${L(3, 'up')}>
  <text x="200" y="196" class="mid ts fm">heat when the cell fails</text>
  <rect x="120" y="216" width="46" height="90" rx="6" class="fm"/><text x="143" y="326" class="mid ts">normal cell</text>
  <rect x="234" y="222" width="46" height="84" rx="6" class="fc"/><text x="257" y="326" class="mid ts">solid, cracked</text>
  <text x="200" y="266" class="mid tl tb">≈</text>
</g>
${box(344, 'safer in many cases, not automatically safe', 4)}`;

// ---------- 11: Where things stand ----------
const TX = (y) => 40 + (y - 2025) * 45.7;
const s11 = `
<g ${L(0, 'up')}>
  <path d="M40 120 H360" class="fn sm"/>
  ${[2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032].map((y) => `<path d="M${TX(y).toFixed(0)} 114 V126" class="fn sm s1"/>${y % 2 === 0 ? `<text x="${TX(y).toFixed(0)}" y="146" class="mid ts fm">${y}</text>` : ''}`).join('')}
  <path d="M${TX(2026.9).toFixed(0)} 104 V136" class="fn si"/><text x="${TX(2026.9).toFixed(0)}" y="166" class="mid ts">today</text>
</g>
<g ${L(1, 'up')}>
  <rect x="${TX(2027.5).toFixed(0)}" y="108" width="${(TX(2028.9) - TX(2027.5)).toFixed(0)}" height="24" rx="6" class="fa"/>
  <text x="${TX(2028.2).toFixed(0)}" y="60" class="mid ts fa tb">first mass production</text>
  <text x="${TX(2028.2).toFixed(0)}" y="78" class="mid ts fm">small numbers, expensive</text>
</g>
<g ${L(2, 'up')}>
  <rect x="24" y="172" width="352" height="84" rx="14" class="fp"/>
  <text x="200" y="200" class="mid ts fm">November 2026, QuantumScape</text>
  <text x="200" y="226" class="mid tm tb">1,000 cycles without a press</text>
</g>
<text x="200" y="246" class="mid ts fb" ${L(3, 'up')}>small test cell · about 80% capacity left</text>
<g ${L(4, 'up')}>
  <rect x="${TX(2030).toFixed(0)}" y="108" width="${(360 - TX(2030)).toFixed(0)}" height="24" rx="6" class="fd"/>
  ${box(290, 'ordinary cars: most analysts say after 2030', 4)}
</g>`;

// ---------- 12: The old battery keeps moving ----------
const s12 = `
<g ${L(1, 'up')}>
  <rect x="130" y="50" width="130" height="64" rx="10" class="fp si"/><rect x="260" y="70" width="10" height="24" rx="3" class="fi"/>
  <path d="M202 58 L182 86 H198 L190 108 L212 78 H196 Z" class="fb"/>
  <text x="200" y="140" class="mid ts fb tb">ordinary cells: charging in about 5 minutes</text>
</g>
<g ${L(2, 'up')}>
  <path d="M60 220 H340" class="fn sm s3"/>
  <circle cx="60" cy="220" r="10" class="fm"/><circle cx="200" cy="220" r="12" class="fb"/><circle cx="340" cy="220" r="10" class="fd"/>
  <text x="60" y="252" class="mid ts fm">liquid</text><text x="200" y="252" class="mid ts fb tb">semi-solid: a gel</text><text x="340" y="252" class="mid ts fd">solid</text>
  <text x="200" y="192" class="mid ts">already in some cars</text>
</g>
${box(300, '“solid-state” in a headline? check which one', 3)}
<text x="200" y="30" class="mid ts fm" ${L(0, 'up')}>the target is moving</text>`;

// ---------- 13: Four questions ----------
const ask = (i, t, o = {}) => `<g ${L(i + 1, 'up', o)}><rect x="24" y="${62 + i * 62}" width="352" height="48" rx="12" class="fp"/><circle cx="54" cy="${86 + i * 62}" r="14" class="fk sa"/><text x="54" y="${91 + i * 62}" class="mid ts fa tb">${i + 1}</text><text x="82" y="${91 + i * 62}" class="tm">${t}</text></g>`;
const s13 = `
<text x="200" y="38" class="mid ts fm" ${L(0, 'up')}>four questions for any battery headline</text>
${ask(0, 'Cell size: coin or car?')}${ask(1, 'Temperature and pressure?')}${ask(2, 'Cycles and charging speed?')}${ask(3, 'Fully solid or semi-solid?')}
<text x="200" y="346" class="mid tm fb tb" ${L(4, 'up', { d: 4 })}>no answers = advertising</text>`;

// ---------- 14: The short version ----------
const prob = (i, t) => { const x = 24 + (i % 2) * 182, y = 62 + Math.floor(i / 2) * 64; return `<g ${L(1, 'pop', { d: 0.8 + i * 0.9 })}><rect x="${x}" y="${y}" width="170" height="48" rx="12" class="fp"/><circle cx="${x + 26}" cy="${y + 24}" r="7" class="fb pulse"/><text x="${x + 46}" y="${y + 29}" class="tm">${t}</text></g>`; };
const s14 = `
<text x="200" y="38" class="mid ts fm" ${L(0, 'up')}>not one missing invention: four problems</text>
${prob(0, 'needles')}${prob(1, 'contact')}${prob(2, 'materials')}${prob(3, 'factory')}
<text x="200" y="212" class="mid ts fm" ${L(1, 'up', { d: 4.5 })}>all four: being solved step by step</text>
<text x="200" y="262" class="mid tm fa tb" ${L(2, 'up')}>the prize is real: lithium metal</text>
${box(300, 'first in expensive cars, late this decade', 3, {}, 'tm')}`;

export default {
  id: '2026-11-20-innovation-01',
  date: '2026-11-20',
  area: 'innovation',
  series: 'How it works',
  episode: 1,
  title: 'Solid-state batteries: why they are so hard to build',
  hook: 'Twice the range, always five years away. The battery already exists in buses. Four hard problems keep it out of your car.',
  level: 2,
  poster: 5,
  voice: 'male',
  scenes: [
    {
      title: 'Always five years away',
      svg: s1,
      lines: [
        { text: 'Twice the range, charging in ten minutes, no fire risk. That is the promise of the solid-state battery.', de: [['solid-state battery', 'Festkörperbatterie']] },
        'Car makers have been announcing it for about ten years. And it is still always a few years away.',
        'Here is the surprise: solid-state batteries already exist. They have been driving around in buses for years.',
        'So the real question is not whether they work. It is why they are so hard to build for cars.',
        'To see why, we first need to look inside a normal battery.',
      ],
    },
    {
      title: 'Inside a normal battery',
      svg: s2,
      lines: [
        'A lithium-ion battery has two sides that can store lithium. Think of them as two shelves.',
        { text: 'When you charge, lithium moves to one shelf, the anode. When you drive, it moves back to the other one, the cathode.', de: [['anode', 'Anode (Minuspol)'], ['cathode', 'Kathode (Pluspol)']] },
        { text: 'The lithium travels as charged particles, called ions, through a liquid in between. That liquid is the electrolyte.', de: [['electrolyte', 'Elektrolyt']] },
        'Electrons cannot pass through that liquid. They have to take the detour through the wire, and that detour is your electric current.',
        'A thin plastic sheet, the separator, keeps the two shelves from touching each other.',
      ],
    },
    {
      title: 'The weak point is the liquid',
      svg: s3,
      lines: [
        'The liquid electrolyte does its job well. Ions move through it easily, and it seeps into every pore of the shelves.',
        { text: 'But it is a flammable solvent. If a cell is damaged or overheats, this liquid is what burns.', de: [['flammable', 'brennbar']] },
        'And it rules out the best anode material there is. You will see why in a moment.',
        'The idea of the solid-state battery is simple: replace the liquid with a solid material that still lets lithium ions pass.',
      ],
    },
    {
      title: 'The real prize is the anode',
      svg: s4,
      quiz: {
        q: 'Why could a solid electrolyte give an electric car more range?',
        options: [
          { text: 'It may allow a lithium-metal anode, which stores far more per gram than graphite', correct: true, why: 'The solid itself stores nothing. Its value is that it might make the lithium-metal anode usable, and that anode needs no heavy shelf.' },
          { text: 'The solid electrolyte itself stores extra lithium', why: 'The electrolyte is only the road for the ions. It stores no usable energy, whether it is liquid or solid.' },
          { text: 'Solid materials are lighter than the liquid they replace', why: 'Usually the opposite is true. Ceramic electrolytes are denser than the liquid. The weight is saved at the anode, not at the electrolyte.' },
        ],
        explain: 'Think of a delivery van. Today’s anode is a van full of shelving: for every parcel of lithium, it carries six parcels’ worth of rack made of carbon. A lithium-metal anode is a van with no shelves at all, packed with parcels only. The same van carries far more. But parcels without shelves slide around, and in a battery that sliding shows up as needles that cause short circuits. The solid electrolyte is meant to be the wall that keeps the load in place. So the solid part is the enabler, and the extra range comes from the anode behind it.',
      },
      lines: [
        'Most people think the main gain is safety. The bigger prize is hidden in the anode.',
        'Today’s anode is graphite. It works like a shelf: for every lithium atom it stores, it needs six carbon atoms to hold it.',
        'The ideal anode would be pure lithium metal. No shelf, only cargo. Per gram, it stores about ten times as much.',
        { text: 'For the whole cell, developers aim for roughly one and a half times the energy at the same weight.', de: [['energy density', 'Energiedichte']] },
        { text: 'In 2025, a Mercedes test car with lithium-metal cells drove 1,205 kilometres on one charge. Its pack held 25 percent more energy at the same size.', say: 'In twenty twenty-five, a Mercedes test car with lithium-metal cells drove more than twelve hundred kilometres on one charge. Its pack held twenty-five percent more energy at the same size.', de: [['range', 'Reichweite']] },
      ],
    },
    {
      title: 'Why lithium metal fails in liquid',
      svg: s5,
      lines: [
        'So why not use lithium metal with the liquid we already have? Because of the way lithium grows back when you charge.',
        { text: 'It does not settle as a smooth layer. It grows in tiny needles, called dendrites.', de: [['dendrite', 'Dendrit']] },
        'Charge after charge, a needle grows through the liquid and through the thin separator, until it touches the other side.',
        { text: 'That is a short circuit inside the cell. The energy is released at once, as heat, in a flammable liquid.', de: [['short circuit', 'Kurzschluss']] },
        'So the hope was simple: a hard, solid electrolyte would be a wall that needles cannot pierce.',
      ],
    },
    {
      title: 'Problem one: needles get through anyway',
      svg: s6,
      lines: [
        'And here comes the first surprise. The needles grow through hard ceramic too.',
        { text: 'Lithium is soft enough to cut with a knife. But it finds tiny cracks, and the borders between the grains of the ceramic.', de: [['crack', 'Riss']] },
        'Inside a crack, it acts like a wedge. The crack widens, the lithium follows, and in the end the cell is shorted again.',
        { text: 'This happens mostly at high current, which means during fast charging. So the limit shows up exactly where the promise was biggest.', de: [['fast charging', 'Schnellladen']] },
        'Researchers still argue about the exact mechanism. Finer grains and special coatings help, but the problem is not closed.',
      ],
    },
    {
      title: 'Problem two: solids do not touch well',
      svg: s7,
      quiz: {
        q: 'A new solid-state cell works perfectly in the lab, clamped between thick steel plates. Why is that not yet good news for a car?',
        options: [
          { text: 'The clamp hides the contact problem, and a car cannot carry that pressure', correct: true, why: 'High pressure keeps the solids touching while the cell breathes. In a car, the plates needed for it would eat up the weight advantage.' },
          { text: 'Steel plates conduct electricity and improve the result artificially', why: 'The plates are not part of the circuit. They help mechanically, by pressing the layers together.' },
          { text: 'Lab cells use purer lithium than a factory could ever get', why: 'Purity is not the issue here. The same cell would fail in the lab too, as soon as the pressure is removed.' },
        ],
        explain: 'Imagine two bricks with a sheet of paper between them. Press hard, and the paper touches both bricks everywhere. Let go and shake them a little, and the paper touches only here and there. A solid-state cell behaves like that. Ions can cross only where the layers really touch, and the anode keeps moving, because it swells and shrinks with every charge. Steel plates in the lab press everything together with a force no car could carry. So the honest test of a cell is how it behaves at low pressure. You will see in a moment why one result from this month got so much attention.',
      },
      lines: [
        { text: 'The second problem sounds trivial, and it is not. A liquid touches every surface. Two solids touch only at their high points.', de: [['interface', 'Grenzfläche']] },
        'Lay two sheets of sandpaper on top of each other. They meet at a few tips. Ions can cross only at those tips.',
        'It gets worse while the battery works. The anode grows thicker when charging and thinner when discharging. The cell breathes.',
        { text: 'With every breath, contact points break. In the lab, the fix is brute force: steel plates press the cell together.', de: [['pressure', 'Druck']] },
        { text: 'Lab cells often needed 20 megapascals or more. That is the pressure two kilometres deep in the sea. A car can supply perhaps a tenth of that.', say: 'Lab cells often needed twenty megapascals or more. That is the pressure two kilometres deep in the sea. A car can supply perhaps a tenth of that.' },
      ],
    },
    {
      title: 'Problem three: every material has a catch',
      svg: s8,
      lines: [
        'Third problem: there is no perfect solid electrolyte. There are three families, and each one has a catch.',
        { text: 'Sulfides conduct ions as well as a liquid. But with moisture they release hydrogen sulfide, a toxic gas. Factories need extremely dry rooms.', de: [['moisture', 'Feuchtigkeit']] },
        { text: 'Oxide ceramics are stable and safe to handle. But they are brittle like a dinner plate, and have to be baked at around a thousand degrees.', de: [['brittle', 'spröde']] },
        { text: 'Polymers, which means plastics, are easy to produce. But they conduct well only when warm, at 60 to 80 degrees.', say: 'Polymers, which means plastics, are easy to produce. But they conduct well only when warm, at sixty to eighty degrees.' },
        'That is the bus from the beginning. Its polymer battery is truly solid, and it has to be kept hot all the time.',
      ],
    },
    {
      title: 'Problem four: the factory',
      svg: s9,
      lines: [
        { text: 'Even with the right material, the hardest part may be the factory.', de: [['mass production', 'Massenfertigung']] },
        'The solid layer has to be thinner than a human hair, and free of holes over many square metres.',
        'One pinhole is enough for a needle to get through. And one bad cell among thousands can spoil a whole battery pack.',
        'Factories for liquid batteries have had more than thirty years to become this cheap. A new technology has to compete with that from day one.',
      ],
    },
    {
      title: 'And is it really safer?',
      svg: s10,
      lines: [
        'What about the safety promise? It is true only in part.',
        'Without the flammable liquid, an ordinary fire becomes less likely. That part holds.',
        { text: 'But lithium metal itself is highly reactive. In 2022, researchers at Sandia National Laboratories calculated what happens when such cells fail.', say: 'But lithium metal itself is highly reactive. In twenty twenty-two, researchers at Sandia National Laboratories calculated what happens when such cells fail.' },
        'Their result: if the solid layer cracks, such a cell can heat up about as much as a normal one. With lithium metal inside, there is always something that can react.',
        'So: safer in many cases, yes. Automatically safe, no.',
      ],
    },
    {
      title: 'Where things stand in late 2026',
      svg: s11,
      lines: [
        { text: 'So where are we, at the end of 2026?', say: 'So where are we, at the end of twenty twenty-six?' },
        { text: 'Samsung names the second half of 2027 for its first mass production. Toyota speaks of 2027 to 2028. Both mean small numbers, for expensive models.', say: 'Samsung names the second half of twenty twenty-seven for its first mass production. Toyota speaks of twenty twenty-seven to twenty twenty-eight. Both mean small numbers, for expensive models.' },
        { text: 'And this month, the company QuantumScape reported a fully solid cell that survived 1,000 charge cycles without a press, at normal air pressure.', say: 'And this month, the company QuantumScape reported a fully solid cell that survived one thousand charge cycles without a press, at normal air pressure.' },
        'That goes straight at problem two. But it was a small test cell, and by then it had lost about a fifth of its capacity.',
        { text: 'Most analysts expect solid-state cells in ordinary cars after 2030, not before.', say: 'Most analysts expect solid-state cells in ordinary cars after twenty thirty, not before.' },
      ],
    },
    {
      title: 'Meanwhile, the old battery keeps moving',
      svg: s12,
      quiz: {
        q: 'A startup reports record energy density. The test: a coin-sized cell at 60 °C, 100 cycles. What is the most reasonable reading?',
        options: [
          { text: 'A promising material result, but still far from a car battery', correct: true, why: 'Coin size, warm temperature and few cycles avoid three of the four hard problems. The result says something about the material, not about a product.' },
          { text: 'Cars with this battery will arrive within a year or two', why: 'From a coin cell to a car cell usually takes many years. Scaling up is where most candidates fail.' },
          { text: 'It must be fake, because solid-state batteries do not work', why: 'The result can be perfectly real. Small, warm cells do work well. The open question is full size, room temperature and low pressure.' },
        ],
        explain: 'A coin cell is to a car battery what a paper plane is to an airliner. Both fly, and the paper plane proves a real principle. But it does not tell you whether the big machine can be built, what it costs, or how long it lasts. In a tiny cell, there are few places for a crack or a pinhole. Warmth makes ions move more easily and softens the contact problem. And a hundred cycles is about a tenth of what a car needs. So the right reaction is neither excitement nor dismissal. It is to ask about size, temperature and pressure, cycles, and whether the cell is fully solid.',
      },
      lines: [
        'One more thing makes this race hard. The target is moving.',
        'Ordinary lithium-ion batteries get better and cheaper every year. Some manufacturers have announced charging for hundreds of kilometres in about five minutes.',
        { text: 'And in between sits a mixed form: semi-solid cells, a gel with a little liquid. They are already on the road in some Chinese cars.', de: [['semi-solid', 'halbfest']] },
        'So when you read “solid-state” in a headline, check which of the two is meant.',
      ],
    },
    {
      title: 'How to read the next headline',
      svg: s13,
      lines: [
        'You can now judge the next battery announcement yourself. Ask four questions.',
        'How big was the cell: the size of a coin, or the size of a real car cell?',
        'At what temperature, and under what pressure, did it run?',
        'How many cycles did it survive, and how fast was it charged?',
        'And is it fully solid, or semi-solid? If an announcement answers none of these, it is advertising.',
      ],
    },
    {
      title: 'The short version',
      svg: s14,
      lines: [
        'The short version: the solid-state battery is not one single invention that is still missing.',
        'It is four hard problems at once: needles, contact, materials and the factory. Each one is being solved step by step.',
        'The prize is real, because lithium metal stores so much more. That is why billions keep flowing into it.',
        'Expect it first in expensive cars, late in this decade. And until then, enjoy how good the ordinary battery has become.',
      ],
    },
  ],
  takeaways: [
    'A solid-state battery replaces the flammable liquid electrolyte with a solid that still lets lithium ions pass.',
    'The main prize is not safety but the anode: lithium metal stores about ten times as much per gram as graphite.',
    'Problem one: lithium needles (dendrites) grow through cracks and grain borders even in hard ceramic, mostly during fast charging.',
    'Problem two: solids touch only at their tips, and the cell breathes. Lab cells needed pressures that no car can carry.',
    'Problems three and four: every solid electrolyte has a catch (toxic gas, brittleness or heat), and the layer must be made thin and free of holes at factory scale.',
    'Check any headline with four questions: cell size, temperature and pressure, cycles and charging speed, fully solid or semi-solid.',
  ],
  sources: [
    'Mercedes-Benz and Factorial (2025): EQS test car, 1,205 km from Stuttgart to Malmö on one charge',
    'Porz et al. (2017) and later reviews: lithium penetration through ceramic electrolytes via flaws and grain boundaries',
    'Doux et al. (2020): Stack pressure considerations for room-temperature all-solid-state lithium metal batteries',
    'Bates et al. (2022), Joule: Are solid-state batteries safer than lithium-ion batteries? (Sandia National Laboratories)',
    'Blue Solutions (Bolloré): lithium metal polymer batteries in buses, operated at 60 to 80 °C',
    'QuantumScape (11 November 2026): Osprey all-solid-state cell, company data on a two-layer test cell',
    'Company targets as reported in late 2026: Samsung SDI (second half of 2027), Toyota (2027 to 2028)',
  ],
};
