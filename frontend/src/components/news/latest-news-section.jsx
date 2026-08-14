import { getLocale, getTranslations } from "next-intl/server";
import ActionButton from "@/components/common/actionButton";
import NewsCardsCarousel from "@/components/news/news-cards-carousel";
import { ScrollReveal, SectionHeader } from "@/components/home/_shared";
import { listPublicNews } from "@/lib/api/news";
import { getFallbackNews } from "@/data/fallbackNews";

const NEWS_LIMIT = 10;

async function loadLatestNews(locale) {
  try {
    const data = await listPublicNews({ locale, page: 1, pageSize: NEWS_LIMIT });
    if (data?.items?.length) return data.items.slice(0, NEWS_LIMIT);
  } catch {
    // Keep fallback news when API is offline.
  }
  return getFallbackNews(locale).slice(0, NEWS_LIMIT);
}

export default async function LatestNewsSection() {
  const t = await getTranslations("News");
  const locale = await getLocale();
  const items = await loadLatestNews(locale);

  return (
    <ScrollReveal itemSelector="[data-news-item]" className="section-y bg-white">
      <div className="gridContainer">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            align="left"
            className="md:max-w-xl"
            title={t("title")}
            subtitle={t("subtitle")}
          />
          <div data-news-item>
            <ActionButton href="/news" variant="inverse" showArrow className="shrink-0">
              {t("allNews")}
            </ActionButton>
          </div>
        </div>

        <div data-news-item className="mt-12">
          <NewsCardsCarousel items={items} locale={locale} viewLabel={t("view")} label={t("title")} />
        </div>
      </div>
    </ScrollReveal>
  );
}
