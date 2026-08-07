"use client";

import { useGsap } from "@/lib/gsap";

/**
 * Thin GSAP island: each matched item reveals when *it* enters the viewport
 * (not when the section top does — that finished animations off-screen).
 */
export default function ScrollReveal({
  children,
  itemSelector,
  className,
  id,
  as: Comp = "section",
  y = 32,
  start = "top 88%",
  stagger = 0.1,
  duration = 0.55,
  ease = "power2.out",
}) {
  const scopeRef = useGsap(
    (gsap, ScrollTrigger, root) => {
      const items = root.querySelectorAll(itemSelector);
      if (!items.length) return;

      gsap.set(items, { opacity: 0, y });

      ScrollTrigger.batch(items, {
        start,
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            ease,
            overwrite: true,
          });
        },
      });
    },
    [itemSelector, y, start, stagger, duration, ease],
  );

  return (
    <Comp ref={scopeRef} id={id} className={className}>
      {children}
    </Comp>
  );
}
