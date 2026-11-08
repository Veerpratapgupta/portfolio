/**
 * theme.js — Single source of truth for theme state.
 * Keeps the data-theme attribute, color-scheme, meta theme-color,
 * toggle icons, and aria-pressed in sync.
 */

const STORAGE_KEY = "theme";
const media = window.matchMedia("(prefers-color-scheme: dark)");

const ICONS = {
  dark: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>`,
  light: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>`,
};

export function getStoredTheme() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "dark" || value === "light" ? value : null;
  } catch {
    return null;
  }
}

export function getPreferredTheme() {
  return getStoredTheme() || (media.matches ? "dark" : "light");
}

export function getCurrentTheme() {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

export function applyTheme(theme, { persist = false } = {}) {
  const next = theme === "light" ? "light" : "dark";
  const root = document.documentElement;

  root.setAttribute("data-theme", next);
  root.style.colorScheme = next;

  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage can be unavailable in private mode */
    }
  }

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", next === "light" ? "#f8fafc" : "#07090e");

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    const isDark = next === "dark";
    button.innerHTML = isDark ? ICONS.dark : ICONS.light;
    button.setAttribute("aria-pressed", String(isDark));
    button.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  });
}

export function toggleTheme() {
  applyTheme(getCurrentTheme() === "dark" ? "light" : "dark", { persist: true });
}

export function initTheme() {
  applyTheme(getPreferredTheme());

  media.addEventListener("change", (event) => {
    if (!getStoredTheme()) applyTheme(event.matches ? "dark" : "light");
  });

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", toggleTheme);
  });
}
