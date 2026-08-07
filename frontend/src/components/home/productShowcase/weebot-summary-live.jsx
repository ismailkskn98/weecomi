"use client";

import { AnimatePresence, motion } from "motion/react";
import { SUMMARY_PRESETS, STRATEGY_SNAPSHOTS } from "./weebot-showcase-data";
import { useInViewCycle } from "./use-in-view-cycle";
import { cn } from "@/lib/utils";

/** Summary panel — slow win-rate / strategy PnL rotation while in view */
export default function WeebotSummaryLive() {
  const { ref, tick, reduceMotion } = useInViewCycle(4500);
  const summaryIndex = reduceMotion ? 0 : tick % SUMMARY_PRESETS.length;
  const strategyIndex = reduceMotion ? 0 : tick % STRATEGY_SNAPSHOTS.length;
  const summary = SUMMARY_PRESETS[summaryIndex];
  const strategies = STRATEGY_SNAPSHOTS[strategyIndex];

  return (
    <div ref={ref} className="rounded-[14px] border border-black/6 bg-white p-3 sm:p-3.5">
      <p className="text-[9px] uppercase tracking-[0.14em] text-zinc-400 sm:text-[10px]">Summary</p>

      <div className="mt-2.5 grid grid-cols-2 gap-2 sm:mt-3 sm:gap-2.5">
        {summary.map((item) => (
          <div key={item.label} className="rounded-[10px] border border-black/6 bg-[#f8fafc] p-2.5 sm:p-3">
            <p className="text-[9px] uppercase tracking-[0.12em] text-zinc-400 sm:text-[10px]">{item.label}</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={`${item.label}-${item.value}`}
                initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className={cn("mt-1.5 font-heading text-lg leading-none sm:mt-2 sm:text-xl", item.tone)}
              >
                {item.value}
              </motion.p>
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="mt-2 hidden gap-2 sm:mt-2.5 md:grid lg:grid-cols-3">
        {strategies.map((item, index) => (
          <div
            key={item.name}
            className={cn(
              "flex items-start justify-between gap-2 rounded-[10px] border border-black/6 bg-[#f8fafc] p-2.5 sm:gap-3 sm:p-3",
              index === 2 && "hidden xl:flex",
            )}
          >
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-weecomi-dark-gray sm:text-[13px]">{item.name}</p>
              <p className="mt-0.5 text-[10px] text-zinc-400 sm:mt-1 sm:text-[11px]">{item.market}</p>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={`${item.name}-${item.pnl}`}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.25 }}
                className={cn("shrink-0 text-xs font-semibold sm:text-[13px]", item.positive ? "text-[#118a58]" : "text-[#c25858]")}
              >
                {item.pnl}
              </motion.span>
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
