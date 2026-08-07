/** Safe metrics lookup — avoids MISSING_MESSAGE when a product has no Ecosystem.metrics yet. */
export function getProductMetrics(tEco, productId) {
  const key = `${productId}.metrics`;
  if (typeof tEco.has === "function" && !tEco.has(key)) return [];
  try {
    const raw = tEco.raw(key);
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}
