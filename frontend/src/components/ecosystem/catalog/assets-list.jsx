import Image from "next/image";
import { productVisuals } from "@/data/productVisuals";
import CursorLink from "./cursor-link";

/** Compact dossier-style rows for digital assets: logo + name + one-line copy. */
export default function AssetsList({ products = [], getCopy, ctaLabel, disclaimer }) {
  if (!products.length) return null;

  const showDisclaimer = products.some((item) => item.showDisclaimer);

  return (
    <div>
      <ul className="divide-y divide-black/10 border-y border-black/10">
        {products.map((product) => {
          const copy = getCopy(product);
          const logo = productVisuals[product.id]?.logo;

          return (
            <li key={product.id} data-eco-item>
              <CursorLink href={copy.href} label={ctaLabel}>
                <div className="group flex items-start gap-4 py-6 transition-colors md:items-center md:gap-6 md:py-7">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-[#f0f0f0] md:size-14">
                    {logo ? <Image src={logo} alt="" fill className="object-contain p-2" sizes="56px" /> : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-heading text-base text-weecomi-dark-gray transition group-hover:text-weecomi-orange md:text-lg">
                        {product.name}
                      </h3>
                      {copy.comingSoonLabel ? (
                        <span className="font-heading text-[11px] text-weecomi-orange">{copy.comingSoonLabel}</span>
                      ) : null}
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">{copy.description}</p>
                  </div>
                  <span className="hidden shrink-0 font-heading text-xs text-weecomi-dark-gray/40 transition group-hover:text-weecomi-orange md:inline">
                    {ctaLabel}
                  </span>
                </div>
              </CursorLink>
            </li>
          );
        })}
      </ul>
      {showDisclaimer && disclaimer ? <p className="mt-5 max-w-2xl text-xs leading-relaxed text-muted-foreground">{disclaimer}</p> : null}
    </div>
  );
}
