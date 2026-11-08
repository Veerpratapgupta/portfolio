// Usage: SITE_URL=https://your-domain.tld node scripts/generate-sitemap.mjs

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const USAGE = "SITE_URL=https://your-domain.tld node scripts/generate-sitemap.mjs";

function fail(message) {
  console.error(`Error: ${message}`);
  console.error(`Usage: ${USAGE}`);
  process.exit(1);
}

function isoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

const rawSiteUrl = process.env.SITE_URL;
if (rawSiteUrl == null || rawSiteUrl.trim() === "") {
  fail("SITE_URL is required.");
}

let parsed;
try {
  parsed = new URL(rawSiteUrl.trim());
} catch {
  fail(`SITE_URL must be an absolute http(s) URL. Received: ${JSON.stringify(rawSiteUrl)}`);
}

if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
  fail(`SITE_URL must use http or https. Received: ${JSON.stringify(rawSiteUrl)}`);
}

const loc = `${rawSiteUrl.trim().replace(/\/+$/, "")}/`;
const lastmod = isoDate(new Date());
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outFile = path.join(root, "public", "sitemap.xml");

mkdirSync(path.dirname(outFile), { recursive: true });
writeFileSync(outFile, xml, "utf8");
console.log(`Wrote ${path.relative(root, outFile)} with ${loc}`);
