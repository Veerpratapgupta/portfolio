/**
 * nav.js — Header styling, scroll spy, mobile menu, and theme bootstrap.
 */

import { initTheme } from "./theme.js";

export function initNav() {
  initTheme();

  const header = document.querySelector(".site-header");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const sections = Array.from(document.querySelectorAll("section[id]"));

  initMobileMenu();
  initScrollSpy(sections, navLinks);
  initHeaderState(header);
}

function initMobileMenu() {
  const mobileNav = document.getElementById("mobile-nav");
  if (!mobileNav) return;

  const summary = mobileNav.querySelector("summary");
  if (!summary) return;

  const syncExpanded = () => {
    summary.setAttribute("aria-expanded", String(mobileNav.open));
    summary.setAttribute("aria-label", mobileNav.open ? "Close navigation menu" : "Open navigation menu");
  };

  syncExpanded();
  mobileNav.addEventListener("toggle", syncExpanded);

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.open = false;
    });
  });

  document.addEventListener("click", (event) => {
    if (mobileNav.open && !mobileNav.contains(event.target)) {
      mobileNav.open = false;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileNav.open) {
      mobileNav.open = false;
      summary.focus();
    }
  });
}

function initScrollSpy(sections, navLinks) {
  if (!sections.length || !navLinks.length) return;

  const visibility = new Map();

  const setActive = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      });

      let bestId = "";
      let bestRatio = 0;
      visibility.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });

      if (bestId) setActive(bestId);
    },
    {
      rootMargin: "-25% 0px -55% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function initHeaderState(header) {
  if (!header) return;

  let ticking = false;

  const update = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true }
  );

  update();
}
