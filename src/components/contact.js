/**
 * contact.js — Email copy action, confetti trigger, and social links.
 */

import { siteConfig } from "../data/site.js";
import { triggerConfetti } from "./confetti.js";

export function initContact() {
  const copyBtn = document.getElementById("copy-email-btn");
  const emailText = document.getElementById("email-display-text");
  if (!copyBtn) return;

  if (emailText) {
    emailText.textContent = siteConfig.email;
  }

  copyBtn.addEventListener("click", async (e) => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      triggerConfetti(e.clientX, e.clientY);

      const originalText = copyBtn.textContent;
      copyBtn.textContent = "Copied! ✓";
      copyBtn.style.background = "var(--accent-emerald)";

      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = "";
      }, 2500);
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  });
}
