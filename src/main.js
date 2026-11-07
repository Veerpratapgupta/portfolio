/**
 * main.js — Application entry point.
 * Initializes all components and event systems.
 */

import { initAmbientCanvas } from "./components/canvas.js";
import { initNav } from "./components/nav.js";
import { initTerminal } from "./components/terminal.js";
import { initProjects } from "./components/projects.js";
import { initTechStack } from "./components/techstack.js";
import { initContact } from "./components/contact.js";
import { initCommandPalette } from "./components/palette.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Ambient Canvas
  initAmbientCanvas();

  // 2. Initialize Navigation & Theme Toggle
  initNav();

  // 3. Initialize Interactive Terminal HUD
  initTerminal();

  // 4. Initialize Projects Cards & Filtering
  initProjects();

  // 5. Initialize Tech Stack Grid
  initTechStack();

  // 6. Initialize Contact Actions & Confetti
  initContact();

  // 7. Initialize Global Command Palette (Cmd+K)
  initCommandPalette();

  // 8. Set dynamic footer year
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  console.log(
    "%c⚡ Veer Pratap Gupta — Systems, Full-Stack & AI Systems Engineer",
    "background: #6366f1; color: #ffffff; padding: 4px 8px; border-radius: 4px; font-weight: bold;"
  );
  console.log("Press Cmd+K or Ctrl+K to open the interactive command palette.");
});
