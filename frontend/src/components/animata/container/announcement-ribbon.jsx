"use client";

import Link from "next/link";

import Marquee from "@/components/animata/container/marquee";
import { cn } from "@/lib/utils";

function DefaultMessage() {
  return (
    <span>
      <span className="whitespace-nowrap px-12 font-heading font-light text-neutral-900">New components and live demos</span>
      <span className="text-neutral-900">&middot;</span>
    </span>
  );
}

/**
 * Animata Announcement Ribbon — sticky scrolling banner.
 * @see https://animata.design/docs/container/announcement-ribbon
 */
export default function AnnouncementRibbon({
  message,
  badge = "NEW",
  ctaText = "Learn more",
  ctaHref = "/docs/changelog/2026-05",
  repeat = 5,
  pauseOnHover = true,
  className,
  badgeContainerClassName,
  badgeClassName,
  trackClassName,
  ctaClassName,
  ...props
}) {
  const content = message ?? <DefaultMessage />;

  return (
    <div
      className={cn(
        "relative flex h-11 w-full min-w-0 max-w-full items-center overflow-hidden",
        "border-b border-black/8 bg-[#ffcc00]",
        className,
      )}
      {...props}
    >
      {badge ? (
        <div className={cn("relative z-30 flex shrink-0 items-center self-stretch border-r border-black/8 bg-inherit px-4", badgeContainerClassName)}>
          <span className={cn("rounded-full bg-black/10 px-2.5 py-px font-heading text-[10px] font-semibold uppercase text-neutral-900", badgeClassName)}>
            {badge}
          </span>
        </div>
      ) : null}

      <div className="min-w-0 flex-1 overflow-hidden">
        <Marquee
          repeat={repeat}
          pauseOnHover={pauseOnHover}
          applyMask={false}
          className={cn("max-w-full overflow-hidden p-0 [--duration:18s] [--gap:0px]", trackClassName)}
        >
          {content}
        </Marquee>
      </div>

      {ctaText && ctaHref ? (
        <Link
          href={ctaHref}
          className={cn(
            "group/cta relative z-30 flex shrink-0 items-center gap-1.5 self-stretch border-l border-black/8 bg-inherit px-4 font-heading text-[10px] font-semibold uppercase text-neutral-800/60 transition-colors hover:text-neutral-900",
            ctaClassName,
          )}
        >
          {ctaText}
          <svg
            className="h-3 w-3 transition-transform group-hover/cta:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
            role="presentation"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : null}
    </div>
  );
}
