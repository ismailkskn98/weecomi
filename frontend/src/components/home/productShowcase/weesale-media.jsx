import Image from "next/image";

export function WeesaleBrand() {
  return (
    <div className="flex items-center gap-3">
      <Image src="/logos/weesale.png" alt="WeeSale" width={172} height={34} className="h-7 w-auto md:h-8" />
    </div>
  );
}

export default function WeesaleMedia() {
  return (
    <div className="relative h-full min-h-72 w-full overflow-hidden md:min-h-full">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_68%_54%_at_56%_30%,rgba(240,159,47,0.22),transparent_72%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden style={{ backgroundImage: "linear-gradient(rgba(13,13,13,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(13,13,13,0.35) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

      <div className="absolute left-4 top-4 z-20 rounded-full border border-black/8 bg-white/75 px-3 py-1 font-heading text-[10px] tracking-[0.14em] text-weecomi-dark-gray/72 backdrop-blur-sm sm:left-5 sm:top-5 lg:left-6 lg:top-6">
          MARKETPLACE
      </div>

      <div className="absolute left-[8%] top-[18%] z-10 w-[23rem] sm:left-[10%] sm:top-[16%] sm:w-[29rem] md:left-[14%] md:top-[10%] md:w-[40rem] lg:left-[14%] lg:top-[8%] lg:w-[48rem] xl:left-[12%] xl:w-[52rem]">
        <div className="overflow-hidden rounded-[1.2rem] border border-black/10 bg-white shadow-[0_28px_80px_rgba(13,13,13,0.16)]">
          <Image
            src="/images/weesale.jpg"
            alt="WeeSale marketplace interface"
            width={1024}
            height={750}
            className="h-auto w-full object-cover object-top"
            sizes="(max-width: 768px) 92vw, 52rem"
          />
        </div>
      </div>
    </div>
  );
}
