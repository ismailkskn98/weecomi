"use client";

import TextScrollReveal from "@/components/ui/text-scroll-reveal";

export default function ManifestoQuote({ text }) {
  return (
    <TextScrollReveal
      scrub={1}
      baseOpacity={0.12}
      blurStrength={0}
      baseRotation={0}
      textClassName="font-heading text-[clamp(1.65rem,3.8vw,2.65rem)] font-semibold leading-[1.35] tracking-[-0.02em] text-weecomi-dark-gray"
    >
      {text}
    </TextScrollReveal>
  );
}
