"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import TestimonialAvatar from "./testimonial-avatar";

const COLUMN_COUNT = 3;
const ROTATION_DELAYS = [4800, 5600, 6400];

function distributeTestimonials(items, columns) {
  const lanes = Array.from({ length: columns }, () => []);
  items.forEach((item, index) => {
    lanes[index % columns].push(item);
  });
  return lanes.filter((lane) => lane.length > 0);
}

function RotatingColumn({ items, memberLabel, labels, delay, hiddenOnMobile = false }) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (reduceMotion || items.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, delay);

    return () => window.clearInterval(timer);
  }, [delay, items.length, reduceMotion]);

  useEffect(() => {
    setIsExpanded(false);
  }, [activeIndex]);

  const active = items[activeIndex];

  const activeBody = active?.body;
  const activeExcerpt = active?.excerpt;

  useEffect(() => {
    const node = textRef.current;
    if (!node || !active) return;
    setHasOverflow(node.scrollHeight - node.clientHeight > 8 || active.excerpt !== active.body);
  }, [active, activeBody, activeExcerpt]);

  if (!active) return null;

  const meta = active.contactLabel && active.contactValue ? `${active.contactLabel}: ${active.contactValue}` : memberLabel;

  return (
    <article
      className={[
        "relative min-h-[19rem] overflow-hidden px-4 py-7 text-center md:h-[29rem] md:px-5 md:py-8",
        hiddenOnMobile ? "hidden md:block" : "block",
      ].join(" ")}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active.id}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-full flex-col items-center md:items-start md:text-left"
        >
          <div className="mb-5 flex min-h-8 items-center justify-center md:justify-start">
            <span className="font-heading text-[10px] tracking-[0.16em] text-weecomi-orange/78">{active.joinedAt || memberLabel}</span>
          </div>

          <blockquote className="relative mx-auto flex min-h-0 w-full max-w-[15.25rem] flex-1 flex-col pt-5 md:mx-0 md:max-w-[16.75rem] md:pt-6">
            <span
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 font-heading text-[2.3rem] leading-none text-weecomi-orange/18 md:text-[2.8rem] md:text-weecomi-orange/20"
            >
              “
            </span>
            <div
              ref={textRef}
              className="mt-2 flex-1 overflow-hidden md:mt-3"
              style={{
                maskImage: "linear-gradient(to bottom, black 0%, black 82%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 82%, transparent 100%)",
              }}
            >
              <p className="text-pretty text-[0.95rem] leading-[1.78] text-weecomi-dark-gray/76 md:text-[1rem] md:leading-[1.82]">{active.excerpt}</p>
            </div>
          </blockquote>

          {hasOverflow ? (
            <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
              <DialogTrigger className="mt-4 self-center font-heading text-[10px] uppercase tracking-[0.14em] text-weecomi-orange transition hover:text-weecomi-dark-gray md:self-start">
                {labels.readMore}
              </DialogTrigger>
              <DialogContent className="max-w-[min(42rem,calc(100%-2rem))] rounded-[1.5rem] p-6 sm:p-7">
                <DialogTitle className="pr-8 text-lg text-weecomi-dark-gray">{active.name}</DialogTitle>
                <DialogDescription className="mt-1 text-sm text-muted-foreground">{meta}</DialogDescription>
                <div className="mt-5 border-t border-black/6 pt-5">
                  <p className="text-[0.98rem] leading-8 text-weecomi-dark-gray/82">{active.body}</p>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <div className="mt-4 h-[15px]" aria-hidden />
          )}

          <footer className="mt-auto flex w-full items-center gap-2.5 border-t border-black/6 pt-4 md:max-w-[16.75rem]">
            <TestimonialAvatar name={active.name} image={active.image} size="sm" />
            <div className="min-w-0">
              <p className="truncate font-heading text-sm text-weecomi-dark-gray">{active.name}</p>
              <p className="truncate text-xs text-muted-foreground">{meta}</p>
            </div>
          </footer>
        </motion.div>
      </AnimatePresence>
    </article>
  );
}

export default function TestimonialsCarousel({ testimonials, memberLabel, labels }) {
  const columns = distributeTestimonials(testimonials, COLUMN_COUNT);

  if (!columns.length) return null;

  return (
    <div className="relative" aria-roledescription="carousel" aria-label={labels.carousel}>
      <div className="gridContainer">
        <div className="w-full border-y border-black/7">
          <div className="grid md:grid-cols-3 md:divide-x md:divide-black/7">
            {columns.map((items, index) => (
              <RotatingColumn
                key={`lane-${index}`}
                items={items}
                memberLabel={memberLabel}
                labels={labels}
                delay={ROTATION_DELAYS[index] || ROTATION_DELAYS[ROTATION_DELAYS.length - 1]}
                hiddenOnMobile={index > 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
