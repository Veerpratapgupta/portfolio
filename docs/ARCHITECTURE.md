# Architecture & Design System Reference (`docs/ARCHITECTURE.md`)

This document defines the technical architecture, design tokens, build pipeline, component contracts, and verification workflow for the developer portfolio.

---

## 1. Rendering Model

The site is **rendered at build time** and **enhanced in the browser**:

1. `index.html` contains HTML comment markers such as `<!-- inject:projects -->`.
2. `scripts/vite-content-plugin.mjs` (`enforce: "pre"`) imports the data modules and `src/lib/render.js`, then replaces each marker with semantic HTML in `transformIndexHtml`. The same plugin runs in dev and build.
3. The browser receives complete content, metadata, navigation, project cards, skills, contact details, and footer before any JavaScript executes.
4. `src/main.js` only wires behavior: canvas, nav, terminal, project filtering, contact copy, and the command palette.

Data files are the single source of truth. Editing `src/data/*.js` or `src/lib/render.js` triggers a full reload in dev via `handleHotUpdate`.

### Injected markers (`index.html`)

| Marker | Renderer | Output |
|---|---|---|
| `<!-- inject:meta -->` | `renderMeta` | Title, description, canonical, Open Graph, Twitter, JSON-LD |
| `<!-- inject:nav-desktop -->` | `renderNavLinks` | Desktop nav `<li>` list |
| `<!-- inject:nav-mobile -->` | `renderNavLinks` | Mobile `<details>` nav list |
| `<!-- inject:hero -->` | `renderHero` | Status pill, headline, lead, CTAs |
| `<!-- inject:stats -->` | `renderStats` | Hero stat grid |
| `<!-- inject:principles -->` | `renderPrinciples` | About principle cards |
| `<!-- inject:project-filters -->` | `renderProjectFilters` | Filter buttons with `aria-pressed` |
| `<!-- inject:projects -->` | `renderProjects` | Project cards, highlights, metrics, tags, links |
| `<!-- inject:skills -->` | `renderSkills` | Skill category cards |
| `<!-- inject:contact -->` | `renderContact` | Email, copy button, social links |
| `<!-- inject:terminal-welcome -->` | `renderTerminalWelcome` | Terminal welcome line |
| `<!-- inject:footer -->` | `renderFooter` | Copyright, back-to-top, source link |

### Build configuration (`vite.config.js`)

- `base: "./"` so the `dist/` output works from any subpath (e.g. GitHub Pages).
- `publicDir: "public"`, `outDir: "dist"`, `assetsDir: "assets"`.
- `target: "es2020"`, `minify: "esbuild"`, `sourcemap: false`.

---

## 2. Design System Tokens (`src/styles/tokens.css`)

All color, spacing, radius, and font scales are CSS custom properties. Component styles must reference tokens instead of hardcoded hex values.

### Color tokens

```css
:root {
  color-scheme: dark;

  --bg-body: #07090e;
  --bg-surface: #0f121a;
  --bg-surface-elevated: #161b26;
  --bg-surface-hover: #1c2230;
  --bg-glass: rgba(15, 18, 26, 0.75);

  --accent-primary: #6366f1;
  --accent-secondary: #3b82f6;
  --accent-emerald: #10b981;
  --accent-amber: #f59e0b;
  --accent-text: #818cf8;   /* AA-safe accent for text on dark surfaces */

  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #8b98ad;    /* AA-safe muted text on all dark surfaces */

  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-medium: rgba(255, 255, 255, 0.15);
  --border-active: rgba(99, 102, 241, 0.5);
}

[data-theme="light"] {
  color-scheme: light;

  --bg-body: #f8fafc;
  --bg-surface: #ffffff;
  --bg-surface-elevated: #f1f5f9;
  --bg-surface-hover: #e2e8f0;

  --accent-primary: #4f46e5;
  --accent-text: #4338ca;

  --text-primary: #090d16;
  --text-secondary: #475569;
  --text-muted: #556277;
}
```

### Terminal tokens

The terminal is intentionally dark in both page themes. Terminal styles are scoped to terminal tokens rather than page text tokens:

```css
:root {
  --terminal-bg: #090c13;
  --terminal-header-bg: #0f1420;
  --terminal-text: #f8fafc;
  --terminal-text-secondary: #cbd5e1;
  --terminal-muted: #8b98ad;
  --terminal-accent: #a5b4fc;
  --terminal-emerald: #34d399;
}
```

`scripts/check-contrast.mjs` verifies terminal pairs against `#090c13`.

### Spacing, layout, and motion

```css
:root {
  --space-1: 0.25rem;  --space-2: 0.5rem;  --space-3: 0.75rem;
  --space-4: 1rem;     --space-6: 1.5rem;  --space-8: 2rem;
  --space-12: 3rem;    --space-16: 4rem;   --space-20: 5rem;
  --space-24: 6rem;

  --max-width: 1200px;
  --content-padding: clamp(1.25rem, 4vw, 2.5rem);

  --radius-sm: 6px; --radius-md: 10px; --radius-lg: 16px;
  --radius-xl: 22px; --radius-full: 9999px;

  --transition-fast: 150ms cubic-bezier(0.16, 1, 0.3, 1);
  --transition-normal: 250ms cubic-bezier(0.16, 1, 0.3, 1);
  --transition-slow: 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

Type scale uses fluid `clamp()` tokens: `--font-xs` through `--font-display`.

---

## 3. Data Models (`src/data/`)

### `src/data/site.js`

```javascript
export const siteConfig = {
  name: "Veer Pratap Gupta",
  handle: "Veer",
  title: "Systems, Full-Stack & Autonomous AI Systems Engineer",
  tagline: "Architecting resilient distributed backends, ultra-lean Linux systems, and collaborative multi-agent coding workflows.",
  url: "https://veerpratapgupta.github.io/portfolio/",
  ogImage: "og-image.png",
  headline: "Engineering high-performance",
  headlineAccent: "systems, backends & autonomous agents",
  availability: "Available for Senior, Staff & Founding Engineer Roles",
  location: "India / Remote Worldwide",
  email: "veerpratap712720@gmail.com",
  github: "https://github.com/Veerpratapgupta",
  linkedin: "https://linkedin.com/in/veerpratapgupta",
  twitter: "https://x.com/veerpratapgupta",
  resumeUrl: "",
  stats: [{ label: "...", value: "..." }],
  bio: ["..."],
  principles: [{ title: "...", description: "..." }],
  navLinks: [{ label: "About", href: "#about" }],
};
```

### `src/data/projects.js`

```javascript
export const projects = [
  {
    id: "herdr-agent-orchestrator",
    title: "Herdr Autonomous Agent Multiplexer",
    category: "AI & Agents",
    description: "...",
    highlights: ["...", "..."],
    metrics: "3x Parallel Dev Velocity · 0% Context Loss",
    tags: ["Rust", "Python", "Unix Sockets"],
    repoUrl: "",
    demoUrl: "",
    caseStudy: true,
    featured: true,
    badge: "Core Project",
  },
];

export const categories = ["All", "AI & Agents", "Systems & Linux", "Full-Stack & Web"];
```

`src/data/skills.js` exports `skillCategories`, each with `name`, `description`, and `skills[]` entries (`name`, `level`, `desc`).

---

## 4. Component Responsibilities

| Component | File | Responsibilities |
|---|---|---|
| **Entry** | `src/main.js` | Initializes components after `DOMContentLoaded`; no content rendering. |
| **Content renderers** | `src/lib/render.js` | Pure functions returning escaped HTML; imported by the Vite plugin. |
| **Content plugin** | `scripts/vite-content-plugin.mjs` | Loads data, replaces `inject:*` markers, full-reloads on data changes. |
| **Theme** | `src/components/theme.js` | Single source of truth for theme state: `data-theme`, `color-scheme`, `localStorage`, `theme-color` meta, `aria-pressed`. |
| **Navigation** | `src/components/nav.js` | Sticky header shadow, active-section tracking, `<details>` mobile nav behavior, theme toggle wiring. |
| **Command palette** | `src/components/palette.js` | Ctrl/Cmd+K dialog, search filtering, arrow-key navigation, focus trap and restore, scroll lock, empty state. |
| **Terminal** | `src/components/terminal.js` | Accessible command input, history, quick commands, and escaped output rendering. |
| **Projects** | `src/components/projects.js` | Filters build-time cards in place and keeps `aria-pressed` in sync. |
| **Contact** | `src/components/contact.js` | Copy-email button with clipboard fallback and `role="status"` feedback. |
| **Canvas** | `src/components/canvas.js` | Ambient 60fps background; disabled for `prefers-reduced-motion`. |
| **Confetti** | `src/components/confetti.js` | Reduced-motion-aware celebration effect for the terminal/palette. |

---

## 5. Accessibility & Progressive Enhancement

1. **Pre-paint theme script** in `<head>` removes `no-js`, adds `js`, applies the saved/system theme, and sets `color-scheme` before CSS paints.
2. **No-JS support**: all content and navigation are present in HTML. `.no-js` hides JS-only controls (`palette`, theme toggle, copy button, terminal input, canvas).
3. **Mobile navigation** uses native `<details>/<summary>`; JavaScript only adds Escape-to-close and outside-click behavior.
4. **Command palette** traps Tab focus, restores focus to a visible trigger on close, and locks body scroll.
5. **Inputs** use at least 16px font on mobile to avoid iOS zoom.
6. **Reduced motion** is honored by canvas, confetti, and scroll behavior.
7. **Contrast**: text tokens are checked against every surface by `scripts/check-contrast.mjs` (WCAG AA, 4.5:1).
8. **Skip link** targets `#main-content`; section anchors use `scroll-margin-top` to clear the sticky header.

---

## 6. Verification

```bash
npm run build      # production build
npm run size       # gzip budgets: JS <= 30 KB, CSS <= 15 KB, combined <= 30 KB
npm run contrast   # WCAG AA contrast for dark, light, and terminal tokens
npm run sitemap    # regenerate public/sitemap.xml (requires SITE_URL)
```

Current production output (gzip): HTML ~7.9 KB, CSS ~4.9 KB, JS ~8.6 KB; **~21.5 KB total** with zero framework runtime.

CI (`.github/workflows/ci.yml`) runs `npm ci`, `npm run build`, `npm run size`, and `npm run contrast` on pushes and pull requests to `main`.

`public/robots.txt` allows all crawlers and references `https://veerpratapgupta.github.io/portfolio/sitemap.xml`.
