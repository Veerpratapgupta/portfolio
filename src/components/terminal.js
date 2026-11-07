/**
 * terminal.js — Interactive Terminal HUD Widget.
 */

import { siteConfig } from "../data/site.js";
import { projects } from "../data/projects.js";
import { triggerConfetti } from "./confetti.js";

export function initTerminal() {
  const terminalBody = document.getElementById("terminal-body");
  const terminalInput = document.getElementById("terminal-input");
  const quickCmds = document.querySelectorAll(".quick-cmd-btn");
  if (!terminalBody || !terminalInput) return;

  const commandHistory = [];
  let historyIndex = -1;

  function appendLine(html, isPrompt = false) {
    const div = document.createElement("div");
    div.className = "terminal-output";
    if (isPrompt) {
      div.innerHTML = `<span class="prompt-prefix">veer@portfolio:~$</span> ${html}`;
    } else {
      div.innerHTML = html;
    }
    terminalBody.appendChild(div);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function handleCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    commandHistory.push(cmdRaw);
    historyIndex = commandHistory.length;
    appendLine(escapeHtml(cmdRaw), true);

    switch (cmd) {
      case "help":
      case "?":
        appendLine(`
Available commands:
  <span style="color: var(--accent-emerald);">about</span>       - Brief overview & bio
  <span style="color: var(--accent-emerald);">skills</span>      - Technical stack & proficiencies
  <span style="color: var(--accent-emerald);">projects</span>    - Featured architecture & code projects
  <span style="color: var(--accent-emerald);">agents</span>      - Multi-agent Herdr topology & state
  <span style="color: var(--accent-emerald);">neofetch</span>    - Void Linux system telemetry
  <span style="color: var(--accent-emerald);">contact</span>     - Email & social links
  <span style="color: var(--accent-emerald);">hire</span>        - Available roles & hiring intent
  <span style="color: var(--accent-emerald);">clear</span>       - Clear terminal output
        `);
        break;

      case "about":
      case "whoami":
        appendLine(`
<strong>${siteConfig.name}</strong> — ${siteConfig.title}
${siteConfig.bio.join("\n\n")}
        `);
        break;

      case "skills":
        appendLine(`
<strong>Core Engineering Proficiencies:</strong>
  • <strong>Languages:</strong> Go, C/C++, TypeScript, JavaScript, Python, Bash/Zsh
  • <strong>Systems:</strong> Void Linux, BSPWM, Zram Swap, TLP, Kernel Tuning, QEMU/KVM
  • <strong>AI & Agents:</strong> Herdr Multiplexer, Tool Calling, MCP, CodeRabbit CI
  • <strong>Web & Backend:</strong> Node.js, Express, MongoDB, SQLite, Vite, CSS Tokens
        `);
        break;

      case "projects":
        const list = projects.map((p, i) => `  [${i + 1}] <strong style="color: var(--accent-primary);">${p.title}</strong> (${p.category})\n      ${p.metrics}\n      Tech: ${p.tags.slice(0, 4).join(", ")}`).join("\n\n");
        appendLine(`Featured Projects:\n\n${list}\n\nScroll down to the Projects section to explore in detail.`);
        break;

      case "agents":
        appendLine(`
<strong>Herdr Multi-Agent Live Topology:</strong>
  [Pane w3:p1] <strong>agy</strong> (Antigravity CLI) - Orchestrator & QA Lead [WORKING]
  [Pane w3:p2] <strong>architect</strong> (OpenCode)   - System & Token Architect [IDLE]
  [Pane w3:p3] <strong>developer</strong> (OpenCode)   - Implementation Lead [ACTIVE]
  
Status: Zero-loss context synchronization active via SQLite & Herdr IPC.
        `);
        break;

      case "neofetch":
      case "fastfetch":
        appendLine(`
<span style="color: var(--accent-emerald);">
      .---.       <strong>veer@void-workstation</strong>
     /     \\      ---------------------
    | () () |     <strong>OS:</strong> Void Linux x86_64
     \\  -  /      <strong>Host:</strong> Custom High-Performance Workstation
      \`---\`       <strong>Kernel:</strong> Linux 6.x optimized
                  <strong>WM:</strong> BSPWM + SXHKD + Picom (GLX shaders)
                  <strong>Shell:</strong> zsh + starship prompt
                  <strong>Terminal:</strong> Alacritty / Herdr multiplexer
                  <strong>Memory:</strong> 180MB / 16GB (Zram enabled)
</span>
        `);
        break;

      case "contact":
        appendLine(`
Email:    <a href="mailto:${siteConfig.email}" style="color: var(--accent-primary);">${siteConfig.email}</a>
GitHub:   <a href="${siteConfig.github}" target="_blank" style="color: var(--accent-primary);">${siteConfig.github}</a>
LinkedIn: <a href="${siteConfig.linkedin}" target="_blank" style="color: var(--accent-primary);">${siteConfig.linkedin}</a>
        `);
        break;

      case "hire":
        triggerConfetti();
        appendLine(`
<span style="color: var(--accent-emerald); font-weight: bold;">
🎉 Let's build something extraordinary together!
</span>
I'm actively considering Senior, Staff, and Founding Engineer roles.
Shoot an email directly to <a href="mailto:${siteConfig.email}" style="color: var(--accent-primary); text-decoration: underline;">${siteConfig.email}</a> to schedule a chat.
        `);
        break;

      case "clear":
      case "cls":
        terminalBody.innerHTML = "";
        break;

      default:
        appendLine(`command not found: ${escapeHtml(cmdRaw)}. Type <span style="color: var(--accent-emerald);">help</span> for available commands.`);
        break;
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleCommand(terminalInput.value);
      terminalInput.value = "";
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex] || "";
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex] || "";
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = "";
      }
    }
  });

  quickCmds.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cmd = btn.getAttribute("data-cmd");
      if (cmd) {
        handleCommand(cmd);
      }
    });
  });

  // Initial welcome message
  appendLine(`System initialized. Type <span style="color: var(--accent-emerald);">help</span> or click quick actions below to explore.`);
}
