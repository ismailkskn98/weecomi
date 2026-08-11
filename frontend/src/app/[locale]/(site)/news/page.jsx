import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/common/page-hero";
import NewsGrid from "@/components/news/newsGrid";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "News" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function NewsPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("News");
  const tNav = await getTranslations("Nav");

  return (
    <div>
      <PageHero
        title={tNav("news")}
        lead={t("title")}
        description={t("subtitle")}
        ctaPrimary={{ href: "/contact", label: tNav("ctaStart") }}
        ctaSecondary={{ href: "/about", label: tNav("about") }}
      />
      <section className="section-y-bottom bg-white pt-10 md:pt-12">
        <div className="gridContainer">
          <NewsGrid />
        </div>
      </section>
    </div>
  );
}
