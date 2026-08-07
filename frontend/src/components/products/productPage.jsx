import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getProductDetails } from "@/data/productDetails";
import { getRelatedProducts, getProductPath } from "@/data/products";

export default async function productPage({ product, locale }) {
  const t = await getTranslations("Products");
  const tPage = await getTranslations("ProductPage");
  const tEco = await getTranslations("Ecosystem");
  const tNav = await getTranslations("Nav");
  const details = getProductDetails(product.id, locale) || getProductDetails(product.id, "tr");
  const features = t.raw(`${product.id}.features`) || [];
  const related = getRelatedProducts(product);

  return (
    <article>
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-[#f7fbfe] to-white py-16 md:py-20">
        <div className="gridContainer">
          <p className="font-heading text-xs text-weecomi-blue">{product.nameCaps}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-normal leading-display text-weecomi-dark-gray md:text-5xl">{t(`${product.id}.title`)}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t(`${product.id}.description`)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {product.url ? (
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-md bg-weecomi-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-weecomi-blue/90"
              >
                {tPage("visitProduct")}
              </a>
            ) : (
              <span className="inline-flex rounded-md bg-weecomi-orange/15 px-5 py-2.5 text-sm font-semibold text-weecomi-orange">{tNav("comingSoon")}</span>
            )}
            <Link
              href="/contact"
              className="inline-flex rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-weecomi-dark-gray transition hover:border-weecomi-blue hover:text-weecomi-blue"
            >
              {tPage("contactCta")}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="gridContainer grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-bold text-weecomi-dark-gray">{tPage("aboutTitle")}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{details?.longDescription}</p>
            {product.showDisclaimer ? <p className="mt-6 border-l-2 border-weecomi-orange pl-4 text-sm text-muted-foreground">{tEco("disclaimer")}</p> : null}
          </div>
          <aside className="border border-border bg-weecomi-light-gray/40 p-6">
            <h3 className="text-sm font-bold text-weecomi-blue">{tPage("audienceTitle")}</h3>
            <ul className="mt-4 space-y-2">
              {(details?.audience || []).map((item) => (
                <li key={item} className="text-sm text-weecomi-dark-gray">
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="border-y border-border bg-white py-14 md:py-16">
        <div className="gridContainer">
          <h2 className="text-2xl font-bold text-weecomi-dark-gray">{tPage("featuresTitle")}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <li key={feature} className="border border-border px-4 py-5 text-sm font-medium text-weecomi-dark-gray">
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="gridContainer">
          <h2 className="text-2xl font-bold text-weecomi-dark-gray">{tPage("howTitle")}</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {(details?.howItWorks || []).map((step, index) => (
              <li key={step.title} className="relative pt-2">
                <span className="text-xs font-bold uppercase text-weecomi-orange">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-bold text-weecomi-dark-gray">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-border bg-[#f7fbfe] py-14 md:py-16">
        <div className="gridContainer">
          <h2 className="text-2xl font-bold text-weecomi-dark-gray">{tPage("screensTitle")}</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{tPage("screensSubtitle")}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="aspect-[4/3] border border-border bg-gradient-to-br from-weecomi-blue/15 via-white to-weecomi-orange/15"
                role="img"
                aria-label={`${product.name} preview ${item}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="gridContainer max-w-3xl">
          <h2 className="text-2xl font-bold text-weecomi-dark-gray">{tPage("faqTitle")}</h2>
          <div className="mt-8 space-y-4">
            {(details?.faqs || []).map((faq) => (
              <details key={faq.q} className="group border border-border px-4 py-3">
                <summary className="cursor-pointer list-none text-sm font-semibold text-weecomi-dark-gray">{faq.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="border-t border-border bg-weecomi-light-gray/35 py-14 md:py-16">
          <div className="gridContainer">
            <h2 className="text-2xl font-bold text-weecomi-dark-gray">{tPage("relatedTitle")}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.id} href={getProductPath(item)} className="border border-border bg-white p-5 transition hover:border-weecomi-blue">
                  <p className="text-sm font-bold text-weecomi-blue">{item.name}</p>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{t(`${item.id}.description`)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-weecomi-dark-gray py-14 text-white md:py-16">
        <div className="gridContainer flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold">{tPage("ctaTitle")}</h2>
            <p className="mt-2 text-sm text-white/70">{tPage("ctaSubtitle")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {product.url ? (
              <a href={product.url} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-md bg-weecomi-orange px-5 py-2.5 text-sm font-semibold text-weecomi-dark-gray">
                {tPage("visitProduct")}
              </a>
            ) : null}
            <Link href="/contact" className="inline-flex rounded-md border border-white/30 px-5 py-2.5 text-sm font-semibold text-white">
              {tPage("contactCta")}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
