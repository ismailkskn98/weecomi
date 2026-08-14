"use client";

import { Link } from "@/i18n/navigation";
import CursorTracker from "@/components/animata/container/cursor-tracker";
import { cn } from "@/lib/utils";

/** Client leaf: CursorTracker only. Children stay server-rendered markup. */
export default function CursorLink({ href, label, className, children }) {
  if (!href) return <div className={className}>{children}</div>;

  const linked = (
    <Link href={href} className={cn("block", label && "md:cursor-none", className)}>
      {children}
    </Link>
  );

  if (!label) return linked;

  return (
    <CursorTracker label={label} labelClassName="bg-weecomi-orange text-white" className="block">
      {linked}
    </CursorTracker>
  );
}
