import Image from "next/image";
import ActionButton from "@/components/common/actionButton";
import BentoShell from "./bento-shell";
import { TextureOverlay } from "@/components/ui/texture-overlay";

/** Wide bottom CTA tile — WeeKobi */
export default function WeekobiCard({ product, title, description, href, detailLabel, siteLabel }) {
  return (
    <BentoShell className="relative flex h-full overflow-hidden px-6 py-8 md:px-8 md:py-10">
      <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(290deg,var(--color-weecomi-red)_0%,transparent_55%)]" />
      <TextureOverlay
        texture="grid"
        tone="light"
        opacity={0.18}
        className="z-10 bg-size-[64px_64px] mask-[linear-gradient(to_left,black_80%,transparent)]
    [-webkit-mask-image:linear-gradient(to_left,black_80%,transparent)] w-1/2 inset-y-0 right-0 left-auto bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <Image src="/logos/weekobi-icon.png" alt="" width={34} height={34} className="size-8 shrink-0 object-contain md:size-9" />
            <p className="font-heading text-xs uppercase tracking-[0.16em] text-muted-foreground">{product.nameCaps}</p>
          </div>
          <h3 className="mt-5 max-w-md font-heading text-2xl leading-display text-weecomi-dark-gray md:text-3xl">{title}</h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">{description}</p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <ActionButton href={href} variant="red" showArrow>
            {detailLabel}
          </ActionButton>
          <ActionButton href={product.url} variant="ghost" external showArrow>
            {siteLabel}
          </ActionButton>
        </div>
      </div>
      <div className="relative min-h-55 w-[38%] shrink-0">
        <Image src="/images/weecard-mockup-3.png" alt={product.name} fill className="relative z-20 object-contain object-center scale-110" sizes="(max-width: 768px) 38vw, 38vw" />
      </div>
    </BentoShell>
  );
}
