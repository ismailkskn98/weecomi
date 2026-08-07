"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Build Motion keyframe arrays from a from-state + intermediate steps.
 * @see https://www.reactbits.dev/text-animations/blur-text
 */
function buildKeyframes(from, steps) {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((step) => Object.keys(step))]);
  const keyframes = {};
  keys.forEach((key) => {
    keyframes[key] = [from[key], ...steps.map((step) => step[key])];
  });
  return keyframes;
}

/** Split text into animatable units while keeping word boundaries for letters mode. */
function buildSegments(text, animateBy) {
  const value = String(text);

  if (animateBy === "words") {
    const words = value.split(" ").filter(Boolean);
    return words.map((word, index) => ({
      type: "word",
      content: word,
      delayIndex: index,
      trailSpace: index < words.length - 1,
    }));
  }

  const words = value.split(" ");
  const segments = [];
  let delayIndex = 0;

  words.forEach((word, wordIndex) => {
    const letters = Array.from(word);
    if (letters.length === 0) {
      if (wordIndex < words.length - 1) {
        segments.push({ type: "space", delayIndex: delayIndex++ });
      }
      return;
    }

    segments.push({
      type: "wordGroup",
      letters: letters.map((letter) => {
        const item = { content: letter, delayIndex };
        delayIndex += 1;
        return item;
      }),
      trailSpace: wordIndex < words.length - 1,
    });
  });

  return segments;
}

/**
 * React Bits BlurText — multi-step blur → clear while sliding in.
 * SEO-safe: Server wraps real headings; this island animates after mount + in-view.
 */
export default function BlurText({
  text = "",
  delay = 50,
  className,
  animateBy = "letters",
  direction = "bottom",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration = 0.35,
  as: Comp = "span",
}) {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  const segments = useMemo(() => buildSegments(text, animateBy), [text, animateBy]);

  const defaultFrom = useMemo(
    () => (direction === "top" ? { filter: "blur(10px)", opacity: 0, y: -50 } : { filter: "blur(10px)", opacity: 0, y: 50 }),
    [direction],
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction],
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = useMemo(
    () => Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1))),
    [stepCount],
  );
  const animateKeyframes = useMemo(() => buildKeyframes(fromSnapshot, toSnapshots), [fromSnapshot, toSnapshots]);

  const lastDelayIndex = useMemo(() => {
    let max = -1;
    segments.forEach((segment) => {
      if (segment.type === "word") max = Math.max(max, segment.delayIndex);
      if (segment.type === "space") max = Math.max(max, segment.delayIndex);
      if (segment.type === "wordGroup") {
        segment.letters.forEach((letter) => {
          max = Math.max(max, letter.delayIndex);
        });
      }
    });
    return max;
  }, [segments]);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || reduceMotion || !ref.current) return undefined;
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ready, reduceMotion, threshold, rootMargin]);

  if (!ready || reduceMotion) {
    return <Comp className={cn(className)}>{text}</Comp>;
  }

  const motionProps = (delayIndex) => ({
    className: "inline-block will-change-[transform,filter,opacity]",
    initial: fromSnapshot,
    animate: inView ? animateKeyframes : fromSnapshot,
    transition: {
      duration: totalDuration,
      times,
      delay: (delayIndex * delay) / 1000,
      ease: easing,
    },
    onAnimationComplete: delayIndex === lastDelayIndex ? onAnimationComplete : undefined,
  });

  return (
    <Comp ref={ref} className={cn("inline", className)}>
      {segments.map((segment, index) => {
        if (segment.type === "word") {
          return (
            <motion.span key={`word-${index}`} {...motionProps(segment.delayIndex)}>
              {segment.content}
              {segment.trailSpace ? "\u00A0" : null}
            </motion.span>
          );
        }

        if (segment.type === "space") {
          return (
            <motion.span key={`space-${index}`} {...motionProps(segment.delayIndex)}>
              {"\u00A0"}
            </motion.span>
          );
        }

        return (
          <span key={`group-${index}`}>
            <span className="inline-block whitespace-nowrap">
              {segment.letters.map((letter) => (
                <motion.span key={`letter-${letter.delayIndex}`} {...motionProps(letter.delayIndex)}>
                  {letter.content}
                </motion.span>
              ))}
            </span>
            {segment.trailSpace ? " " : null}
          </span>
        );
      })}
    </Comp>
  );
}
