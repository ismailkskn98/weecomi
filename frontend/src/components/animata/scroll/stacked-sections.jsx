"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import "./stacked-sections.css";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function getScrollParent(node) {
  let element = node?.parentElement ?? null;
  while (element && element !== document.body && element !== document.documentElement) {
    const overflowY = getComputedStyle(element).overflowY;
    if (overflowY === "auto" || overflowY === "scroll") {
      return element;
    }
    element = element.parentElement;
  }
  return null;
}

export default function StackedSections({
  children,
  withDramaEffect = true,
  stackOffset = 48,
  paneGap = "gap-2",
  scrollRunway = "0px",
  minDramaWidth = 768,
  className,
}) {
  const deckRef = React.useRef(null);
  const cardRefs = React.useRef([]);
  const contentRefs = React.useRef([]);
  const cardHeightsRef = React.useRef([]);

  const items = React.Children.toArray(children);
  const total = items.length;

  const scaleAtDepth = React.useCallback(
    (cardIndex) => {
      const reverseIndex = total - (cardIndex - 1);
      return 1.1 - 0.1 * reverseIndex;
    },
    [total],
  );

  React.useEffect(() => {
    if (!withDramaEffect || total === 0) return undefined;

    const deck = deckRef.current;
    if (!deck) return undefined;

    const scroller = getScrollParent(deck);
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthQuery = window.matchMedia(`(min-width: ${minDramaWidth}px)`);
    let frame = 0;

    const canAnimate = () => !reduceMotionQuery.matches && widthQuery.matches;

    const clearContentStyles = () => {
      for (let i = 0; i < total; i++) {
        const content = contentRefs.current[i];
        if (!content) continue;
        delete content.dataset.stackedCovered;
        content.style.transform = "";
        content.style.opacity = "";
      }
    };

    const measureCards = () => {
      cardHeightsRef.current = Array.from({ length: total }, (_, index) => {
        const card = cardRefs.current[index];
        return card && card.offsetHeight > 0 ? card.offsetHeight : 1;
      });
    };

    const readLayout = () => {
      const containerTop = scroller ? scroller.getBoundingClientRect().top : 0;
      const cardTops = Array.from({ length: total }, (_, index) => {
        const card = cardRefs.current[index];
        return card ? card.getBoundingClientRect().top : 0;
      });
      return { containerTop, cardTops };
    };

    const update = () => {
      frame = 0;
      if (!canAnimate()) {
        clearContentStyles();
        return;
      }

      const { containerTop, cardTops } = readLayout();
      const nextWrites = [];

      for (let i = 0; i < total; i++) {
        const content = contentRefs.current[i];
        if (!content) continue;

        const endScale = scaleAtDepth(i + 1);
        const nextCard = cardRefs.current[i + 1];
        const nextTop = cardTops[i + 1];
        const covered = nextCard && nextTop - containerTop <= (i + 1) * stackOffset + 1;

        if (covered) {
          nextWrites.push({ content, covered: true, transform: `scale(${endScale})` });
          continue;
        }

        if (!nextCard) {
          nextWrites.push({ content, covered: false, transform: "" });
          continue;
        }

        const pinnedTop = (i + 1) * stackOffset;
        const offset = nextTop - containerTop - pinnedTop;
        const rowH = cardHeightsRef.current[i] ?? 1;
        const distance = Math.max(rowH - pinnedTop, 1);
        const progress = clamp(1 - offset / distance, 0, 1);
        const scale = 1 + (endScale - 1) * progress;

        nextWrites.push({ content, covered: false, transform: progress <= 0.001 ? "" : `scale(${scale})` });
      }

      for (const { content, covered, transform } of nextWrites) {
        if (covered) {
          content.dataset.stackedCovered = "";
        } else {
          delete content.dataset.stackedCovered;
        }
        content.style.transform = transform;
        content.style.opacity = "";
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onResize = () => {
      measureCards();
      onScroll();
    };

    measureCards();
    onScroll();
    const target = scroller ?? window;
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    reduceMotionQuery.addEventListener("change", onResize);
    widthQuery.addEventListener("change", onResize);

    return () => {
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      reduceMotionQuery.removeEventListener("change", onResize);
      widthQuery.removeEventListener("change", onResize);
      if (frame) cancelAnimationFrame(frame);
      clearContentStyles();
    };
  }, [total, stackOffset, withDramaEffect, minDramaWidth, scaleAtDepth]);

  if (total === 0) return null;

  const gapClass = paneGap === false ? undefined : paneGap;

  return (
    <div
      ref={deckRef}
      data-stacked-deck=""
      className={cn("flex w-full flex-col", gapClass, className)}
      style={{
        "--numcards": total,
        "--stacked-top-offset": `${stackOffset}px`,
        paddingBottom: `calc(${total} * ${stackOffset}px)`,
      }}
    >
      {items.map((child, index) => {
        const key = React.isValidElement(child) && child.key != null ? child.key : `pane-${index}`;
        const cardIndex = index + 1;

        return (
          <div
            key={key}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            data-stacked-card=""
            className="sticky top-0 w-full"
            style={{
              "--index": cardIndex,
              zIndex: cardIndex,
              paddingTop: `calc(${cardIndex} * var(--stacked-top-offset))`,
            }}
          >
            <div
              ref={(el) => {
                contentRefs.current[index] = el;
              }}
              data-stacked-content=""
              className="min-h-0 origin-[50%_0%]"
            >
              {child}
            </div>
          </div>
        );
      })}
      {scrollRunway !== "0px" ? <div aria-hidden className="w-full shrink-0" style={{ height: scrollRunway }} data-stacked-runway="" /> : null}
    </div>
  );
}
