import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import FullBleedHero from "@/components/common/full-bleed-hero";
import { BracketTag } from "@/components/home/_shared";
import ScrollReveal from "@/components/home/_shared/scroll-reveal";
import ProductRow from "@/components/ecosystem/catalog/product-row";
import { getProductsBySolutionArea, getProductPath } from "@/data/products";
import { HIKARI_HERO } from "@/data/hikariImages";

const AREA_IMAGES = {
  digitize: HIKARI_HERO,
  growSales: "/images/hikari/campaign-1.jpg",
  automate: HIKARI_HERO,
  joinEcosystem: "/images/hikari/campaign-1.jpg",
};

const HOW_KEYS = ["discover", "select", "launch"];

export default async function SolutionAreaDetail({ area }) {
  const t = await getTranslations("Solutions");
  const tProducts = await getTranslations("Products");
  const tEco = await getTranslations("Ecosystem");
  const related = getProductsBySolutionArea(area);
  const points = t.raw(`${area.id}.points`) || [];
  const showDisclaimer = related.some((item) => item.showDisclaimer);
  const cover = AREA_IMAGES[area.id] || HIKARI_HERO;

  return (
    <article>
      <FullBleedHero eyebrow={t("pageEyebrow")} title={t(`${area.id}.title`)} subtitle={t(`${area.id}.description`)} image={cover} minHeightClassName="min-h-[64vh]">
        {showDisclaimer ? <p className="mt-4 max-w-xl text-xs text-white/40">{tEco("disclaimer")}</p> : null}
        <Link
          href="/contact"
          className="mt-7 inline-flex h-11 w-fit items-center rounded-xl bg-weecomi-orange px-5 text-sm font-semibold text-white transition hover:bg-weecomi-orange/90"
        >
          {t("detailCta")}
        </Link>
      </FullBleedHero>

      <ScrollReveal itemSelector="[data-sol-point]" className="section-y bg-white" y={28} start="top 80%" stagger={0.1} duration={0.55}>
        <div className="gridContainer">
          <div className="max-w-2xl">
            <BracketTag>{t("pointsTitle")}</BracketTag>
            <h2 className="mt-4 font-heading text-[clamp(1.7rem,3.2vw,2.75rem)] leading-display text-weecomi-dark-gray">{t("pointsHeading")}</h2>
          </div>
          <ul className="mt-10 grid gap-0 border-t border-black/[0.08] md:grid-cols-2">
            {points.map((point, index) => (
              <li key={point} data-sol-point className="border-b border-black/[0.08] py-7 md:odd:border-r md:odd:pr-8 md:even:pl-8">
                <span className="font-heading text-[11px] text-weecomi-orange">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-3 text-base leading-relaxed text-weecomi-dark-gray md:text-lg">{point}</p>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>

      <section className="border-y border-black/[0.06] bg-[#f7f8f9] section-y">
        <div className="gridContainer">
          <BracketTag>{t("productsEyebrow")}</BracketTag>
          <h2 className="mt-4 font-heading text-[clamp(1.7rem,3.2vw,2.75rem)] leading-display text-weecomi-dark-gray">{t("productsHeading")}</h2>
          <div className="mt-8 border-b border-black/10">
            {related.map((product, index) => (
              <div key={product.id}>
                <ProductRow
                  href={getProductPath(product)}
                  productId={product.id}
                  nameCaps={product.nameCaps}
                  title={tProducts(`${product.id}.title`)}
                  description={tProducts(`${product.id}.description`)}
                  ctaLabel={tEco("cursorLabel")}
                  compact
                  className={index === 0 ? "border-t-0" : undefined}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="gridContainer">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
            <div className="relative h-[220px] overflow-hidden rounded-[18px] md:h-[300px] lg:sticky lg:top-28 lg:h-[380px]">
              <Image src="/images/hikari/campaign-1.jpg" alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
            </div>
            <div>
              <BracketTag>{t("howEyebrow")}</BracketTag>
              <h2 className="mt-4 font-heading text-[clamp(1.7rem,3.2vw,2.75rem)] leading-display text-weecomi-dark-gray">{t("howTitle")}</h2>
              <ol className="mt-8 space-y-0">
                {HOW_KEYS.map((key, index) => (
                  <li key={key} className="border-t border-black/[0.08] py-7">
                    <span className="font-heading text-[11px] text-weecomi-orange">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 font-heading text-xl text-weecomi-dark-gray md:text-2xl">{t(`how.${key}.title`)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">{t(`how.${key}.text`)}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
