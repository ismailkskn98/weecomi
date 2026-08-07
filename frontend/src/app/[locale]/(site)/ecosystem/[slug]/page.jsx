import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import EcosystemDetail from "@/components/ecosystem/ecosystem-detail";
import { getProductBySlug, products } from "@/data/products";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return products.flatMap((product) =>
    routing.locales.map((locale) => ({
      locale,
      slug: product.slug,
    })),
  );
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const t = await getTranslations({ locale, namespace: "Products" });
  const title = `${product.name} | ${t(`${product.id}.title`)}`;
  const description = t(`${product.id}.description`);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonical = `${siteUrl}/${locale}/ecosystem/${product.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "WeeComi",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function EcosystemDetailRoute({ params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = getProductBySlug(slug);
  if (!product) notFound();

  const t = await getTranslations("Products");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: t(`${product.id}.description`),
    url: product.url || `${siteUrl}/${locale}/ecosystem/${product.slug}`,
    provider: {
      "@type": "Organization",
      name: "WeeComi International",
      url: siteUrl,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EcosystemDetail product={product} locale={locale} />
    </>
  );
}
