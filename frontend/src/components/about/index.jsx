import { getTranslations } from "next-intl/server";
import PageHero from "@/components/common/page-hero";
import LatestNewsSection from "@/components/news/latest-news-section";
import Stats from "./stats";
// import VideoScale from "./video-scale";
import AboutScrollExpand from "./scroll-expand";
import Mission from "./mission";
import Proof from "./proof";
import Faq from "./faq";

export default async function AboutContent() {
  const t = await getTranslations("Corporate");
  const tNav = await getTranslations("Nav");

  return (
    <div>
      <PageHero
        title={tNav("about")}
        lead={t("title")}
        description={t("subtitle")}
        ctaPrimary={{ href: "/contact", label: tNav("ctaStart") }}
        ctaSecondary={{ href: "/ecosystem", label: tNav("ecosystem") }}
      />

      <Stats />
      {/* <VideoScale captions={[t("storyTitle"), t("values.craft.title"), t("missionTitle")]} /> */}
      <AboutScrollExpand title={t("storyTitle")} scrollHint={t("storyEyebrow")}>
        <p className="font-heading text-sm text-weecomi-orange">{t("storyEyebrow")}</p>
        <h2 className="mt-4 font-heading text-[clamp(1.75rem,4vw,3rem)] leading-display text-white">
          {t("storyTitle")}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white md:text-base md:leading-[1.85]">
          {t("storyText")}
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base md:leading-[1.85]">
          {t("storyTextSecondary")}
        </p>
      </AboutScrollExpand>
      <Mission />
      <Proof />
      <Faq />
      <LatestNewsSection />
    </div>
  );
}
