/** Light / dark theme, remembered between visits. */
import { CONFIG } from "../config.js";
import { storage } from "./storage.js";

const THEME_COLORS = { dark: "#120906", light: "#fff8ef" };
let theme = storage.get("theme", CONFIG.defaults.theme);
if (!THEME_COLORS[theme]) theme = CONFIG.defaults.theme;

export const getTheme = () => theme;

export function applyTheme() {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
}

export function toggleTheme() {
  theme = theme === "dark" ? "light" : "dark";
  storage.set("theme", theme);
  applyTheme();
  document.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
}
