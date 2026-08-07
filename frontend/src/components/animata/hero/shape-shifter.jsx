"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { HIKARI_HERO_MD } from "@/data/hikariImages";

const DEFAULT_IMAGES = [
  { src: HIKARI_HERO_MD, alt: "" },
  { src: "/images/hikari/campaign-1.jpg", alt: "" },
  { src: "/logos/weemenu.png", alt: "" },
];

/**
 * Inline media pill sized in `em` so it matches surrounding display type.
 * Fixed box — only content crossfades / slides. Does not wrap as its own line.
 */
export default function ShapeShifter({
  images = DEFAULT_IMAGES,
  className,
  transition = "fade",
  interval = 2800,
}) {
  const reduceMotion = useReducedMotion();
  const list = Array.isArray(images) && images.length ? images : DEFAULT_IMAGES;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || list.length < 2) return undefined;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % list.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval, list.length, reduceMotion]);

  const active = list[index] || list[0];
  const isSlide = transition === "slide";

  return (
    <span
      aria-hidden
      className={cn(
        "relative mx-[0.14em] inline-block h-[0.72em] w-[1.4em] shrink-0 overflow-hidden rounded-[0.32em] bg-weecomi-dark-gray align-middle shadow-[0_8px_24px_rgba(13,13,13,0.14)]",
        className,
      )}
    >
      {reduceMotion ? (
        <Image src={active.src} alt="" fill unoptimized className="object-cover" sizes="160px" />
      ) : (
        <AnimatePresence mode="sync" initial={false}>
          <motion.span
            key={`${active.src}-${index}`}
            className="absolute inset-0"
            initial={isSlide ? { opacity: 0, y: "110%" } : { opacity: 0 }}
            animate={isSlide ? { opacity: 1, y: "0%" } : { opacity: 1 }}
            exit={isSlide ? { opacity: 0, y: "-40%" } : { opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={active.src} alt="" fill unoptimized className="object-cover" sizes="160px" />
          </motion.span>
        </AnimatePresence>
      )}
    </span>
  );
}
