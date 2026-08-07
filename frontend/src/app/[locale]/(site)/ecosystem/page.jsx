import { getTranslations, setRequestLocale } from "next-intl/server";
import EcosystemOverview from "@/components/ecosystem/ecosystem-overview";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Ecosystem" });
  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
    openGraph: { title: t("pageTitle"), description: t("pageSubtitle"), type: "website" },
    twitter: { card: "summary_large_image", title: t("pageTitle"), description: t("pageSubtitle") },
  };
}

export default async function EcosystemPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EcosystemOverview />;
}
