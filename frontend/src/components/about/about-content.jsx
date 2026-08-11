import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ActionButton from "@/components/common/actionButton";
import ScrollReveal from "@/components/home/_shared/scroll-reveal";
import PageHero from "@/components/common/page-hero";
import BlurText from "@/components/ui/blur-text";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import AboutFaq from "@/components/about/about-faq";
import AboutVideoScale from "@/components/about/about-video-scale";
import LatestNewsSection from "@/components/news/latest-news-section";
import { cn } from "@/lib/utils";

const VALUE_KEYS = ["craft", "independence", "reach"];
const STAT_KEYS = ["products", "markets", "languages"];

export default async function AboutContent() {
  const t = await getTranslations("Corporate");
  const tNav = await getTranslations("Nav");
  const proofRows = t.raw("proofRows");
  const faqItems = t.raw("faq.items");

  return (
    <div>
      <PageHero
        title={tNav("about")}
        lead={t("title")}
        description={t("subtitle")}
        ctaPrimary={{ href: "/contact", label: tNav("ctaStart") }}
        ctaSecondary={{ href: "/ecosystem", label: tNav("ecosystem") }}
      />

      {/* Stats — Flexio strip */}
      <ScrollReveal itemSelector="[data-about-stat]" className="py-14 md:py-20">
        <div className="gridContainer">
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
            <p className="font-heading text-sm text-weecomi-orange">{t("statsEyebrow")}</p>
            <h2 className="mt-3 font-heading text-[clamp(1.5rem,3.5vw,2.25rem)] leading-display text-weecomi-dark-gray">
              <BlurText text={t("statsTitle")} delay={30} stepDuration={0.25} direction="bottom" animateBy="letters" />
            </h2>
          </div>
          <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
            {STAT_KEYS.map((key) => (
              <div key={key} data-about-stat className="text-center sm:text-left">
                <p className="font-display text-[clamp(2.75rem,6vw,4rem)] leading-none tracking-tight text-weecomi-dark-gray">{t(`stats.${key}.value`)}</p>
                <p className="mt-3 font-heading text-sm text-weecomi-orange md:text-base">{t(`stats.${key}.label`)}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`stats.${key}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Story copy — Flexio "About Us" block */}
      <section className="section-y">
        <div className="gridContainer">
          <ScrollReveal itemSelector="[data-about-story]" as="div" className="mx-auto max-w-3xl text-center">
            <p data-about-story className="font-heading text-sm text-weecomi-orange">
              {t("storyEyebrow")}
            </p>
            <h2 data-about-story className="mt-4 font-heading text-[clamp(1.85rem,4vw,3.25rem)] leading-display text-weecomi-dark-gray">
              <BlurText text={t("storyTitle")} delay={30} stepDuration={0.25} direction="bottom" animateBy="letters" />
            </h2>
            <p data-about-story className="mt-6 text-base leading-[1.85] text-muted-foreground md:text-lg md:leading-[1.9]">
              {t("storyText")}
            </p>
            <p data-about-story className="mt-4 text-base leading-[1.85] text-muted-foreground md:text-lg md:leading-[1.9]">
              {t("storyTextSecondary")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Flexio Video: pinned stage; next sheet climbs over it */}
      <AboutVideoScale captions={[t("storyTitle"), t("values.craft.title"), t("missionTitle")]} />

      {/* Mission sheet — large overlap over pinned video (Flexio) */}
      <ScrollReveal itemSelector="[data-about-mv]" className="relative z-30 -mt-[70vh] rounded-t-[32px] bg-white pt-16 md:-mt-[90vh] md:rounded-t-[44px] md:pt-24">
        <div className="gridContainer">
          <div data-about-mv className="mx-auto max-w-3xl text-center">
            <p className="font-heading text-sm text-muted-foreground">{t("valuesEyebrow")}</p>
            <h2 className="mt-4 font-heading text-[clamp(1.85rem,4vw,3.25rem)] leading-display text-weecomi-dark-gray">
              <BlurText text={t("missionTitle")} delay={30} stepDuration={0.25} direction="bottom" animateBy="letters" />
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{t("missionText")}</p>
          </div>

          <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-3 md:gap-8">
            {VALUE_KEYS.map((key, index) => (
              <article key={key} data-about-mv className={cn("border-t border-black/10 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8", index === 0 && "md:border-l-0 md:pl-0")}>
                <p className="font-heading text-[11px] text-weecomi-orange">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-heading text-xl text-weecomi-dark-gray md:text-2xl">{t(`values.${key}.title`)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{t(`values.${key}.text`)}</p>
              </article>
            ))}
          </div>

          {/* Dark CTA */}
          <article
            data-about-mv
            className="relative mt-14 overflow-hidden rounded-[24px] bg-weecomi-dark-gray px-5 py-10 text-left text-white sm:rounded-[28px] sm:px-8 sm:py-12 md:mt-16 md:px-12 md:py-14"
          >
            <TextureOverlay texture="noise" tone="light" opacity={0.35} className="z-0" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(240,159,47,0.55),transparent_55%)]" />
            <div className="relative z-10 max-w-xl mx-auto text-center">
              <h3 className="font-heading text-[clamp(1.5rem,5vw,2.75rem)] leading-display">{t("ctaTitle")}</h3>
              <p className="mt-2 font-heading text-[clamp(1.5rem,5vw,2.75rem)] leading-display text-weecomi-orange">{t("ctaAccent")}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">{t("ctaText")}</p>
              <ActionButton href="/contact" variant="outline" showArrow className="mt-7">
                {t("ctaStart")}
              </ActionButton>
            </div>
          </article>
        </div>
      </ScrollReveal>

      {/* Proof */}
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
                <span className="font-heading text-[clamp(1.5rem,6.2vw,2.15rem)] leading-tight text-weecomi-dark-gray transition-colors group-hover:text-weecomi-orange">{row.center}</span>
                <span className="inline-flex items-center gap-2 font-heading text-xs text-muted-foreground md:justify-end md:text-sm">
                  {row.right}
                  <ArrowUpRight className="size-4 opacity-0 transition group-hover:opacity-100" aria-hidden />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>

      {/* FAQ */}
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
            <AboutFaq items={Array.isArray(faqItems) ? faqItems : []} />
          </div>
        </div>
      </ScrollReveal>

      <LatestNewsSection />
    </div>
  );
}
