"use client";

import TextScrollReveal from "@/components/ui/text-scroll-reveal";

export default function ManifestoQuote({ text }) {
  return (
    <TextScrollReveal
      // scrub={1}
      // baseOpacity={0.12}
      // blurStrength={0}
      // baseRotation={0}
      textClassName="font-heading text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] font-base leading-[1.4] tracking-[-0.01em] text-weecomi-dark-gray"
    >
      {text}
    </TextScrollReveal>
  );
}
