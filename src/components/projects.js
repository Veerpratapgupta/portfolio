/**
 * projects.js — Enhances the build-time project grid with category filtering.
 * Cards are already in the HTML, so this is pure progressive enhancement.
 */

export function initProjects() {
  const container = document.getElementById("projects-grid");
  const filtersContainer = document.getElementById("project-filters");
  if (!container || !filtersContainer) return;

  const cards = Array.from(container.querySelectorAll(".project-card"));
  const buttons = Array.from(filtersContainer.querySelectorAll(".filter-btn"));

  const applyFilter = (category) => {
    buttons.forEach((button) => {
      const isActive = button.dataset.category === category;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    cards.forEach((card) => {
      const matches = category === "All" || card.dataset.category === category;
      card.hidden = !matches;
    });
  };

  filtersContainer.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (!button) return;
    applyFilter(button.dataset.category);
  });

  applyFilter("All");
}
