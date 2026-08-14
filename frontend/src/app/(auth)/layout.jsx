import { Geist, Inter_Tight } from "next/font/google";
import { ToastProvider } from "@/components/ui/toast";
import "../globals.css";

const geist = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  variable: "--font-inter-tight",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "WeeComi Auth",
  robots: { index: false, follow: false },
};

export default function AuthRootLayout({ children }) {
  return (
    <html lang="tr" className={`${geist.variable} ${interTight.variable}`}>
      <body className={`${interTight.className} bg-[#f6f7f8] antialiased`}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
