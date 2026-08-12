import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { products, getProductPath } from "@/data/products";
import { BracketTag, ScrollReveal } from "@/components/home/_shared";
import StackedSections from "@/components/animata/scroll/stacked-sections";
import { getProductMetrics } from "@/lib/productMetrics";
import BlurText from "@/components/ui/blur-text";
import WeecomiBotCard from "./weecomibot";
import CriptoSwapsCard from "./criptoswaps";
import WeezardCard from "./weezard";
import WeesaleCard from "./weesale";

const showcaseConfig = [
  { id: "weecomibot", Card: WeecomiBotCard, useMetrics: false, useDisclaimer: true },
  { id: "criptoswaps", Card: CriptoSwapsCard, useMetrics: false, useDisclaimer: true },
  { id: "weezard", Card: WeezardCard, useMetrics: false, useDisclaimer: true, useParagraphs: true },
  { id: "weesale", Card: WeesaleCard, useMetrics: true, useDisclaimer: false, useParagraphs: true },
];

export default async function ProductShowcase() {
  const t = await getTranslations("ProductShowcase");
  const tProducts = await getTranslations("Products");
  const tEco = await getTranslations("Ecosystem");

  const cursorLabel = t("cursorLabel");
  const productMap = new Map(products.map((product) => [product.id, product]));

  return (
    <ScrollReveal itemSelector="[data-showcase-item]" className="section-y-top pb-10 md:pb-12 lg:pb-14">
      <div className="gridContainer">
        <div data-showcase-item className="max-w-3xl">
          <BracketTag>{t("bracketTag")}</BracketTag>
          <h2 className="mt-5 font-heading text-3xl leading-display text-weecomi-dark-gray md:text-5xl">
            <BlurText text={t("title")} delay={30} stepDuration={0.25} direction="bottom" animateBy="letters" />
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{t("subtitle")}</p>
        </div>

        <div className="mt-10 md:mt-12 lg:mt-14">
          <StackedSections stackOffset={52} paneGap={false} minDramaWidth={768} className="gap-6 md:gap-7 lg:gap-8 -mb-[4.5rem] md:-mb-[6rem] lg:-mb-[7rem]">
            {showcaseConfig.map(({ id, Card, useMetrics, useDisclaimer, useParagraphs }, index) => {
              const product = productMap.get(id);
              if (!product) return null;

              return (
                <Card
                  key={id}
                  index={index + 1}
                  title={t(`${id}.title`)}
                  description={useParagraphs ? undefined : tProducts(`${id}.description`)}
                  paragraphs={useParagraphs ? t.raw(`${id}.paragraphs`) : undefined}
                  metrics={useMetrics ? getProductMetrics(tEco, id) : undefined}
                  href={getProductPath(product)}
                  disclaimer={useDisclaimer ? tEco("disclaimer") : undefined}
                  cursorLabel={cursorLabel}
                  mediaTitle={t(`${id}.mediaTitle`)}
                />
              );
            })}
          </StackedSections>
        </div>

        <div data-showcase-item className="mt-5 md:mt-6 lg:mt-7 text-center">
          <Link
            href="/ecosystem"
            className="inline-flex h-11 items-center rounded-md border border-white/20 bg-weecomi-dark-gray px-6 font-heading text-sm font-medium text-white transition hover:bg-weecomi-dark-gray/90"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </ScrollReveal>
  );
}
