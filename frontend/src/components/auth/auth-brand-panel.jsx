"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { TextureOverlay } from "@/components/ui/texture-overlay";

const EASE = [0.23, 1, 0.32, 1];

export default function AuthBrandPanel() {
  const reduceMotion = useReducedMotion();

  return (
    <aside className="relative isolate h-[22vh] min-h-[8.75rem] max-h-[11.5rem] overflow-hidden bg-weecomi-dark-gray text-white md:h-auto md:max-h-none md:min-h-0">
      <Image
        src="/auth/panel.jpg"
        alt=""
        fill
        priority
        sizes="(max-width: 768px) 100vw, 58vw"
        className="object-cover object-[center_35%] md:object-center"
      />
      <div className="absolute inset-0 bg-[#161616]/55" aria-hidden />
      <div className="absolute inset-0 bg-weecomi-blue/40 mix-blend-multiply" aria-hidden />
      <TextureOverlay texture="noise" tone="light" opacity={0.14} className="z-[1]" />
      <div className="absolute right-0 top-0 z-[2] hidden h-full w-[2px] bg-weecomi-orange md:block" aria-hidden />

      <motion.div
        className="relative z-[3] flex h-full flex-col justify-center p-5 md:justify-between md:p-10 lg:p-12"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div>
          <Image src="/logo/BeyazYatay.png" alt="WeeComi" width={190} height={46} className="h-7 w-auto md:h-8" />
          <p className="mt-2 text-sm text-white/75 md:hidden">Yönetim paneli</p>
        </div>

        <div className="relative hidden md:block">
          <p
            className="pointer-events-none absolute -bottom-4 -left-1 select-none font-heading text-[clamp(7rem,16vw,12rem)] font-normal leading-none tracking-tighter text-white/[0.08]"
            aria-hidden
          >
            2013
          </p>
          <p className="relative text-sm text-white/70">Yönetim paneli</p>
          <p className="relative mt-2 font-heading text-5xl font-normal leading-[1.1] tracking-[-0.03em] lg:text-6xl xl:text-7xl">Admin.</p>
        </div>
      </motion.div>
    </aside>
  );
}
