# Domain Glossary (`GLOSSARY.md`)

This glossary establishes the canonical domain vocabulary for the **Developer Portfolio** project and its multi-agent development environment.

---

### Core Terms

- **Portfolio**: The client-side developer personal website hosted statically from `dist/`, containing Hero, About, Projects, Tech Stack, and Contact sections.
- **Herdr Multiplexer**: The terminal workspace manager coordinating live AI coding agents (`agy`, `architect`, `developer`) across terminal panes (`w3:p1`, `w3:p2`, `w3:p3`).
- **Design Tokens**: CSS custom properties defined in `src/styles/tokens.css` representing atomic visual attributes (colors, spacing, radii, typography scales).
- **Pre-paint Theme Script**: An inline synchronous JavaScript snippet in `<head>` of `index.html` that reads user theme preference and sets `data-theme` prior to DOM rendering, eliminating Flash of Unstyled Theme (FOUT).
- **Static Injection**: Zero-runtime data compilation where personal information and projects are defined in `src/data/` and statically bundled for production.
- **Bridge Runner (`herdr_bridge.py`)**: The orchestration script relaying turn-by-turn prompts and responses between agents in Herdr via CLI and SQLite database events.
- **Master Plan (`PLAN.md`)**: The Single Source of Truth for milestones, phase checklists, and acceptance criteria.
