import { cn } from "@/lib/utils";
import SectionTag from "./section-tag";
import BlurText from "@/components/ui/blur-text";

export default function SectionHeader({ eyebrow, title, subtitle, align = "center", tagTone = "muted", className, children }) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-xl text-left", className)}>
      {eyebrow ? <SectionTag tone={tagTone}>{eyebrow}</SectionTag> : null}
      {title ? (
        <h2 className={cn("mt-5 font-heading text-3xl font-normal leading-display text-weecomi-dark-gray md:text-4xl lg:text-[2.75rem]", !eyebrow && "mt-0")}>
          <BlurText text={title} delay={30} stepDuration={0.25} direction="bottom" animateBy="letters" />
        </h2>
      ) : null}
      {subtitle ? <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{subtitle}</p> : null}
      {children}
    </div>
  );
}
