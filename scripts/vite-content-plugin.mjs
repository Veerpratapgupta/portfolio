/**
 * vite-content-plugin.mjs — Injects build-time semantic markup into index.html.
 * Data and renderers are the single source of truth; the browser receives
 * complete HTML and JavaScript only enhances it.
 */

import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "src", "data");
const RENDER_FILE = path.join(ROOT, "src", "lib", "render.js");

async function load(relativePath) {
  const file = path.join(ROOT, relativePath);
  const url = `${pathToFileURL(file).href}?t=${Date.now()}`;
  return import(url);
}

export function contentPlugin() {
  return {
    name: "portfolio-content",
    enforce: "pre",

    async transformIndexHtml(html) {
      const render = await load("src/lib/render.js");
      const { siteConfig } = await load("src/data/site.js");
      const { projects, categories } = await load("src/data/projects.js");
      const { skillCategories } = await load("src/data/skills.js");

      const replacements = {
        "inject:meta": render.renderMeta(siteConfig),
        "inject:nav-desktop": render.renderNavLinks(siteConfig.navLinks),
        "inject:nav-mobile": render.renderNavLinks(
          siteConfig.navLinks,
          "nav-link mobile-nav-link"
        ),
        "inject:hero": render.renderHero(siteConfig),
        "inject:stats": render.renderStats(siteConfig.stats),
        "inject:principles": render.renderPrinciples(siteConfig.principles),
        "inject:project-filters": render.renderProjectFilters(categories),
        "inject:projects": render.renderProjects(projects),
        "inject:skills": render.renderSkills(skillCategories),
        "inject:contact": render.renderContact(siteConfig),
        "inject:terminal-welcome": render.renderTerminalWelcome(),
        "inject:footer": render.renderFooter(siteConfig),
      };

      let output = html;
      for (const [key, value] of Object.entries(replacements)) {
        output = output.replace(`<!-- ${key} -->`, () => value);
      }
      return output;
    },

    handleHotUpdate(ctx) {
      if (ctx.file.startsWith(DATA_DIR) || ctx.file === RENDER_FILE) {
        ctx.server.ws.send({ type: "full-reload" });
        return [];
      }
    },
  };
}
