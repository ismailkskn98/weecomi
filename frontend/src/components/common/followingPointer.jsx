"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

function FollowPointer({ x, y, title }) {
  return (
    <motion.div
      className="pointer-events-none absolute z-[100] h-4 w-4 rounded-full"
      style={{ top: y, left: x }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      <div className="-translate-x-[4px] -translate-y-[2px]">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="1"
          viewBox="0 0 16 16"
          className="h-6 w-6 -rotate-[70deg] stroke-weecomi-dark-gray text-weecomi-dark-gray"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
        </svg>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="absolute left-4 top-3 whitespace-nowrap rounded-full bg-weecomi-blue px-3 py-1.5 text-xs font-semibold text-white shadow-md"
        >
          {title}
        </motion.div>
      </div>
    </motion.div>
  );
}

/** Aceternity-style following pointer — hides system cursor, shows custom one. */
export default function FollowingPointer({ children, className = "", title }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [inside, setInside] = useState(false);

  const handleMove = useCallback(
    (event) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      x.set(event.clientX - rect.left);
      y.set(event.clientY - rect.top);
    },
    [x, y],
  );

  return (
    <div
      ref={ref}
      onMouseEnter={() => setInside(true)}
      onMouseLeave={() => setInside(false)}
      onMouseMove={handleMove}
      style={inside ? { cursor: "none" } : undefined}
      className={cn("relative", inside && "[&_*]:!cursor-none", className)}
    >
      <AnimatePresence>{inside ? <FollowPointer x={x} y={y} title={title} /> : null}</AnimatePresence>
      {children}
    </div>
  );
}
