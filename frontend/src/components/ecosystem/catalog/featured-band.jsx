import Image from "next/image";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { getProductCoverImage } from "@/data/productImages";
import { productVisuals } from "@/data/productVisuals";
import { getProductPath } from "@/data/products";
import CursorLink from "./cursor-link";

/** Single dark featured band for AI category - product story, not metrics strip. */
export default function FeaturedBand({ product, title, description, features = [], ctaLabel, disclaimer }) {
  if (!product) return null;

  const image = getProductCoverImage(product.id);
  const logo = productVisuals[product.id]?.logo;
  const visibleFeatures = features.slice(0, 4);

  return (
    <div data-eco-item>
      <CursorLink href={getProductPath(product)} label={ctaLabel}>
        <article className="group relative overflow-hidden rounded-[24px] bg-weecomi-dark-gray text-white md:rounded-[28px]">
          <TextureOverlay texture="noise" tone="light" opacity={0.06} className="z-0" />
          <div className="relative z-10 grid gap-8 p-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-10 md:p-10 lg:p-12">
            <div>
              <p className="font-heading text-[11px] uppercase tracking-[0.12em] text-weecomi-orange">{product.nameCaps}</p>
              <h3 className="mt-4 font-heading text-[clamp(1.6rem,3vw,2.4rem)] leading-display">{title}</h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65 md:text-base md:leading-7">{description}</p>
              {visibleFeatures.length ? (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {visibleFeatures.map((feature) => (
                    <li key={feature} className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 font-heading text-[11px] text-white/85">
                      {feature}
                    </li>
                  ))}
                </ul>
              ) : null}
              {disclaimer ? <p className="mt-5 max-w-lg text-xs leading-relaxed text-white/40">{disclaimer}</p> : null}
            </div>

            <div className="relative aspect-5/4 overflow-hidden rounded-[20px] bg-white/5 md:aspect-4/3">
              <Image
                src={image}
                alt={product.name}
                fill
                className="object-cover motion-safe:transition motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              {logo ? (
                <div className="absolute bottom-4 left-4 size-11 overflow-hidden rounded-xl bg-white/95 shadow-md">
                  <Image src={logo} alt="" fill className="object-contain p-2" sizes="44px" />
                </div>
              ) : null}
            </div>
          </div>
        </article>
      </CursorLink>
    </div>
  );
}
