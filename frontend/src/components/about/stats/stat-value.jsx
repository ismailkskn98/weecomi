"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import NumberFlow, { continuous } from "@number-flow/react";

export default function StatValue({ value, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4, initial: false });
  const [shown, setShown] = useState(0);
  const digits = String(value).length;

  useEffect(() => {
    if (inView) setShown(value);
  }, [inView, value]);

  return (
    <span ref={ref} className="inline-grid justify-items-start tabular-nums [grid-template-areas:'stack']">
      <span className="invisible [grid-area:stack] font-display text-[clamp(2.75rem,6vw,4rem)] leading-[0.85] tracking-tight" aria-hidden>
        {value}
        {suffix}
      </span>
      <NumberFlow
        value={shown}
        suffix={suffix}
        isolate
        plugins={[continuous]}
        format={{ useGrouping: false, minimumIntegerDigits: digits }}
        className="[grid-area:stack] font-display text-[clamp(2.75rem,6vw,4rem)] tracking-tight text-weecomi-dark-gray"
        style={{ lineHeight: 0.85, fontVariantNumeric: "tabular-nums" }}
        transformTiming={{ duration: 1400, easing: "ease-out" }}
        spinTiming={{ duration: 1400, easing: "ease-out" }}
      />
    </span>
  );
}
