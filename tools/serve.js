/**
 * Zero-dependency local server for development: `npm start`
 * Opens on http://localhost:5173 and is reachable from phones on the same Wi-Fi.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const ROOT = path.resolve(__dirname, "..");
const PORT = Number(process.env.PORT) || 5173;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".mp3": "audio/mpeg",
  ".ogg": "audio/ogg",
};

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let file = path.join(ROOT, urlPath === "/" ? "index.html" : urlPath);
    if (!file.startsWith(ROOT)) {
      res.writeHead(403).end();
      return;
    }
    fs.stat(file, (err, stat) => {
      if (!err && stat.isDirectory()) file = path.join(file, "index.html");
      fs.readFile(file, (err2, data) => {
        if (err2) {
          res.writeHead(404, { "Content-Type": "text/plain" }).end("Not found");
          return;
        }
        res.writeHead(200, {
          "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream",
          "Cache-Control": "no-cache",
        });
        res.end(data);
      });
    });
  })
  .listen(PORT, () => {
    console.log(`\n  Empire Games menu running:\n  → http://localhost:${PORT}`);
    for (const list of Object.values(os.networkInterfaces())) {
      for (const net of list || []) {
        if (net.family === "IPv4" && !net.internal) console.log(`  → http://${net.address}:${PORT}  (phone on same Wi-Fi)`);
      }
    }
    console.log("");
  });
