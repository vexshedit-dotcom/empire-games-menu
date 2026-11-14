/**
 * Background canvas: glowing embers that rise slowly, plus a spark burst on every tap.
 * Pauses when the tab is hidden and respects "reduce motion".
 */
const COLORS = ["255,201,60", "242,120,58", "232,53,43", "255,244,230"];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

let canvas, ctx, w, h, dpr;
let embers = [];
let sparks = [];
let running = false;
let rafId = 0;

const rand = (a, b) => a + Math.random() * (b - a);
const pickColor = () => COLORS[(Math.random() * COLORS.length) | 0];

function makeEmber(fromBottom = false) {
  return {
    x: rand(0, w),
    y: fromBottom ? h + rand(0, 40) : rand(0, h),
    r: rand(0.8, 2.6),
    vy: rand(0.15, 0.55),
    sway: rand(0.3, 1.2),
    phase: rand(0, Math.PI * 2),
    alpha: rand(0.25, 0.85),
    color: pickColor(),
  };
}

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const target = Math.round(Math.min(70, (w * h) / 9000));
  while (embers.length < target) embers.push(makeEmber());
  embers.length = target;
}

function themeAlpha() {
  return parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--particle-alpha")) || 0.8;
}

let globalAlpha = 0.8;

/** A glowing dot: faint halo + bright core (cheaper than shadowBlur on phones). */
function dot(x, y, r, color, alpha) {
  ctx.fillStyle = `rgba(${color},${alpha * 0.18})`;
  ctx.beginPath();
  ctx.arc(x, y, r * 3.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = `rgba(${color},${alpha})`;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function draw(time) {
  ctx.clearRect(0, 0, w, h);
  ctx.globalCompositeOperation = document.documentElement.dataset.theme === "light" ? "source-over" : "lighter";

  for (const p of embers) {
    p.y -= p.vy;
    p.x += Math.sin(time / 1500 + p.phase) * 0.25 * p.sway;
    if (p.y < -10) Object.assign(p, makeEmber(true));
    const a = p.alpha * (0.75 + Math.sin(time / 400 + p.phase) * 0.25) * globalAlpha;
    dot(p.x, p.y, p.r, p.color, a);
  }

  for (let i = sparks.length - 1; i >= 0; i--) {
    const s = sparks[i];
    s.x += s.vx;
    s.y += s.vy;
    s.vy += 0.06;
    s.vx *= 0.97;
    s.life -= 0.022;
    if (s.life <= 0) {
      sparks.splice(i, 1);
      continue;
    }
    dot(s.x, s.y, s.r * s.life + 0.4, s.color, s.life);
  }

  if (running) rafId = requestAnimationFrame(draw);
}

function start() {
  if (running || reduceMotion) return;
  running = true;
  rafId = requestAnimationFrame(draw);
}

function stop() {
  running = false;
  cancelAnimationFrame(rafId);
}

/** Spark burst at screen coordinates. */
export function burst(x, y, count = 14) {
  if (reduceMotion || !ctx) return;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + rand(-0.2, 0.2);
    const speed = rand(1.5, 4);
    sparks.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1,
      r: rand(1.5, 3),
      life: 1,
      color: pickColor(),
    });
  }
}

export function initParticles(el) {
  canvas = el;
  ctx = canvas.getContext("2d");
  globalAlpha = themeAlpha();
  resize();
  window.addEventListener("resize", resize);
  document.addEventListener("themechange", () => (globalAlpha = themeAlpha()));
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
  start();
}
