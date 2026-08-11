import Image from "next/image";
import WeebotChartLive from "./chart-live";
import WeebotSummaryLive from "./summary-live";

/** Brand row for left content — product identity */
export function WeebotBrand() {
  return (
    <div className="flex items-center gap-2.5">
      <Image src="/logos/weebot.png" alt="" width={40} height={40} className="size-7 rounded-lg object-contain md:size-8" />
      <div className="min-w-0">
        <p className="font-heading text-[11px] font-medium tracking-[0.14em] text-weecomi-dark-gray md:text-xs">WEECOMI BOT</p>
        <p className="text-[10px] text-muted-foreground">AI · Paper · Live</p>
      </div>
    </div>
  );
}

/** Right media column — compact trading + summary islands */
export default function WeebotMedia() {
  return (
    <div className="relative h-full w-full overflow-hidden text-weecomi-dark-gray">
      <div className="relative z-20 flex h-full flex-col gap-2 p-3 sm:gap-2.5 sm:p-4 md:p-4 lg:gap-3 lg:p-5">
        <div className="hidden items-center justify-between gap-3 sm:flex">
          <p className="font-heading text-base text-weecomi-dark-gray md:text-lg">Trading panel</p>
          <span className="mr-1 flex size-2 items-center justify-center">
            <span className="size-2 rounded-full bg-[#118a58] motion-safe:animate-pulse" />
          </span>
        </div>

        <div className="grid flex-1 gap-2 sm:gap-2.5 md:gap-3">
          <WeebotChartLive />
          {/* Summary only when side-by-side — stacked mobile is too tall */}
          <div className="hidden md:block">
            <WeebotSummaryLive />
          </div>
        </div>
      </div>
    </div>
  );
}
