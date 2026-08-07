"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

function FaqItem({ item, open, onToggle, reduceMotion }) {
  return (
    <div className="border-b border-black/15">
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full cursor-pointer items-start justify-between gap-4 py-6 text-left md:gap-8 md:py-7">
        <span className="min-w-0 flex-1 font-heading text-[clamp(1.35rem,3.2vw,2.25rem)] leading-display text-weecomi-dark-gray">{item.q}</span>
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center text-weecomi-dark-gray">
          <Plus className={cn("h-7 w-7", !reduceMotion && "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]", open && "rotate-45")} strokeWidth={1.75} aria-hidden />
        </span>
      </button>

      <div className={cn("grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]", reduceMotion && "duration-0", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">
          <p
            className={cn(
              "max-w-5xl pb-6 text-base leading-relaxed text-muted-foreground md:pb-7 md:text-lg",
              !reduceMotion && "transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              open ? "opacity-100" : "opacity-0",
            )}
          >
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Accordion + Motion useReducedMotion — keep as-is for animation safety. */
export default function FaqAccordion({ items }) {
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(null);
  const faqItems = Array.isArray(items) ? items : [];

  return (
    <div className="mx-auto mt-14 w-full max-w-5xl">
      {faqItems.map((item, index) => (
        <FaqItem key={item.q} item={item} open={openIndex === index} onToggle={() => setOpenIndex((current) => (current === index ? null : index))} reduceMotion={reduceMotion} />
      ))}
    </div>
  );
}
