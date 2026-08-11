import Image from "next/image";
import CriptoSwapsChartLive from "./chart-live";
import CriptoSwapsOrderbookLive from "./orderbook-live";
import ShowcaseMediaHeading from "../media-heading";
import { showcaseMediaPadClassName, showcaseMediaStackClassName } from "../shared";

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

/** Right media column — stacked chart + order book */
export default function CriptoSwapsMedia({ title }) {
  return (
    <div className="relative h-full w-full overflow-hidden text-weecomi-dark-gray">
      <div className={`relative z-20 flex h-full flex-col ${showcaseMediaStackClassName} ${showcaseMediaPadClassName}`}>
        {title ? <ShowcaseMediaHeading className="hidden shrink-0 sm:block">{title}</ShowcaseMediaHeading> : null}

        <div className={`grid min-h-0 flex-1 ${showcaseMediaStackClassName}`}>
          <CriptoSwapsChartLive />
          <div className="hidden md:block">
            <CriptoSwapsOrderbookLive />
          </div>
        </div>
      </div>
    </div>
  );
}
