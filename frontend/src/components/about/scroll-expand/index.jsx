"use client";

import ScrollExpand from "@/components/ui/scroll-expand";
import { HIKARI_HERO_MD } from "@/data/hikariImages";

const ABOUT_VIDEO_SRC = "/video/about-video.mp4";
const ABOUT_VIDEO_POSTER = HIKARI_HERO_MD;

/**
 * About sayfası için ScrollExpand denemesi (React Bits).
 * VideoScale yerine: scroll ile küçük frame → full-bleed video.
 * @see https://www.reactbits.dev/animations/scroll-expand
 */
export default function AboutScrollExpand({ title = "", scrollHint = "", children }) {
  return (
    <div className="relative w-full [&_.scroll-expand]:h-auto">
      <ScrollExpand
        mediaType="video"
        src={ABOUT_VIDEO_SRC}
        poster={ABOUT_VIDEO_POSTER}
        title={title}
        scrollHint={scrollHint}
        useWindowScroll
        startWidth={62}
        startHeight={74}
        startRadius={28}
        endRadius={0}
        mediaZoom={1.35}
        scrollDistance={1.2}
        holdDistance={0.35}
        smoothing={0.1}
        overlayScrim={0.92}
      >
        {children}
      </ScrollExpand>
    </div>
  );
}
