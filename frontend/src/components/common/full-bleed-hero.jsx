import Image from "next/image";
import { BracketTag } from "@/components/home/_shared";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import RotatingText from "@/components/ui/rotating-text";
import { HIKARI_HERO } from "@/data/hikariImages";
import { cn } from "@/lib/utils";

/**
 * Full-bleed Hikari hero used on About / Ecosystem / Solutions / Gallery.
 * Brand-forward: image plane + dark wash + display title.
 */
export default function FullBleedHero({
  eyebrow,
  title,
  subtitle,
  image = HIKARI_HERO,
  rotatingWords = [],
  rotatingPrefix = "WEECOMI —",
  align = "end",
  minHeightClassName = "min-h-[72vh]",
  priority = true,
  children,
  className,
}) {
  const isCenter = align === "center";
  const vertical = align === "center" ? "justify-center" : "justify-end";

  return (
    <section className={cn("relative overflow-hidden bg-weecomi-dark-gray text-white", minHeightClassName, className)}>
      <Image src={image} alt="" fill priority={priority} className="object-cover opacity-45" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-weecomi-dark-gray via-weecomi-dark-gray/85 to-weecomi-dark-gray/35" />
      <TextureOverlay texture="noise" tone="light" opacity={0.35} className="z-[1]" />
      <div className="gridContainer relative z-10 w-full">
        <div className={cn("flex flex-col pb-14 pt-32 md:pb-20 md:pt-36", minHeightClassName, vertical, isCenter && "items-center text-center")}>
          {eyebrow ? <BracketTag className="text-weecomi-orange">{eyebrow}</BracketTag> : null}
          <h1
            className={cn(
              "mt-5 font-display text-[clamp(2.5rem,6vw,5rem)] leading-display tracking-[-0.03em] text-white",
              isCenter ? "max-w-4xl" : "max-w-4xl",
            )}
          >
            {title}
          </h1>
          {subtitle ? (
            <p className={cn("mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg", isCenter && "mx-auto")}>{subtitle}</p>
          ) : null}
          {rotatingWords.length ? (
            <p className={cn("mt-8 font-heading text-xs text-white/50", isCenter && "mx-auto")}>
              {rotatingPrefix}{" "}
              <RotatingText words={rotatingWords} className="min-w-[10rem]" textClassName="text-weecomi-orange" />
            </p>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}
