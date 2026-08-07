/** Shared Agero title helpers — safe for Server and Client Components */

import { HIKARI_HERO_MD } from "@/data/hikariImages";

export const PAGE_HERO_IMAGES = {
  a: HIKARI_HERO_MD,
  b: "/images/hikari/campaign-1.jpg",
  c: "/images/example.jpg",
};

/**
 * Build Agero Work-Single title rows: always 2 dense lines with pill + circle images.
 * @param {string[]} lines - title fragments (1–3+)
 */
export function buildAgeroTitleRows(lines = []) {
  const parts = (Array.isArray(lines) ? lines : [lines]).map(String).filter(Boolean);
  const { a, b } = PAGE_HERO_IMAGES;

  if (parts.length >= 3) {
    return [
      [{ text: parts[0] }, { image: a, shape: "pill" }, { text: parts[1], tone: "accent" }],
      [{ image: b, shape: "circle" }, { text: parts.slice(2).join(" ") }],
    ];
  }

  if (parts.length === 2) {
    return [
      [{ text: parts[0] }, { image: a, shape: "pill" }, { text: parts[1], tone: "accent" }],
      [{ image: b, shape: "circle" }, { text: parts[1], tone: "muted" }],
    ];
  }

  const words = (parts[0] || "").split(/\s+/).filter(Boolean);
  if (words.length >= 3) {
    const mid = Math.ceil(words.length / 2);
    return [
      [{ text: words.slice(0, mid).join(" ") }, { image: a, shape: "pill" }, { text: words[mid], tone: "accent" }],
      [{ image: b, shape: "circle" }, { text: words.slice(mid + 1).join(" ") || words[mid] }],
    ];
  }

  if (words.length === 2) {
    return [
      [{ text: words[0] }, { image: a, shape: "pill" }, { text: words[1], tone: "accent" }],
      [{ image: b, shape: "circle" }, { text: words[1], tone: "muted" }],
    ];
  }

  return [
    [{ text: parts[0] || "" }, { image: a, shape: "pill" }],
    [{ image: b, shape: "circle" }, { text: parts[0] || "", tone: "muted" }],
  ];
}
