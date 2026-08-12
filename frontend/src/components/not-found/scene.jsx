"use client";

import { useReducedMotion } from "motion/react";
import { WarpBackground } from "@/components/ui/warp-background";
import Noise from "@/components/ui/noise";

export default function NotFoundScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 42% 38% at 38% 42%, rgba(111,164,199,0.42), transparent 70%)",
            "radial-gradient(ellipse 36% 34% at 52% 48%, rgba(240,159,47,0.28), transparent 68%)",
            "radial-gradient(ellipse 30% 28% at 64% 40%, rgba(198,57,39,0.14), transparent 70%)",
            "radial-gradient(ellipse 50% 40% at 48% 55%, rgba(52,108,146,0.16), transparent 72%)",
          ].join(","),
        }}
      />
      <WarpBackground
        className="h-full min-h-full rounded-none border-0 bg-transparent p-0"
        perspective={reduceMotion ? 0 : 140}
        beamsPerSide={reduceMotion ? 0 : 2}
        beamSize={7}
        beamDuration={7}
        beamDelayMax={4}
        beamColor="rgba(52,108,146,0.28)"
        gridColor="rgba(13,13,13,0.08)"
      >
        <span className="sr-only" />
      </WarpBackground>
      <Noise patternRefreshInterval={10} patternAlpha={8} />
    </div>
  );
}
