"use client";

import { AnimatePresence, motion } from "motion/react";
import { CANDLE_DATA, PRICE_PRESETS } from "./criptoswaps-showcase-data";
import { useInViewCycle } from "./use-in-view-cycle";
import { cn } from "@/lib/utils";

const VIEW_W = 320;
const VIEW_H = 140;
const PAD_Y = 10;
const PAD_X = 6;

function CandleSvg({ candles }) {
  const highs = candles.map((c) => c.h);
  const lows = candles.map((c) => c.l);
  const max = Math.max(...highs);
  const min = Math.min(...lows);
  const range = Math.max(max - min, 1);
  const slot = (VIEW_W - PAD_X * 2) / candles.length;
  const bodyW = Math.max(slot * 0.48, 4);

  const y = (price) => PAD_Y + ((max - price) / range) * (VIEW_H - PAD_Y * 2);

  return (
    <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="h-full w-full" preserveAspectRatio="none" aria-hidden>
      {[0.25, 0.5, 0.75].map((ratio) => (
        <line
          key={ratio}
          x1={0}
          x2={VIEW_W}
          y1={PAD_Y + ratio * (VIEW_H - PAD_Y * 2)}
          y2={PAD_Y + ratio * (VIEW_H - PAD_Y * 2)}
          stroke="rgba(13,13,13,0.06)"
          strokeWidth={1}
        />
      ))}
      {candles.map((candle, index) => {
        const up = candle.c >= candle.o;
        const color = up ? "#D4A017" : "#c25858";
        const cx = PAD_X + slot * index + slot / 2;
        const yHigh = y(candle.h);
        const yLow = y(candle.l);
        const yOpen = y(candle.o);
        const yClose = y(candle.c);
        const bodyTop = Math.min(yOpen, yClose);
        const bodyH = Math.max(Math.abs(yClose - yOpen), 1.5);

        return (
          <g key={index}>
            <line x1={cx} x2={cx} y1={yHigh} y2={yLow} stroke={color} strokeWidth={1.25} />
            <rect x={cx - bodyW / 2} y={bodyTop} width={bodyW} height={bodyH} fill={color} rx={0.5} />
          </g>
        );
      })}
    </svg>
  );
}

/** Light spot chart — fills available height */
export default function CriptoSwapsChartLive() {
  const { ref, tick, reduceMotion } = useInViewCycle(4600);
  const preset = PRICE_PRESETS[reduceMotion ? 0 : tick % PRICE_PRESETS.length];

  return (
    <div ref={ref} className="flex min-h-0 min-w-0 flex-col rounded-[14px] border border-black/6 bg-white p-2.5 sm:p-3 md:p-3.5">
      <div className="flex shrink-0 items-start justify-between gap-2 sm:gap-3">
        <div className="min-w-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={preset.price}
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.28 }}
              className="font-heading text-lg leading-none text-weecomi-dark-gray sm:text-xl md:text-2xl lg:text-[1.75rem]"
            >
              {preset.price}
            </motion.p>
          </AnimatePresence>
          <div className="mt-1 flex min-w-0 items-center gap-2">
            <p className="truncate text-[11px] text-zinc-500 sm:text-xs">{preset.pair}</p>
            <span className={cn("shrink-0 text-[10px] font-semibold sm:text-[11px]", preset.positive ? "text-[#B8860B]" : "text-[#c25858]")}>
              {preset.change}
            </span>
          </div>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-black/8 bg-[#f5f7fa] px-2 py-0.5 text-[9px] uppercase tracking-[0.1em] text-zinc-500 sm:px-2.5 sm:py-1 sm:text-[10px]">
          <span className="size-1.5 rounded-full bg-[#FCD535] motion-safe:animate-pulse" />
          Live
        </span>
      </div>

      <div className="mt-2.5 flex min-h-0 flex-1 flex-col rounded-[10px] border border-black/6 bg-[#fbfcfd] p-1.5 sm:mt-3 sm:p-2 md:p-2.5">
        <div className="mb-1.5 flex shrink-0 items-center justify-between gap-2 text-[9px] text-zinc-500 sm:mb-2 sm:text-[10px]">
          <div className="flex min-w-0 items-center gap-1.5 overflow-hidden sm:gap-2">
            <span className="truncate rounded-full bg-white px-2 py-0.5 text-zinc-500 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:px-2.5 sm:py-1">BTCUSDT</span>
            <span className="shrink-0 rounded-full bg-[#FCD535]/35 px-2 py-0.5 text-weecomi-dark-gray sm:px-2.5 sm:py-1">15m</span>
          </div>
          <div className="hidden shrink-0 gap-3 sm:flex">
            <span className="text-[#B8860B]">Vol</span>
            <span>MA</span>
          </div>
        </div>

        <div className="min-h-[128px] flex-1 overflow-hidden rounded-[8px] border border-black/6 bg-white p-1 sm:min-h-[148px] sm:p-1.5 md:min-h-[160px]">
          <CandleSvg candles={CANDLE_DATA} />
        </div>
      </div>
    </div>
  );
}
