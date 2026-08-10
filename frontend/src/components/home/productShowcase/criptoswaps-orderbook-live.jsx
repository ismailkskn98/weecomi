"use client";

import { AnimatePresence, motion } from "motion/react";
import { ORDERBOOK_SNAPSHOTS } from "./criptoswaps-showcase-data";
import { useInViewCycle } from "./use-in-view-cycle";
import { cn } from "@/lib/utils";

function DepthRow({ row, side }) {
  const depth = Math.min(Number.parseFloat(row.amount) * 160, 92);

  return (
    <div className="relative grid grid-cols-3 gap-1 overflow-hidden rounded-sm px-1 py-1">
      <span
        className={cn("pointer-events-none absolute inset-y-0 right-0", side === "ask" ? "bg-[#c25858]/10" : "bg-[#FCD535]/25")}
        style={{ width: `${depth}%` }}
        aria-hidden
      />
      <span className={cn("relative truncate", side === "ask" ? "text-[#c25858]" : "text-[#B8860B]")}>{row.price}</span>
      <span className="relative truncate text-right text-zinc-500">{row.amount}</span>
      <span className="relative truncate text-right text-zinc-400">{row.total}</span>
    </div>
  );
}

/** Compact order book under chart — dense rows, no hollow justify-between */
export default function CriptoSwapsOrderbookLive() {
  const { ref, tick, reduceMotion } = useInViewCycle(4300);
  const book = ORDERBOOK_SNAPSHOTS[reduceMotion ? 0 : tick % ORDERBOOK_SNAPSHOTS.length];

  return (
    <div ref={ref} className="rounded-[14px] border border-black/6 bg-white p-2.5 sm:p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[9px] uppercase tracking-[0.14em] text-zinc-400 sm:text-[10px]">Emir defteri</p>
        <span className="text-[9px] text-zinc-400 sm:text-[10px]">USDT</span>
      </div>

      <div className="mt-2 grid gap-3 sm:grid-cols-2 sm:gap-4">
        <div className="min-w-0 font-mono text-[9px] sm:text-[10px]">
          <div className="mb-1 grid grid-cols-3 gap-1 px-1 text-[8px] uppercase tracking-[0.1em] text-zinc-400">
            <span>Ask</span>
            <span className="text-right">Amt</span>
            <span className="text-right">Tot</span>
          </div>
          <div className="space-y-0.5">
            {[...book.asks].reverse().map((row) => (
              <DepthRow key={`ask-${row.price}`} row={row} side="ask" />
            ))}
          </div>
        </div>

        <div className="min-w-0 font-mono text-[9px] sm:text-[10px]">
          <div className="mb-1 grid grid-cols-3 gap-1 px-1 text-[8px] uppercase tracking-[0.1em] text-zinc-400">
            <span>Bid</span>
            <span className="text-right">Amt</span>
            <span className="text-right">Tot</span>
          </div>
          <div className="space-y-0.5">
            {book.bids.map((row) => (
              <DepthRow key={`bid-${row.price}`} row={row} side="bid" />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={book.mid}
          initial={reduceMotion ? false : { opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -3 }}
          transition={{ duration: 0.25 }}
          className="mt-2.5 rounded-[10px] border border-black/6 bg-[#FCD535]/20 px-3 py-2 text-center font-heading text-sm text-weecomi-dark-gray sm:text-base"
        >
          Last {book.mid}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
