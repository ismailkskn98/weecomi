/** Shared layout tokens for product showcase cards */

export const showcaseCardClasses = {
  gridClassName: "md:grid-cols-[0.95fr_1.05fr]",
  contentClassName: "gap-24 p-4 sm:p-5 md:gap-28 md:p-6 lg:gap-36 lg:p-8 xl:p-9 2xl:p-10",
  titleClassName: "mt-3 text-lg leading-display text-weecomi-dark-gray sm:mt-4 sm:text-xl md:text-2xl lg:mt-5 lg:text-3xl",
  descriptionClassName:
    "mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground sm:mt-3 sm:line-clamp-3 md:line-clamp-3 lg:mt-4 lg:line-clamp-none lg:text-base",
  disclaimerClassName: "mt-3 hidden text-xs leading-relaxed text-muted-foreground/80 lg:mt-3.5 lg:block",
  footerClassName: "mt-4 border-t border-black/6 pt-4 md:mt-5 md:pt-5 lg:mt-auto lg:pt-5",
  mediaClassName: "min-h-72 sm:min-h-80 md:min-h-0",
};

/** WeeZard / WeeSale — more copy + taller media + wider content↔footer gap */
export const showcaseTallCardClasses = {
  ...showcaseCardClasses,
  contentClassName: "gap-28 p-4 sm:p-5 md:gap-32 md:p-6 lg:gap-40 lg:p-8 xl:gap-44 xl:p-9 2xl:gap-48 2xl:p-10",
  descriptionClassName:
    "mt-2.5 space-y-2.5 text-sm leading-relaxed text-muted-foreground sm:mt-3 sm:space-y-3 lg:mt-4 lg:space-y-3.5 lg:text-base",
  footerClassName: "mt-8 border-t border-black/6 pt-5 md:mt-10 md:pt-6 lg:mt-auto lg:pt-6 xl:pt-7",
  mediaClassName: "min-h-80 sm:min-h-96 md:min-h-[30rem] lg:min-h-[34rem] xl:min-h-[36rem] 2xl:min-h-[38rem]",
};

/** Same inset as left content column */
export const showcaseMediaPadClassName = "p-4 sm:p-5 md:p-6 lg:p-8 xl:p-9 2xl:p-10";

export const showcaseMediaStackClassName = "gap-2.5 sm:gap-3 md:gap-3.5";
