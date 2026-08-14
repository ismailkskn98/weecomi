import { cn } from "@/lib/utils";

export default function BracketTag({ children, className }) {
  return <p className={cn("font-heading text-[11px] font-normal uppercase tracking-[0.08em] text-muted-foreground md:text-xs", className)}>[ {children} ]</p>;
}
