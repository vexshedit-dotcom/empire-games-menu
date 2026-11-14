/** Language: current language, translations (t), and RTL/LTR switching. */
import { STRINGS } from "../i18n/strings.js";
import { CONFIG } from "../config.js";
import { storage } from "./storage.js";

const SUPPORTED = Object.keys(STRINGS);
let lang = storage.get("lang", CONFIG.defaults.lang);
if (!SUPPORTED.includes(lang)) lang = CONFIG.defaults.lang;

export const getLang = () => lang;

/** Translate a key, replacing {placeholders} with values from `vars`. */
export function t(key, vars = {}) {
  const text = STRINGS[lang][key] ?? STRINGS[CONFIG.defaults.lang][key] ?? key;
  return text.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
}

/** Pick the current-language value from a { ar, en } object. */
export const pick = (obj) => (obj ? obj[lang] ?? obj[CONFIG.defaults.lang] : "");

/** Pick the other language (shown as a small secondary line). */
export const pickAlt = (obj) => (obj ? obj[lang === "ar" ? "en" : "ar"] : "");

/** Update static texts marked with data-i18n / data-i18n-attr / data-brand. */
export function applyLanguage(root = document) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";
  document.title = `${pick(CONFIG.brand.name)} | Menu`;

  root.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  // Format: data-i18n-attr="placeholder:search,aria-label:searchTitle"
  root.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    el.dataset.i18nAttr.split(",").forEach((pair) => {
      const [attr, key] = pair.split(":").map((s) => s.trim());
      el.setAttribute(attr, t(key));
    });
  });

  root.querySelectorAll("[data-brand]").forEach((el) => {
    el.textContent = pick(CONFIG.brand[el.dataset.brand]);
  });
}

export function toggleLanguage() {
  lang = lang === "ar" ? "en" : "ar";
  storage.set("lang", lang);
  applyLanguage();
  document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
}
