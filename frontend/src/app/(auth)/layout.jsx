import { Plus_Jakarta_Sans } from "next/font/google";
import { ToastProvider } from "@/components/ui/toast";
import "../globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata = {
  title: "WeeComi Auth",
  robots: { index: false, follow: false },
};

export default function AuthRootLayout({ children }) {
  return (
    <html lang="tr" className={plusJakarta.variable}>
      <body className={`${plusJakarta.className} bg-[#f4f7fb] antialiased`}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
