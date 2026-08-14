"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import BracketTag from "./bracket-tag";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1];

export default function SectionIntroMotion({
  eyebrow,
  title,
  subtitle,
  titleClassName,
  subtitleClassName,
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const show = Boolean(reduceMotion || inView);

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {eyebrow ? <BracketTag>{eyebrow}</BracketTag> : null}

      {title ? (
        <h2 className={cn(titleClassName, !eyebrow && "mt-0")}>{title}</h2>
      ) : null}

      {subtitle ? <p className={subtitleClassName}>{subtitle}</p> : null}
    </motion.div>
  );
}
