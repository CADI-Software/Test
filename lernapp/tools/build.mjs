#!/usr/bin/env node
// Baut eine Lektion:  node tools/build.mjs <lesson-id> [--narration] [--no-audio]
//
//   --narration  schreibt content/<id>/narration.json (Zeilen je Szene) und
//                content/<id>/narration/sNN.txt (Sprechtext je Szene) und endet.
//   --no-audio   baut ohne Ton (Player läuft dann im stummen Untertitel-Modus).
//
// Ton wird aus content/<id>/audio/sNN.(mp3|wav) gelesen, eine Datei je Szene (tools/tts_kokoro.py).
// Liegt daneben sNN.json mit {"starts":[...]}, gelten diese Zeilenzeiten exakt;
// sonst werden die Zeilenanfänge an den Sprechpausen der Aufnahme ausgerichtet.
//
// Ergebnis: site/lessons/<id>/lesson.json (+ audio.mp3) und site/lessons/index.json.

import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const id = args.find((a) => !a.startsWith('--'));
if (!id) { console.error('Aufruf: node tools/build.mjs <lesson-id> [--narration] [--no-audio]'); process.exit(1); }
const flag = (f) => args.includes(f);

const src = path.join(root, 'content', id);
const lesson = (await import(pathToFileURL(path.join(src, 'lesson.mjs')).href + '?v=' + Date.now())).default;
const AREAS = ['ki', 'adhs', 'innovation', 'business', 'bonus'];
const SCENE_GAP = 0.7; // Sekunden Stille zwischen zwei Szenen

// ---------- Prüfen ----------
const errors = [];
const need = (c, m) => { if (!c) errors.push(m); };
need(lesson.id === id, `id "${lesson.id}" passt nicht zum Ordner "${id}"`);
need(/^\d{4}-\d{2}-\d{2}$/.test(lesson.date || ''), 'date fehlt (JJJJ-MM-TT)');
need(AREAS.includes(lesson.area), `area muss eines von ${AREAS.join(', ')} sein`);
need(lesson.title && lesson.hook, 'title und hook fehlen');
need(['female', 'male'].includes(lesson.voice), 'voice muss female oder male sein (wechselt von Folge zu Folge)');
need(Array.isArray(lesson.scenes) && lesson.scenes.length >= 3, 'mindestens 3 Szenen');
const scenes = (lesson.scenes || []).map((s, si) => {
  const lines = (s.lines || []).map((l) => (typeof l === 'string' ? { text: l } : l));
  need(lines.length > 0, `Szene ${si + 1}: keine Zeilen`);
  lines.forEach((l, li) => {
    need(!/\d/.test(l.say || l.text || ''), `Szene ${si + 1}, Zeile ${li + 1}: Ziffern im Sprechtext. Zahlen in "say" als Wörter ausschreiben`);
    need(!l.de || (Array.isArray(l.de) && l.de.every((x) => Array.isArray(x) && x.length === 2 && x.every((y) => typeof y === 'string' && y.length <= 40))), `Szene ${si + 1}, Zeile ${li + 1}: de muss eine Liste aus [englisch, deutsch]-Paaren sein`);
    need(l.text && l.text.length <= 190, `Szene ${si + 1}, Zeile ${li + 1}: Text fehlt oder ist länger als 190 Zeichen (${(l.text || '').length})`);
  });
  const svg = s.svg || '';
  for (const m of svg.matchAll(/data-(l|out)="(\d+)"/g)) {
    const k = Number(m[2]);
    need(m[1] === 'l' ? k < lines.length : k <= lines.length, `Szene ${si + 1}: data-${m[1]}="${k}" liegt hinter der letzten Zeile (${lines.length} Zeilen)`);
  }
  need(!/<script|\son\w+=|javascript:|<foreignObject|<image|href=/i.test(svg), `Szene ${si + 1}: SVG enthält nicht erlaubte Elemente (script, Events, Bilder, Links)`);
  need(!/url\(|@import|expression\(/i.test(s.css || ''), `Szene ${si + 1}: css darf nichts nachladen`);
  let quiz;
  if (s.quiz) {
    const q = s.quiz, o = q.options || [];
    need(q.q && q.q.length <= 170, `Szene ${si + 1}: Frage fehlt oder ist länger als 170 Zeichen`);
    need(o.length >= 3 && o.length <= 4, `Szene ${si + 1}: Frage braucht 3 oder 4 Antworten`);
    need(o.filter((x) => x.correct).length === 1, `Szene ${si + 1}: genau eine Antwort muss correct: true haben`);
    need(o.every((x) => x.text && x.text.length <= 95 && x.why && x.why.length >= 40), `Szene ${si + 1}: jede Antwort braucht text (höchstens 95 Zeichen) und why (mindestens 40 Zeichen)`);
    need(q.explain && q.explain.length >= 250, `Szene ${si + 1}: explain fehlt oder ist zu kurz (ausführliche Erklärung, mindestens 250 Zeichen)`);
    need(si < lesson.scenes.length - 1, 'Keine Frage an der letzten Szene');
    // Reihenfolge reproduzierbar mischen, damit die richtige Antwort nicht immer an derselben Stelle steht
    let seed = [...(id + ':' + si)].reduce((n, c) => (n * 31 + c.charCodeAt(0)) >>> 0, 7);
    const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    const mixed = o.map((x) => ({ x, k: rnd() })).sort((p, r) => p.k - r.k).map(({ x }) => ({ text: x.text, why: x.why, ...(x.correct ? { correct: true } : {}) }));
    quiz = { q: q.q, options: mixed, explain: q.explain };
  }
  return { title: s.title, svg: svg.replace(/\n\s*/g, '\n').trim(), css: s.css || '', lines, ...(quiz ? { quiz } : {}) };
});

// SVG-Wohlgeformtheit grob prüfen (Tag-Balance)
scenes.forEach((s, si) => {
  const stack = [];
  for (const m of s.svg.matchAll(/<(\/?)([a-zA-Z]+)([^>]*?)(\/?)>/g)) {
    if (m[1]) { const top = stack.pop(); if (top !== m[2]) errors.push(`Szene ${si + 1}: </${m[2]}> schließt <${top}>`); }
    else if (!m[4]) stack.push(m[2]);
  }
  if (stack.length) errors.push(`Szene ${si + 1}: nicht geschlossen: ${stack.join(', ')}`);
});
const termCount = scenes.reduce((n, s) => n + s.lines.reduce((m, l) => m + (l.de ? l.de.length : 0), 0), 0);
if (termCount < 6) errors.push(`nur ${termCount} deutsche Fachbegriffe (de: [[englisch, deutsch]] an den Zeilen); mindestens 6 je Folge`);
const quizCount = scenes.filter((s) => s.quiz).length;
if (quizCount < 2 || quizCount > 4) errors.push(`${quizCount} Verständnisfragen; 2 bis 4 je Folge (quiz an der Szene)`);
scenes.forEach((s, si) => { const n = s.lines.reduce((m, l) => m + (l.de ? l.de.length : 0), 0); if (n > 3) errors.push(`Szene ${si + 1}: ${n} Fachbegriffe, höchstens 3 je Szene`); });
if (errors.length) { console.error('Fehler:\n- ' + errors.join('\n- ')); process.exit(1); }

const say = (l) => l.say || l.text;

// ---------- Nur Sprechtext ausgeben ----------
if (flag('--narration')) {
  fs.mkdirSync(path.join(src, 'narration'), { recursive: true });
  fs.writeFileSync(path.join(src, 'narration.json'), JSON.stringify(scenes.map((s) => s.lines.map(say)), null, 1));
  scenes.forEach((s, i) => fs.writeFileSync(path.join(src, 'narration', `s${String(i + 1).padStart(2, '0')}.txt`), s.lines.map(say).join('\n\n') + '\n'));
  const chars = scenes.reduce((n, s) => n + s.lines.reduce((m, l) => m + say(l).length, 0), 0);
  console.log(`Sprechtext geschrieben: ${scenes.length} Szenen, ${chars} Zeichen`);
  process.exit(0);
}

// ---------- Ton ----------
const ff = (a) => spawnSync('ffmpeg', ['-hide_banner', '-nostdin', ...a], { encoding: 'utf8', maxBuffer: 1 << 26 });
const probe = (f) => Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], { encoding: 'utf8' }).trim());
const weight = (l) => say(l).length + 14;

function lineStarts(file, lines, dur) {
  const total = lines.reduce((n, l) => n + weight(l), 0);
  let acc = 0;
  const est = lines.map((l) => { const t = (acc / total) * dur; acc += weight(l); return t; });
  const res = ff(['-i', file, '-af', 'silencedetect=noise=-36dB:d=0.2', '-f', 'null', '-']);
  const sil = [...res.stderr.matchAll(/silence_end: ([\d.]+) \| silence_duration: ([\d.]+)/g)].map((m) => ({ end: Number(m[1]), len: Number(m[2]) }));
  const out = [0];
  for (let k = 1; k < lines.length; k++) {
    let best = null;
    for (const s of sil) {
      const t = s.end - 0.06;
      if (t <= out[k - 1] + 0.6 || t >= dur - 0.3) continue;
      const score = Math.abs(t - est[k]) - 2.2 * Math.min(s.len, 0.8);
      if (Math.abs(t - est[k]) < 3.2 && (!best || score < best.score)) best = { t, score };
    }
    out.push(best ? best.t : Math.max(est[k], out[k - 1] + 0.6));
  }
  return out;
}

const outDir = path.join(root, 'site', 'lessons', id);
fs.mkdirSync(outDir, { recursive: true });
const audioDir = path.join(src, 'audio');
const tmp = fs.mkdtempSync(path.join(process.env.TMPDIR || '/tmp', 'lesson-'));
let t0 = 0;
let hasAudio = !flag('--no-audio');
const parts = [];

scenes.forEach((s, i) => {
  const n = String(i + 1).padStart(2, '0');
  const file = ['.mp3', '.wav'].map((e) => path.join(audioDir, `s${n}${e}`)).find((f) => fs.existsSync(f));
  if (hasAudio && !file) { console.error(`Ton fehlt: content/${id}/audio/s${n}.mp3 (oder --no-audio)`); process.exit(1); }
  let starts, dur;
  if (hasAudio) {
    const wav = path.join(tmp, `s${n}.wav`);
    const r = ff(['-y', '-i', file, '-af', `loudnorm=I=-17:TP=-1.5:LRA=11,apad=pad_dur=${SCENE_GAP}`, '-ar', '24000', '-ac', '1', wav]);
    if (r.status !== 0) { console.error(r.stderr); process.exit(1); }
    dur = probe(wav);
    const exact = path.join(audioDir, `s${n}.json`);
    starts = fs.existsSync(exact) ? JSON.parse(fs.readFileSync(exact, 'utf8')).starts : lineStarts(wav, s.lines, dur - SCENE_GAP);
    if (starts.length !== s.lines.length) { console.error(`Szene ${n}: ${starts.length} Zeiten für ${s.lines.length} Zeilen`); process.exit(1); }
    parts.push(wav);
  } else {
    let acc = 0;
    starts = s.lines.map((l) => { const t = acc; acc += say(l).length / 15.5 + 0.45; return t; });
    dur = acc + SCENE_GAP;
  }
  s.lines = s.lines.map((l, k) => ({ t: Math.round((t0 + starts[k]) * 100) / 100, text: l.text, ...(l.de && l.de.length ? { de: l.de } : {}) }));
  s.t = Math.round(t0 * 100) / 100;
  t0 += dur;
});

if (hasAudio) {
  const list = path.join(tmp, 'list.txt');
  fs.writeFileSync(list, parts.map((p) => `file '${p}'`).join('\n'));
  const r = ff(['-y', '-f', 'concat', '-safe', '0', '-i', list, '-c:a', 'libmp3lame', '-b:a', '48k', '-ar', '24000', '-ac', '1', path.join(outDir, 'audio.mp3')]);
  if (r.status !== 0) { console.error(r.stderr); process.exit(1); }
  t0 = probe(path.join(outDir, 'audio.mp3'));
}
fs.rmSync(tmp, { recursive: true, force: true });

const duration = Math.round(t0 * 100) / 100;
const built = {
  id, date: lesson.date, area: lesson.area, series: lesson.series || '', episode: lesson.episode || 0,
  title: lesson.title, hook: lesson.hook, level: lesson.level || 2, poster: lesson.poster || 0,
  duration, audio: hasAudio ? 'audio.mp3' : '', voice: hasAudio ? (lesson.voice || '') : '',
  scenes, takeaways: lesson.takeaways || [], sources: lesson.sources || [],
};
fs.writeFileSync(path.join(outDir, 'lesson.json'), JSON.stringify(built));

// ---------- Übersicht ----------
const indexFile = path.join(root, 'site', 'lessons', 'index.json');
const index = fs.existsSync(indexFile) ? JSON.parse(fs.readFileSync(indexFile, 'utf8')) : { lessons: [] };
const planFile = path.join(root, 'content', 'plan.json');
const plan = fs.existsSync(planFile) ? JSON.parse(fs.readFileSync(planFile, 'utf8')) : { upcoming: [] };
const entry = { id, date: built.date, area: built.area, series: built.series, episode: built.episode, title: built.title, hook: built.hook, duration, audio: !!built.audio, voice: built.voice };
index.lessons = [entry, ...index.lessons.filter((l) => l.id !== id)].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
index.upcoming = plan.upcoming || [];
index.updated = new Date().toISOString();
fs.writeFileSync(indexFile, JSON.stringify(index, null, 1));

const mm = `${Math.floor(duration / 60)}:${String(Math.round(duration % 60)).padStart(2, '0')}`;
console.log(`Gebaut: ${id} · ${scenes.length} Szenen · ${mm} min · Ton: ${hasAudio ? 'ja' : 'nein'}`);
