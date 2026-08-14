import { getLocale, getTranslations } from "next-intl/server";
import { SectionHeader, ScrollReveal } from "@/components/home/_shared";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { data as testimonialData } from "./data";
import TestimonialsCarousel from "./testimonials-carousel";
import { getApprovedTestimonials } from "./utils";

export default async function Testimonials() {
  const locale = await getLocale();
  const t = await getTranslations("Testimonials");
  const testimonials = getApprovedTestimonials(testimonialData, locale);

  if (!testimonials.length) return null;

  return (
    <ScrollReveal id="testimonials" itemSelector="[data-testimonial-item]" className="relative overflow-hidden section-y-top" aria-label={t("sectionLabel")}>
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.055]"
        aria-hidden
        style={{
          backgroundImage: "linear-gradient(rgba(13,13,13,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(13,13,13,0.35) 1px, transparent 1px)",
          backgroundSize: "80px 80px",

          maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        }}
      />
      <TextureOverlay texture="noise" tone="dark" opacity={0.05} className="z-0" />

      <div className="relative z-10 gridContainer">
        <SectionHeader
          className="max-w-[42rem]"
          eyebrow={t("bracketTag")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
      </div>

      <div data-testimonial-item className="relative z-10 section-gap">
        <TestimonialsCarousel
          testimonials={testimonials}
          memberLabel={t("memberLabel")}
          labels={{
            carousel: t("sectionLabel"),
            prev: t("prev"),
            next: t("next"),
            avatars: t("avatarsLabel"),
            readMore: t("readMore"),
          }}
        />
      </div>
    </ScrollReveal>
  );
}
