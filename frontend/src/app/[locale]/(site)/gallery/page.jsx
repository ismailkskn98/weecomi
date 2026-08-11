import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/common/page-hero";
import GalleryGrid from "@/components/gallery/galleryGrid";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Gallery" });
  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: { title: t("title"), description: t("subtitle"), type: "website" },
    twitter: { card: "summary_large_image", title: t("title"), description: t("subtitle") },
  };
}

export default async function GalleryPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Gallery");
  const tNav = await getTranslations("Nav");

  return (
    <div>
      <PageHero
        title={tNav("gallery")}
        lead={t("title")}
        description={t("subtitle")}
        ctaPrimary={{ href: "/contact", label: tNav("ctaStart") }}
        ctaSecondary={{ href: "/about", label: tNav("about") }}
      />
      <section className="bg-white section-y">
        <div className="gridContainer">
          <GalleryGrid />
        </div>
      </section>
    </div>
  );
}
