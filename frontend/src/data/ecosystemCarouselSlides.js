/** Homepage stats carousel — ecosystem product visuals from public/images/ecosystem-carousel */
export const ecosystemCarouselSlides = [
  { id: "weenetwork-devices", src: "/images/ecosystem-carousel/weenetwork-devices.png", productId: "weenetwork" },
  { id: "weemenu-qr-table", src: "/images/ecosystem-carousel/weemenu-qr-table.png", productId: "weemenu" },
  { id: "weemenu-kitchen-tablet", src: "/images/ecosystem-carousel/weemenu-kitchen-tablet.png", productId: "weemenu" },
  { id: "weecard-nfc-share", src: "/images/ecosystem-carousel/weecard-nfc-share.png", productId: "weecard" },
  { id: "weecard-lobby-qr", src: "/images/ecosystem-carousel/weecard-lobby-qr.png", productId: "weecard" },
  { id: "weecatalog-boutique", src: "/images/ecosystem-carousel/weecatalog-boutique.png", productId: "weecatalog" },
  { id: "weekobi-store-panel", src: "/images/ecosystem-carousel/weekobi-store-panel.png", productId: "weekobi" },
  { id: "weesale-marketplace", src: "/images/ecosystem-carousel/weesale-marketplace.png", productId: "weesale" },
  { id: "alisveriskapida-delivery", src: "/images/ecosystem-carousel/alisveriskapida-delivery.png", productId: "alisveriskapida" },
  { id: "alisveriskapida-unbox", src: "/images/ecosystem-carousel/alisveriskapida-unbox.png", productId: "alisveriskapida" },
  { id: "weecomibot-desk", src: "/images/ecosystem-carousel/weecomibot-desk.png", productId: "weecomibot" },
  { id: "weecoins-still-life", src: "/images/ecosystem-carousel/weecoins-still-life.png", productId: "weecoins" },
  { id: "criptoswaps-office", src: "/images/ecosystem-carousel/criptoswaps-office.png", productId: "criptoswaps" },
  { id: "criptoswaps-office-wide", src: "/images/ecosystem-carousel/criptoswaps-office-wide.png", productId: "criptoswaps" },
  { id: "weezard-mobile", src: "/images/ecosystem-carousel/weezard-mobile.png", productId: "weezard" },
  { id: "weepoint-customer-app", src: "/images/ecosystem-carousel/weepoint-customer-app.png", alt: "WeePoint" },
];

/**
 * @param {import("next-intl").Translator} tProducts — next-intl Products namespace translator
 */
export function getEcosystemCarouselSlides(tProducts) {
  return ecosystemCarouselSlides.map((slide) => ({
    id: slide.id,
    src: slide.src,
    alt: slide.alt || tProducts(`${slide.productId}.title`),
  }));
}
