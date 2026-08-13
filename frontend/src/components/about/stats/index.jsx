import { getTranslations } from "next-intl/server";
import ScrollReveal from "@/components/home/_shared/scroll-reveal";
import BlurText from "@/components/ui/blur-text";
import StatItem from "./stat-item";

const STATS = [
  { key: "products", value: 11, suffix: "+" },
  { key: "markets", value: 10, suffix: "+" },
  { key: "languages", value: 5, suffix: "" },
];

export default async function Stats() {
  const t = await getTranslations("Corporate");

  return (
    <section className="py-14 md:py-20">
      <div className="gridContainer">
        <ScrollReveal
          itemSelector="[data-about-stat-heading]"
          start="top bottom"
          y={20}
          as="div"
          className="mx-auto mb-10 max-w-2xl text-center md:mb-12"
        >
          <div data-about-stat-heading>
            <p className="font-heading text-sm text-weecomi-orange">{t("statsEyebrow")}</p>
            <h2 className="mt-3 font-heading text-[clamp(1.5rem,3.5vw,2.25rem)] leading-display text-weecomi-dark-gray">
              <BlurText text={t("statsTitle")} delay={30} stepDuration={0.25} direction="bottom" animateBy="letters" />
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {STATS.map((stat) => (
            <StatItem
              key={stat.key}
              value={stat.value}
              suffix={stat.suffix}
              label={t(`stats.${stat.key}.label`)}
              text={t(`stats.${stat.key}.text`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
