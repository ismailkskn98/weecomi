import { getTranslations } from "next-intl/server";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import ManifestoQuote from "./manifesto-quote";

function HatchBlock({ className }) {
  return (
    <div
      className={className}
      aria-hidden
      style={{
        backgroundImage: "repeating-linear-gradient(-45deg, rgba(13,13,13,0.14) 0 1px, transparent 1px 9px)",
      }}
    />
  );
}

export default async function Manifesto() {
  const t = await getTranslations("Manifesto");

  return (
    <article
      itemSelector="[data-manifesto]"
      className="relative overflow-hidden py-20 md:py-28 lg:py-32 [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)]"
      aria-labelledby="manifesto-quote"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 42% 38% at 18% 32%, rgba(52,108,146,0.12), transparent 72%)",
            "radial-gradient(ellipse 36% 34% at 82% 68%, rgba(240,159,47,0.06), transparent 70%)",
          ].join(","),
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.055]"
        aria-hidden
        style={{
          backgroundImage: "linear-gradient(rgba(13,13,13,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(13,13,13,0.55) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <TextureOverlay texture="noise" tone="dark" opacity={0.06} className="z-0" />

      <HatchBlock className="pointer-events-none absolute left-[6%] top-[14%] z-0 hidden h-28 w-24 opacity-[0.55] md:block lg:left-[10%] lg:h-36 lg:w-28" />
      <HatchBlock className="pointer-events-none absolute left-[12%] top-[46%] z-0 hidden h-32 w-20 opacity-[0.45] md:block lg:left-[16%] lg:h-40 lg:w-24" />
      <HatchBlock className="pointer-events-none absolute right-[8%] top-[18%] z-0 hidden h-36 w-32 opacity-[0.5] md:block lg:right-[12%] lg:h-44 lg:w-36" />
      <HatchBlock className="pointer-events-none absolute bottom-[18%] right-[14%] z-0 hidden h-40 w-28 opacity-[0.42] md:block lg:bottom-[22%] lg:right-[18%] lg:h-48 lg:w-32" />

      <div className="relative z-10 gridContainer">
        <div data-manifesto className="mx-auto w-full text-center sm:max-w-11/12 lg:max-w-5xl">
          <ManifestoQuote text={t("eyebrow")} className="font-heading text-[11px] font-medium uppercase tracking-[0.14em] text-weecomi-dark-gray/45" />

          <blockquote id="manifesto-quote" className="mt-6 md:mt-8">
            <ManifestoQuote text={t("text")} />
          </blockquote>

          <footer data-manifesto className="mt-6 md:mt-8">
            <ManifestoQuote text={t("authorName")} className="font-heading text-xs font-light text-weecomi-blue md:text-sm" />
            <ManifestoQuote text={t("authorRole")} className="font-heading text-xs font-light text-weecomi-blue md:text-sm" />
          </footer>
        </div>
      </div>
    </article>
  );
}
