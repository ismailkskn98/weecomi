import Image from "next/image";
import CriptoSwapsChartLive from "./criptoswaps-chart-live";
import CriptoSwapsOrderbookLive from "./criptoswaps-orderbook-live";

/** Brand row for left content — exchange identity */
export function CriptoSwapsBrand() {
  return (
    <div className="flex items-center gap-2.5">
      <Image src="/logos/criptoswaps.png" alt="" width={40} height={40} className="size-7 rounded-lg object-contain md:size-8" />
      <div className="min-w-0">
        <p className="font-heading text-[11px] font-medium tracking-[0.14em] text-weecomi-dark-gray md:text-xs">CRIPTOSWAPS</p>
        <p className="text-[10px] text-muted-foreground">Markets · Spot · Fan</p>
      </div>
    </div>
  );
}

/** Right media column — light trading + order book */
export default function CriptoSwapsMedia() {
  return (
    <div className="relative h-full w-full overflow-hidden text-weecomi-dark-gray">
      <div className="relative z-20 flex h-full flex-col gap-2 p-3 sm:gap-2.5 sm:p-4 md:p-4 lg:gap-3 lg:p-5">
        <div className="hidden items-center justify-between gap-3 sm:flex">
          <p className="font-heading text-base text-weecomi-dark-gray md:text-lg">Trading desk</p>
          <span className="mr-1 flex size-2 items-center justify-center">
            <span className="size-2 rounded-full bg-[#FCD535] motion-safe:animate-pulse" />
          </span>
        </div>

        <div className="grid min-h-0 flex-1 gap-2 sm:gap-2.5 md:grid-cols-[1.35fr_0.85fr] md:gap-3">
          <CriptoSwapsChartLive />
          <div className="hidden min-h-0 md:block">
            <CriptoSwapsOrderbookLive />
          </div>
        </div>
      </div>
    </div>
  );
}
