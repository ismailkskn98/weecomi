"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Agero Work-Single / Blog-Single style page hero (buttonless).
 * Title helpers live in page-hero-utils.js (shared, server-safe).
 */
export default function PageHero({
  titleRows = [],
  subtitle,
  mediaSrc,
  mediaAlt = "",
  children,
  className,
}) {
  const rows = normalizeRows(titleRows);

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-b-[32px] bg-[#f0f0f0] px-4 pb-16 pt-36 md:px-6 md:pb-22 md:pt-44",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-300 flex-col items-center",
          mediaSrc ? "gap-10 md:gap-13" : "gap-6 md:gap-7",
        )}
      >
        <div className="flex w-full flex-col items-center gap-6 md:gap-7">
          <h1 className="flex w-full flex-col items-center gap-1 font-display text-[clamp(1.9rem,4.8vw,4.5rem)] leading-[1.08] tracking-[-0.03em] text-[#131313] md:gap-0">
            {rows.map((row, rowIdx) => (
              <span
                key={rowIdx}
                className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 sm:flex-nowrap sm:gap-x-3.5 md:gap-x-4"
              >
                {row.map((seg, segIdx) => {
                  if (seg.image) {
                    return (
                      <InlineHeroImage
                        key={`img-${rowIdx}-${segIdx}`}
                        src={seg.image}
                        alt={seg.alt || ""}
                        shape={seg.shape || "pill"}
                        fit={seg.fit || "cover"}
                        delay={rowIdx * 0.35 + segIdx * 0.15}
                      />
                    );
                  }

                  return (
                    <span
                      key={`txt-${rowIdx}-${segIdx}`}
                      className={cn(
                        "whitespace-nowrap",
                        seg.tone === "accent" && "text-weecomi-orange",
                        seg.tone === "muted" && "text-[#5c5c5c]",
                      )}
                    >
                      {seg.text}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          {subtitle ? (
            <p className="mx-auto max-w-[36rem] text-center text-[15px] leading-6 text-[#5c5c5c] md:text-base md:leading-7">
              {subtitle}
            </p>
          ) : null}
        </div>

        {mediaSrc ? (
          <div className="relative aspect-video w-full max-w-275 overflow-hidden rounded-[24px] bg-[#e8e8e8]">
            <Image
              src={mediaSrc}
              alt={mediaAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1100px) 100vw, 1100px"
              priority
            />
          </div>
        ) : null}

        {children}
      </div>
    </section>
  );
}

function InlineHeroImage({ src, alt, shape = "pill", fit = "cover", delay = 0 }) {
  const isCircle = shape === "circle";

  return (
    <span
      className={cn(
        "page-hero-chip relative inline-block shrink-0 overflow-hidden align-middle will-change-transform",
        "shadow-[0_1px_2px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.04)]",
        fit === "contain" && "bg-white",
        isCircle
          ? "h-[52px] w-[52px] rounded-full md:h-16 md:w-16"
          : "h-[52px] w-[66px] rounded-full md:h-16 md:w-[81px]",
      )}
      style={{ animationDelay: `${delay}s` }}
      aria-hidden={alt ? undefined : true}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(fit === "contain" ? "object-contain p-1.5" : "object-cover")}
        sizes="96px"
        priority
      />
    </span>
  );
}

function normalizeRows(titleRows) {
  return titleRows.map((row) => {
    if (typeof row === "string") {
      return [{ text: row, tone: "default" }];
    }
    if (!Array.isArray(row)) {
      if (row?.image) return [row];
      if (row?.text) return [{ text: row.text, tone: row.tone || "default" }];
      return [];
    }
    return row
      .map((seg) => {
        if (typeof seg === "string") return { text: seg, tone: "default" };
        if (seg?.type === "thumbnail") {
          return { image: seg.src, alt: seg.alt, shape: seg.shape || "circle", fit: seg.fit };
        }
        if (seg?.type === "accent") return { text: seg.text, tone: "accent" };
        if (seg?.type === "muted") return { text: seg.text, tone: "muted" };
        return seg;
      })
      .filter(Boolean);
  });
}
