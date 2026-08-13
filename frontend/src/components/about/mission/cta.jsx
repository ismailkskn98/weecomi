import { getTranslations } from "next-intl/server";
import ActionButton from "@/components/common/actionButton";
import { TextureOverlay } from "@/components/ui/texture-overlay";

export default async function MissionCta() {
  const t = await getTranslations("Corporate");

  return (
    <article
      data-about-mv
      className="relative mt-14 overflow-hidden rounded-[24px] bg-weecomi-dark-gray px-5 py-10 text-left text-white sm:rounded-[28px] sm:px-8 sm:py-12 md:mt-16 md:px-12 md:py-14"
    >
      <TextureOverlay texture="noise" tone="light" opacity={0.35} className="z-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(240,159,47,0.55),transparent_55%)]" />
      <div className="relative z-10 mx-auto max-w-xl text-center">
        <h3 className="font-heading text-[clamp(1.5rem,5vw,2.75rem)] leading-display">{t("ctaTitle")}</h3>
        <p className="mt-2 font-heading text-[clamp(1.5rem,5vw,2.75rem)] leading-display text-weecomi-orange">{t("ctaAccent")}</p>
        <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">{t("ctaText")}</p>
        <ActionButton href="/contact" variant="outline" showArrow className="mt-7">
          {t("ctaStart")}
        </ActionButton>
      </div>
    </article>
  );
}
