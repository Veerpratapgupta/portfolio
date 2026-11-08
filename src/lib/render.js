/**
 * render.js — Pure, build-time HTML renderers.
 * Imported by scripts/vite-content-plugin.mjs so content is present
 * in the served/built HTML before any JavaScript runs.
 */

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const ICONS = {
  github:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>',
  linkedin:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>',
  twitter:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>',
  arrow:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
  external:
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>',
  source:
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>',
  activity:
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>',
};

export function renderMeta(site) {
  const title = `${site.name} — ${site.title}`;
  const url = site.url || "";
  const image = site.ogImage ? new URL(site.ogImage, url).href : "";
  const sameAs = [site.github, site.linkedin, site.twitter].filter(Boolean);
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url,
    jobTitle: site.title,
    description: site.tagline,
    email: `mailto:${site.email}`,
    sameAs,
  }).replace(/</g, "\\u003c");

  return `<title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(site.tagline)}" />
    <meta name="author" content="${escapeHtml(site.name)}" />
    <meta name="theme-color" content="#07090e" />
    <link rel="canonical" href="${escapeHtml(url)}" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeHtml(site.name)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(site.tagline)}" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    ${image ? `<meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(
      `${site.name} — ${site.title}`
    )}" />` : ""}

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(site.tagline)}" />
    ${image ? `<meta name="twitter:image" content="${escapeHtml(image)}" />
    <meta name="twitter:image:alt" content="${escapeHtml(
      `${site.name} — ${site.title}`
    )}" />` : ""}

    <script type="application/ld+json">${jsonLd}</script>`;
}

export function renderNavLinks(links, linkClass = "nav-link") {
  return links
    .map(
      (link) =>
        `<li><a href="${escapeHtml(link.href)}" class="${escapeHtml(
          linkClass
        )}">${escapeHtml(link.label)}</a></li>`
    )
    .join("\n            ");
}

export function renderHero(site) {
  const resume =
    site.resumeUrl && site.resumeUrl !== "#contact"
      ? `<a href="${escapeHtml(site.resumeUrl)}" class="btn btn-secondary" download>View Résumé</a>`
      : "";

  return `<div class="hero-status-pill">
          <span class="pulse-dot" aria-hidden="true"></span>
          <span>${escapeHtml(site.availability)}</span>
        </div>

        <h1 class="hero-headline">
          ${escapeHtml(site.headline)}<br />
          <span class="text-gradient">${escapeHtml(site.headlineAccent)}</span>.
        </h1>

        <p class="hero-lead">
          I'm <strong>${escapeHtml(site.name)}</strong>. ${escapeHtml(site.tagline)}
        </p>

        <p class="hero-location">${escapeHtml(site.location)}</p>

        <div class="hero-actions">
          <a href="#projects" class="btn btn-primary">
            <span>Explore Work</span>
            ${ICONS.arrow}
          </a>
          <a href="#contact" class="btn btn-secondary">
            <span>Get in Touch</span>
          </a>
          ${resume}
        </div>`;
}

export function renderStats(stats) {
  return stats
    .map(
      (stat) => `<div class="stat-item">
            <span class="stat-label">${escapeHtml(stat.label)}</span>
            <span class="stat-val">${escapeHtml(stat.value)}</span>
          </div>`
    )
    .join("\n          ");
}

export function renderPrinciples(principles) {
  return principles
    .map(
      (item) => `<div class="principle-card">
            <h3 class="principle-title">${escapeHtml(item.title)}</h3>
            <p class="principle-desc">${escapeHtml(item.description)}</p>
          </div>`
    )
    .join("\n          ");
}

export function renderProjectFilters(categories) {
  return categories
    .map(
      (category, index) =>
        `<button type="button" class="filter-btn${index === 0 ? " active" : ""}" data-category="${escapeHtml(
          category
        )}" aria-pressed="${index === 0}">${escapeHtml(category)}</button>`
    )
    .join("\n          ");
}

export function renderProjects(projects) {
  return projects
    .map((project) => {
      const links = [];
      if (project.repoUrl) {
        links.push(
          `<a href="${escapeHtml(project.repoUrl)}" target="_blank" rel="noopener noreferrer" class="project-link">${ICONS.source}<span>Source Code</span></a>`
        );
      }
      if (project.demoUrl && project.demoUrl !== project.repoUrl) {
        links.push(
          `<a href="${escapeHtml(project.demoUrl)}" target="_blank" rel="noopener noreferrer" class="project-link project-link-demo">${ICONS.external}<span>Live Preview</span></a>`
        );
      }
      if (links.length === 0 && project.caseStudy) {
        links.push(
          `<span class="project-link project-link-muted">Case study available on request</span>`
        );
      }

      const highlights = project.highlights?.length
        ? `<ul class="project-highlights">${project.highlights
            .map((highlight) => `<li>${escapeHtml(highlight)}</li>`)
            .join("")}</ul>`
        : "";

      return `<article class="project-card" data-category="${escapeHtml(project.category)}">
          <div class="project-card-header">
            <div>
              <span class="project-badge">${escapeHtml(project.badge || project.category)}</span>
              <h3 class="project-title">${escapeHtml(project.title)}</h3>
            </div>
          </div>

          <p class="project-desc">${escapeHtml(project.description)}</p>
          ${highlights}

          ${
            project.metrics
              ? `<div class="project-metric">${ICONS.activity}<span>${escapeHtml(
                  project.metrics
                )}</span></div>`
              : ""
          }

          <div class="project-tags">
            ${project.tags.map((tag) => `<span class="tech-tag">${escapeHtml(tag)}</span>`).join("")}
          </div>

          <div class="project-card-footer">${links.join("")}</div>
        </article>`;
    })
    .join("\n        ");
}

export function renderSkills(categories) {
  return categories
    .map(
      (category) => `<div class="skill-card">
            <h3 class="skill-category-title">${escapeHtml(category.name)}</h3>
            <p class="skill-category-desc">${escapeHtml(category.description)}</p>
            <div class="skill-list">
              ${category.skills
                .map(
                  (skill) => `<div class="skill-row">
                <div class="skill-meta">
                  <span class="skill-name">${escapeHtml(skill.name)}</span>
                  <span class="skill-level-badge">${escapeHtml(skill.level)}</span>
                </div>
                <span class="skill-detail">${escapeHtml(skill.desc)}</span>
              </div>`
                )
                .join("")}
            </div>
          </div>`
    )
    .join("\n          ");
}

export function renderContact(site) {
  return `<span class="section-tag">Get in Touch</span>
          <h2 class="section-title contact-title">Let's Build Something High-Impact</h2>
          <p class="section-subtitle contact-subtitle">
            Whether you're looking for a Senior / Staff Engineer, a Founding Developer, or exploring
            distributed systems and autonomous agent pipelines, my inbox is open.
          </p>

          <div class="contact-email-box">
            <a id="email-display-text" href="mailto:${escapeHtml(site.email)}">${escapeHtml(
              site.email
            )}</a>
            <button id="copy-email-btn" class="copy-btn js-only" type="button" aria-label="Copy email address">
              Copy Email
            </button>
            <span id="copy-status" class="sr-only" role="status" aria-live="polite"></span>
          </div>

          <div class="social-links">
            <a href="${escapeHtml(site.github)}" target="_blank" rel="noopener noreferrer" class="social-btn">
              ${ICONS.github}<span>GitHub</span>
            </a>
            <a href="${escapeHtml(site.linkedin)}" target="_blank" rel="noopener noreferrer" class="social-btn">
              ${ICONS.linkedin}<span>LinkedIn</span>
            </a>
            <a href="${escapeHtml(site.twitter)}" target="_blank" rel="noopener noreferrer" class="social-btn">
              ${ICONS.twitter}<span>Twitter / X</span>
            </a>
          </div>`;
}

export function renderTerminalWelcome() {
  return `<div class="terminal-output">System initialized. Type <span class="term-accent">help</span> or click a quick action below to explore.</div>`;
}

export function renderFooter(site) {
  const year = new Date().getFullYear();
  return `<span>© ${year} ${escapeHtml(site.name)} · Built with Vite &amp; Vanilla ES Modules</span>
      <div class="footer-links">
        <a href="#hero">Back to Top ↑</a>
        <a href="${escapeHtml(site.github)}/portfolio" target="_blank" rel="noopener noreferrer">Source Code</a>
      </div>`;
}
