"use client";

import { useGsap } from "@/lib/gsap";

/**
 * Premium hero entrance — H1 stays paint-visible (transform only, no opacity:0).
 * Supporting copy fades in with delay; floating logos pop; marquee/media rise from below.
 */
export default function HeroReveal({ children, className }) {
  const scopeRef = useGsap((gsap, _ST, root) => {
    const badge = root.querySelector("[data-hero-badge]");
    const title = root.querySelector("[data-hero-title]");
    const subtitle = root.querySelector("[data-hero-subtitle]");
    const cta = root.querySelector("[data-hero-cta]");
    const trust = root.querySelector("[data-hero-trust]");
    const logos = root.querySelectorAll("[data-float-logo]");
    const marquee = root.querySelector("[data-hero-marquee]");
    const media = root.querySelector("[data-hero-media]");

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    const fadeUp = (target, at, y = 44) => {
      if (!target) return;
      tl.fromTo(
        target,
        { y, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, clearProps: "transform,opacity" },
        at,
      );
    };

    fadeUp(badge, 0.05, 32);

    if (title) {
      // Transform only — keeps LCP text visible from first paint.
      tl.fromTo(
        title,
        { y: 52 },
        { y: 0, duration: 0.75, ease: "power3.out", clearProps: "transform" },
        0.16,
      );
    }

    fadeUp(subtitle, 0.3, 44);
    fadeUp(cta, 0.42, 44);
    fadeUp(trust, 0.52, 28);

    if (logos.length) {
      tl.fromTo(
        logos,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.55,
          stagger: 0.09,
          ease: "back.out(1.75)",
          clearProps: "transform,opacity",
        },
        0.32,
      );
    }

    // Opacity only — parent transform restarts child CSS marquee on Safari/iOS.
    if (marquee) {
      tl.fromTo(marquee, { opacity: 0 }, { opacity: 1, duration: 0.6, clearProps: "opacity" }, 0.58);
    }
    fadeUp(media, 0.7, 64);
  }, []);

  return (
    <section ref={scopeRef} className={className}>
      {children}
    </section>
  );
}
