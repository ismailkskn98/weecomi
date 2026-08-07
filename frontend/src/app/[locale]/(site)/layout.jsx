import { setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import RouteScrollManager from "@/components/layout/route-scroll-manager";
import OrganizationJsonLd from "@/components/seo/organizationJsonLd";

export default async function SiteLayout({ children, params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <OrganizationJsonLd />
      <RouteScrollManager />
      <Header />
      <main className="site-main min-h-[70vh]">{children}</main>
      <Footer />
    </>
  );
}
