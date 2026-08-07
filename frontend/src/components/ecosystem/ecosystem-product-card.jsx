"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import CursorTracker from "@/components/animata/container/cursor-tracker";
import { productVisuals } from "@/data/productVisuals";
import { getProductCoverImage } from "@/data/productImages";
import { cn } from "@/lib/utils";

function getPreviewImage(productId, index, image) {
  if (image) return image;
  if (productId) return getProductCoverImage(productId);
  return getProductCoverImage("weenetwork");
}

/**
 * Agero Services row:
 * [ Title ] | [ Image + dark tags ] | [ Description + meta rows ]
 */
export default function EcosystemProductCard({
  href,
  eyebrow,
  index,
  nameCaps,
  title,
  description,
  logo,
  image,
  productId,
  ctaLabel,
  metrics = [],
  features = [],
  compact = false,
  className,
}) {
  const visual = productId ? productVisuals[productId] : null;
  const thumb = logo || visual?.logo || null;
  const safeIndex = typeof index === "number" ? index : 1;
  const previewImage = getPreviewImage(productId, safeIndex, image);
  const visibleMetrics = metrics.slice(0, 2);
  const visibleFeatures = features.slice(0, 3);
  const leftTitle = nameCaps || eyebrow || title;

  const row = (
    <div
      className={cn(
        "group/row border-t border-black/10 py-10 transition-colors md:py-12",
        compact && "py-7 md:py-9",
        className,
      )}
    >
      <div
        className={cn(
          "grid gap-6 lg:grid-cols-[minmax(7.5rem,0.28fr)_minmax(0,0.95fr)_minmax(0,0.72fr)] lg:items-start lg:gap-10",
          compact && "lg:gap-8",
        )}
      >
        {/* Left — product name */}
        <div className="pt-1">
          <h3 className="font-heading text-[1.05rem] leading-snug text-weecomi-dark-gray md:text-[1.15rem]">
            {leftTitle}
          </h3>
        </div>

        {/* Middle — image + tags */}
        <div className="space-y-4">
          <div
            className={cn(
              "relative aspect-5/4 overflow-hidden rounded-[22px] bg-[#e4e4e4] md:rounded-[26px]",
              compact ? "min-h-44" : "min-h-52 md:min-h-64",
            )}
          >
            <Image
              src={previewImage}
              alt=""
              fill
              className="object-cover transition duration-500 group-hover/row:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 38vw"
            />
            {thumb ? (
              <div className="absolute bottom-3.5 left-3.5 size-11 overflow-hidden rounded-xl bg-white/95 shadow-md md:size-12">
                <Image src={thumb} alt="" fill className="object-contain p-2" sizes="48px" />
              </div>
            ) : null}
          </div>

          {visibleFeatures.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {visibleFeatures.map((feature) => (
                <span
                  key={feature}
                  className="rounded-full bg-[#2a2a2a] px-3.5 py-1.5 font-heading text-[11px] leading-none text-white"
                >
                  {feature}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {/* Right — description + metrics */}
        <div className="flex flex-col lg:pt-1">
          {description ? (
            <p className="text-[0.95rem] leading-relaxed text-[#5c5c5c] md:text-base md:leading-7">
              {description}
            </p>
          ) : null}

          {visibleMetrics.length > 0 ? (
            <dl className="mt-8 space-y-3.5 border-t border-black/10 pt-5">
              {visibleMetrics.map((metric) => (
                <div
                  key={`${metric.label}-${metric.value}`}
                  className="flex items-baseline justify-between gap-4 font-heading text-[13px] text-weecomi-dark-gray"
                >
                  <dt className="text-[#6b6b6b]">{metric.label}</dt>
                  <dd className="text-right text-weecomi-dark-gray">{metric.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {ctaLabel && !visibleMetrics.length ? (
            <p className="mt-6 font-heading text-xs text-weecomi-dark-gray/50 transition group-hover/row:text-weecomi-orange">
              {ctaLabel}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );

  if (!href) return row;

  const linked = (
    <Link href={href} className={cn("block", ctaLabel && "md:cursor-none")}>
      {row}
    </Link>
  );

  if (!ctaLabel) return linked;

  return (
    <CursorTracker label={ctaLabel} labelClassName="bg-weecomi-orange text-white" className="block">
      {linked}
    </CursorTracker>
  );
}

export function SolutionAreaCard({ href, index, title, description, image, products = [], ctaLabel }) {
  const card = (
    <div className="grid overflow-hidden rounded-[18px] border border-black/6 bg-weecomi-dark-gray text-white shadow-[0_28px_70px_-44px_rgba(13,13,13,0.4)] md:grid-cols-[1.05fr_0.95fr]">
      <div className="flex flex-col justify-between p-6 md:p-8">
        <div>
          <span className="font-heading text-[11px] text-weecomi-orange">{String(index).padStart(2, "0")}</span>
          <h3 className="mt-4 font-heading text-[1.5rem] leading-display md:text-[1.85rem]">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/60 md:text-[0.95rem]">{description}</p>
        </div>
        {products.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {products.map((name) => (
              <span key={name} className="rounded-md border border-white/15 bg-white/4 px-2.5 py-1 font-heading text-[10px] text-white/85">
                {name}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div className="relative min-h-45 md:min-h-60">
        <Image src={image} alt={title} fill className="object-cover transition duration-500 group-hover/cursor:scale-[1.03]" sizes="(max-width: 768px) 100vw, 45vw" />
        <div className="absolute inset-0 bg-linear-to-l from-transparent to-weecomi-dark-gray/20" />
      </div>
    </div>
  );

  const linked = (
    <Link href={href} className={cn("block", ctaLabel && "md:cursor-none")}>
      {card}
    </Link>
  );

  if (!ctaLabel) return linked;

  return (
    <CursorTracker label={ctaLabel} labelClassName="bg-weecomi-orange text-white" className="block">
      {linked}
    </CursorTracker>
  );
}
