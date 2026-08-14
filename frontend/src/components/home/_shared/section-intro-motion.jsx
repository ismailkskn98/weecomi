"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import BlurText from "@/components/ui/blur-text";
import BracketTag from "./bracket-tag";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1];

export default function SectionIntroMotion({
  eyebrow,
  title,
  subtitle,
  eyebrowClassName,
  titleClassName,
  subtitleClassName,
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const show = Boolean(reduceMotion || inView);

  return (
    <div ref={ref}>
      {eyebrow ? (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <BracketTag className={eyebrowClassName}>{eyebrow}</BracketTag>
        </motion.div>
      ) : null}

      {title ? (
        <h2 className={cn(titleClassName, !eyebrow && "mt-0")}>
          <BlurText text={title} as="span" animateBy="words" delay={40} stepDuration={0.22} direction="bottom" />
        </h2>
      ) : null}

      {subtitle ? (
        <motion.p
          className={subtitleClassName}
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.4, delay: 0.08, ease: EASE }}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  );
}
