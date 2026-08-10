import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import StackCampaignCursor from "./stack-campaign-cursor";

export default function StackCampaignCard({
  index,
  title,
  metrics = [],
  image,
  imageAlt = "",
  media = null,
  brand = null,
  footer = null,
  href,
  disclaimer,
  cursorLabel,
  cursorLabelClassName,
  className,
  gridClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
  disclaimerClassName,
  footerClassName,
  mediaClassName,
  children,
  backgroundDiv = null,
  showIndex = true,
}) {
  const card = (
    <div
      className={cn(
        "relative grid overflow-hidden rounded-[18px] border border-black/[0.06] bg-white shadow-[0_28px_70px_-44px_rgba(13,13,13,0.24)] lg:grid-cols-[0.95fr_1.05fr]",
        href && "transition",
        gridClassName,
        !href && className,
      )}
    >
      {backgroundDiv ? backgroundDiv : null}
      <div className={cn("relative z-10 flex min-w-0 flex-col justify-between gap-24 lg:gap-36 p-7 lg:p-12", contentClassName)}>
        <div>
          {brand}
          {showIndex ? <p className={cn("font-heading text-[2rem] text-weecomi-orange lg:text-[2.5rem]", brand && "mt-5 lg:mt-6")}>{String(index).padStart(2, "0")}.</p> : null}
          <h3 className={cn("mt-4 font-heading text-[2rem] leading-display text-weecomi-dark-gray lg:text-[3.5rem]", !showIndex && brand && "mt-6 lg:mt-8", titleClassName)}>{title}</h3>
          {children ? <div className={cn("mt-5 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg", descriptionClassName)}>{children}</div> : null}
          {disclaimer ? <p className={cn("mt-4 max-w-xl text-xs leading-relaxed text-muted-foreground/80", disclaimerClassName)}>{disclaimer}</p> : null}
        </div>

        {footer ? (
          <div className={cn("mt-6 border-t border-black/[0.06] pt-5 lg:mt-8 lg:pt-6", footerClassName)}>{footer}</div>
        ) : metrics.length > 0 ? (
          <div className="mt-7 border-t border-black/[0.08] pt-7 lg:mt-13 lg:pt-13">
            <div className={cn("grid gap-x-4 gap-y-5", metrics.length > 3 ? "grid-cols-2" : "grid-cols-3")}>
              {metrics.map((metric) => (
                <div key={`${metric.value}-${metric.label}`} className="min-w-0">
                  <p className="font-heading text-[1.5rem] leading-none text-weecomi-dark-gray lg:text-[2rem]">{metric.value}</p>
                  <p className="mt-1.5 text-xs leading-snug text-muted-foreground lg:text-sm">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className={cn("relative min-h-64 min-w-0 overflow-hidden lg:min-h-96", mediaClassName)}>
        {media ? media : <Image src={image} alt={imageAlt} fill className="object-cover transition duration-500 group-hover/cursor:scale-[1.02]" sizes="(max-width: 768px) 100vw, 50vw" />}
      </div>
    </div>
  );

  if (!href) {
    return card;
  }

  const linked = (
    <Link href={href} className={cn("block", cursorLabel && "lg:cursor-none", className)}>
      {card}
    </Link>
  );

  if (!cursorLabel) {
    return linked;
  }

  return (
    <StackCampaignCursor label={cursorLabel} labelClassName={cursorLabelClassName}>
      {linked}
    </StackCampaignCursor>
  );
}
