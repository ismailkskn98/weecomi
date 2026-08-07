import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/common/page-hero";
import { buildAgeroTitleRows } from "@/components/common/page-hero-utils";
import ContactForm from "@/components/contact/contactForm";
import BlurText from "@/components/ui/blur-text";
import { HIKARI_HERO_MD } from "@/data/hikariImages";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: { title: t("title"), description: t("subtitle"), type: "website" },
    twitter: { card: "summary_large_image", title: t("title"), description: t("subtitle") },
  };
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");
  const titleLines = t.raw("pageTitleLines");
  const lines = Array.isArray(titleLines) ? titleLines : [t("title")];

  return (
    <div>
      <PageHero titleRows={buildAgeroTitleRows(lines)} subtitle={t("subtitle")} />

      <section className="bg-white pb-16 pt-10 md:pb-24 md:pt-12">
        <div className="mx-auto grid w-full max-w-[1300px] gap-10 px-4 md:px-6 lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-16">
          <div>
            <p className="font-heading text-sm text-weecomi-orange">{t("formEyebrow")}</p>
            <h2 className="mt-4 max-w-xl font-heading text-[clamp(1.9rem,4vw,3rem)] leading-display text-weecomi-dark-gray">
              <BlurText text={t("formTitle")} delay={30} stepDuration={0.25} direction="bottom" animateBy="letters" />
            </h2>

            <div className="mt-10 md:mt-12">
              <ContactForm />
            </div>
          </div>

          <div className="relative aspect-[625/645] w-full overflow-hidden rounded-[18px] bg-[#f5f5f5] lg:sticky lg:top-28 lg:aspect-auto lg:min-h-[645px]">
            <Image src={HIKARI_HERO_MD} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 625px" priority />
            <div className="absolute inset-0 bg-linear-to-t from-weecomi-dark-gray/65 via-weecomi-dark-gray/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
              <p className="font-heading text-[11px] tracking-[0.12em] text-white/75">{t("supportLabel")}</p>
              <p className="mt-2 font-heading text-2xl md:text-3xl">{t("supportPhone")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
