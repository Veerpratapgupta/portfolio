# Developer Portfolio

A fast, lightweight, and modern developer portfolio built with **Vite**, **Vanilla JavaScript (ES Modules)**, and **CSS Design Tokens**. Developed using an autonomous multi-agent workflow inside the **Herdr** terminal multiplexer.

---

## 🌟 Key Features

- **⚡ Blazing Fast**: Build-time rendered HTML plus pure ES Modules and design tokens. ~21.5 KB gzipped total (HTML + CSS + JS) with zero client-side framework runtime.
- **🧱 Build-Time Content**: `scripts/vite-content-plugin.mjs` injects metadata, navigation, projects, skills, and contact content from `src/data/` into `index.html` before the browser parses it.
- **🎨 Dark / Light Mode**: Seamless theme switching with system detection and persistent storage. Zero Flash of Unstyled Theme (FOUT) via a pre-paint inline script.
- **📱 Fully Responsive**: Fluid typography and layout using `clamp()`, adapting gracefully from mobile (375px) to ultrawide (1440px+).
- **♿ Accessible (WCAG AA)**: Semantic HTML landmarks, keyboard navigation, visible focus rings, focus-trapped command palette, `<details>` mobile nav, and `prefers-reduced-motion` support.
- **🧪 Automated Verification**: Gzip size budgets, contrast checks, sitemap generation, and CI on every push/PR.
- **🤖 Autonomous Multi-Agent Development**: Architected and implemented collaboratively by AI agents (`architect` and `developer`) managed in **Herdr**.

---

## 📁 Project Structure

```
portfolio/
├── PLAN.md                     # Single Source of Truth for milestones & tasks
├── docs/
│   ├── AGENTS.md               # Multi-agent topology & Herdr workflows
│   └── ARCHITECTURE.md         # Rendering model, tokens, data models, verification
├── scripts/
│   ├── vite-content-plugin.mjs # Build-time HTML injection
│   ├── check-size.mjs          # Gzip budget check
│   ├── check-contrast.mjs      # WCAG AA contrast check
│   └── generate-sitemap.mjs    # Sitemap generator
├── public/                     # favicon, OG image, robots.txt, sitemap.xml, images
├── index.html                  # HTML entry point with inject:* markers
├── src/
│   ├── main.js                 # Behavior entry point (no content rendering)
│   ├── lib/render.js           # Pure build-time HTML renderers
│   ├── data/                   # site, projects, and skills data
│   ├── components/             # theme, nav, palette, terminal, projects, contact, canvas
│   └── styles/                 # tokens, base, layout, and component CSS
├── .github/workflows/ci.yml    # Build + size + contrast checks
└── vite.config.js              # Vite build configuration
```

---

## 🛠️ Development Setup

```bash
# Clone the repository
git clone https://github.com/Veerpratapgupta/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start local development server
npm run dev

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

Node 20.19+ (or 22.12+) is required; CI uses the version in `.nvmrc`.

### Verification

```bash
npm run size       # gzip budgets: JS <= 30 KB, CSS <= 15 KB, combined <= 30 KB
npm run contrast   # WCAG AA contrast for dark, light, and terminal tokens
npm run sitemap    # regenerate public/sitemap.xml (requires SITE_URL)
```

Current production output is ~21.5 KB gzipped total (HTML + CSS + JS). CI runs the build, size, and contrast checks on every push and pull request.

### Deployment

`npm run build` emits a static `dist/` directory. Deploy it to GitHub Pages, Vercel, or Netlify. The Vite `base` is `./`, so the bundle works from a repository subpath. Update `siteConfig.url` in `src/data/site.js` and regenerate the sitemap when the domain changes.

---

## 🤖 Multi-Agent Workflow

This project is built using **Herdr** multi-agent orchestration:
- **`architect`**: Handles system design, specifications, and UI/UX design tokens.
- **`developer`**: Implements code, executes builds, and tests deliverables.
- **`herdr_bridge.py`**: Relays messages and synchronizes collaborative turns.

See [`docs/AGENTS.md`](docs/AGENTS.md) and [`PLAN.md`](PLAN.md) for complete details.

---

## 📄 License
MIT © [Veer](https://github.com/Veerpratapgupta)
