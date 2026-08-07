"use client";

import { useId } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Circular spinning text badge (react-bits CircularText, SVG textPath).
 * Decorative — pass visible label via aria-label when needed.
 */
export default function CircularText({
  text = "WEECOMI • PRODUCTS • ",
  className,
  size = 148,
  spinDuration = 18,
}) {
  const reduceMotion = useReducedMotion();
  const uid = useId();
  const pathId = `circular-text-${uid.replace(/:/g, "")}`;
  const radius = 58;
  const d = `M 100,100 m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`;
  const loop = `${String(text).trim()} `;

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={cn("select-none", !reduceMotion && "animate-rotate-full", className)}
      style={!reduceMotion ? { animationDuration: `${spinDuration}s` } : undefined}
      aria-hidden
    >
      <defs>
        <path id={pathId} d={d} fill="none" />
      </defs>
      <text className="fill-current font-heading text-[11px] font-normal uppercase">
        <textPath href={`#${pathId}`} startOffset="0%">
          {loop.repeat(3)}
        </textPath>
      </text>
    </svg>
  );
}
