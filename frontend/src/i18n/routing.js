import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en", "ru", "az", "ka"],
  defaultLocale: "tr",
});
