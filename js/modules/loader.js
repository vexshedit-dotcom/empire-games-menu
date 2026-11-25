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
  }, 110);

  const pageLoaded =
    document.readyState === "complete" ? Promise.resolve() : new Promise((r) => window.addEventListener("load", r, { once: true }));
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  // The menu itself is already in the page, so a slow network never blocks the visitor.
  const ready = Promise.race([pageLoaded, wait(CONFIG.loaderMaxWait)]);

  return Promise.all([ready, wait(CONFIG.loaderMinTime)]).then(() => {
    clearInterval(tick);
    bar.style.width = "100%";
    loader.classList.add("is-ready");
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
