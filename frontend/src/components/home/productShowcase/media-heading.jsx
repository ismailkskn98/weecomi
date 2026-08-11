import { cn } from "@/lib/utils";

/** Minimal right-column label — same style on every showcase card */
export default function ShowcaseMediaHeading({ children, className }) {
  return (
    <p className={cn("font-heading text-sm tracking-[0.06em] text-weecomi-dark-gray/70 md:text-[0.95rem] lg:text-base", className)}>
      {children}
    </p>
  );
}
