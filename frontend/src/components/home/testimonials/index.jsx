import Image from "next/image";
import { Quote } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { BracketTag, ScrollReveal } from "@/components/home/_shared";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { cn } from "@/lib/utils";
import { data as testimonialData } from "./data";

const MIN_LOCALE_TESTIMONIALS = 6;

function normalizeText(value) {
  return String(value || "")
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getDisplayName(item) {
  return normalizeText(`${item.name || ""} ${item.surname || ""}`) || "WeeComi";
}

function getInitials(name) {
  const parts = normalizeText(name).split(" ").filter(Boolean);
  if (!parts.length) return "W";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
}

function getApprovedTestimonials(locale) {
  const seen = new Set();
  const approved = testimonialData
    .filter((item) => item?.is_approved === 1 && item?.body)
    .map((item) => ({
      id: item.id,
      name: getDisplayName(item),
      image: item.image || null,
      body: normalizeText(item.body),
      language: item.language || "",
    }))
    .filter((item) => {
      const duplicateKey = `${item.name.toLowerCase()}|${item.body.toLowerCase()}`;
      if (seen.has(duplicateKey)) return false;
      seen.add(duplicateKey);
      return true;
    });

  const localeItems = approved.filter((item) => item.language === locale);
  if (localeItems.length >= MIN_LOCALE_TESTIMONIALS) return localeItems;

  return [...localeItems, ...approved.filter((item) => item.language !== locale)];
}

function TestimonialAvatar({ testimonial }) {
  const initials = getInitials(testimonial.name);

  if (testimonial.image) {
    return (
      <span className="relative inline-flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-weecomi-dark-gray font-heading text-sm text-white">
        <span aria-hidden>{initials}</span>
        <Image
          src={testimonial.image}
          alt=""
          width={48}
          height={48}
          sizes="48px"
          className="absolute inset-0 size-full object-cover"
        />
      </span>
    );
  }

  return (
    <span className="inline-flex size-12 items-center justify-center rounded-full bg-weecomi-dark-gray font-heading text-sm text-white" aria-hidden>
      {initials}
    </span>
  );
}

function TestimonialCard({ testimonial, index, memberLabel, className }) {
  return (
    <Card
      data-testimonial-card
      className={cn(
        "min-h-[19rem] w-[min(82vw,22rem)] shrink-0 snap-start justify-between rounded-[18px] border-black/[0.06] bg-white/90 shadow-[0_18px_60px_rgba(13,13,13,0.07)] backdrop-blur md:w-[24rem] lg:w-[26rem]",
        className,
      )}
    >
      <CardHeader className="gap-0">
        <span className="font-heading text-[11px] text-weecomi-orange">{String(index + 1).padStart(2, "0")}</span>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between gap-8">
        <blockquote className="relative">
          <Quote className="mb-4 size-8 fill-weecomi-orange/10 text-weecomi-orange/40" aria-hidden />
          <p className="line-clamp-6 text-[0.95rem] leading-relaxed text-weecomi-dark-gray/80 md:text-base">"{testimonial.body}"</p>
        </blockquote>

        <footer className="flex items-center gap-3 border-t border-black/[0.06] pt-5">
          <TestimonialAvatar testimonial={testimonial} />
          <div className="min-w-0">
            <h3 className="truncate font-heading text-base leading-tight text-weecomi-dark-gray">{testimonial.name}</h3>
            <p className="mt-1 text-sm leading-none text-muted-foreground">{memberLabel}</p>
          </div>
        </footer>
      </CardContent>
    </Card>
  );
}

export default async function Testimonials() {
  const locale = await getLocale();
  const t = await getTranslations("Testimonials");
  const testimonials = getApprovedTestimonials(locale);
  const splitIndex = Math.ceil(testimonials.length / 2);
  const rows = [testimonials.slice(0, splitIndex), testimonials.slice(splitIndex)];

  if (!testimonials.length) return null;

  return (
    <ScrollReveal
      id="testimonials"
      itemSelector="[data-testimonial-item]"
      className="relative overflow-hidden bg-[#f8f9fb] section-y"
      aria-label={t("sectionLabel")}
    >
      <TextureOverlay texture="dots" tone="dark" opacity={0.05} className="z-0" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_16%_8%,rgba(240,159,47,0.18),transparent_38%),radial-gradient(ellipse_at_82%_18%,rgba(111,164,199,0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.55))]" />

      <div className="relative z-10 gridContainer">
        <div data-testimonial-item className="max-w-3xl">
          <BracketTag className="text-weecomi-orange">{t("bracketTag")}</BracketTag>
          <h2 className="mt-5 max-w-4xl font-heading text-3xl leading-display text-weecomi-dark-gray md:text-5xl lg:text-[3.5rem]">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{t("subtitle")}</p>
        </div>
      </div>

      <div
        data-testimonial-item
        className="relative z-10 mt-12 overflow-x-auto pb-4 [scrollbar-width:none] md:mt-14 md:[mask-image:linear-gradient(to_right,transparent_0,#000_8%,#000_92%,transparent_100%)] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-max snap-x snap-mandatory flex-col gap-5 px-[max(1rem,calc((100vw-min(92%,90rem))/2))] md:gap-6">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={cn(
                "flex gap-5 md:gap-6",
                rowIndex === 0 ? "md:translate-x-[clamp(1rem,4vw,4rem)]" : "md:-translate-x-[clamp(3rem,6vw,6rem)]",
              )}
            >
              {row.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={rowIndex === 0 ? index : splitIndex + index}
                  memberLabel={t("memberLabel")}
                  className={rowIndex === 1 ? "bg-white/80" : undefined}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
