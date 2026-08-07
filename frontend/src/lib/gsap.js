"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function ensureGsapPlugins() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Run a GSAP setup fn inside a context; auto-kills on unmount.
 * No-ops when prefers-reduced-motion is on (unless force=true).
 */
export function useGsap(setup, deps = [], { force = false } = {}) {
  const scopeRef = useRef(null);

  useLayoutEffect(() => {
    if (!scopeRef.current) return undefined;
    if (!force && prefersReducedMotion()) return undefined;

    ensureGsapPlugins();
    const ctx = gsap.context(() => {
      setup(gsap, ScrollTrigger, scopeRef.current);
    }, scopeRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}

export function useIsomorphicLayoutEffect(effect, deps) {
  const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;
  useIso(effect, deps);
}

export { gsap, ScrollTrigger };
