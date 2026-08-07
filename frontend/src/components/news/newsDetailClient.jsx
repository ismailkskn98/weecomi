"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getPublicNewsBySlug, listPublicNews } from "@/lib/api/news";
import { fallbackNews } from "@/data/products";
import { Link } from "@/i18n/navigation";
import ActionButton from "@/components/common/actionButton";
import NewsCard from "@/components/news/newsCard";
import NewsShareBar from "@/components/news/news-share-bar";
import { formatNewsDate, getNewsCategoryLabel } from "@/data/newsCategories";

function authorInitials(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "W";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
}

function formatDateCaps(value, locale) {
  const label = formatNewsDate(value, locale);
  if (!label) return "";
  const tag = locale === "tr" ? "tr-TR" : locale === "az" ? "az-AZ" : "en-US";
  return label.toLocaleUpperCase(tag);
}

/** Hikari blog detail layout (node 28862:22924) */
export default function NewsDetailClient({ slug }) {
  const t = useTranslations("News");
  const locale = useLocale();
  const [item, setItem] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    getPublicNewsBySlug(slug, locale)
      .then(setItem)
      .catch(() => {
        setItem(fallbackNews.find((entry) => entry.slug === slug) || null);
      });
  }, [slug, locale]);

  useEffect(() => {
    listPublicNews({ locale, page: 1, pageSize: 6 })
      .then((data) => {
        const items = (data?.items || []).filter((entry) => entry.slug !== slug).slice(0, 3);
        setRelated(items.length ? items : fallbackNews.filter((entry) => entry.slug !== slug).slice(0, 3));
      })
      .catch(() => {
        setRelated(fallbackNews.filter((entry) => entry.slug !== slug).slice(0, 3));
      });
  }, [slug, locale]);

  if (!item) {
    return <p className="text-muted-foreground">{t("empty")}</p>;
  }

  const categoryLabel = getNewsCategoryLabel(item.category, locale);
  const dateLabel = formatDateCaps(item.publishedAt, locale);
  const authorName = item.author || "WeeComi";
  const authorImageUrl = item.authorImageUrl || null;

  return (
    <div>
      <article>
        {/* Meta + title — Figma: left-aligned category + date, large display title */}
        <div className="max-w-5xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {categoryLabel ? (
              <span className="font-heading text-[11px] font-medium text-weecomi-dark-gray md:text-xs">
                {categoryLabel.toLocaleUpperCase(locale === "tr" ? "tr-TR" : "en-US")}
              </span>
            ) : null}
            {dateLabel ? (
              <time className="font-heading text-[11px] font-medium text-muted-foreground md:text-xs">
                {dateLabel}
              </time>
            ) : null}
          </div>

          <h1 className="mt-5 font-display text-[clamp(2.2rem,5.5vw,4.25rem)] leading-display tracking-[-0.03em] text-weecomi-dark-gray md:mt-6">
            {item.title}
          </h1>
        </div>

        {/* Cover — full content width, rounded */}
        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-[18px] bg-[#f5f5f5] md:mt-10">
          {item.coverImageUrl ? (
            <Image
              src={item.coverImageUrl}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1200px"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-weecomi-orange/25 via-[#f5f5f5] to-weecomi-dark-gray/15" />
          )}
        </div>

        {/* Author + share bar — under image */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.06] pb-6 md:mt-8 md:pb-8">
          <div className="flex items-center gap-3">
            {authorImageUrl ? (
              <span className="relative size-10 shrink-0 overflow-hidden rounded-full bg-[#ebebeb]">
                <Image src={authorImageUrl} alt="" fill className="object-cover" sizes="40px" />
              </span>
            ) : (
              <span
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-weecomi-dark-gray font-heading text-xs font-medium text-white"
                aria-hidden
              >
                {authorInitials(authorName)}
              </span>
            )}
            <p className="font-heading text-[12px] font-medium text-weecomi-dark-gray md:text-[13px]">
              {t("author")}: {authorName}
            </p>
          </div>
          <NewsShareBar title={item.title} />
        </div>

        {/* Body */}
        {item.content ? (
          <div className="mx-auto mt-10 max-w-3xl whitespace-pre-wrap text-base leading-8 text-weecomi-dark-gray md:mt-14 md:text-lg md:leading-9">
            {item.content}
          </div>
        ) : item.summary ? (
          <p className="mx-auto mt-10 max-w-3xl text-lg leading-8 text-muted-foreground md:mt-14">{item.summary}</p>
        ) : null}
      </article>

      {/* More blogs */}
      {related.length ? (
        <section className="mt-20 border-t border-black/[0.06] pt-14 md:mt-28 md:pt-20">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <h2 className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] leading-display text-weecomi-dark-gray">
              {t("moreNews")}
            </h2>
            <ActionButton href="/news" variant="inverse" showArrow>
              {t("seeAll")}
            </ActionButton>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {related.map((entry) => (
              <NewsCard key={entry.id} item={entry} locale={locale} viewLabel={t("view")} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
