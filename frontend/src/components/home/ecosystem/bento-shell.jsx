import { cn } from "@/lib/utils";

export default function BentoShell({ className, children }) {
  return <div className={cn("min-w-0 w-full overflow-hidden rounded-[24px] border border-black/6 bg-white shadow-[0_18px_50px_-36px_rgba(13,13,13,0.28)]", className)}>{children}</div>;
}
