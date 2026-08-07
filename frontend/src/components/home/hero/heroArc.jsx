"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { products } from "@/data/products";
import { productVisuals } from "@/data/productVisuals";
import ActionButton from "@/components/common/actionButton";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { useGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const ARC_IDS = [
  "weemenu",
  "weecard",
  "weenetwork",
  "weekobi",
  "weesale",
  "weecomibot",
  "weecoins",
  "criptoswaps",
  "alisveriskapida",
];

function arcStyle(index, total) {
  const mid = (total - 1) / 2;
  const offset = index - mid;
  const rotate = offset * 7.5;
  const y = Math.abs(offset) * 14;
  const scale = 1 - Math.abs(offset) * 0.04;
  const z = 20 - Math.abs(offset);
  return {
    transform: `translateY(${y}px) rotate(${rotate}deg) scale(${scale})`,
    zIndex: z,
  };
}

function ProductArcCard({ product, className, style }) {
  const visual = productVisuals[product.id] || { accent: "#346C92", tint: "#eef3f7", logo: null };
  const isDark = product.id === "criptoswaps";

  return (
    <div
      data-arc-card
      className={cn(
        "flex w-[112px] shrink-0 flex-col items-center gap-2 rounded-2xl border border-black/[0.06] bg-white p-3 shadow-[0_12px_40px_-16px_rgba(13,13,13,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-16px_rgba(13,13,13,0.3)] md:w-[128px] md:p-4",
        className,
      )}
      style={style}
    >
      <div
        className="flex h-16 w-full items-center justify-center rounded-xl md:h-20"
        style={{ backgroundColor: visual.tint }}
      >
        {visual.logo ? (
          <Image
            src={visual.logo}
            alt=""
            width={88}
            height={36}
            className={cn("h-8 w-auto max-w-[85%] object-contain", isDark && "brightness-110")}
          />
        ) : (
          <span
            className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold text-white"
            style={{ backgroundColor: visual.accent }}
          >
            {product.name.slice(0, 1)}
          </span>
        )}
      </div>
      <p className="text-center text-[11px] font-semibold leading-tight text-weecomi-dark-gray md:text-xs">
        {product.name}
      </p>
    </div>
  );
}

export default function HeroArc() {
  const t = useTranslations("Hero");
  const items = ARC_IDS.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  const scopeRef = useGsap((gsap, _ScrollTrigger, root) => {
    const cards = root.querySelectorAll("[data-arc-card]");
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 48, scale: 0.85 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: { each: 0.05, from: "center" },
        ease: "power3.out",
        delay: 0.15,
      },
    );

    gsap.fromTo(
      root.querySelectorAll("[data-hero-copy]"),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" },
    );
  }, []);

  return (
    <section
      ref={scopeRef}
      className="relative overflow-hidden bg-linear-to-b from-[#fff5eb] via-white to-white"
    >
      <TextureOverlay texture="grid" opacity={0.07} />

      <div className="gridContainer relative z-10 flex flex-col items-center pb-10 pt-16 text-center md:pb-14 md:pt-24">
        <p
          data-hero-copy
          className="inline-flex items-center rounded-full border border-weecomi-orange/25 bg-white/90 px-3.5 py-1.5 text-[11px] font-semibold uppercase text-weecomi-dark-gray shadow-sm"
        >
          {t("eyebrow")}
        </p>

        <h1
          data-hero-copy
          className="mt-6 max-w-4xl text-4xl font-bold leading-[1.08] text-weecomi-dark-gray sm:text-5xl lg:text-6xl"
        >
          <span className="block">WeeComi</span>
          <span className="mt-3 block text-[0.68em] font-semibold leading-snug">
            <span className="text-weecomi-orange">{t("titleAccent")}</span>
            <span className="text-weecomi-dark-gray/90"> {t("titleSecondary")}</span>
          </span>
        </h1>

        <p
          data-hero-copy
          className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          {t("subtitle")}
        </p>

        <div data-hero-copy className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ActionButton href="/ecosystem" variant="inverse" showArrow>
            {t("ctaPrimary")}
          </ActionButton>
          <ActionButton href="/contact" variant="ghost">
            {t("ctaSecondary")}
          </ActionButton>
        </div>

        <p data-hero-copy className="mt-5 text-sm font-medium text-muted-foreground">
          {t("trustLine")}
        </p>

        <div className="mt-12 w-full md:hidden">
          <div className="flex gap-3 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {items.map((product) => (
              <ProductArcCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="relative mt-14 hidden w-full max-w-5xl items-end justify-center md:flex">
          <div className="flex items-end justify-center gap-2 lg:gap-3">
            {items.map((product, index) => (
              <ProductArcCard
                key={product.id}
                product={product}
                style={arcStyle(index, items.length)}
                className="origin-bottom"
              />
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">{t("visualCaption")}</p>
      </div>
    </section>
  );
}
