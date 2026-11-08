// Usage: npm run build && node scripts/check-size.mjs

import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";

/** 1 KB = 1024 bytes. Budgets compare gzip byte length against these limits. */
const BYTES_PER_KB = 1024;
const MAX_JS_GZIP_KB = 30;
const MAX_CSS_GZIP_KB = 15;
const MAX_ASSETS_GZIP_KB = 30;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const assetsDir = path.join(distDir, "assets");
const indexFile = path.join(distDir, "index.html");

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function assertPath(filePath, kind) {
  try {
    const stats = statSync(filePath);
    if (kind === "file" && !stats.isFile()) fail(`${path.relative(root, filePath)} is not a file.`);
    if (kind === "dir" && !stats.isDirectory()) fail(`${path.relative(root, filePath)} is not a directory.`);
  } catch {
    fail(`${path.relative(root, filePath)} is missing. Run npm run build first.`);
  }
}

function listAssets(extension) {
  return readdirSync(assetsDir)
    .filter((name) => name.endsWith(extension))
    .sort()
    .map((name) => path.join(assetsDir, name));
}

function measure(filePath) {
  const raw = readFileSync(filePath);
  const gzip = gzipSync(raw);
  return {
    file: path.relative(root, filePath),
    raw: raw.length,
    gzip: gzip.length,
  };
}

function sum(rows, key) {
  return rows.reduce((total, row) => total + row[key], 0);
}

function kb(bytes) {
  return `${(bytes / BYTES_PER_KB).toFixed(2)} KB`;
}

function pad(value, width, alignRight) {
  const text = String(value);
  if (text.length >= width) return text;
  const space = " ".repeat(width - text.length);
  return alignRight ? space + text : text + space;
}

function printTable(rows) {
  const header = ["file", "raw", "gzip", "gzip KB"];
  const body = rows.map((row) => [row.label, `${row.raw} B`, `${row.gzip} B`, kb(row.gzip)]);
  const widths = header.map((cell, index) =>
    Math.max(cell.length, ...body.map((line) => line[index].length)),
  );

  const format = (cells) => cells.map((cell, index) => pad(cell, widths[index], index > 0)).join("  ");
  console.log(format(header));
  for (const line of body) console.log(format(line));
}

assertPath(indexFile, "file");
assertPath(assetsDir, "dir");

const html = [measure(indexFile)];
const css = listAssets(".css").map(measure);
const js = listAssets(".js").map(measure);

const htmlRaw = sum(html, "raw");
const htmlGzip = sum(html, "gzip");
const cssRaw = sum(css, "raw");
const cssGzip = sum(css, "gzip");
const jsRaw = sum(js, "raw");
const jsGzip = sum(js, "gzip");
const assetsRaw = cssRaw + jsRaw;
const assetsGzip = cssGzip + jsGzip;

console.log("Production size report (gzip = zlib.gzipSync per file; totals sum those sizes)");
console.log("");
printTable([...html, ...css, ...js].map((row) => ({ label: row.file, raw: row.raw, gzip: row.gzip })));
console.log("");
console.log("Totals");
printTable([
  { label: "html", raw: htmlRaw, gzip: htmlGzip },
  { label: "css", raw: cssRaw, gzip: cssGzip },
  { label: "js", raw: jsRaw, gzip: jsGzip },
  { label: "assets (js+css)", raw: assetsRaw, gzip: assetsGzip },
]);
console.log("");

const failures = [];
if (jsGzip > MAX_JS_GZIP_KB * BYTES_PER_KB) {
  failures.push(`JS gzip ${kb(jsGzip)} exceeds ${MAX_JS_GZIP_KB} KB`);
}
if (cssGzip > MAX_CSS_GZIP_KB * BYTES_PER_KB) {
  failures.push(`CSS gzip ${kb(cssGzip)} exceeds ${MAX_CSS_GZIP_KB} KB`);
}
if (assetsGzip > MAX_ASSETS_GZIP_KB * BYTES_PER_KB) {
  failures.push(`assets (js+css) gzip ${kb(assetsGzip)} exceeds ${MAX_ASSETS_GZIP_KB} KB`);
}

if (failures.length > 0) {
  console.error("FAIL");
  for (const line of failures) console.error(`- ${line}`);
  process.exit(1);
}

console.log("PASS");
