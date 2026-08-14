import { getTranslations } from "next-intl/server";
import FaqList from "@/components/about/faq/faq-list";
import ScrollReveal from "@/components/home/_shared/scroll-reveal";
import { getProductDetails } from "@/data/productDetails";
import { getRelatedProducts } from "@/data/products";
import DetailHero from "./hero";
import DetailContent from "./content";
import StickyCta from "./sticky-cta";
import RelatedProducts from "./related";

function getFeatureList(tProducts, productId) {
  const key = `${productId}.features`;
  if (typeof tProducts.has === "function" && !tProducts.has(key)) return [];
  try {
    const raw = tProducts.raw(key);
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

export default async function EcosystemDetail({ product, locale }) {
  const t = await getTranslations("Products");
  const tPage = await getTranslations("ProductPage");
  const tEco = await getTranslations("Ecosystem");
  const details = getProductDetails(product.id, locale) || getProductDetails(product.id, "tr");
  const related = getRelatedProducts(product).slice(0, 2);
  const faqs = details?.faqs || [];
  const featureList = getFeatureList(t, product.id);
  const audience = details?.audience || [];
  const howItWorks = details?.howItWorks || [];

  return (
    <article>
      <DetailHero product={product} description={t(`${product.id}.description`)} />

      <section className="bg-white px-0 pb-6 md:pb-10">
        <div className="gridContainer">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:items-start lg:gap-16 xl:gap-20">
            <ScrollReveal itemSelector="[data-eco-block]" className="min-w-0" y={24} start="top 85%" stagger={0.08} duration={0.5}>
              <DetailContent
                aboutTitle={tPage("aboutTitle")}
                longDescription={details?.longDescription}
                disclaimer={product.showDisclaimer ? tEco("disclaimer") : undefined}
                featuresTitle={tPage("featuresTitle")}
                features={featureList}
                audienceTitle={tPage("audienceTitle")}
                audience={audience}
                howTitle={tPage("howTitle")}
                howItWorks={howItWorks}
                highlight={t(`${product.id}.title`)}
              />
            </ScrollReveal>

            <StickyCta
              title={tPage("ctaTitle")}
              subtitle={tPage("ctaSubtitle")}
              contactLabel={tPage("contactCta")}
              visitLabel={tPage("visitProduct")}
              visitUrl={product.url || undefined}
            />
          </div>
        </div>
      </section>

      <RelatedProducts title={tPage("relatedTitle")} items={related} getDescription={(item) => t(`${item.id}.description`)} />

      {faqs.length ? (
        <section className="border-t border-black/6 bg-white section-y">
          <div className="gridContainer">
            <div className="mx-auto max-w-3xl">
              <div className="text-center">
                <p className="font-heading text-sm text-muted-foreground">{tPage("faqEyebrow")}</p>
                <h2 className="mt-3 font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight text-weecomi-dark-gray">{tPage("faqTitle")}</h2>
                <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">{tPage("faqSubtitle")}</p>
              </div>
              <div className="mt-10">
                <FaqList items={faqs} />
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
