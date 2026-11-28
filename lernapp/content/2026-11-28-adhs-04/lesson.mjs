import { L, arrow } from '../../tools/kit.mjs';

const box = (y, text, l, o = {}, cls = 'ts') => `
<g ${L(l, 'up', o)}>
  <rect x="24" y="${y}" width="352" height="42" rx="12" class="fp"/>
  <text x="200" y="${y + 27}" class="mid ${cls}">${text}</text>
</g>`;
const chips = (items, y, l, c = '') => items.map(([t, x, w], i) => `<g ${L(l, 'pop', { d: 0.6 + i * 1.2 })}><rect x="${x}" y="${y}" width="${w}" height="34" rx="10" class="fp"/><text x="${x + w / 2}" y="${y + 22}" class="mid ts ${c}">${t}</text></g>`).join('');
const row = (y, n, title, sub, l) => `
<g ${L(l, 'up')}>
  <rect x="24" y="${y}" width="352" height="62" rx="14" class="fp"/>
  <text x="52" y="${y + 42}" class="mid tx tb fb">${n}</text>
  <text x="84" y="${y + 27}" class="tm tb">${title}</text>
  <text x="84" y="${y + 48}" class="ts fm">${sub}</text>
</g>`;
const heart = (cx, cy, s, cls) => `<path d="M${cx} ${cy + 14 * s} C${cx - 30 * s} ${cy - 6 * s} ${cx - 14 * s} ${cy - 24 * s} ${cx} ${cy - 9 * s} C${cx + 14 * s} ${cy - 24 * s} ${cx + 30 * s} ${cy - 6 * s} ${cx} ${cy + 14 * s} Z" class="${cls}"/>`;
const side = (x, title, c, items) => `<rect x="${x}" y="52" width="170" height="170" rx="14" class="fp s${c}"/><text x="${x + 85}" y="80" class="mid ts tb f${c}">${title}</text>${items.map((t, i) => `<text x="${x + 85}" y="${116 + i * 30}" class="mid ts">${t}</text>`).join('')}`;

// ---------- 1: A bright start ----------
const s1 = `
<g ${L(0, 'up')}>
  <circle cx="110" cy="104" r="26" class="fk sa"/><circle cx="290" cy="104" r="26" class="fk sb"/>
  ${heart(200, 104, 1.5, 'fc')}
  <text x="200" y="164" class="mid ts fm">the start: the most intense time</text>
</g>
<g ${L(1, 'up')}>
  <rect x="24" y="186" width="170" height="52" rx="12" class="fp sa"/><text x="109" y="217" class="mid ts">“I feel ignored”</text>
</g>
<g ${L(1, 'up', { d: 3.5 })}>
  <rect x="206" y="186" width="170" height="52" rx="12" class="fp sb"/><text x="291" y="208" class="mid ts">“I am criticised</text><text x="291" y="226" class="mid ts">all the time”</text>
</g>
<text x="200" y="284" class="mid tm tb fd" ${L(2, 'up')}>neither has stopped loving</text>
${box(312, 'today: the mechanism, not the blame', 3)}`;

// ---------- 2: What the studies say ----------
const s2 = `
<g ${L(0, 'up')}>
  <rect x="24" y="44" width="170" height="74" rx="14" class="fp"/><text x="109" y="74" class="mid ts">satisfaction</text><text x="109" y="100" class="mid tm tb fc">lower on average</text>
  <rect x="206" y="44" width="170" height="74" rx="14" class="fp"/><text x="291" y="74" class="mid ts">separations</text><text x="291" y="100" class="mid tm tb fc">more frequent</text>
</g>
<g ${L(1, 'up')}>
  <text x="96" y="186" class="mid tx tb fc">3×</text>
  <text x="150" y="170" class="ts">a past divorce, in one Dutch</text><text x="150" y="190" class="ts">study of older adults</text>
</g>
<g ${L(2, 'up')}>
  <text x="200" y="240" class="mid ts fm">averages, from mostly small studies</text>
  <text x="200" y="264" class="mid ts fd tb">many couples with ADHD are stable and happy</text>
</g>
${box(298, 'the bigger risk: ADHD that nobody understands', 3)}`;

// ---------- 3: Why the start is so intense ----------
const s3 = `
<text x="200" y="40" class="mid ts fm" ${L(0, 'up')}>attention is steered by interest, not importance</text>
${chips([['new', 24, 70], ['uncertain', 102, 92], ['emotional', 202, 92], ['urgent', 302, 74]], 60, 1, 'fb')}
<g ${L(1, 'up', { d: 6 })}><text x="200" y="124" class="mid ts fm">new love: all four at once</text></g>
<g ${L(2, 'up')}>
  ${arrow(200, 136, 200, 164, 'b')}
  <circle cx="200" cy="216" r="44" class="fn sb s3"/><circle cx="200" cy="216" r="26" class="fn sb"/>${heart(200, 216, 0.8, 'fc')}
  <text x="200" y="284" class="mid tm tb fb">hyperfocus, aimed at a person</text>
</g>
${chips([['messages all day', 24, 126], ['talks until 3 am', 158, 118], ['surprises', 284, 92]], 306, 3)}`;

// ---------- 4: Real, and it cannot last ----------
const s4 = `
<g ${L(0, 'up')}>
  <path d="M50 70 V290 H360" class="fn sm"/>
  <text x="58" y="58" class="ts fm">attention on the partner</text><text x="360" y="310" class="end ts fm">time</text>
  <text x="360" y="58" class="end ts fm">a sketch, not data</text>
</g>
<g ${L(1, 'up')}>
  <path d="M170 76 V290" class="fn sm dash"/><text x="176" y="282" class="ts fm">novelty fades</text>
</g>
<g ${L(2, 'up')}>
  <path d="M50 134 C150 142 250 170 360 180" class="fn sm s3"/><text x="356" y="160" class="end ts fm">without ADHD</text>
  <path d="M50 84 C110 84 136 84 162 104 S 200 240 240 250 S 320 256 360 256" class="fn sb s3"/><text x="60" y="108" class="ts fb tb">with ADHD</text>
</g>
<g ${L(3, 'up')}>
  <text x="200" y="336" class="mid ts">the love has not moved</text>
  <text x="200" y="360" class="mid tm tb fb">the spotlight has</text>
</g>`;

// ---------- 5: What the partner sees ----------
const s5 = `
<g ${L(0, 'up')}>
  <rect x="24" y="44" width="170" height="80" rx="14" class="fp sd"/><text x="109" y="72" class="mid ts fm">six months ago</text><text x="109" y="100" class="mid ts tb">heard every word</text>
  <rect x="206" y="44" width="170" height="80" rx="14" class="fp sc"/><text x="291" y="72" class="mid ts fm">now</text><text x="291" y="100" class="mid ts tb">eyes on the phone</text>
</g>
<g ${L(1, 'up')}>
  <rect x="60" y="150" width="280" height="50" rx="14" class="fp"/><text x="200" y="181" class="mid tm">“I am no longer important”</text>
</g>
<g ${L(2, 'up')}>
  <path d="M70 175 H330" class="fn sc"/>
  <text x="200" y="228" class="mid ts fc tb">a misreading, and an understandable one</text>
</g>
<g ${L(3, 'up')}>
  <text x="200" y="286" class="mid tl tb fb">attention ≠ love</text>
  <text x="200" y="314" class="mid ts fm">with ADHD, attention follows stimulation</text>
</g>`;

// ---------- 6: Symptoms that look like messages ----------
const sym = (y, a, cause, b, l) => `
<g ${L(l, 'up')}>
  <text x="24" y="${y}" class="ts tb">${a}</text><text x="24" y="${y + 18}" class="ts fm">${cause}</text>
  ${arrow(178, y + 4, 204, y + 4, 'm', { size: 7 })}
  <text x="214" y="${y + 8}" class="ts fc">${b}</text>
</g>`;
const s6 = `
<g ${L(0, 'up')}><text x="24" y="42" class="ts fm">the symptom</text><text x="214" y="42" class="ts fm">what arrives</text><path d="M24 52 H376" class="fn sm s1"/></g>
${sym(80, 'forgotten anniversary', 'working memory', '“I am not important”', 0)}
${sym(132, 'arriving late', 'time blindness', '“my time does not count”', 1)}
${sym(184, 'interrupting', 'impulse control', '“you never listen”', 2)}
${sym(236, 'chores half done', 'starting and finishing', '“it is all left to me”', 3)}
<g ${L(4, 'up')}>
  <text x="200" y="306" class="mid ts">the symptom is neutral</text>
  <text x="200" y="332" class="mid tm tb fc">the reading hurts</text>
</g>`;

// ---------- 7: Out of sight, out of mind ----------
const s7 = `
<text x="200" y="40" class="mid tm tb" ${L(0, 'up')}>out of sight, out of mind</text>
<g ${L(1, 'up')}>
  <rect x="24" y="60" width="170" height="130" rx="14" class="fp sd"/><text x="109" y="88" class="mid ts fm">in the same room</text>
  ${heart(109, 132, 1.3, 'fc')}<text x="109" y="174" class="mid ts">warm and clear</text>
</g>
<g ${L(1, 'up', { d: 4 })}>
  <rect x="206" y="60" width="170" height="130" rx="14" class="fp"/><text x="291" y="88" class="mid ts fm">apart for the day</text>
  ${heart(291, 132, 1.3, 'fn sm dash')}<text x="291" y="174" class="mid ts">not on the screen</text>
</g>
<g ${L(2, 'up')}>
  <text x="200" y="230" class="mid ts">not out of the heart</text>
  <text x="200" y="254" class="mid ts fb tb">out of working memory</text>
</g>
${box(288, '“I love you whenever I think of you”', 3)}`;

// ---------- 8: Parent and child ----------
const ln = (x, y, t, c = '') => `<rect x="${x - 64}" y="${y - 20}" width="128" height="40" rx="12" class="fp ${c}"/><text x="${x}" y="${y + 5}" class="mid ts">${t}</text>`;
const s8 = `
<g ${L(0, 'up')}>
  ${ln(200, 62, 'forgets things')}${arrow(268, 76, 300, 126, 'm')}${ln(310, 150, 'gets reminded')}
</g>
<text x="200" y="304" class="mid ts" ${L(1, 'up')}>then managed: bills, dates, plans</text>
<g ${L(2, 'up')}>
  ${arrow(300, 174, 268, 222, 'm')}${ln(200, 240, 'feels controlled', 'sc')}${arrow(132, 222, 100, 174, 'm')}${ln(90, 150, 'does even less', 'sc')}${arrow(100, 126, 132, 78, 'm')}
</g>
<g ${L(3, 'up')}>
  <text x="200" y="146" class="mid ts fm">parent</text><text x="200" y="164" class="mid ts fm">and child</text>
  <text x="200" y="340" class="mid ts fc tb">nobody longs for their supervisor</text>
</g>`;

// ---------- 9: Both are right ----------
const s9 = `
<g ${L(0, 'up')}>${side(24, 'without ADHD', 'a', ['plans for two', 'feels alone', 'hates the nagging'])}</g>
<g ${L(1, 'up')}>${side(206, 'with ADHD', 'b', ['tries hard', 'hears what went wrong', 'never good enough'])}</g>
<text x="200" y="262" class="mid ts fc" ${L(2, 'up')}>resentment grows on both sides</text>
<g ${L(3, 'up')}>
  <text x="200" y="312" class="mid tl tb">both are right</text>
  <text x="200" y="342" class="mid tm fm">and both are exhausted</text>
</g>`;

// ---------- 10: Fast and loud ----------
const s10 = `
<g ${L(0, 'up')}>
  <path d="M50 60 V280 H360" class="fn sm"/><text x="58" y="52" class="ts fm">strength of the feeling</text><text x="360" y="300" class="end ts fm">time</text>
  <path d="M50 270 C130 270 160 204 210 204 S 310 254 360 264" class="fn sm s3"/><text x="262" y="196" class="ts fm">without ADHD</text>
</g>
<g ${L(1, 'up')}>
  <path d="M50 270 C72 270 80 92 100 92 S 132 256 170 266 H360" class="fn sc s3"/>
  <text x="122" y="90" class="ts fc tb">with ADHD: fast, high, short</text>
</g>
<text x="138" y="128" class="ts" ${L(2, 'up')}>from zero to a hundred in seconds</text>
<g ${L(3, 'up')}>
  <path d="M230 150 V280" class="fn sm dash"/>
  <text x="200" y="330" class="mid ts">20 minutes later: one is over it, one still hurts</text>
</g>`;

// ---------- 11: The sting of criticism ----------
const s11 = `
<text x="200" y="38" class="mid ts fm" ${L(0, 'up')}>criticism: a sudden, almost physical pain</text>
<g ${L(1, 'up')}>
  <text x="200" y="76" class="mid tm tb fb">rejection sensitivity</text>
  <text x="200" y="100" class="mid ts fm">not an official diagnosis, research still thin</text>
</g>
<g ${L(2, 'up')}>
  <text x="24" y="140" class="ts fm">corrections in childhood</text>
  <text x="24" y="164" class="ts">others</text><rect x="100" y="152" width="80" height="14" rx="4" class="fm"/>
  <text x="24" y="190" class="ts">with ADHD</text><rect x="100" y="178" width="260" height="14" rx="4" class="fc"/>
</g>
<g ${L(3, 'up')}>
  <rect x="24" y="220" width="150" height="62" rx="14" class="fp"/><text x="99" y="246" class="mid ts">“Could you take</text><text x="99" y="264" class="mid ts">out the rubbish?”</text>
  ${arrow(180, 251, 220, 251, 'c')}
  <rect x="226" y="220" width="150" height="62" rx="14" class="fp sc"/><text x="301" y="246" class="mid ts fc tb">“You have</text><text x="301" y="264" class="mid ts fc tb">failed again.”</text>
  <text x="99" y="304" class="mid ts fm">what was said</text><text x="301" y="304" class="mid ts fm">what was heard</text>
</g>`;

// ---------- 12: Naming it ----------
const turn = (y, a, b, l) => `
<g ${L(l, 'up')}>
  <text x="24" y="${y}" class="ts fc">${a}</text>
  ${arrow(40, y + 12, 40, y + 28, 'm', { size: 6 })}
  <text x="56" y="${y + 30}" class="ts fd tb">${b}</text>
</g>`;
const s12 = `
<text x="200" y="38" class="mid ts fm" ${L(0, 'up')}>step 1: both learn what ADHD does</text>
${turn(76, '“he does not care”', 'his working memory dropped it', 1)}
<g ${L(1, 'up', { d: 5 })}>
  <text x="24" y="146" class="ts fc">“she wants to control me”</text>
  ${arrow(40, 158, 40, 174, 'm', { size: 6 })}
  <text x="56" y="176" class="ts fd tb">she has carried this alone</text>
</g>
<text x="200" y="228" class="mid tm tb" ${L(2, 'up')}>an explanation, not an excuse</text>
<g ${L(3, 'up')}>
  <rect x="24" y="264" width="352" height="66" rx="14" class="fp sb"/>
  <text x="200" y="292" class="mid tm tb fb">the opponent is the pattern</text>
  <text x="200" y="316" class="mid ts fm">not the partner</text>
</g>`;

// ---------- 13: Treat the ADHD ----------
const s13 = `
<text x="200" y="38" class="mid ts fm" ${L(0, 'up')}>step 2: treat the ADHD, not only the couple</text>
<g ${L(1, 'up')}>
  <rect x="24" y="58" width="352" height="56" rx="14" class="fp sc"/>
  <text x="200" y="82" class="mid ts">good intentions from a couples talk</text><text x="200" y="102" class="mid ts fc tb">forgotten by Thursday</text>
</g>
<g ${L(2, 'up')}>
  ${chips([['diagnosis', 24, 100], ['medication', 134, 104], ['coaching, therapy', 248, 128]], 140, 2)}
  <text x="200" y="208" class="mid ts fd tb">something for the intentions to stand on</text>
</g>
${box(248, 'studies on couples: still few', 3)}
<text x="200" y="320" class="mid ts fm" ${L(3, 'up', { d: 4 })}>but therapists report it consistently</text>`;

// ---------- 14: Systems instead of reminders ----------
const s14 = `
<text x="200" y="38" class="mid ts fm" ${L(0, 'up')}>step 3: systems instead of reminders</text>
${chips([['shared calendar + alarms', 24, 178], ['fixed places', 210, 166]], 56, 1)}
${chips([['bills paid automatically', 24, 352]], 98, 1)}
<g ${L(2, 'up')}>
  <rect x="24" y="152" width="352" height="74" rx="14" class="fp"/>
  <text x="200" y="180" class="mid ts fm">not: “help me with the washing”</text>
  <text x="200" y="206" class="mid ts tb fd">but: “the washing is yours, start to finish”</text>
</g>
<g ${L(3, 'up')}>
  <text x="200" y="270" class="mid tm tb fb">the phone reminds</text>
  <text x="200" y="296" class="mid tm fm">the partner does not</text>
  <text x="200" y="334" class="mid ts">out of the parent role, out of the child role</text>
</g>`;

// ---------- 15: Attention on purpose ----------
const s15 = `
<text x="200" y="38" class="mid ts fm" ${L(0, 'up')}>step 4: attention on purpose</text>
${row(52, '1', '15 minutes a day', 'no phone, full attention', 1)}
<g ${L(1, 'up', { d: 3 })}>
  <rect x="24" y="122" width="352" height="62" rx="14" class="fp"/>
  <text x="52" y="164" class="mid tx tb fb">2</text><text x="84" y="149" class="tm tb">an alarm at noon</text><text x="84" y="170" class="ts fm">“write to her”</text>
</g>
<text x="200" y="218" class="mid ts" ${L(2, 'up')}>a planned message still arrives</text>
${row(240, '3', 'new things together', 'novelty can be invited back', 3)}`;

// ---------- 16: Rules for a fight ----------
const s16 = `
<text x="200" y="34" class="mid ts fm" ${L(0, 'up')}>step 5: rules for a fight, agreed on a calm day</text>
${row(46, '1', 'a stop signal', 'either one may use it', 1)}
<g ${L(1, 'up', { d: 4 })}>
  <rect x="24" y="116" width="352" height="62" rx="14" class="fp"/>
  <text x="52" y="158" class="mid tx tb fb">2</text><text x="84" y="143" class="tm tb">a break of 20 minutes</text><text x="84" y="164" class="ts fm">so that the body calms down</text>
</g>
${row(186, '3', 'come back', 'set a timer: no return feels like leaving', 2)}
${row(256, '4', '“I need …”', 'instead of “you never …”', 3)}`;

// ---------- 17: What ADHD brings ----------
const s17 = `
<text x="200" y="40" class="mid ts fm" ${L(0, 'up')}>what partners say they love</text>
${chips([['spontaneity', 24, 112], ['humour', 144, 92], ['warmth', 244, 132]], 60, 1, 'fb')}
${chips([['ideas', 24, 112], ['intensity', 144, 232]], 104, 1, 'fb')}
<g ${L(2, 'up')}>
  <text x="200" y="188" class="mid ts">anger passes quickly</text>
  <text x="200" y="212" class="mid ts fd tb">grudges are rarely kept</text>
</g>
<g ${L(3, 'up')}>
  <text x="200" y="262" class="mid ts fm">not true for everyone</text>
  <rect x="24" y="282" width="352" height="66" rx="14" class="fp sd"/>
  <text x="200" y="310" class="mid tm tb fd">not broken</text><text x="200" y="334" class="mid ts">they need a manual that most never got</text>
</g>`;

// ---------- 18: The short version ----------
const s18 = `
${box(40, 'the start is intense: love is the strongest stimulus', 0)}
${box(96, 'novelty fades: the attention moves, not the love', 0, { d: 6 })}
${box(152, 'symptoms are read as messages', 1)}
${box(208, 'name it, treat it, use systems, plan attention', 2)}
<g ${L(3, 'up')}>
  <text x="200" y="298" class="mid ts fm">tomorrow: AI, with one single idea</text>
  <text x="200" y="326" class="mid tm tb">attention</text>
</g>`;

export default {
  id: '2026-11-28-adhs-04',
  date: '2026-11-28',
  area: 'adhs',
  series: 'Understanding ADHD',
  episode: 4,
  title: 'ADHD in love: why it starts so bright, and where it gets hard',
  hook: 'The start is intense. A year later, one partner feels ignored and the other feels criticised all the time. Nobody stopped loving. Here is the mechanism, and what helps.',
  level: 2,
  poster: 7,
  voice: 'male',
  scenes: [
    {
      title: 'A bright start',
      svg: s1,
      lines: [
        'Many couples in which one partner has ADHD tell the same story. The beginning was the most intense time of their lives.',
        'A year or two later, one of them says: I feel ignored. And the other says: I am criticised all the time.',
        'Neither of them has stopped loving. And neither of them is the villain. Both are caught in something they do not understand.',
        'Today we look at the mechanism behind this story, with what research knows and what it does not. And at five things that couples can do.',
      ],
    },
    {
      title: 'What the studies say',
      svg: s2,
      lines: [
        'First the numbers. On average, adults with ADHD report being less satisfied in their relationships, and they separate more often.',
        { text: 'In one Dutch study of older adults, a past divorce was about 3 times as common with ADHD as without.', say: 'In one Dutch study of older adults, a past divorce was about three times as common with ADHD as without.' },
        'But these are averages, and most of the studies are small. Many couples with ADHD are stable and happy. A risk is not a fate.',
        'Many therapists stress one point: the biggest risk is not the ADHD itself. It is ADHD that neither partner understands, so that every symptom is taken personally.',
      ],
    },
    {
      title: 'Why the start is so intense',
      svg: s3,
      lines: [
        'Remember the first ADHD episode. The ADHD brain does not steer attention by importance. It steers by interest, novelty and urgency.',
        { text: 'Now look at new love. It is new, uncertain, emotional and urgent, all at once. There is hardly a stronger stimulus.', de: [['novelty', 'Neuheit']] },
        { text: 'So the attention locks on. This state is called hyperfocus, and here it is aimed at a person.', de: [['hyperfocus', 'Hyperfokus']] },
        'Messages all day. Talks until three in the morning. Surprises. Full, undivided attention. For the other person, it feels like being truly seen for the first time.',
      ],
    },
    {
      title: 'Real, and it cannot last',
      svg: s4,
      quiz: {
        q: 'Six months in, Sam (ADHD) no longer texts all day and often seems distracted. Asked directly, Sam says the feelings are unchanged. Which reading fits best?',
        options: [
          { text: 'The novelty has faded, so Sam\'s attention is no longer pulled', correct: true, why: 'Only the attention has changed, and it changed when the newness wore off. That is what you expect when attention is steered by novelty and not by importance.' },
          { text: 'Sam\'s feelings have cooled, and Sam does not want to say so', why: 'That would be a fair guess for most people. But with ADHD, attention is a poor measure of feeling. Nothing here points to less love, only to less focus.' },
          { text: 'The intense start was an act, meant to win the partner over', why: 'Hyperfocus is not chosen and not played. The intensity was sincere. It simply ran on novelty, and that fuel runs out for everyone.' },
          { text: 'Sam is still in hyperfocus on the partner, only more quietly', why: 'Hyperfocus is not quiet. It is a locked-on state, and it has moved to other things. What stays behind is the feeling, without the automatic focus.' },
        ],
        explain: 'Think of a cat and a laser pointer. While the red dot moves, the cat cannot look anywhere else. It is completely there, and that is not an act. When the dot stops moving, the cat looks away and goes after the next thing that moves. Has the cat decided that the dot was a mistake? No. Its attention is simply built to follow movement. The ADHD attention system follows novelty in a similar way. In the first months, the partner is the newest and most exciting thing in the world. Later the partner is familiar, and familiar things do not pull by themselves. The bond is still there. It now needs a deliberate look.',
      },
      lines: [
        'This intensity is sincere. It is not a trick, and nobody chooses it.',
        'But it runs on novelty. And novelty fades for every couple, usually within a year or two. That is normal, and no sign that something is wrong.',
        'In most couples, attention then sinks gently. With ADHD, therapists often describe a sharper drop, because attention returns to whatever is new and urgent.',
        'The job, the phone, a new project. The love has not moved. The spotlight has.',
      ],
    },
    {
      title: 'What the partner sees',
      svg: s5,
      lines: [
        'Now change sides. Six months ago, your partner listened to every word. Now they look at the phone while you are speaking.',
        'What would you conclude? Almost everyone concludes the same: I am no longer important to you.',
        { text: 'That is a misreading, and an understandable one. In most people, attention is a fair measure of interest.', de: [['misreading', 'Fehldeutung']] },
        'With ADHD, it is not. Attention follows stimulation, not love. This one sentence explains a large part of the trouble, and it is worth saying out loud to each other.',
      ],
    },
    {
      title: 'Symptoms that look like messages',
      svg: s6,
      lines: [
        { text: 'Many ADHD symptoms look like messages. A forgotten anniversary is working memory. But it arrives as: I am not important.', de: [['working memory', 'Arbeitsgedächtnis']] },
        'Arriving late is time blindness, from the second ADHD episode. It arrives as: my time does not count.',
        'Interrupting is weak impulse control. It arrives as: you never listen to me.',
        'Chores left half done are a problem with starting and finishing. They arrive as: everything is left to me.',
        'The symptom itself is neutral. What hurts is the meaning that the other person reads into it. And after the tenth time, it is hard not to read it that way.',
      ],
    },
    {
      title: 'Out of sight, out of mind',
      svg: s7,
      lines: [
        'A special case is: out of sight, out of mind.',
        'When the partner is in the room, the feeling is there, warm and clear. When they are away, they slip out of active attention.',
        'Not out of the heart. Out of working memory. So a whole day can pass without a single message, and the one who is waiting counts every hour.',
        'People with ADHD often put it like this: I love you whenever I think of you. The trouble is that the thinking does not start by itself.',
      ],
    },
    {
      title: 'Parent and child',
      svg: s8,
      quiz: {
        q: 'Lena reminds Tom (ADHD) of everything and has taken over the bills and all appointments. Tom does less and less. Which change breaks this loop at its root?',
        options: [
          { text: 'Tom owns fixed tasks fully, and a system does the reminding', correct: true, why: 'This removes both halves of the loop. Lena no longer has to manage, and Tom is no longer managed. The reminding still happens, but not through a person.' },
          { text: 'Lena reminds earlier and more often, so that nothing is missed', why: 'That makes things run for a while. But it is more of what built the loop. Lena becomes even more of a manager, and Tom even more of a managed person.' },
          { text: 'Lena stops at once and lets everything fail, so Tom learns', why: 'It ends the managing, which is right. But Tom\'s memory is the same as before. Without a system, things fail, and the failures feed new criticism.' },
          { text: 'Tom promises to try harder and to think of things himself', why: 'The promise is honest. But the problem was never the will. Working memory does not grow from a promise, so the next forgotten bill is only a matter of time.' },
        ],
        explain: 'Imagine a small office where one colleague keeps forgetting deadlines. A second colleague starts to remind him, then checks his work, then quietly does half of it herself. Soon she is doing two jobs and is angry. He feels watched and stops taking initiative. What would a good boss do? Not tell her to check even more. Not tell her to drop everything tomorrow and watch the office burn. And not accept a promise to be more careful. A good boss gives him clear tasks that are his alone, and a calendar that warns him on its own. Then she can stop checking, and he can be good at his job again. A couple needs the same two things: clear ownership, and a reminder that is not a person.',
      },
      lines: [
        'Out of all this grows a pattern that therapists see again and again. One partner forgets things. So the other one reminds.',
        'The reminding grows. Then comes taking over: the bills, the appointments, the planning. One partner has become the manager of the other.',
        { text: 'The managed one feels controlled and criticised. So they pull back, or defend themselves, and do even less. That confirms the manager.', de: [['parent-child dynamic', 'Eltern-Kind-Dynamik']] },
        'It is called the parent-child dynamic, and it is poison for desire. Nobody longs for their supervisor. And nobody longs for someone they have to supervise.',
      ],
    },
    {
      title: 'Both are right',
      svg: s9,
      lines: [
        'Look at both sides for a moment. The partner without ADHD plans for two. They feel alone, and they dislike the nagging person they have become.',
        'The partner with ADHD is trying, often harder than anyone sees. And they hear every day what went wrong again. Many have heard that since childhood.',
        { text: 'So resentment grows on both sides. Each one feels like the victim, and each one has good reasons.', de: [['resentment', 'Groll']] },
        'Both are right. And both are exhausted. This is the point where many couples give up, although the real cause has not even been named.',
      ],
    },
    {
      title: 'Feelings arrive fast and loud',
      svg: s10,
      lines: [
        { text: 'Then there are feelings. The brakes that hold back actions also hold back emotions. With ADHD, those brakes are weaker.', de: [['emotion regulation', 'Emotionsregulation']] },
        'In studies, well over half of adults with ADHD report feelings that rise fast and hit hard. Joy and enthusiasm as well as anger.',
        'In an argument, that means from zero to a hundred in seconds. Things are said that are not meant, and they cannot be unsaid.',
        'And then it is over, just as fast. Twenty minutes later, the partner with ADHD has moved on. The other one is still hurt, and now confused as well.',
      ],
    },
    {
      title: 'The sting of criticism',
      svg: s11,
      quiz: {
        q: 'Mia asks calmly: "Could you empty the dishwasher?" Jon (ADHD) snaps: "I can never do anything right!" Ten minutes later he is calm and says sorry. What explains both?',
        options: [
          { text: 'A fast, strong feeling, set off by a hint of criticism', correct: true, why: 'It fits both observations. The outburst is far bigger than the request, which points to a sensitive alarm. And it is gone in ten minutes, as fast as it came.' },
          { text: 'A deep grudge against Mia that comes out in small moments', why: 'A grudge is slow and lasting. It would not vanish in ten minutes, and it would not end in a sincere apology. Only the first observation would fit.' },
          { text: 'A way to avoid the chore: anger ends the conversation', why: 'It could look like that from outside. But someone who uses anger as a tool has no reason to come back ten minutes later and apologise.' },
          { text: 'A fair reaction, because Mia\'s request was put too harshly', why: 'The request was calm and ordinary. The reaction does not match what was said. It matches what was heard: one more proof of failing.' },
        ],
        explain: 'Think of a smoke alarm that is set far too sensitive. You make toast, and it screams as if the house were on fire. Then you wave a towel, and it is silent again. The alarm is not angry at you, and it is not trying to stop you from making toast. It simply reacts to a trace of smoke as if it were a fire, and it stops as soon as the trace is gone. Jon\'s reaction has the same two marks: far too big for the cause, and over very quickly. A grudge would last. A tactic would not apologise. A harsh request would explain the size, but the request was not harsh. What is left is a fast alarm for criticism, built up over many years of being corrected.',
      },
      lines: [
        'One trigger deserves its own look: criticism. Many people with ADHD describe it as a sudden, almost physical pain.',
        { text: 'The popular name is rejection sensitivity. It is not an official diagnosis, and the research on it is still thin.', de: [['rejection sensitivity', 'Zurückweisungsempfindlichkeit']] },
        'But the background is plausible. A child with ADHD is corrected far more often than other children. Over the years, the alarm becomes very sensitive.',
        'Then a neutral request, such as, could you take out the rubbish, is heard as: you have failed again. The answer is defence, and the other one has no idea why.',
      ],
    },
    {
      title: 'Step one: name it',
      svg: s12,
      lines: [
        'So what helps? The first step sounds small and changes the most. Both partners learn what ADHD actually does.',
        'Then, he does not care, turns into: his working memory dropped it. And, she wants to control me, turns into: she has carried this alone.',
        'That is an explanation, not an excuse. The partner with ADHD stays responsible for managing it. The other one, for not reading symptoms as messages.',
        'The opponent is the pattern. Not the partner. Couples who manage this switch often describe it as the turning point.',
      ],
    },
    {
      title: 'Step two: treat the ADHD',
      svg: s13,
      lines: [
        'Second: treat the ADHD itself, and not only the relationship. This step is often skipped.',
        'If attention, memory and impulses stay as they are, the good intentions from a couples talk are forgotten by Thursday.',
        'A proper diagnosis, and a treatment that fits, give those intentions something to stand on. That can be medication, coaching or therapy.',
        'To be honest: studies on how much this improves relationships are still few. But therapists who work with such couples report it consistently.',
      ],
    },
    {
      title: 'Step three: systems, not reminders',
      svg: s14,
      lines: [
        'Third: systems instead of reminders. In the first episode, we called this moving the management outside.',
        'A shared calendar with alarms. Fixed places for keys and papers. Bills that are paid automatically. A written list on the fridge instead of a spoken request.',
        { text: 'And tasks are handed over whole. Not: please help me with the washing. But: the washing is yours, from start to finish.', de: [['ownership', 'volle Zuständigkeit']] },
        'The point of all this: the reminder now comes from the phone, and no longer from the partner. That ends the parent role, and the child role with it.',
      ],
    },
    {
      title: 'Step four: attention on purpose',
      svg: s15,
      lines: [
        'Fourth: attention on purpose. If it does not come by itself, give it a fixed place.',
        'Fifteen minutes a day without a phone. An alarm at noon that says: write to her. A fixed evening each week that belongs to the two of you.',
        'That sounds unromantic. But a message that was planned still arrives. The partner feels the attention, not the alarm behind it.',
        'And use what the ADHD brain likes. Studies with couples in general show that doing new things together raises satisfaction. Novelty can be invited back.',
      ],
    },
    {
      title: 'Step five: rules for a fight',
      svg: s16,
      quiz: {
        q: 'A fight heats up. Jon (ADHD) says: "I need a break," and leaves the room. What makes this pause help, instead of making things worse?',
        options: [
          { text: 'A fixed time to come back, with a timer, agreed in advance', correct: true, why: 'The break lets both bodies calm down. The fixed return tells the other one: I am not leaving you, and the topic is not buried. The timer makes sure it happens.' },
          { text: 'Dropping the topic for good, so the fight cannot start again', why: 'It does keep the evening calm. But the issue stays open and comes back, usually bigger. And the partner learns that a break means being left alone with it.' },
          { text: 'Mia following him at once, to settle it while it is fresh', why: 'Wanting to settle it is fair. But a body at full alarm cannot solve anything. Following takes away the one thing the break is for, and the fight goes up again.' },
          { text: 'Jon using the time to write down all of his arguments', why: 'It feels productive. But it keeps the alarm running, and he returns with more ammunition, not with a calmer head. The break is for calming down, not for preparing.' },
        ],
        explain: 'Think of a football match. The referee can stop the game, and everyone knows two things: play is paused, and play will start again in fifteen minutes. Nobody panics during half-time, because the return is certain. Now imagine a referee who simply walks off the pitch without a word. Is the match over? Will he come back? The players would run after him, or start fighting among themselves. A pause in an argument works like half-time only if both know when it ends. That is why the return time matters more than the break itself. And with ADHD, time slips away easily, so a timer has to carry that promise. Half-time is also for catching your breath, not for planning revenge.',
      },
      lines: [
        'Fifth: rules for a fight, agreed on a calm day, and not in the middle of one.',
        { text: 'A stop signal that either one may use. Then a break of about twenty minutes, so that the body can calm down.', de: [['stop signal', 'Stoppsignal']] },
        'The most important part is coming back. A break without a return feels like being left, and it leaves the issue open. So set a timer.',
        'And make requests instead of accusations. Not: you never listen. But: I need ten minutes of your full attention.',
      ],
    },
    {
      title: 'What ADHD brings',
      svg: s17,
      lines: [
        'It would be wrong to end on problems only. Ask partners what they love about someone with ADHD, and the answers repeat.',
        'Spontaneity. Humour. Warmth. Ideas. And an intensity that others rarely offer.',
        'Even the fast feelings have a bright side. Anger passes quickly, and grudges are rarely kept.',
        'None of this is true for everyone. But these couples are not broken. They need a manual that most of them never got.',
      ],
    },
    {
      title: 'The short version',
      svg: s18,
      lines: [
        'The short version. New love is the strongest stimulus there is, so the start is intense. When the novelty fades, the attention moves on. The love does not.',
        'The partner reads symptoms as messages. Reminding turns into managing, and the couple slides into parent and child.',
        'What helps: name the ADHD, treat it, let systems do the reminding, plan attention, and agree on rules for a fight, with a sure return.',
        'The next ADHD episode looks at desire and sexuality. Tomorrow we return to AI, with one single idea: attention.',
      ],
    },
  ],
  takeaways: [
    'New love is new, uncertain, emotional and urgent at once. For an ADHD brain that is the strongest stimulus there is, so attention locks on.',
    'When novelty fades, the attention moves on to what is new and urgent. With ADHD, attention is not a measure of love.',
    'Forgetting, lateness and interrupting are symptoms. They hurt because the partner reads them as messages: I am not important.',
    'Reminding turns into managing. The parent-child dynamic exhausts both partners and is poison for desire.',
    'Feelings rise fast and fade fast, and criticism can sting far more than intended. Rejection sensitivity is a popular term, not an official diagnosis.',
    'What helps: both learn about ADHD, the ADHD is treated, a system does the reminding, attention gets a fixed place, and fights have rules with a sure return.',
  ],
  sources: [
    'Michielsen et al. (2013/2015): ADHD in older adults in the Netherlands, including history of divorce',
    'Reviews on adult ADHD and romantic relationships (e.g. Wymbs et al. 2021; Duke Center for Girls & Women with ADHD research summary): lower satisfaction, more conflict',
    'Shaw, Stringaris, Nigg & Leibenluft (2014): Emotion dysregulation in ADHD, American Journal of Psychiatry; Beheshti et al. (2020), BMC Psychiatry',
    'Aron et al. (2000): Couples’ shared participation in novel and arousing activities and experienced relationship quality',
    'Clinical descriptions, not controlled studies: hyperfocus in courtship and the parent-child dynamic (Orlov, The ADHD Effect on Marriage; Pera, Is It You, Me, or Adult A.D.D.?)',
    'The curves in this episode are sketches of what therapists describe, not measured data',
  ],
};
