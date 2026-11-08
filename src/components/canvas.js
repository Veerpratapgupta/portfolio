/**
 * canvas.js — Ambient constellation background.
 * DPR-aware, paused when the tab is hidden, and disabled for reduced motion.
 */

export function initAmbientCanvas() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;
  let points = [];
  let rafId = 0;
  let running = false;

  const seed = () => {
    const count = Math.min(Math.floor((width * height) / 32000), 38);
    points = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.5 + 0.5,
    }));
  };

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (!points.length) {
      seed();
    } else {
      points.forEach((point) => {
        if (point.x > width) point.x = Math.random() * width;
        if (point.y > height) point.y = Math.random() * height;
      });
    }
  };

  const draw = () => {
    if (!running) return;

    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const dotColor = isLight ? "rgba(79, 70, 229, 0.28)" : "rgba(148, 163, 184, 0.25)";
    const lineColor = isLight ? "rgba(79, 70, 229, 0.06)" : "rgba(99, 102, 241, 0.06)";

    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      point.x += point.vx;
      point.y += point.vy;

      if (point.x < 0) point.x = width;
      if (point.x > width) point.x = 0;
      if (point.y < 0) point.y = height;
      if (point.y > height) point.y = 0;

      ctx.beginPath();
      ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
      ctx.fillStyle = dotColor;
      ctx.fill();

      for (let j = i + 1; j < points.length; j++) {
        const other = points[j];
        const dx = point.x - other.x;
        const dy = point.y - other.y;
        const distance = Math.hypot(dx, dy);

        if (distance < 120) {
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = lineColor;
          ctx.stroke();
        }
      }
    }

    rafId = requestAnimationFrame(draw);
  };

  const start = () => {
    if (running || reducedMotion.matches) return;
    running = true;
    rafId = requestAnimationFrame(draw);
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(rafId);
  };

  window.addEventListener("resize", resize, { passive: true });
  document.addEventListener("visibilitychange", () => {
    document.hidden ? stop() : start();
  });
  reducedMotion.addEventListener("change", (event) => {
    event.matches ? stop() : start();
  });

  resize();
  start();
}
