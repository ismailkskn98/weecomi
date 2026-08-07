const env = require("./env");

const config = {
  roles: {
    admin: "ADMIN",
    editor: "EDITOR",
  },
  statuses: {
    draft: "DRAFT",
    published: "PUBLISHED",
    unpublished: "UNPUBLISHED",
  },
  upload: {
    driver: env.upload.driver,
    allowedImageTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    maxImageBytes: env.upload.maxImageMb * 1024 * 1024,
  },
  locales: ["tr", "en", "ru", "az", "ka"],
  galleryCategories: {
    events: { tr: "Etkinlikler", en: "Events", ru: "События", az: "Tədbirlər", ka: "ღონისძიებები" },
    products: { tr: "Ürünler", en: "Products", ru: "Продукты", az: "Məhsullar", ka: "პროდუქტები" },
    office: { tr: "Ofis", en: "Office", ru: "Офис", az: "Ofis", ka: "ოფისი" },
    team: { tr: "Ekip", en: "Team", ru: "Команда", az: "Komanda", ka: "გუნდი" },
    other: { tr: "Diğer", en: "Other", ru: "Другое", az: "Digər", ka: "სხვა" },
  },
  newsCategories: {
    media: { tr: "Medya", en: "Media", ru: "Медиа", az: "Media", ka: "მედია" },
    innovation: { tr: "Yenilikler", en: "Innovations", ru: "Инновации", az: "Yeniliklər", ka: "ინოვაციები" },
    announcement: { tr: "Duyuru", en: "Announcement", ru: "Объявление", az: "Elan", ka: "განცხადება" },
    partnership: { tr: "Ortaklık", en: "Partnership", ru: "Партнёрство", az: "Tərəfdaşlıq", ka: "პარტნიორობა" },
    company: { tr: "Şirket", en: "Company", ru: "Компания", az: "Şirkət", ka: "კომპანია" },
    product: { tr: "Ürün", en: "Product", ru: "Продукт", az: "Məhsul", ka: "პროდუქტი" },
    weemenu: { tr: "WeeMenu", en: "WeeMenu", ru: "WeeMenu", az: "WeeMenu", ka: "WeeMenu" },
    weecard: { tr: "WeeCard", en: "WeeCard", ru: "WeeCard", az: "WeeCard", ka: "WeeCard" },
    weecatalog: { tr: "WeeCatalog", en: "WeeCatalog", ru: "WeeCatalog", az: "WeeCatalog", ka: "WeeCatalog" },
    weekobi: { tr: "WeeKobi", en: "WeeKobi", ru: "WeeKobi", az: "WeeKobi", ka: "WeeKobi" },
    weesale: { tr: "WeeSale", en: "WeeSale", ru: "WeeSale", az: "WeeSale", ka: "WeeSale" },
    weecomibot: { tr: "WeeComi Bot", en: "WeeComi Bot", ru: "WeeComi Bot", az: "WeeComi Bot", ka: "WeeComi Bot" },
    weecoins: { tr: "WeeCoins", en: "WeeCoins", ru: "WeeCoins", az: "WeeCoins", ka: "WeeCoins" },
  },
};

module.exports = config;
