import { getTranslations } from "next-intl/server";
import PageHero from "@/components/common/page-hero";
import LatestNewsSection from "@/components/news/latest-news-section";
import Stats from "./stats";
import Story from "./story";
import VideoScale from "./video-scale";
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
      <Story />
      <VideoScale captions={[t("storyTitle"), t("values.craft.title"), t("missionTitle")]} />
      <Mission />
      <Proof />
      <Faq />
      <LatestNewsSection />
    </div>
  );
}
