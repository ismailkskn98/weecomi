"use client";

import { cn } from "@/lib/utils";

/**
 * Glass morphism transition band (cult-ui DistortedGlass).
 * CSS moved to globals.css (.glass-effect) to avoid styled-jsx.
 */
export function DistortedGlass({ className }) {
  return (
    <div
      className={cn(
        "relative mx-auto h-[44px] w-full max-w-5xl overflow-hidden rounded-b-2xl",
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 z-10 size-full overflow-hidden rounded-b-2xl border border-black/[0.04]">
        <div className="glass-effect size-full" />
      </div>
      <svg className="absolute h-0 w-0" aria-hidden>
        <defs>
          <filter id="fractal-noise-glass">
            <feTurbulence type="fractalNoise" baseFrequency="0.12 0.12" numOctaves="1" result="warp" />
            <feDisplacementMap
              xChannelSelector="R"
              yChannelSelector="G"
              scale="30"
              in="SourceGraphic"
              in2="warp"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
