// Usage: node scripts/check-contrast.mjs
//
// Hex values are copied from src/styles/tokens.css. This script does not import CSS.
// The terminal keeps dark-theme tokens in both page themes, so it is checked
// separately against the terminal background.

const MIN_NORMAL_TEXT_CONTRAST = 4.5;

const THEMES = {
  dark: {
    "text-primary": "#f8fafc",
    "text-secondary": "#94a3b8",
    "text-muted": "#8b98ad",
    "text-inverse": "#0f172a",
    "accent-primary": "#5b5ee8",
    "accent-emerald": "#10b981",
    "accent-text": "#818cf8",
    "on-accent": "#ffffff",
    "bg-base": "#07090e",
    "bg-surface": "#0f121a",
    "bg-elevated": "#161b26",
  },
  light: {
    "text-primary": "#090d16",
    "text-secondary": "#475569",
    "text-muted": "#556277",
    "text-inverse": "#f8fafc",
    "accent-primary": "#4f46e5",
    "accent-emerald": "#047857",
    "accent-text": "#4338ca",
    "on-accent": "#ffffff",
    "bg-base": "#f8fafc",
    "bg-surface": "#ffffff",
    "bg-elevated": "#f1f5f9",
  },
};

const TERMINAL = {
  "text-primary": "#f8fafc",
  "text-secondary": "#cbd5e1",
  "text-muted": "#8b98ad",
  bg: "#090c13",
};

const TEXT_TOKENS = ["text-primary", "text-secondary", "text-muted"];
const BACKGROUND_TOKENS = ["bg-base", "bg-surface", "bg-elevated"];
const ACCENT_PAIRS = [
  ["on-accent", "accent-primary"],
  ["accent-emerald", "bg-base"],
  ["accent-emerald", "bg-surface"],
  ["accent-emerald", "bg-elevated"],
  ["accent-text", "bg-base"],
  ["accent-text", "bg-surface"],
  ["accent-text", "bg-elevated"],
  ["text-inverse", "accent-emerald"],
];

function hexToRgb(hex) {
  const value = hex.slice(1);
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) {
    throw new Error(`Expected #rrggbb, received ${hex}`);
  }
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
  ];
}

/** WCAG 2.x relative luminance. The sRGB breakpoint in the spec is 0.03928. */
function channelLuminance(channel) {
  const srgb = channel / 255;
  return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(hex) {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b);
}

function contrastRatio(foreground, background) {
  const lighter = Math.max(relativeLuminance(foreground), relativeLuminance(background));
  const darker = Math.min(relativeLuminance(foreground), relativeLuminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

function pad(value, width) {
  const text = String(value);
  return text.length >= width ? text : text + " ".repeat(width - text.length);
}

const rows = [];
for (const [theme, tokens] of Object.entries(THEMES)) {
  for (const textToken of TEXT_TOKENS) {
    for (const backgroundToken of BACKGROUND_TOKENS) {
      const ratio = contrastRatio(tokens[textToken], tokens[backgroundToken]);
      rows.push({
        theme,
        text: textToken,
        background: backgroundToken,
        pair: `${tokens[textToken]} on ${tokens[backgroundToken]}`,
        ratio,
        pass: ratio >= MIN_NORMAL_TEXT_CONTRAST,
      });
    }
  }
}

for (const [theme, tokens] of Object.entries(THEMES)) {
  for (const [textToken, backgroundToken] of ACCENT_PAIRS) {
    const ratio = contrastRatio(tokens[textToken], tokens[backgroundToken]);
    rows.push({
      theme,
      text: textToken,
      background: backgroundToken,
      pair: `${tokens[textToken]} on ${tokens[backgroundToken]}`,
      ratio,
      pass: ratio >= MIN_NORMAL_TEXT_CONTRAST,
    });
  }
}

for (const textToken of TEXT_TOKENS) {
  const ratio = contrastRatio(TERMINAL[textToken], TERMINAL.bg);
  rows.push({
    theme: "terminal",
    text: textToken,
    background: "bg-terminal",
    pair: `${TERMINAL[textToken]} on ${TERMINAL.bg}`,
    ratio,
    pass: ratio >= MIN_NORMAL_TEXT_CONTRAST,
  });
}

const header = ["theme", "text", "background", "pair", "ratio", "status"];
const body = rows.map((row) => [
  row.theme,
  row.text,
  row.background,
  row.pair,
  row.ratio.toFixed(2),
  row.pass ? "pass" : "fail",
]);
const widths = header.map((cell, index) => Math.max(cell.length, ...body.map((line) => line[index].length)));
const format = (cells) => cells.map((cell, index) => pad(cell, widths[index])).join("  ");

console.log(`WCAG 2.x contrast for normal text (minimum ${MIN_NORMAL_TEXT_CONTRAST}:1)`);
console.log("text-muted is treated as normal text. Values are hardcoded from src/styles/tokens.css.");
console.log("");
console.log(format(header));
for (const line of body) console.log(format(line));
console.log("");

const failures = rows.filter((row) => !row.pass);
if (failures.length > 0) {
  console.error(`FAIL: ${failures.length} pair${failures.length === 1 ? "" : "s"} below ${MIN_NORMAL_TEXT_CONTRAST}:1`);
  process.exit(1);
}

console.log(`PASS: all ${rows.length} pairs meet ${MIN_NORMAL_TEXT_CONTRAST}:1`);
