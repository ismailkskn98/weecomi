import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getProductPath } from "@/data/products";
import { productVisuals } from "@/data/productVisuals";
import { getProductCoverImage } from "@/data/productImages";

export default function RelatedProducts({ title, items = [], getDescription }) {
  if (!items.length) return null;

  return (
    <section className="border-t border-black/6 bg-white section-y">
      <div className="gridContainer">
        <h2 className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight text-weecomi-dark-gray">{title}</h2>
        <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
          {items.map((item) => {
            const itemImage = getProductCoverImage(item.id);
            const itemLogo = productVisuals[item.id]?.logo;

            return (
              <Link key={item.id} href={getProductPath(item)} className="group relative block aspect-5/4 overflow-hidden rounded-[24px] md:rounded-[28px]">
                <Image
                  src={itemImage}
                  alt={item.name}
                  fill
                  className="object-cover motion-safe:transition motion-safe:duration-500 motion-safe:group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-black/10" />
                {itemLogo ? (
                  <div className="absolute left-5 top-5 size-10 overflow-hidden rounded-lg bg-white/95 md:left-6 md:top-6">
                    <Image src={itemLogo} alt="" fill className="object-contain p-1.5" sizes="40px" />
                  </div>
                ) : null}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                  <h3 className="font-heading text-xl text-white md:text-2xl">{item.name}</h3>
                  <p className="mt-2 line-clamp-2 max-w-md text-sm leading-relaxed text-white/75">{getDescription(item)}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
