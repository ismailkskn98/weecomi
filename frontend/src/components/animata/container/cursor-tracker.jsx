"use client";

import { useCallback, useRef } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { cn } from "@/lib/utils";

/**
 * Animata Cursor Tracker — wraps clickable cards; floating label follows cursor.
 * Position snaps instantly (no transform tween); only opacity/scale fade smoothly.
 */
export default function CursorTracker({ children, label, className, labelClassName, disabled = false }) {
  const divRef = useRef(null);
  const infoRef = useRef(null);

  const update = useCallback(({ x, y }) => {
    const node = infoRef.current;
    if (!node) return;
    const offsetX = (node.offsetWidth || 0) / 2;
    const offsetY = (node.offsetHeight || 0) / 2;
    node.style.setProperty("--x", `${x - offsetX}px`);
    node.style.setProperty("--y", `${y - offsetY}px`);
  }, []);

  useMousePosition(divRef, disabled ? undefined : update);

  if (disabled || !label) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={divRef} className={cn("group/cursor relative", "md:cursor-none md:[&_*]:!cursor-none", className)}>
      {children}
      <div
        ref={infoRef}
        style={{
          transform: "translate3d(var(--x, -9999px), var(--y, -9999px), 0)",
        }}
        className="pointer-events-none absolute top-0 left-0 z-50 hidden md:block"
        aria-hidden
      >
        <span
          className={cn(
            "inline-flex rounded-full px-5 py-3 font-heading text-xs font-medium shadow-lg",
            "origin-center scale-95 opacity-0",
            "transition-[opacity,transform] duration-300 ease-out",
            "group-hover/cursor:scale-100 group-hover/cursor:opacity-100",
            "group-hover/cursor:duration-200",
            "bg-weecomi-orange text-white",
            labelClassName,
          )}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
