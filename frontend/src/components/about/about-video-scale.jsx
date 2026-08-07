"use client";

import { useEffect, useRef } from "react";
import { useGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { HIKARI_HERO_MD } from "@/data/hikariImages";

const ABOUT_VIDEO_SRC = "/video/about-video.mp4";
const ABOUT_VIDEO_POSTER = HIKARI_HERO_MD;

/**
 * Flexio About Video:
 * - Tall track + GSAP-pinned 100vh stage
 * - Scale 1.5 → 1 while pinned
 * - Next sheet scrolls over the pinned video (large overlap)
 * @see https://flexio.framer.website/about-us
 */
export default function AboutVideoScale({ captions = [], className }) {
  const videoRef = useRef(null);

  const scopeRef = useGsap((gsap, ScrollTrigger, root) => {
    const pin = root.querySelector("[data-video-pin]");
    const frame = root.querySelector("[data-video-scale]");
    const captionEls = gsap.utils.toArray(root.querySelectorAll("[data-video-caption]"));
    if (!pin || !frame) return;

    const mobile = ScrollTrigger.isTouch === 1 || window.matchMedia("(max-width: 767px)").matches;
    const fromScale = mobile ? 1.25 : 1.5;

    gsap.set(frame, { scale: fromScale });
    if (captionEls.length) gsap.set(captionEls, { opacity: 0, y: 28 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        pin,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(frame, { scale: 1, ease: "none" }, 0);

    captionEls.forEach((el, index) => {
      const slot = 1 / Math.max(captionEls.length, 1);
      const enter = index * slot + 0.05;
      const hold = enter + slot * 0.45;
      const leave = enter + slot * 0.75;

      tl.to(el, { opacity: 1, y: 0, duration: 0.12, ease: "none" }, enter);
      if (index < captionEls.length - 1) {
        tl.to(el, { opacity: 0, y: -20, duration: 0.1, ease: "none" }, leave);
      } else {
        tl.to(el, { opacity: 1, duration: 0.01 }, hold);
      }
    });
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    video.muted = true;
    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise?.catch) playPromise.catch(() => {});
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
    };
  }, []);

  return (
    <section
      ref={scopeRef}
      className={cn("relative h-[260vh] w-full md:h-[300vh]", className)}
      aria-label="About video"
    >
      <div data-video-pin className="relative z-0 h-screen w-full overflow-hidden bg-weecomi-dark-gray">
        <div data-video-scale className="absolute inset-0 origin-center will-change-transform">
          <div className="absolute inset-0 overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={ABOUT_VIDEO_POSTER}
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={ABOUT_VIDEO_SRC} type="video/mp4" />
            </video>
            <div
              className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center"
              style={{ backgroundImage: `url(${ABOUT_VIDEO_POSTER})` }}
              aria-hidden
            />
          </div>
        </div>

        {/* Soft veil so overlay text stays readable */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-black/35" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-weecomi-dark-gray/55 via-transparent to-weecomi-dark-gray/25" />

        {captions.length > 0 ? (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6">
            <div className="relative mx-auto w-full max-w-3xl text-center">
              {captions.map((caption) => (
                <p
                  key={caption}
                  data-video-caption
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 font-heading text-[clamp(1.5rem,4.5vw,3rem)] leading-display text-white drop-shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
                >
                  {caption}
                </p>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
