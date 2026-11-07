/**
 * palette.js — Global Cmd+K / Ctrl+K Command Palette.
 */

import { siteConfig } from "../data/site.js";
import { triggerConfetti } from "./confetti.js";

export function initCommandPalette() {
  const modal = document.getElementById("palette-modal");
  const input = document.getElementById("palette-input");
  const list = document.getElementById("palette-list");
  const triggerBtn = document.getElementById("palette-trigger-btn");
  if (!modal || !input || !list) return;

  const actions = [
    { title: "Navigate to Projects", section: "#projects", category: "Navigation" },
    { title: "Open Terminal HUD", section: "#terminal-section", category: "Navigation" },
    { title: "View Tech Stack", section: "#stack", category: "Navigation" },
    { title: "Read About & Principles", section: "#about", category: "Navigation" },
    { title: "Contact & Email", section: "#contact", category: "Navigation" },
    { title: "Toggle Dark / Light Theme", action: "toggle-theme", category: "Preferences" },
    { title: "Copy Email Address", action: "copy-email", category: "Contact" },
    { title: "View GitHub Profile", url: siteConfig.github, category: "External" },
    { title: "Celebration Confetti 🎉", action: "confetti", category: "Fun" }
  ];

  function openPalette() {
    modal.classList.add("open");
    input.value = "";
    renderList(actions);
    setTimeout(() => input.focus(), 50);
  }

  function closePalette() {
    modal.classList.remove("open");
  }

  function renderList(items) {
    list.innerHTML = "";
    if (items.length === 0) {
      list.innerHTML = `<li style="padding: 1rem; color: var(--text-muted); text-align: center;">No matching commands found.</li>`;
      return;
    }

    items.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = `palette-item ${index === 0 ? "selected" : ""}`;
      li.innerHTML = `
        <span>${item.title}</span>
        <span class="kbd-badge">${item.category}</span>
      `;

      li.addEventListener("click", () => {
        executeItem(item);
      });
      list.appendChild(li);
    });
  }

  function executeItem(item) {
    closePalette();
    if (item.section) {
      const el = document.querySelector(item.section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (item.url) {
      window.open(item.url, "_blank");
    } else if (item.action === "toggle-theme") {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    } else if (item.action === "copy-email") {
      navigator.clipboard.writeText(siteConfig.email);
      triggerConfetti();
    } else if (item.action === "confetti") {
      triggerConfetti();
    }
  }

  // Filter input
  input.addEventListener("input", () => {
    const query = input.value.toLowerCase().trim();
    const filtered = actions.filter(
      (a) => a.title.toLowerCase().includes(query) || a.category.toLowerCase().includes(query)
    );
    renderList(filtered);
  });

  // Keyboard shortcut listener (Cmd+K or Ctrl+K)
  window.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (modal.classList.contains("open")) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === "Escape" && modal.classList.contains("open")) {
      closePalette();
    }
  });

  // Modal backdrop click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closePalette();
    }
  });

  if (triggerBtn) {
    triggerBtn.addEventListener("click", openPalette);
  }
}
