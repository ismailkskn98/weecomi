import Image from "next/image";
import { cn } from "@/lib/utils";
import { getInitials } from "./utils";

export default function TestimonialAvatar({ name, image, size = "md", className, muted = false }) {
  const initials = getInitials(name);
  const sizeClass =
    size === "sm" ? "size-10 text-[11px]" : size === "lg" ? "size-14 text-sm md:size-16 md:text-base" : "size-12 text-sm";

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border bg-weecomi-dark-gray font-heading text-white",
        muted ? "border-black/10 grayscale" : "border-black/10",
        sizeClass,
        className,
      )}
    >
      <span aria-hidden>{initials}</span>
      {image ? (
        <Image
          src={image}
          alt=""
          width={64}
          height={64}
          sizes={size === "lg" ? "64px" : "48px"}
          className="absolute inset-0 size-full object-cover"
        />
      ) : null}
    </span>
  );
}
