/**
 * techstack.js — Renders categorized technical skill inventory.
 */

import { skillCategories } from "../data/skills.js";

export function initTechStack() {
  const container = document.getElementById("skills-grid");
  if (!container) return;

  container.innerHTML = skillCategories
    .map(
      (cat) => `
      <div class="skill-card">
        <h3 class="skill-category-title">${cat.name}</h3>
        <p class="skill-category-desc">${cat.description}</p>
        <div class="skill-list">
          ${cat.skills
            .map(
              (s) => `
              <div class="skill-row">
                <div class="skill-meta">
                  <span class="skill-name">${s.name}</span>
                  <span class="skill-level-badge">${s.level}</span>
                </div>
                <span class="skill-detail">${s.desc}</span>
              </div>
            `
            )
            .join("")}
        </div>
      </div>
    `
    )
    .join("");
}
