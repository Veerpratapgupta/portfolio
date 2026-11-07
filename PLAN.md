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
├── dialogue_transcript.md      # Multi-agent conversation history
├── herdr_bridge.py             # Herdr multi-agent communication bridge
├── docs/
│   ├── AGENTS.md               # Agent roles, Herdr topology, and collaboration workflows
│   └── ARCHITECTURE.md         # Component specifications, styling rules, and tokens
├── index.html                  # HTML entry point with semantic landmarks
├── package.json                # Scripts and Vite devDependency
├── vite.config.js              # Vite configuration
├── public/
│   ├── favicon.svg             # Modern vector favicon
│   └── images/                 # Avatar, project thumbnails, and preview assets
└── src/
    ├── main.js                 # Application entry point
    ├── data/
    │   ├── site.js             # Personal details, bio, socials, navigation links
    │   └── projects.js         # Portfolio project items (title, tags, links, images)
    ├── components/
    │   ├── nav.js              # Theme toggle, active section tracking, mobile drawer
    │   ├── hero.js             # Hero banner interactions & dynamic copy injection
    │   ├── projects.js         # Project grid renderer & filter tags
    │   ├── techstack.js        # Categorized skill badges renderer
    │   └── contact.js          # Contact form validation & email copy utility
    └── styles/
        ├── tokens.css          # Color palette, spacing, typography scale, radii, shadows
        ├── base.css            # Modern CSS reset, body styles, accessibility focus ring
        ├── layout.css          # Responsive container, grid system, section rhythm
        └── components.css      # Styling for navigation, cards, buttons, badges, forms
```

---

## 4. Implementation Phases & Milestones

### Phase 1: Project Scaffolding & Design Foundation
- [ ] Initialize `package.json` with Vite 7 (`dev`, `build`, `preview` scripts).
- [ ] Configure `vite.config.js`.
- [ ] Create `public/favicon.svg` and placeholder assets.
- [ ] Implement `src/styles/tokens.css`:
  - Dark & light theme variables (`--bg-primary`, `--bg-surface`, `--text-primary`, `--text-muted`, `--accent`, `--border`).
  - Spacing scale (`--space-1` to `--space-8`), border radii, and fluid font clamp tokens.
- [ ] Implement `src/styles/base.css` (box-sizing reset, typography, `:focus-visible` styling).
- [ ] Implement `src/styles/layout.css` (max-width container, section vertical rhythm).
- [ ] Create `src/data/site.js` with personal details, tagline, social links, and resume placeholder.
- [ ] Create `src/data/projects.js` with structured sample projects.
- **Verification:** `npm install && npm run build` produces static bundle without errors.

### Phase 2: Navigation & Hero Experience
- [ ] Create `index.html` structure with `<header>`, `<main>`, and semantic `<section>` landmarks.
- [ ] Add pre-paint theme script in `<head>` to prevent flash of wrong theme.
- [ ] Build responsive Navigation:
  - Sticky header with backdrop blur.
  - Logo / Monogram.
  - Section links (About, Projects, Stack, Contact).
  - Theme toggle button with `aria-pressed` / `aria-label`.
  - Accessible mobile drawer (`<details>/<summary>` fallback + JS enhancement).
- [ ] Build Hero Section:
  - Punchy headline & role badge.
  - One-line value proposition.
  - Primary Call-to-Action buttons ("View Work", "Get in Touch").
  - Status indicator ("Available for new projects").
- **Verification:** Test layout on mobile (375px) and desktop (1440px). Verify theme toggle persists in `localStorage`.

### Phase 3: Content Sections (About, Tech Stack, Projects)
- [ ] Build **About Section**:
  - Professional summary, background highlights, and downloadable resume link.
- [ ] Build **Tech Stack Section**:
  - Grouped categories: Languages, Frameworks & Libraries, Developer Tools & Systems.
  - Visual badges with clean hover effects.
- [ ] Build **Featured Projects Section**:
  - Responsive 2-column or 3-column card grid.
  - Project card components: thumbnail, title, description, technology tags, live demo & GitHub repo links.
  - Interactive project filtering (e.g. All, Web, Systems, AI/Agentic).
- **Verification:** Dynamic rendering correctly imports from `src/data/projects.js`. Layout holds cleanly on all screen sizes.

### Phase 4: Contact, Interactivity & Accessibility Polish
- [ ] Build **Contact Section**:
  - Direct email with one-click "Copy Email" feedback tooltip.
  - Social profile links (GitHub, LinkedIn, X/Twitter, etc.).
  - Lightweight contact message form with client-side validation.
- [ ] Build **Footer**:
  - Copyright, "Built with Vite & Vanilla JS", back-to-top button.
- [ ] Polish Interactions:
  - Subtle scroll-triggered section reveal (using `IntersectionObserver`).
  - Strict support for `prefers-reduced-motion: reduce`.
  - Keyboard navigation: skip-to-content link, tab order, esc-to-close menus.
- **Verification:** Lighthouse audit: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

### Phase 5: Verification, Quality Assurance & Deployment
- [ ] Run full production build (`npm run build`).
- [ ] Preview production bundle (`npm run preview`).
- [ ] Verify zero console errors, valid HTML5 semantics, and functional links.
- [ ] Document deployment instructions for Vercel, Netlify, and GitHub Pages in `README.md`.

---

## 5. Status Tracking Matrix

| Phase | Description | Owner | Status | Notes |
|---|---|---|---|---|
| **Phase 1** | Scaffolding & Design Foundation | Developer | **Ready to Start** | Awaiting scaffold generation |
| **Phase 2** | Navigation & Hero Experience | Developer & Architect | **Pending** | Dependent on Phase 1 |
| **Phase 3** | Content Sections (About, Projects, Stack) | Developer & Architect | **Pending** | Dependent on Phase 2 |
| **Phase 4** | Contact & A11y Polish | Developer | **Pending** | Dependent on Phase 3 |
| **Phase 5** | QA, Auditing & Deployment | Antigravity / All | **Pending** | Dependent on Phase 4 |
