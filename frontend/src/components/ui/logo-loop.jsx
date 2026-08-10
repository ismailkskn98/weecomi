import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Infinite logo strip — CSS marquee (globals.css).
 * No client hooks; safe as a Server Component when imported from server parents.
 *
 * Two equal LogoGroups + translateX(-50%). Images load eager so iOS Safari
 * does not leave the off-screen half empty until the loop resets.
 */
function LogoItem({ item, itemClassName, imageClassName, grayscale }) {
  if (item.type === "image" && item.src) {
    return (
      <div className={cn("group flex h-12 shrink-0 items-center justify-center px-5 md:h-14 lg:h-[clamp(2.75rem,3.2vw,4rem)]", itemClassName)}>
        <Image
          src={item.src}
          alt={item.alt || ""}
          width={160}
          height={56}
          sizes="140px"
          loading="eager"
          fetchPriority="low"
          decoding="async"
          className={cn(
            "h-8 w-auto max-w-[120px] object-contain transition duration-300 md:h-9 md:max-w-[140px]",
            grayscale && "grayscale group-hover:grayscale-0",
            imageClassName,
          )}
        />
      </div>
    );
  }

  return (
    <div className={cn("flex h-12 shrink-0 items-center px-4 md:h-14", itemClassName)}>
      <span className="rounded-md border border-border bg-white px-4 py-2 text-sm font-semibold text-weecomi-dark-gray/70">{item.label || item.alt}</span>
    </div>
  );
}

function LogoGroup({ logos, ariaHidden = false, itemClassName, imageClassName, grayscale }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined}>
      {logos.map((item, index) => (
        <LogoItem
          key={`${item.alt || item.label}-${index}`}
          item={item}
          itemClassName={itemClassName}
          imageClassName={imageClassName}
          grayscale={grayscale}
        />
      ))}
    </div>
  );
}

export default function LogoLoop({
  logos = [],
  className,
  itemClassName,
  imageClassName,
  grayscale = true,
  pauseOnHover = false,
  fade = true,
  "aria-label": ariaLabel,
}) {
  if (!logos.length) return null;

  return (
    <div className={cn("relative min-h-14 overflow-x-hidden overflow-y-visible md:min-h-16", fade && "marquee-fade", className)} aria-label={ariaLabel}>
      <div className={cn("marquee-track flex w-max items-center", pauseOnHover && "marquee-track-pause-hover")}>
        <LogoGroup logos={logos} itemClassName={itemClassName} imageClassName={imageClassName} grayscale={grayscale} />
        <LogoGroup logos={logos} ariaHidden itemClassName={itemClassName} imageClassName={imageClassName} grayscale={grayscale} />
      </div>
    </div>
  );
}
