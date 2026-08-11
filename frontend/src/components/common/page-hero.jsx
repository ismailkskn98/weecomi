import { Link } from "@/i18n/navigation";
import ActionButton from "@/components/common/actionButton";
import HeroReveal, { HeroRevealItem } from "@/components/home/hero/hero-reveal";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { cn } from "@/lib/utils";

/**
 * Inner-page hero — Hero2 + Figma corporate page rhythm:
 * large title top-left, lead under title, body + CTAs on the right.
 */
export default function PageHero({ title, titleLines, lead, subtitle, description, ctaPrimary, ctaSecondary, className, children }) {
  const lines = normalizeLines(titleLines, title);
  const body = description || subtitle;
  const underTitle = lead || (description ? subtitle : null);
  const showAside = Boolean(body || ctaPrimary || ctaSecondary);

  return (
    <HeroReveal className={cn("relative overflow-x-hidden bg-[#f6f7f8] pb-14 pt-28 md:pb-16 md:pt-32 lg:pb-20 lg:pt-[7.25rem] xl:pb-24 xl:pt-[7.75rem]", className)}>
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 42% 38% at 38% 42%, rgba(111,164,199,0.45), transparent 70%)",
            "radial-gradient(ellipse 36% 34% at 52% 48%, rgba(240,159,47,0.28), transparent 68%)",
            "radial-gradient(ellipse 30% 28% at 64% 40%, rgba(198,57,39,0.14), transparent 70%)",
            "radial-gradient(ellipse 50% 40% at 48% 55%, rgba(52,108,146,0.12), transparent 72%)",
          ].join(","),
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage: "linear-gradient(rgba(13,13,13,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(13,13,13,0.35) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <TextureOverlay texture="noise" tone="dark" opacity={0.05} className="z-0" />

      <div className="relative z-10 gridContainer w-full">
        <div className="flex w-full flex-col gap-10 md:gap-12 lg:gap-14 xl:gap-16">
          <div className="w-full max-w-[min(100%,74rem)]">
            <HeroRevealItem delay={0.06} y={36} fade={false} duration={0.7}>
              <h1 className="font-heading text-[2.35rem] font-normal leading-[1.14] tracking-normal text-weecomi-dark-gray md:text-[3.75rem] lg:text-[4.25rem] xl:text-[5rem] xl:leading-[1.12] 2xl:text-[5.75rem] 2xl:leading-[1.1]">
                {lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            </HeroRevealItem>

            {underTitle ? (
              <HeroRevealItem delay={0.18} y={24}>
                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-weecomi-dark-gray/65 md:mt-6 md:text-base md:leading-7 lg:max-w-2xl">{underTitle}</p>
              </HeroRevealItem>
            ) : null}
          </div>

          {showAside ? (
            <div className="flex w-full flex-col gap-5 md:ml-auto md:max-w-lg md:items-end md:text-right lg:max-w-xl xl:max-w-[34rem]">
              {body ? (
                <HeroRevealItem delay={0.28} y={24}>
                  <p className="text-base leading-relaxed text-weecomi-dark-gray/80 md:text-lg md:leading-7">{body}</p>
                </HeroRevealItem>
              ) : null}

              {ctaPrimary || ctaSecondary ? (
                <HeroRevealItem delay={0.36} y={20} className="flex flex-wrap items-center gap-4 md:justify-end md:gap-5">
                  {ctaPrimary?.href && ctaPrimary?.label ? (
                    <ActionButton href={ctaPrimary.href} variant="primary" size="md" showArrow className="min-h-11 px-4 py-2.5 text-[13px] md:px-5 md:py-3 md:text-sm">
                      {ctaPrimary.label}
                    </ActionButton>
                  ) : null}
                  {ctaSecondary?.href && ctaSecondary?.label ? (
                    <Link
                      href={ctaSecondary.href}
                      className="font-heading text-sm font-normal text-weecomi-dark-gray underline decoration-weecomi-dark-gray/35 underline-offset-4 transition hover:decoration-weecomi-orange hover:text-weecomi-orange md:text-base"
                    >
                      {ctaSecondary.label}
                    </Link>
                  ) : null}
                </HeroRevealItem>
              ) : null}
            </div>
          ) : null}

          {children}
        </div>
      </div>
    </HeroReveal>
  );
}

function normalizeLines(titleLines, title) {
  if (Array.isArray(titleLines) && titleLines.length) return titleLines.map(String).filter(Boolean);
  if (typeof title === "string" && title.trim()) return [title.trim()];
  return [""];
}
