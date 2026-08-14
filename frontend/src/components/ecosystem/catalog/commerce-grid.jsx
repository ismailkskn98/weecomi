import Image from "next/image";
import { getProductCoverImage } from "@/data/productImages";
import { productVisuals } from "@/data/productVisuals";
import CursorLink from "./cursor-link";

/** Two-column visual product cards for commerce category. */
export default function CommerceGrid({ products = [], getCopy, ctaLabel }) {
  if (!products.length) return null;

  return (
    <div className="grid gap-5 md:grid-cols-2 md:gap-6">
      {products.map((product) => {
        const copy = getCopy(product);
        const image = getProductCoverImage(product.id);
        const logo = productVisuals[product.id]?.logo;

        return (
          <div key={product.id} data-eco-item>
            <CursorLink href={copy.href} label={ctaLabel}>
              <article className="group relative block aspect-5/4 overflow-hidden rounded-[24px] md:rounded-[28px]">
                <Image
                  src={image}
                  alt={product.name}
                  fill
                  className="object-cover motion-safe:transition motion-safe:duration-500 motion-safe:group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-black/10" />
                {logo ? (
                  <div className="absolute left-5 top-5 size-10 overflow-hidden rounded-lg bg-white/95 md:left-6 md:top-6">
                    <Image src={logo} alt="" fill className="object-contain p-1.5" sizes="40px" />
                  </div>
                ) : null}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                  <h3 className="font-heading text-xl text-white md:text-2xl">{product.name}</h3>
                  <p className="mt-2 line-clamp-2 max-w-md text-sm leading-relaxed text-white/75">{copy.description}</p>
                </div>
              </article>
            </CursorLink>
          </div>
        );
      })}
    </div>
  );
}
