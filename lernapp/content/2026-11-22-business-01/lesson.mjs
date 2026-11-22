import { L, arrow, rng } from '../../tools/kit.mjs';

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

// ---------- 1: For everyone means for no one ----------
const crowd = Array.from({ length: 84 }, (_, i) => `<circle cx="${38 + (i % 14) * 25}" cy="${96 + Math.floor(i / 14) * 25}" r="6" class="fm" style="opacity:.55"/>`).join('');
const s1 = `
<g ${L(0, 'up')}>
  <rect x="60" y="24" width="280" height="40" rx="20" class="fp"/>
  <text x="200" y="49" class="mid ts">“basically, anyone who needs it”</text>
</g>
<g ${L(1, 'up')}>${crowd}</g>
<g ${L(2, 'pop')}><circle cx="213" cy="146" r="8" class="fa pulse"/></g>
<text x="200" y="268" class="mid ts fc tb" ${L(2, 'up')}>one voice among thousands: not noticed</text>
${chips([['what it is', 24, 104], ['why small wins', 138, 124], ['the objection', 272, 104]], 300, 3)}`;

// ---------- 2: Positioning is not a slogan ----------
const bottle = (cx, c) => `<path d="M${cx - 8} 132 h16 v16 q14 8 14 24 v52 q0 8 -8 8 h-28 q-8 0 -8 -8 v-52 q0 -16 14 -24 z" class="fn s${c}"/><path d="M${cx - 22} 190 h44" class="fn s${c} s1"/>`;
const s2 = `
${chips([['for whom?', 24, 104], ['instead of what?', 138, 124], ['why better?', 272, 104]], 34, 1, 'fa tb')}
<g ${L(2, 'up')}>
  <rect x="24" y="96" width="166" height="170" rx="14" class="fp"/>
  ${bottle(107, 'm')}
  <text x="107" y="118" class="mid ts fm">for decades</text>
  <text x="107" y="256" class="mid ts">“aids recovery”</text>
</g>
<g ${L(3, 'up')}>
  <rect x="210" y="96" width="166" height="170" rx="14" class="fp sb"/>
  ${bottle(293, 'b')}
  <text x="293" y="118" class="mid ts fb tb">1983</text>
  <text x="293" y="256" class="mid ts">“replaces lost energy”</text>
</g>
<g ${L(3, 'up', { d: 1 })}>${arrow(194, 180, 206, 180, 'b', { size: 8 })}</g>
<text x="200" y="304" class="mid tl tb fb" ${L(4, 'up')}>sales ×3 in five years</text>
${box(326, 'same product, different frame', 4, { d: 2 }, 'tm')}`;

// ---------- 3: People always compare ----------
const s3 = `
<g ${L(1, 'up')}>
  <rect x="150" y="26" width="100" height="56" rx="10" class="fn sm dash"/>
  <text x="200" y="62" class="mid tl fm">?</text>
  <text x="200" y="104" class="mid ts fm">“ah, this is something like …”</text>
</g>
<g ${L(2, 'up')}>
  <rect x="24" y="124" width="166" height="150" rx="14" class="fp"/>
  <path d="M82 182 q25 -34 50 0 z" class="fn sb"/><path d="M86 182 l6 30 h30 l6 -30 z" class="fn sb"/>
  <text x="107" y="150" class="mid ts tb">muffin</text>
  <rect x="210" y="124" width="166" height="150" rx="14" class="fp"/>
  <path d="M262 212 L326 212 L326 176 Z" class="fn sa"/><path d="M262 212 L326 194" class="fn sa s1"/>
  <text x="293" y="150" class="mid ts tb">slice of cake</text>
</g>
<g ${L(3, 'up')}>
  <text x="107" y="240" class="mid ts fm">breakfast · coffee shop</text><text x="107" y="262" class="mid tm fb tb">3 euros</text>
  <text x="293" y="240" class="mid ts fm">dessert · restaurant</text><text x="293" y="262" class="mid tm fa tb">8 euros</text>
</g>
<text x="200" y="304" class="mid ts fm" ${L(2, 'up', { d: 2 })}>almost the same recipe</text>
${box(322, 'choose the box, or others choose it for you', 4)}`;

// ---------- 4: Five questions ----------
const q5 = (i, t, l, o = {}, c = 'a') => `<g ${L(l, 'up', o)}><rect x="24" y="${52 + i * 54}" width="352" height="44" rx="12" class="fp"/><circle cx="52" cy="${74 + i * 54}" r="13" class="fk s${c}"/><text x="52" y="${79 + i * 54}" class="mid ts f${c} tb">${i + 1}</text><text x="78" y="${79 + i * 54}" class="ts">${t}</text></g>`;
const s4 = `
<text x="200" y="34" class="mid ts fm" ${L(0, 'up')}>five questions, in this order</text>
${q5(0, 'What would they use if you did not exist?', 1)}
${q5(1, 'What do you have that it lacks?', 2)}
${q5(2, 'What does that do for the customer?', 2, { d: 3.5 })}
${q5(3, 'Who cares about that most?', 3, {}, 'b')}
${q5(4, 'Which category makes it obvious?', 4)}
<text x="200" y="346" class="mid ts fb tb" ${L(4, 'up', { d: 3.5 })}>the target group comes fourth, not first</text>`;

// ---------- 5: The reach math ----------
const s5 = `
<text x="200" y="38" class="mid tm" ${L(1, 'up')}>2,000 real contacts per year</text>
<g ${L(2, 'up')}>
  <rect x="24" y="70" width="166" height="170" rx="12" class="fp sm s1"/>
  <rect x="24" y="238" width="166" height="2" class="fc"/>
  <text x="107" y="150" class="mid tl tb">400,000</text><text x="107" y="174" class="mid ts fm">small firms</text>
  <text x="107" y="268" class="mid tm fc tb">0.5%</text>
  <text x="107" y="288" class="mid ts fm">heard once, forgotten</text>
</g>
<g ${L(3, 'up')}>
  <rect x="210" y="70" width="166" height="170" rx="12" class="fp sm s1"/>
  <path d="M210 155 H376 V228 Q376 240 364 240 H222 Q210 240 210 228 Z" class="fa" style="opacity:.35"/>
  <text x="293" y="118" class="mid tl tb">4,000</text><text x="293" y="142" class="mid ts fm">architecture offices</text>
  <text x="293" y="268" class="mid tm fa tb">50%</text>
  <text x="293" y="288" class="mid ts fm">heard three or four times</text>
</g>
<g ${L(4, 'up')}>
  <text x="107" y="330" class="mid tm fc tb">invisible</text>
  <text x="293" y="330" class="mid tm fa tb">well known</text>
  <text x="200" y="366" class="mid ts fm">same effort, different market</text>
</g>`;

// ---------- 6: Customers ask their peers ----------
const ring = Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * 2 * Math.PI - 1.57; return [107 + 62 * Math.cos(a), 170 + 62 * Math.sin(a)]; });
const links = ring.map(([x, y], i) => [1, 3].map((k) => { const [x2, y2] = ring[(i + k) % 10]; return `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="sm s1"/>`; }).join('')).join('');
const lone = Array.from({ length: 10 }, (_, i) => { const cx = 226 + (i % 4) * 44 + (Math.floor(i / 4) === 2 ? 22 : 0), cy = 118 + Math.floor(i / 4) * 52; return `<circle cx="${cx}" cy="${cy}" r="19" class="fn sm s1 dash"/><circle cx="${cx}" cy="${cy}" r="7" class="fb"/>`; }).join('');
const s6 = `
<g ${L(0, 'up')}>
  <text x="107" y="68" class="mid ts tb">one field</text>
  ${links}${ring.map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" class="fk sm"/>`).join('')}
</g>
<g ${L(1, 'pop')}>${ring.filter((_, i) => i % 3 === 0).map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" class="fa"/>`).join('')}</g>
<g ${L(1, 'pop', { d: 3 })}>${ring.filter((_, i) => i % 3 !== 0).map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" class="fa" style="opacity:.55"/>`).join('')}</g>
<text x="107" y="268" class="mid ts fa" ${L(1, 'up', { d: 3 })}>the word spreads</text>
<g ${L(3, 'up')}>
  <text x="292" y="68" class="mid ts tb">ten fields</text>
  ${lone}
  <text x="292" y="268" class="mid ts fb">ten lonely cases</text>
</g>
<text x="200" y="304" class="mid ts fm" ${L(2, 'up')}>the majority buys what its peers already use</text>
${box(322, '10 customers in one field = a reference base', 3, { d: 3 })}`;

// ---------- 7: Start small, then widen ----------
const grow = (c) => `<circle cx="36" cy="30" r="8" class="f${c}"/><circle cx="36" cy="30" r="17" class="fn s${c} s1"/><circle cx="36" cy="30" r="27" class="fn s${c} s1 dash"/>`;
const s7 = `
<text x="200" y="72" class="mid tx tb" ${L(0, 'pop', { out: 1 })}>Start small</text>
<g ${L(1, 'up')}>${row(20, 'Amazon', 'books only, then everything', grow('b'))}</g>
<g ${L(2, 'up')}>${row(112, 'Facebook', 'one university first', grow('a'))}</g>
<g ${L(3, 'up')}>${row(204, 'PayPal', 'a few thousand eBay sellers', grow('d'))}</g>
<text x="356" y="241" class="end ts fd tb" ${L(3, 'up', { d: 3.5 })}>25% in 3 months</text>
${box(308, 'a large share of a small market', 4, {}, 'tm')}
<text x="200" y="378" class="mid ts fm" ${L(4, 'up', { d: 3 })}>references, pricing power, calm</text>`;

// ---------- 8: The German version ----------
const s8 = `
<text x="200" y="38" class="mid tm" ${L(1, 'up')}>hidden champions</text>
${chips([['top 3 in the world', 30, 160], ['almost unknown', 210, 160]], 54, 1)}
<g ${L(2, 'up')}>
  <text x="107" y="140" class="mid tx tb fa">≈ 3,000</text><text x="107" y="162" class="mid ts fm">worldwide</text>
  <text x="293" y="140" class="mid tx tb fb">about half</text><text x="293" y="162" class="mid ts fm">are German</text>
</g>
<g ${L(3, 'up')}>
  <rect x="176" y="236" width="48" height="80" rx="8" class="fa"/>
  <text x="246" y="298" class="ts fa tb">product: narrow</text>
</g>
<g ${L(4, 'up')}>
  <rect x="40" y="190" width="320" height="40" rx="8" class="fb"/>
  <text x="200" y="216" class="mid ts tb" style="fill:var(--k-bg)">market: the whole world</text>
</g>
${box(338, 'narrow in what they do, wide in where they sell', 4, { d: 3 })}`;

// ---------- 9: The counter-argument ----------
const s9 = `
<text x="200" y="36" class="mid ts fm" ${L(0, 'up')}>buying data of many big brands</text>
<g ${L(1, 'up')}>
  <text x="40" y="84" class="ts">growth through more buyers</text>
  <rect x="40" y="94" width="300" height="18" rx="9" class="fa"/>
  <text x="40" y="142" class="ts">growth through more loyalty</text>
  <rect x="40" y="152" width="70" height="18" rx="9" class="fm"/>
</g>
<text x="200" y="206" class="mid ts fc tb" ${L(2, 'up')}>so narrowing cuts off future buyers?</text>
<text x="200" y="236" class="mid ts fm" ${L(3, 'up')}>measured: established brands, mature markets</text>
<g ${L(4, 'up')}>
  <rect x="24" y="264" width="150" height="56" rx="12" class="fp"/><text x="99" y="290" class="mid ts fb tb">1</text><text x="99" y="308" class="mid ts">win a segment</text>
  ${arrow(180, 292, 220, 292, 'i')}
  <rect x="226" y="264" width="150" height="56" rx="12" class="fp"/><text x="301" y="290" class="mid ts fa tb">2</text><text x="301" y="308" class="mid ts">widen step by step</text>
  <text x="200" y="356" class="mid ts fm">both views fit together as a sequence</text>
</g>`;

// ---------- 10: A spotlight, not a fence ----------
const s10 = `
<g ${L(1, 'up')}>
  <polygon points="200,34 120,190 280,190" class="fb" style="opacity:.28"/>
  <rect x="186" y="22" width="28" height="20" rx="6" class="fk sb"/>
  ${[150, 180, 210, 240].map((x) => `<circle cx="${x}" cy="176" r="8" class="fb"/>`).join('')}
  ${[60, 90, 310, 340].map((x) => `<circle cx="${x}" cy="176" r="8" class="fm"/>`).join('')}
  <text x="200" y="216" class="mid ts fb tb">a spotlight: where message and money go</text>
</g>
<g ${L(2, 'up')}>
  ${arrow(326, 162, 266, 136, 'a', { dash: true })}
  <text x="330" y="118" class="mid ts fa">may still buy</text>
</g>
<text x="200" y="250" class="mid ts fm" ${L(3, 'up')}>signs of a weak position</text>
${chips([['“what do you do?”', 24, 130], ['wrong rivals', 162, 100], ['price fights', 270, 106]], 266, 3)}
<text x="200" y="352" class="mid ts fm" ${L(0, 'up', { out: 1 })}>“if I focus, I lose the others”</text>`;

// ---------- 11: How to find your segment ----------
const cust = [[1, 1, 1, 1], [1, 0, 1, 0], [0, 0, 1, 0], [1, 1, 1, 1], [0, 1, 0, 0], [1, 1, 1, 1]];
const s11 = `
<g ${L(0, 'up')}>
  <text x="40" y="44" class="ts fm">customer</text>
  ${['fast', 'no haggling', 'stayed', 'referred'].map((t, i) => `<text x="${150 + i * 66}" y="44" class="mid ts fm">${t}</text>`).join('')}
  ${cust.map((r, i) => `<text x="40" y="${78 + i * 30}" class="ts">${String.fromCharCode(65 + i)}</text>`).join('')}
</g>
<g ${L(1, 'up')}>${cust.map((r, i) => r.map((v, j) => `<circle cx="${150 + j * 66}" cy="${73 + i * 30}" r="7" class="${v ? 'fd' : 'fn sm s1'}"/>`).join('')).join('')}</g>
<g ${L(1, 'fade', { d: 4 })}>${[0, 3, 5].map((i) => `<rect x="28" y="${58 + i * 30}" width="344" height="28" rx="8" class="fn sb"/>`).join('')}</g>
<text x="200" y="266" class="mid ts fb tb" ${L(2, 'up')}>what do A, D and F share? A situation</text>
${chips([['list by name?', 24, 104], ['talk to each other?', 136, 134], ['urgent?', 278, 98]], 290, 3)}
<text x="200" y="356" class="mid ts fm" ${L(3, 'up', { d: 4 })}>three tests for a segment</text>`;

// ---------- 12: The one-sentence test ----------
const s12 = `
<g ${L(1, 'up')}>
  <text x="34" y="52" class="ts">For <tspan class="fa tb">[customer]</tspan> with <tspan class="fa tb">[problem]</tspan>,</text>
  <text x="34" y="78" class="ts">our product is a <tspan class="fb tb">[category]</tspan></text>
  <text x="34" y="104" class="ts">that delivers <tspan class="fd tb">[benefit]</tspan>.</text>
  <text x="34" y="130" class="ts">Unlike <tspan class="fc tb">[alternative]</tspan>, it <tspan class="fe tb">[difference]</tspan>.</text>
</g>
<g ${L(2, 'up')}>
  <rect x="24" y="158" width="352" height="138" rx="14" class="fp"/>
  <text x="40" y="186" class="ts">For <tspan class="fa">small architecture offices</tspan></text>
  <text x="40" y="210" class="ts">that <tspan class="fa">lose hours on site reports</tspan>:</text>
  <text x="40" y="234" class="ts">a <tspan class="fb">reporting app</tspan>, <tspan class="fd">photos become reports</tspan>.</text>
  <text x="40" y="258" class="ts">Unlike <tspan class="fc">Word and Excel</tspan>,</text>
  <text x="40" y="282" class="ts"><tspan class="fe">it works on the building site</tspan>.</text>
</g>
${box(318, 'every blank you cannot fill is a gap', 3)}
<text x="200" y="26" class="mid ts fm" ${L(0, 'up')}>Geoffrey Moore’s template</text>`;

// ---------- 13: When to widen ----------
const pin = (x, y, c, t = '') => `<circle cx="${x}" cy="${y}" r="20" class="fk s${c}"/><text x="${x}" y="${y + 5}" class="mid ts f${c} tb">${t}</text>`;
const s13 = `
<g ${L(0, 'up')}>${pin(200, 250, 'a', '1')}<text x="200" y="298" class="mid ts fa">your niche, won</text></g>
<g ${L(1, 'up')}>
  ${pin(152, 180, 'm')}${pin(248, 180, 'm')}${pin(104, 110, 'm')}${pin(200, 110, 'm')}${pin(296, 110, 'm')}
</g>
<g ${L(2, 'up')}>
  ${pin(152, 180, 'b', '2')}${pin(248, 180, 'b', '2')}
  ${arrow(188, 232, 166, 200, 'b', { size: 8 })}${arrow(212, 232, 234, 200, 'b', { size: 8 })}
  <text x="200" y="54" class="mid ts fb tb">next: the neighbours</text>
  <text x="200" y="74" class="mid ts fm">they know your customers, similar problem</text>
</g>
<g ${L(3, 'up')}>
  <circle cx="356" cy="250" r="18" class="fn sc dash"/>
  <text x="330" y="298" class="mid ts fc">distant market:</text><text x="330" y="316" class="mid ts fc">start from zero</text>
</g>
${box(338, 'references and product must still count', 3, { d: 3 })}`;

// ---------- 14: The short version ----------
const s14 = `
<g ${L(0, 'up')}>${row(20, 'The frame', 'for whom, instead of what, why better', `<rect x="10" y="8" width="52" height="44" rx="6" class="fn sa"/><circle cx="36" cy="30" r="8" class="fa"/>`)}</g>
<g ${L(1, 'up')}>${row(112, 'Small enough to be known', 'start from the real alternative', `<circle cx="36" cy="30" r="22" class="fn sb"/><circle cx="36" cy="30" r="8" class="fb"/>`)}</g>
<g ${L(2, 'up')}>${row(204, 'Win it, then the neighbour', 'references carry you over', `<circle cx="22" cy="38" r="12" class="fn sd"/><circle cx="50" cy="22" r="12" class="fn sd dash"/>`)}</g>
<text x="200" y="330" class="mid tl tb fb" ${L(2, 'up', { d: 3 })}>“for everyone” comes last</text>`;

export default {
  id: '2026-11-22-business-01',
  date: '2026-11-22',
  area: 'business',
  series: 'Growing a company',
  episode: 1,
  title: 'Positioning: why the smaller market is the bigger lever',
  hook: 'A product for everyone is noticed by no one. What positioning really is, why narrow wins first, and the research that speaks against it.',
  level: 2,
  poster: 4,
  voice: 'male',
  scenes: [
    {
      title: 'For everyone means for no one',
      svg: s1,
      lines: [
        'Ask a founder who the product is for, and you often hear: basically, anyone who needs it.',
        'It feels safe. A bigger market means more possible customers, and so more chances.',
        'In practice, it is one of the most common reasons why a good product is not noticed at all.',
        { text: 'Today: what positioning really is, why the smaller market is usually the bigger lever, and what research says against that.', de: [['positioning', 'Positionierung'], ['lever', 'Hebel']] },
      ],
    },
    {
      title: 'Positioning is not a slogan',
      svg: s2,
      lines: [
        'Positioning is often confused with a slogan or a logo. It is neither.',
        { text: 'It is the frame you set around your product: who it is for, what it replaces, and why it is the better choice for exactly these people.', de: [['frame', 'Rahmen']] },
        'A famous case: the British drink Lucozade was sold for decades as a drink for sick people. The slogan was: Lucozade aids recovery.',
        { text: 'In 1983, the company changed nothing important about the liquid. It changed the frame: a drink that replaces lost energy, shown with a top athlete.', say: 'In nineteen eighty-three, the company changed nothing important about the liquid. It changed the frame: a drink that replaces lost energy, shown with a top athlete.' },
        'Sales roughly tripled within five years. Same product, different frame, different business.',
      ],
    },
    {
      title: 'People always compare',
      svg: s3,
      lines: [
        'Why does the frame matter so much? Because nobody judges a product on its own.',
        { text: 'Within seconds, people put a new thing into a box they already know. Ah, this is something like that.', de: [['category', 'Kategorie']] },
        'Take a chocolate muffin and a slice of chocolate cake. Almost the same recipe.',
        'The muffin is compared to breakfast and sold in a coffee shop, for three euros. The cake is compared to dessert and sold in a restaurant, for eight.',
        'If you do not choose the box, your customers choose it for you. And they usually pick one in which you look weak.',
      ],
    },
    {
      title: 'Five questions that build a position',
      svg: s4,
      quiz: {
        q: 'A maker of project software keeps losing deals. The customers do not choose a rival product. They stay with Excel. What follows for its positioning?',
        options: [
          { text: 'The real alternative is Excel, so the offer must be framed against Excel', correct: true, why: 'Positioning starts with what customers would otherwise use. If that is Excel, every argument has to answer one question: why is this better than my spreadsheet?' },
          { text: 'It needs more features, to clearly beat the other software makers', why: 'More features help against rival products. But the deals are not lost to rivals. Against a familiar spreadsheet, extra features can even look like extra effort.' },
          { text: 'It should cut its price, because Excel is already paid for', why: 'Price matters, but it comes after the frame. As long as customers see no clear advantage over Excel, even a low price is money for nothing.' },
          { text: 'These customers are too small, so it should aim at larger firms', why: 'Possible, but the lost deals alone do not show that. First find out why Excel wins. The cause may be the message, not the size of the customer.' },
        ],
        explain: 'Imagine you sell umbrellas, and people keep walking past your stand. You look at the other umbrella stands and decide that yours need a better handle. But the people walking past are not buying umbrellas elsewhere. They pull up their hoods. Your real competitor is the hood. As long as you argue against other umbrellas, you answer a question nobody asked. The first step in positioning is to find the hood: the thing customers actually use today. Only then can you say why your offer is worth the change. Features, price and target group all come after that.',
      },
      lines: [
        'The consultant April Dunford breaks positioning into five questions. The order matters.',
        { text: 'One: what would your customers use if you did not exist? Often the honest answer is not a competitor. It is Excel, an intern, or doing nothing.', de: [['alternative', 'Alternative']] },
        { text: 'Two: what do you have that these alternatives lack? Three: what does that do for the customer, in the customer’s own words?', de: [['benefit', 'Nutzen']] },
        { text: 'Four: who cares about that benefit much more than everyone else? That group is your target.', de: [['target group', 'Zielgruppe']] },
        'Five: which category makes all of this obvious at first glance? Notice that the target group comes fourth, not first.',
      ],
    },
    {
      title: 'The reach math',
      svg: s5,
      quiz: {
        q: 'Look only at the numbers: 2,000 contacts a year, and either 4,000 architecture offices or 400,000 small firms. What speaks for the architects?',
        options: [
          { text: 'Each office can be reached several times, so the firm becomes a known name', correct: true, why: 'Half the market, three or four times each: that is the difference between being a name people recognize and being one message among thousands.' },
          { text: 'A small market has fewer competitors, so it is the safer choice', why: 'Sometimes true, sometimes not. Niches can be crowded as well. And the contact numbers say nothing about competitors.' },
          { text: 'Architects will pay higher prices than the average small firm', why: 'Focus often does allow higher prices later. But that is a result of being the known specialist. The numbers themselves do not show it.' },
          { text: 'Two thousand contacts are enough to sell to half of all offices', why: 'Reaching an office is not the same as selling to it. Contact creates awareness. A sale also needs a problem, a budget and trust.' },
        ],
        explain: 'Think of handing out flyers. With two thousand flyers in a big city, you could give one to every two-hundredth person. Each of them sees you once and forgets you. In a village of four thousand people, the same pile reaches every second household, and many people see your flyer at the baker, at the bus stop and in the mailbox. Nobody has bought anything yet. But in the village, people start to say: I have heard of them. That recognition is what the numbers buy you. Prices, competitors and actual sales are separate questions that the contact numbers cannot answer.',
      },
      lines: [
        'Now to the size of the market. Here is a calculation that most founders never do.',
        'Suppose your time and your budget allow two thousand real customer contacts per year.',
        { text: 'In a market of four hundred thousand small firms, that is half a percent. Each firm hears from you once at best, and forgets it.', de: [['reach', 'Reichweite']] },
        'In a market of four thousand architecture offices, it is every second office. Many of them hear from you three or four times.',
        'The same effort makes you invisible in one market, and well known in the other.',
      ],
    },
    {
      title: 'Customers ask their peers',
      svg: s6,
      lines: [
        { text: 'The second reason is even stronger. Buyers do not decide alone. They ask people like themselves.', de: [['reference', 'Referenz']] },
        'A dentist asks other dentists. A site manager asks other site managers. A recommendation from a different industry counts for little.',
        'The author Geoffrey Moore described this for technology products. The first buyers love new things. The large majority buys only what its peers already use.',
        'So ten customers in one field are a reference base. Ten customers in ten fields are ten lonely cases.',
      ],
    },
    {
      title: 'Start small, then widen',
      svg: s7,
      lines: [
        'The investor Peter Thiel made a rule out of this: start with a small market that you can dominate.',
        'Amazon started with books only. Not because books were the goal, but because they were easy to list and to ship.',
        'Facebook started with the students of one single university, and won most of them before moving on.',
        { text: 'PayPal focused on a few thousand professional sellers on eBay. Within three months, a quarter of them used it.', de: [['market share', 'Marktanteil']] },
        'A large share of a small market beats a tiny share of a huge one. It brings references, pricing power, and the calm to improve the product.',
      ],
    },
    {
      title: 'The German version',
      svg: s8,
      lines: [
        'This is not only a story about American start-ups. Germany has its own version.',
        { text: 'The economist Hermann Simon calls them hidden champions: firms that are among the top three in the world in their market, and almost unknown to the public.', de: [['market leader', 'Marktführer']] },
        'He counts around three thousand of them worldwide. Roughly half are German.',
        'Their pattern is always the same: a very narrow product focus, combined with selling all over the world.',
        { text: 'Narrow in what they do, wide in where they sell. That is how a niche becomes large enough.', de: [['niche', 'Nische']] },
      ],
    },
    {
      title: 'The counter-argument',
      svg: s9,
      quiz: {
        q: 'Studies of big brands show: they grow by reaching all buyers, not by narrowing down. A firm with twelve employees reads this. What is the best conclusion?',
        options: [
          { text: 'Win a narrow segment first, and widen when broad reach becomes affordable', correct: true, why: 'The research says where growth comes from in the long run. The reach math says what a small firm can afford today. Together they give an order of steps.' },
          { text: 'Niche thinking is refuted, so it should address the whole market now', why: 'The finding describes brands that can afford to reach everyone. With twelve people, addressing everyone means reaching almost no one often enough.' },
          { text: 'The studies cover consumer goods, so they say nothing about small firms', why: 'Too convenient. The core finding, that growth needs new buyers, holds widely. What changes for a small firm is the order of the steps.' },
          { text: 'It should stay in its niche for good, since broad growth needs big budgets', why: 'Half right: broad reach is expensive. But the research also shows where long-term growth comes from. Staying narrow forever puts a ceiling on the firm.' },
        ],
        explain: 'Two pieces of advice can both be true if they describe different stages. Picture a campfire. To get it burning, you put small, dry twigs close together in one spot. A thick log on its own will not catch. Later, when the fire is strong, you add the big logs, and spreading out is exactly right. Research on big brands describes the big fire: it grows by reaching more and more wood. Advice about niches describes the first minutes: concentrate the little heat you have. The mistake is not choosing one of the two. The mistake is using the rule for the wrong stage.',
      },
      lines: [
        'Now the other side, and it comes with data. The marketing researcher Byron Sharp studied the buying data of many big brands.',
        { text: 'His result: brands grow mainly by winning more buyers, including many who buy only rarely. Not by making a small group more loyal.', de: [['loyalty', 'Kundentreue']] },
        'Seen this way, narrow targeting is a mistake. You cut yourself off from most of your future buyers.',
        'So who is right? Look at what was measured: established brands in mature markets, with budgets that reach everybody.',
        'A small firm cannot reach everybody. So the two views fit together as a sequence: first win a segment, then widen step by step.',
      ],
    },
    {
      title: 'A spotlight, not a fence',
      svg: s10,
      lines: [
        'This also answers the biggest fear: if I focus, I lose all the other customers.',
        'Positioning is a spotlight, not a fence. It decides where your message and your money go. It does not forbid anyone to buy.',
        'A tool for architects will still be bought by an engineer who finds it. You just did not pay to find him.',
        'The warning signs of a weak position are easy to spot. People ask what exactly you do. They compare you with the wrong rivals. And they argue about the price.',
      ],
    },
    {
      title: 'How to find your segment',
      svg: s11,
      lines: [
        'How do you find your segment? Not by brainstorming. Look at the customers you already have.',
        'Who bought quickly, paid without haggling, stayed, and recommended you? Put those names on one list.',
        { text: 'Then ask what they share. Usually it is not age or company size. It is a situation: a certain problem at a certain moment.', de: [['segment', 'Marktsegment']] },
        'Then test the group with three questions. Can you list its members by name? Do they talk to each other? And is the problem urgent enough to have a budget?',
      ],
    },
    {
      title: 'The one-sentence test',
      svg: s12,
      lines: [
        'Finally, write it down in one sentence. Geoffrey Moore’s template still works.',
        'For a certain customer with a certain problem, our product is a certain category that delivers a certain benefit. Unlike the main alternative, it does one thing differently.',
        'An example. For small architecture offices that lose hours on site reports: a reporting app that turns photos into finished reports. Unlike Word and Excel, it works on the building site.',
        'If you cannot fill in every blank, the gap shows you exactly where your positioning is still open.',
      ],
    },
    {
      title: 'When to widen',
      svg: s13,
      quiz: {
        q: 'A firm leads its niche: software for small architecture offices. Growth there slows down. Which next step fits the bowling-pin logic best?',
        options: [
          { text: 'Small engineering offices that work with these architects on the same projects', correct: true, why: 'They know the current customers, so the references count. And their problem is similar, so the product still fits. That is the pin next door.' },
          { text: 'All small service firms, to use the strong brand in a much larger market', why: 'The brand is strong among architects only. In the broad market nobody has heard of it, and its references mean little there.' },
          { text: 'Hospitals, because they have the largest budgets for software', why: 'The budget is attractive, but nothing carries over: not the references, not the product, not the contacts. That is a restart, not a next pin.' },
          { text: 'The same offices, with a second product for an unrelated problem', why: 'The customers stay, which is worth a lot. But an unrelated product has to be built and proven from zero. Only one of the two assets carries over.' },
        ],
        explain: 'Think of a climber on a wall. A safe move keeps three points on the rock and moves only one hand or one foot. A firm that leaves its niche has two holds: customers who trust it, and a product that works. A move to a neighbouring group keeps both: the new customers have heard of you from the old ones, and the product needs only small changes. A new product for old customers lets go of one hold. A distant market with a big budget lets go of both at once. The question to ask about every next step is: what do I get to keep?',
      },
      lines: [
        'And when do you leave the niche? When you lead it, and growth there slows down.',
        'Moore compares it to bowling. The first pin, when it falls, knocks over the ones standing next to it.',
        'So the next segment should stand next to the first one: people who know your current customers, and who have a similar problem.',
        'That way, your references and your product still count. A jump into a distant market means starting from zero again.',
      ],
    },
    {
      title: 'The short version',
      svg: s14,
      lines: [
        'The short version. Positioning is the frame: for whom, instead of what, and why better.',
        'Start with the real alternative, not with yourself. Choose a segment small enough that you can become known in it.',
        'Win it, collect references, then move to the neighbour. “For everyone” comes last, not first.',
      ],
    },
  ],
  takeaways: [
    'Positioning is not a slogan. It is the frame around a product: for whom, instead of what, and why better.',
    'People always compare. If you do not choose the comparison, your customers choose one, and usually an unfavourable one.',
    'Start with the real alternative (often Excel or doing nothing), then your difference, its benefit, the group that cares most, and the category.',
    'A small market multiplies limited effort: you reach each customer several times, and customers in one field recommend you to each other.',
    'Research on big brands shows that long-term growth needs many new buyers. For a small firm this means a sequence: win a segment first, then widen.',
    'Widen to the neighbouring segment, where your references and your product still count.',
  ],
  sources: [
    'April Dunford: Obviously Awesome (2019), the five components of positioning',
    'Geoffrey Moore: Crossing the Chasm (1991), reference customers, the positioning template and the bowling-pin strategy',
    'Peter Thiel: Zero to One (2014), start small and monopolize; the Amazon, Facebook and PayPal examples',
    'Hermann Simon: Hidden Champions, counts of roughly 3,000 firms worldwide, about half of them German',
    'Byron Sharp: How Brands Grow (2010), Ehrenberg-Bass Institute; the double jeopardy law',
    'Lucozade repositioning (1983): IPA case history; sales roughly tripled between 1984 and 1989',
  ],
};
