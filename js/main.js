/** Entry point: wires every module together. */
import { applyLanguage, toggleLanguage, t } from "./modules/language.js";
import { applyTheme, toggleTheme } from "./modules/theme.js";
import { initParticles } from "./modules/particles.js";
import { initRipple } from "./modules/ripple.js";
import { initMusic, startMusic } from "./modules/music.js";
import { runLoader } from "./modules/loader.js";
import { currentRoute, onRouteChange, startRouter } from "./modules/router.js";
import { searchMenu } from "./modules/search.js";
import { renderHome, renderCategory, renderChips, renderSearch, linksHTML, findCategory } from "./modules/renderer.js";

const $ = (id) => document.getElementById(id);
const els = {
  app: $("app"),
  view: $("view"),
  chips: $("chips"),
  footerLinks: $("footerLinks"),
  searchbar: $("searchbar"),
  searchInput: $("searchInput"),
};

/* ---------- Rendering ---------- */
function swapView(html) {
  els.view.innerHTML = html;
  els.view.classList.remove("view-enter");
  void els.view.offsetWidth; // restart the enter animation
  els.view.classList.add("view-enter");
}

function render({ keepScroll = false } = {}) {
  const query = els.searchbar.hidden ? "" : els.searchInput.value.trim();
  const route = currentRoute();

  if (query) {
    els.chips.hidden = true;
    swapView(renderSearch(searchMenu(query)));
  } else if (route.name === "category" && findCategory(route.id)) {
    const cat = findCategory(route.id);
    els.chips.innerHTML = renderChips(cat.id);
    els.chips.hidden = !els.searchbar.hidden;
    swapView(renderCategory(cat));
    els.chips.querySelector(".is-active")?.scrollIntoView({ inline: "center", block: "nearest" });
  } else {
    els.chips.hidden = true;
    swapView(renderHome());
  }

  els.footerLinks.innerHTML = linksHTML();
  if (!keepScroll) window.scrollTo({ top: 0, behavior: "instant" });
}

/* ---------- Search ---------- */
function openSearch() {
  els.searchbar.hidden = false;
  els.chips.hidden = true;
  els.searchInput.focus();
}

function closeSearch() {
  els.searchInput.value = "";
  els.searchbar.hidden = true;
  render();
}

/* ---------- Small toast message ---------- */
let toastTimer;
function toast(message) {
  let el = document.querySelector(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-visible"), 2200);
}

/* ---------- Boot ---------- */
function init() {
  applyTheme();
  applyLanguage();
  initParticles($("particles"));
  initRipple();
  initMusic($("musicBtn"));

  $("themeBtn").addEventListener("click", toggleTheme);
  $("langBtn").addEventListener("click", toggleLanguage);
  $("searchBtn").addEventListener("click", () => (els.searchbar.hidden ? openSearch() : closeSearch()));
  $("searchClose").addEventListener("click", closeSearch);
  els.searchInput.addEventListener("input", () => render({ keepScroll: true }));
  els.searchInput.addEventListener("keydown", (e) => e.key === "Escape" && closeSearch());

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-soon]")) toast(t("linkSoon"));
  });
  document.addEventListener("langchange", () => render({ keepScroll: true }));

  onRouteChange(() => {
    if (!els.searchbar.hidden) {
      els.searchInput.value = "";
      els.searchbar.hidden = true;
    }
    render();
  });
  startRouter();

  render();
  els.app.hidden = false;

  runLoader().then(startMusic);
}

init();
