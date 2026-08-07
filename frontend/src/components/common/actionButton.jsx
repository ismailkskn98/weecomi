import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import ButtonMotionContent from "@/components/common/button-motion-content";
import { cn } from "@/lib/utils";

/**
 * Arrow background is an absolute circle under the icon.
 * On hover it expands via CSS clip-path (.action-btn-blob).
 *
 * Note: do not fight variants with bg-/text- className overrides —
 * cn() does not merge Tailwind conflicts. Use the right variant instead.
 */
const variants = {
  primary: {
    root: "bg-weecomi-blue border-transparent hover:bg-weecomi-blue/90",
    blob: "bg-white",
    label: "text-white group-hover:text-weecomi-blue",
    arrow: "text-weecomi-blue",
  },
  secondary: {
    root: "bg-white border-weecomi-dark-gray/15",
    blob: "bg-weecomi-blue",
    label: "text-weecomi-dark-gray group-hover:text-white",
    arrow: "text-white",
  },
  /** Transparent / outline on dark backgrounds (CTA, footer) */
  outline: {
    root: "bg-transparent border-white/35 hover:bg-white hover:border-white",
    blob: "bg-white",
    label: "text-white group-hover:text-weecomi-dark-gray",
    arrow: "text-weecomi-dark-gray",
  },
  /** Transparent / outline on light backgrounds */
  ghost: {
    root: "bg-transparent border-weecomi-dark-gray/20 hover:bg-weecomi-dark-gray hover:border-weecomi-dark-gray",
    blob: "bg-weecomi-dark-gray",
    label: "text-weecomi-dark-gray group-hover:text-white",
    arrow: "text-white",
  },
  inverse: {
    root: "bg-weecomi-orange border-transparent",
    blob: "bg-weecomi-dark-gray",
    label: "text-weecomi-dark-gray group-hover:text-white",
    arrow: "text-white",
  },
  red: {
    root: "bg-weecomi-red border-transparent hover:bg-weecomi-red/90",
    blob: "bg-white",
    label: "text-white group-hover:text-weecomi-red",
    arrow: "text-weecomi-red",
  },
};

function getLabelClass(style, showArrow) {
  if (showArrow) return style.label;
  return style.label
    .split(" ")
    .filter((token) => !token.startsWith("group-hover:"))
    .join(" ");
}

function ButtonContent({ style, showArrow, children }) {
  return (
    <>
      {showArrow ? <span className={cn("action-btn-blob", style.blob)} aria-hidden /> : null}

      <ButtonMotionContent
        className="relative z-1"
        labelClassName={cn("action-btn-label", getLabelClass(style, showArrow))}
        icon={showArrow ? <ArrowUpRight className={cn("h-4 w-4", style.arrow)} strokeWidth={2.25} aria-hidden /> : null}
        iconClassName={showArrow ? "action-btn-arrow h-9 w-9 rounded-full" : ""}
      >
        {children}
      </ButtonMotionContent>
    </>
  );
}

export default function ActionButton({ href, onClick, variant = "primary", showArrow = false, external = false, className = "", children, type = "button", ...props }) {
  const style = variants[variant] || variants.primary;

  const classes = cn(
    "group relative inline-flex items-center overflow-hidden rounded-full border text-sm font-semibold transition-colors duration-300",
    showArrow ? "gap-2 py-1.5 pl-5 pr-1.5" : "px-5 py-2.5",
    style.root,
    // className only for layout (shrink-0, mt-*, etc.) — avoid bg/text overrides
    className,
  );

  const content = (
    <ButtonContent style={style} showArrow={showArrow}>
      {children}
    </ButtonContent>
  );

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...props}>
      {content}
    </button>
  );
}
