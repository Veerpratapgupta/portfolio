/**
 * projects.js — Dynamic project card rendering & category filtering.
 */

import { projects, categories } from "../data/projects.js";

export function initProjects() {
  const container = document.getElementById("projects-grid");
  const filtersContainer = document.getElementById("project-filters");
  if (!container || !filtersContainer) return;

  // Render Category Filter Buttons
  filtersContainer.innerHTML = categories
    .map(
      (cat, i) => `
      <button class="filter-btn ${i === 0 ? "active" : ""}" data-category="${cat}">
        ${cat}
      </button>
    `
    )
    .join("");

  function renderCards(filterCat = "All") {
    const filtered =
      filterCat === "All"
        ? projects
        : projects.filter((p) => p.category === filterCat);

    container.innerHTML = filtered
      .map(
        (p) => `
        <article class="project-card" data-category="${p.category}">
          <div class="project-card-header">
            <div>
              <span class="project-badge">${p.badge || p.category}</span>
              <h3 class="project-title" style="margin-top: 0.5rem;">${p.title}</h3>
            </div>
          </div>

          <p class="project-desc">${p.description}</p>

          ${
            p.metrics
              ? `<div class="project-metric">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                  <span>${p.metrics}</span>
                </div>`
              : ""
          }

          <div class="project-tags">
            ${p.tags.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
          </div>

          <div class="project-card-footer">
            ${
              p.repoUrl
                ? `<a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" class="project-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    <span>Source Code</span>
                  </a>`
                : ""
            }
            ${
              p.demoUrl && p.demoUrl !== p.repoUrl
                ? `<a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" class="project-link" style="color: var(--accent-primary);">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    <span>Live Preview</span>
                  </a>`
                : ""
            }
          </div>
        </article>
      `
      )
      .join("");
  }

  // Filter Click Handler
  filtersContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    filtersContainer.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");
    renderCards(category);
  });

  // Initial render
  renderCards("All");
}
