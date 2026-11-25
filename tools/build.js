/**
 * Production build: `npm run build` → dist/
 * Bundles and inlines all JS and CSS into one small index.html, so a phone needs a
 * single request to show the menu. Logo and font get a content hash in their names
 * (cached forever), and a service worker makes repeat visits instant / offline-ready.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const esbuild = require("esbuild");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const hash = (data) => crypto.createHash("sha256").update(data).digest("hex").slice(0, 8);

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(path.join(DIST, "a"), { recursive: true });

/* ---------- Hashed static files ---------- */
const renames = {};
const core = ["assets/images/logo.webp", "assets/images/icon.png", "assets/fonts/cairo.woff2"];
const photos = fs.readdirSync(path.join(ROOT, "assets/images/menu")).map((f) => `assets/images/menu/${f}`);
for (const file of [...core, ...photos]) {
  const data = fs.readFileSync(path.join(ROOT, file));
  const { name, ext } = path.parse(file);
  renames[file] = `a/${name}.${hash(data)}${ext}`;
  fs.writeFileSync(path.join(DIST, renames[file]), data);
}
const rewrite = (text) =>
  Object.entries(renames).reduce((out, [from, to]) => out.replaceAll(`../${from}`, to).replaceAll(from, to), text);

/* ---------- Bundle ---------- */
let html = read("index.html");

const cssFiles = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)" \/>/g)].map((m) => m[1]);
const css = esbuild.transformSync(cssFiles.map(read).join("\n"), { loader: "css", minify: true, target: ["safari14", "chrome87"] }).code;
const js = esbuild.buildSync({
  entryPoints: [path.join(ROOT, "js/main.js")],
  bundle: true,
  minify: true,
  format: "iife",
  charset: "utf8",
  target: "es2019",
  write: false,
}).outputFiles[0].text.replaceAll("</script", "<\/script");

const register = `if("serviceWorker"in navigator)addEventListener("load",()=>navigator.serviceWorker.register("sw.js"))`;

html = html
  .replace(/\s*<link rel="stylesheet" href="[^"]+" \/>/g, "")
  .replace(/<!--[\s\S]*?-->/g, "")
  .replace("</head>", () => `<style>${css}</style></head>`)
  .replace('<script type="module" src="js/main.js"></script>', () => `<script>${js}${register}</script>`)
  .replace(/>\s*\n\s*</g, "><");
html = rewrite(html);
fs.writeFileSync(path.join(DIST, "index.html"), html);

/* ---------- Service worker ---------- */
const sw = read("tools/sw.template.js")
  .replace("__VERSION__", hash(html))
  .replace("__PHOTOS__", JSON.stringify(photos.map((f) => renames[f])))
  .replace("__FILES__", JSON.stringify(["./", ...core.map((f) => renames[f])]));
fs.writeFileSync(path.join(DIST, "sw.js"), sw);

/* ---------- Hosting config ---------- */
fs.copyFileSync(path.join(ROOT, "tools/vercel.json"), path.join(DIST, "vercel.json"));
// Keep the link to the Vercel project (created once by `vercel link`).
const link = path.join(ROOT, ".vercel/project.json");
if (fs.existsSync(link)) {
  fs.mkdirSync(path.join(DIST, ".vercel"), { recursive: true });
  fs.copyFileSync(link, path.join(DIST, ".vercel/project.json"));
}

console.log(`dist/index.html ${(html.length / 1024).toFixed(1)} KB, gzip ${(require("zlib").gzipSync(html).length / 1024).toFixed(1)} KB`);
