import { getTranslations } from "next-intl/server";
import { SectionHeader, ScrollReveal } from "@/components/home/_shared";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import Hero2Video from "./hero2-video";

export default async function IntroVideoBand() {
  const t = await getTranslations("Hero2");

  return (
    <ScrollReveal
      itemSelector="[data-intro-video]"
      className="relative overflow-hidden bg-[#f6f7f8] pt-8 section-y-bottom md:pt-10"
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
        <div className="grid items-center gap-8 md:gap-10 lg:grid-cols-12 lg:gap-12">
          <div data-intro-video className="order-2 relative lg:order-1 lg:col-span-7">
            <Hero2Video playLabel={t("playLabel")} />
          </div>

          <div className="order-1 md:max-w-md lg:order-2 lg:col-span-5 lg:ml-auto lg:max-w-lg lg:text-left">
            <SectionHeader
              size="compact"
              className="max-w-none"
              eyebrow={t("videoEyebrow")}
              title={t("videoTitle")}
              subtitle={t("videoSubtitle")}
            />
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
