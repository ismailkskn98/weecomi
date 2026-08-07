import { setRequestLocale } from "next-intl/server";
import HomeContent from "@/components/home/index";

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}
