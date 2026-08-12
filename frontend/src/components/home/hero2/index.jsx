import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ActionButton from "@/components/common/actionButton";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import LogoLoop from "@/components/ui/logo-loop";
import { marqueeLogos } from "@/data/marqueeLogos";
import { cn } from "@/lib/utils";
import HeroReveal, { HeroRevealItem } from "@/components/home/hero/hero-reveal";

/**
 * Hero rhythm is slightly tighter below 2xl so the product logos stay
 * inside the first viewport on laptop / xl screens.
 */
export default async function Hero2() {
  const locale = await getLocale();
  const t = await getTranslations("Hero2");
  const titleLines = t.raw("titleLines");
  const lines = Array.isArray(titleLines) ? titleLines : [t("title")];
  const isDenseLocale = locale === "ru" || locale === "ka";

  return (
    <HeroReveal
      mask={false}
      className="relative flex flex-col overflow-x-hidden bg-[#f6f7f8] pb-6 pt-28 md:pb-7 md:pt-32 lg:min-h-[100svh] lg:pb-6 lg:pt-[7.25rem] xl:pb-7 xl:pt-[7.75rem] 2xl:pb-8 2xl:pt-[var(--sp-8)]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 42% 38% at 38% 42%, rgba(111,164,199,0.50), transparent 70%)",
            "radial-gradient(ellipse 36% 34% at 52% 48%, rgba(240,159,47,0.30), transparent 68%)",
            "radial-gradient(ellipse 30% 28% at 64% 40%, rgba(198,57,39,0.20), transparent 70%)",
            "radial-gradient(ellipse 50% 40% at 48% 55%, rgba(52,108,146,0.15), transparent 72%)",
          ].join(","),
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage: "linear-gradient(rgba(13,13,13,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(13,13,13,0.35) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <TextureOverlay texture="noise" tone="dark" opacity={0.05} className="z-0" />

      <div
        className="pointer-events-none absolute right-[4%] top-[46%] z-0 hidden h-36 w-44 opacity-[0.12] lg:block lg:right-[6%] lg:h-48 lg:w-56 xl:h-52 xl:w-64"
        aria-hidden
        style={{
          backgroundImage: "repeating-linear-gradient(-45deg, rgba(13,13,13,0.55) 0 1px, transparent 1px 10px)",
        }}
      />

      <div className="relative z-20 gridContainer w-full flex-1">
        <div className="flex h-full min-h-0 w-full flex-col justify-between gap-8 md:gap-10 lg:gap-[clamp(1.25rem,2.5vh,2.5rem)] 2xl:gap-[var(--sp-5)]">
          <div className="flex flex-col gap-8 md:gap-10 lg:gap-[clamp(1.25rem,2.6vh,2.75rem)] 2xl:gap-[var(--sp-5)]">
            <div className="w-full max-w-[min(100%,74rem)]">
              <HeroRevealItem delay={0.06} y={40} fade={false} duration={0.75}>
                <h1
                  className={cn(
                    "font-heading font-normal tracking-normal text-weecomi-dark-gray",
                    isDenseLocale
                      ? "text-[2.25rem] leading-[1.16] md:text-[3.75rem] lg:text-[4rem] xl:text-[5rem] 2xl:text-[6.75rem] 2xl:leading-[1.2]"
                      : "text-[2.5rem] leading-[1.14] md:text-[4rem] lg:text-[4.5rem] xl:text-[5.875rem] xl:leading-[1.16] 2xl:text-[7.5rem] 2xl:leading-[1.2]",
                  )}
                >
                  {lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h1>
              </HeroRevealItem>

              <HeroRevealItem delay={0.2} y={28}>
                <p className="mt-5 max-w-3xl text-base leading-relaxed text-weecomi-dark-gray/75 md:mt-6 md:text-lg md:leading-7 lg:mt-5">{t("subtitle")}</p>
              </HeroRevealItem>
            </div>

            <div className="flex w-full flex-col gap-5 md:ml-auto md:max-w-lg md:items-end md:text-right lg:gap-5 xl:max-w-[34rem] 2xl:gap-[var(--sp-3)]">
              <HeroRevealItem delay={0.32} y={28}>
                <p className="text-base leading-relaxed text-weecomi-dark-gray/80 md:text-lg md:leading-7">{t("subtitleSecondary")}</p>
              </HeroRevealItem>

              <HeroRevealItem delay={0.4} y={24} className="flex flex-wrap items-center gap-4 md:justify-end md:gap-5">
                <ActionButton href="/ecosystem" variant="primary" size="md" showArrow className="min-h-11 px-4 py-2.5 text-[13px] md:px-5 md:py-3 md:text-sm">
                  {t("ctaPrimary")}
                </ActionButton>
                <Link
                  href="/about"
                  className="font-heading text-sm font-normal text-weecomi-dark-gray underline decoration-weecomi-dark-gray/35 underline-offset-4 transition hover:decoration-weecomi-orange hover:text-weecomi-orange md:text-base"
                >
                  {t("ctaSecondary")}
                </Link>
              </HeroRevealItem>
            </div>
          </div>

          <HeroRevealItem delay={0.5} opacityOnly className="shrink-0">
            <div className="flex flex-col gap-4 md:gap-5 lg:gap-4 2xl:gap-[var(--sp-3)]">
              <p className="mx-auto max-w-3xl text-center font-heading text-sm leading-snug text-weecomi-dark-gray md:text-base">{t("clientsLabel")}</p>
              <LogoLoop
                logos={marqueeLogos}
                pauseOnHover
                grayscale={false}
                itemClassName="px-5 md:px-6 lg:px-[clamp(1.15rem,1.55vw,2rem)] 2xl:px-8"
                imageClassName="h-7 max-w-[110px] md:h-8 md:max-w-[130px] lg:h-[clamp(2rem,2.1vw,2.5rem)] lg:max-w-[clamp(7rem,9vw,9.5rem)] 2xl:h-9 2xl:max-w-[140px]"
                className="min-h-10 py-1 md:min-h-12 lg:min-h-11 2xl:min-h-12"
                aria-label={t("clientsLabel")}
              />
            </div>
          </HeroRevealItem>
        </div>
      </div>
    </HeroReveal>
  );
}
