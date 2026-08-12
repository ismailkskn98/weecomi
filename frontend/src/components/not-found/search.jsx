"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { FileText, Package, Search } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { products, getProductPath } from "@/data/products";
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
} from "@/components/ui/combobox";
import { InputGroupAddon, InputGroupText } from "@/components/ui/input-group";

const pageKeys = [
  { href: "/", key: "home" },
  { href: "/ecosystem", key: "ecosystem" },
  { href: "/about", key: "about" },
  { href: "/news", key: "news" },
  { href: "/gallery", key: "gallery" },
  { href: "/contact", key: "contact" },
];

export default function NotFoundSearch() {
  const t = useTranslations("Nav");
  const tProducts = useTranslations("Products");
  const router = useRouter();

  const groups = useMemo(
    () => [
      {
        value: t("searchPages"),
        items: pageKeys.map((item) => ({
          id: item.href,
          href: item.href,
          label: t(item.key),
        })),
      },
      {
        value: t("searchProducts"),
        items: products.map((product) => ({
          id: product.id,
          href: getProductPath(product),
          label: product.name,
          title: tProducts(`${product.id}.title`),
        })),
      },
    ],
    [t, tProducts],
  );

  return (
    <Combobox
      items={groups}
      autoHighlight
      itemToStringLabel={(item) => item.label || item.value || ""}
      isItemEqualToValue={(item, value) => item.id === value.id}
      onValueChange={(item) => {
        if (item?.href) router.push(item.href);
      }}
    >
      <ComboboxInput
        placeholder={t("searchPlaceholder")}
        showTrigger={false}
        className="h-12 w-full rounded-md border-weecomi-dark-gray/20 bg-white/80"
        aria-label={t("search")}
      >
        <InputGroupAddon align="inline-end">
          <InputGroupText>
            <Search />
          </InputGroupText>
        </InputGroupAddon>
      </ComboboxInput>

      <ComboboxContent align="center">
        <ComboboxEmpty>{t("searchEmpty")}</ComboboxEmpty>
        <ComboboxList>
          {(group) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel>{group.value}</ComboboxLabel>
              <ComboboxCollection>
                {(item) => (
                  <ComboboxItem key={item.id} value={item}>
                    {item.title ? <Package className="text-muted-foreground" /> : <FileText className="text-muted-foreground" />}
                    <div className="flex min-w-0 flex-col gap-0.5 text-left">
                      <span>{item.label}</span>
                      {item.title ? <span className="truncate text-xs text-muted-foreground">{item.title}</span> : null}
                    </div>
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
