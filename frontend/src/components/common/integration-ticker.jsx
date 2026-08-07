import Image from "next/image";
import { cn } from "@/lib/utils";
import { marqueeLogos } from "@/data/marqueeLogos";

function TickerLogo({ item }) {
  return (
    <div className="flex h-16 w-[110px] shrink-0 items-center justify-center px-2 md:h-[4.5rem] md:w-[130px] md:px-3">
      <Image
        src={item.src}
        alt={item.alt || ""}
        width={120}
        height={48}
        className="h-9 w-auto max-w-full object-contain grayscale md:h-11"
      />
    </div>
  );
}

function TickerTrack({ logos, reverse = false }) {
  return (
    <div className="integration-ticker-fade min-w-0 flex-1 overflow-hidden">
      <div className={cn("integration-ticker-track flex w-max items-center", reverse && "integration-ticker-track-reverse")}>
        <div className="flex shrink-0 items-center">
          {logos.map((item, index) => (
            <TickerLogo key={`${item.alt}-${index}`} item={item} />
          ))}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {logos.map((item, index) => (
            <TickerLogo key={`${item.alt}-dup-${index}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * İki yönlü logo ticker: logolar merkeze akar, ortada marka sembolü.
 */
export default function IntegrationTicker({ className, logos = marqueeLogos, centerSrc = "/logo/OrjinalSembol.png", centerAlt = "Weecomi", "aria-label": ariaLabel = "Integration logos" }) {
  if (!logos.length) return null;

  return (
    <section className={cn("overflow-hidden", className)} aria-label={ariaLabel}>
      <div className="w-full overflow-hidden">
        <div className="flex w-full items-center">
          <TickerTrack logos={logos} />

          <div className="relative z-10 flex shrink-0 items-center justify-center px-2 md:px-4">
            <div className="flex size-[5.5rem] items-center justify-center rounded-2xl border border-white/10 bg-white/4 md:size-[7.5rem]">
              <Image src={centerSrc} alt={centerAlt} width={160} height={160} className="size-[3.75rem] object-contain md:size-[5.25rem]" />
            </div>
          </div>

          <TickerTrack logos={logos} reverse />
        </div>
      </div>
    </section>
  );
}
