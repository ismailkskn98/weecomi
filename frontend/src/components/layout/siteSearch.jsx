"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { FileText, Package, Search } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { productCategories, products, getProductPath } from "@/data/products";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

const pageKeys = [
  { href: "/", key: "home" },
  { href: "/ecosystem", key: "ecosystem" },
  { href: "/about", key: "about" },
  { href: "/news", key: "news" },
  { href: "/gallery", key: "gallery" },
  { href: "/contact", key: "contact" },
];

export default function SiteSearch({ className }) {
  const t = useTranslations("Nav");
  const tProducts = useTranslations("Products");
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const runCommand = useCallback(
    (href) => {
      setOpen(false);
      router.push(href);
    },
    [router],
  );

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const pages = useMemo(
    () =>
      pageKeys.map((item) => ({
        href: item.href,
        label: t(item.key),
        value: `${t(item.key)} ${item.key} ${item.href}`,
      })),
    [t],
  );

  const productItems = useMemo(
    () =>
      products.map((product) => {
        const category = productCategories.find((item) => item.id === product.category);
        const title = tProducts(`${product.id}.title`);
        const description = tProducts(`${product.id}.description`);

        return {
          id: product.id,
          href: getProductPath(product),
          label: product.name,
          title,
          value: `${product.name} ${title} ${description} ${category?.id ?? ""}`,
        };
      }),
    [tProducts],
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-full border border-border bg-white/80 text-sm text-muted-foreground transition hover:border-weecomi-blue/30 hover:bg-white hover:text-weecomi-dark-gray",
          "w-10 justify-center px-0 md:w-auto md:min-w-50 md:max-w-60 md:justify-start md:px-3",
          className,
        )}
        aria-label={t("search")}
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="hidden flex-1 truncate text-left md:inline">{t("searchPlaceholder")}</span>
        <kbd className="pointer-events-none hidden h-5 shrink-0 select-none items-center rounded border border-border bg-weecomi-light-gray/70 px-1.5 font-heading text-[10px] font-medium text-muted-foreground lg:inline-flex">
          ⌘K
        </kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title={t("searchDialogTitle")}
        description={t("searchDialogDescription")}
        className="top-[18%] w-[calc(100%-1.5rem)] sm:top-1/3 sm:max-w-xl"
        showCloseButton
      >
        <Command>
          <CommandInput placeholder={t("searchDialogPlaceholder")} />
          <CommandList className="pb-1 sm:pb-1.5">
            <CommandEmpty>{t("searchEmpty")}</CommandEmpty>

            <CommandGroup heading={t("searchPages")}>
              {pages.map((page) => (
                <CommandItem key={page.href} value={page.value} onSelect={() => runCommand(page.href)}>
                  <FileText className="text-muted-foreground" />
                  <span>{page.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandGroup heading={t("searchProducts")}>
              {productItems.map((item) => (
                <CommandItem key={item.id} value={item.value} onSelect={() => runCommand(item.href)}>
                  <Package className="text-muted-foreground" />
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="font-medium">{item.label}</span>
                    <span className="truncate text-xs text-muted-foreground">{item.title}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
