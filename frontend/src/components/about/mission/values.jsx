import Image from "next/image";
import { getTranslations } from "next-intl/server";

const VALUE_ITEMS = [
  { key: "craft", tag: "product", image: "/images/hikari/benefits/impact.svg" },
  { key: "independence", tag: "clear", image: "/images/hikari/benefits/authority.svg" },
  { key: "reach", tag: "global", image: "/images/hikari/benefits/reach.svg" },
];

export default async function MissionValues() {
  const t = await getTranslations("Corporate");

  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
      {VALUE_ITEMS.map((item) => (
        <article
          key={item.key}
          data-about-mv
          className="flex flex-col items-center gap-5 rounded-xl bg-[#f5f5f5] px-4 py-7 text-center transition-colors duration-200 hover:bg-[#efefef] md:px-5 md:py-8"
        >
          <span className="inline-flex items-center justify-center rounded-xl bg-weecomi-dark-gray px-3 py-[5px]">
            <span className="font-heading text-sm font-medium text-white">{t(`valueTags.${item.tag}`)}</span>
          </span>

          <div className="relative aspect-[263/175] w-full max-w-[220px]">
            <Image
              src="/images/hikari/benefits/grid.svg"
              alt=""
              fill
              unoptimized
              className="pointer-events-none object-fill opacity-60"
              aria-hidden
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={item.image}
                alt=""
                width={140}
                height={140}
                unoptimized
                className="relative z-[1] h-[min(100%,140px)] w-auto max-w-[56%] object-contain"
                aria-hidden
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-2.5">
            <h3 className="font-heading text-[1.35rem] leading-snug text-weecomi-dark-gray md:text-[1.45rem]">
              {t(`values.${item.key}.title`)}
            </h3>
            <p className="max-w-[28ch] text-sm leading-relaxed text-black/50 md:text-base">
              {t(`values.${item.key}.text`)}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
