import { getTranslations } from "next-intl/server";
import ScrollReveal from "@/components/home/_shared/scroll-reveal";
import BlurText from "@/components/ui/blur-text";
import FaqList from "./faq-list";

export default async function Faq() {
  const t = await getTranslations("Corporate");
  const faqItems = t.raw("faq.items");

  return (
    <ScrollReveal itemSelector="[data-about-faq]" className="section-y bg-white">
      <div className="gridContainer">
        <div data-about-faq className="mx-auto max-w-3xl text-center">
          <p className="font-heading text-sm text-muted-foreground">{t("faqEyebrow")}</p>
          <h2 className="mt-4 font-heading text-[clamp(1.85rem,4vw,3.25rem)] leading-display text-weecomi-dark-gray">
            <BlurText text={t("faqTitle")} delay={30} stepDuration={0.25} direction="bottom" animateBy="letters" />
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">{t("faqSubtitle")}</p>
        </div>
        <div data-about-faq className="mt-10">
          <FaqList items={Array.isArray(faqItems) ? faqItems : []} />
        </div>
      </div>
    </ScrollReveal>
  );
}
