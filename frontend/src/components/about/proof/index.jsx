import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import ScrollReveal from "@/components/home/_shared/scroll-reveal";
import BlurText from "@/components/ui/blur-text";

export default async function Proof() {
  const t = await getTranslations("Corporate");
  const proofRows = t.raw("proofRows");

  return (
    <ScrollReveal itemSelector="[data-about-proof]" className="section-y">
      <div className="gridContainer">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-heading text-sm text-muted-foreground">{t("proofEyebrow")}</p>
          <h2 className="mt-4 font-heading text-[clamp(2.2rem,5vw,4rem)] leading-display text-weecomi-dark-gray">
            <BlurText text={t("proofTitle")} delay={30} stepDuration={0.25} direction="bottom" animateBy="letters" />
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">{t("proofSubtitle")}</p>
        </div>

        <ul className="mt-10 w-full divide-y divide-black/10 border-y border-black/10 md:mx-auto md:mt-14 md:max-w-5xl">
          {(Array.isArray(proofRows) ? proofRows : []).map((row, index) => (
            <li
              key={`${row.left}-${row.center}`}
              data-about-proof
              className="group grid gap-1.5 py-6 text-left transition-colors duration-300 hover:bg-[#f7f8f9] sm:gap-2 sm:py-7 md:grid-cols-[1fr_2.2fr_1fr] md:items-center md:gap-8 md:px-4 md:py-9"
            >
              <span className="font-heading text-xs text-muted-foreground md:text-sm">
                <span className="mr-2 text-weecomi-orange">{String(index + 1).padStart(2, "0")}</span>
                {row.left}
              </span>
              <span className="font-heading text-[clamp(1.5rem,6.2vw,2.15rem)] leading-tight text-weecomi-dark-gray transition-colors group-hover:text-weecomi-orange">
                {row.center}
              </span>
              <span className="inline-flex items-center gap-2 font-heading text-xs text-muted-foreground md:justify-end md:text-sm">
                {row.right}
                <ArrowUpRight className="size-4 opacity-0 transition group-hover:opacity-100" aria-hidden />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  );
}
