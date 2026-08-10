import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ActionButton from "@/components/common/actionButton";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { marqueeLogos } from "@/data/marqueeLogos";
import { cn } from "@/lib/utils";
import HeroReveal, { HeroRevealItem } from "@/components/home/hero/hero-reveal";
import Hero2Video from "./hero2-video";

const CLIENT_LOGOS = marqueeLogos.slice(0, 6);

export default async function Hero2() {
  const locale = await getLocale();
  const t = await getTranslations("Hero2");
  const titleLines = t.raw("titleLines");
  const lines = Array.isArray(titleLines) ? titleLines : [t("title")];

  return (
    <HeroReveal className="relative overflow-hidden bg-[#f6f7f8] pt-28 section-y-bottom md:pt-32">
      {/* Soft mesh blobs — Figma atmospheric center, brand-tinted */}
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
          backgroundImage:
            "linear-gradient(rgba(13,13,13,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(13,13,13,0.35) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <TextureOverlay texture="noise" tone="dark" opacity={0.035} className="z-0" />

      {/* Diagonal hatch — Figma right-side technical accent */}
      <div
        className="pointer-events-none absolute right-[4%] top-[42%] z-0 hidden h-48 w-56 opacity-[0.12] md:block lg:right-[8%] lg:h-56 lg:w-72"
        aria-hidden
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, rgba(13,13,13,0.55) 0 1px, transparent 1px 10px)",
        }}
      />

      <div className="relative z-10 gridContainer">
        <div className="flex flex-col gap-12 md:gap-16 lg:gap-20">
          {/* Title + primary subtitle — left aligned (corporate, not centered SaaS) */}
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
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-weecomi-dark-gray/75 md:text-lg md:leading-7">
                {t("subtitle")}
              </p>
            </HeroRevealItem>
          </div>

          {/* Video + secondary copy / CTAs — asymmetric weave */}
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
            <HeroRevealItem delay={0.32} y={48} className="lg:col-span-7">
              <Hero2Video playLabel={t("playLabel")} />
            </HeroRevealItem>

            <div className="flex flex-col gap-6 lg:col-span-5 lg:pb-2">
              <HeroRevealItem delay={0.4} y={28}>
                <p className="max-w-md text-base leading-relaxed text-weecomi-dark-gray/80 md:text-lg md:leading-7 lg:ml-auto lg:text-right">
                  {t("subtitleSecondary")}
                </p>
              </HeroRevealItem>

              <HeroRevealItem delay={0.48} y={24} className="flex flex-wrap items-center gap-5 lg:justify-end">
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

          {/* Product logo strip */}
          <HeroRevealItem delay={0.58} opacityOnly className="border-t border-black/[0.06] pt-10 md:pt-12">
            <p className="text-center font-heading text-lg text-weecomi-dark-gray md:text-xl">{t("clientsLabel")}</p>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-12 lg:justify-between lg:gap-x-4">
              {CLIENT_LOGOS.map((logo) => (
                <li key={logo.alt} className="flex h-10 w-[7.5rem] items-center justify-center md:h-12 md:w-[8.5rem]">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={140}
                    height={48}
                    className="h-8 w-auto max-w-full object-contain opacity-70 grayscale md:h-9"
                  />
                </li>
              ))}
            </ul>
          </HeroRevealItem>
        </div>
      </div>
    </HeroReveal>
  );
}
