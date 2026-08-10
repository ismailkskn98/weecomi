import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ActionButton from "@/components/common/actionButton";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import LogoLoop from "@/components/ui/logo-loop";
import { marqueeLogos } from "@/data/marqueeLogos";
import { cn } from "@/lib/utils";
import HeroReveal, { HeroRevealItem } from "@/components/home/hero/hero-reveal";

export default async function Hero2() {
  const locale = await getLocale();
  const t = await getTranslations("Hero2");
  const titleLines = t.raw("titleLines");
  const lines = Array.isArray(titleLines) ? titleLines : [t("title")];
  const isDenseLocale = locale === "ru" || locale === "ka";

  return (
    <HeroReveal className="relative overflow-x-hidden bg-[#f6f7f8] pt-28 pb-10 md:pt-32 md:pb-12 lg:flex lg:min-h-[100svh] lg:flex-col lg:pt-[clamp(6.75rem,7.5vw,8.5rem)] lg:pb-[clamp(1.75rem,2.5vw,3rem)]">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 42% 38% at 38% 42%, rgba(111,164,199,0.45), transparent 70%)",
            "radial-gradient(ellipse 36% 34% at 52% 48%, rgba(240,159,47,0.28), transparent 68%)",
            "radial-gradient(ellipse 30% 28% at 64% 40%, rgba(198,57,39,0.14), transparent 70%)",
            "radial-gradient(ellipse 50% 40% at 48% 55%, rgba(52,108,146,0.12), transparent 72%)",
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
        className="pointer-events-none absolute right-[4%] top-[46%] z-0 hidden h-36 w-44 opacity-[0.12] lg:block lg:right-[6%] lg:h-[clamp(9rem,11vw,13rem)] lg:w-[clamp(11rem,13vw,16rem)]"
        aria-hidden
        style={{
          backgroundImage: "repeating-linear-gradient(-45deg, rgba(13,13,13,0.55) 0 1px, transparent 1px 10px)",
        }}
      />

      <div className="relative z-10 gridContainer w-full flex-1">
        <div className="w-full flex flex-col justify-between gap-10 md:gap-12 lg:gap-[clamp(1.75rem,3.5vh,3.25rem)]">
          <div className="flex flex-col gap-8 md:gap-10 lg:gap-[clamp(1.5rem,3vh,2.75rem)]">
            <div className="w-full max-w-[min(100%,68rem)] 2xl:max-w-[72rem]">
              <HeroRevealItem delay={0.06} y={40} fade={false} duration={0.75}>
                <h1
                  className={cn(
                    "font-heading font-normal tracking-[-0.03em] text-weecomi-dark-gray",
                    isDenseLocale
                      ? "text-[clamp(1.75rem,1rem+2.6vw,3.75rem)] leading-[1.08] lg:text-[clamp(2.35rem,1.1rem+2.35vw,3.85rem)]"
                      : "text-[clamp(1.9rem,1.05rem+2.9vw,4.35rem)] leading-[1.08] lg:text-[clamp(2.6rem,1.15rem+2.55vw,4.5rem)]",
                  )}
                >
                  {lines.map((line) => (
                    <span key={line} className="block text-balance">
                      {line}
                    </span>
                  ))}
                </h1>
              </HeroRevealItem>

              <HeroRevealItem delay={0.2} y={28}>
                <p className="mt-4 max-w-3xl text-[clamp(0.95rem,0.88rem+0.28vw,1.125rem)] leading-relaxed text-weecomi-dark-gray/75 md:mt-5 lg:mt-[clamp(1rem,1.4vw,1.5rem)] md:leading-7">
                  {t("subtitle")}
                </p>
              </HeroRevealItem>
            </div>

            <div className="flex w-full flex-col gap-4 md:ml-auto md:max-w-md md:items-end md:gap-5 md:text-right lg:max-w-[min(100%,26rem)] xl:max-w-[28rem]">
              <HeroRevealItem delay={0.32} y={28}>
                <p className="text-[clamp(0.95rem,0.88rem+0.28vw,1.125rem)] leading-relaxed text-weecomi-dark-gray/80 md:leading-7">{t("subtitleSecondary")}</p>
              </HeroRevealItem>

              <HeroRevealItem delay={0.4} y={24} className="flex flex-wrap items-center gap-3.5 md:justify-end md:gap-4 xl:gap-5">
                <ActionButton href="/ecosystem" variant="primary" showArrow className="text-[13px] lg:text-[clamp(0.8125rem,0.7rem+0.2vw,0.9375rem)]">
                  {t("ctaPrimary")}
                </ActionButton>
                <Link
                  href="/about"
                  className="font-heading text-[clamp(0.8125rem,0.72rem+0.22vw,1rem)] font-normal text-weecomi-dark-gray underline decoration-weecomi-dark-gray/35 underline-offset-4 transition hover:decoration-weecomi-orange hover:text-weecomi-orange"
                >
                  {t("ctaSecondary")}
                </Link>
              </HeroRevealItem>
            </div>
          </div>

          <HeroRevealItem delay={0.5} opacityOnly className="shrink-0 pt-2 lg:pt-0">
            <p className="mx-auto max-w-3xl text-center font-heading text-[clamp(0.95rem,0.82rem+0.45vw,1.25rem)] leading-snug text-weecomi-dark-gray">{t("clientsLabel")}</p>
            <LogoLoop
              logos={marqueeLogos}
              pauseOnHover
              grayscale={false}
              itemClassName="px-5 md:px-6 lg:px-[clamp(1.25rem,1.6vw,2.25rem)] xl:px-8 2xl:px-9"
              imageClassName="h-8 max-w-[110px] md:h-9 md:max-w-[130px] lg:h-[clamp(2rem,2.2vw,2.75rem)] lg:max-w-[clamp(7rem,9vw,10rem)]"
              className="mt-4 min-h-12 py-1.5 md:mt-5 md:min-h-14 md:py-2 lg:mt-[clamp(1rem,1.5vw,1.5rem)]"
              aria-label={t("clientsLabel")}
            />
          </HeroRevealItem>
        </div>
      </div>
    </HeroReveal>
  );
}
