"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Lightweight rotating text — motion-based alternative to react-bits RotatingText.
 */
export default function RotatingText({
  words = [],
  interval = 2600,
  className,
  textClassName,
}) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const list = Array.isArray(words) ? words.filter(Boolean) : [];

  useEffect(() => {
    if (reduceMotion || list.length < 2) return undefined;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % list.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval, list.length, reduceMotion]);

  if (!list.length) return null;

  if (reduceMotion) {
    return (
      <span className={cn("inline-flex", className)}>
        <span className={textClassName}>{list[0]}</span>
      </span>
    );
  }

  return (
    <span className={cn("relative inline-flex overflow-hidden align-bottom", className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={list[index]}
          className={cn("inline-block", textClassName)}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        >
          {list[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
