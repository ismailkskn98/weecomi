"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

function FaqItem({ item, open, onToggle, reduceMotion }) {
  return (
    <div className="border-b border-black/10">
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full cursor-pointer items-start justify-between gap-4 py-5 text-left sm:py-6 md:gap-6">
        <span className="min-w-0 flex-1 font-heading text-lg leading-snug text-weecomi-dark-gray sm:text-xl md:text-2xl lg:text-[1.65rem]">{item.q}</span>
        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center text-weecomi-dark-gray md:size-8">
          <Plus className={cn("size-5 md:size-6", !reduceMotion && "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]", open && "rotate-45")} strokeWidth={1.75} aria-hidden />
        </span>
      </button>

      <div className={cn("grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]", reduceMotion && "duration-0", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">
          <p
            className={cn(
              "max-w-3xl pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base md:pb-6 md:text-[17px]",
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
    <div className="mx-auto w-full max-w-4xl border-t border-black/10">
      {faqItems.map((item, index) => (
        <FaqItem key={item.q} item={item} open={openIndex === index} onToggle={() => setOpenIndex((current) => (current === index ? null : index))} reduceMotion={reduceMotion} />
      ))}
    </div>
  );
}
