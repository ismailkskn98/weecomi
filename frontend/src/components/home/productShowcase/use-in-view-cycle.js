"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/** Runs a tick counter only while the element is in view; respects reduced motion. */
export function useInViewCycle(intervalMs = 4000) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [tick, setTick] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || !inView) return;
    const id = window.setInterval(() => setTick((value) => value + 1), intervalMs);
    return () => window.clearInterval(id);
  }, [reduceMotion, inView, intervalMs]);

  return { ref, tick, inView, reduceMotion: Boolean(reduceMotion) };
}
