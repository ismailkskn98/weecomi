import { getTranslations } from "next-intl/server";
import { BracketTag } from "@/components/home/_shared";
import ScrollReveal from "@/components/home/_shared/scroll-reveal";
import BlurText from "@/components/ui/blur-text";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import StatValue from "@/components/about/stats/stat-value";
import { cn } from "@/lib/utils";

function parseMetricNumber(raw) {
  const text = String(raw ?? "").trim();
  const match = text.match(/^(\d+)(\+)?$/);
  if (!match) return null;
  return { value: Number(match[1]), suffix: match[2] || "" };
}

export default async function Proof() {
  const t = await getTranslations("Corporate");
  const metrics = t.raw("proofMetrics");
  const items = Array.isArray(metrics) ? metrics : [];

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
        className="pointer-events-none absolute -left-20 bottom-0 h-88 w-88 rounded-full bg-[radial-gradient(circle,rgba(240,159,47,0.22),transparent_68%)]"
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
          {items.map((item, index) => {
            const numeric = parseMetricNumber(item.value);

            return (
              <li
                key={`${item.label}-${item.value}`}
                data-about-proof
                className={cn("text-left", index === 0 ? "lg:pr-6" : "lg:border-l lg:border-white/10 lg:px-6")}
              >
                <p className="font-heading text-sm text-weecomi-orange md:text-base">{item.label}</p>
                <div className="mt-3">
                  {numeric ? (
                    <StatValue
                      value={numeric.value}
                      suffix={numeric.suffix}
                      className="font-heading text-white text-[clamp(2.75rem,6vw,4.5rem)]"
                    />
                  ) : (
                    <p className="font-heading text-[clamp(2rem,4.5vw,3.25rem)] leading-none tracking-tight text-white">
                      {item.value}
                    </p>
                  )}
                </div>
                <p className="mt-3 max-w-[18ch] text-sm leading-relaxed text-white/50 md:text-[0.95rem]">{item.hint}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </ScrollReveal>
  );
}
