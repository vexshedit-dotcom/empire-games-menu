/**
 * Splash screen: animated progress while assets load, then a "Tap to enter" button.
 * Resolves when the user taps enter (that tap also unlocks audio).
 */
import { CONFIG } from "../config.js";

export function runLoader() {
  const loader = document.getElementById("loader");
  const bar = document.getElementById("loaderBar");
  const status = document.getElementById("loaderStatus");
  const enterBtn = document.getElementById("enterBtn");

  // Fake-smooth progress up to 90%, the rest when everything is ready.
  let progress = 0;
  const tick = setInterval(() => {
    progress = Math.min(90, progress + Math.random() * 18);
    bar.style.width = `${progress}%`;
  }, 220);

  const pageLoaded =
    document.readyState === "complete" ? Promise.resolve() : new Promise((r) => window.addEventListener("load", r, { once: true }));
  const fontsReady = document.fonts ? document.fonts.ready.catch(() => {}) : Promise.resolve();
  const minTime = new Promise((r) => setTimeout(r, CONFIG.loaderMinTime));

  return Promise.all([pageLoaded, fontsReady, minTime]).then(() => {
    clearInterval(tick);
    bar.style.width = "100%";
    return new Promise((resolve) => {
      setTimeout(() => {
        status.hidden = true;
        enterBtn.hidden = false;
        enterBtn.focus({ preventScroll: true });
      }, 350);
      enterBtn.addEventListener(
        "click",
        () => {
          loader.classList.add("is-done");
          setTimeout(() => loader.remove(), 800); // after the fade-out transition
          resolve();
        },
        { once: true }
      );
    });
  });
}
