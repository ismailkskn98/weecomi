"use client";

import { useCallback, useEffect, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import NewsCard from "@/components/news/newsCard";

const AUTOPLAY_MS = 4000;

export default function NewsCardsCarousel({ items, locale, viewLabel, label }) {
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: AUTOPLAY_MS,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
      }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: false,
      containScroll: "trimSnaps",
      skipSnaps: false,
      duration: 25,
    },
    [autoplay],
  );

  const onPointerEnter = useCallback(() => {
    emblaApi?.plugins()?.autoplay?.stop();
  }, [emblaApi]);

  const onPointerLeave = useCallback(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!media.matches) {
      emblaApi?.plugins()?.autoplay?.play();
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return undefined;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => {
      if (media.matches) {
        emblaApi.plugins()?.autoplay?.stop();
      } else {
        emblaApi.plugins()?.autoplay?.play();
      }
    };

    syncMotionPreference();
    media.addEventListener("change", syncMotionPreference);
    return () => media.removeEventListener("change", syncMotionPreference);
  }, [emblaApi]);

  // Embla loop needs enough slides when ~3 are visible; clone uniquely if short.
  const loopItems = useMemo(() => {
    if (!items?.length) return [];
    if (items.length >= 6) return items;

    const out = [];
    let i = 0;
    while (out.length < 6) {
      const item = items[i % items.length];
      out.push({
        ...item,
        id: `${item.id}-loop-${out.length}`,
      });
      i += 1;
    }
    return out;
  }, [items]);

  if (!loopItems.length) return null;

  return (
    <div
      className="relative"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-6 flex touch-pan-y">
          {loopItems.map((item) => (
            <div
              key={item.id}
              className="min-w-0 shrink-0 grow-0 basis-[88%] pl-6 sm:basis-[55%] md:basis-[33.333%]"
            >
              <NewsCard item={item} locale={locale} viewLabel={viewLabel} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
