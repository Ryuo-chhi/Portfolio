/**
 * Reads design tokens out of the cascade as plain numbers.
 *
 * Rive has no notion of CSS custom properties — its data-binding API wants
 * 0–255 channel values — so this is the bridge that lets the one palette in
 * index.css drive both the DOM and the canvas. getComputedStyle returns
 * whatever the cascade actually landed on, including the `.night` overrides,
 * so a caller only has to re-read after a theme change rather than keep a
 * second copy of the palette in JavaScript.
 */

const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)))

/** Parse a hex or rgb()/rgba() string. Browsers disagree on which one they
 *  hand back for a custom property, so both are accepted. */
export function parseColor(input) {
  const value = input.trim()

  const hex = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)
  if (hex) {
    const digits = hex[1]
    const full =
      digits.length === 3
        ? digits
            .split("")
            .map((c) => c + c)
            .join("")
        : digits
    return {
      r: parseInt(full.slice(0, 2), 16),
      g: parseInt(full.slice(2, 4), 16),
      b: parseInt(full.slice(4, 6), 16),
    }
  }

  // rgb(0 0 0), rgb(0, 0, 0), rgba(0 0 0 / 50%) — the separator varies
  const fn = value.match(/^rgba?\(([^)]+)\)$/i)
  if (fn) {
    const parts = fn[1]
      .split(/[\s,/]+/)
      .filter(Boolean)
      .slice(0, 3)
      .map(Number)
    if (parts.length === 3 && parts.every(Number.isFinite)) {
      return { r: clamp(parts[0]), g: clamp(parts[1]), b: clamp(parts[2]) }
    }
  }

  return null
}

/** Resolve a custom property on <html> to an RGB triplet. */
export function readCssRgb(cssVar) {
  if (typeof window === "undefined") return null
  const raw = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(cssVar)
  return raw ? parseColor(raw) : null
}
