"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { BracketTag } from "@/components/home/_shared";
import NewsCard from "@/components/news/newsCard";

export default function NewsCarousel({ items, locale }) {
  const t = useTranslations("News");
  const trackRef = useRef(null);

  if (!items?.length) return null;

  function scrollByAmount(direction) {
    const track = trackRef.current;
    if (!track) return;
    const amount = Math.max(track.clientWidth * 0.85, 320);
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section className="border-t border-black/[0.06] pt-16 md:pt-24">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <BracketTag className="text-weecomi-orange">{t("eyebrow")}</BracketTag>
          <h2 className="mt-4 font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] leading-display text-weecomi-dark-gray">
            {t("exploreTitle")}
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label={t("carouselPrev")}
            onClick={() => scrollByAmount(-1)}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-black/[0.08] bg-white text-weecomi-dark-gray transition hover:border-weecomi-orange hover:text-weecomi-orange"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label={t("carouselNext")}
            onClick={() => scrollByAmount(1)}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-black/[0.08] bg-white text-weecomi-dark-gray transition hover:border-weecomi-orange hover:text-weecomi-orange"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <div key={item.id} className="w-[min(88vw,360px)] shrink-0 snap-start md:w-[380px]">
            <NewsCard item={item} locale={locale} viewLabel={t("view")} compact />
          </div>
        ))}
      </div>
    </section>
  );
}
