import { getTranslations } from "next-intl/server";
import { BracketTag } from "@/components/home/_shared";
import ScrollReveal from "@/components/home/_shared/scroll-reveal";
import { getProductMetrics } from "@/lib/productMetrics";
import { getProductCoverImage } from "@/data/productImages";
import { productCategories, getProductsByCategory, getProductPath } from "@/data/products";
import ProductRow from "./product-row";
import CommerceGrid from "./commerce-grid";
import FeaturedBand from "./featured-band";
import AssetsList from "./assets-list";

function getProductFeatures(tProducts, productId) {
  const key = `${productId}.features`;
  if (typeof tProducts.has === "function" && !tProducts.has(key)) return [];
  try {
    const raw = tProducts.raw(key);
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

export default async function EcosystemCatalog() {
  const t = await getTranslations("Ecosystem");
  const tProducts = await getTranslations("Products");
  const tCategories = await getTranslations("Categories");
  const tNav = await getTranslations("Nav");
  const ctaLabel = t("cursorLabel");
  const disclaimer = t("disclaimer");

  return (
    <div className="bg-white">
      <nav aria-label={t("pageEyebrow")} className="border-b border-black/8 bg-white">
        <div className="gridContainer">
          <ul className="flex gap-1 overflow-x-auto py-4 md:gap-2 md:py-5">
            {productCategories.map((category) => (
              <li key={category.id} className="shrink-0">
                <a
                  href={`#${category.id}`}
                  className="inline-flex rounded-md px-3 py-2 font-heading text-[12px] text-weecomi-dark-gray/70 transition hover:bg-[#f4f4f4] hover:text-weecomi-dark-gray md:text-[13px]"
                >
                  {tCategories(category.translationKey)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {productCategories.map((category, categoryIndex) => {
        const items = getProductsByCategory(category.id);
        if (!items.length) return null;

        const isFirst = categoryIndex === 0;
        const heading = tCategories(category.translationKey);

        return (
          <ScrollReveal
            key={category.id}
            id={category.id}
            itemSelector="[data-eco-item]"
            className="scroll-mt-28 border-b border-black/6 bg-white section-y"
            y={28}
            start="top 82%"
            stagger={0.08}
            duration={0.55}
          >
            <div className="gridContainer">
              <div className="max-w-2xl">
                {isFirst ? <BracketTag>{t("productsEyebrow")}</BracketTag> : null}
                <h2
                  className={
                    isFirst
                      ? "mt-4 font-heading text-[clamp(1.7rem,3.2vw,2.75rem)] leading-display text-weecomi-dark-gray"
                      : "font-heading text-[clamp(1.7rem,3.2vw,2.75rem)] leading-display text-weecomi-dark-gray"
                  }
                >
                  {heading}
                </h2>
                {isFirst ? <p className="mt-3 text-base text-muted-foreground">{t("productsSubtitle")}</p> : null}
              </div>

              <div className="mt-8 md:mt-10">
                {category.id === "business" ? (
                  <div className="border-b border-black/10">
                    {items.map((product, index) => (
                      <div key={product.id} data-eco-item>
                        <ProductRow
                          href={getProductPath(product)}
                          productId={product.id}
                          nameCaps={product.nameCaps}
                          title={tProducts(`${product.id}.title`)}
                          description={tProducts(`${product.id}.description`)}
                          image={getProductCoverImage(product.id)}
                          metrics={getProductMetrics(t, product.id)}
                          features={getProductFeatures(tProducts, product.id)}
                          ctaLabel={ctaLabel}
                          comingSoonLabel={product.comingSoon ? tNav("comingSoon") : undefined}
                          className={index === 0 ? "border-t-0" : undefined}
                        />
                      </div>
                    ))}
                  </div>
                ) : null}

                {category.id === "commerce" ? (
                  <CommerceGrid
                    products={items}
                    ctaLabel={ctaLabel}
                    getCopy={(product) => ({
                      href: getProductPath(product),
                      description: tProducts(`${product.id}.description`),
                    })}
                  />
                ) : null}

                {category.id === "ai" ? (
                  <FeaturedBand
                    product={items[0]}
                    title={tProducts(`${items[0].id}.title`)}
                    description={tProducts(`${items[0].id}.description`)}
                    features={getProductFeatures(tProducts, items[0].id)}
                    ctaLabel={ctaLabel}
                    disclaimer={items[0].showDisclaimer ? disclaimer : undefined}
                  />
                ) : null}

                {category.id === "assets" ? (
                  <AssetsList
                    products={items}
                    ctaLabel={ctaLabel}
                    disclaimer={disclaimer}
                    getCopy={(product) => ({
                      href: getProductPath(product),
                      description: tProducts(`${product.id}.description`),
                      comingSoonLabel: product.comingSoon ? tNav("comingSoon") : undefined,
                    })}
                  />
                ) : null}
              </div>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
