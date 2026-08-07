import { getTranslations } from "next-intl/server";
import { marqueeLogos } from "@/data/marqueeLogos";
import LogoLoop from "@/components/ui/logo-loop";

export default async function ProductMarquee({ pauseOnHover = true }) {
  const t = await getTranslations("Hero");

  return (
    <section className="border-y border-black/[0.05] bg-white py-8 md:py-10" aria-label={t("marqueeLabel")}>
      <div className="mb-5 flex items-center justify-center gap-3 px-4">
        <span className="hidden h-px w-12 bg-black/10 sm:block" aria-hidden />
        <p className="text-center text-[11px] font-bold uppercase text-muted-foreground">
          {t("marqueeLabel")}
        </p>
        <span className="hidden h-px w-12 bg-black/10 sm:block" aria-hidden />
      </div>
      <LogoLoop logos={marqueeLogos} pauseOnHover={pauseOnHover} fade="light" aria-label={t("marqueeLabel")} />
    </section>
  );
}
