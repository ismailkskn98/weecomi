"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

function isActivePath(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function FooterNavLink({ href, children, variant = "light" }) {
  const pathname = usePathname();
  const active = isActivePath(pathname, href);
  const isDark = variant === "dark";

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group/footer-link relative inline-flex items-center gap-2 text-sm transition",
        active
          ? "font-medium text-weecomi-orange"
          : isDark
            ? "text-white/65 hover:text-white"
            : "text-weecomi-dark-gray/75 hover:text-weecomi-dark-gray",
      )}
    >
      <span
        className={cn(
          "h-1 w-1 shrink-0 rounded-full transition",
          active
            ? "bg-weecomi-orange"
            : isDark
              ? "bg-transparent group-hover/footer-link:bg-white/35"
              : "bg-transparent group-hover/footer-link:bg-weecomi-dark-gray/25",
        )}
        aria-hidden
      />
      {children}
    </Link>
  );
}
