"use client";

import { AnimatePresence, motion } from "motion/react";
import { TERMINAL_SNAPSHOTS, DAILY_PNL } from "./weebot-showcase-data";
import { useInViewCycle } from "./use-in-view-cycle";
import { cn } from "@/lib/utils";

/** Paper terminal — slow row PnL/status rotation while in view */
export default function WeebotTerminalLive() {
  const { ref, tick, reduceMotion } = useInViewCycle(4200);
  const snapshotIndex = reduceMotion ? 0 : tick % TERMINAL_SNAPSHOTS.length;
  const rows = TERMINAL_SNAPSHOTS[snapshotIndex];
  const dailyPnl = DAILY_PNL[snapshotIndex % DAILY_PNL.length];

  return (
    <div ref={ref} className="overflow-hidden rounded-[16px] border border-black/6 bg-[#f5f7fa]">
      <div className="flex items-center justify-between border-b border-black/6 px-3 py-2 md:px-3.5 md:py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex shrink-0 gap-1">
            <span className="size-1.5 rounded-full bg-red-400/70" />
            <span className="size-1.5 rounded-full bg-amber-400/75" />
            <span className="size-1.5 rounded-full bg-zinc-300" />
          </div>
          <span className="truncate text-[9px] font-medium text-zinc-500">paper-terminal</span>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 text-[9px] font-medium uppercase text-[#118a58]">
          <span className="size-1.5 rounded-full bg-[#118a58] motion-safe:animate-pulse" />
          LIVE
        </span>
      </div>

      <div className="overflow-x-auto px-3 py-2 font-mono text-[9px] md:px-3.5 md:py-2.5 md:text-[10px]">
        <div className="grid min-w-64 grid-cols-4 border-b border-black/6 pb-1.5 text-[8px] uppercase tracking-[0.14em] text-zinc-500">
          <span>Symbol</span>
          <span>Side</span>
          <span>PnL</span>
          <span className="text-right">Status</span>
        </div>
        {rows.map((row, index) => (
          <div
            key={row.symbol}
            className={cn(
              "grid min-w-64 grid-cols-4 items-center border-b border-black/4 py-1.5 last:border-0 md:py-2",
              index === 2 && "hidden md:grid",
            )}
          >
            <span className="truncate text-weecomi-dark-gray">{row.symbol}</span>
            <span className="text-[8px] font-semibold text-zinc-500">{row.side}</span>
            <div className="min-w-0 truncate">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={`${row.symbol}-${row.pnl}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="inline-block"
                >
                  <span className={row.positive ? "font-semibold text-[#118a58]" : "font-semibold text-[#c25858]"}>{row.pnl}</span>
                  <span className={cn("ml-0.5 text-[8px]", row.positive ? "text-[#118a58]/75" : "text-[#c25858]/70")}>{row.pct}</span>
                </motion.span>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={`${row.symbol}-${row.status}`}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="truncate text-right text-[8px] text-zinc-500"
              >
                {row.status}
              </motion.span>
            </AnimatePresence>
          </div>
        ))}
        <div className="hidden min-w-64 pt-1.5 text-[8px] text-zinc-500 md:block">
          Daily PnL:{" "}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={dailyPnl}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="inline-block font-semibold text-[#118a58]"
            >
              {dailyPnl}
            </motion.span>
          </AnimatePresence>
          <span className="px-1 text-zinc-400">·</span>
          Comm. sim: <span className="text-zinc-500">taker 0.05%</span>
        </div>
      </div>
    </div>
  );
}
