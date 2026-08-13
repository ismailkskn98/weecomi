import { getTranslations } from "next-intl/server";
import ScrollReveal from "@/components/home/_shared/scroll-reveal";
import BlurText from "@/components/ui/blur-text";
import MissionValues from "./values";
import MissionCta from "./cta";

export default async function Mission() {
  const t = await getTranslations("Corporate");

  return (
    <ScrollReveal
      itemSelector="[data-about-mv]"
      className="relative z-30 rounded-t-[32px] bg-white pt-16 md:rounded-t-[44px] md:pt-24"
    >
      <div className="gridContainer">
        <div data-about-mv className="mx-auto max-w-3xl text-center">
          <p className="font-heading text-sm text-muted-foreground">{t("valuesEyebrow")}</p>
          <h2 className="mt-4 font-heading text-[clamp(1.85rem,4vw,3.25rem)] leading-display text-weecomi-dark-gray">
            <BlurText text={t("missionTitle")} delay={30} stepDuration={0.25} direction="bottom" animateBy="letters" />
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{t("missionText")}</p>
        </div>

        <MissionValues />
        <MissionCta />
      </div>
    </ScrollReveal>
  );
}
