import { getTranslations } from "next-intl/server";
import { SectionHeader, ScrollReveal } from "@/components/home/_shared";
import FaqAccordion from "./faq-accordion";

export default async function Faq() {
  const t = await getTranslations("Faq");
  const items = t.raw("items");

  return (
    <ScrollReveal id="faq" itemSelector="[data-faq-item]" className="section-y-bottom bg-white">
      <div className="gridContainer">
        <SectionHeader align="center" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <div data-faq-item className="section-gap">
          <FaqAccordion items={Array.isArray(items) ? items : []} />
        </div>
      </div>
    </ScrollReveal>
  );
}
