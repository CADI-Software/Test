#!/usr/bin/env python3
"""Kostenlose Ersatzstimme (Piper "Thorsten", läuft lokal ohne Konto).

Aufruf:  python3 tools/tts_piper.py <lesson-id>
Liest   content/<id>/narration.json   (von `node tools/build.mjs <id> --narration`)
Schreibt content/<id>/audio/sNN.wav und sNN.json (exakte Startzeiten jeder Zeile).

Einmalige Einrichtung pro Container:
  pip install sherpa-onnx soundfile numpy
  Modell: https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/vits-piper-de_DE-thorsten-high.tar.bz2
  entpacken und den Ordner per PIPER_DIR angeben.
"""
import json
import os
import sys

import numpy as np
import sherpa_onnx
import soundfile as sf

root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
lesson_id = sys.argv[1]
model_dir = os.environ.get("PIPER_DIR", "/tmp/piper/vits-piper-de_DE-thorsten-high")
onnx = [f for f in os.listdir(model_dir) if f.endswith(".onnx")][0]

cfg = sherpa_onnx.OfflineTtsConfig(
    model=sherpa_onnx.OfflineTtsModelConfig(
        vits=sherpa_onnx.OfflineTtsVitsModelConfig(
            model=os.path.join(model_dir, onnx),
            tokens=os.path.join(model_dir, "tokens.txt"),
            data_dir=os.path.join(model_dir, "espeak-ng-data"),
        ),
        num_threads=4,
    )
)
tts = sherpa_onnx.OfflineTts(cfg)

base = os.path.join(root, "content", lesson_id)
scenes = json.load(open(os.path.join(base, "narration.json"), encoding="utf-8"))
out = os.path.join(base, "audio")
os.makedirs(out, exist_ok=True)
GAP = 0.38  # Pause zwischen zwei Zeilen in Sekunden

for i, lines in enumerate(scenes, 1):
    chunks, starts, t, sr = [], [], 0.0, 22050
    for line in lines:
        audio = tts.generate(line, sid=0, speed=float(os.environ.get("PIPER_SPEED", "0.9")))
        sr = audio.sample_rate
        samples = np.asarray(audio.samples, dtype=np.float32)
        starts.append(round(t, 3))
        chunks += [samples, np.zeros(int(GAP * sr), dtype=np.float32)]
        t += len(samples) / sr + GAP
    name = os.path.join(out, f"s{i:02d}")
    sf.write(name + ".wav", np.concatenate(chunks), sr)
    json.dump({"starts": starts}, open(name + ".json", "w"))
    print(f"s{i:02d}: {len(lines)} Zeilen, {t:.1f}s")
