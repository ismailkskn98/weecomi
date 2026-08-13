import { getTranslations } from "next-intl/server";
import { BracketTag } from "@/components/home/_shared";
import ScrollReveal from "@/components/home/_shared/scroll-reveal";
import BlurText from "@/components/ui/blur-text";
import { TextureOverlay } from "@/components/ui/texture-overlay";

const PROOF_METRICS = [
  { value: "11+", row: 0 },
  { value: "10+", row: 1 },
  { value: "5", row: 2 },
  { valueKey: "proofProductMark", row: 3, isWord: true },
];

export default async function Proof() {
  const t = await getTranslations("Corporate");
  const proofRows = t.raw("proofRows");
  const rows = Array.isArray(proofRows) ? proofRows : [];

  return (
    <ScrollReveal
      itemSelector="[data-about-proof]"
      className="relative overflow-hidden bg-weecomi-dark-gray section-y"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      />
      <TextureOverlay texture="noise" tone="light" opacity={0.2} className="z-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(240,159,47,0.22),transparent_68%)]"
      />

      <div className="gridContainer relative z-10">
        <div data-about-proof className="max-w-3xl text-left">
          <BracketTag className="text-weecomi-orange">{t("proofEyebrow")}</BracketTag>
          <h2 className="mt-5 font-heading text-3xl leading-display text-white text-balance md:text-5xl lg:text-[3.75rem]">
            <BlurText text={t("proofTitle")} delay={30} stepDuration={0.25} direction="bottom" animateBy="letters" />
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">{t("proofSubtitle")}</p>
        </div>

        <ul className="mt-12 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-0 lg:pt-14">
          {PROOF_METRICS.map((metric, index) => {
            const row = rows[metric.row] || {};
            const display = metric.isWord ? t(metric.valueKey) : metric.value;

            return (
              <li
                key={`${row.left}-${display}`}
                data-about-proof
                className={
                  index === 0
                    ? "text-left lg:pr-6"
                    : "text-left lg:border-l lg:border-white/10 lg:px-6"
                }
              >
                <p className="font-heading text-sm text-weecomi-orange md:text-base">{row.left}</p>
                <p
                  className={
                    metric.isWord
                      ? "mt-3 font-heading text-[clamp(2rem,4.5vw,3.25rem)] leading-none tracking-tight text-white"
                      : "mt-3 font-heading text-[clamp(2.75rem,6vw,4.5rem)] leading-none tracking-tight text-white tabular-nums"
                  }
                >
                  {display}
                </p>
                <p className="mt-3 max-w-[16ch] text-sm leading-relaxed text-white/50 md:text-[0.95rem]">
                  {row.right}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </ScrollReveal>
  );
}
