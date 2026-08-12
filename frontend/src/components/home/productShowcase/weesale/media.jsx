import Image from "next/image";
import ShowcaseMediaHeading from "../media-heading";
import { showcaseMediaPadClassName, showcaseMediaStackClassName } from "../shared";

export function WeesaleBrand() {
  return (
    <div className="flex items-center gap-2.5">
      <Image src="/logos/weesale.png" alt="WeeSale" width={172} height={34} className="h-7 w-auto md:h-8" />
    </div>
  );
}

export default function WeesaleMedia({ title }) {
  return (
    <div className="relative h-full min-h-72 w-full overflow-hidden md:min-h-full">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_68%_54%_at_56%_30%,rgba(240,159,47,0.22),transparent_72%)]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        aria-hidden
        style={{
          backgroundImage: "linear-gradient(rgba(13,13,13,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(13,13,13,0.35) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className={`relative z-20 flex h-full flex-col ${showcaseMediaStackClassName} ${showcaseMediaPadClassName}`}>
        {title ? <ShowcaseMediaHeading className="relative z-20 hidden shrink-0 sm:block">{title}</ShowcaseMediaHeading> : null}

        <div className="relative min-h-0 flex-1">
          <div className="absolute left-1/2 top-1 z-10 w-[calc(100%-1rem)] -translate-x-1/2 sm:top-1.5 sm:w-[26rem] md:left-0 md:w-[34rem] md:translate-x-0 lg:w-[40rem] xl:w-[44rem] 2xl:w-[48rem]">
            <div className="overflow-hidden rounded-[1.2rem] border border-black/10 bg-white shadow-[0_28px_80px_rgba(13,13,13,0.16)]">
              <Image
                src="/images/weesale.jpg"
                alt="WeeSale marketplace interface"
                width={1024}
                height={750}
                className="h-auto w-full object-cover object-top"
                sizes="(max-width: 768px) 92vw, 54rem"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
