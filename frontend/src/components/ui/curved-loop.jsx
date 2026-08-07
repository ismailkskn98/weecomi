"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Curved looping text along an SVG path (react-bits CurvedLoop).
 * Animates startOffset so glyphs travel on the curve — not a flat CSS slide.
 */
export default function CurvedLoop({
  marqueeText = "WEECOMI × PRODUCTS × ",
  className,
  textClassName,
  curveAmount = 90,
  speed = 1.2,
  interactive = false,
}) {
  const reduceMotion = useReducedMotion();
  const uid = useId();
  const pathId = `curve-${uid.replace(/:/g, "")}`;
  const measureRef = useRef(null);
  const textPathRef = useRef(null);
  const [spacing, setSpacing] = useState(0);
  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(-1);
  const velRef = useRef(0);

  const text = useMemo(() => {
    const raw = String(marqueeText).replace(/\s+$/, "");
    return `${raw}\u00A0`;
  }, [marqueeText]);

  const pathD = `M-40,40 Q500,${40 + curveAmount} 1040,40`;
  const ready = spacing > 0;
  const totalText = ready ? Array(Math.ceil(1800 / spacing) + 2).fill(text).join("") : text;

  useEffect(() => {
    if (!measureRef.current) return;
    setSpacing(measureRef.current.getComputedTextLength());
  }, [text, textClassName]);

  useEffect(() => {
    if (!spacing || !textPathRef.current) return;
    const initial = -spacing;
    textPathRef.current.setAttribute("startOffset", `${initial}px`);
  }, [spacing]);

  useEffect(() => {
    if (!spacing || !ready || reduceMotion) return undefined;

    let frame = 0;
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const current = parseFloat(textPathRef.current.getAttribute("startOffset") || "0");
        let next = current + dirRef.current * speed;
        if (next <= -spacing) next += spacing;
        if (next > 0) next -= spacing;
        textPathRef.current.setAttribute("startOffset", `${next}px`);
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, ready, speed, reduceMotion]);

  const onPointerDown = (event) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = event.clientX;
    velRef.current = 0;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = event.clientX - lastXRef.current;
    lastXRef.current = event.clientX;
    velRef.current = dx;
    const current = parseFloat(textPathRef.current.getAttribute("startOffset") || "0");
    let next = current + dx;
    if (next <= -spacing) next += spacing;
    if (next > 0) next -= spacing;
    textPathRef.current.setAttribute("startOffset", `${next}px`);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? 1 : -1;
  };

  return (
    <div
      className={cn("w-full overflow-hidden", className)}
      aria-hidden
      style={{ visibility: ready ? "visible" : "hidden", cursor: interactive ? "grab" : "auto" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg className="absolute h-0 w-0 overflow-hidden" aria-hidden>
        <text ref={measureRef} className={cn("font-heading uppercase", textClassName)} style={{ fontSize: 28 }}>
          {text}
        </text>
      </svg>

      <svg viewBox="0 0 1000 140" className="block w-full overflow-visible" preserveAspectRatio="none">
        <defs>
          <path id={pathId} d={pathD} fill="none" />
        </defs>
        {ready ? (
          <text className={cn("fill-current font-heading uppercase", textClassName)} style={{ fontSize: 28 }}>
            <textPath ref={textPathRef} href={`#${pathId}`} startOffset="0px">
              {totalText}
            </textPath>
          </text>
        ) : null}
      </svg>
    </div>
  );
}
