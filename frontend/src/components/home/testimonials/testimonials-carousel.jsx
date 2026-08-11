"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import TestimonialAvatar from "./testimonial-avatar";
import TestimonialCard from "./testimonial-card";

const AUTOPLAY_MS = 5200;

export default function TestimonialsCarousel({ testimonials, memberLabel, labels }) {
  const reduceMotion = useReducedMotion();
  const avatarStripRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

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
      align: "center",
      dragFree: false,
      containScroll: false,
      skipSnaps: false,
      duration: reduceMotion ? 10 : 28,
    },
    reduceMotion ? [] : [autoplay],
  );

  const syncState = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return undefined;
    syncState();
    emblaApi.on("select", syncState);
    emblaApi.on("reInit", syncState);
    return () => {
      emblaApi.off("select", syncState);
      emblaApi.off("reInit", syncState);
    };
  }, [emblaApi, syncState]);

  useEffect(() => {
    if (!emblaApi || reduceMotion) return undefined;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => {
      if (media.matches) emblaApi.plugins()?.autoplay?.stop();
      else emblaApi.plugins()?.autoplay?.play();
    };

    syncMotionPreference();
    media.addEventListener("change", syncMotionPreference);
    return () => media.removeEventListener("change", syncMotionPreference);
  }, [emblaApi, reduceMotion]);

  useEffect(() => {
    const strip = avatarStripRef.current;
    if (!strip) return;
    const activeButton = strip.querySelector(`[data-avatar-index="${selectedIndex}"]`);
    if (!activeButton) return;
    activeButton.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", inline: "center", block: "nearest" });
  }, [selectedIndex, reduceMotion]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi?.scrollTo(index), [emblaApi]);

  const onPointerEnter = useCallback(() => {
    emblaApi?.plugins()?.autoplay?.stop();
  }, [emblaApi]);

  const onPointerLeave = useCallback(() => {
    if (reduceMotion) return;
    emblaApi?.plugins()?.autoplay?.play();
  }, [emblaApi, reduceMotion]);

  if (!testimonials?.length) return null;

  const progress = ((selectedIndex + 1) / testimonials.length) * 100;
  const active = testimonials[selectedIndex];

  return (
    <div className="relative" onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} aria-roledescription="carousel" aria-label={labels.carousel}>
      <div className="relative">

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="-ml-3 flex touch-pan-y md:-ml-4 lg:-ml-5">
            {testimonials.map((testimonial, index) => {
              const isActive = index === selectedIndex;
              const featured = index % 4 === 1;

              return (
                <div key={testimonial.id} className="min-w-0 shrink-0 grow-0 basis-[78%] pl-3 sm:basis-[48%] md:basis-[35%] md:pl-4 lg:basis-[28%] lg:pl-5 xl:basis-[24%]">
                  <div className={cn("h-full transition-[transform,opacity] duration-500 ease-out", isActive ? "scale-100 opacity-100" : "scale-[0.965] opacity-60 md:opacity-68")}>
                    <TestimonialCard testimonial={testimonial} index={index} memberLabel={memberLabel} featured={featured} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="gridContainer mt-6 md:mt-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active?.id}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3"
              >
                <TestimonialAvatar name={active.name} image={active.image} size="sm" />
                <div className="min-w-0">
                  <p className="truncate font-heading text-sm text-weecomi-dark-gray md:text-base">{active.name}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground md:text-sm">
                    <span>
                      {selectedIndex + 1} / {testimonials.length}
                    </span>
                    {active.joinedAt ? <span>{active.joinedAt}</span> : null}
                    {active.contactLabel && active.contactValue ? (
                      <span className="truncate">
                        {active.contactLabel}: {active.contactValue}
                      </span>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden h-px w-24 overflow-hidden rounded-full bg-black/10 sm:block md:w-32" aria-hidden>
              <div className="h-full rounded-full bg-weecomi-orange transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={scrollPrev}
                aria-label={labels.prev}
                className="inline-flex size-10 items-center justify-center rounded-xl border border-black/10 bg-white text-weecomi-dark-gray transition hover:border-weecomi-dark-gray/25 hover:bg-weecomi-dark-gray hover:text-white md:size-11"
              >
                <ArrowLeft className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label={labels.next}
                className="inline-flex size-10 items-center justify-center rounded-xl border border-black/10 bg-white text-weecomi-dark-gray transition hover:border-weecomi-dark-gray/25 hover:bg-weecomi-dark-gray hover:text-white md:size-11"
              >
                <ArrowRight className="size-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={avatarStripRef}
          className="mt-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] md:mt-6 md:justify-center md:gap-2.5 [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label={labels.avatars}
        >
          {testimonials.map((testimonial, index) => {
            const isActive = index === selectedIndex;
            return (
              <button
                key={testimonial.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={testimonial.name}
                data-avatar-index={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "shrink-0 rounded-full transition-[transform,opacity,filter] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-weecomi-orange/50",
                  isActive ? "scale-110 opacity-100" : "opacity-45 grayscale hover:opacity-75 hover:grayscale-0",
                )}
              >
                <TestimonialAvatar name={testimonial.name} image={testimonial.image} size="sm" muted={!isActive} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
