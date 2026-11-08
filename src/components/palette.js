/**
 * palette.js — Accessible Cmd+K / Ctrl+K command palette.
 * Implements focus trapping, focus restore, arrow-key navigation,
 * scroll locking, and reduced-motion-aware scrolling.
 */

import { siteConfig } from "../data/site.js";
import { triggerConfetti } from "./confetti.js";
import { toggleTheme } from "./theme.js";

export function initCommandPalette() {
  const modal = document.getElementById("palette-modal");
  const input = document.getElementById("palette-input");
  const list = document.getElementById("palette-list");
  const triggerBtn = document.getElementById("palette-trigger-btn");
  const mobileTriggerBtn = document.getElementById("mobile-palette-btn");
  const mobileNav = document.getElementById("mobile-nav");
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
    { title: "Celebration Confetti 🎉", action: "confetti", category: "Fun" },
  ];

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let previousFocus = null;
  let filtered = actions;

  const isOpen = () => modal.classList.contains("open");

  function openPalette() {
    if (isOpen()) return;

    previousFocus = document.activeElement;
    input.value = "";
    filtered = actions;
    renderList(filtered);

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("palette-open");
    triggerBtn?.setAttribute("aria-expanded", "true");

    input.focus();
    if (document.activeElement !== input) {
      requestAnimationFrame(() => {
        if (isOpen()) input.focus();
      });
    }
  }

  function isFocusableVisible(element) {
    if (!element?.isConnected) return false;
    if (element.closest("details:not([open])") && !element.matches("summary")) return false;
    return element.offsetParent !== null;
  }

  function closePalette({ restoreFocus = true } = {}) {
    if (!isOpen()) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("palette-open");
    triggerBtn?.setAttribute("aria-expanded", "false");

    if (restoreFocus) {
      const candidates = [
        previousFocus,
        triggerBtn,
        mobileTriggerBtn,
        document.querySelector(".mobile-nav-toggle"),
      ];
      const target = candidates.find(isFocusableVisible);
      target?.focus();
    }
    previousFocus = null;
  }

  function renderList(items) {
    list.innerHTML = "";

    if (items.length === 0) {
      const empty = document.createElement("li");
      empty.className = "palette-empty";
      empty.textContent = "No matching commands found.";
      list.appendChild(empty);
      return;
    }

    items.forEach((item, index) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "palette-item";
      if (index === 0) button.classList.add("selected");
      button.innerHTML = `<span>${item.title}</span><span class="kbd-badge">${item.category}</span>`;

      button.addEventListener("focus", () => {
        list.querySelectorAll(".palette-item").forEach((el) => el.classList.remove("selected"));
        button.classList.add("selected");
      });
      button.addEventListener("click", () => executeItem(item));

      li.appendChild(button);
      list.appendChild(li);
    });
  }

  function executeItem(item) {
    closePalette({ restoreFocus: false });

    if (item.section) {
      const target = document.querySelector(item.section);
      target?.scrollIntoView({
        behavior: prefersReduced.matches ? "auto" : "smooth",
        block: "start",
      });
    } else if (item.url) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else if (item.action === "toggle-theme") {
      toggleTheme();
    } else if (item.action === "copy-email") {
      navigator.clipboard
        .writeText(siteConfig.email)
        .then(() => triggerConfetti())
        .catch(() => {
          window.location.href = `mailto:${siteConfig.email}`;
        });
    } else if (item.action === "confetti") {
      triggerConfetti();
    }
  }

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase().trim();
    filtered = actions.filter(
      (action) =>
        action.title.toLowerCase().includes(query) ||
        action.category.toLowerCase().includes(query)
    );
    renderList(filtered);
  });

  modal.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && document.activeElement === input) {
      const selected = list.querySelector(".palette-item.selected") || list.querySelector(".palette-item");
      if (selected) {
        event.preventDefault();
        selected.click();
      }
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      const buttons = Array.from(list.querySelectorAll(".palette-item"));
      if (!buttons.length) return;
      event.preventDefault();

      const down = event.key === "ArrowDown";
      const current = buttons.indexOf(document.activeElement);
      const next =
        current === -1
          ? (down ? 0 : buttons.length - 1)
          : (current + (down ? 1 : -1) + buttons.length) % buttons.length;
      buttons[next].focus();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = Array.from(
      modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => !element.disabled && element.offsetParent !== null);

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      event.preventDefault();
      closePalette();
      return;
    }

    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      isOpen() ? closePalette() : openPalette();
    }
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closePalette();
  });

  triggerBtn?.addEventListener("click", openPalette);

  mobileTriggerBtn?.addEventListener("click", () => {
    if (mobileNav) mobileNav.open = false;
    openPalette();
  });
}
