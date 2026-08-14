"use client";

import TextScrollReveal from "@/components/ui/text-scroll-reveal";
import { cn } from "@/lib/utils";

export default function ManifestoQuote({ text, className }) {
  return (
    <TextScrollReveal
      scrub={2}
      // baseOpacity={0.12}
      // blurStrength={0}
      // baseRotation={0}
      textClassName={cn("font-heading text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] font-base leading-[1.4] tracking-[-0.01em] text-weecomi-dark-gray", className)}
    >
      {text}
    </TextScrollReveal>
  );
}
