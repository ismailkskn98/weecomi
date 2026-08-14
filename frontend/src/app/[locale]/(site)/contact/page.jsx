import ContactHero from "@/components/contact/contact-hero";
import ContactSection from "@/components/contact";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: { title: t("title"), description: t("subtitle"), type: "website" },
    twitter: { card: "summary_large_image", title: t("title"), description: t("subtitle") },
  };
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <ContactHero />
      <ContactSection />
    </div>
  );
}
