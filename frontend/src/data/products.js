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
    productIds: ["weecoins", "weecoinspremium", "criptoswaps"],
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

export const fallbackNews = [
  {
    id: 1,
    slug: "weecomi-ecosystem-expanding",
    category: "company",
    isFeatured: true,
    author: "WeeComi",
    title: "WeeComi ekosistemi büyümeye devam ediyor",
    summary: "Yeni ürün güncellemeleri ve uluslararası erişim ile WeeComi dijital ekosistemini güçlendiriyor.",
    highlight: "Bağımsız ürünlerle ticaret, yapay zekâ ve işletme yönetimi için güçlü bir teknoloji portföyü geliştiriyoruz.",
    content:
      "WeeComi; WeeMenu, WeeCard, WeeCatalog ve diğer çözümleriyle işletmelerin dijital dönüşümünü hızlandırıyor.\n\nUluslararası pazarlarda çok dilli deneyim ve ölçeklenebilir altyapı ile büyümeyi sürdürülebilir hale getiriyoruz.",
    publishedAt: "2026-06-10",
    coverImageUrl: null,
    authorImageUrl: null,
  },
  {
    id: 2,
    slug: "weemenu-realtime-operations",
    category: "weemenu",
    isFeatured: false,
    author: "WeeComi",
    title: "WeeMenu ile anlık operasyon yönetimi",
    summary: "Mutfak, garson ve kurye rollerini tek panelde takip edebilen yeni operasyon akışları.",
    highlight: "Restoran operasyonlarını tek panelden yöneterek hız ve görünürlük kazanın.",
    content: "WeeMenu, siparişten servise kadar süreci sadeleştirir.\n\nAnlık durum takibi sayesinde ekipler daha hızlı karar alır ve müşteri deneyimi güçlenir.",
    publishedAt: "2026-05-22",
    coverImageUrl: null,
    authorImageUrl: null,
  },
  {
    id: 3,
    slug: "weecard-digital-identity",
    category: "weecard",
    isFeatured: false,
    author: "WeeComi",
    title: "WeeCard ile dijital kimlik deneyimi",
    summary: "Modern NFC kart deneyimiyle marka görünürlüğünü ve paylaşımı kolaylaştırın.",
    highlight: "Tek dokunuşla iletişim ve marka bilgisini paylaşın.",
    content: "WeeCard, fiziksel kart ile dijital profili birleştirir.\n\nEtkinliklerde, satış görüşmelerinde ve networking anlarında hızlı paylaşım sağlar.",
    publishedAt: "2026-05-05",
    coverImageUrl: null,
    authorImageUrl: null,
  },
  {
    id: 4,
    slug: "innovation-ai-operations",
    category: "innovation",
    isFeatured: false,
    author: "WeeComi",
    title: "Yenilikler: AI destekli operasyon yaklaşımları",
    summary: "Ekosistem ürünlerinde veri odaklı karar alma ve otomasyon güncellemeleri.",
    highlight: "Veriye dayalı kararlar, daha verimli operasyonlar.",
    content: "WeeComi ürün ailesinde yenilikler; ölçülebilir büyüme ve daha akıllı iş akışları için tasarlanıyor.\n\nMedya, ürün ve ortaklık duyurularını aynı haber merkezinden takip edebilirsiniz.",
    publishedAt: "2026-04-18",
    coverImageUrl: null,
    authorImageUrl: null,
  },
];

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
