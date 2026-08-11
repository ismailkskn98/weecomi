"use client";

import { AnimatePresence, motion } from "motion/react";
import { TRADE_SNAPSHOTS, TICKER_PRESETS } from "./showcase-data";
import { useInViewCycle } from "../use-in-view-cycle";
import { cn } from "@/lib/utils";

/** Recent trades + ticker strip — light footer (bot terminal style) */
export default function CriptoSwapsTradesLive() {
  const { ref, tick, reduceMotion } = useInViewCycle(4000);
  const snapshotIndex = reduceMotion ? 0 : tick % TRADE_SNAPSHOTS.length;
  const trades = TRADE_SNAPSHOTS[snapshotIndex];
  const ticker = TICKER_PRESETS[snapshotIndex % TICKER_PRESETS.length];

  return (
    <div ref={ref} className="overflow-hidden rounded-[16px] border border-black/6 bg-[#f5f7fa]">
      <div className="flex items-center justify-between border-b border-black/6 px-3 py-2 md:px-3.5 md:py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="size-1.5 shrink-0 rounded-full bg-[#FCD535] motion-safe:animate-pulse" />
          <span className="truncate text-[9px] font-medium tracking-[0.08em] text-zinc-500">BTC/USDT · spot</span>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 text-[9px] font-medium uppercase text-[#B8860B]">
          Live tape
        </span>
      </div>

      <div className="hidden gap-3 border-b border-black/6 px-3 py-2 font-mono text-[8px] text-zinc-500 md:grid md:grid-cols-4 md:px-3.5">
        <span>
          24h Low <span className="font-semibold text-[#B8860B]">{ticker.low}</span>
        </span>
        <span>
          24h High <span className="font-semibold text-[#c25858]">{ticker.high}</span>
        </span>
        <span>
          Vol <span className="font-semibold text-weecomi-dark-gray/70">{ticker.volume}</span>
        </span>
        <span className="text-right">
          Change{" "}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={ticker.change}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={cn("inline-block font-semibold", ticker.change.startsWith("+") ? "text-[#B8860B]" : "text-[#c25858]")}
            >
              {ticker.change}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>

      <div className="overflow-x-auto px-3 py-2 font-mono text-[9px] md:px-3.5 md:py-2.5 md:text-[10px]">
        <div className="grid min-w-56 grid-cols-3 border-b border-black/6 pb-1.5 text-[8px] uppercase tracking-[0.14em] text-zinc-500">
          <span>Time</span>
          <span>Amount</span>
          <span className="text-right">Price</span>
        </div>
        {trades.map((trade, index) => (
          <div
            key={`${trade.time}-${trade.price}`}
            className={cn(
              "grid min-w-56 grid-cols-3 items-center border-b border-black/4 py-1.5 last:border-0 md:py-2",
              index === 2 && "hidden md:grid",
            )}
          >
            <span className="truncate text-zinc-500">{trade.time}</span>
            <span className="truncate text-weecomi-dark-gray/70">{trade.amount}</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={`${trade.time}-${trade.price}`}
                initial={reduceMotion ? false : { opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -3 }}
                transition={{ duration: 0.25 }}
                className={cn("truncate text-right font-semibold", trade.positive ? "text-[#B8860B]" : "text-[#c25858]")}
              >
                {trade.price}
              </motion.span>
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
