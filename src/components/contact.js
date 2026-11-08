/**
 * contact.js — Email copy action with mailto fallback and confetti.
 */

import { siteConfig } from "../data/site.js";
import { triggerConfetti } from "./confetti.js";

export function initContact() {
  const copyBtn = document.getElementById("copy-email-btn");
  if (!copyBtn) return;

  const status = document.getElementById("copy-status");
  const originalText = copyBtn.textContent;
  let resetTimer;

  copyBtn.addEventListener("click", async (event) => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      triggerConfetti(event.clientX, event.clientY);

      copyBtn.textContent = "Copied!";
      copyBtn.classList.add("copied");
      if (status) status.textContent = "Email address copied to clipboard.";

      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.classList.remove("copied");
        if (status) status.textContent = "";
      }, 2500);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
  });
}
