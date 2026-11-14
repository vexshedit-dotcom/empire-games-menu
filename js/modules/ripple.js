/** Glowing ripple inside any element with class "ripple" + spark burst on the background. */
import { burst } from "./particles.js";

export function initRipple() {
  document.addEventListener(
    "pointerdown",
    (e) => {
      if (e.button > 0) return;
      burst(e.clientX, e.clientY);

      const target = e.target.closest(".ripple");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2.2;
      const wave = document.createElement("span");
      wave.className = "ripple-wave";
      wave.style.width = wave.style.height = `${size}px`;
      wave.style.left = `${e.clientX - rect.left}px`;
      wave.style.top = `${e.clientY - rect.top}px`;
      target.appendChild(wave);
      wave.addEventListener("animationend", () => wave.remove(), { once: true });
    },
    { passive: true }
  );
}
