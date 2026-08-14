import { getTranslations } from "next-intl/server";
import PageHero from "@/components/common/page-hero";
import EcosystemCatalog from "./catalog";

export default async function EcosystemOverview() {
  const t = await getTranslations("Ecosystem");
  const tNav = await getTranslations("Nav");

  return (
    <div>
      <PageHero
        title={tNav("ecosystem")}
        lead={t("pageTitle")}
        description={t("pageSubtitle")}
        ctaPrimary={{ href: "/contact", label: tNav("ctaStart") }}
        ctaSecondary={{ href: "/solutions", label: tNav("solutions") }}
      />
      <EcosystemCatalog />
    </div>
  );
}
