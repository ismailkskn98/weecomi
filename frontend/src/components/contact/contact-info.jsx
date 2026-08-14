import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Mail, Phone } from "lucide-react";
import { getProductCoverImage } from "@/data/productImages";

export default async function ContactInfo() {
  const t = await getTranslations("Contact");
  const coverImage = getProductCoverImage("weecomibot");

  return (
    <aside className="relative overflow-hidden rounded-[18px] bg-[#f7f8f9] lg:sticky lg:top-28">
      <div className="relative aspect-[625/420] w-full overflow-hidden bg-[#ebebeb]">
        <Image
          src={coverImage}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 625px"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-weecomi-dark-gray/70 via-weecomi-dark-gray/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
          <p className="font-heading text-[11px] tracking-[0.12em] text-white/75">{t("supportLabel")}</p>
          <p className="mt-2 font-heading text-2xl md:text-3xl">{t("supportPhone")}</p>
        </div>
      </div>

      <div className="space-y-4 p-6 md:p-8">
        <div className="flex items-start gap-3">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-weecomi-orange/15 text-weecomi-orange">
            <Phone className="size-4" aria-hidden />
          </span>
          <div>
            <p className="font-heading text-xs text-muted-foreground">{t("phone")}</p>
            <p className="mt-1 font-heading text-base text-weecomi-dark-gray">{t("supportPhone")}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-weecomi-orange/15 text-weecomi-orange">
            <Mail className="size-4" aria-hidden />
          </span>
          <div>
            <p className="font-heading text-xs text-muted-foreground">{t("email")}</p>
            <a href="mailto:info@weecomi.com" className="mt-1 inline-block font-heading text-base text-weecomi-dark-gray transition hover:text-weecomi-orange">
              info@weecomi.com
            </a>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{t("subtitle")}</p>
      </div>
    </aside>
  );
}
