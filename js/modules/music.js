/**
 * Calm background music.
 * - If CONFIG.music.file is set, that audio file is looped.
 * - Otherwise a soft ambient piece is generated live with the Web Audio API
 *   (no file to download, no copyright issues).
 * Browsers only allow sound after a user tap, so music starts from the "Tap to enter" button.
 */
import { CONFIG } from "../config.js";
import { storage } from "./storage.js";

let enabled = storage.get("music", true);
let started = false; // the user has entered the site (sound is allowed)
let playing = false;
let engine = null;
let button = null;

/* ---------- Engine 1: audio file ---------- */
function fileEngine(src) {
  const audio = new Audio(src);
  audio.loop = true;
  audio.volume = CONFIG.music.volume;
  audio.preload = "auto";
  return {
    play: () => audio.play().catch(() => {}),
    pause: () => audio.pause(),
  };
}

/* ---------- Engine 2: generated ambient music ---------- */
function ambientEngine() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;

  const ctx = new AC();
  const rand = (a, b) => a + Math.random() * (b - a);
  const hz = (midi) => 440 * 2 ** ((midi - 69) / 12);

  // Signal chain: voices → low-pass → (dry + reverb) → master → compressor → speakers
  const master = ctx.createGain();
  master.gain.value = 0;
  const comp = ctx.createDynamicsCompressor();
  master.connect(comp).connect(ctx.destination);

  const reverb = ctx.createConvolver();
  reverb.buffer = makeImpulse(ctx, 3.5, 2.4);
  const wet = ctx.createGain();
  wet.gain.value = 0.6;
  reverb.connect(wet).connect(master);

  const dry = ctx.createGain();
  dry.gain.value = 0.55;
  dry.connect(master);

  const tone = ctx.createBiquadFilter();
  tone.type = "lowpass";
  tone.frequency.value = 1300;
  tone.Q.value = 0.4;
  tone.connect(dry);
  tone.connect(reverb);

  // Am7 → Fmaj7 → Cmaj7 → G(add9): warm, relaxed loop
  const CHORDS = [
    [57, 60, 64, 67],
    [53, 57, 60, 64],
    [48, 52, 55, 59],
    [55, 59, 62, 69],
  ];
  const MELODY = [69, 72, 74, 76, 79, 81, 84]; // A minor pentatonic
  const CHORD_LEN = 8; // seconds

  let step = 0;
  let nextTime = 0;
  let timer = null;

  function pad(freq, t, dur, vol = 0.06) {
    [
      ["sine", 0, vol],
      ["triangle", 6, vol * 0.4],
    ].forEach(([type, detune, v]) => {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = freq;
      osc.detune.value = detune;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(v, t + 2.5);
      g.gain.setValueAtTime(v, t + dur - 1);
      g.gain.linearRampToValueAtTime(0, t + dur + 1.5);
      osc.connect(g).connect(tone);
      osc.start(t);
      osc.stop(t + dur + 1.6);
    });
  }

  function pluck(freq, t) {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.05, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
    osc.connect(g).connect(tone);
    osc.start(t);
    osc.stop(t + 2.5);
  }

  // Look-ahead scheduler: always keeps ~1s of music queued.
  function schedule() {
    while (nextTime < ctx.currentTime + 1) {
      const chord = CHORDS[step % CHORDS.length];
      chord.forEach((n) => pad(hz(n), nextTime, CHORD_LEN));
      pad(hz(chord[0] - 12), nextTime, CHORD_LEN, 0.07); // bass

      const notes = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < notes; i++) {
        if (Math.random() < 0.75) {
          const n = MELODY[Math.floor(Math.random() * MELODY.length)];
          pluck(hz(n), nextTime + (i * CHORD_LEN) / notes + rand(0, 0.4));
        }
      }
      nextTime += CHORD_LEN;
      step++;
    }
  }

  return {
    play() {
      ctx.resume();
      if (nextTime < ctx.currentTime) nextTime = ctx.currentTime + 0.1;
      schedule();
      clearInterval(timer);
      timer = setInterval(schedule, 400);
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(CONFIG.music.volume, ctx.currentTime, 0.8);
    },
    pause() {
      clearInterval(timer);
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.25);
      setTimeout(() => {
        if (!playing) ctx.suspend();
      }, 1200);
    },
  };
}

/** Synthetic reverb impulse (decaying stereo noise). */
function makeImpulse(ctx, seconds, decay) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len) ** decay;
  }
  return buf;
}

/* ---------- Public API ---------- */
function getEngine() {
  if (!engine) engine = CONFIG.music.file ? fileEngine(CONFIG.music.file) : ambientEngine();
  return engine;
}

function updateButton() {
  button?.classList.toggle("is-on", enabled);
  button?.setAttribute("aria-pressed", String(enabled));
}

function play() {
  if (playing || !getEngine()) return;
  playing = true;
  engine.play();
}

function pause() {
  if (!playing) return;
  playing = false;
  engine.pause();
}

export function initMusic(btn) {
  button = btn;
  updateButton();
  btn.addEventListener("click", toggleMusic);
  // Pause when the phone screen locks / tab is hidden, resume when back.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pause();
    else if (started && enabled) play();
  });
}

/** Must be called from a user gesture (the "Tap to enter" button). */
export function startMusic() {
  started = true;
  if (enabled) play();
}

export function toggleMusic() {
  enabled = !enabled;
  storage.set("music", enabled);
  updateButton();
  started = true;
  enabled ? play() : pause();
}
