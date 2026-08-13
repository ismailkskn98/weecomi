import { getTranslations, setRequestLocale } from "next-intl/server";
import AboutContent from "@/components/about";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Corporate" });
  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: { title: t("title"), description: t("subtitle"), type: "website" },
    twitter: { card: "summary_large_image", title: t("title"), description: t("subtitle") },
  };
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}
