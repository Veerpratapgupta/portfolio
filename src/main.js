/**
 * main.js — Application entry point.
 * Content is rendered at build time; this file only enhances behavior.
 */

import { initAmbientCanvas } from "./components/canvas.js";
import { initNav } from "./components/nav.js";
import { initTerminal } from "./components/terminal.js";
import { initProjects } from "./components/projects.js";
import { initContact } from "./components/contact.js";
import { initCommandPalette } from "./components/palette.js";

document.addEventListener("DOMContentLoaded", () => {
  initAmbientCanvas();
  initNav();
  initTerminal();
  initProjects();
  initContact();
  initCommandPalette();

  if (import.meta.env.DEV) {
    console.log(
      "%cVeer Pratap Gupta — Systems, Full-Stack & AI Systems Engineer",
      "background: #6366f1; color: #ffffff; padding: 4px 8px; border-radius: 4px; font-weight: bold;"
    );
    console.log("Press Cmd+K or Ctrl+K to open the interactive command palette.");
  }
});
