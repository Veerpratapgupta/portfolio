/**
 * skills.js — Structured technical skill inventory with proficiency & domains.
 */

export const skillCategories = [
  {
    name: "Languages & Core Runtimes",
    description: "Primary programming languages for systems, backends, and tooling.",
    skills: [
      { name: "Go (Golang)", level: "Advanced", desc: "Concurrent microservices, goroutines, CLI tooling, network sockets" },
      { name: "C / C++", level: "Proficient", desc: "Data structures, memory management, POSIX APIs, low-level algorithms" },
      { name: "JavaScript / TypeScript", level: "Expert", desc: "Modern ES2024, Node.js, asynchronous I/O, modular architecture" },
      { name: "Python", level: "Advanced", desc: "Automation, agentic runners, SQLite integrations, data scripting" },
      { name: "Bash & Zsh", level: "Expert", desc: "POSIX scripting, pipeline automation, custom desktop environments" }
    ]
  },
  {
    name: "Systems & Infrastructure",
    description: "Operating systems, virtualization, kernel performance, and hardware optimization.",
    skills: [
      { name: "Void & Arch Linux", level: "Expert", desc: "Runit, SysV, pacman/xbps, custom kernel parameters, minimal setups" },
      { name: "BSPWM & Compositors", level: "Advanced", desc: "Tiling window managers, SXHKD IPC, Picom hardware shaders" },
      { name: "Memory & Power Tuning", level: "Advanced", desc: "Zram compressed RAM, TLP power management, CPU frequency scaling" },
      { name: "QEMU / KVM / NBD", level: "Proficient", desc: "Virtual machine disk mounting, headless VM management, emulation" },
      { name: "Networking & Firewalls", level: "Advanced", desc: "OpenVPN, nftables, DNS resolution, TCP/UDP stream routing" }
    ]
  },
  {
    name: "AI & Autonomous Agent Workflows",
    description: "Agentic programming, tool calling protocols, and terminal multiplexer orchestration.",
    skills: [
      { name: "Herdr Terminal Multiplexer", level: "Expert", desc: "Multi-agent pane orchestration, state polling, automated handoffs" },
      { name: "OpenCode & Antigravity", level: "Expert", desc: "Autonomous AI CLI execution, TUI session management, SQLite logging" },
      { name: "Model Context Protocol (MCP)", level: "Advanced", desc: "Remote & local server integrations, structured tool execution" },
      { name: "CodeRabbit AI Review", level: "Advanced", desc: "Automated PR gating, standards auditing, specification compliance" }
    ]
  },
  {
    name: "Web & Backend Architecture",
    description: "High-performance full-stack web architectures, REST APIs, and modern frontend tooling.",
    skills: [
      { name: "Node.js & Express", level: "Advanced", desc: "REST APIs, authentication, middleware pipelines, streaming responses" },
      { name: "MongoDB & SQLite", level: "Advanced", desc: "Document stores, relational databases, query optimization, indexing" },
      { name: "Vite & Modern Tooling", level: "Expert", desc: "Fast HMR, optimized static builds, zero-runtime architectures" },
      { name: "CSS Design Tokens", level: "Expert", desc: "Custom properties, fluid typography clamp, zero-runtime design systems" },
      { name: "Accessibility (WCAG AA)", level: "Advanced", desc: "Semantic HTML5, ARIA landmarks, keyboard traps, focus rings" }
    ]
  }
];
