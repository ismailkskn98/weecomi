/** Static demo data for CriptoSwaps showcase card (shared by live islands). */

export const PRICE_PRESETS = [
  { price: "64.812,40", change: "-0.18%", positive: false, pair: "BTC/USDT · Spot" },
  { price: "64.887,98", change: "-0.20%", positive: false, pair: "BTC/USDT · Spot" },
  { price: "64.921,15", change: "+0.12%", positive: true, pair: "BTC/USDT · Spot" },
];

export const TICKER_PRESETS = [
  { low: "64.210,00", high: "65.420,50", volume: "1.842 BTC", change: "-0.20%" },
  { low: "64.198,40", high: "65.438,20", volume: "1.901 BTC", change: "-0.18%" },
  { low: "64.205,10", high: "65.402,80", volume: "1.876 BTC", change: "+0.12%" },
];

/** OHLC candles for hand-drawn SVG chart */
export const CANDLE_DATA = [
  { o: 64840, h: 64920, l: 64790, c: 64880 },
  { o: 64880, h: 65010, l: 64840, c: 64970 },
  { o: 64970, h: 65040, l: 64890, c: 64920 },
  { o: 64920, h: 64980, l: 64760, c: 64810 },
  { o: 64810, h: 64890, l: 64720, c: 64855 },
  { o: 64855, h: 65020, l: 64820, c: 64990 },
  { o: 64990, h: 65110, l: 64940, c: 65060 },
  { o: 65060, h: 65140, l: 64980, c: 65020 },
  { o: 65020, h: 65080, l: 64870, c: 64910 },
  { o: 64910, h: 64990, l: 64840, c: 64955 },
  { o: 64955, h: 65120, l: 64920, c: 65080 },
  { o: 65080, h: 65180, l: 65010, c: 65140 },
  { o: 65140, h: 65220, l: 65040, c: 65090 },
  { o: 65090, h: 65150, l: 64920, c: 64960 },
  { o: 64960, h: 65040, l: 64880, c: 65010 },
  { o: 65010, h: 65100, l: 64950, c: 65070 },
];

export const ORDERBOOK_SNAPSHOTS = [
  {
    asks: [
      { price: "64.912,40", amount: "0.142", total: "9.217" },
      { price: "64.905,10", amount: "0.286", total: "18.56" },
      { price: "64.898,80", amount: "0.091", total: "5.905" },
      { price: "64.892,20", amount: "0.418", total: "27.12" },
    ],
    mid: "64.887,98",
    bids: [
      { price: "64.881,50", amount: "0.224", total: "14.53" },
      { price: "64.874,00", amount: "0.357", total: "23.16" },
      { price: "64.865,80", amount: "0.168", total: "10.89" },
      { price: "64.858,20", amount: "0.492", total: "31.91" },
    ],
  },
  {
    asks: [
      { price: "64.918,20", amount: "0.118", total: "7.660" },
      { price: "64.909,60", amount: "0.302", total: "19.60" },
      { price: "64.901,40", amount: "0.175", total: "11.35" },
      { price: "64.894,80", amount: "0.401", total: "26.02" },
    ],
    mid: "64.891,20",
    bids: [
      { price: "64.886,10", amount: "0.241", total: "15.63" },
      { price: "64.878,40", amount: "0.329", total: "21.34" },
      { price: "64.870,00", amount: "0.194", total: "12.58" },
      { price: "64.861,50", amount: "0.455", total: "29.51" },
    ],
  },
  {
    asks: [
      { price: "64.928,50", amount: "0.156", total: "10.12" },
      { price: "64.920,10", amount: "0.268", total: "17.39" },
      { price: "64.912,80", amount: "0.102", total: "6.621" },
      { price: "64.905,40", amount: "0.377", total: "24.47" },
    ],
    mid: "64.921,15",
    bids: [
      { price: "64.914,20", amount: "0.213", total: "13.82" },
      { price: "64.906,80", amount: "0.341", total: "22.13" },
      { price: "64.898,00", amount: "0.187", total: "12.13" },
      { price: "64.889,60", amount: "0.468", total: "30.36" },
    ],
  },
];

export const TRADE_SNAPSHOTS = [
  [
    { time: "14:22:08", amount: "0.0241", price: "64.887,98", positive: false },
    { time: "14:22:05", amount: "0.1180", price: "64.891,20", positive: true },
    { time: "14:21:58", amount: "0.0524", price: "64.885,40", positive: false },
  ],
  [
    { time: "14:22:11", amount: "0.0312", price: "64.889,10", positive: true },
    { time: "14:22:08", amount: "0.0241", price: "64.887,98", positive: false },
    { time: "14:22:05", amount: "0.1180", price: "64.891,20", positive: true },
  ],
  [
    { time: "14:22:14", amount: "0.0088", price: "64.892,60", positive: true },
    { time: "14:22:11", amount: "0.0312", price: "64.889,10", positive: true },
    { time: "14:22:08", amount: "0.0241", price: "64.887,98", positive: false },
  ],
];
