import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Standalone arrow icon (optional reuse). Expanding circle lives in ActionButton CSS. */
export default function ButtonArrow({ className = "" }) {
  return <ArrowUpRight className={cn("h-4 w-4", className)} strokeWidth={2.25} aria-hidden />;
}
