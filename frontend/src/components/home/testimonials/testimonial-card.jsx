import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import TestimonialAvatar from "./testimonial-avatar";

export default function TestimonialCard({ testimonial, index, memberLabel, featured = false, className }) {
  return (
    <article
      className={cn(
        "flex h-full min-h-[18.5rem] flex-col justify-between rounded-[1.25rem] p-5 md:min-h-[20rem] md:rounded-[1.5rem] md:p-6",
        featured ? "bg-weecomi-dark-gray text-white" : "border border-black/[0.05] bg-white/92 text-weecomi-dark-gray",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <TestimonialAvatar name={testimonial.name} image={testimonial.image} />
        <span className="font-heading text-[11px] tabular-nums text-weecomi-orange">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {testimonial.joinedAt ? (
          <span
            className={cn(
              "rounded-full border px-2.5 py-1 text-[10px] leading-none",
              featured ? "border-white/12 bg-white/6 text-white/65" : "border-black/8 bg-black/[0.03] text-weecomi-dark-gray/60",
            )}
          >
            {testimonial.joinedAt}
          </span>
        ) : null}
        {testimonial.contactLabel && testimonial.contactValue ? (
          <span
            className={cn(
              "truncate rounded-full border px-2.5 py-1 text-[10px] leading-none",
              featured ? "max-w-[10.5rem] border-white/12 bg-white/6 text-white/72" : "max-w-[10.5rem] border-black/8 bg-black/[0.03] text-weecomi-dark-gray/68",
            )}
            title={`${testimonial.contactLabel}: ${testimonial.contactValue}`}
          >
            {testimonial.contactLabel}: {testimonial.contactValue}
          </span>
        ) : null}
      </div>

      <blockquote className="relative mt-5 flex-1">
        <Quote className={cn("mb-4 size-7 md:size-8", featured ? "fill-white/10 text-white/35" : "fill-weecomi-orange/10 text-weecomi-orange/45")} aria-hidden />
        <p className={cn("line-clamp-6 text-[0.9rem] leading-relaxed md:text-[0.96rem]", featured ? "text-white/88" : "text-weecomi-dark-gray/78")}>“{testimonial.body}”</p>
      </blockquote>

      <footer className={cn("mt-6 border-t pt-4", featured ? "border-white/12" : "border-black/[0.06]")}>
        <h3 className={cn("font-heading text-[0.95rem] leading-tight md:text-base", featured ? "text-white" : "text-weecomi-dark-gray")}>{testimonial.name}</h3>
        <p className={cn("mt-1 text-[12px] md:text-sm", featured ? "text-white/55" : "text-muted-foreground")}>{memberLabel}</p>
      </footer>
    </article>
  );
}
