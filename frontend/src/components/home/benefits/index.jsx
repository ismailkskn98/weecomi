import Image from "next/image";
import { getTranslations } from "next-intl/server";
import ActionButton from "@/components/common/actionButton";
import { BracketTag } from "@/components/home/_shared";
import ScrollReveal from "@/components/home/_shared/scroll-reveal";
import BlurText from "@/components/ui/blur-text";

const BENEFITS = [
  { key: "independent", image: "/images/hikari/benefits/reach.svg" },
  { key: "scale", image: "/images/hikari/benefits/impact.svg" },
  { key: "speed", image: "/images/hikari/benefits/speed.svg" },
  { key: "trust", image: "/images/hikari/benefits/authority.svg" },
];

export default async function Benefits() {
  const t = await getTranslations("Benefits");

  return (
    <ScrollReveal id="benefits" itemSelector="[data-benefit]" className="section-y bg-white">
      <div className="gridContainer">
        <div className="mx-auto max-w-3xl text-center">
          <BracketTag>{t("bracketTag")}</BracketTag>
          <h2 className="mt-6 font-heading text-3xl leading-display text-weecomi-dark-gray md:text-5xl lg:text-[62px]">
            <BlurText text={t("title")} delay={30} stepDuration={0.25} direction="bottom" animateBy="letters" />
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-black/50 md:text-lg">{t("subtitle")}</p>
        </div>

        <div className="mt-[var(--sp-5)] grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((item) => (
            <article key={item.key} data-benefit className="flex flex-col items-center gap-6 rounded-xl bg-[#f5f5f5] px-4 py-6">
              <span className="inline-flex items-center justify-center rounded-xl bg-black px-3 py-[5px]">
                <span className="font-heading text-sm font-medium text-white">{t(`${item.key}.tag`)}</span>
              </span>

              <div className="relative aspect-[263/175] w-full max-w-[263px]">
                <Image src="/images/hikari/benefits/grid.svg" alt="" fill unoptimized className="pointer-events-none object-fill opacity-60" aria-hidden />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image src={item.image} alt="" width={154} height={154} unoptimized className="relative z-[1] h-[min(100%,154px)] w-auto max-w-[58%] object-contain" aria-hidden />
                </div>
              </div>

              <div className="flex w-full flex-col items-center gap-3 text-center">
                <h3 className="font-heading text-[22px] leading-[1.5] text-black">{t(`${item.key}.cardTitle`)}</h3>
                <p className="text-base leading-[1.35] text-black/50">{t(`${item.key}.description`)}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-[var(--sp-5)] flex justify-center">
          <ActionButton href="/ecosystem" variant="inverse" size="lg" showArrow>
            {t("cta")}
          </ActionButton>
        </div>
      </div>
    </ScrollReveal>
  );
}
