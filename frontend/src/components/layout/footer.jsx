import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import ActionButton from "@/components/common/actionButton";
import { socialIcons } from "@/components/layout/socialIcons";
import { getProductPath, products, socialLinks } from "@/data/products";
import LanguageSwitcher from "./languageSwitcher";
import FooterMarquee from "./footerMarquee";
import FooterNavLink from "./footer-nav-link";

function FooterColumnTitle({ children }) {
  return (
    <h3 className="flex items-center gap-2 font-heading text-[11px] font-medium tracking-[0.08em] text-weecomi-orange">
      <span className="text-weecomi-orange/45" aria-hidden>
        [
      </span>
      {children}
      <span className="text-weecomi-orange/45" aria-hidden>
        ]
      </span>
    </h3>
  );
}

export default async function Footer() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");
  const marqueeTags = t.raw("marqueeTags");
  const tags = Array.isArray(marqueeTags) ? marqueeTags : [];

  const pages = [
    { href: "/", label: tNav("home") },
    { href: "/ecosystem", label: tNav("ecosystem") },
    { href: "/about", label: tNav("about") },
    { href: "/news", label: tNav("news") },
    { href: "/gallery", label: tNav("gallery") },
    { href: "/contact", label: tNav("contact") },
  ];

  const legal = [
    { href: "/privacy", label: t("privacy") },
    { href: "/cookies", label: t("cookies") },
    { href: "/terms", label: t("terms") },
    { href: "/kvkk", label: t("kvkk") },
    { href: "/risk-disclosure", label: t("risk") },
  ];

  return (
    <footer className="relative overflow-hidden bg-weecomi-dark-gray text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(240,159,47,0.16),transparent_52%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "url(/images/hikari/hero-texture.avif)",
          backgroundSize: "900px 900px",
          backgroundPosition: "top center",
        }}
      />

      <div className="relative gridContainer py-14 md:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="font-heading text-[11px] font-normal uppercase tracking-[0.08em] text-weecomi-orange md:text-xs">[ {t("ctaEyebrow")} ]</p>
          <h2 className="mt-5 font-heading text-3xl font-normal normal-case leading-[1.12] tracking-[-0.03em] text-white md:text-4xl lg:text-[2.75rem]">
            {t("ctaTitle")}
          </h2>
          <div className="mt-8">
            <ActionButton href="/contact" variant="inverse" showArrow>
              {t("ctaButton")}
            </ActionButton>
          </div>
        </div>
      </div>

      <div className="relative border-y border-white/10">
        <FooterMarquee tags={tags} tone="dark" />
      </div>

      <div className="relative gridContainer py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_2fr] lg:gap-16">
          <div className="flex flex-col">
            <Link href="/" className="inline-flex w-fit items-center">
              <Image src="/logo/BeyazYatay.png" alt="WeeComi" width={190} height={46} className="h-8 w-auto" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">{t("tagline")}</p>
            <div className="my-6 flex flex-wrap gap-2.5">
              {socialLinks.map((item) => {
                const Icon = socialIcons[item.id];

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/65 transition hover:border-weecomi-orange hover:text-weecomi-orange"
                    aria-label={item.label}
                  >
                    {Icon ? <Icon /> : item.label}
                  </a>
                );
              })}
            </div>
            <div className="w-fit">
              <LanguageSwitcher variant="dark" />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
            <div>
              <FooterColumnTitle>{t("pages")}</FooterColumnTitle>
              <ul className="mt-5 space-y-3.5">
                {pages.map((page) => (
                  <li key={page.href}>
                    <FooterNavLink href={page.href} variant="dark">
                      {page.label}
                    </FooterNavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <FooterColumnTitle>{t("products")}</FooterColumnTitle>
              <ul className="mt-5 space-y-3.5">
                {products.map((product) => (
                  <li key={product.id}>
                    <FooterNavLink href={getProductPath(product)} variant="dark">
                      {product.name}
                    </FooterNavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <FooterColumnTitle>{t("legal")}</FooterColumnTitle>
              <ul className="mt-5 space-y-3.5">
                {legal.map((item) => (
                  <li key={item.href}>
                    <FooterNavLink href={item.href} variant="dark">
                      {item.label}
                    </FooterNavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 gridContainer">
        <div className="flex flex-col gap-2 py-4 font-heading text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between sm:py-5">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <p>{t("copyright")}</p>
            <span className="text-white/20" aria-hidden>
              ·
            </span>
            <a
              href="https://markaforce.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-sm transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-weecomi-orange/40 focus-visible:ring-offset-2 focus-visible:ring-offset-weecomi-dark-gray"
            >
              <Image src="/markaforce.png" alt="" width={16} height={15} className="h-auto w-3.5 brightness-0 invert opacity-55 transition group-hover:opacity-90" />
              <span>MarkaForce</span>
            </a>
          </div>

          <a href={`mailto:${t("email")}`} className="transition hover:text-weecomi-orange">
            {t("email")}
          </a>
        </div>
      </div>
    </footer>
  );
}
