export const newsCategoryKeys = [
  "media",
  "innovation",
  "announcement",
  "partnership",
  "company",
  "product",
  "weemenu",
  "weecard",
  "weecatalog",
  "weekobi",
  "weesale",
  "weecomibot",
  "weecoins",
  "criptoswaps",
];

export const newsCategoryLabels = {
  media: { tr: "Medya", en: "Media", ru: "Медиа", az: "Media", ka: "მედია" },
  innovation: { tr: "Yenilikler", en: "Innovations", ru: "Инновации", az: "Yeniliklər", ka: "ინოვაციები" },
  announcement: { tr: "Duyuru", en: "Announcement", ru: "Объявление", az: "Elan", ka: "განცხადება" },
  partnership: { tr: "Ortaklık", en: "Partnership", ru: "Партнёрство", az: "Tərəfdaşlıq", ka: "პარტნიორობა" },
  company: { tr: "Şirket", en: "Company", ru: "Компания", az: "Şirkət", ka: "კომპანია" },
  weemenu: { tr: "WeeMenu", en: "WeeMenu", ru: "WeeMenu", az: "WeeMenu", ka: "WeeMenu" },
  weecard: { tr: "WeeCard", en: "WeeCard", ru: "WeeCard", az: "WeeCard", ka: "WeeCard" },
  weecatalog: { tr: "WeeCatalog", en: "WeeCatalog", ru: "WeeCatalog", az: "WeeCatalog", ka: "WeeCatalog" },
  weekobi: { tr: "WeeKobi", en: "WeeKobi", ru: "WeeKobi", az: "WeeKobi", ka: "WeeKobi" },
  weesale: { tr: "WeeSale", en: "WeeSale", ru: "WeeSale", az: "WeeSale", ka: "WeeSale" },
  weecomibot: { tr: "WeeComi Bot", en: "WeeComi Bot", ru: "WeeComi Bot", az: "WeeComi Bot", ka: "WeeComi Bot" },
  weecoins: { tr: "WeeCoins", en: "WeeCoins", ru: "WeeCoins", az: "WeeCoins", ka: "WeeCoins" },
  criptoswaps: {
    tr: "CriptoSwaps",
    en: "CriptoSwaps",
    ru: "CriptoSwaps",
    az: "CriptoSwaps",
    ka: "CriptoSwaps",
  },
  product: { tr: "Ürün", en: "Product", ru: "Продукт", az: "Məhsul", ka: "პროდუქტი" },
};

export function getNewsCategoryLabel(category, locale = "tr") {
  const entry = newsCategoryLabels[category];
  if (!entry) return category || "";
  return entry[locale] || entry.en || entry.tr || category;
}

export function formatNewsDate(value, locale = "tr") {
  if (!value) return "";
  try {
    return new Date(value).toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}
