import { cn } from "@/lib/utils";

export default function SectionTag({ children, className, tone = "muted" }) {
  const tones = {
    muted: "border-black/[0.08] bg-white text-muted-foreground",
    orange: "border-weecomi-orange/35 bg-weecomi-orange/10 text-weecomi-dark-gray",
    dark: "border-transparent bg-weecomi-dark-gray text-white",
    light: "border-white/25 bg-white/15 text-white",
  };

  return <p className={cn("inline-flex items-center rounded-full border px-3.5 py-1.5 font-heading text-[11px] font-normal", tones[tone] || tones.muted, className)}>{children}</p>;
}
