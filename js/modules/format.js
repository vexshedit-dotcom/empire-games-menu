/** Formatting & small DOM helpers shared by the renderers. */
import { CONFIG } from "../config.js";
import { getLang } from "./language.js";

const numberFmt = new Intl.NumberFormat("en-US");

export const formatNumber = (n) => numberFmt.format(n);

/** Price as HTML: <span class="price">5,000 <small>IQD</small></span> */
export function priceHTML(amount, label = "") {
  const cur = CONFIG.currency[getLang()];
  return `<span class="price">${label ? `<span class="price__label">${escapeHTML(label)}</span>` : ""}<span class="num">${formatNumber(amount)}</span><span class="price__cur">${cur}</span></span>`;
}

/** Plain-text price, used inside sentences (notes). */
export const priceText = (amount) => `${formatNumber(amount)} ${CONFIG.currency[getLang()]}`;

const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export const escapeHTML = (s) => String(s).replace(/[&<>"']/g, (c) => ESC[c]);
