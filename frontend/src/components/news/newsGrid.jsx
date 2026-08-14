"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import NewsCard from "@/components/news/newsCard";
import NewsCarousel from "@/components/news/newsCarousel";
import MagneticHover, { MagneticBadge } from "@/components/common/magneticHover";
import { listPublicNews } from "@/lib/api/news";
import { getFallbackNews } from "@/data/fallbackNews";
import { formatNewsDate, getNewsCategoryLabel, newsCategoryKeys } from "@/data/newsCategories";

export default function NewsPageClient() {
  const t = useTranslations("News");
  const locale = useLocale();
  const [category, setCategory] = useState("");
  const latestKey = `${locale}-latest`;
  const filteredKey = `${locale}-${category || "all"}`;
  const localizedFallback = useMemo(() => getFallbackNews(locale), [locale]);
  const [latestState, setLatestState] = useState(() => ({
    key: latestKey,
    items: getFallbackNews(locale),
    loading: true,
  }));
  const [filteredState, setFilteredState] = useState(() => ({
    key: filteredKey,
    items: getFallbackNews(locale),
    loading: true,
  }));

  useEffect(() => {
    let active = true;

    listPublicNews({ locale, page: 1, pageSize: 15 })
      .then((data) => {
        if (!active) return;
        setLatestState({
          key: latestKey,
          items: data?.items?.length ? data.items : localizedFallback,
          loading: false,
        });
      })
      .catch(() => {
        if (!active) return;
        setLatestState({
          key: latestKey,
          items: localizedFallback,
          loading: false,
        });
      });

    return () => {
      active = false;
    };
  }, [latestKey, locale, localizedFallback]);

  useEffect(() => {
    let active = true;

    listPublicNews({ locale, page: 1, pageSize: 24, category: category || undefined })
      .then((data) => {
        if (!active) return;
        setFilteredState({
          key: filteredKey,
          items: data?.items?.length ? data.items : !category ? localizedFallback : [],
          loading: false,
        });
      })
      .catch(() => {
        if (!active) return;
        setFilteredState({
          key: filteredKey,
          items: !category ? localizedFallback : [],
          loading: false,
        });
      });

    return () => {
      active = false;
    };
  }, [filteredKey, locale, category, localizedFallback]);

  const latestItems = useMemo(() => (latestState.key === latestKey ? latestState.items : localizedFallback), [latestKey, latestState, localizedFallback]);
  const filteredItems = useMemo(() => {
    if (filteredState.key === filteredKey) return filteredState.items;
    return !category ? localizedFallback : [];
  }, [category, filteredKey, filteredState, localizedFallback]);
  const loadingLatest = latestState.key !== latestKey || latestState.loading;
  const loadingFiltered = filteredState.key !== filteredKey || filteredState.loading;

  const featured = useMemo(() => latestItems.find((item) => item.isFeatured) || latestItems[0] || null, [latestItems]);

  const gridItems = useMemo(() => filteredItems.filter((item) => item.id !== featured?.id), [filteredItems, featured]);

  const carouselItems = useMemo(() => latestItems.slice(0, 15), [latestItems]);

  const filterOptions = useMemo(
    () => [{ key: "", label: t("allCategories") }, ...newsCategoryKeys.map((key) => ({ key, label: getNewsCategoryLabel(key, locale) }))],
    [locale, t],
  );

  const loading = loadingLatest || loadingFiltered;

  return (
    <div className="space-y-16 md:space-y-24">
      {featured ? (
        <Link href={`/news/${featured.slug}`} className="group block cursor-pointer">
          <MagneticHover
            className="grid items-center gap-8 overflow-hidden rounded-[18px] border border-black/[0.06] bg-[#f7f8f9] p-5 md:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10"
            badge={
              <MagneticBadge>
                {t("view")}
                <span aria-hidden>→</span>
              </MagneticBadge>
            }
          >
            <div className="order-2 lg:order-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-weecomi-orange/15 px-3.5 py-1.5 font-heading text-[11px] font-medium text-weecomi-dark-gray">
                  {t("featured")}
                </span>
                {featured.publishedAt ? (
                  <time className="font-heading text-xs text-muted-foreground">
                    {formatNewsDate(featured.publishedAt, locale)}
                  </time>
                ) : null}
              </div>
              <h2 className="mt-5 font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] leading-display text-weecomi-dark-gray transition group-hover:text-weecomi-orange">
                {featured.title}
              </h2>
              {featured.summary ? <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">{featured.summary}</p> : null}
              <p className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-medium text-weecomi-dark-gray transition group-hover:text-weecomi-orange">
                {t("readMore")}
                <span aria-hidden>→</span>
              </p>
            </div>

            <MagneticHover.Anchor className="order-1 aspect-[16/11] overflow-hidden rounded-xl bg-[#ebebeb] lg:order-2">
              {featured.coverImageUrl ? (
                <Image
                  src={featured.coverImageUrl}
                  alt={featured.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-weecomi-orange/25 via-[#f5f5f5] to-weecomi-dark-gray/20" />
              )}
            </MagneticHover.Anchor>
          </MagneticHover>
        </Link>
      ) : null}

      <div className="space-y-8">
        <div className="flex flex-wrap gap-2.5">
          {filterOptions.map((option) => {
            const active = category === option.key;
            return (
              <button
                key={option.key || "all"}
                type="button"
                onClick={() => setCategory(option.key)}
                className={`cursor-pointer rounded-full px-4 py-2.5 font-heading text-[12px] font-medium transition md:text-[13px] ${
                  active
                    ? "bg-weecomi-dark-gray text-white"
                    : "bg-[#f5f5f5] text-weecomi-dark-gray hover:bg-weecomi-orange/15 hover:text-weecomi-dark-gray"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {loading ? <p className="text-muted-foreground">{t("loading")}</p> : null}
        {!loading && !gridItems.length ? <p className="text-center text-muted-foreground">{t("empty")}</p> : null}

        {gridItems.length ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {gridItems.map((item) => (
              <NewsCard key={item.id} item={item} locale={locale} viewLabel={t("view")} />
            ))}
          </div>
        ) : null}
      </div>

      <NewsCarousel items={carouselItems} locale={locale} />
    </div>
  );
}
