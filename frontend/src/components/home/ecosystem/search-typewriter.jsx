"use client";

import { useEffect, useState, startTransition } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Google-style type / pause / erase loop (Framer SelfTypingText pattern).
 * Cycles through multiple phrases when provided.
 */
export default function SearchTypewriter({ phrases = [], typingSpeed = 90, pauseDuration = 1800, clearSpeed = 40, className }) {
  const reduceMotion = useReducedMotion();
  const list = phrases.length ? phrases : [""];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState(() => (reduceMotion ? list[0] ?? "" : ""));
  const [phase, setPhase] = useState("typing");

  const current = list[phraseIndex] ?? "";
  const phrasesKey = list.join("|");

  useEffect(() => {
    if (reduceMotion) {
      setDisplayText(list[0] ?? "");
      return;
    }

    let timeoutId;

    if (phase === "typing" && displayText.length < current.length) {
      timeoutId = window.setTimeout(() => {
        startTransition(() => setDisplayText(current.slice(0, displayText.length + 1)));
      }, typingSpeed);
    } else if (phase === "typing" && displayText.length === current.length) {
      timeoutId = window.setTimeout(() => {
        startTransition(() => setPhase("clearing"));
      }, pauseDuration);
    } else if (phase === "clearing" && displayText.length > 0) {
      timeoutId = window.setTimeout(() => {
        startTransition(() => setDisplayText(displayText.slice(0, -1)));
      }, clearSpeed);
    } else if (phase === "clearing" && displayText.length === 0) {
      startTransition(() => {
        setPhraseIndex((i) => (i + 1) % list.length);
        setPhase("typing");
      });
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [displayText, phase, current, list.length, typingSpeed, pauseDuration, clearSpeed, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    startTransition(() => {
      setDisplayText("");
      setPhase("typing");
      setPhraseIndex(0);
    });
  }, [phrasesKey, reduceMotion]);

  return (
    <span className={cn("inline-flex min-w-0 items-center", className)} aria-live="polite">
      <span className="truncate">{displayText}</span>
      {!reduceMotion ? <span className="eco-type-caret ml-0.5" aria-hidden /> : null}
    </span>
  );
}
