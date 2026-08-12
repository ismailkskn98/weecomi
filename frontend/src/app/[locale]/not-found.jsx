import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import NotFoundSearch from "@/components/not-found/search";
import NotFoundScene from "@/components/not-found/scene";

export async function generateMetadata() {
  const t = await getTranslations("NotFound");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main className="fixed inset-0 z-80 overflow-hidden bg-[#f6f7f8] text-weecomi-dark-gray">
      <NotFoundScene />

      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="font-display text-[clamp(4.75rem,18vw,10rem)] font-bold leading-none tracking-tight text-weecomi-dark-gray">404</h1>
        <p className="mt-5 max-w-md text-base text-weecomi-dark-gray/70 md:text-lg">{t("description")}</p>

        <div className="mt-8 w-full max-w-md">
          <NotFoundSearch />
        </div>

        <p className="mt-8 text-sm text-weecomi-dark-gray/65">
          {t("homeLead")}{" "}
          <Link href="/" className="underline decoration-weecomi-dark-gray/35 underline-offset-4 transition hover:text-weecomi-orange hover:decoration-weecomi-orange capitalize">
            {t("homeLink")}
          </Link>
        </p>
      </div>
    </main>
  );
}
