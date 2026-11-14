/** Searches every item in both languages (Arabic letters are normalised, e.g. أ/إ/آ → ا). */
import { MENU } from "../data/menu.js";

const normalize = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[ً-ٟـ]/g, "") // diacritics & tatweel
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/ê/g, "e")
    .trim();

// Build the index once.
const INDEX = MENU.flatMap((cat) =>
  cat.groups.flatMap((group) =>
    group.items.map((item) => ({
      item,
      cat,
      group,
      text: normalize([item.ar, item.en, cat.name.ar, cat.name.en].join(" ")),
    }))
  )
);

/** Returns matching entries; every word of the query must appear. */
export function searchMenu(query) {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return INDEX.filter((entry) => words.every((w) => entry.text.includes(w)));
}
