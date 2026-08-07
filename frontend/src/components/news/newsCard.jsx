"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import MagneticHover, { MagneticBadge } from "@/components/common/magneticHover";
import { formatNewsDate, getNewsCategoryLabel } from "@/data/newsCategories";

function authorInitials(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "W";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
}

export default function NewsCard({ item, locale, viewLabel = "View", compact = false }) {
  const t = useTranslations("News");
  const categoryLabel = getNewsCategoryLabel(item.category, locale);
  const dateLabel = formatNewsDate(item.publishedAt, locale);
  const authorName = item.author || "WeeComi";
  const summary = item.summary || item.highlight || "";

  return (
    <article className="group h-full">
      <Link href={`/news/${item.slug}`} className="block h-full cursor-pointer">
        <MagneticHover
          className="flex h-full flex-col"
          badge={
            <MagneticBadge>
              {viewLabel}
              <span aria-hidden>→</span>
            </MagneticBadge>
          }
        >
          <MagneticHover.Anchor className={`overflow-hidden rounded-[18px] bg-[#f5f5f5] ${compact ? "aspect-[16/10]" : "aspect-[410/224]"}`}>
            {item.coverImageUrl ? (
              <Image
                src={item.coverImageUrl}
                alt={item.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes={compact ? "320px" : "(max-width: 768px) 100vw, 33vw"}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-weecomi-orange/20 via-[#f5f5f5] to-weecomi-dark-gray/10" />
            )}
          </MagneticHover.Anchor>

          <div className={`flex flex-1 flex-col ${compact ? "mt-4" : "mt-5"}`}>
            <h3
              className={`font-heading leading-display text-weecomi-dark-gray transition group-hover:text-weecomi-orange ${
                compact ? "text-base md:text-lg" : "text-xl md:text-[1.35rem]"
              }`}
            >
              {item.title}
            </h3>

            {summary && !compact ? <p className="mt-2 line-clamp-2 text-base leading-[1.5] text-black/50">{summary}</p> : null}

            {!compact ? (
              <div className="mt-5 flex items-center gap-2">
                <span
                  className="inline-flex size-[30px] shrink-0 items-center justify-center rounded-full bg-weecomi-dark-gray font-heading text-[10px] font-medium uppercase text-white"
                  aria-hidden
                >
                  {authorInitials(authorName)}
                </span>
                <p className="truncate text-sm leading-none text-black/50">
                  <span>{t("author")}:</span> <span className="text-black">{authorName}</span>
                </p>
              </div>
            ) : (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#f5f5f5] px-3 py-1 text-xs font-medium text-weecomi-dark-gray">{categoryLabel}</span>
                {dateLabel ? <time className="font-heading text-xs text-black/45">{dateLabel}</time> : null}
              </div>
            )}

            {!compact ? (
              <>
                <div className="mt-5 h-px w-full bg-black/10" />
                <div className="mt-4 flex items-center justify-between gap-3">
                  {dateLabel ? <time className="font-heading text-sm text-black/45">{dateLabel}</time> : <span />}
                  <span className="inline-flex items-center gap-1 font-heading text-sm font-medium text-black transition group-hover:text-weecomi-orange">
                    {t("readMore")}
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </>
            ) : null}
          </div>
        </MagneticHover>
      </Link>
    </article>
  );
}
