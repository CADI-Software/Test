#!/usr/bin/env python3
"""Kostenlose englische Stimmen (Kokoro, läuft lokal ohne Konto).

Aufruf:  KOKORO_DIR=<Modellordner> python3 tools/tts_kokoro.py <lesson-id> <female|male>
Liest   content/<id>/narration.json   (von `node tools/build.mjs <id> --narration`)
Schreibt content/<id>/audio/sNN.wav und sNN.json (exakte Startzeiten jeder Zeile).

Einmalige Einrichtung pro Container:
  pip install "sherpa-onnx<2" soundfile numpy
  Modell (ca. 330 MB): kokoro.modelUrl aus config.json laden und entpacken, Ordner per KOKORO_DIR angeben.
"""
import json
import os
import sys

import numpy as np
import sherpa_onnx
import soundfile as sf

root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
lesson_id, voice = sys.argv[1], sys.argv[2]
cfg_file = json.load(open(os.path.join(root, "config.json"), encoding="utf-8"))["kokoro"]
sid = cfg_file["voices"][voice]["sid"]
speed = float(cfg_file.get("speed", 1.0))
d = os.environ.get("KOKORO_DIR", "/tmp/kokoro/kokoro-multi-lang-v1_0")

tts = sherpa_onnx.OfflineTts(sherpa_onnx.OfflineTtsConfig(model=sherpa_onnx.OfflineTtsModelConfig(
    kokoro=sherpa_onnx.OfflineTtsKokoroModelConfig(
        model=d + "/model.onnx", voices=d + "/voices.bin", tokens=d + "/tokens.txt",
        data_dir=d + "/espeak-ng-data", dict_dir=d + "/dict",
        lexicon=d + "/lexicon-us-en.txt," + d + "/lexicon-zh.txt"),
    num_threads=4)))

base = os.path.join(root, "content", lesson_id)
scenes = json.load(open(os.path.join(base, "narration.json"), encoding="utf-8"))
out = os.path.join(base, "audio")
os.makedirs(out, exist_ok=True)
GAP = 0.38  # Pause zwischen zwei Zeilen in Sekunden
total = 0.0

for i, lines in enumerate(scenes, 1):
    chunks, starts, t, sr = [], [], 0.0, 24000
    for line in lines:
        audio = tts.generate(line, sid=sid, speed=speed)
        sr = audio.sample_rate
        samples = np.asarray(audio.samples, dtype=np.float32)
        if len(samples) == 0:
            sys.exit(f"Szene {i}: kein Ton für Zeile: {line}")
        starts.append(round(t, 3))
        chunks += [samples, np.zeros(int(GAP * sr), dtype=np.float32)]
        t += len(samples) / sr + GAP
    name = os.path.join(out, f"s{i:02d}")
    sf.write(name + ".wav", np.concatenate(chunks), sr)
    json.dump({"starts": starts}, open(name + ".json", "w"))
    total += t
    print(f"s{i:02d}: {len(lines)} Zeilen, {t:.1f}s")
print(f"Gesamt: {total / 60:.1f} min, Stimme: {voice}")
