import { getTranslations } from "next-intl/server";
import ScrollReveal from "@/components/home/_shared/scroll-reveal";
import BlurText from "@/components/ui/blur-text";

export default async function Story() {
  const t = await getTranslations("Corporate");

  return (
    <section className="section-y">
      <div className="gridContainer">
        <ScrollReveal itemSelector="[data-about-story]" as="div" className="mx-auto max-w-3xl text-center">
          <p data-about-story className="font-heading text-sm text-weecomi-orange">
            {t("storyEyebrow")}
          </p>
          <h2 data-about-story className="mt-4 font-heading text-[clamp(1.85rem,4vw,3.25rem)] leading-display text-weecomi-dark-gray">
            <BlurText text={t("storyTitle")} delay={30} stepDuration={0.25} direction="bottom" animateBy="letters" />
          </h2>
          <p data-about-story className="mt-6 text-base leading-[1.85] text-muted-foreground md:text-lg md:leading-[1.9]">
            {t("storyText")}
          </p>
          <p data-about-story className="mt-4 text-base leading-[1.85] text-muted-foreground md:text-lg md:leading-[1.9]">
            {t("storyTextSecondary")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
