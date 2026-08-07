import { getTranslations } from "next-intl/server";
import { BracketTag, ScrollReveal } from "@/components/home/_shared";
import FaqAccordion from "./faq-accordion";
import BlurText from "@/components/ui/blur-text";

export default async function Faq() {
  const t = await getTranslations("Faq");
  const items = t.raw("items");

  return (
    <ScrollReveal id="faq" itemSelector="[data-faq-item]" className="section-y bg-white">
      <div className="gridContainer">
        <div data-faq-item className="mx-auto max-w-4xl text-center">
          <BracketTag>{t("eyebrow")}</BracketTag>
          <h2 className="mt-6 font-heading text-[clamp(2.4rem,6vw,5.4rem)] leading-display text-weecomi-dark-gray">
            <BlurText text={t("title")} delay={30} stepDuration={0.25} direction="bottom" animateBy="letters" />
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl">{t("subtitle")}</p>
        </div>

        <div data-faq-item className="mt-10">
          <FaqAccordion items={Array.isArray(items) ? items : []} />
        </div>
      </div>
    </ScrollReveal>
  );
}
