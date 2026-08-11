import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { products, getProductPath } from "@/data/products";
import { BracketTag, ScrollReveal } from "@/components/home/_shared";
import StackedSections from "@/components/animata/scroll/stacked-sections";
import { getProductMetrics } from "@/lib/productMetrics";
import BlurText from "@/components/ui/blur-text";
import { HIKARI_HERO_MD } from "@/data/hikariImages";
import WeecomiBotCard from "./weecomibot";
import CriptoSwapsCard from "./criptoswaps";
import WeezardCard from "./weezard";
import WeemenuCard from "./weemenu";
import WeecardCard from "./weecard";
import WeesaleCard from "./weesale";

export default async function ProductShowcase() {
  const t = await getTranslations("ProductShowcase");
  const tProducts = await getTranslations("Products");
  const tEco = await getTranslations("Ecosystem");

  const weecomibot = products.find((p) => p.id === "weecomibot");
  const criptoswaps = products.find((p) => p.id === "criptoswaps");
  const weezard = products.find((p) => p.id === "weezard");
  const weemenu = products.find((p) => p.id === "weemenu");
  const weecard = products.find((p) => p.id === "weecard");
  const weesale = products.find((p) => p.id === "weesale");

  const cursorLabel = t("cursorLabel");

  return (
    <ScrollReveal itemSelector="[data-showcase-item]" className="section-y-top pb-8 md:pb-10">
      <div className="gridContainer">
        <div data-showcase-item className="max-w-3xl">
          <BracketTag>{t("bracketTag")}</BracketTag>
          <h2 className="mt-5 font-heading text-3xl leading-display text-weecomi-dark-gray md:text-5xl">
            <BlurText text={t("title")} delay={30} stepDuration={0.25} direction="bottom" animateBy="letters" />
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{t("subtitle")}</p>
        </div>

        <div className="mt-10">
          <StackedSections stackOffset={52} paneGap={false} className="gap-5">
            {weecomibot ? (
              <WeecomiBotCard
                index={1}
                title={t("weecomibot.title")}
                description={tProducts("weecomibot.description")}
                href={getProductPath(weecomibot)}
                disclaimer={tEco("disclaimer")}
                cursorLabel={cursorLabel}
              />
            ) : null}

            {criptoswaps ? (
              <CriptoSwapsCard
                index={2}
                title={t("criptoswaps.title")}
                description={tProducts("criptoswaps.description")}
                href={getProductPath(criptoswaps)}
                disclaimer={tEco("disclaimer")}
                cursorLabel={cursorLabel}
              />
            ) : null}

            {weezard ? (
              <WeezardCard
                index={3}
                title={t("weezard.title")}
                description={tProducts("weezard.description")}
                href={getProductPath(weezard)}
                disclaimer={tEco("disclaimer")}
                cursorLabel={cursorLabel}
              />
            ) : null}

            {weemenu ? (
              <WeemenuCard
                index={4}
                title={t("weemenu.title")}
                description={tProducts("weemenu.description")}
                metrics={getProductMetrics(tEco, "weemenu")}
                image="/images/hikari/campaign-1.jpg"
                href={getProductPath(weemenu)}
                cursorLabel={cursorLabel}
              />
            ) : null}

            {weecard ? (
              <WeecardCard
                index={5}
                title={t("weecard.title")}
                description={tProducts("weecard.description")}
                metrics={getProductMetrics(tEco, "weecard")}
                image={HIKARI_HERO_MD}
                href={getProductPath(weecard)}
                cursorLabel={cursorLabel}
              />
            ) : null}

            {weesale ? (
              <WeesaleCard
                index={6}
                title={t("weesale.title")}
                description={tProducts("weesale.description")}
                metrics={getProductMetrics(tEco, "weesale")}
                image="/images/hikari/campaign-1.jpg"
                href={getProductPath(weesale)}
                cursorLabel={cursorLabel}
              />
            ) : null}
          </StackedSections>
        </div>

        <div data-showcase-item className="mt-6 text-center">
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
