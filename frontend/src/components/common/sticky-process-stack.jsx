import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import BracketTag from "@/components/home/_shared/bracket-tag";

/**
 * Maison-style sticky process layout (Server Component).
 * Left heading sticks; right cards stack over each other via CSS sticky.
 * Sticky only from `lg` — mobile stays a simple vertical list.
 */
export function StickyProcessStack({
  bracketTag,
  title,
  subtitle,
  children,
  className,
  "aria-label": ariaLabel,
}) {
  return (
    <div
      className={cn("grid items-start gap-10 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16", className)}
      aria-label={ariaLabel}
    >
      <header className="max-w-xl lg:sticky lg:top-28 lg:self-start">
        {bracketTag ? <BracketTag>{bracketTag}</BracketTag> : null}
        <h2 className="mt-5 font-heading text-3xl leading-display text-weecomi-dark-gray md:text-5xl">{title}</h2>
        {subtitle ? <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{subtitle}</p> : null}
      </header>

      <ol className="flex list-none flex-col gap-5 p-0">{children}</ol>
    </div>
  );
}

/**
 * Single sticky process card. Same `top` as siblings → later cards cover earlier ones.
 */
export function StickyProcessCard({
  index,
  title,
  description,
  href,
  ctaLabel,
  metrics = [],
  disclaimer,
  logoSrc,
  logoAlt = "",
  className,
}) {
  const number = String(index).padStart(2, "0");

  const body = (
    <article
      className={cn(
        "rounded-[18px] border border-black/[0.06] bg-white/90 p-7 shadow-[0_28px_70px_-44px_rgba(13,13,13,0.24)] backdrop-blur-[2px] md:p-10",
        href && "transition hover:border-weecomi-orange/25",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="font-heading text-[2rem] text-weecomi-orange md:text-[2.5rem]" aria-hidden>
          {number}.
        </p>
        {logoSrc ? (
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-black/[0.06] bg-[#f7f8f9] md:size-14">
            <Image src={logoSrc} alt={logoAlt} width={56} height={56} className="size-8 object-contain md:size-9" />
          </div>
        ) : null}
      </div>

      <h3 className="mt-4 font-heading text-[1.75rem] leading-display text-weecomi-dark-gray md:text-[2.5rem]">{title}</h3>
      {description ? <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p> : null}
      {disclaimer ? <p className="mt-3 max-w-xl text-xs leading-relaxed text-muted-foreground/80">{disclaimer}</p> : null}

      {metrics.length > 0 ? (
        <div className="mt-7 border-t border-black/[0.08] pt-7 md:mt-10 md:pt-10">
          <div className="grid grid-cols-3 gap-4 md:gap-5">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <p className="font-heading text-[1.35rem] text-weecomi-dark-gray md:text-[1.75rem]">{metric.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {href && ctaLabel ? (
        <p className="mt-6 font-heading text-sm font-medium text-weecomi-orange md:mt-8">{ctaLabel}</p>
      ) : null}
    </article>
  );

  return (
    <li className="lg:sticky lg:top-28">
      {href ? (
        <Link
          href={href}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-weecomi-orange/40 focus-visible:ring-offset-2"
        >
          {body}
        </Link>
      ) : (
        body
      )}
    </li>
  );
}
