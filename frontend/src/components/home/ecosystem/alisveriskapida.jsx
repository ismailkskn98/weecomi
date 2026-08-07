import Image from "next/image";
import { LayoutGrid, Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import FooterMarquee from "@/components/layout/footerMarquee";
import BentoShell from "./bento-shell";
import SearchTypewriter from "./search-typewriter";

export default function AlisverisKapidaCard({ eyebrow, title, description, badge, searchPhrases = [], tags = [], href, visitLabel }) {
  return (
    <BentoShell className="relative flex h-full min-h-105 flex-col">
      <Link href={href} className="relative z-10 flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-center gap-2 rounded-full border border-black/6 bg-[#f4f5f6] px-3 py-1.5">
          <Image src="/logos/alisveriskapida-icon.png" alt="" width={18} height={18} className="size-4 shrink-0 rounded-md object-contain" />
          <span className="truncate text-[11px] text-muted-foreground">alisveriskapida.com</span>
          <span className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full bg-black/5 text-muted-foreground" aria-hidden>
            <LayoutGrid className="size-2.5" strokeWidth={2.2} />
          </span>
        </div>

        <div className="mt-5 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/6 bg-[#f7f8f9] px-3 py-1 text-[11px] text-muted-foreground">
            {badge}
            <Image src="/logos/alisveriskapida-icon.png" alt="" width={16} height={16} className="size-4 rounded-md object-contain" />
          </span>
        </div>

        <p className="mt-5 text-center font-heading text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{eyebrow}</p>
        <h3 className="mt-2 text-center font-heading text-2xl leading-display text-weecomi-dark-gray md:text-[1.7rem]">{title}</h3>
        <p className="mx-auto mt-3 max-w-[18rem] text-center text-sm leading-relaxed text-muted-foreground">{description}</p>

        <div className="relative z-20 mx-auto mt-6 w-full max-w-70">
          <div className="flex items-center gap-2 rounded-full border border-black/6 bg-white py-1.5 pr-1.5 pl-4 shadow-[0_10px_28px_-16px_rgba(13,13,13,0.45)]">
            <SearchTypewriter phrases={searchPhrases} className="min-w-0 flex-1 text-[12px] text-muted-foreground" />
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e30613] text-white" aria-hidden>
              <Search className="size-3.5" strokeWidth={2.4} />
            </span>
          </div>
        </div>

        <span className="sr-only">{visitLabel}</span>
      </Link>

      <div className="relative z-20 mt-auto min-w-0 max-w-full overflow-hidden px-1 pb-2">
        <FooterMarquee tags={tags} elementClassName="bg-transparent text-white text-base font-medium sm:text-lg border-0" />
      </div>

      <Image
        src="/images/alisveris-card-bg.avif"
        alt=""
        width={500}
        height={600}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] w-full object-cover mask-[linear-gradient(to_top,black_72%,transparent)]"
      />
    </BentoShell>
  );
}
