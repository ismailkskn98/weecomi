"use client";

import { useMemo } from "react";
import { useReducedMotion } from "motion/react";
import { useGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Port of react-bits ScrollReveal (GSAP + ScrollTrigger scrub).
 * Defaults aligned with https://www.reactbits.dev/text-animations/scroll-reveal
 * SEO-friendly: full sentence stays in the DOM as word spans.
 *
 * scrub: true = 1:1 with scroll (library default). Number adds lag and can feel janky.
 */
export default function TextScrollReveal({
  children,
  className,
  textClassName,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
  scrub = true,
  stagger = 0.05,
}) {
  const reduceMotion = useReducedMotion();
  const text = typeof children === "string" ? children : "";
  const words = useMemo(() => text.split(/(\s+)/), [text]);

  const scopeRef = useGsap(
    (gsap, _ST, root) => {
      const wordElements = root.querySelectorAll("[data-word]");
      const scrubValue = scrub === true ? true : scrub;

      gsap.fromTo(
        root,
        { transformOrigin: "0% 50%", rotate: baseRotation },
        {
          ease: "none",
          rotate: 0,
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: rotationEnd,
            scrub: scrubValue,
          },
        },
      );

      if (!wordElements.length) return;

      // Opacity only — avoid willChange:filter (expensive on many word nodes).
      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: "opacity" },
        {
          ease: "none",
          opacity: 1,
          stagger,
          scrollTrigger: {
            trigger: root,
            start: "top bottom-=20%",
            end: wordAnimationEnd,
            scrub: scrubValue,
          },
        },
      );

      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: "none",
            filter: "blur(0px)",
            stagger,
            scrollTrigger: {
              trigger: root,
              start: "top bottom-=20%",
              end: wordAnimationEnd,
              scrub: scrubValue,
            },
          },
        );
      }
    },
    [baseOpacity, baseRotation, blurStrength, enableBlur, rotationEnd, wordAnimationEnd, scrub, stagger, text],
  );

  return (
    <div ref={scopeRef} className={cn("scroll-reveal", className)}>
      <p
        className={cn(
          "scroll-reveal-text text-[clamp(1.35rem,3.2vw,2.05rem)] font-heading font-normal leading-[1.65]",
          textClassName,
        )}
      >
        {words.map((token, index) => {
          if (/^\s+$/.test(token)) return <span key={`s-${index}`}>{token}</span>;
          return (
            <span
              key={`w-${index}`}
              data-word
              className="inline-block"
              style={reduceMotion ? undefined : { opacity: baseOpacity }}
            >
              {token}
            </span>
          );
        })}
      </p>
    </div>
  );
}
