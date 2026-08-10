import { getTranslations } from "next-intl/server";
import { BracketTag } from "@/components/home/_shared";
import TextScrollReveal from "@/components/ui/text-scroll-reveal";

/**
 * Homepage manifesto — React Bits ScrollReveal defaults (smooth scrub: true).
 * Server owns copy + structure; client only animates word spans already in the DOM.
 * @see https://www.reactbits.dev/text-animations/scroll-reveal
 */
export default async function Manifesto() {
  const t = await getTranslations("Manifesto");

  return (
    <section className="section-y bg-white">
      <div className="gridContainer">
        <div className="mx-auto max-w-5xl text-center">
          <BracketTag className="text-weecomi-dark-gray/70">{t("eyebrow")}</BracketTag>
          <TextScrollReveal
            scrub={1}
            baseOpacity={0.1}
            blurStrength={0}
            baseRotation={0}
            className="mt-8"
            textClassName="font-heading text-[clamp(1.75rem,4.5vw,3.25rem)] font-semibold leading-display text-weecomi-dark-gray"
          >
            {t("text")}
          </TextScrollReveal>
        </div>
      </div>
    </section>
  );
}
