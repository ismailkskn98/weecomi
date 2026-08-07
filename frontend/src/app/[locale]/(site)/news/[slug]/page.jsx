import { setRequestLocale } from "next-intl/server";
import NewsDetailClient from "@/components/news/newsDetailClient";

export default async function NewsDetailPage({ params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return (
    <section className="section-y-bottom bg-white pt-28 md:pt-32">
      <div className="gridContainer">
        <NewsDetailClient slug={slug} />
      </div>
    </section>
  );
}
