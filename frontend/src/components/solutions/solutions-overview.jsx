import { getTranslations } from "next-intl/server";
import PageHero from "@/components/common/page-hero";
import { BracketTag } from "@/components/home/_shared";
import ScrollReveal from "@/components/home/_shared/scroll-reveal";
import SolutionAreaCard from "@/components/solutions/solution-area-card";
import { solutionAreas, getSolutionPath, getProductsBySolutionArea } from "@/data/products";
import { HIKARI_HERO_MD } from "@/data/hikariImages";

const AREA_IMAGES = {
  digitize: HIKARI_HERO_MD,
  growSales: "/images/hikari/campaign-1.jpg",
  automate: HIKARI_HERO_MD,
  joinEcosystem: "/images/hikari/campaign-1.jpg",
};

export default async function SolutionsOverview() {
  const t = await getTranslations("Solutions");
  const tNav = await getTranslations("Nav");

  return (
    <div>
      <PageHero
        title={tNav("solutions")}
        lead={t("pageTitle")}
        description={t("pageSubtitle")}
        ctaPrimary={{ href: "/contact", label: tNav("ctaStart") }}
        ctaSecondary={{ href: "/ecosystem", label: tNav("ecosystem") }}
      />

      <ScrollReveal itemSelector="[data-sol-card]" className="section-y bg-white" y={36} start="top 75%" stagger={0.12} duration={0.6}>
        <div className="gridContainer">
          <div className="max-w-2xl border-b border-black/8 pb-8">
            <BracketTag>{t("areasEyebrow")}</BracketTag>
            <h2 className="mt-4 font-heading text-[clamp(1.85rem,3.8vw,3.25rem)] leading-display text-weecomi-dark-gray">{t("areasTitle")}</h2>
            <p className="mt-3 text-base text-muted-foreground">{t("areasSubtitle")}</p>
          </div>

          <div className="mt-10 space-y-5">
            {solutionAreas.map((area, index) => {
              const related = getProductsBySolutionArea(area);
              return (
                <div key={area.id} data-sol-card>
                  <SolutionAreaCard
                    href={getSolutionPath(area)}
                    index={index + 1}
                    title={t(`${area.id}.title`)}
                    description={t(`${area.id}.description`)}
                    image={AREA_IMAGES[area.id] || HIKARI_HERO_MD}
                    products={related.map((p) => p.nameCaps)}
                    ctaLabel={t("exploreArea")}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
