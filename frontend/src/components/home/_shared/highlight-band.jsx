import { cn } from "@/lib/utils";
import SectionTag from "./section-tag";

export default function HighlightBand({
  eyebrow,
  items = [],
  className,
  tone = "orange",
}) {
  const tones = {
    orange: "bg-weecomi-orange text-weecomi-dark-gray",
    blue: "bg-weecomi-blue text-white",
    soft: "bg-[#f7f7f5] text-weecomi-dark-gray",
  };

  const isSoft = tone === "soft";
  const isBlue = tone === "blue";

  return (
    <section className={cn("relative overflow-hidden py-16 md:py-20", tones[tone] || tones.orange, className)}>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-40",
          isSoft
            ? "[background-image:radial-gradient(circle_at_15%_20%,rgba(52,108,146,0.08),transparent_40%)]"
            : "[background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_45%),radial-gradient(circle_at_85%_75%,rgba(13,13,13,0.08),transparent_40%)]",
        )}
      />
      <div className="gridContainer relative">
        {eyebrow ? (
          <div className="mb-10 text-center md:mb-12">
            <SectionTag tone={isBlue ? "light" : isSoft ? "muted" : "dark"}>{eyebrow}</SectionTag>
          </div>
        ) : null}

        <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
          {items.map((item) => (
            <div key={item.key || item.title} data-highlight-item className="text-center md:text-left">
              {item.value ? (
                <p
                  className={cn(
                    "text-3xl font-bold md:text-4xl",
                    isBlue ? "text-white" : "text-weecomi-dark-gray",
                  )}
                >
                  {item.value}
                </p>
              ) : null}
              <h3
                className={cn(
                  "text-lg font-bold uppercase md:text-xl",
                  item.value && "mt-2",
                  isBlue ? "text-white" : "text-weecomi-dark-gray",
                )}
              >
                {item.title}
              </h3>
              {item.description ? (
                <p
                  className={cn(
                    "mt-3 text-sm leading-relaxed md:text-[15px]",
                    isBlue ? "text-white/80" : isSoft ? "text-muted-foreground" : "text-weecomi-dark-gray/80",
                  )}
                >
                  {item.description}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
