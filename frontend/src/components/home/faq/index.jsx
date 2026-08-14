import { getTranslations } from "next-intl/server";
import { SectionHeader, ScrollReveal } from "@/components/home/_shared";
import FaqAccordion from "./faq-accordion";

export default async function Faq() {
  const t = await getTranslations("Faq");
  const items = t.raw("items");

  return (
    <ScrollReveal id="faq" itemSelector="[data-faq-item]" className="section-y bg-white">
      <div className="gridContainer">
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          titleClassName="mt-6 md:text-5xl lg:text-[62px]"
          subtitleClassName="mx-auto mt-5 max-w-2xl"
        />

        <div data-faq-item className="mt-10 md:mt-12 lg:mt-14">
          <FaqAccordion items={Array.isArray(items) ? items : []} />
        </div>
      </div>
    </ScrollReveal>
  );
}
