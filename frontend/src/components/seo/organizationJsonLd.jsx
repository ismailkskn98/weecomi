const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WeeComi International",
    url: siteUrl,
    logo: `${siteUrl}/favicon.ico`,
    email: "info@weecomi.com",
    sameAs: [
      "https://weenetwork.com/",
      "https://bot.weecomi.com/",
      "https://weecoins.org/",
    ],
    description:
      "WeeComi develops independent technology solutions for business, commerce, AI and digital life under one ecosystem.",
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
