import { getTranslations } from "next-intl/server";
import PageHero from "@/components/common/page-hero";

export default async function ContactHero() {
  const t = await getTranslations("Contact");
  const tNav = await getTranslations("Nav");
  const titleLines = t.raw("pageTitleLines");
  const lead = Array.isArray(titleLines) ? titleLines.join(" ") : t("title");

  return (
    <PageHero
      title={tNav("contact")}
      lead={lead}
      description={t("subtitle")}
      ctaPrimary={{ href: "/ecosystem", label: tNav("ecosystem") }}
      ctaSecondary={{ href: "/about", label: tNav("about") }}
    />
  );
}
