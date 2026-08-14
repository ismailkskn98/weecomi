import Image from "next/image";
import { productVisuals } from "@/data/productVisuals";
import { getProductCoverImage } from "@/data/productImages";
import { cn } from "@/lib/utils";
import CursorLink from "./cursor-link";

/**
 * Editorial product row (Server): name | image + tags | description + metrics.
 * CursorTracker isolated in CursorLink client leaf.
 */
export default function ProductRow({
  href,
  nameCaps,
  title,
  description,
  productId,
  image,
  ctaLabel,
  metrics = [],
  features = [],
  compact = false,
  comingSoonLabel,
  className,
}) {
  const visual = productId ? productVisuals[productId] : null;
  const thumb = visual?.logo || null;
  const previewImage = image || getProductCoverImage(productId || "weenetwork");
  const visibleMetrics = metrics.slice(0, 2);
  const visibleFeatures = features.slice(0, 3);
  const leftTitle = nameCaps || title;

  const row = (
    <div
      className={cn(
        "group/row border-t border-black/10 py-10 transition-colors motion-safe:duration-500 md:py-12",
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
        <div className="pt-1">
          <h3 className="font-heading text-[1.05rem] leading-snug text-weecomi-dark-gray md:text-[1.15rem]">{leftTitle}</h3>
          {comingSoonLabel ? (
            <p className="mt-2 font-heading text-[11px] text-weecomi-orange">{comingSoonLabel}</p>
          ) : null}
        </div>

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
              className="object-cover motion-safe:transition motion-safe:duration-500 motion-safe:group-hover/row:scale-[1.03]"
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
                <span key={feature} className="rounded-full bg-[#2a2a2a] px-3.5 py-1.5 font-heading text-[11px] leading-none text-white">
                  {feature}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col lg:pt-1">
          {description ? (
            <p className="text-[0.95rem] leading-relaxed text-[#5c5c5c] md:text-base md:leading-7">{description}</p>
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
        </div>
      </div>
    </div>
  );

  return (
    <CursorLink href={href} label={ctaLabel}>
      {row}
    </CursorLink>
  );
}
