/**
 * Builds the HTML for every view from the MENU data.
 * Each item "kind" has its own small render function, so new display
 * styles can be added without touching the others.
 */
import { MENU, SIZES } from "../data/menu.js";
import { CONFIG } from "../config.js";
import { t, pick, pickAlt } from "./language.js";
import { priceHTML, priceText, escapeHTML as esc, formatNumber } from "./format.js";

const ICONS = {
  back: '<svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>',
  pin: '<svg viewBox="0 0 24 24"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  insta:
    '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6"/></svg>',
};

/* ---------- helpers ---------- */
export const findCategory = (id) => MENU.find((c) => c.id === id);
const countItems = (cat) => cat.groups.reduce((n, g) => n + g.items.length, 0);

/* ---------- shared pieces ---------- */
export function linksHTML() {
  const link = (url, cls, icon, key) =>
    url
      ? `<a class="link-btn ${cls} ripple" href="${esc(url)}" target="_blank" rel="noopener">${icon}<span>${t(key)}</span></a>`
      : `<button type="button" class="link-btn ${cls} is-disabled ripple" data-soon>${icon}<span>${t(key)}</span></button>`;
  return (
    link(CONFIG.links.maps, "link-btn--maps", ICONS.pin, "location") +
    link(CONFIG.links.instagram, "link-btn--insta", ICONS.insta, "instagram")
  );
}

export function renderChips(activeId) {
  return MENU.map(
    (c) =>
      `<a class="chip ripple${c.id === activeId ? " is-active" : ""}" href="#/c/${c.id}" data-id="${c.id}"><span>${c.icon}</span>${esc(pick(c.name))}</a>`
  ).join("");
}

/* ---------- Home ---------- */
export function renderHome() {
  const cards = MENU.map((c) => {
    if (c.partner) {
      return `
        <a class="cat-card cat-card--partner ripple" href="#/c/${c.id}">
          <span class="cat-card__icon">${c.icon}</span>
          <span class="cat-card__text">
            <span class="badge">★ ${t("partner")}</span>
            <span class="cat-card__name">${esc(pick(c.name))}</span>
            <span class="cat-card__count"><span class="num">${countItems(c)}</span> ${t("items")}</span>
          </span>
        </a>`;
    }
    return `
      <a class="cat-card ripple" href="#/c/${c.id}">
        <span class="cat-card__icon">${c.icon}</span>
        <span class="cat-card__name">${esc(pick(c.name))}</span>
        <span class="cat-card__count"><span class="num">${countItems(c)}</span> ${t("items")}</span>
      </a>`;
  }).join("");

  return `
    <section class="hero">
      <img class="hero__logo" src="${CONFIG.brand.logo}" alt="${esc(pick(CONFIG.brand.name))}" />
      <p class="hero__welcome">${t("welcome")}</p>
      <h1 class="hero__title gradient-text">${esc(pick(CONFIG.brand.name))}</h1>
      <p class="hero__tagline">${esc(pick(CONFIG.brand.tagline))}</p>
      <div class="hero__links">${linksHTML()}</div>
    </section>
    <h2 class="section-title">${t("chooseCategory")}</h2>
    <div class="cat-grid">${cards}</div>`;
}

/* ---------- Item renderers ---------- */
function itemInfo(item, extraMeta = "") {
  const alt = pickAlt(item);
  return `
    <div class="item__info">
      <span class="item__name">${esc(pick(item))}</span>
      ${alt ? `<span class="item__alt">${esc(alt)}</span>` : ""}
      ${item.desc ? `<span class="item__desc">${esc(pick(item.desc))}</span>` : ""}
      ${extraMeta ? `<div class="item__meta">${extraMeta}</div>` : ""}
    </div>`;
}

/** Compact hookah prices (used in search results). */
const hookahPrices = (item) =>
  item.woodOnly
    ? priceHTML(item.price, t("wood"))
    : priceHTML(item.price, t("babylon")) + priceHTML(item.price + CONFIG.hookah.germanExtra, t("german"));

function standardItem(item, i, extraMeta = "", pricesOverride) {
  const meta = (item.meal ? `<span class="tag">🍟 ${t("mealBadge", { extra: formatNumber(CONFIG.meal.extra) })}</span>` : "") + extraMeta;
  const prices =
    pricesOverride ??
    (item.sizes ? item.sizes.map((s) => priceHTML(s.price, pick(SIZES[s.size]))).join("") : priceHTML(item.price));
  return `
    <li class="item ripple" style="--i:${i}">
      ${itemInfo(item, meta)}
      <div class="prices">${prices}</div>
    </li>`;
}

function hookahItem(item, i) {
  const rows = item.woodOnly
    ? `<div class="hookah__row hookah__row--wood"><span>${t("wood")}</span><b class="num">${formatNumber(item.price)}</b></div>`
    : `<div class="hookah__row"><span>${t("babylon")}</span><b class="num">${formatNumber(item.price)}</b></div>
       <div class="hookah__row"><span>${t("german")}</span><b class="num">${formatNumber(item.price + CONFIG.hookah.germanExtra)}</b></div>`;
  return `
    <li class="hookah${item.woodOnly ? " hookah--wood" : ""} ripple" style="--i:${i}">
      <span class="hookah__smoke" aria-hidden="true">💨</span>
      <span class="hookah__name">${esc(pick(item))}</span>
      <span class="hookah__alt">${esc(pickAlt(item))}</span>
      ${item.woodOnly ? `<span class="tag tag--wood">🪵 ${t("woodOnly")}</span>` : ""}
      <div class="hookah__prices">${rows}</div>
    </li>`;
}

function groupHTML(cat, group, startIndex) {
  const isHookah = cat.type === "hookah";
  const items = group.items
    .map((item, i) => (isHookah ? hookahItem(item, startIndex + i) : standardItem(item, startIndex + i)))
    .join("");
  const title = group.name
    ? `<h3 class="group__title">${group.icon ? `<span>${group.icon}</span>` : ""}${esc(pick(group.name))}<span class="gradient-bar"></span></h3>`
    : "";
  return `<section class="group">${title}<ul class="items${isHookah ? " items--hookah" : ""}">${items}</ul></section>`;
}

function notesHTML(cat) {
  const notes = [];
  if (cat.type === "hookah") {
    notes.push(["💨", t("hookahNote", { extra: priceText(CONFIG.hookah.germanExtra) })]);
  }
  if (cat.groups.some((g) => g.items.some((it) => it.meal))) {
    notes.push(["🍟", t("mealNote", { extra: priceText(CONFIG.meal.extra) })]);
  }
  return notes.map(([icon, text]) => `<div class="note"><span class="note__icon">${icon}</span><span>${esc(text)}</span></div>`).join("");
}

/* ---------- Category page ---------- */
export function renderCategory(cat) {
  let index = 0;
  const groups = cat.groups
    .map((g) => {
      const html = groupHTML(cat, g, index);
      index += g.items.length;
      return html;
    })
    .join("");

  return `
    <div class="cat-head">
      <a class="icon-btn back-btn ripple" href="#/" aria-label="${t("back")}">${ICONS.back}</a>
      <span class="cat-head__icon">${cat.icon}</span>
      <div>
        <h1 class="cat-head__title">${esc(pick(cat.name))}</h1>
        <span class="cat-head__count"><span class="num">${countItems(cat)}</span> ${t("items")}${cat.partner ? ` • ★ ${t("partner")}` : ""}</span>
      </div>
    </div>
    ${notesHTML(cat)}
    ${groups}`;
}

/* ---------- Search results ---------- */
export function renderSearch(results) {
  if (!results.length) {
    return `<div class="empty"><div class="empty__icon">🔍</div>${t("noResults")}</div>`;
  }
  const items = results
    .map(({ item, cat, group }, i) => {
      const where = `<span class="search-result__cat">${cat.icon} ${esc(pick(cat.name))}${group.name ? ` • ${esc(pick(group.name))}` : ""}</span>`;
      const prices = cat.type === "hookah" ? hookahPrices(item) : undefined;
      return standardItem(item, i, where, prices);
    })
    .join("");
  return `<h2 class="section-title">${t("searchTitle")} <span class="num">(${results.length})</span></h2><ul class="items">${items}</ul>`;
}
