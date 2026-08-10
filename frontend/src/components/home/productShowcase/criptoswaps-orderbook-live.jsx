"use client";

import { AnimatePresence, motion } from "motion/react";
import { ORDERBOOK_SNAPSHOTS } from "./criptoswaps-showcase-data";
import { useInViewCycle } from "./use-in-view-cycle";

/** Compact order book — light panel, yellow mid accent */
export default function CriptoSwapsOrderbookLive() {
  const { ref, tick, reduceMotion } = useInViewCycle(4300);
  const book = ORDERBOOK_SNAPSHOTS[reduceMotion ? 0 : tick % ORDERBOOK_SNAPSHOTS.length];

  return (
    <div ref={ref} className="flex h-full min-h-0 flex-col rounded-[14px] border border-black/6 bg-white p-2.5 sm:p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[9px] uppercase tracking-[0.14em] text-zinc-400 sm:text-[10px]">Emir defteri</p>
        <span className="text-[9px] text-zinc-400 sm:text-[10px]">USDT</span>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-1 border-b border-black/6 pb-1.5 text-[8px] uppercase tracking-[0.1em] text-zinc-400">
        <span>Fiyat</span>
        <span className="text-right">Miktar</span>
        <span className="text-right">Toplam</span>
      </div>

      <div className="mt-1 flex min-h-0 flex-1 flex-col justify-between gap-0.5 font-mono text-[9px] sm:text-[10px]">
        <div className="space-y-0.5">
          {book.asks.map((row) => (
            <div key={`ask-${row.price}`} className="grid grid-cols-3 gap-1 py-0.5">
              <span className="truncate text-[#c25858]">{row.price}</span>
              <span className="truncate text-right text-zinc-500">{row.amount}</span>
              <span className="truncate text-right text-zinc-400">{row.total}</span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={book.mid}
            initial={reduceMotion ? false : { opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -3 }}
            transition={{ duration: 0.25 }}
            className="border-y border-black/6 bg-[#FCD535]/15 py-1.5 text-center font-heading text-sm text-weecomi-dark-gray sm:text-base"
          >
            {book.mid}
          </motion.p>
        </AnimatePresence>

        <div className="space-y-0.5">
          {book.bids.map((row) => (
            <div key={`bid-${row.price}`} className="grid grid-cols-3 gap-1 py-0.5">
              <span className="truncate text-[#B8860B]">{row.price}</span>
              <span className="truncate text-right text-zinc-500">{row.amount}</span>
              <span className="truncate text-right text-zinc-400">{row.total}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
