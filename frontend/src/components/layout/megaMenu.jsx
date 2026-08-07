"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { productCategories, products, getProductPath } from "@/data/products";
import { productVisuals } from "@/data/productVisuals";
import { cn } from "@/lib/utils";

function ProductIcon({ product }) {
  const visual = productVisuals[product.id] || { accent: "#346C92", logo: null };

  if (visual.logo) {
    return (
      <div className="flex h-10 w-10 p-1 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-white">
        <Image src={visual.logo} alt="" width={32} height={32} className="h-7 w-auto object-contain" />
      </div>
    );
  }

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white" style={{ backgroundColor: visual.accent }}>
      {product.name.slice(0, 1)}
    </div>
  );
}

export default function MegaMenu({ open, onClose, onMouseEnter, onMouseLeave }) {
  const tNav = useTranslations("Nav");
  const tNavCaps = useTranslations("NavCaps");
  const tCat = useTranslations("CategoriesCaps");
  const tProducts = useTranslations("Products");
  const reduceMotion = useReducedMotion();
  const featured = products.find((item) => item.id === "weemenu");

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-3 top-0 z-40 mx-auto max-w-6xl overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_24px_80px_-24px_rgba(13,13,13,0.22)] md:inset-x-4"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="gridContainer py-10">
            <div className="mb-8 max-w-2xl">
              <p className="text-xs font-semibold text-weecomi-blue">{tNavCaps("megaMenuEyebrow")}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tNav("megaMenuIntro")}</p>
            </div>

            <div className="grid gap-10 xl:grid-cols-[1fr_300px]">
              <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
                {productCategories.map((category) => {
                  const categoryProducts = products.filter((item) => item.category === category.id);

                  return (
                    <div key={category.id}>
                      <p className="mb-4 text-[11px] font-semibold text-muted-foreground">{tCat(category.translationKey)}</p>
                      <ul className="space-y-1">
                        {categoryProducts.map((product) => (
                          <li key={product.id}>
                            <Link href={getProductPath(product)} onClick={onClose} className="group flex gap-3 rounded-2xl p-2.5 transition hover:bg-weecomi-light-gray/70">
                              <ProductIcon product={product} />
                              <span className="min-w-0 flex-1">
                                <span className="flex items-center gap-2">
                                  <span className="block text-sm font-semibold text-weecomi-dark-gray transition group-hover:text-weecomi-blue">{product.name}</span>
                                  {product.comingSoon ? (
                                    <span className="rounded-full bg-weecomi-orange/12 px-2 py-0.5 text-[10px] font-semibold text-weecomi-orange">{tNavCaps("comingSoon")}</span>
                                  ) : null}
                                </span>
                                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground line-clamp-2">{tProducts(`${product.id}.title`)}</span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              <aside className="overflow-hidden rounded-3xl border border-border bg-weecomi-light-gray/35">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src="/images/example.jpg" alt="" fill className="object-cover transition duration-500 group-hover:scale-[1.02]" sizes="300px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-weecomi-dark-gray/70 via-weecomi-dark-gray/10 to-transparent" />
                </div>

                <div className="p-5">
                  <p className="text-[11px] font-semibold text-weecomi-blue">{tNavCaps("featured")}</p>
                  <h3 className="mt-2 text-xl font-bold text-weecomi-dark-gray">{featured?.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{featured ? tProducts(`${featured.id}.description`) : null}</p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{tNav("megaMenuFeaturedText")}</p>

                  <Link
                    href="/ecosystem"
                    onClick={onClose}
                    className={cn("mt-5 inline-flex items-center gap-2 rounded-full bg-weecomi-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-weecomi-blue/90")}
                  >
                    {tNavCaps("allProducts")}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
