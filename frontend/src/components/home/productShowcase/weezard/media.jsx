import Image from "next/image";

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

/** Right media — phone screenshot (transparent void), clipped mid-frame */
export default function WeezardMedia() {
  return (
    <div className="relative h-full min-h-72 w-full overflow-hidden md:min-h-full">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_55%_35%,rgba(242,140,40,0.18),transparent_70%)]" aria-hidden />

      <div className="absolute left-1/2 top-[2%] w-[min(92%,22rem)] -translate-x-1/2 sm:top-0 sm:w-[min(88%,24rem)] md:left-[54%] md:top-[-2%] md:w-[min(96%,26rem)] md:-translate-x-1/2 lg:w-[28rem]">
        <Image src="/images/products/weezard-phone.webp" alt="WeeZard Game app" width={519} height={1024} className="h-auto w-full" sizes="(max-width: 768px) 80vw, 28rem" priority={false} />
      </div>
    </div>
  );
}
