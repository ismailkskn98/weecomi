import Image from "next/image";
import OrbitingItems from "@/components/animata/list/orbiting-items";
import { cn } from "@/lib/utils";
import BentoShell from "./bento-shell";
import "./ecosystem-cursors.css";

function CursorMark({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("h-8 w-8 drop-shadow-[0_8px_18px_rgba(13,13,13,0.22)] md:h-10 md:w-10", className)}>
      <path d="M4 3.2 L4 19.4 L8.6 15.2 L11.4 21.2 L14 20 L11.2 14 L17.2 13.6 Z" fill="currentColor" stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

/** Connection tile — orbiting logos + floating cursors */
export default function ConnectionCard({ title, description, labels, items }) {
  return (
    <BentoShell className="relative flex h-full flex-col p-6 md:p-7">
      <h3 className="font-heading text-xl leading-display text-weecomi-dark-gray md:text-2xl">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>

      <div className="relative flex min-w-0 flex-1 items-center justify-center overflow-hidden">
        <div className="relative">
          <OrbitingItems
            radius={50}
            pauseOnHover
            containerClassName="overflow-visible min-h-48"
            backgroundClassName="bg-[radial-gradient(circle_at_50%_45%,rgba(240,159,47,0.08),transparent_55%)]"
            center={
              <div className="flex size-14 items-center justify-center rounded-full bg-weecomi-dark-gray text-white shadow-[0_12px_30px_-12px_rgba(13,13,13,0.55)] md:size-16">
                <Image src="/logo/OrjinalSembol.png" alt="Weecomi" width={40} height={40} className="size-7 object-contain md:size-8" />
              </div>
            }
            items={items.map((item) => (
              <Image key={item.alt} src={item.src} alt={item.alt} width={28} height={28} className="size-6 object-contain md:size-7" />
            ))}
          />
          <span className="eco-cursor eco-cursor--a pointer-events-none absolute left-[18%] top-[34%] text-weecomi-blue" aria-hidden>
            <CursorMark />
          </span>
          <span className="eco-cursor eco-cursor--b pointer-events-none absolute right-[18%] top-[28%] text-weecomi-orange" aria-hidden>
            <CursorMark className="-scale-x-100" />
          </span>
        </div>
      </div>
    </BentoShell>
  );
}
