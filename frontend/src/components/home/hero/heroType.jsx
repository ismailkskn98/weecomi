import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import ActionButton from "@/components/common/actionButton";
import { marqueeLogos } from "@/data/marqueeLogos";
import { cn } from "@/lib/utils";
import HeroReveal, { HeroRevealItem } from "./hero-reveal";
import HeroVideo from "./hero-video";
import IntegrationTicker from "@/components/common/integration-ticker";

const FLOATING_LOGOS = [
  { src: "/logos/weemenu.png", alt: "WeeMenu", className: "left-[2%] top-[28%] -rotate-12" },
  { src: "/logos/weecard.png", alt: "WeeCard", className: "right-[3%] top-[8%] rotate-12" },
  { src: "/logos/weesale.png", alt: "WeeSale", className: "left-[8%] top-[6%] -rotate-6" },
  { src: "/logos/weecoins.png", alt: "WeeCoins", className: "right-[5%] top-[33%] -rotate-12" },
];

export default async function HeroType() {
  const locale = await getLocale();
  const t = await getTranslations("Hero");
  const titleLines = t.raw("titleLines");
  const lines = Array.isArray(titleLines) ? titleLines : [t("title")];

  return (
    <HeroReveal className="relative overflow-hidden bg-white section-y-bottom pt-32 md:pt-36">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage: "url(/images/hikari/hero-texture.avif)",
          backgroundSize: "1024px 1024px",
          backgroundPosition: "top center",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(240,159,47,0.08),transparent_55%)]" />

      <div className="relative z-10 mx-auto max-w-[1300px] px-4 md:px-6">
        <div className="relative mx-auto max-w-[1180px]">
          {FLOATING_LOGOS.map((item, index) => (
            <HeroRevealItem
              key={item.alt}
              delay={0.32 + index * 0.09}
              y={0}
              scale
              duration={0.55}
              className={cn("absolute z-20 hidden size-12 items-center justify-center md:flex lg:size-16", item.className)}
            >
              <Image src={item.src} alt={item.alt} width={128} height={128} quality={100} className="h-auto w-full object-contain" />
            </HeroRevealItem>
          ))}

          <div className="flex flex-col items-center text-center">
            <HeroRevealItem delay={0.05} y={32}>
              <div className="inline-flex items-center gap-2.5 rounded-full bg-[#2c2c2c] px-3 py-1.5">
                <span className="text-weecomi-orange" aria-hidden>
                  ★
                </span>
                <span className="font-heading text-[13px] font-normal text-white md:text-sm">{t("eyebrow")}</span>
                <span className="text-weecomi-orange" aria-hidden>
                  ★
                </span>
              </div>
            </HeroRevealItem>

            <HeroRevealItem delay={0.16} y={52} fade={false} duration={0.75}>
              <h1
                className={cn(
                  "relative z-30 mt-8 max-w-[980px] font-display text-[clamp(2.6rem,6.4vw,6rem)] tracking-[-0.03em] text-weecomi-dark-gray",
                  locale === "ru" || locale === "ka" ? "leading-[0.9]" : "leading-display",
                )}
              >
                {lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            </HeroRevealItem>

            <HeroRevealItem delay={0.3} y={44}>
              <p className="mx-auto mt-6 max-w-[760px] text-base leading-relaxed text-muted-foreground md:text-xl">{t("subtitle")}</p>
            </HeroRevealItem>

            <HeroRevealItem delay={0.42} y={44}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                <ActionButton href="/contact" variant="inverse" showArrow>
                  {t("ctaPrimary")}
                </ActionButton>
                <ActionButton href="/ecosystem" variant="secondary" showArrow>
                  {t("ctaSecondary")}
                </ActionButton>
              </div>
            </HeroRevealItem>

            <HeroRevealItem delay={0.52} y={28}>
              <p className="mt-5 font-heading text-xs text-muted-foreground">{t("trustLine")}</p>
            </HeroRevealItem>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-[1180px]">
          <HeroRevealItem delay={0.58} opacityOnly>
            <IntegrationTicker logos={marqueeLogos} />
          </HeroRevealItem>

          <HeroRevealItem delay={0.7} y={64}>
            <HeroVideo playLabel={t("playLabel")} />
          </HeroRevealItem>
        </div>
      </div>
    </HeroReveal>
  );
}
