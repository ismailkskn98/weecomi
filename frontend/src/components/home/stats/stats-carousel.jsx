"use client";

import { useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const AUTOPLAY_MS = 3000;

export default function StatsCarousel({ slides, label }) {
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

  // Embla loop needs enough slides when ~2.5 are visible; clone uniquely if short.
  const loopSlides = useMemo(() => {
    if (!slides?.length) return [];
    if (slides.length >= 6) return slides;

    const out = [];
    let i = 0;
    while (out.length < 6) {
      const slide = slides[i % slides.length];
      out.push({
        ...slide,
        id: `${slide.id || slide.src}-loop-${out.length}`,
      });
      i += 1;
    }
    return out;
  }, [slides]);

  if (!loopSlides.length) return null;

  return (
    <div className="relative" onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} aria-roledescription="carousel" aria-label={label}>
      <div className="overflow-hidden rounded-l-[1.25rem] md:rounded-l-[1.5rem] lg:rounded-l-[1.75rem]" ref={emblaRef}>
        {/*
          Loop + CSS gap breaks the seam in Embla.
          Use equal padding on every slide + negative container margin instead.
        */}
        <div className="-ml-3 flex touch-pan-y md:-ml-4 lg:-ml-5">
          {loopSlides.map((slide, index) => (
            <div key={slide.id} className="min-w-0 shrink-0 grow-0 basis-[86%] pl-3 sm:basis-[62%] md:basis-[48%] md:pl-4 lg:basis-[42%] lg:pl-5 xl:basis-[40%]">
              <figure className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem] lg:rounded-[1.75rem]">
                <Image
                  src={slide.src}
                  alt={slide.alt || ""}
                  fill
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 40vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </figure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
