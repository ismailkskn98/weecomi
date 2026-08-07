"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { listPublicGallery } from "@/lib/api/gallery";
import { HIKARI_HERO } from "@/data/hikariImages";
import { cn } from "@/lib/utils";

const categories = ["all", "events", "products", "office", "team", "other"];
const PLACEHOLDER = "/images/hikari/campaign-1.jpg";

export default function GalleryGrid() {
  const t = useTranslations("Gallery");
  const locale = useLocale();
  const [items, setItems] = useState([]);
  const [active, setActive] = useState("all");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    listPublicGallery({ locale, page: 1, pageSize: 48 })
      .then((data) => setItems(data?.items || []))
      .catch(() => setItems([]));
  }, [locale]);

  const visible = active === "all" ? items : items.filter((item) => item.category === active);

  return (
    <>
      <div className="mt-10 flex flex-wrap justify-center gap-2 md:justify-start">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={cn(
              "rounded-xl px-4 py-2 font-heading text-xs transition",
              active === category ? "bg-weecomi-dark-gray text-white" : "border border-black/[0.08] bg-white text-weecomi-dark-gray hover:border-weecomi-orange/40",
            )}
          >
            {category === "all" ? t("all") : t(`categories.${category}`)}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="mt-14 overflow-hidden rounded-[18px] border border-black/[0.06] bg-[#f7f8f9]">
          <div className="relative aspect-[21/9]">
            <Image src={HIKARI_HERO} alt="" fill className="object-cover opacity-80" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <p className="absolute inset-x-0 bottom-8 text-center text-base text-white md:text-lg">{t("empty")}</p>
          </div>
        </div>
      ) : (
        <div className="mt-10 columns-1 gap-4 sm:columns-2 xl:columns-3">
          {visible.map((item) => (
            <button
              key={item.id}
              type="button"
              className="group mb-4 w-full break-inside-avoid overflow-hidden rounded-[18px] border border-black/[0.06] bg-white text-left transition hover:-translate-y-0.5 hover:border-weecomi-orange/30 hover:shadow-[0_24px_60px_-40px_rgba(13,13,13,0.35)]"
              onClick={() => setSelected(item)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.coverImageUrl || PLACEHOLDER}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 md:p-5">
                <p className="font-heading text-[11px] text-weecomi-orange">{t(`categories.${item.category}`) || item.category}</p>
                <h2 className="mt-1 font-heading text-xl text-weecomi-dark-gray">{item.title}</h2>
              </div>
            </button>
          ))}
        </div>
      )}

      {selected ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4" onClick={() => setSelected(null)} role="presentation">
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-[18px] bg-white p-4 md:p-5"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
          >
            <div className="relative aspect-video overflow-hidden rounded-[14px]">
              <Image src={selected.coverImageUrl || PLACEHOLDER} alt={selected.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
            </div>
            <p className="mt-4 font-heading text-[11px] text-weecomi-orange">{t(`categories.${selected.category}`) || selected.category}</p>
            <h3 className="mt-2 font-heading text-2xl text-weecomi-dark-gray md:text-3xl">{selected.title}</h3>
            {selected.description ? <p className="mt-3 text-muted-foreground">{selected.description}</p> : null}
            <button
              type="button"
              className="mt-5 inline-flex h-11 items-center rounded-xl bg-weecomi-dark-gray px-5 text-sm font-semibold text-white transition hover:bg-weecomi-dark-gray/90"
              onClick={() => setSelected(null)}
            >
              {t("close")}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
