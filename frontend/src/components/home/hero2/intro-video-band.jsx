import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "@/components/home/_shared";
import Hero2Video from "./hero2-video";

export default async function IntroVideoBand() {
  const t = await getTranslations("Hero2");

  return (
    <ScrollReveal itemSelector="[data-intro-video]" className="relative overflow-hidden bg-white section-y" aria-label={t("videoTitle")}>
      <div className="gridContainer">
        <div data-intro-video className="mx-auto max-w-3xl text-center">
          <p className="font-heading text-sm text-weecomi-orange">{t("videoEyebrow")}</p>
          <h2 className="mt-3 font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] leading-display text-weecomi-dark-gray">{t("videoTitle")}</h2>
        </div>

        <div data-intro-video className="mx-auto mt-8 w-full max-w-5xl md:mt-10">
          <Hero2Video playLabel={t("playLabel")} />
        </div>
      </div>
    </ScrollReveal>
  );
}
