"use client";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

function RibbonTrack({ text, className, reverse = false }) {
  const items = Array.from({ length: 6 }, (_, index) => (
    <span key={index} className="mx-4 inline-flex shrink-0 items-center gap-4 whitespace-nowrap font-heading text-lg text-white md:text-2xl">
      <span>{text}</span>
      <span aria-hidden>×</span>
    </span>
  ));

  return (
    <div className={cn("overflow-hidden py-3 md:py-4", className)}>
      <div className={cn("flex w-max", reverse ? "announcement-ribbon-track-reverse" : "announcement-ribbon-track")}>
        {items}
        {items}
      </div>
    </div>
  );
}

/** Diagonal crossing bands used between About sections (Agero-style). */
export default function CrossingRibbons({ topText, bottomText, className }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("relative isolate w-full max-w-full overflow-hidden py-10 md:py-14", className)}>
      <div
        className={cn(
          "w-[120%] origin-center -translate-x-[10%] -rotate-[4deg] bg-weecomi-orange sm:w-full sm:translate-x-0",
          reduceMotion && "[&_.announcement-ribbon-track]:![animation:none] [&_.announcement-ribbon-track-reverse]:![animation:none]",
        )}
      >
        <RibbonTrack text={topText} />
      </div>
      <div
        className={cn(
          "relative z-10 -mt-2 w-[120%] origin-center -translate-x-[10%] rotate-[3deg] bg-weecomi-dark-gray sm:w-full sm:translate-x-0 md:-mt-3",
          reduceMotion && "[&_.announcement-ribbon-track]:![animation:none] [&_.announcement-ribbon-track-reverse]:![animation:none]",
        )}
      >
        <RibbonTrack text={bottomText} reverse />
      </div>
    </div>
  );
}
