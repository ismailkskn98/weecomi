import { products } from "@/data/products";
import { routing } from "@/i18n/routing";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap() {
  const staticPaths = [
    "",
    "/ecosystem",
    "/about",
    "/news",
    "/gallery",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
    "/kvkk",
    "/risk-disclosure",
  ];

  const entries = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
      });
    }

    for (const product of products) {
      entries.push({
        url: `${siteUrl}/${locale}/ecosystem/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
