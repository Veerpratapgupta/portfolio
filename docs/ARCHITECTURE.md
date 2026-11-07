# Architecture & Design System Reference (`docs/ARCHITECTURE.md`)

This document defines the technical architecture, design tokens, component contracts, and styling conventions for the developer portfolio.

---

## 1. Design System Tokens (`src/styles/tokens.css`)

All color, spacing, radius, and font scales are defined via CSS custom properties. No hardcoded hex values should be used in component stylesheets.

### Color Palette (Dark Theme Default)
```css
:root {
  /* Brand & Accent */
  --accent: #3b82f6;               /* Electric Blue */
  --accent-hover: #2563eb;
  --accent-subtle: rgba(59, 130, 246, 0.12);

  /* Surfaces & Backgrounds */
  --bg-primary: #0a0c10;           /* Deep dark background */
  --bg-surface: #12161f;           /* Card & panel surface */
  --bg-surface-elevated: #1a202c;  /* Modals / hovering cards */

  /* Text & Content */
  --text-primary: #f1f5f9;         /* High-contrast crisp white */
  --text-secondary: #94a3b8;       /* Muted gray for body copy */
  --text-muted: #64748b;           /* Dim text for metadata & footnotes */

  /* Borders & Dividers */
  --border-subtle: #1e293b;
  --border-hover: #334155;

  /* Status Colors */
  --status-available: #10b981;     /* Emerald green indicator */
}
```

### Light Theme Override (`[data-theme="light"]`)
```css
[data-theme="light"] {
  --bg-primary: #f8fafc;
  --bg-surface: #ffffff;
  --bg-surface-elevated: #f1f5f9;

  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #64748b;

  --border-subtle: #e2e8f0;
  --border-hover: #cbd5e1;
}
```

### Spacing & Layout Scale
```css
:root {
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */

  --max-width: 1100px;
  --container-padding: clamp(1rem, 4vw, 2.5rem);

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
}
```

---

## 2. Data Models (`src/data/`)

### `src/data/site.js`
Exports the portfolio owner's personal metadata:
```javascript
export const siteConfig = {
  name: "Veer",
  role: "Systems & Full-Stack Engineer",
  tagline: "Building resilient distributed systems, modern web tools, and autonomous agent workflows.",
  status: "Available for new projects & opportunities",
  email: "veer@example.com",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com"
  },
  resumeUrl: "/resume.pdf",
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Stack", href: "#stack" },
    { label: "Contact", href: "#contact" }
  ]
};
```

### `src/data/projects.js`
Exports the featured projects collection:
```javascript
export const projects = [
  {
    id: "herdr-agents",
    title: "Herdr Agent Orchestrator",
    description: "Multi-agent coordination multiplexer for running collaborative coding agents in parallel terminal panes.",
    tags: ["Rust", "Python", "CLI", "Multiplexer"],
    demoUrl: "https://github.com",
    repoUrl: "https://github.com",
    featured: true
  },
  {
    id: "void-linux-workspace",
    title: "Void Linux Developer Environment",
    description: "Minimalist, high-performance Linux desktop configuration with BSPWM, SXHKD, and memory optimizations.",
    tags: ["Linux", "Shell", "SysAdmin", "Zsh"],
    repoUrl: "https://github.com",
    featured: true
  }
];
```

---

## 3. Component Architecture & Responsibilities

| Component | File | Responsibilities |
|---|---|---|
| **Navigation** | `src/components/nav.js` | Handles sticky header shadow on scroll, theme toggle (`data-theme` attribute + `localStorage`), and mobile menu toggle. |
| **Hero** | `src/components/hero.js` | Injects site title, tagline, action buttons, and live availability badge. |
| **Projects** | `src/components/projects.js` | Reads `src/data/projects.js`, renders cards into a responsive grid, and handles tag filtering. |
| **Tech Stack** | `src/components/techstack.js` | Renders categorized skill badges (Languages, Frameworks, Systems). |
| **Contact** | `src/components/contact.js` | Handles client-side form validation, copy-to-clipboard for email with toast notification. |

---

## 4. Accessibility & Progressive Enhancement
1. **Pre-paint Theme Script (`index.html`)**:
   Executed synchronously in `<head>` before CSS renders to completely eliminate theme flashing:
   ```html
   <script>
     (function() {
       const saved = localStorage.getItem('theme');
       const pref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
       document.documentElement.setAttribute('data-theme', saved || pref);
     })();
   </script>
   ```
2. **Accessible Skip Link**:
   A `.skip-link` pointing to `#main-content` visible only on `:focus`.
3. **Reduced Motion**:
   All animations wrapped in `@media (prefers-reduced-motion: no-preference)`.
