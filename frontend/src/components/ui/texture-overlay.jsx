import { cn } from "@/lib/utils"

const darkPatterns = {
  dots: "bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.4)_1px,transparent_0)] bg-[length:8px_8px]",
  grid: "bg-[linear-gradient(rgba(0,0,0,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.3)_1px,transparent_1px)] bg-[length:12px_12px]",
  noise:
    "bg-[radial-gradient(circle_at_2px_2px,rgba(0,0,0,0.25)_1px,transparent_0)] bg-[length:6px_6px]",
  paperGrain:
    "bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.1)_0px,transparent_1px,transparent_3px),repeating-linear-gradient(90deg,rgba(0,0,0,0.1)_0px,transparent_1px,transparent_4px),repeating-linear-gradient(45deg,rgba(0,0,0,0.05)_0px,transparent_1px,transparent_5px)]",
  none: "",
}

const lightPatterns = {
  dots: "bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.35)_1px,transparent_0)] bg-[length:8px_8px]",
  grid: "bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[length:14px_14px]",
  noise:
    "bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.22)_1px,transparent_0)] bg-[length:5px_5px]",
  paperGrain:
    "bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.08)_0px,transparent_1px,transparent_3px),repeating-linear-gradient(90deg,rgba(255,255,255,0.06)_0px,transparent_1px,transparent_4px),repeating-linear-gradient(45deg,rgba(255,255,255,0.04)_0px,transparent_1px,transparent_5px)]",
  none: "",
}

export function TextureOverlay({ texture = "noise", opacity, tone = "dark", className }) {
  if (texture === "none") return null

  const patterns = tone === "light" ? lightPatterns : darkPatterns
  const pattern = patterns[texture] || patterns.noise

  return (
    <div
      className={cn("pointer-events-none absolute inset-0", pattern, className)}
      style={opacity != null ? { opacity } : undefined}
      aria-hidden
    />
  )
}
