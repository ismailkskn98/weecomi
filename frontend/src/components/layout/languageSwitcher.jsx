"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const languages = [
  { value: "tr", label: "Türkçe", flagCode: "tr" },
  { value: "en", label: "English", flagCode: "gb" },
  { value: "ru", label: "Русский", flagCode: "ru" },
  { value: "az", label: "Azərbaycan", flagCode: "az" },
  { value: "ka", label: "ქართული", flagCode: "ge" },
];

function flagUrl(code) {
  return `https://flagcdn.com/w20/${code}.png`;
}

function FlagIcon({ code, className }) {
  return (
    <Image
      src={flagUrl(code)}
      alt=""
      width={20}
      height={15}
      className={cn("h-3.5 w-5 shrink-0 rounded-[2px] object-cover", className)}
      aria-hidden
    />
  );
}

export default function LanguageSwitcher({ variant = "light" }) {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const currentLanguage = languages.find((item) => item.value === locale);
  const isDark = variant === "dark";

  return (
    <Select
      value={locale}
      onValueChange={(value) => {
        if (!value || !routing.locales.includes(value)) return;
        router.replace(pathname, { locale: value });
      }}
      modal={false}
    >
      <SelectTrigger
        size="sm"
        aria-label={t("language")}
        className={cn(
          "h-9 min-w-11 gap-1.5 rounded-full px-2.5 shadow-none focus-visible:border-weecomi-orange focus-visible:ring-weecomi-orange/20",
          isDark
            ? "border-white/15 bg-white/[0.06] text-white hover:border-white/30 hover:bg-white/[0.1] [&_svg]:text-white/55"
            : "border-black/10 bg-white hover:border-black/20",
        )}
      >
        <SelectValue placeholder={t("language")}>
          {currentLanguage ? <FlagIcon code={currentLanguage.flagCode} /> : null}
        </SelectValue>
      </SelectTrigger>

      <SelectContent
        align="start"
        alignItemWithTrigger={false}
        className="min-w-44 rounded-xl border border-black/8 bg-white p-1.5 text-weecomi-dark-gray shadow-[0_16px_40px_-24px_rgba(0,0,0,0.35)] ring-0"
      >
        {languages.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
            className="cursor-pointer rounded-lg py-2 pr-8 pl-2 text-weecomi-dark-gray data-highlighted:bg-[#f4f4f2] data-highlighted:text-weecomi-dark-gray focus:bg-[#f4f4f2] focus:text-weecomi-dark-gray data-[selected]:bg-[#f4f4f2]"
          >
            <div className="flex items-center gap-2.5">
              <FlagIcon code={item.flagCode} />
              <span className="font-heading text-[12px] font-medium">{item.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
