import { getTranslations } from "next-intl/server";
import { products, getProductPath } from "@/data/products";
import { BracketTag } from "@/components/home/_shared";
import ScrollReveal from "@/components/home/_shared/scroll-reveal";
import AlisverisKapidaCard from "./alisveriskapida";
import WeecoinsCard from "./weecoins";
import ConnectionCard from "./connection";
import WeekobiCard from "./weekobi";

const ORBIT_LOGOS = [
  { src: "/logos/weenetwork.png", alt: "WeeNetwork" },
  { src: "/logos/weecard.png", alt: "WeeCard" },
  { src: "/logos/weemenu.png", alt: "WeeMenu" },
  { src: "/logos/weecatalog.webp", alt: "WeeCatalog" },
];

const MARQUEE_TAGS = ["Digital Identity", "Wallet", "ERP", "Cloud", "Store", "Automation", "QR"];

export default async function Ecosystem() {
  const t = await getTranslations("Ecosystem");
  const tProducts = await getTranslations("Products");

  const alisveriskapida = products.find((p) => p.id === "alisveriskapida");
  const weecoins = products.find((p) => p.id === "weecoins");
  const weekobi = products.find((p) => p.id === "weekobi");
  const akCard = t.raw("alisveriskapidaCard");
  return (
    <section id="ecosystem" className="relative section-y-bottom">
      <div className="relative z-10 gridContainer min-w-0">
        <div className="max-w-3xl">
          <BracketTag>{t("bracketTag")}</BracketTag>
          <h2 className="mt-5 font-heading text-3xl leading-display text-weecomi-dark-gray md:text-5xl">{t("title")}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{t("subtitle")}</p>
        </div>
        <ScrollReveal
          as="div"
          itemSelector="[data-eco-card]"
          className="mt-10 grid min-w-0 gap-3 md:mt-12 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto] lg:gap-4"
          y={36}
          start="top 80%"
          stagger={0.12}
          duration={0.55}
        >
          {alisveriskapida ? (
            <div data-eco-card className="min-w-0 md:col-span-2 lg:col-span-1 lg:row-span-2">
              <AlisverisKapidaCard
                eyebrow={alisveriskapida.nameCaps}
                title={akCard.title}
                description={akCard.description}
                badge={akCard.badge}
                searchPhrases={akCard.searchPhrases}
                tags={akCard.tags}
                href={getProductPath(alisveriskapida)}
                visitLabel={t("visit")}
              />
            </div>
          ) : null}

          {weecoins ? (
            <div data-eco-card className="min-w-0 h-full">
              <WeecoinsCard title={t("weecoinsCard.title")} description={t("weecoinsCard.description")} ribbonBadge={t("weecoinsCard.ribbonBadge")} ribbonItems={t.raw("weecoinsCard.ribbonItems")} />
            </div>
          ) : null}

          <div data-eco-card className="min-w-0 h-full">
            <ConnectionCard title={t("collab.eyebrow")} description={t("collab.cardDescription")} labels={["WeeCard", "WeeMenu", "WeeCatalog"]} items={ORBIT_LOGOS} />
          </div>

          {weekobi ? (
            <div data-eco-card className="min-w-0 md:col-span-2">
              <WeekobiCard
                product={weekobi}
                title={tProducts("weekobi.title")}
                description={tProducts("weekobi.description")}
                href={getProductPath(weekobi)}
                detailLabel={t("learnMore")}
                siteLabel={t("visit")}
              />
            </div>
          ) : null}
        </ScrollReveal>
      </div>
    </section>
  );
}
