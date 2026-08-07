import { cn } from "@/lib/utils";

export default function ButtonMotionContent({ children, icon = null, className = "", labelClassName = "", iconClassName = "" }) {
  return (
    <span className={cn("button-motion inline-flex items-center gap-2", className)}>
      <span className={cn("button-motion-label", labelClassName)}>
        <span className="button-motion-text button-motion-text--current">{children}</span>
        <span className="button-motion-text button-motion-text--next" aria-hidden>
          {children}
        </span>
      </span>

      {icon ? (
        <span className={cn("button-motion-icon inline-flex shrink-0 items-center justify-center", iconClassName)} aria-hidden>
          {icon}
        </span>
      ) : null}
    </span>
  );
}
