import Image from "next/image";
import WeezardPhoneMockup from "./phone-mockup";
import ShowcaseMediaHeading from "../media-heading";
import { showcaseMediaPadClassName, showcaseMediaStackClassName } from "../shared";

/** Brand row for left content — WeeZard identity */
export function WeezardBrand() {
  return (
    <div className="flex items-center gap-2.5">
      <Image src="/logos/weezard.webp" alt="" width={40} height={40} className="size-7 rounded-lg object-contain md:size-8" />
      <div className="min-w-0">
        <p className="font-heading text-[11px] font-medium tracking-[0.14em] text-weecomi-dark-gray md:text-xs">WEEZARD</p>
        <p className="text-[10px] text-muted-foreground">Play · Earn · WCP</p>
      </div>
    </div>
  );
}

/** Right media — light phone rises from bottom (centered, clipped mid-frame) */
export default function WeezardMedia({ title }) {
  return (
    <div className="relative h-full min-h-72 w-full overflow-hidden md:min-h-full">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_68%_54%_at_50%_42%,rgba(242,140,40,0.22),transparent_72%)]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        aria-hidden
        style={{
          backgroundImage: "linear-gradient(rgba(13,13,13,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(13,13,13,0.35) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className={`relative z-20 flex h-full flex-col ${showcaseMediaStackClassName} ${showcaseMediaPadClassName}`}>
        {title ? <ShowcaseMediaHeading className="relative z-20 hidden shrink-0 sm:block">{title}</ShowcaseMediaHeading> : null}

        <div className="relative min-h-0 flex-1">
          <div className="absolute left-1/2 top-0 z-10 w-[min(78%,17rem)] -translate-x-1/2 sm:w-[19rem] md:w-[21rem] lg:w-[23rem] xl:w-[24rem] 2xl:w-[25rem]">
            <WeezardPhoneMockup />
          </div>
        </div>
      </div>
    </div>
  );
}
