import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

const VALUE_KEYS = ["craft", "independence", "reach"];

export default async function MissionValues() {
  const t = await getTranslations("Corporate");

  return (
    <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-3 md:gap-8">
      {VALUE_KEYS.map((key, index) => (
        <article
          key={key}
          data-about-mv
          className={cn(
            "border-t border-black/10 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8",
            index === 0 && "md:border-l-0 md:pl-0",
          )}
        >
          <p className="font-heading text-[11px] text-weecomi-orange">{String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-3 font-heading text-xl text-weecomi-dark-gray md:text-2xl">{t(`values.${key}.title`)}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{t(`values.${key}.text`)}</p>
        </article>
      ))}
    </div>
  );
}
