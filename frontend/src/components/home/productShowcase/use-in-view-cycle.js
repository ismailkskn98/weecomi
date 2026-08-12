"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/** Runs a tick counter only while the element is meaningfully in view. */
export function useInViewCycle(intervalMs = 4000, { threshold = 0.6, minCycleWidth = 768 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [wideEnough, setWideEnough] = useState(false);
  const [tick, setTick] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${minCycleWidth}px)`);
    const update = () => setWideEnough(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [minCycleWidth]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.intersectionRatio >= threshold), { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  useEffect(() => {
    if (reduceMotion || !wideEnough || !inView) return;
    const id = window.setInterval(() => setTick((value) => value + 1), intervalMs);
    return () => window.clearInterval(id);
  }, [reduceMotion, wideEnough, inView, intervalMs]);

  return { ref, tick, inView, reduceMotion: Boolean(reduceMotion || !wideEnough) };
}
