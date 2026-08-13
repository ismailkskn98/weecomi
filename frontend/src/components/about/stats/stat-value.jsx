"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import NumberFlow, { continuous } from "@number-flow/react";
import { cn } from "@/lib/utils";

export default function StatValue({ value, suffix = "", className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4, initial: false });
  const [shown, setShown] = useState(0);
  const digits = String(value).length;
  const textClassName = cn("font-display text-[clamp(2.75rem,6vw,4rem)] leading-[0.85] tracking-tight", className);

  useEffect(() => {
    if (inView) setShown(value);
  }, [inView, value]);

  return (
    <span ref={ref} className="inline-grid justify-items-start tabular-nums [grid-template-areas:'stack']">
      <span className={cn("invisible [grid-area:stack]", textClassName)} aria-hidden>
        {value}
        {suffix}
      </span>
      <NumberFlow
        value={shown}
        suffix={suffix}
        isolate
        plugins={[continuous]}
        format={{ useGrouping: false, minimumIntegerDigits: digits }}
        className={cn("[grid-area:stack] text-weecomi-dark-gray", textClassName)}
        style={{ lineHeight: 0.85, fontVariantNumeric: "tabular-nums" }}
        transformTiming={{ duration: 1400, easing: "ease-out" }}
        spinTiming={{ duration: 1400, easing: "ease-out" }}
      />
    </span>
  );
}
