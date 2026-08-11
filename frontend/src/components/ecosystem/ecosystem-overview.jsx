import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ActionButton from "@/components/common/actionButton";
import PageHero from "@/components/common/page-hero";
import ScrollReveal from "@/components/home/_shared/scroll-reveal";
import EcosystemProductCard from "@/components/ecosystem/ecosystem-product-card";
import { getProductMetrics } from "@/lib/productMetrics";
import { getProductCoverImage } from "@/data/productImages";
import { products, getProductPath } from "@/data/products";

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

export default async function EcosystemOverview() {
  const t = await getTranslations("Ecosystem");
  const tProducts = await getTranslations("Products");
  const tNav = await getTranslations("Nav");

  const firstProductByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = product.id;
    return acc;
  }, {});

  return (
    <div className="bg-[#f0f0f0]">
      <PageHero
        title={tNav("ecosystem")}
        lead={t("pageTitle")}
        description={t("pageSubtitle")}
        ctaPrimary={{ href: "/contact", label: tNav("ctaStart") }}
        ctaSecondary={{ href: "/solutions", label: tNav("solutions") }}
      />

      <ScrollReveal id="products" itemSelector="[data-eco-product]" className="bg-[#f0f0f0] px-5 pb-20 pt-2 md:px-8 md:pb-28">
        <div className="mx-auto max-w-[1144px]">
          <div className="border-b border-black/10">
            {products.map((product, index) => (
              <div key={product.id} data-eco-product id={firstProductByCategory[product.category] === product.id ? product.category : undefined} className="scroll-mt-28">
                <EcosystemProductCard
                  href={getProductPath(product)}
                  productId={product.id}
                  nameCaps={product.name}
                  title={tProducts(`${product.id}.title`)}
                  description={tProducts(`${product.id}.description`)}
                  image={getProductCoverImage(product.id)}
                  metrics={getProductMetrics(t, product.id)}
                  features={getProductFeatures(tProducts, product.id)}
                  ctaLabel={t("cursorLabel")}
                  className={index === 0 ? "border-t-0" : undefined}
                />
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <section className="border-t border-black/8 bg-[#f0f0f0] px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto flex max-w-[1144px] flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="font-heading text-sm text-[#5c5c5c]">({t("ctaEyebrow")})</p>
            <h2 className="mt-3 font-heading text-[clamp(1.6rem,3.2vw,2.4rem)] leading-tight text-[#131313]">{t("ctaTitle")}</h2>
            <p className="mt-3 text-base leading-relaxed text-[#5c5c5c]">{t("ctaSubtitle")}</p>
          </div>
          <ActionButton href="/contact" variant="primary" showArrow className="shrink-0">
            {t("ctaButton")}
          </ActionButton>
        </div>
      </section>
    </div>
  );
}
