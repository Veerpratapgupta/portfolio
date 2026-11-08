# Developer Portfolio — Project Master Plan (`PLAN.md`)

## 1. Project Vision & Goals
Build a modern, lightning-fast, high-aesthetic developer portfolio in `/home/veer/projects/portfolio`.
The portfolio must be:
- **Fast & Lightweight:** Zero runtime framework overhead, near-instant initial paint.
- **Accessible & Responsive:** Semantic HTML5, WCAG AA compliance, fluid across mobile (375px), tablet (768px), and desktop (1440px+).
- **Design-First:** Dark-first aesthetic with light mode toggle, crisp typography, clean borders, subtle hover interactions, and zero Flash of Unstyled Theme (FOUT).
- **Maintainable & Content-Driven:** All personal information, projects, and tech stacks defined in simple data files (`src/data/`) so updating content requires zero template rewriting.

---

## 2. Tech Stack & Architecture Decisions

| Area | Decision | Rationale |
|---|---|---|
| **Build Tool** | **Vite 7.x** | Fast local dev server with HMR, optimized static production bundling to `dist/`. |
| **Language** | **Modern Vanilla JS (ES Modules)** | Native browser support, minimal footprint, easy handoff. |
| **Styling** | **Vanilla CSS + Design Tokens (Custom Properties)** | No Tailwind or CSS-in-JS dependencies; fast parsing, complete control over design tokens. |
| **Data Layer** | **Static Data Modules (`src/data/site.js`, `src/data/projects.js`)** | Centralized configuration for biography, links, experience, and project cards. |
| **Theme System** | **Dark / Light Toggle** | System default with user preference override stored in `localStorage`; pre-paint head script prevents flashing. |
| **Navigation** | **Dual-mode Navigation** | Desktop sticky navbar; mobile CSS-only `<details>/<summary>` drawer with JS progressive enhancement. |
| **Deployment** | **Static `dist/` Directory** | Ready for zero-config deployment on Vercel, Netlify, or GitHub Pages. |

---

## 3. Directory Layout

```
portfolio/
├── PLAN.md                     # Project plan and phase checklist (Single Source of Truth)
├── README.md                   # Setup, structure, verification, and deployment
├── docs/
│   ├── AGENTS.md               # Agent roles, Herdr topology, and collaboration workflows
│   └── ARCHITECTURE.md         # Rendering model, tokens, data models, verification
├── scripts/
│   ├── vite-content-plugin.mjs # Build-time HTML injection from data + renderers
│   ├── check-size.mjs          # Gzip budget verification
│   ├── check-contrast.mjs      # WCAG AA contrast verification
│   └── generate-sitemap.mjs    # Sitemap generator
├── .github/workflows/ci.yml    # Build + size + contrast CI
├── index.html                  # HTML entry point with inject:* markers
├── package.json                # Scripts, engines, and Vite devDependency
├── vite.config.js              # Vite configuration (base "./", content plugin)
├── public/
│   ├── favicon.svg
│   ├── og-image.png            # 1200x630 social preview
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/
└── src/
    ├── main.js                 # Behavior entry point (no content rendering)
    ├── lib/render.js           # Pure build-time HTML renderers
    ├── data/
    │   ├── site.js             # Identity, bio, stats, principles, nav links
    │   ├── projects.js         # Project items and filter categories
    │   └── skills.js           # Skill categories and proficiency entries
    ├── components/
    │   ├── theme.js            # Single source of truth for theme state
    │   ├── nav.js              # Sticky header, active section, mobile <details> nav
    │   ├── palette.js          # Ctrl/Cmd+K command palette with focus trap
    │   ├── terminal.js         # Accessible interactive terminal
    │   ├── projects.js         # In-place project filtering
    │   ├── contact.js          # Copy-email feedback
    │   ├── canvas.js           # Reduced-motion-aware ambient canvas
    │   └── confetti.js         # Reduced-motion-aware celebration effect
    └── styles/
        ├── tokens.css          # Color, terminal, spacing, type, motion tokens
        ├── base.css            # Reset, no-js rules, scroll lock, focus styles
        ├── layout.css          # Container, section rhythm, sticky-header offsets
        └── components.css      # Navigation, cards, terminal, palette, contact
```

---

## 4. Implementation Phases & Milestones

### Phase 1: Project Scaffolding & Design Foundation
- [x] Initialize `package.json` with Vite 7 (`dev`, `build`, `preview` scripts).
- [x] Configure `vite.config.js`.
- [x] Create `public/favicon.svg` and placeholder assets.
- [x] Implement `src/styles/tokens.css`:
  - Dark & light theme variables (`--bg-primary`, `--bg-surface`, `--text-primary`, `--text-muted`, `--accent`, `--border`).
  - Spacing scale (`--space-1` to `--space-8`), border radii, and fluid font clamp tokens.
- [x] Implement `src/styles/base.css` (box-sizing reset, typography, `:focus-visible` styling).
- [x] Implement `src/styles/layout.css` (max-width container, section vertical rhythm).
- [x] Create `src/data/site.js` with personal details, tagline, social links, and resume placeholder.
- [x] Create `src/data/projects.js` with structured sample projects.
- **Verification:** `npm install && npm run build` produces static bundle without errors.

### Phase 2: Navigation & Hero Experience
- [x] Create `index.html` structure with `<header>`, `<main>`, and semantic `<section>` landmarks.
- [x] Add pre-paint theme script in `<head>` to prevent flash of wrong theme.
- [x] Build responsive Navigation:
  - Sticky header with backdrop blur.
  - Logo / Monogram.
  - Section links (About, Projects, Stack, Contact).
  - Theme toggle button with `aria-pressed` / `aria-label`.
  - Accessible mobile drawer (`<details>/<summary>` fallback + JS enhancement).
- [x] Build Hero Section:
  - Punchy headline & role badge.
  - One-line value proposition.
  - Primary Call-to-Action buttons ("Explore Work", "Get in Touch").
  - Status indicator ("Available for new projects").
- **Verification:** Test layout on mobile (375px) and desktop (1440px). Verify theme toggle persists in `localStorage`.

### Phase 3: Content Sections (About, Tech Stack, Projects)
- [x] Build **About Section**:
  - Professional summary and background highlights (résumé link appears when `resumeUrl` is set).
- [x] Build **Tech Stack Section**:
  - Grouped categories: Languages, Frameworks & Libraries, Developer Tools & Systems.
  - Visual badges with clean hover effects.
- [x] Build **Featured Projects Section**:
  - Responsive 2-column or 3-column card grid.
  - Project card components: thumbnail, title, description, technology tags, live demo & GitHub repo links.
  - Interactive project filtering (e.g. All, Web, Systems, AI/Agentic).
- **Verification:** Build-time injection renders projects and skills from `src/data/` into static HTML. Layout holds cleanly on all screen sizes.

### Phase 4: Contact, Interactivity & Accessibility Polish
- [x] Build **Contact Section**:
  - Direct email with one-click "Copy Email" feedback and `role="status"` confirmation.
  - Social profile links (GitHub, LinkedIn, X/Twitter).
  - Mailto fallback when the Clipboard API is unavailable.
- [x] Build **Footer**:
  - Copyright, "Built with Vite & Vanilla JS", back-to-top button.
- [x] Polish Interactions:
  - Subtle scroll-triggered section reveal (using `IntersectionObserver`).
  - Strict support for `prefers-reduced-motion: reduce`.
  - Keyboard navigation: skip-to-content link, tab order, esc-to-close menus.
- **Verification:** `npm run size` and `npm run contrast` pass; Chromium audit covers 375/768/1440, palette focus management, mobile nav, and no-JS rendering.

### Phase 5: Verification, Quality Assurance & Deployment
- [x] Run full production build (`npm run build`).
- [x] Preview production bundle (`npm run preview`).
- [x] Verify zero console errors, valid HTML5 semantics, and functional links (Playwright/Chromium at 375/768/1440 + JS-off).
- [x] Document deployment instructions for Vercel, Netlify, and GitHub Pages in `README.md`.

---

## 5. Status Tracking Matrix

| Phase | Description | Owner | Status | Notes |
|---|---|---|---|---|
| **Phase 1** | Scaffolding & Design Foundation | Developer | **Complete** | Vite 7, tokens, reset, layout, data |
| **Phase 2** | Navigation & Hero Experience | Developer & Architect | **Complete** | Sticky nav, pre-paint theme, hero |
| **Phase 3** | Content Sections (About, Projects, Stack) | Developer & Architect | **Complete** | Build-time injected content |
| **Phase 4** | Contact & A11y Polish | Developer | **Complete** | Copy email, palette, no-JS, reduced motion |
| **Phase 5** | QA, Auditing & Deployment | Antigravity / All | **Complete** | Build/size/contrast PASS; Chromium audits PASS; CI added |

---

## Verification scripts

Node ESM scripts under `scripts/` verify the production build and generate the sitemap. Run them from the repository root. `public/robots.txt` allows every user agent to crawl `/` and references `https://veerpratapgupta.github.io/portfolio/sitemap.xml`.

### Generate sitemap

`scripts/generate-sitemap.mjs` requires `SITE_URL`. It writes `public/sitemap.xml` with one URL entry (`SITE_URL/`), `lastmod` set to today's ISO date, `changefreq` of `monthly`, and `priority` of `1.0`.

```bash
SITE_URL=https://your-domain.tld node scripts/generate-sitemap.mjs
```

### Check bundle size

`scripts/check-size.mjs` reads `dist/index.html` and the `.css` and `.js` files in `dist/assets/`. It prints raw and gzip sizes (`zlib.gzipSync`) per file, plus totals for HTML, CSS, and JS. It exits 1 when total JS gzip is over 30 KB, total CSS gzip is over 15 KB, or combined JS+CSS gzip is over 30 KB.

```bash
npm run build && node scripts/check-size.mjs
```

### Check contrast

`scripts/check-contrast.mjs` hardcodes the dark and light hex values from `src/styles/tokens.css`. It checks WCAG 2.x contrast of `text-primary`, `text-secondary`, and `text-muted` against `bg-base` (`--bg-body`), `bg-surface`, `bg-elevated` (`--bg-surface-elevated`), and the terminal background `#090c13` using the terminal tokens. `text-muted` counts as normal text. It exits 1 when any pair is below 4.5:1.

```bash
node scripts/check-contrast.mjs
```

### Current results

- Build: PASS (`vite build`, 17 modules).
- Size: PASS — HTML 7.94 KB + CSS 4.93 KB + JS 8.52 KB = **21.39 KB gzip total**; assets 13.46 KB.
- Contrast: PASS — all 21 pairs meet 4.5:1 (dark, light, terminal).
- Browser audit: PASS — 48/48 checks: 37 layout/palette/theme/no-JS checks at 375/768/1440 and dark/light, 7 functional checks (filters, terminal, metadata, OG image, light terminal contrast), 4 accessibility checks (no-JS mobile nav, skip link, copy status, theme persistence).
- Assets: OG image optimized from 193.7 KB to 63.9 KB (1200x630 PNG, 128 colors).
- CI: `.github/workflows/ci.yml` runs `npm ci`, `npm run build`, `npm run size`, and `npm run contrast`.
