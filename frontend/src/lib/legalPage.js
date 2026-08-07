import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/common/page-hero";
import { buildAgeroTitleRows } from "@/components/common/page-hero-utils";

const PAGE_KEYS = {
  privacy: "Privacy",
  terms: "Terms",
  cookies: "Cookies",
  kvkk: "Kvkk",
  "risk-disclosure": "Risk",
};

/**
 * Legal pages — same Agero hero shell (2 rows + 2 example images).
 */
export function makeLegalPage(pageKey) {
  const namespace = PAGE_KEYS[pageKey];

  async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace });
    return {
      title: t("title"),
      description: t("description"),
      openGraph: { title: t("title"), description: t("description"), type: "website" },
      twitter: { card: "summary", title: t("title"), description: t("description") },
    };
  }

  async function Page({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations(namespace);
    const sections = t.raw("sections") || [];
    const words = t("title").split(/\s+/).filter(Boolean);

    return (
      <div>
        <PageHero titleRows={buildAgeroTitleRows(words)} subtitle={t("updated")} />

        <section className="bg-white px-4 pb-16 pt-16 md:px-6 md:pb-28 md:pt-24">
          <div className="mx-auto w-full max-w-[850px]">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg md:leading-8">{t("description")}</p>

            <div className="mt-12 space-y-10 md:mt-14 md:space-y-12">
              {sections.map((section) => (
                <article key={section.heading}>
                  <h2 className="text-xl font-semibold text-weecomi-dark-gray md:text-2xl">{section.heading}</h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground whitespace-pre-line md:mt-4 md:text-[1.05rem] md:leading-8">
                    {section.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return { generateMetadata, Page };
}
