"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getProductPath } from "@/data/products";

export default function ProductCard({ product }) {
  const t = useTranslations("Products");
  const tEco = useTranslations("Ecosystem");
  const tNav = useTranslations("Nav");
  const tPage = useTranslations("ProductPage");
  const features = t.raw(`${product.id}.features`) || [];

  return (
    <Link href={getProductPath(product)} className="group block border border-border bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:border-weecomi-light-blue hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-weecomi-blue">{product.name}</p>
          <h3 className="mt-2 text-xl font-bold text-weecomi-dark-gray">{t(`${product.id}.title`)}</h3>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(`${product.id}.description`)}</p>
      <ul className="mt-4 space-y-1.5">
        {features.slice(0, 4).map((feature) => (
          <li key={feature} className="text-sm text-weecomi-dark-gray/80">
            • {feature}
          </li>
        ))}
      </ul>
      {product.comingSoon ? <span className="mt-4 inline-flex bg-weecomi-orange/15 px-3 py-1 text-xs font-semibold text-weecomi-orange">{tNav("comingSoon")}</span> : null}
      {product.showDisclaimer ? <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{tEco("disclaimer")}</p> : null}
      <span className="mt-5 inline-flex text-sm font-semibold text-weecomi-blue">{tPage("learnMore")}</span>
    </Link>
  );
}
