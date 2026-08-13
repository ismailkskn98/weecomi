"use client";

import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FaqCard({ item, open, onToggle, reduceMotion }) {
  return (
    <div
      className={cn(
        "h-fit rounded-[22px] border border-black/6 bg-white transition-shadow duration-300",
        open && "shadow-[0_18px_50px_rgba(13,13,13,0.06)]",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left md:px-6 md:py-6"
      >
        <span className="min-w-0 flex-1 font-heading text-lg text-weecomi-dark-gray md:text-xl">{item.q}</span>
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f5f5f5] text-weecomi-dark-gray">
          <Plus
            className={cn(
              "size-4",
              !reduceMotion && "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              open && "rotate-45",
            )}
            strokeWidth={2}
            aria-hidden
          />
        </span>
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          reduceMotion && "duration-0",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground md:px-6 md:pb-6 md:text-base">{item.a}</p>
        </div>
      </div>
    </div>
  );
}
