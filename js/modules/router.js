/**
 * Tiny hash router so the phone's back button works:
 *   #/          → home
 *   #/c/<id>    → category page
 */
const listeners = [];

export function currentRoute() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  if (parts[0] === "c" && parts[1]) return { name: "category", id: decodeURIComponent(parts[1]) };
  return { name: "home" };
}

export function onRouteChange(fn) {
  listeners.push(fn);
}

export function startRouter() {
  window.addEventListener("hashchange", () => listeners.forEach((fn) => fn(currentRoute())));
}

export function goHome() {
  location.hash = "#/";
}
