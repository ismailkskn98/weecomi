import { getLocale, getTranslations } from "next-intl/server";
import ScrollReveal from "@/components/home/_shared/scroll-reveal";
import { listPublicGallery } from "@/lib/api/gallery";
import { getEcosystemCarouselSlides } from "@/data/ecosystemCarouselSlides";
import StatsCarousel from "./stats-carousel";

const STAT_KEYS = ["products", "countries", "languages"];

async function getAboutSlides(locale, ecosystemSlides) {
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
    // Gallery API optional — use ecosystem carousel slides.
  }

  return ecosystemSlides;
}

export default async function Stats() {
  const locale = await getLocale();
  const t = await getTranslations("Stats");
  const tProducts = await getTranslations("Products");
  const ecosystemSlides = getEcosystemCarouselSlides(tProducts);
  const slides = await getAboutSlides(locale, ecosystemSlides);

  return (
    <>
      <ScrollReveal itemSelector="[data-about-col]" className="section-y bg-weecomi-orange text-white">
        <div className="gridContainer">
          <div className="grid gap-10 md:gap-12 lg:grid-cols-4 lg:items-stretch lg:gap-0">
            <h2 className="text-center font-heading text-[clamp(2.1rem,3.6vw,2.75rem)] font-normal normal-case leading-display lg:self-start lg:pr-6 lg:text-left xl:pr-8">
              {t("aboutHeading")}
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

      <section className="bg-white section-y-top">
        <div className="gridContainer">
          <div className="fluid pl-[max(1rem,calc((100%-min(92%,90rem))/2))]">
            <StatsCarousel slides={slides} label={t("carouselLabel")} />
          </div>
        </div>
      </section>
    </>
  );
}
