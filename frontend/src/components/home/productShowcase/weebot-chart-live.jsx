"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { AnimatePresence, motion } from "motion/react";
import { ChartContainer } from "@/components/ui/chart";
import { PRICE_PRESETS, CHART_DATA } from "./weebot-showcase-data";
import { useInViewCycle } from "./use-in-view-cycle";

const chartConfig = {
  price: {
    label: "Price",
    color: "#16a34a",
  },
  ema: {
    label: "EMA 50",
    color: "#94a3b8",
  },
};

/** Trading chart panel — shadcn Chart (Recharts) + slow price rotate */
export default function WeebotChartLive() {
  const { ref, tick, reduceMotion } = useInViewCycle(4800);
  const preset = PRICE_PRESETS[reduceMotion ? 0 : tick % PRICE_PRESETS.length];

  return (
    <div ref={ref} className="min-w-0 rounded-[14px] border border-black/6 bg-white p-2.5 sm:p-3 md:p-3.5">
      <div className="flex items-start justify-between gap-2 sm:gap-3">
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
          <p className="mt-1 truncate text-[11px] text-zinc-500 sm:text-xs">{preset.pair}</p>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-black/8 bg-[#f5f7fa] px-2 py-0.5 text-[9px] uppercase tracking-[0.1em] text-zinc-500 sm:px-2.5 sm:py-1 sm:text-[10px]">
          <span className="size-1.5 rounded-full bg-[#118a58] motion-safe:animate-pulse" />
          Live
        </span>
      </div>

      <div className="mt-2.5 min-w-0 rounded-[10px] border border-black/6 bg-[#fbfcfd] p-1.5 sm:mt-3 sm:p-2 md:p-2.5">
        <div className="mb-1.5 flex items-center justify-between gap-2 text-[9px] text-zinc-500 sm:mb-2 sm:text-[10px]">
          <div className="flex min-w-0 items-center gap-1.5 overflow-hidden sm:gap-2">
            <span className="truncate rounded-full bg-white px-2 py-0.5 text-zinc-500 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:px-2.5 sm:py-1">BTCUSDT</span>
            <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-zinc-500 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:px-2.5 sm:py-1">15m</span>
          </div>
          <div className="hidden shrink-0 gap-3 sm:flex">
            <span>EMA 21</span>
            <span>EMA 50</span>
          </div>
        </div>

        <div className="min-w-0 overflow-hidden rounded-[8px] border border-black/6 bg-white p-1 sm:p-1.5">
          <ChartContainer config={chartConfig} className="aspect-auto h-[128px] w-full sm:h-[148px] md:h-[160px]">
            <AreaChart accessibilityLayer data={CHART_DATA} margin={{ top: 8, right: 6, left: 2, bottom: 0 }}>
              <defs>
                <linearGradient id="weebotPriceFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-price)" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="var(--color-price)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={6}
                minTickGap={28}
                tick={{ fontSize: 10 }}
              />
              {/* Zoom into price range — default [0,max] flattens ~62k values */}
              <YAxis hide domain={["dataMin - 80", "dataMax + 80"]} />
              <Area
                type="monotone"
                dataKey="ema"
                stroke="var(--color-ema)"
                strokeWidth={1.25}
                strokeDasharray="6 6"
                fill="transparent"
                isAnimationActive={!reduceMotion}
                animationDuration={900}
                dot={false}
                activeDot={false}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="var(--color-price)"
                strokeWidth={2.2}
                fill="url(#weebotPriceFill)"
                isAnimationActive={!reduceMotion}
                animationDuration={1100}
                dot={false}
                activeDot={false}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}
