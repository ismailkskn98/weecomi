import { getTranslations } from "next-intl/server";
import { BracketTag, ScrollReveal } from "@/components/home/_shared";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import Hero2Video from "./hero2-video";

export default async function IntroVideoBand() {
  const t = await getTranslations("Hero2");

  return (
    <ScrollReveal
      itemSelector="[data-intro-video]"
      className="relative overflow-hidden bg-[#f6f7f8] pb-12 pt-8 md:pb-14 md:pt-10 lg:pb-16 lg:pt-10 xl:pb-20 xl:pt-12 2xl:pb-[var(--sp-6)] 2xl:pt-14"
      aria-label={t("videoTitle")}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 48% 42% at 12% 28%, rgba(111,164,199,0.28), transparent 70%)",
            "radial-gradient(ellipse 34% 30% at 70% 78%, rgba(198,57,39,0.08), transparent 72%)",
          ].join(","),
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05]"
        aria-hidden
        style={{
          backgroundImage: "linear-gradient(rgba(13,13,13,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(13,13,13,0.45) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <TextureOverlay texture="noise" tone="dark" opacity={0.08} className="z-0" />
      <div
        className="pointer-events-none absolute bottom-[8%] right-[6%] z-0 hidden h-36 w-44 opacity-[0.1] md:block lg:h-44 lg:w-52"
        aria-hidden
        style={{
          backgroundImage: "repeating-linear-gradient(-45deg, rgba(13,13,13,0.55) 0 1px, transparent 1px 10px)",
        }}
      />

      <div className="relative z-10 gridContainer">
        <div className="grid items-center gap-8 md:gap-10 lg:grid-cols-12 lg:gap-[clamp(2rem,3vw,4rem)]">
          <div data-intro-video className="order-2 relative lg:order-1 lg:col-span-7">
            <Hero2Video playLabel={t("playLabel")} />
          </div>

          <div data-intro-video className="order-1 flex flex-col gap-4 md:max-w-md lg:order-2 lg:col-span-5 lg:ml-auto lg:max-w-lg lg:items-start lg:gap-[clamp(1rem,1.5vw,1.25rem)] lg:text-left">
            <BracketTag className="text-weecomi-orange">{t("videoEyebrow")}</BracketTag>
            <h2 className="font-heading text-[1.75rem] leading-display tracking-normal text-weecomi-dark-gray md:text-[2.25rem] xl:text-[2.65rem]">{t("videoTitle")}</h2>
            <p className="text-[clamp(0.95rem,0.85rem+0.4vw,1.125rem)] leading-relaxed text-weecomi-dark-gray/70 md:leading-7">{t("videoSubtitle")}</p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
