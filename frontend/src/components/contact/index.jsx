import { getTranslations } from "next-intl/server";
import ScrollReveal from "@/components/home/_shared/scroll-reveal";
import BlurText from "@/components/ui/blur-text";
import ContactForm from "./contact-form";
import ContactInfo from "./contact-info";

export default async function ContactSection() {
  const t = await getTranslations("Contact");

  return (
    <ScrollReveal
      itemSelector="[data-contact-block]"
      className="bg-white pb-16 pt-10 md:pb-24 md:pt-12"
      y={24}
      start="top 85%"
      stagger={0.08}
      duration={0.5}
    >
      <div className="gridContainer">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-16">
          <div data-contact-block>
            <p className="font-heading text-sm text-weecomi-orange">{t("formEyebrow")}</p>
            <h2 className="mt-4 max-w-xl font-heading text-[clamp(1.9rem,4vw,3rem)] leading-display text-weecomi-dark-gray">
              <BlurText text={t("formTitle")} delay={30} stepDuration={0.25} direction="bottom" animateBy="letters" />
            </h2>

            <div className="mt-10 md:mt-12">
              <ContactForm />
            </div>
          </div>

          <div data-contact-block>
            <ContactInfo />
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
