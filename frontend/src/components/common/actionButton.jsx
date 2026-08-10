import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import ButtonMotionContent from "@/components/common/button-motion-content";
import { cn } from "@/lib/utils";

/**
 * Figma-like rectangular CTA: light radius + visible border, no pill/blob.
 *
 * Note: do not fight variants with bg-/text- className overrides —
 * cn() does not merge Tailwind conflicts. Use the right variant instead.
 */
const variants = {
  primary: {
    root: "bg-weecomi-blue border-white/30 hover:bg-weecomi-blue/90",
    label: "text-white",
    arrow: "text-white",
  },
  secondary: {
    root: "bg-white border-weecomi-dark-gray/20 hover:bg-weecomi-dark-gray hover:border-weecomi-dark-gray",
    label: "text-weecomi-dark-gray group-hover:text-white",
    arrow: "text-weecomi-dark-gray group-hover:text-white",
  },
  /** Transparent / outline on dark backgrounds (CTA, footer) */
  outline: {
    root: "bg-transparent border-white/40 hover:bg-white hover:border-white",
    label: "text-white group-hover:text-weecomi-dark-gray",
    arrow: "text-white group-hover:text-weecomi-dark-gray",
  },
  /** Transparent / outline on light backgrounds */
  ghost: {
    root: "bg-transparent border-weecomi-dark-gray/25 hover:bg-weecomi-dark-gray hover:border-weecomi-dark-gray",
    label: "text-weecomi-dark-gray group-hover:text-white",
    arrow: "text-weecomi-dark-gray group-hover:text-white",
  },
  inverse: {
    root: "bg-weecomi-orange border-weecomi-dark-gray/20 hover:bg-weecomi-orange/90",
    label: "text-white",
    arrow: "text-white",
  },
  red: {
    root: "bg-weecomi-red border-white/30 hover:bg-weecomi-red/90",
    label: "text-white",
    arrow: "text-white",
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
    <ButtonMotionContent
      className="relative z-1"
      labelClassName={cn("font-heading text-sm tracking-[-0.01em]", getLabelClass(style, showArrow))}
      icon={showArrow ? <ArrowRight className={cn("h-4 w-4", style.arrow)} strokeWidth={2.25} aria-hidden /> : null}
      iconClassName={showArrow ? "shrink-0" : ""}
    >
      {children}
    </ButtonMotionContent>
  );
}

export default function ActionButton({ href, onClick, variant = "primary", showArrow = false, external = false, className = "", children, type = "button", ...props }) {
  const style = variants[variant] || variants.primary;

  const classes = cn(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-md border px-4 py-3 text-sm font-semibold transition-colors duration-300 md:px-[18px] md:py-3.5 lg:px-[clamp(1rem,1.15vw,1.25rem)] lg:py-[clamp(0.7rem,0.95vw,1rem)]",
    showArrow ? "gap-2" : "",
    style.root,
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
