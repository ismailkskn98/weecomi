import { Plus_Jakarta_Sans } from "next/font/google";
import { ToastProvider } from "@/components/ui/toast";
import "../globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata = {
  title: "WeeComi Admin",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
  return (
    <html lang="tr" className={plusJakarta.variable}>
      <body className={`${plusJakarta.className} bg-[#eef4f8] antialiased`}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
