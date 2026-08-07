import { getLocale, getTranslations } from "next-intl/server";
import ScrollReveal from "@/components/home/_shared/scroll-reveal";
import { listPublicGallery } from "@/lib/api/gallery";
import StatsCarousel from "./stats-carousel";
import BlurText from "@/components/ui/blur-text";
import { HIKARI_HERO_MD } from "@/data/hikariImages";

const STAT_KEYS = ["products", "countries", "languages"];

const FALLBACK_SLIDES = [
  { id: "about-1", src: HIKARI_HERO_MD, alt: "WeeComi team collaboration" },
  { id: "about-2", src: "/images/hikari/campaign-1.jpg", alt: "WeeComi product campaign" },
  { id: "about-3", src: "/images/example.jpg", alt: "WeeComi workplace" },
];

async function getAboutSlides(locale) {
  try {
    const data = await listPublicGallery({ locale, page: 1, pageSize: 8 });
    const items = Array.isArray(data?.items) ? data.items : [];
    const mapped = items
      .filter((item) => item?.coverImageUrl)
      .map((item) => ({
        id: String(item.id),
        src: item.coverImageUrl,
        alt: item.title || item.category || "",
      }));

    if (mapped.length >= 3) return mapped;
  } catch {
    // Gallery API optional — keep static fallbacks.
  }

  return FALLBACK_SLIDES;
}

export default async function Stats() {
  const locale = await getLocale();
  const t = await getTranslations("Stats");
  const slides = await getAboutSlides(locale);

  return (
    <>
      <ScrollReveal itemSelector="[data-about-col]" className="section-y bg-weecomi-orange text-white">
        <div className="gridContainer">
          <div className="grid gap-10 md:gap-12 lg:grid-cols-4 lg:items-stretch lg:gap-0">
            <h2 data-about-col className="text-center font-heading text-[clamp(2.1rem,3.6vw,2.75rem)] leading-display lg:self-start lg:pr-6 lg:text-left xl:pr-8">
              <BlurText text={t("aboutHeading")} delay={30} stepDuration={0.25} direction="bottom" animateBy="letters" />
            </h2>

            {STAT_KEYS.map((key) => (
              <article
                key={key}
                data-about-col
                className="flex min-h-[240px] flex-col justify-between border-white/40 max-lg:border-t max-lg:pt-10 md:min-h-[280px] lg:min-h-[320px] lg:border-l lg:border-t-0 lg:px-8 lg:pt-0 xl:px-10"
              >
                <h3 className="max-w-[14ch] font-heading text-[clamp(1.35rem,2vw,2rem)] leading-display">{t(`${key}Heading`)}</h3>
                <p className="max-w-md text-sm leading-relaxed text-white/90 md:text-[0.95rem] lg:text-base">{t(`${key}Desc`)}</p>
              </article>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <section className="bg-white pb-12 pt-8 md:pb-16 md:pt-10 lg:pb-20">
        <div className="gridContainer">
          <div className="fluid pl-[max(1rem,calc((100%-min(92%,90rem))/2))]">
            <StatsCarousel slides={slides} label={t("carouselLabel")} />
          </div>
        </div>
      </section>
    </>
  );
}
