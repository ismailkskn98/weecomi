"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.23, 1, 0.32, 1];

/**
 * Section shell — no entrance animation (keeps Server Component children interleaved).
 */
export default function HeroReveal({ children, className }) {
  return <section className={className}>{children}</section>;
}

/**
 * Mount entrance for hero pieces.
 * fade=false → transform only (H1 LCP stays paint-visible).
 * opacityOnly → no transform (avoids restarting CSS marquee on Safari/iOS).
 */
export function HeroRevealItem({
  children,
  className,
  delay = 0,
  y = 44,
  duration = 0.6,
  fade = true,
  scale = false,
  opacityOnly = false,
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const initial = opacityOnly
    ? { opacity: 0 }
    : {
        ...(fade ? { opacity: 0 } : null),
        y,
        ...(scale ? { scale: 0 } : null),
      };

  const animate = opacityOnly
    ? { opacity: 1 }
    : {
        ...(fade ? { opacity: 1 } : null),
        y: 0,
        ...(scale ? { scale: 1 } : null),
      };

  return (
    <motion.div
      className={cn(className)}
      initial={initial}
      animate={animate}
      transition={{
        duration,
        delay,
        ease: scale ? [0.34, 1.56, 0.64, 1] : EASE,
      }}
    >
      {children}
    </motion.div>
  );
}
