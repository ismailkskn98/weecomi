import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/common/page-hero";
import { buildAgeroTitleRows } from "@/components/common/page-hero-utils";
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
  const titleLines = t.raw("pageTitleLines");
  const lines = Array.isArray(titleLines) ? titleLines : [t("title")];

  return (
    <div>
      <PageHero titleRows={buildAgeroTitleRows(lines)} subtitle={t("subtitle")} />
      <section className="bg-white section-y">
        <div className="gridContainer">
          <GalleryGrid />
        </div>
      </section>
    </div>
  );
}
