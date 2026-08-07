import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export default function ProductRow({
  index,
  href,
  name,
  title,
  description,
  visual,
  comingSoonLabel,
  ctaLabel,
  className,
}) {
  const isDark = visual?.isDark;
  const number = String(index).padStart(2, "0");

  return (
    <Link
      href={href}
      data-product-row
      className={cn(
        "group grid items-center gap-6 border-b border-black/[0.06] py-8 transition duration-300 last:border-b-0 md:grid-cols-[minmax(0,1fr)_minmax(220px,0.9fr)] md:gap-10 md:py-10",
        className,
      )}
    >
      <div>
        <p className="text-[11px] font-bold uppercase text-muted-foreground">
          #{number}
          <span className="mx-2 text-weecomi-orange">·</span>
          <span style={{ color: visual?.accent || "#346C92" }}>{name}</span>
        </p>

        <h3 className="mt-3 text-2xl font-bold text-weecomi-dark-gray transition group-hover:text-weecomi-blue md:text-3xl">
          {title}
        </h3>

        {description ? (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {description}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {comingSoonLabel ? (
            <span className="rounded-full bg-weecomi-orange/15 px-2.5 py-0.5 text-[11px] font-semibold text-weecomi-orange">
              {comingSoonLabel}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-weecomi-blue">
            {ctaLabel}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>

      <div
        className="relative flex min-h-[160px] items-center justify-center overflow-hidden rounded-[22px] border border-black/[0.05] md:min-h-[200px]"
        style={{ backgroundColor: visual?.tint || "#eef3f7" }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-45"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 20%, ${visual?.accent || "#346C92"}30, transparent 55%)`,
          }}
        />
        {visual?.logo ? (
          <Image
            src={visual.logo}
            alt=""
            width={180}
            height={72}
            className={cn(
              "relative z-[1] h-12 w-auto max-w-[70%] object-contain transition duration-500 group-hover:scale-105 md:h-14",
              isDark && "brightness-110",
            )}
          />
        ) : (
          <span
            className="relative z-[1] flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white"
            style={{ backgroundColor: visual?.accent || "#346C92" }}
          >
            {name?.slice(0, 1)}
          </span>
        )}
      </div>
    </Link>
  );
}
