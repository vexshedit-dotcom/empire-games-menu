/**
 * Page: fresh copy from the network, but if it takes longer than 1.5s the saved copy
 * is shown immediately. Hashed files (a/…) never change, so they come from the cache.
 */
const CACHE = "empire-__VERSION__";
const FILES = __FILES__;

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("empire-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function page(event) {
  const cache = await caches.open(CACHE);
  const network = fetch(event.request).then(async (res) => {
    if (res.ok) await cache.put("./", res.clone());
    return res;
  });
  event.waitUntil(network.catch(() => {}));

  const saved = await cache.match("./");
  if (!saved) return network;
  const timeout = new Promise((r) => setTimeout(() => r(saved), 1500));
  return Promise.race([network.catch(() => saved), timeout]);
}

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  if (e.request.mode === "navigate") e.respondWith(page(e));
  else if (url.pathname.includes("/a/")) e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request)));
});
