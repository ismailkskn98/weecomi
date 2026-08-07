import Image from "next/image";
import AnnouncementRibbon from "@/components/animata/container/announcement-ribbon";
import BentoShell from "./bento-shell";

/** Mid tile — WeeCoins & WeeCoins Premium */
export default function WeecoinsCard({ title, description, ribbonItems = [], ribbonBadge }) {
  return (
    <BentoShell className="flex h-full flex-col">
      <div className="flex min-w-0 flex-col p-6 md:p-7">
        <div className="flex items-center gap-2">
          <Image src="/logos/weecoins.png" alt="WeeCoins" width={36} height={36} className="size-8 object-contain md:size-9" />
          <Image src="/logos/weecoins-premium.png" alt="WeeCoins Premium" width={36} height={36} className="size-8 object-contain md:size-9" />
        </div>
        <h3 className="mt-4 font-heading text-xl leading-display text-weecomi-dark-gray md:text-2xl">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <div className="relative mt-auto min-h-28 flex-1 overflow-hidden rounded-b-xl md:min-h-36">
        <Image src="/images/weecoin-cover.avif" alt="WeeCoins & WeeCoins Premium" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        <AnnouncementRibbon
          badge={ribbonBadge}
          ctaText={null}
          ctaHref={null}
          className="absolute inset-x-0 bottom-0 h-9 border-t border-b-0 border-white/10 bg-black"
          badgeClassName="bg-weecomi-dark-gray text-white"
          message={
            <span>
              {ribbonItems.map((item, i) => (
                <span key={i}>
                  <span className="whitespace-nowrap px-8 font-heading text-[11px] font-light text-white/90">{item}</span>
                  <span className="text-white/20">&middot;</span>
                </span>
              ))}
            </span>
          }
        />
      </div>
    </BentoShell>
  );
}
