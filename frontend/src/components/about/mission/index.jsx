import { getTranslations } from "next-intl/server";
import { BracketTag } from "@/components/home/_shared";
import ScrollReveal from "@/components/home/_shared/scroll-reveal";
import BlurText from "@/components/ui/blur-text";
import TextScrollReveal from "@/components/ui/text-scroll-reveal";
import MissionValues from "./values";

export default async function Mission() {
  const t = await getTranslations("Corporate");

  return (
    <ScrollReveal
      itemSelector="[data-about-mv]"
      className="relative z-30 rounded-t-[32px] bg-white pt-16 pb-20 md:rounded-t-[44px] md:pt-24 md:pb-28"
    >
      <div className="gridContainer">
        <div data-about-mv className="max-w-3xl text-left">
          <BracketTag>{t("valuesEyebrow")}</BracketTag>
          <h2 className="mt-6 font-heading text-3xl leading-display text-weecomi-dark-gray text-balance md:text-5xl lg:text-[62px]">
            <BlurText text={t("missionTitle")} delay={30} stepDuration={0.25} direction="bottom" animateBy="letters" />
          </h2>
        </div>

        <div data-about-mv className="mt-5 max-w-2xl text-left md:mt-6">
          <TextScrollReveal
            scrub={1}
            baseOpacity={0.18}
            blurStrength={0}
            baseRotation={0}
            textClassName="text-base font-normal leading-relaxed text-muted-foreground md:text-lg"
          >
            {t("missionText")}
          </TextScrollReveal>
        </div>

        <MissionValues />
      </div>
    </ScrollReveal>
  );
}
