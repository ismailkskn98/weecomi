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

  return (
    <HeroReveal className="relative overflow-hidden bg-[#f6f7f8] pt-28 section-y-bottom md:pt-32">
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
        className="pointer-events-none absolute right-[4%] top-[48%] z-0 hidden h-48 w-56 opacity-[0.12] md:block lg:right-[8%] lg:h-56 lg:w-72"
        aria-hidden
        style={{
          backgroundImage: "repeating-linear-gradient(-45deg, rgba(13,13,13,0.55) 0 1px, transparent 1px 10px)",
        }}
      />

      <div className="relative z-10 gridContainer">
        <div className="flex flex-col gap-14 md:gap-16 lg:gap-20">
          <div className="flex flex-col gap-12 lg:gap-16">
            <div className="max-w-5xl">
              <HeroRevealItem delay={0.06} y={40} fade={false} duration={0.75}>
                <h1
                  className={cn(
                    "font-heading text-[clamp(2.4rem,6.2vw,5.5rem)] font-normal tracking-[-0.03em] text-weecomi-dark-gray",
                    locale === "ru" || locale === "ka" ? "leading-[1.05]" : "leading-[1.08]",
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
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-weecomi-dark-gray/75 md:text-lg md:leading-7">{t("subtitle")}</p>
              </HeroRevealItem>
            </div>

            {/* Figma asymmetric: secondary copy + CTAs bottom-right */}
            <div className="flex w-full flex-col gap-6 md:ml-auto md:max-w-lg md:items-end md:text-right">
              <HeroRevealItem delay={0.32} y={28}>
                <p className="text-base leading-relaxed text-weecomi-dark-gray/80 md:text-lg md:leading-7">{t("subtitleSecondary")}</p>
              </HeroRevealItem>

              <HeroRevealItem delay={0.4} y={24} className="flex flex-wrap items-center gap-5 md:justify-end">
                <ActionButton href="/contact" variant="primary" showArrow>
                  {t("ctaPrimary")}
                </ActionButton>
                <Link
                  href="/ecosystem"
                  className="font-heading text-sm font-normal text-weecomi-dark-gray underline decoration-weecomi-dark-gray/35 underline-offset-4 transition hover:decoration-weecomi-orange hover:text-weecomi-orange md:text-base"
                >
                  {t("ctaSecondary")}
                </Link>
              </HeroRevealItem>
            </div>
          </div>

          <HeroRevealItem delay={0.5} opacityOnly className="border-t border-black/[0.06] pt-10 md:pt-12">
            <p className="text-center font-heading text-lg text-weecomi-dark-gray md:text-xl">{t("clientsLabel")}</p>
            <LogoLoop logos={marqueeLogos} pauseOnHover grayscale={false} itemClassName="px-10 md:px-14" className="mt-8" aria-label={t("clientsLabel")} />
          </HeroRevealItem>
        </div>
      </div>
    </HeroReveal>
  );
}
