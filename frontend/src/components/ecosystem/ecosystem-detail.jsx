import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ActionButton from "@/components/common/actionButton";
import AboutFaq from "@/components/about/about-faq";
import ScrollReveal from "@/components/home/_shared/scroll-reveal";
import { getProductDetails } from "@/data/productDetails";
import { getRelatedProducts, getProductPath } from "@/data/products";
import { productVisuals } from "@/data/productVisuals";
import { getProductCoverImage, getProductDetailImage } from "@/data/productImages";
import { ArrowRight } from "lucide-react";

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

/** Flexio CTA card bottom mark — black / orange half-circles */
function BrandMark() {
  return (
    <div className="relative mx-auto mt-auto aspect-square w-full max-w-[220px]" aria-hidden>
      <div className="absolute inset-x-[8%] top-[12%] aspect-2/1 overflow-hidden rounded-t-full bg-weecomi-dark-gray" />
      <div className="absolute inset-x-[8%] bottom-[12%] aspect-2/1 overflow-hidden rounded-b-full bg-weecomi-orange" />
    </div>
  );
}

export default async function EcosystemDetail({ product, locale }) {
  const t = await getTranslations("Products");
  const tPage = await getTranslations("ProductPage");
  const tEco = await getTranslations("Ecosystem");
  const details = getProductDetails(product.id, locale) || getProductDetails(product.id, "tr");
  const related = getRelatedProducts(product).slice(0, 2);
  const visual = productVisuals[product.id];
  const detailImage = getProductDetailImage(product.id);
  const faqs = details?.faqs || [];
  const featureList = getFeatureList(t, product.id);
  const audience = details?.audience || [];
  const howItWorks = details?.howItWorks || [];

  return (
    <article className="">
      {/* ── Hero ── */}
      <section className="px-5 pb-14 pt-32 md:px-8 md:pb-20 md:pt-40">
        <div className="mx-auto flex max-w-[1340px] flex-col items-center gap-10 md:gap-12">
          <div className="flex max-w-3xl flex-col items-center text-center">
            <span className="inline-flex items-center rounded-md bg-weecomi-orange px-3.5 py-1.5 font-heading text-[11px] font-medium uppercase tracking-[0.1em] text-white">{tEco("eyebrow")}</span>
            <h1 className="mt-6 font-heading text-[clamp(2.6rem,6.5vw,4.75rem)] leading-[1.02] tracking-[-0.03em] text-weecomi-dark-gray">{product.name}</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-weecomi-dark-gray/65 md:text-lg md:leading-8">{t(`${product.id}.description`)}</p>
          </div>

          <div className="relative w-full overflow-hidden rounded-[28px] bg-[#e8e4dc] md:rounded-[32px]">
            <div className="relative aspect-16/10 w-full max-h-[900px]">
              <Image src={detailImage} alt={product.name} fill priority className="object-cover" sizes="100vw" />
            </div>
            {visual?.logo ? (
              <div className="absolute left-5 top-5 size-11 overflow-hidden rounded-xl bg-white/95 shadow-md md:left-7 md:top-7 md:size-12">
                <Image src={visual.logo} alt="" fill className="object-contain p-2" sizes="48px" />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* ── Body: 2fr content + 1fr sticky CTA (Flexio) ── */}
      <section className="px-5 pb-6 md:px-8 md:pb-10">
        <div className="mx-auto grid max-w-[1340px] gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:items-start lg:gap-20 xl:gap-24">
          {/* Left column */}
          <ScrollReveal itemSelector="[data-eco-block]" className="min-w-0 space-y-12 md:space-y-14">
            <div data-eco-block>
              <h2 className="font-heading text-[clamp(1.45rem,2.8vw,1.85rem)] leading-tight text-weecomi-dark-gray">{tPage("aboutTitle")}</h2>
              <p className="mt-5 text-base leading-[1.8] text-weecomi-dark-gray/70 md:text-[1.05rem] md:leading-[1.85]">{details?.longDescription}</p>
              {product.showDisclaimer ? <p className="mt-5 text-sm leading-relaxed text-weecomi-dark-gray/50">{tEco("disclaimer")}</p> : null}
            </div>

            {featureList.length ? (
              <div data-eco-block>
                <h2 className="font-heading text-[clamp(1.45rem,2.8vw,1.85rem)] leading-tight text-weecomi-dark-gray">{tPage("featuresTitle")}</h2>
                <ul className="mt-6 space-y-3">
                  {featureList.map((feature) => (
                    <li key={feature} className="flex gap-3 text-base leading-relaxed text-weecomi-dark-gray/70">
                      <span className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-weecomi-orange" aria-hidden />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {audience.length ? (
              <div data-eco-block>
                <h2 className="font-heading text-[clamp(1.45rem,2.8vw,1.85rem)] leading-tight text-weecomi-dark-gray">{tPage("audienceTitle")}</h2>
                <p className="mt-5 text-base leading-[1.8] text-weecomi-dark-gray/70 md:text-[1.05rem]">{audience.join(", ")}.</p>
              </div>
            ) : null}

            {/* Peach quote strip */}
            <div data-eco-block className="rounded-2xl bg-[#f9eadb] px-6 py-5 md:px-7 md:py-6">
              <p className="text-base leading-relaxed text-weecomi-dark-gray/85 md:text-[1.05rem] md:leading-[1.7]">{t(`${product.id}.title`)}</p>
            </div>

            {/* Inline image */}
            <div data-eco-block className="overflow-hidden rounded-[24px] bg-[#e8e4dc] md:rounded-[28px]">
              <div className="relative aspect-16/10 w-full md:aspect-[2.1]">
                <Image src={detailImage} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
              </div>
            </div>

            {/* Sub content / how it works */}
            {howItWorks.length ? (
              <div data-eco-block>
                <h2 className="font-heading text-[clamp(1.45rem,2.8vw,1.85rem)] leading-tight text-weecomi-dark-gray">{tPage("howTitle")}</h2>
                <div className="mt-5 space-y-6">
                  {howItWorks.map((step) => (
                    <div key={step.title}>
                      <h3 className="font-heading text-lg text-weecomi-dark-gray md:text-xl">{step.title}</h3>
                      <p className="mt-2 text-base leading-[1.8] text-weecomi-dark-gray/70">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </ScrollReveal>

          {/* Right sticky CTA card */}
          <aside className="lg:sticky lg:top-28">
            <div className="flex min-h-[420px] flex-col rounded-2xl bg-[#f9eadb] p-7 md:min-h-[480px] md:p-8">
              <h2 className="font-heading text-[clamp(1.35rem,2.4vw,1.75rem)] leading-snug text-weecomi-dark-gray">{tPage("ctaTitle")}</h2>
              <p className="mt-4 text-sm leading-relaxed text-weecomi-dark-gray/65 md:text-[0.95rem]">{tPage("ctaSubtitle")}</p>
              <ActionButton href="/contact" variant="inverse" showArrow className="mt-7">
                {tPage("contactCta")}
              </ActionButton>
              {product.url ? (
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 font-heading text-sm text-weecomi-dark-gray/55 transition hover:text-weecomi-orange"
                >
                  {tPage("visitProduct")}
                  <ArrowRight className="size-3.5" aria-hidden />
                </a>
              ) : null}
              <BrandMark />
            </div>
          </aside>
        </div>
      </section>

      {/* ── Related — full-bleed image cards like Flexio ── */}
      {related.length ? (
        <section className="px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
          <div className="mx-auto max-w-[1340px]">
            <h2 className="text-center font-heading text-[clamp(1.85rem,3.8vw,2.85rem)] leading-tight text-weecomi-dark-gray">{tPage("relatedTitle")}</h2>
            <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
              {related.map((item) => {
                const itemImage = getProductCoverImage(item.id);
                const itemVisual = productVisuals[item.id];
                return (
                  <Link key={item.id} href={getProductPath(item)} className="group relative block aspect-5/4 overflow-hidden rounded-[24px] md:rounded-[28px]">
                    <Image src={itemImage} alt={item.name} fill className="object-cover transition duration-500 group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-black/10" />
                    {itemVisual?.logo ? (
                      <div className="absolute left-5 top-5 size-10 overflow-hidden rounded-lg bg-white/95 md:left-6 md:top-6">
                        <Image src={itemVisual.logo} alt="" fill className="object-contain p-1.5" sizes="40px" />
                      </div>
                    ) : (
                      <span className="absolute left-5 top-5 rounded-md bg-white/90 px-2.5 py-1 font-heading text-[10px] uppercase tracking-wider text-weecomi-dark-gray md:left-6 md:top-6">
                        {item.name}
                      </span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                      <h3 className="font-heading text-xl text-white md:text-2xl">{item.name}</h3>
                      <p className="mt-2 line-clamp-2 max-w-md text-sm leading-relaxed text-white/75">{t(`${item.id}.description`)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {faqs.length ? (
        <section className="border-t border-black/6 bg-white px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="font-heading text-sm text-muted-foreground">{tPage("faqEyebrow")}</p>
              <h2 className="mt-3 font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight text-weecomi-dark-gray">{tPage("faqTitle")}</h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">{tPage("faqSubtitle")}</p>
            </div>
            <div className="mt-10">
              <AboutFaq items={faqs} />
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
