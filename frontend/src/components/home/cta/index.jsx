import { getTranslations } from "next-intl/server";
import ActionButton from "@/components/common/actionButton";

export default async function Cta() {
  const t = await getTranslations("CTA");

  return (
    <section className="relative overflow-hidden bg-weecomi-dark-gray py-20 text-white md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(240,159,47,0.22),transparent_50%)]" />
      <div className="gridContainer relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold text-weecomi-orange">WEECOMI</p>
          <h2 className="mt-5 text-3xl font-bold leading-[1.05] md:text-5xl lg:text-[3.5rem]">{t("title")}</h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/70 md:text-lg">{t("subtitle")}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ActionButton href="/ecosystem" variant="inverse" showArrow>
              {t("primary")}
            </ActionButton>
            <ActionButton href="/contact" variant="outline">
              {t("secondary")}
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}
