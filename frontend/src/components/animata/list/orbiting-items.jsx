"use client";

import { cn } from "@/lib/utils";

/**
 * Positions each item on a circle. With radius=50, centers sit on the
 * outer border (h-full w-full) — same math as Animata Orbiting Items.
 * @see https://animata.design/docs/list/orbiting-items
 */
function calculateItemStyle({ index, radius, totalItems }) {
  const angle = (index / totalItems) * 360;
  const radians = (angle * Math.PI) / 180;
  const x = radius * Math.cos(radians);
  const y = radius * Math.sin(radians);
  const round = (value) => Number(value.toFixed(4));
  return {
    left: `${round(50 + x)}%`,
    top: `${round(50 + y)}%`,
    transform: "translate(-50%, -50%)",
  };
}

export default function OrbitingItems({ radius = 50, items = [], pauseOnHover = true, backgroundClassName, containerClassName, className, center }) {
  // Parent rotates; items counter-rotate so logos stay upright.
  const reverse = cn("animate-rotate-full transition-transform ease-linear [animation-direction:reverse]", {
    "group-hover/orbit:paused": pauseOnHover,
  });

  return (
    <div className={cn("group/orbit relative flex items-center justify-center overflow-visible py-10", containerClassName)}>
      <div className={cn("pointer-events-none absolute inset-0 rounded-[18px] bg-[radial-gradient(circle_at_50%_45%,rgba(240,159,47,0.12),transparent_55%)]", backgroundClassName)} />
      <div
        className={cn(
          "relative flex animate-rotate-full items-center justify-center ease-linear h-48 w-48",
          {
            "group-hover/orbit:paused": pauseOnHover,
          },
          className,
        )}
      >
        {/* Orbit track — item centers land on this ring when radius={50} */}
        <div className="absolute inset-0 rounded-full border border-black/10" />

        {items.map((item, index) => (
          <div
            key={index}
            className="absolute flex h-11 w-11 items-center justify-center rounded-full border border-black/8 bg-white shadow-sm md:h-12 md:w-12"
            style={calculateItemStyle({
              index,
              radius,
              totalItems: items.length,
            })}
          >
            <div className={reverse}>{item}</div>
          </div>
        ))}

        {/* Inner decorative ring + optional center content */}
        <div className={cn("absolute flex h-1/2 w-1/2 items-center justify-center rounded-full border border-black/10 bg-white", reverse)}>{center}</div>
      </div>
    </div>
  );
}
