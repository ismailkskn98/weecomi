import ActionButton from "@/components/common/actionButton";
import { BracketTag } from "@/components/home/_shared";
import { cn } from "@/lib/utils";

export default function EditorialPageHero({
  eyebrow,
  title,
  subtitle,
  action,
  ctaHref,
  ctaLabel,
  background,
  className,
  containerClassName,
  rowClassName,
  titleClassName,
  asideClassName,
  subtitleClassName,
  footerClassName,
  topLine = true,
  children,
}) {
  const defaultAction =
    !action && ctaHref && ctaLabel ? (
      <ActionButton href={ctaHref} variant="primary" showArrow className="mt-8">
        {ctaLabel}
      </ActionButton>
    ) : null;

  return (
    <section className={cn("relative overflow-hidden pb-24 pt-40 md:pb-32 md:pt-48", className)}>
      {topLine ? <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-black/6" /> : null}
      {background}

      <div className={cn("relative z-10 mx-auto max-w-[1240px] px-4 md:px-6", containerClassName)}>
        {eyebrow ? <BracketTag className="text-weecomi-orange">{eyebrow}</BracketTag> : null}

        <div className={cn("mt-8 flex flex-col gap-12 lg:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16", rowClassName)}>
          <h1 className={cn("max-w-[920px] font-display text-[clamp(2.85rem,7.2vw,5.75rem)] leading-[1.08] tracking-[-0.03em] text-weecomi-dark-gray", titleClassName)}>
            {title}
          </h1>

          {(subtitle || action || defaultAction) ? (
            <div className={cn("w-full max-w-sm shrink-0 lg:pb-3", asideClassName)}>
              {subtitle ? <p className={cn("text-base leading-[1.7] text-muted-foreground md:text-lg md:leading-[1.75]", subtitleClassName)}>{subtitle}</p> : null}
              {action || defaultAction}
            </div>
          ) : null}
        </div>

        {children ? <div className={cn("mt-12 md:mt-14", footerClassName)}>{children}</div> : null}
      </div>
    </section>
  );
}
