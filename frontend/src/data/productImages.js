import { HIKARI_HERO_MD } from "@/data/hikariImages";

const FALLBACK_COVER = HIKARI_HERO_MD;
const FALLBACK_DETAIL = "/images/hikari/campaign-1.jpg";

/** 5:4 cover images — overview cards, related cards, list thumbnails */
export const productCoverImages = {
  weenetwork: "/images/products/weenetwork-cover.png",
  weemenu: "/images/products/weemenu-cover.png",
  weecard: "/images/products/weecard-cover.png",
  weecatalog: "/images/products/weecatalog-cover.png",
  weekobi: "/images/products/weekobi-cover.png",
  weesale: "/images/products/weesale-cover.png",
  alisveriskapida: "/images/products/alisveriskapida-cover.png",
  weecomibot: "/images/products/weecomibot-cover.png",
  weecoins: "/images/products/weecoins-cover.png",
  weecoinspremium: "/images/products/weecoinspremium-cover.png",
  criptoswaps: "/images/products/criptoswaps-cover.webp",
  weezard: "/images/products/weezard-cover.png",
};

/** 16:10 detail images — product detail hero / inline content */
export const productDetailImages = {
  weenetwork: "/images/products/weenetwork-detail.png",
  weemenu: "/images/products/weemenu-detail.png",
  weecard: "/images/products/weecard-detail.png",
  weecatalog: "/images/products/weecatalog-detail.png",
  weekobi: "/images/products/weekobi-detail.png",
  weesale: "/images/products/weesale-detail.png",
  alisveriskapida: "/images/products/alisveriskapida-detail.png",
  weecomibot: "/images/products/weecomibot-detail.png",
  weecoins: "/images/products/weecoins-detail.png",
  weecoinspremium: "/images/products/weecoinspremium-detail.png",
  criptoswaps: "/images/products/criptoswaps-detail.png",
  weezard: "/images/products/weezard-detail.png",
};

export function getProductCoverImage(productId) {
  return productCoverImages[productId] || FALLBACK_COVER;
}

export function getProductDetailImage(productId) {
  return productDetailImages[productId] || FALLBACK_DETAIL;
}
