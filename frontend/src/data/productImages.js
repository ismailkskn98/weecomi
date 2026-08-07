import { HIKARI_HERO_MD } from "@/data/hikariImages";

const FALLBACK_COVER = HIKARI_HERO_MD;
const FALLBACK_DETAIL = "/images/hikari/campaign-1.jpg";

/** 5:4 cover images — overview cards, related cards, list thumbnails */
export const productCoverImages = {
  criptoswaps: "/images/products/criptoswaps-cover.webp",
};

/** 16:10 detail images — product detail hero / inline content */
export const productDetailImages = {
  criptoswaps: "/images/products/asd.png",
};

export function getProductCoverImage(productId) {
  return productCoverImages[productId] || FALLBACK_COVER;
}

export function getProductDetailImage(productId) {
  return productDetailImages[productId] || FALLBACK_DETAIL;
}
