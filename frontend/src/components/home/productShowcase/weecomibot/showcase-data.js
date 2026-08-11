/** Static demo data for Weecomi Bot showcase card (shared by live islands). */

export const TERMINAL_SNAPSHOTS = [
  [
    { symbol: "BTC/USDT", side: "LONG", pnl: "+$42.80", pct: "+1.23%", status: "Open", positive: true },
    { symbol: "ETH/USDT", side: "SHORT", pnl: "+$18.40", pct: "+0.87%", status: "TP Target", positive: true },
    { symbol: "SOL/USDT", side: "LONG", pnl: "-$8.10", pct: "-0.41%", status: "Trailing", positive: false },
  ],
  [
    { symbol: "BTC/USDT", side: "LONG", pnl: "+$47.20", pct: "+1.36%", status: "Trailing", positive: true },
    { symbol: "ETH/USDT", side: "SHORT", pnl: "+$18.40", pct: "+0.87%", status: "TP Target", positive: true },
    { symbol: "SOL/USDT", side: "LONG", pnl: "-$8.10", pct: "-0.41%", status: "Trailing", positive: false },
  ],
  [
    { symbol: "BTC/USDT", side: "LONG", pnl: "+$47.20", pct: "+1.36%", status: "Trailing", positive: true },
    { symbol: "ETH/USDT", side: "SHORT", pnl: "+$21.05", pct: "+0.99%", status: "Open", positive: true },
    { symbol: "SOL/USDT", side: "LONG", pnl: "-$8.10", pct: "-0.41%", status: "Trailing", positive: false },
  ],
  [
    { symbol: "BTC/USDT", side: "LONG", pnl: "+$47.20", pct: "+1.36%", status: "Trailing", positive: true },
    { symbol: "ETH/USDT", side: "SHORT", pnl: "+$21.05", pct: "+0.99%", status: "Open", positive: true },
    { symbol: "SOL/USDT", side: "LONG", pnl: "-$5.40", pct: "-0.27%", status: "Open", positive: false },
  ],
];

export const DAILY_PNL = ["+$53.10", "+$58.45", "+$61.20", "+$55.90"];

export const PRICE_PRESETS = [
  { price: "62.812,20", pair: "BTCUSDT · 15m" },
  { price: "62.845,10", pair: "BTCUSDT · 15m" },
  { price: "62.791,55", pair: "BTCUSDT · 15m" },
];

/** Recharts series for trading panel (shadcn Chart) — wavy live look */
export const CHART_DATA = [
  { time: "08:00", price: 62480, ema: 62640 },
  { time: "09:00", price: 62620, ema: 62635 },
  { time: "10:00", price: 62510, ema: 62620 },
  { time: "11:00", price: 62780, ema: 62640 },
  { time: "12:00", price: 62940, ema: 62690 },
  { time: "13:00", price: 62820, ema: 62730 },
  { time: "14:00", price: 62650, ema: 62740 },
  { time: "15:00", price: 63020, ema: 62780 },
  { time: "16:00", price: 63180, ema: 62840 },
  { time: "17:00", price: 62960, ema: 62890 },
  { time: "18:00", price: 63240, ema: 62940 },
  { time: "19:00", price: 63080, ema: 62980 },
  { time: "20:00", price: 63310, ema: 63030 },
  { time: "21:00", price: 63420, ema: 63090 },
];

export const SUMMARY_PRESETS = [
  [
    { label: "Win rate", value: "68.4%", tone: "text-[#118a58]" },
    { label: "Risk cap", value: "1.8R", tone: "text-weecomi-dark-gray" },
  ],
  [
    { label: "Win rate", value: "69.1%", tone: "text-[#118a58]" },
    { label: "Risk cap", value: "1.8R", tone: "text-weecomi-dark-gray" },
  ],
  [
    { label: "Win rate", value: "69.1%", tone: "text-[#118a58]" },
    { label: "Risk cap", value: "1.6R", tone: "text-weecomi-dark-gray" },
  ],
];

export const STRATEGY_SNAPSHOTS = [
  [
    { name: "EMA Breakout", market: "BTC / 15m", pnl: "+2.14%", positive: true },
    { name: "Range Reclaim", market: "ETH / 1h", pnl: "+0.82%", positive: true },
    { name: "Trend Shield", market: "SOL / 30m", pnl: "-0.34%", positive: false },
  ],
  [
    { name: "EMA Breakout", market: "BTC / 15m", pnl: "+2.31%", positive: true },
    { name: "Range Reclaim", market: "ETH / 1h", pnl: "+0.82%", positive: true },
    { name: "Trend Shield", market: "SOL / 30m", pnl: "-0.34%", positive: false },
  ],
  [
    { name: "EMA Breakout", market: "BTC / 15m", pnl: "+2.31%", positive: true },
    { name: "Range Reclaim", market: "ETH / 1h", pnl: "+0.95%", positive: true },
    { name: "Trend Shield", market: "SOL / 30m", pnl: "-0.34%", positive: false },
  ],
  [
    { name: "EMA Breakout", market: "BTC / 15m", pnl: "+2.31%", positive: true },
    { name: "Range Reclaim", market: "ETH / 1h", pnl: "+0.95%", positive: true },
    { name: "Trend Shield", market: "SOL / 30m", pnl: "-0.18%", positive: false },
  ],
];

