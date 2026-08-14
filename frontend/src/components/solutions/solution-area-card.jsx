"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import CursorTracker from "@/components/animata/container/cursor-tracker";
import { cn } from "@/lib/utils";

export default function SolutionAreaCard({ href, index, title, description, image, products = [], ctaLabel }) {
  const card = (
    <div className="grid overflow-hidden rounded-[18px] border border-black/6 bg-weecomi-dark-gray text-white shadow-[0_28px_70px_-44px_rgba(13,13,13,0.4)] md:grid-cols-[1.05fr_0.95fr]">
      <div className="flex flex-col justify-between p-6 md:p-8">
        <div>
          <span className="font-heading text-[11px] text-weecomi-orange">{String(index).padStart(2, "0")}</span>
          <h3 className="mt-4 font-heading text-[1.5rem] leading-display md:text-[1.85rem]">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/60 md:text-[0.95rem]">{description}</p>
        </div>
        {products.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {products.map((name) => (
              <span key={name} className="rounded-md border border-white/15 bg-white/4 px-2.5 py-1 font-heading text-[10px] text-white/85">
                {name}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div className="relative min-h-45 md:min-h-60">
        <Image src={image} alt={title} fill className="object-cover transition duration-500 group-hover/cursor:scale-[1.03]" sizes="(max-width: 768px) 100vw, 45vw" />
        <div className="absolute inset-0 bg-linear-to-l from-transparent to-weecomi-dark-gray/20" />
      </div>
    </div>
  );

  const linked = (
    <Link href={href} className={cn("block", ctaLabel && "md:cursor-none")}>
      {card}
    </Link>
  );

  if (!ctaLabel) return linked;

  return (
    <CursorTracker label={ctaLabel} labelClassName="bg-weecomi-orange text-white" className="block">
      {linked}
    </CursorTracker>
  );
}
