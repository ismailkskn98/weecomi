export const productCategories = [
  { id: "business", translationKey: "business" },
  { id: "ai", translationKey: "ai" },
  { id: "assets", translationKey: "assets" },
  { id: "commerce", translationKey: "commerce" },
];

export const products = [
  {
    id: "weenetwork",
    slug: "weenetwork",
    category: "business",
    name: "WeeNetwork",
    nameCaps: "WEENETWORK",
    url: "https://weenetwork.com/",
    comingSoon: false,
    showDisclaimer: false,
    relatedIds: ["weemenu", "weecard", "weecatalog"],
  },
  {
    id: "weemenu",
    slug: "weemenu",
    category: "business",
    name: "WeeMenu",
    nameCaps: "WEEMENU",
    url: "https://weenetwork.menu/",
    comingSoon: false,
    showDisclaimer: false,
    relatedIds: ["weecard", "weekobi", "weenetwork"],
  },
  {
    id: "weecard",
    slug: "weecard",
    category: "business",
    name: "WeeCard",
    nameCaps: "WEECARD",
    url: "https://weenetwork.cards/",
    comingSoon: false,
    showDisclaimer: false,
    relatedIds: ["weemenu", "weenetwork", "weekobi"],
  },
  {
    id: "weecatalog",
    slug: "weecatalog",
    category: "business",
    name: "WeeCatalog",
    nameCaps: "WEECATALOG",
    url: null,
    comingSoon: true,
    showDisclaimer: false,
    relatedIds: ["weemenu", "weecard", "weesale"],
  },
  {
    id: "weekobi",
    slug: "weekobi",
    category: "business",
    name: "WeeKobi",
    nameCaps: "WEEKOBI",
    url: "https://kobi.weecomi.com/",
    comingSoon: false,
    showDisclaimer: false,
    relatedIds: ["weesale", "weemenu", "alisveriskapida"],
  },
  {
    id: "weesale",
    slug: "weesale",
    category: "commerce",
    name: "WeeSale",
    nameCaps: "WEESALE",
    url: "https://weesale.shop/",
    comingSoon: false,
    showDisclaimer: false,
    relatedIds: ["alisveriskapida", "weekobi", "weecatalog"],
  },
  {
    id: "alisveriskapida",
    slug: "alisveriskapida",
    category: "commerce",
    name: "Alışveriş Kapıda",
    nameCaps: "ALIŞVERİŞ KAPIDA",
    url: "https://alisveriskapida.com/",
    comingSoon: false,
    showDisclaimer: false,
    relatedIds: ["weesale", "weekobi", "weemenu"],
  },
  {
    id: "weecomibot",
    slug: "weecomi-bot",
    category: "ai",
    name: "WeeComi Bot",
    nameCaps: "WEECOMI BOT",
    url: "https://bot.weecomi.com/",
    comingSoon: false,
    showDisclaimer: true,
    relatedIds: ["weecoins", "weecoinspremium", "weekobi"],
  },
  {
    id: "weecoins",
    slug: "weecoins",
    category: "assets",
    name: "WeeCoins",
    nameCaps: "WEECOINS",
    url: "https://weecoins.org/",
    comingSoon: false,
    showDisclaimer: true,
    relatedIds: ["weecoinspremium", "weecomibot", "weesale"],
  },
  {
    id: "weecoinspremium",
    slug: "weecoins-premium",
    category: "assets",
    name: "WeeCoins Premium",
    nameCaps: "WEECOINS PREMIUM",
    url: "https://weecoinspremium.com/tr",
    comingSoon: false,
    showDisclaimer: true,
    relatedIds: ["weecoins", "weecomibot", "weesale"],
  },
  {
    id: "criptoswaps",
    slug: "criptoswaps",
    category: "assets",
    name: "CriptoSwaps",
    nameCaps: "CRIPTOSWAPS",
    url: "https://www.criptoswaps.com/",
    comingSoon: false,
    showDisclaimer: true,
    relatedIds: ["weecoins", "weecoinspremium", "weecomibot"],
  },
  {
    id: "weezard",
    slug: "weezard",
    category: "assets",
    name: "WeeZard",
    nameCaps: "WEEZARD",
    url: "http://weezard.org/",
    comingSoon: false,
    showDisclaimer: true,
    relatedIds: ["weecoins", "weecoinspremium", "criptoswaps"],
  },
];

export const solutionAreas = [
  {
    id: "digitize",
    productIds: ["weenetwork", "weemenu", "weecard", "weecatalog", "weekobi"],
  },
  {
    id: "growSales",
    productIds: ["weesale", "alisveriskapida"],
  },
  {
    id: "automate",
    productIds: ["weecomibot"],
  },
  {
    id: "joinEcosystem",
    productIds: ["weecoins", "weecoinspremium", "criptoswaps", "weezard"],
  },
];

export const globalRegions = [
  { id: "tr", nameKey: "turkey", coordinates: [35.2, 39.0], descriptionKey: "turkeyDesc" },
  { id: "az", nameKey: "azerbaijan", coordinates: [47.5, 40.1], descriptionKey: "azerbaijanDesc" },
  { id: "ge", nameKey: "georgia", coordinates: [43.5, 42.3], descriptionKey: "georgiaDesc" },
  { id: "ru", nameKey: "russia", coordinates: [37.6, 55.7], descriptionKey: "russiaDesc" },
  { id: "eu", nameKey: "europe", coordinates: [10.0, 51.0], descriptionKey: "europeDesc" },
];

export const socialLinks = [
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/" },
  { id: "x", label: "X", href: "https://x.com/" },
  { id: "youtube", label: "YouTube", href: "https://www.youtube.com/" },
];

export { fallbackNews, getFallbackNews } from "./fallbackNews";

export function getProductBySlug(slug) {
  return products.find((item) => item.slug === slug) || null;
}

export function getRelatedProducts(product) {
  if (!product?.relatedIds?.length) return [];
  return product.relatedIds.map((id) => products.find((item) => item.id === id)).filter(Boolean);
}

export function getProductPath(product) {
  return `/ecosystem/${product.slug}`;
}

export function getSolutionAreaBySlug(slug) {
  return solutionAreas.find((area) => area.id === slug) || null;
}

export function getSolutionPath(area) {
  const id = typeof area === "string" ? area : area?.id;
  return `/solutions/${id}`;
}

export function getProductsBySolutionArea(area) {
  const ids = area?.productIds || [];
  return products.filter((item) => ids.includes(item.id));
}

export function getProductsByCategory(categoryId) {
  return products.filter((item) => item.category === categoryId);
}
