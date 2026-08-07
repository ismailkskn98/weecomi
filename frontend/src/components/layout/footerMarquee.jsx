import { cn } from "@/lib/utils";

function MarqueeGroup({ tags, ariaHidden = false, tone = "light", elementClassName = "" }) {
  const items = [...tags, ...tags];
  const isDark = tone === "dark";

  return (
    <div className="flex shrink-0 items-center gap-3.5 pr-3.5" aria-hidden={ariaHidden || undefined}>
      {items.map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          className={cn(
            "shrink-0 rounded-lg border px-6.5 py-3.5 font-heading text-[11px] font-medium",
            isDark ? "border-white/12 bg-white/[0.04] text-white/55" : "border-black/10 bg-[#f4f4f2] text-muted-foreground",
            elementClassName,
          )}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function FooterMarquee({ tags = [], pauseOnHover = false, tone = "light", elementClassName = "" }) {
  if (!tags.length) return null;

  return (
    <div className="relative min-w-0 max-w-full" aria-hidden>
      <div className="marquee-fade overflow-hidden py-3 md:py-3.5">
        <div className={`marquee-track flex w-max max-w-none items-center${pauseOnHover ? " marquee-track-pause-hover" : ""}`}>
          <MarqueeGroup tags={tags} tone={tone} elementClassName={elementClassName} />
          <MarqueeGroup tags={tags} tone={tone} ariaHidden elementClassName={elementClassName} />
        </div>
      </div>
    </div>
  );
}
