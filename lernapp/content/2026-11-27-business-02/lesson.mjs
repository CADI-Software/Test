import { L, arrow } from '../../tools/kit.mjs';

const box = (y, text, l, o = {}, cls = 'ts') => `
<g ${L(l, 'up', o)}>
  <rect x="24" y="${y}" width="352" height="42" rx="12" class="fp"/>
  <text x="200" y="${y + 27}" class="mid ${cls}">${text}</text>
</g>`;
const chips = (items, y, l, c = '') => items.map(([t, x, w], i) => `<g ${L(l, 'pop', { d: 0.6 + i * 1.2 })}><rect x="${x}" y="${y}" width="${w}" height="34" rx="10" class="fp"/><text x="${x + w / 2}" y="${y + 22}" class="mid ts ${c}">${t}</text></g>`).join('');
const row = (y, title, sub, l, c = 'b', n = '') => `
<g ${L(l, 'up')}>
  <rect x="24" y="${y}" width="352" height="66" rx="14" class="fp"/>
  ${n ? `<text x="52" y="${y + 44}" class="mid tx tb f${c}">${n}</text>` : ''}
  <text x="${n ? 84 : 44}" y="${y + 28}" class="tm tb f${n ? 'i' : c}">${title}</text>
  <text x="${n ? 84 : 44}" y="${y + 50}" class="ts fm">${sub}</text>
</g>`;
const card = (x, y, l, title, sub, c, o = {}) => `
<g ${L(l, 'up', o)}>
  <rect x="${x}" y="${y}" width="170" height="92" rx="14" class="fp"/>
  <text x="${x + 85}" y="${y + 38}" class="mid tm tb f${c}">${title}</text>
  <text x="${x + 85}" y="${y + 64}" class="mid ts fm">${sub}</text>
</g>`;

// ---------- 1: Ten minutes for the price ----------
const s1 = `
<g ${L(0, 'up')}><text x="24" y="58" class="ts">the product: months</text><rect x="24" y="66" width="330" height="14" rx="4" class="fa"/></g>
<g ${L(0, 'up', { d: 2 })}><text x="24" y="110" class="ts">the logo: weeks</text><rect x="24" y="118" width="96" height="14" rx="4" class="fa"/></g>
<g ${L(0, 'up', { d: 4.5 })}><text x="24" y="162" class="ts fc tb">the price: ten minutes</text><rect x="24" y="170" width="6" height="14" rx="2" class="fc"/></g>
${chips([['cost plus a bit', 24, 150], ['the rival, minus a bit', 190, 186]], 214, 1)}
<text x="200" y="296" class="mid tl tb fc" ${L(2, 'up')}>almost always too low</text>
${box(326, 'today: how to find a better number', 3)}`;

// ---------- 2: Four levers ----------
const lever = (y, t, v, c) => `<text x="24" y="${y}" class="ts">${t}</text><rect x="136" y="${y - 12}" width="${v * 19}" height="14" rx="4" class="f${c}"/><text x="${144 + v * 19}" y="${y}" class="ts tb f${c}">+${v}%</text>`;
const s2 = `
<g ${L(0, 'up')}>
  <text x="24" y="40" class="ts fm">a small company, per 100 of revenue</text>
  <rect x="24" y="50" width="211" height="28" rx="6" class="fm"/><rect x="237" y="50" width="104" height="28" rx="6" class="fe"/><rect x="343" y="50" width="33" height="28" rx="6" class="fd"/>
  <text x="129" y="69" class="mid ts fk tb">variable costs 60</text><text x="289" y="69" class="mid ts fk tb">fixed 30</text>
  <text x="376" y="98" class="end ts fd tb">profit 10</text>
</g>
<g ${L(1, 'up')}>
  <text x="24" y="138" class="ts fm">improve one thing by 1%: the profit grows by</text>
  ${lever(168, 'price', 10, 'b')}
</g>
<g ${L(2, 'up')}>${lever(198, 'volume', 4, 'a')}</g>
<g ${L(2, 'up', { d: 5 })}>${lever(228, 'variable costs', 6, 'm')}${lever(258, 'fixed costs', 3, 'm')}</g>
${box(284, 'study of 2,400 firms: price +11%, volume +3%', 3)}
<text x="200" y="358" class="mid ts fb tb" ${L(4, 'up')}>a higher price costs nothing to deliver</text>`;

// ---------- 3: The same lever, backwards ----------
const s3 = `
<g ${L(0, 'up')}>
  <text x="24" y="62" class="ts fm">before: revenue 100</text>
  <rect x="24" y="72" width="288" height="28" rx="6" class="fm"/><text x="168" y="91" class="mid ts fk tb">costs 90</text>
  <rect x="314" y="72" width="32" height="28" rx="6" class="fd"/><text x="354" y="91" class="ts fd tb">10</text>
</g>
<g ${L(1, 'up')}>
  <text x="24" y="138" class="ts fm">price 10% lower: revenue 90</text>
  <rect x="24" y="148" width="288" height="28" rx="6" class="fm"/><text x="168" y="167" class="mid ts fk tb">costs 90</text>
  <rect x="314" y="148" width="32" height="28" rx="6" class="fn sc dash"/><text x="354" y="167" class="ts fc tb">0</text>
</g>
<g ${L(2, 'up')}>
  <text x="200" y="232" class="mid tl tb fc">−10% price = −100% profit</text>
  <text x="200" y="258" class="mid ts fm">a discount is paid out of the margin</text>
</g>
${box(300, 'a price 10% too low is not a 10% problem', 3)}`;

// ---------- 4: The discount trap ----------
const s4 = `
<text x="200" y="38" class="mid ts fm" ${L(0, 'up')}>a lower price brings more customers. How many?</text>
<g ${L(1, 'up')}>
  <text x="200" y="68" class="mid ts">price 100, cost 60: you keep 40</text>
  <rect x="24" y="86" width="170" height="150" rx="14" class="fp sc"/>
  <text x="109" y="114" class="mid tm tb fc">price −10%</text><text x="109" y="138" class="mid ts">you keep 30</text>
</g>
<g ${L(2, 'up')}>
  <text x="109" y="188" class="mid tx tb fc">+33%</text><text x="109" y="214" class="mid ts fm">sales needed</text>
</g>
<g ${L(3, 'up')}>
  <rect x="206" y="86" width="170" height="150" rx="14" class="fp sd"/>
  <text x="291" y="114" class="mid tm tb fd">price +10%</text><text x="291" y="138" class="mid ts">you keep 50</text>
  <text x="291" y="188" class="mid tx tb fd">−20%</text><text x="291" y="214" class="mid ts fm">sales you can lose</text>
</g>
<g ${L(4, 'up')}>
  <text x="200" y="282" class="mid tm tb">fewer customers, same profit</text>
  <text x="200" y="308" class="mid ts fm">and less work</text>
</g>`;

// ---------- 5: Three ways to set a price ----------
const s5 = `
<text x="200" y="34" class="mid ts fm" ${L(0, 'up')}>three ways to set a price</text>
${row(46, 'cost-plus', 'looks inward: my costs, plus a share', 1, 'm')}
${row(122, 'like the competition', 'looks sideways: a little below the others', 2, 'm')}
${row(198, 'value-based', 'looks at the customer: what is it worth?', 3, 'b')}
<text x="200" y="312" class="mid tm tb fb" ${L(4, 'up')}>the money is in the third</text>
<text x="200" y="338" class="mid ts fm" ${L(4, 'up', { d: 2 })}>most small companies use the first two</text>`;

// ---------- 6: Costs are the floor ----------
const s6 = `
<text x="200" y="34" class="mid ts fm" ${L(0, 'up')}>the customer does not see your costs</text>
${chips([['2 minutes: helped more', 24, 170], ['40 minutes: paid more', 206, 170]], 46, 1)}
<g ${L(2, 'up')}>
  <path d="M50 322 H350" class="fn sc s3"/><text x="200" y="344" class="mid ts fc tb">the floor: your costs</text>
</g>
<g ${L(3, 'up')}>
  <path d="M50 118 H350" class="fn sd s3"/><text x="200" y="108" class="mid ts fd tb">the ceiling: what it is worth to the customer</text>
  <rect x="50" y="122" width="300" height="196" class="fd" style="opacity:.09"/>
  <text x="200" y="208" class="mid tm">a lot of room</text>
</g>
<g ${L(4, 'up')}>
  <path d="M50 296 H350" class="fn sb dash"/><text x="200" y="286" class="mid ts fb tb">cost-plus lands here, every time</text>
</g>`;

// ---------- 7: The ceiling ----------
const s7 = `
<text x="200" y="38" class="mid ts fm" ${L(0, 'up')}>what would they do without you?</text>
${chips([['do nothing', 24, 104], ['do it themselves', 136, 128], ['buy elsewhere', 272, 104]], 54, 1)}
<g ${L(2, 'up')}>
  <text x="24" y="134" class="ts">the value you create: 1,000 a month</text>
  <rect x="24" y="144" width="352" height="26" rx="6" class="fd"/>
</g>
<g ${L(3, 'up')}>
  <rect x="24" y="206" width="110" height="26" rx="6" class="fb"/><rect x="136" y="206" width="240" height="26" rx="6" class="fd" style="opacity:.45"/>
  <text x="79" y="254" class="mid ts fb tb">your price</text><text x="256" y="254" class="mid ts fd">what the customer keeps</text>
</g>
${box(292, 'the customer gets back several times the price', 4)}`;

// ---------- 8: Why founders aim low ----------
const s8 = `
<text x="200" y="38" class="mid ts fm" ${L(0, 'up')}>why founders aim low</text>
${card(24, 54, 1, 'your own wallet', 'you are not the buyer', 'a')}
${card(206, 54, 2, 'the loud ones', '3 complain, 30 just pay', 'b')}
${card(24, 160, 3, 'fear', 'losing hurts right now', 'c')}
${card(206, 160, 4, 'the safe start', 'cheap feels less risky', 'e')}
<text x="200" y="296" class="mid ts" ${L(4, 'up', { d: 5 })}>hard to climb out of</text>
<text x="200" y="320" class="mid ts fm" ${L(4, 'up', { d: 7 })}>and it attracts the buyers who leave first</text>`;

// ---------- 9: Price is a message ----------
const bottle = (x, tag, c) => `<rect x="${x - 6}" y="56" width="12" height="26" rx="3" class="fm"/><rect x="${x - 17}" y="80" width="34" height="74" rx="7" class="fm"/><rect x="${x - 26}" y="100" width="52" height="28" rx="6" class="fk s${c}"/><text x="${x}" y="120" class="mid ts tb f${c}">${tag}</text>`;
const s9 = `
<text x="200" y="36" class="mid ts fm" ${L(0, 'up')}>when quality is hard to judge, people read the price</text>
<g ${L(1, 'up')}>
  ${bottle(100, '$10', 'm')}${bottle(300, '$90', 'b')}
  <text x="200" y="112" class="mid ts fm">the same wine</text>
  <text x="100" y="180" class="mid ts fm">liked it</text><rect x="60" y="188" width="50" height="12" rx="4" class="fm"/>
  <text x="300" y="180" class="mid ts fb tb">liked it more</text><rect x="240" y="188" width="120" height="12" rx="4" class="fb"/>
</g>
<text x="200" y="234" class="mid ts fa" ${L(2, 'up')}>pleasure areas in the brain: more active</text>
${box(256, 'energy drink at full price: more puzzles solved', 3)}
<text x="200" y="338" class="mid ts fc tb" ${L(4, 'up')}>too cheap can look worse, and work worse</text>`;

// ---------- 10: Who says no? ----------
const people = (y, no) => Array.from({ length: 10 }, (_, i) => `<circle cx="${47 + i * 34}" cy="${y}" r="12" class="${i >= 10 - no ? 'fc' : 'fd'}"/>`).join('');
const s10 = `
<text x="200" y="38" class="mid tm tb" ${L(0, 'up')}>who says no?</text>
<g ${L(1, 'up')}>
  ${people(78, 0)}
  <text x="200" y="118" class="mid ts">everyone says yes at once</text><text x="200" y="142" class="mid tm tb fc">too cheap</text>
</g>
<g ${L(2, 'up')}>
  ${people(190, 2)}
  <text x="200" y="230" class="mid ts">about one in five pushes back</text><text x="200" y="254" class="mid tm tb fd">about right</text>
</g>
<text x="200" y="292" class="mid ts fm" ${L(3, 'up')}>close to the real limit, not far below it</text>
${box(314, 'winning every deal is a sign of a low price', 4)}`;

// ---------- 11: Asking the right way ----------
const tick = (x, a, b, up, c) => `<path d="M${x} 196 V212" class="fn s${c} s3"/><text x="${x}" y="${up ? 168 : 238}" class="mid ts f${c}">${a}</text><text x="${x}" y="${up ? 184 : 254}" class="mid ts f${c}">${b}</text>`;
const s11 = `
<g ${L(0, 'up')}>
  <text x="200" y="58" class="mid tm">“what would you pay?”</text>
  <path d="M100 52 H300" class="fn sc"/>
  <text x="200" y="84" class="mid ts fc">people answer low</text>
  <path d="M30 204 H370" class="fn sm"/><text x="370" y="226" class="end ts fm">price</text>
</g>
<g ${L(1, 'up')}>${tick(70, 'too cheap', 'to trust', true, 'c')}</g>
<g ${L(1, 'up', { d: 6 })}>${tick(140, 'a', 'bargain', false, 'd')}</g>
<g ${L(2, 'up')}>${tick(250, 'getting', 'expensive', true, 'b')}</g>
<g ${L(2, 'up', { d: 5 })}>${tick(316, 'too', 'expensive', false, 'c')}</g>
<g ${L(3, 'up')}>
  <rect x="140" y="197" width="110" height="14" rx="4" class="fd" style="opacity:.55"/>
  <text x="200" y="326" class="mid tm tb fd">the range that works</text>
  <text x="200" y="350" class="mid ts fm">from 20 or 30 people in your target group</text>
</g>
<g ${L(4, 'up')}>
  ${arrow(100, 264, 100, 220, 'c', { size: 7 })}<text x="100" y="282" class="mid ts fc tb">many prices today</text>
</g>`;

// ---------- 12: Three options ----------
const opt = (x, y, h, name, price, cls, c) => `<rect x="${x}" y="${y}" width="104" height="${h}" rx="14" class="fp ${cls}"/><text x="${x + 52}" y="${y + 30}" class="mid ts fm">${name}</text><text x="${x + 52}" y="${y + 64}" class="mid tl tb f${c}">${price}</text>`;
const s12 = `
<text x="200" y="36" class="mid ts fm" ${L(0, 'up')}>how you show a price changes how it is judged</text>
<g ${L(0, 'up', { d: 3, out: 1 })}>
  <rect x="130" y="76" width="140" height="130" rx="14" class="fp"/><text x="200" y="130" class="mid tx tb">99</text><text x="200" y="170" class="mid ts fm">yes or no?</text>
</g>
<g ${L(1, 'up')}>
  ${opt(24, 96, 130, 'basic', '49', '', 'i')}${opt(148, 72, 154, 'standard', '99', 'sb', 'b')}${opt(272, 96, 130, 'premium', '249', '', 'i')}
  <text x="200" y="256" class="mid ts">which one?</text>
</g>
<g ${L(2, 'up')}>
  ${arrow(272, 190, 256, 190, 'b', { size: 7 })}
  <text x="200" y="288" class="mid ts fb tb">next to 249, the 99 looks reasonable</text>
</g>
<text x="200" y="318" class="mid ts" ${L(3, 'up')}>most pick the middle: build it on purpose</text>
<text x="200" y="346" class="mid ts fm" ${L(4, 'up')}>some pick the top: you would never have known</text>`;

// ---------- 13: The decoy ----------
const offer = (y, name, price) => `<rect x="24" y="${y}" width="238" height="42" rx="12" class="fp"/><text x="40" y="${y + 27}" class="ts">${name}</text><text x="248" y="${y + 27}" class="end ts tb">${price}</text>`;
const s13 = `
<g ${L(0, 'up')}>${offer(58, 'web only', '$59')}${offer(108, 'print only', '$125')}${offer(158, 'print + web', '$125')}</g>
<g ${L(1, 'up')}>
  <text x="300" y="44" class="mid ts fm">3 offers</text>
  <text x="300" y="86" class="mid tm tb">16</text><text x="300" y="136" class="mid tm tb fm">0</text><text x="300" y="186" class="mid tm tb fd">84</text>
</g>
<g ${L(2, 'up')}>
  <text x="354" y="44" class="mid ts fm">2 offers</text>
  <text x="354" y="86" class="mid tm tb fc">68</text><text x="354" y="136" class="mid tm fm">–</text><text x="354" y="186" class="mid tm tb">32</text>
  <path d="M30 129 H256" class="fn sc"/>
</g>
<g ${L(3, 'up')}>
  <text x="200" y="244" class="mid tm tb fb">nobody chose it. It changed the result</text>
  <text x="200" y="270" class="mid ts fm">next to it, the bundle looked like a gift</text>
</g>
${box(298, 'a small test: expect less in real life', 4)}`;

// ---------- 14: What you charge for ----------
const calc = (y, a, b, v, c) => `<rect x="24" y="${y}" width="352" height="56" rx="14" class="fp"/><text x="40" y="${y + 24}" class="ts fm">${a}</text><text x="40" y="${y + 44}" class="ts">${b}</text><text x="360" y="${y + 38}" class="end tl tb f${c}">${v}</text>`;
const s14 = `
<text x="200" y="36" class="mid ts fm" ${L(0, 'up')}>the hour, the piece, the month, or the result?</text>
<g ${L(1, 'up')}>${calc(52, 'year 1, by the hour', '20 hours × 60', '1,200', 'i')}</g>
<g ${L(2, 'up')}>${calc(118, 'year 3, twice as good', '10 hours × 60', '600', 'c')}</g>
<g ${L(3, 'up')}>${calc(184, 'fixed price for the logo', 'done in half the time', '1,200', 'd')}</g>
<g ${L(4, 'up')}>
  <text x="200" y="290" class="mid ts fm">hourly rates sell your time</text>
  <text x="200" y="320" class="mid tm tb fb">put the price on the result</text>
</g>`;

// ---------- 15: Raising prices ----------
const s15 = `
<text x="200" y="34" class="mid ts fm" ${L(0, 'up')}>already too cheap? Less dramatic than it feels</text>
${row(46, 'new customers first', 'they never saw the old price', 1, 'b', '1')}
${row(120, 'tell the others early', 'with the reason: what they get', 2, 'b', '2')}
${row(194, 'know your limit', '+10% price: you can lose one in five', 3, 'b', '3')}
<g ${L(4, 'up')}>
  <text x="200" y="296" class="mid ts">far fewer leave than founders fear</text>
  <text x="200" y="320" class="mid ts fm">experience, not a law: test on a small group</text>
</g>`;

// ---------- 16: When cheap is right ----------
const s16 = `
<text x="200" y="36" class="mid ts fm" ${L(0, 'up')}>to be fair: cheap can be right</text>
<g ${L(1, 'up')}>
  <rect x="24" y="52" width="170" height="112" rx="14" class="fp sd"/>
  <text x="109" y="84" class="mid ts tb fd">cheap as a strategy</text>
  <text x="109" y="112" class="mid ts">the whole company is</text><text x="109" y="130" class="mid ts">built for low costs</text>
</g>
<g ${L(2, 'up')}>
  <rect x="206" y="52" width="170" height="112" rx="14" class="fp sc"/>
  <text x="291" y="84" class="mid ts tb fc">cheap out of fear</text>
  <text x="291" y="112" class="mid ts">no cost advantage:</text><text x="291" y="130" class="mid ts">just a smaller margin</text>
</g>
<g ${L(3, 'up')}>
  <rect x="24" y="206" width="104" height="52" rx="12" class="fp"/><text x="76" y="228" class="mid ts">a clear</text><text x="76" y="246" class="mid ts">position</text>
  ${arrow(132, 232, 146, 232, 'm', { size: 6 })}
  <rect x="150" y="206" width="100" height="52" rx="12" class="fp"/><text x="200" y="228" class="mid ts">fewer</text><text x="200" y="246" class="mid ts">comparisons</text>
  ${arrow(254, 232, 268, 232, 'm', { size: 6 })}
  <rect x="272" y="206" width="104" height="52" rx="12" class="fp sb"/><text x="324" y="228" class="mid ts fb tb">pricing</text><text x="324" y="246" class="mid ts fb tb">power</text>
  <text x="200" y="300" class="mid ts fm">a specialist is hard to compare</text>
</g>`;

// ---------- 17: A plan for one week ----------
const todo = (y, n, t, l) => `<g ${L(l, 'up')}><rect x="24" y="${y}" width="352" height="50" rx="12" class="fp"/><text x="50" y="${y + 33}" class="mid tl tb fb">${n}</text><text x="78" y="${y + 31}" class="ts">${t}</text></g>`;
const s17 = `
<text x="200" y="34" class="mid ts fm" ${L(0, 'up')}>a plan for one week</text>
${todo(46, '1', 'your margin, and how many you could lose', 1)}
${todo(104, '2', 'ask 10 customers the four questions', 2)}
${todo(162, '3', 'three options, the middle one on purpose', 3)}
${todo(220, '4', 'higher price for the next 5 new customers', 4)}
<text x="200" y="318" class="mid tm tb fd" ${L(5, 'up')}>nobody says no? You have your answer</text>`;

// ---------- 18: The short version ----------
const s18 = `
${box(40, 'price: the strongest lever on profit', 0)}
${box(96, 'costs are the floor, value is the ceiling', 1)}
${box(152, 'nobody ever says no: the price is too low', 2)}
${box(208, 'three options, and a price on the result', 3)}
<g ${L(4, 'up')}>
  <text x="200" y="298" class="mid ts fm">tomorrow: ADHD</text>
  <text x="200" y="326" class="mid tm tb">love and relationships</text>
</g>`;

export default {
  id: '2026-11-27-business-02',
  date: '2026-11-27',
  area: 'business',
  series: 'Growing a company',
  episode: 2,
  title: 'Pricing: why most small companies charge too little',
  hook: 'Founders spend months on the product and ten minutes on the price. One percent more price beats one percent more sales by far. How to find the number you can really ask.',
  level: 2,
  poster: 5,
  voice: 'female',
  scenes: [
    {
      title: 'Ten minutes for the price',
      svg: s1,
      lines: [
        'A founder spends months on the product, and weeks on the logo. And the price? Often about ten minutes.',
        'Usually it is the cost plus a bit. Or what the competitor charges, minus a bit.',
        'Both methods have one thing in common: they almost always land too low. And this mistake costs more than nearly any other.',
        'Today: why the price is the strongest lever you have, why founders aim low, and how to find a better number.',
      ],
    },
    {
      title: 'Four levers',
      svg: s2,
      lines: [
        { text: 'Take a small company. For every 100 euros of revenue, it has 60 euros of variable costs and 30 of fixed costs. 10 euros are left as profit.', say: 'Take a small company. For every hundred euros of revenue, it has sixty euros of variable costs and thirty of fixed costs. Ten euros are left as profit.', de: [['revenue', 'Umsatz'], ['profit', 'Gewinn']] },
        { text: 'Now improve one thing by 1%. Raise the price by 1%, and the profit grows from 10 to 11. That is 10% more profit.', say: 'Now improve one thing by one percent. Raise the price by one percent, and the profit grows from ten to eleven. That is ten percent more profit.' },
        'Sell one percent more instead, and the profit grows by only four percent, because every extra sale brings its own costs with it. Cutting costs lies in between.',
        { text: 'A classic study of about 2,400 companies found the same pattern: 1% more price gave 11% more profit, 1% more volume only 3%.', say: 'A classic study of about two thousand four hundred companies found the same pattern: one percent more price gave eleven percent more profit, one percent more volume only three.' },
        'The reason is simple. A higher price costs you nothing to deliver. Every cent of it goes straight into profit.',
      ],
    },
    {
      title: 'The same lever, backwards',
      svg: s3,
      lines: [
        'The lever works in both directions. Take the same company, and lower the price by ten percent.',
        { text: 'Revenue falls from 100 to 90. The costs stay at 90. The profit is gone. All of it.', say: 'Revenue falls from one hundred to ninety. The costs stay at ninety. The profit is gone. All of it.' },
        { text: 'A small discount is never small. It is paid entirely out of your margin.', de: [['margin', 'Marge'], ['discount', 'Rabatt']] },
        'So a price that is ten percent too low is not a ten percent problem. It can be the difference between a healthy company and one that only just survives.',
      ],
    },
    {
      title: 'The discount trap',
      svg: s4,
      quiz: {
        q: 'A shop sells 100 lamps a month at €50. Each lamp costs it €30. It cuts the price by 10%. How many lamps must it sell to keep the same total margin?',
        options: [
          { text: 'About 134 lamps', correct: true, why: 'Before, the shop kept 20 per lamp, so 2,000 in total. At a price of 45 it keeps 15 per lamp. And 2,000 divided by 15 is a little over 133.' },
          { text: 'About 110 lamps', why: 'Ten percent off the price does not mean ten percent off what the shop keeps. The costs stay at 30, so what it keeps falls from 20 to 15, a full quarter.' },
          { text: 'About 112 lamps', why: 'That keeps the revenue the same: 112 times 45 is about 5,000. But each of those lamps still costs 30, so the shop keeps far less than before.' },
          { text: 'About 125 lamps', why: 'What the shop keeps per lamp does fall by a quarter. But a quarter less per lamp needs a third more lamps, not a quarter more: 125 times 15 is only 1,875.' },
        ],
        explain: 'Think in what you keep, not in what you charge. Before the cut, the shop keeps 50 minus 30, so 20 per lamp. Times 100 lamps, that is 2,000 a month. After the cut, the price is 45, and the shop keeps 15 per lamp. To get to 2,000 again, it needs 2,000 divided by 15, which is a little more than 133 lamps. Why a third more, when the price fell by only a tenth? Picture four people carrying a heavy table. One lets go. That is a quarter less help. But each of the three who are left now has to carry a third more than before. A cut always looks smaller than the effort that makes up for it.',
      },
      lines: [
        'You may say: a lower price brings more customers. True. The question is how many more you need.',
        { text: 'Say you sell something for 100 euros that costs you 60. You keep 40. Now you cut the price by 10%, and you keep only 30.', say: 'Say you sell something for one hundred euros that costs you sixty. You keep forty. Now you cut the price by ten percent, and you keep only thirty.' },
        'To earn the same as before, you now have to sell a third more. Not ten percent more. Thirty-three percent more.',
        { text: 'Now the other way. You raise the price by 10% and keep 50. You can lose every fifth customer and still earn the same.', say: 'Now the other way. You raise the price by ten percent and keep fifty. You can lose every fifth customer and still earn the same.' },
        'Fewer customers, the same profit, and less work. Most founders have never done this sum with their own numbers.',
      ],
    },
    {
      title: 'Three ways to set a price',
      svg: s5,
      lines: [
        'There are three basic ways to set a price.',
        { text: 'The first is cost-plus. You add up your costs and put a share on top. It looks inward.', de: [['cost-plus pricing', 'Zuschlagskalkulation']] },
        'The second copies the competition. You look sideways and go a little lower. That is easy, and it assumes that the others knew what they were doing.',
        { text: 'The third starts with the customer. What is this worth to the person who buys it? This is called value-based pricing.', de: [['value-based pricing', 'wertbasierter Preis']] },
        'Most small companies use the first two. The money is in the third.',
      ],
    },
    {
      title: 'Costs are the floor, not the price',
      svg: s6,
      lines: [
        'Cost-plus has a hidden flaw. Your customer does not care what something costs you.',
        'A locksmith who opens your door in two minutes has helped you more than one who needs forty. With an hourly rate, the better one earns less.',
        'Your costs tell you one thing only: the lowest price at which you survive. They are the floor.',
        'The ceiling is what the result is worth to the customer. Between floor and ceiling, there is often a lot of room.',
        'Cost-plus puts you just above the floor, every time. And it punishes you for becoming more efficient.',
      ],
    },
    {
      title: 'How high is the ceiling?',
      svg: s7,
      quiz: {
        q: 'Your tool costs you €40 a month per client and saves the client about €1,000 a month. A rival charges €300 for a weaker tool. Which price fits value-based thinking?',
        options: [
          { text: 'About €380 a month', correct: true, why: 'It sits above the weaker rival, because your tool does more. And it leaves the client well over half of the saving, so buying is still an easy decision.' },
          { text: 'About €60 a month', why: 'That is cost-plus: your 40 and a half on top. It is safe, but it ignores what the tool is worth. The client would keep nearly all of the 1,000.' },
          { text: 'About €270 a month', why: 'Going below the rival makes sense for an equal product. Here yours is the stronger one, so the lower price gives away money and signals the opposite.' },
          { text: 'About €1,000 a month', why: 'That takes the whole saving. The client would be no better off than without you, and would carry the risk of switching for nothing in return.' },
        ],
        explain: 'Picture two ferries to an island. The slow one takes three hours and costs 30. Yours takes one hour, and the fuel costs you 5 per passenger. What do you charge? Not 8, fuel plus a bit: the fuel only tells you where you start losing money. Not 28: you are the better ferry, so there is no reason to be the cheaper one. And not the full worth of two saved hours to a busy passenger, because then they might as well take the slow boat. The right price lies above the slower ferry and clearly below the full worth. That is the logic of the answer: above the weaker alternative, far below the whole saving.',
      },
      lines: [
        { text: 'How high is the ceiling? It depends on what the customer would do without you. Their next best alternative.', de: [['willingness to pay', 'Zahlungsbereitschaft']] },
        'They could do nothing and live with the problem. They could do it themselves. Or they could buy from someone else.',
        { text: 'Say your tool saves a client 1,000 euros a month, compared with their best alternative. That is the value you create.', say: 'Say your tool saves a client one thousand euros a month, compared with their best alternative. That is the value you create.' },
        'You cannot take all of it. Then the client gains nothing and has no reason to buy. But you can take a fair share.',
        'A common rule of thumb: the customer should get back several times what they pay.',
      ],
    },
    {
      title: 'Why founders aim low',
      svg: s8,
      lines: [
        'If this is so clear, why do founders still aim low? There are four typical reasons.',
        'One: your own wallet. You think, I would never pay that. But you are not the buyer. You know how it is made, and you could do it yourself.',
        'Two: the loud ones. Three customers complain about the price, and you remember them. Thirty paid without a word, and you never noticed.',
        'Three: fear. A customer who walks away hurts today. The money you leave on the table every month is invisible.',
        'Four: a low price feels like the safe way to start. But it is hard to climb out of, and it attracts the buyers who leave first for someone cheaper.',
      ],
    },
    {
      title: 'Price is a message',
      svg: s9,
      lines: [
        { text: 'A price is not only a number. It is a message about quality. When people cannot judge quality directly, they read the price.', de: [['price signal', 'Preissignal']] },
        { text: 'In a study from 2008, people tasted the same wine twice. Once it was labelled 10 dollars, once 90. With the high label, they liked it clearly more.', say: 'In a study from two thousand eight, people tasted the same wine twice. Once it was labelled ten dollars, once ninety. With the high label, they liked it clearly more.' },
        'Brain scans showed that this was not politeness. The areas that register pleasure were more active.',
        'In another study, people bought an energy drink. Those who got it at a discount solved fewer puzzles afterwards than those who paid the full price.',
        'So a low price does not only earn less. It can make the same product seem worse, and sometimes even work worse.',
      ],
    },
    {
      title: 'The test: who says no?',
      svg: s10,
      quiz: {
        q: 'A consultant wins 19 of her last 20 offers. Clients sign within a day and never negotiate. What is the most likely reading?',
        options: [
          { text: 'Her price is below what these clients would pay', correct: true, why: 'Both signs point the same way. Almost nobody says no, and nobody even tries to bargain. So the price is far from the limit of any of these clients.' },
          { text: 'Her offers are excellent, so nothing should change', why: 'They may well be excellent. But excellent work at a fair price still meets some bargaining. And if the work is that good, it supports a higher price.' },
          { text: 'Her clients watch every cent, so a rise is risky', why: 'Clients who watch every cent compare and negotiate. Here they sign within a day without a single question about the price. That is the opposite picture.' },
          { text: 'Her market is too small, so she should go lower', why: 'Nothing here points to weak demand: she wins nearly every offer. A lower price would cut what she keeps on each job without solving any problem.' },
        ],
        explain: 'Imagine you sell your old things at a flea market. You put 80 on a bicycle. The first person who walks past pays at once, without a word. Then the same happens with the lamp, the books and the chair. Twenty items, nineteen sold on the spot, nobody haggled. On the way home, what do you think? Not: I am a great seller. You think: I could have asked for more. People at a flea market haggle whenever a price is near their limit. When nobody does, every price was well below it. The consultant is in the same position. The missing no is the information.',
      },
      lines: [
        'Here is a simple test for your own price. Who says no?',
        'If every customer agrees at once, without a question and without bargaining, your price is below what they would have paid.',
        'A healthy price meets some resistance. A common rule of thumb: about one in five should hesitate, or tell you that it is expensive.',
        'That does not mean you lose all of them. It means you are close to the real limit, and not far below it.',
        'Winning every single deal is not the sign of a great offer. It is the sign of a low price.',
      ],
    },
    {
      title: 'Asking the right way',
      svg: s11,
      lines: [
        'So how do you find the real limit? Not by asking: what would you pay? People answer low, because they sense a negotiation.',
        { text: 'A method from the 1970s uses four questions instead. At what price would this be so cheap that you doubt the quality? At what price is it a bargain?', say: 'A method from the nineteen seventies uses four questions instead. At what price would this be so cheap that you doubt the quality? At what price is it a bargain?' },
        'At what price does it start to feel expensive, though you would still consider it? And at what price is it simply too expensive?',
        { text: 'Ask twenty or thirty people from your target group. Their answers mark out a range. Below it you look suspicious, above it you lose most buyers.', de: [['price range', 'Preisspanne']] },
        'Many founders are surprised to find their current price near the bottom of that range.',
      ],
    },
    {
      title: 'Three options instead of one',
      svg: s12,
      lines: [
        'The way you show a price changes how it is judged. One price alone leads to one question: yes or no?',
        'Three options lead to a different question: which one? The customer compares your offers with each other, and no longer only with doing nothing.',
        { text: 'The expensive option does a second job. It is an anchor. Next to it, the middle option looks reasonable.', de: [['anchor', 'Anker (Ankereffekt)']] },
        'Very often, most people pick the middle. So build the middle option as the one you actually want to sell.',
        'And some will take the top one. Without it, you would never have known that they were willing to pay that much.',
      ],
    },
    {
      title: 'The decoy',
      svg: s13,
      quiz: {
        q: 'A gym offers A) mornings only for €25 and B) all day for €45. Most people pick A. Which third option uses the decoy idea to move people to B?',
        options: [
          { text: 'C) evenings only, for €45', correct: true, why: 'It costs the same as B and is clearly worse. Hardly anyone will take it. But next to it, all day for the same money looks like a gift.' },
          { text: 'C) all day plus sauna, for €70', why: 'That is an anchor, not a decoy. It can make B look moderate, and some people will really buy it. A decoy is an option that is not meant to be chosen.' },
          { text: 'C) weekends only, for €15', why: 'An even cheaper option pulls the eye to the low end. It makes A look expensive and gives nobody a new reason to move up to B.' },
          { text: 'C) all day, first month free', why: 'That is a discount on B. It changes the price, not the comparison, and it lowers what the gym earns from exactly the people it wants to win.' },
        ],
        explain: 'Think of popcorn at the cinema. A small bag costs 3, a large one 7. Most people take the small one, because 7 seems a lot. Now the cinema adds a medium bag for 6.50. Almost nobody buys the medium. But suddenly the large one looks like a clever choice: so much more for only 50 cents. The medium bag is the decoy. It has one job, which is to sit next to the option you want to sell, cost about the same, and be clearly worse. In the gym, evenings only for the same 45 does that job for the all-day pass. A top option with sauna is something else: it is a real offer that pulls the whole range upwards.',
      },
      lines: [
        { text: 'A famous classroom test shows how strong comparison is. A magazine offered three subscriptions. Web only for 59 dollars. Print only for 125. And print plus web, also for 125.', say: 'A famous classroom test shows how strong comparison is. A magazine offered three subscriptions. Web only for fifty-nine dollars. Print only for one hundred twenty-five. And print plus web, also for one hundred twenty-five.', de: [['decoy', 'Köder']] },
        { text: 'Of about 100 students, 84 chose print plus web. Nobody chose print only.', say: 'Of about a hundred students, eighty-four chose print plus web. Nobody chose print only.' },
        { text: 'Then the print-only offer was removed. Now only 32 chose print plus web, and 68 took the cheap web version.', say: 'Then the print-only offer was removed. Now only thirty-two chose print plus web, and sixty-eight took the cheap web version.' },
        'An option that nobody wanted changed what most people chose. Next to it, the bundle looked like a gift.',
        'It was a small test with students, so expect less in real life. But the basic effect has been found in many other studies.',
      ],
    },
    {
      title: 'What you charge for',
      svg: s14,
      lines: [
        'So far we talked about how much. Just as important is what you charge for: the hour, the piece, the month, or the result.',
        { text: 'A designer charges 60 euros an hour. A logo takes her 20 hours. That makes 1,200 euros.', say: 'A designer charges sixty euros an hour. A logo takes her twenty hours. That makes one thousand two hundred euros.' },
        { text: 'Two years later she is twice as good and needs only 10 hours. The same logo, even a better one. She now earns 600.', say: 'Two years later she is twice as good and needs only ten hours. The same logo, even a better one. She now earns six hundred.' },
        { text: 'With a fixed price for the result, she would still earn the 1,200, in half the time.', say: 'With a fixed price for the result, she would still earn the one thousand two hundred, in half the time.', de: [['flat fee', 'Pauschalpreis']] },
        'Hourly rates sell your time, and time is the one thing you cannot make more of. Wherever you can, put the price on the result.',
      ],
    },
    {
      title: 'Raising prices without drama',
      svg: s15,
      lines: [
        'What if you are already too cheap? Then the price has to go up. That is less dramatic than it feels.',
        'Start with new customers. They never saw the old price, so for them there is no increase at all.',
        'Tell existing customers early, and give the reason in terms of what they get. Loyal ones can keep the old price for a few more months.',
        'Before you do it, work out how many customers you could afford to lose. With the numbers from before, a ten percent rise lets you lose every fifth one.',
        'In practice, far fewer leave than founders fear. That is experience from many companies, not a law. So test it on a small group first.',
      ],
    },
    {
      title: 'When cheap is right',
      svg: s16,
      lines: [
        'To be fair: a low price can be the right strategy.',
        'Discount supermarkets and budget airlines live on it. But look closely. The whole company is built to have lower costs than anyone else.',
        'Without that advantage, a low price is not a strategy. It is just a smaller margin.',
        { text: 'And remember positioning. The more clearly you are the specialist for one group, the fewer offers you can be compared with. That gives you pricing power.', de: [['pricing power', 'Preissetzungsmacht']] },
      ],
    },
    {
      title: 'A plan for one week',
      svg: s17,
      lines: [
        'Here is a plan for one week.',
        'First, work out your margin, and how many customers you could lose at a ten percent higher price.',
        'Second, ask ten customers the four questions. Do not ask what they would pay.',
        'Third, build three options, with the middle one as the offer you want to sell.',
        'Fourth, quote the higher price to your next five new customers, and count how many say no.',
        'If nobody does, you have your answer.',
      ],
    },
    {
      title: 'The short version',
      svg: s18,
      lines: [
        'The short version. Price is the strongest lever on profit, far stronger than selling more.',
        'Your costs are only the floor. The ceiling is what the result is worth to the customer, compared with their next best alternative.',
        'Founders aim low out of fear, and because they listen to the loud ones. If nobody ever says no, the price is too low.',
        'Three options, an anchor, and a price on the result instead of the hour bring you closer to the real value.',
        'Tomorrow we return to ADHD: what it does in love and relationships.',
      ],
    },
  ],
  takeaways: [
    'Price is the strongest lever on profit: in the example, 1% more price brings 10% more profit, 1% more sales only 4%.',
    'A discount is paid out of the margin. With a margin of 40%, a price cut of 10% needs a third more sales just to earn the same.',
    'Costs are only the floor. The ceiling is what the result is worth to the customer, measured against their next best alternative.',
    'If nobody ever says no and nobody bargains, the price is too low. Some resistance is a sign that you are near the real limit.',
    'Do not ask what people would pay. Ask the four questions: too cheap to trust, a bargain, getting expensive, too expensive.',
    'Offer three options, build the middle one on purpose, and put the price on the result instead of the hour wherever you can.',
  ],
  sources: [
    'Marn & Rosiello (1992): Managing Price, Gaining Profit, Harvard Business Review (2,463 companies: 1% price = 11.1% operating profit). Later studies find about 8%',
    'Plassmann, O’Doherty, Shiv & Rangel (2008): Marketing actions can modulate neural representations of experienced pleasantness, PNAS',
    'Shiv, Carmon & Ariely (2005): Placebo effects of marketing actions, Journal of Marketing Research',
    'Ariely (2008): Predictably Irrational (the subscription test); Huber, Payne & Puto (1982) on the decoy effect',
    'Van Westendorp (1976): the price sensitivity meter (the four questions)',
    'Hermann Simon (2015): Confessions of the Pricing Man',
    'The example company, the designer and the rules of thumb (one in five, several times the price) are illustrations, not study results',
  ],
};
