import { cn } from "@/lib/utils";

export default function FeatureCard({
  badge,
  title,
  description,
  visual,
  tags,
  className,
  ...props
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-[24px] border border-black/[0.06] bg-white p-6 shadow-[0_8px_30px_-20px_rgba(13,13,13,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(13,13,13,0.22)] md:p-7",
        className,
      )}
      {...props}
    >
      {badge ? (
        <span className="inline-flex w-fit rounded-full bg-weecomi-dark-gray px-3 py-1 text-[10px] font-bold uppercase text-white">
          {badge}
        </span>
      ) : null}

      {visual ? <div className={cn(badge ? "mt-5" : "mt-0")}>{visual}</div> : null}

      <h3 className={cn("text-xl font-bold text-weecomi-dark-gray md:text-2xl", visual || badge ? "mt-5" : "mt-0")}>
        {title}
      </h3>

      {description ? (
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      ) : null}

      {tags?.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#f4f4f2] px-3 py-1 text-xs font-semibold text-weecomi-blue"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
