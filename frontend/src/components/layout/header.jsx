"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import ButtonMotionContent from "@/components/common/button-motion-content";
import { productCategories, products, getProductPath } from "@/data/products";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/ecosystem", key: "ecosystem", mega: true },
  { href: "/about", key: "about" },
  { href: "/news", key: "news" },
  { href: "/contact", key: "contact" },
];

const HIDE_AFTER_Y = 200;
const SHOW_AFTER_UP_PX = 300;

function MenuToggleButton({ open, onClick }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <button type="button" className="relative flex size-8 items-center justify-center md:size-9" onClick={onClick} aria-label="Menu" aria-expanded={open}>
      <div className="relative h-4 w-5">
        <motion.span
          className="absolute left-0 top-0 block h-0.5 w-5 rounded-full bg-white"
          animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
        />
        <motion.span
          className="absolute left-0 top-[7px] block h-0.5 w-5 rounded-full bg-white"
          animate={open ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
        />
        <motion.span
          className="absolute left-0 top-3.5 block h-0.5 w-5 rounded-full bg-white"
          animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
        />
      </div>
    </button>
  );
}

export default function Header() {
  const t = useTranslations("NavCaps");
  const tCat = useTranslations("CategoriesCaps");
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [ecoOpen, setEcoOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const upDistance = useRef(0);

  const panelTransition = prefersReducedMotion ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] };

  const closeAll = () => {
    setMenuOpen(false);
    setEcoOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((value) => {
      const next = !value;
      if (!next) {
        setEcoOpen(false);
      }
      return next;
    });
  };

  const barRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      if (menuOpen || currentY <= HIDE_AFTER_Y) {
        upDistance.current = 0;
        setHidden(false);
        return;
      }

      if (delta > 0) {
        upDistance.current = 0;
        setHidden(true);
        return;
      }

      if (delta < 0) {
        upDistance.current += -delta;
        if (upDistance.current >= SHOW_AFTER_UP_PX) {
          setHidden(false);
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  // Soft slide-up after mount — transform only so prerendered HTML stays visible.
  useLayoutEffect(() => {
    const el = barRef.current;
    if (!el || prefersReducedMotion) return undefined;

    const animation = el.animate([{ transform: "translateY(20px)" }, { transform: "translateY(0)" }], {
      duration: 500,
      delay: 40,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "both",
    });

    return () => animation.cancel();
  }, [prefersReducedMotion]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 pt-4 transition-transform duration-300 md:pt-5", hidden ? "-translate-y-[calc(100%+1.25rem)]" : "translate-y-0")}>
      <div className="mx-auto gridContainer">
        <div ref={barRef} className="flex items-center justify-between gap-2 rounded-xl bg-[#2c2c2c] px-2.5 py-1.5 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.45)] md:gap-3 md:px-3 md:py-2">
          <Link href="/" className="flex shrink-0 items-center leading-none" onClick={closeAll}>
            <Image src="/logo/OrjinalYatay.png" alt="WeeComi" width={148} height={36} className="h-6 w-auto brightness-0 invert md:h-7" priority />
          </Link>

          <div className="flex items-center gap-2 md:gap-2.5">
            <Link
              href="/contact"
              className="group inline-flex h-8 items-center rounded-lg bg-weecomi-orange pl-3 pr-2 font-heading text-[13px] font-medium text-white transition hover:bg-weecomi-orange/90 md:h-9 md:pl-3.5 md:pr-2.5"
            >
              <ButtonMotionContent icon={<ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />}>{t("ctaStart")}</ButtonMotionContent>
            </Link>
            <MenuToggleButton open={menuOpen} onClick={toggleMenu} />
          </div>
        </div>

        <AnimatePresence initial={false}>
          {menuOpen ? (
            <motion.div
              key="nav-panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={panelTransition}
              className="nav-menu-panel mt-3 max-h-[min(70vh,36rem)] overflow-y-auto overscroll-contain rounded-xl bg-[#2c2c2c] px-4 py-5 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.55)] md:max-h-[min(75vh,40rem)] md:px-5 md:py-6"
            >
              <nav aria-label="Primary">
                <ul className="space-y-1">
                  {navItems.map((item) => {
                    if (item.mega) {
                      const isActive = pathname.startsWith(item.href);

                      return (
                        <li key={item.key}>
                          <button
                            type="button"
                            onClick={() => setEcoOpen((value) => !value)}
                            className={cn(
                              "flex w-full items-center justify-between py-2.5 text-left font-heading text-xl leading-none text-white transition hover:text-weecomi-orange md:text-2xl",
                              isActive && "text-weecomi-orange",
                            )}
                            aria-expanded={ecoOpen}
                          >
                            <span>{t(item.key)}</span>
                            <ChevronDown
                              className={cn("h-5 w-5 shrink-0 text-white/50 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]", ecoOpen && "rotate-180 text-weecomi-orange")}
                              aria-hidden
                            />
                          </button>

                          <AnimatePresence initial={false}>
                            {ecoOpen ? (
                              <motion.div
                                key="eco-submenu"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={panelTransition}
                                className="overflow-hidden"
                              >
                                <div className="border-l border-white/12 pb-3 pl-4">
                                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 pt-1">
                                    <p className="font-heading text-[10px] font-medium text-white/40">{t("megaMenuEyebrow")}</p>
                                    <Link
                                      href="/ecosystem"
                                      onClick={closeAll}
                                      className="inline-flex items-center gap-1.5 font-heading text-[11px] font-medium text-weecomi-orange transition hover:text-white"
                                    >
                                      {t("allProducts")}
                                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                                    </Link>
                                  </div>

                                  <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                                    {productCategories.map((category) => {
                                      const categoryProducts = products.filter((product) => product.category === category.id);

                                      return (
                                        <div key={category.id}>
                                          <p className="mb-1.5 font-heading text-[10px] font-medium text-white/35">{tCat(category.translationKey)}</p>
                                          <ul>
                                            {categoryProducts.map((product) => (
                                              <li key={product.id}>
                                                <Link
                                                  href={getProductPath(product)}
                                                  onClick={closeAll}
                                                  className="group/product flex w-fit items-center justify-between gap-3 border-b border-white/6 py-1.5 text-[15px] text-white/70 last:border-b-0 transition hover:text-white"
                                                >
                                                  <span>{product.name}</span>
                                                  <span className="flex shrink-0 items-center gap-2">
                                                    {product.comingSoon ? <span className="font-heading text-[9px] text-white/35">{t("comingSoon")}</span> : null}
                                                    <ArrowRight className="h-3.5 w-3.5 text-weecomi-orange opacity-0 transition group-hover/product:opacity-100" aria-hidden />
                                                  </span>
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </li>
                      );
                    }

                    return (
                      <li key={item.key}>
                        <Link
                          href={item.href}
                          onClick={closeAll}
                          className={cn(
                            "block py-2.5 font-heading text-xl leading-none text-white transition hover:text-weecomi-orange md:text-2xl",
                            pathname.startsWith(item.href) && "text-weecomi-orange",
                          )}
                        >
                          {t(item.key)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
