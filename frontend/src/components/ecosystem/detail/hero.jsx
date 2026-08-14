import Image from "next/image";
import { productVisuals } from "@/data/productVisuals";
import { getProductDetailImage } from "@/data/productImages";

export default function DetailHero({ product, description }) {
  const detailImage = getProductDetailImage(product.id);
  const logo = productVisuals[product.id]?.logo;

  return (
    <section className="bg-white pb-12 pt-28 md:pb-16 md:pt-32 lg:pt-[7.25rem]">
      <div className="gridContainer">
        <div className="max-w-3xl">
          <p className="font-heading text-[11px] uppercase tracking-[0.12em] text-weecomi-orange">{product.nameCaps}</p>
          <h1 className="mt-4 font-heading text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[1.08] tracking-[-0.02em] text-weecomi-dark-gray">
            {product.name}
          </h1>
          {description ? (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg md:leading-8">{description}</p>
          ) : null}
        </div>

        <div className="relative mt-10 overflow-hidden rounded-[24px] bg-[#e8e4dc] md:mt-12 md:rounded-[28px]">
          <div className="relative aspect-16/10 w-full max-h-[720px]">
            <Image src={detailImage} alt={product.name} fill priority className="object-cover" sizes="100vw" />
          </div>
          {logo ? (
            <div className="absolute left-5 top-5 size-11 overflow-hidden rounded-xl bg-white/95 shadow-md md:left-7 md:top-7 md:size-12">
              <Image src={logo} alt="" fill className="object-contain p-2" sizes="48px" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
