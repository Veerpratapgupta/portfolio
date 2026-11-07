# Developer Portfolio

A fast, lightweight, and modern developer portfolio built with **Vite**, **Vanilla JavaScript (ES Modules)**, and **CSS Design Tokens**. Developed using an autonomous multi-agent workflow inside the **Herdr** terminal multiplexer.

---

## 🌟 Key Features

- **⚡ Blazing Fast**: Built with pure ES Modules and design tokens. Zero client-side framework runtime overhead.
- **🎨 Dark / Light Mode**: Seamless theme switching with system detection and persistent storage. Zero Flash of Unstyled Theme (FOUT) via pre-paint inline script.
- **📱 Fully Responsive**: Fluid typography and layout using `clamp()`, adapting gracefully from mobile (375px) to ultrawide (1440px+).
- **♿ Accessible (WCAG AA)**: Semantic HTML landmarks, keyboard navigation, visible focus rings, and `prefers-reduced-motion` support.
- **🤖 Autonomous Multi-Agent Development**: Architected and implemented collaboratively by AI agents (`architect` and `developer`) managed in **Herdr**.

---

## 📁 Project Structure

```
portfolio/
├── PLAN.md                     # Single Source of Truth for milestones & tasks
├── docs/
│   ├── AGENTS.md               # Multi-agent topology & Herdr workflows
│   └── ARCHITECTURE.md         # Component specs, tokens, and data models
├── herdr_bridge.py             # Agent dialogue & coordination runner
├── dialogue_transcript.md      # Record of agent discussions and reviews
├── index.html                  # HTML entry point with semantic landmarks
├── src/
│   ├── main.js                 # Application entry point
│   ├── data/                   # Data layer (site metadata, projects)
│   ├── components/             # Modular vanilla JS components
│   └── styles/                 # Tokens, reset, layout, and component CSS
└── vite.config.js              # Vite build configuration
```

---

## 🛠️ Development Setup

```bash
# Clone the repository
git clone https://github.com/Veerpratapgupta/portfolio.git
cd portfolio

# Install dependencies (once scaffolded)
npm install

# Start local development server
npm run dev

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

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
