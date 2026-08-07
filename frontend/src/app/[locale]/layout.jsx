import { Anton, Cal_Sans, Inter_Tight, Noto_Sans, Noto_Sans_Georgian } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  variable: "--font-inter-tight",
  display: "swap",
  weight: ["400", "500", "600"],
});

const anton = Anton({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

/** Agero subheads / buttons / badges. Latin only — ru/ka use Inter Tight via locale CSS. */
const calSans = Cal_Sans({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-cal-sans",
  display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  variable: "--font-noto-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

const notoGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  variable: "--font-noto-georgian",
  display: "swap",
  weight: ["400", "500", "600"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    title: {
      default: t("defaultTitle"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("defaultDescription"),
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    alternates: {
      languages: Object.fromEntries(routing.locales.map((item) => [item, `/${item}`])),
    },
    openGraph: {
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      type: "website",
      locale,
      siteName: t("siteName"),
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#346C92",
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const isGeorgian = locale === "ka";
  const isCyrillic = locale === "ru";

  return (
    <html
      lang={locale}
      className={`${interTight.variable} ${anton.variable} ${calSans.variable} ${notoSans.variable} ${notoGeorgian.variable}`}
    >
      <body className={`${interTight.className} ${isGeorgian ? "font-georgian" : ""} ${isCyrillic ? "font-cyrillic" : ""} antialiased`}>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
