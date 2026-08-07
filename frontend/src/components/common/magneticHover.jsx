"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

const MagneticHoverContext = createContext(null);

function useMagneticHoverContext() {
  const context = useContext(MagneticHoverContext);
  if (!context) {
    throw new Error("MagneticHover.Anchor must be used inside MagneticHover.");
  }
  return context;
}

export function MagneticBadge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex h-[50px] items-center gap-2 rounded-xl bg-weecomi-orange pl-7 pr-6 font-heading text-sm font-medium text-white shadow-[0_10px_30px_-12px_rgba(240,159,47,0.65)] ${className}`.trim()}
    >
      {children}
    </span>
  );
}

function MagneticHoverAnchor({ children, className = "" }) {
  const { anchorRef, active, badge, springX, springY } = useMagneticHoverContext();

  return (
    <div ref={anchorRef} className={`relative ${className}`.trim()}>
      {children}
      {badge ? (
        <motion.div
          initial={false}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
          aria-hidden={!active}
        >
          <motion.div style={{ x: springX, y: springY }}>{badge}</motion.div>
        </motion.div>
      ) : null}
    </div>
  );
}

export default function MagneticHover({ children, badge = null, className = "", strength = 0.32, maxDistance = 72, disabled = false }) {
  const rootRef = useRef(null);
  const anchorRef = useRef(null);
  const [active, setActive] = useState(false);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 22, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 120, damping: 22, mass: 0.45 });

  const reset = useCallback(() => {
    setActive(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleMouseMove = useCallback(
    (event) => {
      if (disabled || reduceMotion) return;

      const anchor = anchorRef.current ?? rootRef.current;
      if (!anchor) return;

      const rect = anchor.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY) || 1;
      const pull = Math.min(distance, maxDistance) / distance;

      x.set(deltaX * pull * strength);
      y.set(deltaY * pull * strength);
    },
    [disabled, reduceMotion, maxDistance, strength, x, y],
  );

  const handleMouseEnter = useCallback(() => {
    if (!disabled) setActive(true);
  }, [disabled]);

  const contextValue = {
    anchorRef,
    active: active && !disabled,
    badge,
    springX,
    springY,
  };

  return (
    <MagneticHoverContext.Provider value={contextValue}>
      <div ref={rootRef} className={className} onMouseEnter={handleMouseEnter} onMouseMove={handleMouseMove} onMouseLeave={reset}>
        {children}
      </div>
    </MagneticHoverContext.Provider>
  );
}

MagneticHover.Anchor = MagneticHoverAnchor;
