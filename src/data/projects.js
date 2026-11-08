/**
 * projects.js — Curated portfolio projects highlighting engineering depth.
 */

export const projects = [
  {
    id: "herdr-agent-orchestrator",
    title: "Herdr Autonomous Agent Multiplexer",
    category: "AI & Agents",
    description: "An advanced terminal workspace orchestration system for running multi-agent AI coding loops. Coordinates Architect, Developer, and Reviewer agents across isolated terminal panes with live SQLite event streaming and zero-loss state recovery.",
    highlights: [
      "Sub-millisecond IPC state synchronization over Unix domain sockets",
      "Automated turn-by-turn dialogue runner with bracketed-paste terminal injection",
      "Persistent session logging with automated CodeRabbit CLI review integration"
    ],
    metrics: "3x Parallel Dev Velocity · 0% Context Loss",
    tags: ["Rust", "Python", "Unix Sockets", "Multiplexing", "LLM Tool Calling", "SQLite"],
    repoUrl: "",
    demoUrl: "",
    caseStudy: true,
    featured: true,
    badge: "Core Project"
  },
  {
    id: "void-linux-hardened-desktop",
    title: "Void Linux Minimalist OS & Workstation",
    category: "Systems & Linux",
    description: "A tailored, ultra-lean Void Linux desktop architecture designed for maximum developer ergonomics and minimal resource consumption. Features custom BSPWM, SXHKD keybind mappings, TLP power management, and compressed Zram swap.",
    highlights: [
      "Idle memory footprint tuned to under 190MB RAM on cold boot",
      "Hardware-accelerated compositor (Picom) with custom blur shaders",
      "Integrated fastfetch, Polybar status monitors, and custom Rofi launcher"
    ],
    metrics: "60% Faster Boot · <190MB Idle RAM",
    tags: ["Linux", "Void Linux", "Shell / Zsh", "BSPWM", "Kernel Tuning", "SysAdmin"],
    repoUrl: "",
    demoUrl: "",
    caseStudy: true,
    featured: true,
    badge: "Systems"
  },
  {
    id: "distributed-stream-downloader",
    title: "High-Throughput Distributed Media Pipeline",
    category: "Full-Stack & Web",
    description: "Resilient concurrent media ingestion and processing pipeline. Built to handle chunked multi-threaded stream downloads, dynamic format negotiation, automated audio/video multiplexing, and archive checksum verification.",
    highlights: [
      "Chunked concurrent stream downloads with exponential backoff & auto-resume",
      "Real-time metadata extraction, audio normalization, and MP4 packaging",
      "Custom fuzzy search interface powered by FZF and shell completions"
    ],
    metrics: "10Gbps Capable · Zero Drop Recovery",
    tags: ["Go", "Node.js", "FFmpeg", "Shell", "Concurrency", "Streaming"],
    repoUrl: "",
    demoUrl: "",
    caseStudy: true,
    featured: true,
    badge: "Backend"
  },
  {
    id: "agentic-code-review-harness",
    title: "Agentic Code Review & TDD Testing Harness",
    category: "AI & Agents",
    description: "Automated test-driven development harness connecting local AI agents with CodeRabbit CLI and GitHub PR workflows. Enforces strict specification conformance, red-green-refactor loops, and pre-commit security gates.",
    highlights: [
      "Automated prompt-driven hypothesis testing and bug diagnosis",
      "Dual-axis review pipeline evaluating both code standards and feature spec",
      "Pre-commit credential & secret scanner preventing sensitive leaks"
    ],
    metrics: "100% Pre-Commit Pass Rate",
    tags: ["TypeScript", "Python", "GitHub CLI", "CodeRabbit", "TDD", "CI/CD"],
    repoUrl: "",
    demoUrl: "",
    caseStudy: true,
    featured: true,
    badge: "DevOps"
  },
  {
    id: "zero-bloat-portfolio-engine",
    title: "Zero-Framework High-Performance Portfolio",
    category: "Full-Stack & Web",
    description: "This portfolio website: engineered with modern Vanilla ES Modules, CSS custom properties, and Vite. Implements zero Flash of Unstyled Theme (FOUT), interactive client-side terminal, and 60fps canvas micro-interactions.",
    highlights: [
      "Build-time semantic HTML with progressive enhancement for every interaction",
      "Synchronous pre-paint head execution eliminating all theme flicker",
      "21.5KB gzipped total (HTML + CSS + JS) with zero client-side framework runtime"
    ],
    metrics: "21.5KB gz Total · Zero Framework Runtime",
    tags: ["Vite", "ES Modules", "CSS Tokens", "Vanilla JS", "WCAG AA", "Web Audio / Canvas"],
    repoUrl: "https://github.com/Veerpratapgupta/portfolio",
    demoUrl: "https://veerpratapgupta.github.io/portfolio/",
    featured: false,
    badge: "Frontend"
  }
];

export const categories = ["All", "AI & Agents", "Systems & Linux", "Full-Stack & Web"];
