import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { productCategories, getProductsByCategory, getProductPath } from "@/data/products";
import { BracketTag } from "@/components/home/_shared";
import ScrollReveal from "@/components/home/_shared/scroll-reveal";
import { DistortedGlass } from "@/components/ui/distorted-glass";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import BlurText from "@/components/ui/blur-text";
import { HIKARI_HERO_MD } from "@/data/hikariImages";

const STAGE_LABELS = ["01", "02", "03", "04"];
const CATEGORY_PREVIEWS = {
  business: [HIKARI_HERO_MD, "/images/hikari/campaign-1.jpg"],
  commerce: ["/images/example.jpg", HIKARI_HERO_MD],
  ai: ["/images/hikari/campaign-1.jpg", "/images/example.jpg"],
  assets: [HIKARI_HERO_MD, "/images/example.jpg"],
};

export default async function Solutions() {
  const t = await getTranslations("Ecosystem");
  const tProducts = await getTranslations("Products");
  const tCategories = await getTranslations("Categories");

  return (
    <ScrollReveal itemSelector="[data-sol-col]" className="relative overflow-hidden bg-weecomi-dark-gray section-y text-white">
      <TextureOverlay texture="noise" tone="light" opacity={0.45} className="z-0" />
      <TextureOverlay texture="paperGrain" tone="light" opacity={0.25} className="z-0" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_18%_0%,rgba(240,159,47,0.2),transparent_42%),radial-gradient(ellipse_at_92%_28%,rgba(52,108,146,0.14),transparent_38%)]" />

      <div className="relative z-10">
        <DistortedGlass className="block max-w-none rounded-none border-x-0 border-white/10 opacity-50" />
      </div>

      <div className="relative z-10 gridContainer pt-8 md:pt-10">
        <div className="mx-auto max-w-4xl text-center">
          <BracketTag className="text-weecomi-orange">{t("productsEyebrow")}</BracketTag>
          <h2 className="mt-5 font-heading text-[clamp(2rem,4.4vw,3.75rem)] leading-display text-white">
            <BlurText text={t("productsTitle")} delay={30} stepDuration={0.25} direction="bottom" animateBy="letters" />
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">{t("productsSubtitle")}</p>
        </div>

        <div className="mt-12 border-t border-white/10 md:mt-16 lg:mt-20">
          <div className="grid gap-0 md:grid-cols-2 xl:grid-cols-4">
            {productCategories.map((category, index) => {
              const related = getProductsByCategory(category.id);
              const previews = CATEGORY_PREVIEWS[category.id] || CATEGORY_PREVIEWS.business;

              return (
                <article
                  key={category.id}
                  data-sol-col
                  className="flex flex-col justify-between gap-4 lg:gap-8 border-b border-white/10 py-8 md:border-r md:px-6 md:py-10 xl:pb-0 lg:border-b-0 lg:px-7 lg:last:border-r-0 xl:px-8 [&:nth-child(2n)]:md:border-r-0 [&:nth-child(2n)]:lg:border-r lg:[&:nth-child(4n)]:border-r-0"
                >
                  <Link href={`/ecosystem#${category.id}`} className="flex flex-col items-start transition hover:opacity-90">
                    <span className="font-heading text-[11px] font-medium uppercase text-weecomi-orange md:text-xs">{STAGE_LABELS[index] || String(index + 1).padStart(2, "0")}</span>
                    <h3 className="mt-5 font-heading text-[1.35rem] leading-display text-white md:text-[1.5rem] lg:text-[1.65rem]">{tCategories(category.translationKey)}</h3>

                    <div className="flex flex-col">
                      <p className="mt-4 flex-1 text-sm leading-relaxed text-white/60 md:text-[0.95rem]">
                        {related[0] ? tProducts(`${related[0].id}.description`) : t("productsSubtitle")}
                      </p>
                    </div>
                  </Link>
                  <div className="grid grid-cols-2 gap-3">
                    {previews.map((src) => (
                      <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/8">
                        <img src={src} alt="" className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {related.map((product) => (
                      <Link
                        key={product.id}
                        href={getProductPath(product)}
                        className="rounded-md border border-white/15 bg-white/[0.04] px-3 py-1.5 font-heading text-[11px] font-medium text-white/85 transition hover:border-weecomi-orange/50 hover:bg-weecomi-orange/10 hover:text-white"
                      >
                        {product.nameCaps}
                      </Link>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
