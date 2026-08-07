"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Maximize2, Minimize2, Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

function extractVideoId(id) {
  if (id.includes("youtube.com") || id.includes("youtu.be")) {
    try {
      const url = new URL(id);
      if (id.includes("youtube.com")) {
        return url.searchParams.get("v") || "";
      }
      return url.pathname.slice(1);
    } catch (error) {
      console.error("Invalid YouTube URL:", error);
      return id;
    }
  }
  return id;
}

function buildEmbedSrc(videoId, start) {
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    iv_load_policy: "3",
    showinfo: "0",
    controls: "1",
  });
  if (typeof start === "number" && start > 0) {
    params.set("start", String(start));
  }
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

export function YouTubePlayer({
  videoId,
  title,
  playAriaLabel,
  defaultExpanded = false,
  customThumbnail,
  start,
  priority = false,
  className,
  containerClassName,
  expandedClassName,
  thumbnailClassName,
  thumbnailImageClassName,
  playButtonClassName,
  playIconClassName,
  titleClassName,
  controlsClassName,
  expandButtonClassName,
  backdropClassName,
  playerClassName,
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [playing, setPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  const actualVideoId = extractVideoId(videoId);
  const thumbnailUrl = customThumbnail || (actualVideoId ? `https://i.ytimg.com/vi/${actualVideoId}/hqdefault.jpg` : "");
  const isLocalThumbnail = typeof thumbnailUrl === "string" && thumbnailUrl.startsWith("/");
  const embedSrc = buildEmbedSrc(actualVideoId, start);
  const ariaLabel = playAriaLabel || title || "Play video";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!expanded) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setExpanded(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [expanded]);

  const openExpanded = () => setExpanded(true);
  const closeExpanded = () => setExpanded(false);

  const thumbnail = (
    <>
      <div className={cn("absolute inset-0 bg-gradient-to-br from-muted to-muted/80", thumbnailClassName)}>
        {thumbnailUrl ? (
          isLocalThumbnail ? (
            <Image
              src={thumbnailUrl}
              alt={title || "Video thumbnail"}
              fill
              sizes="(max-width: 768px) 100vw, 1180px"
              priority={priority}
              className={cn("object-cover opacity-70", thumbnailImageClassName)}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnailUrl}
              alt={title || "Video thumbnail"}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              decoding="async"
              className={cn("absolute inset-0 h-full w-full object-cover opacity-70", thumbnailImageClassName)}
            />
          )
        ) : null}
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
        <button
          type="button"
          className={cn(
            "relative flex size-16 items-center justify-center rounded-full border border-border/20 bg-background/80 p-0 backdrop-blur-sm transition md:size-20",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            playButtonClassName,
          )}
          onClick={() => setPlaying(true)}
          aria-label={ariaLabel}
        >
          <Play className={cn("h-6 w-6 translate-x-[2px] fill-primary text-primary md:h-8 md:w-8", playIconClassName)} />
        </button>

        {title ? (
          <h3
            className={cn(
              "mt-4 max-w-xs text-center text-sm font-medium text-secondary/90 md:max-w-md md:text-base",
              titleClassName,
            )}
          >
            {title}
          </h3>
        ) : null}
      </div>
    </>
  );

  const renderIframe = () => (
    <iframe
      src={embedSrc}
      title={title || "YouTube video"}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className="absolute inset-0 h-full w-full border-0"
    />
  );

  const overlay =
    mounted &&
    createPortal(
      <AnimatePresence>
        {expanded ? (
          <div className="fixed inset-0 z-[200]" role="dialog" aria-modal="true" aria-label={title || ariaLabel}>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={cn("absolute inset-0 cursor-default bg-black/75 backdrop-blur-sm", backdropClassName)}
              onClick={closeExpanded}
              aria-label="Close expanded video"
            />

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className={cn(
                  "pointer-events-auto relative w-full max-w-[1100px] overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl",
                  expandedClassName,
                )}
              >
                <div className="relative aspect-video w-full bg-black">
                  {!playing ? thumbnail : renderIframe()}

                  <ExpandControl
                    expanded
                    visible
                    onToggle={closeExpanded}
                    controlsClassName={controlsClassName}
                    expandButtonClassName={expandButtonClassName}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>,
      document.body,
    );

  return (
    <>
      <div className={cn("relative", className)}>
        <div
          className={cn(
            "overflow-hidden rounded-xl border bg-card text-card-foreground shadow-lg",
            expanded && "invisible",
            containerClassName,
          )}
        >
          <div
            className={cn("relative aspect-video bg-black", playerClassName)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {!playing ? thumbnail : null}

            {playing && !expanded ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="relative aspect-video max-h-full w-full">{renderIframe()}</div>
              </div>
            ) : null}

            <ExpandControl
              expanded={false}
              visible={!playing || isHovered}
              onToggle={openExpanded}
              controlsClassName={controlsClassName}
              expandButtonClassName={expandButtonClassName}
            />
          </div>
        </div>
      </div>

      {overlay}
    </>
  );
}

function ExpandControl({ expanded, visible, onToggle, controlsClassName, expandButtonClassName }) {
  if (!visible) return null;

  return (
    <div className={cn("absolute right-2 top-2 z-20", controlsClassName)}>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onToggle();
        }}
        className={cn(
          "flex size-8 items-center justify-center rounded-full border-0 bg-white/90 text-foreground shadow-sm backdrop-blur-sm transition hover:bg-white md:size-9",
          expandButtonClassName,
        )}
        aria-label={expanded ? "Minimize video" : "Maximize video"}
      >
        {expanded ? <Minimize2 className="size-4 md:size-5" /> : <Maximize2 className="size-4 md:size-5" />}
      </button>
    </div>
  );
}

export function YouTubePlayerControls(props) {
  return (
    <ExpandControl
      expanded={props.expanded}
      visible={!props.playing || props.isHovered || props.expanded}
      onToggle={props.onToggleExpand}
      controlsClassName={props.controlsClassName}
      expandButtonClassName={props.expandButtonClassName}
    />
  );
}
