import { cn } from "@/lib/utils";
import SectionIntroMotion from "./section-intro-motion";

const defaultTitleClass =
  "mt-5 font-heading text-3xl font-normal leading-display text-weecomi-dark-gray md:text-4xl lg:text-[2.75rem]";
const defaultSubtitleClass = "mt-4 text-base leading-relaxed text-muted-foreground md:text-lg";

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  eyebrowClassName,
  titleClassName,
  subtitleClassName,
  children,
}) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "text-left", className)}>
      <SectionIntroMotion
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        eyebrowClassName={eyebrowClassName}
        titleClassName={cn(defaultTitleClass, titleClassName)}
        subtitleClassName={cn(defaultSubtitleClass, subtitleClassName)}
      />
      {children}
    </div>
  );
}
