import Image from "next/image";
import WeezardPhoneMockup from "./phone-mockup";

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
export default function WeezardMedia() {
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

      <div className="absolute left-4 top-4 z-20 rounded-full border border-black/8 bg-white/75 px-3 py-1 font-heading text-[10px] tracking-[0.14em] text-weecomi-dark-gray/72 backdrop-blur-sm sm:left-5 sm:top-5">
        PLAY
      </div>

      {/* Large phone — top half visible, overflows bottom only */}
      <div className="absolute left-1/2 top-[10%] z-10 w-[22rem] -translate-x-1/2 sm:top-[8%] sm:w-[24rem] md:top-[6%] md:w-[26rem] lg:top-[4%] lg:w-[28rem] xl:w-[30rem]">
        <WeezardPhoneMockup />
      </div>
    </div>
  );
}
