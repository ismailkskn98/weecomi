import { cn } from "@/lib/utils";
import SectionIntroMotion from "./section-intro-motion";

const titleBySize = {
  default: "mt-5 font-heading text-3xl font-normal normal-case leading-[1.12] tracking-[-0.03em] text-weecomi-dark-gray md:text-4xl lg:text-[2.75rem]",
  compact: "mt-5 font-heading text-3xl font-normal normal-case leading-[1.12] tracking-[-0.03em] text-weecomi-dark-gray md:text-4xl lg:text-[2.25rem]",
};

const defaultSubtitleClass = "mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg";

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  size = "default",
  className,
  children,
}) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "text-left", className)}>
      <SectionIntroMotion
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        titleClassName={titleBySize[size] ?? titleBySize.default}
        subtitleClassName={defaultSubtitleClass}
      />
      {children}
    </div>
  );
}
