import { TextureOverlay } from "@/components/ui/texture-overlay";
import { cn } from "@/lib/utils";

export default function RouteStateBackground({ className = "" }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 42% 36% at 38% 32%, rgba(111,164,199,0.34), transparent 70%)",
            "radial-gradient(ellipse 34% 32% at 56% 34%, rgba(240,159,47,0.2), transparent 68%)",
            "radial-gradient(ellipse 28% 24% at 70% 24%, rgba(198,57,39,0.08), transparent 72%)",
            "linear-gradient(180deg, #f6f7f8 0%, #fff8f0 48%, #ffffff 100%)",
          ].join(","),
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "linear-gradient(rgba(13,13,13,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(13,13,13,0.35) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "url(/images/hikari/hero-texture.avif)",
          backgroundPosition: "top center",
          backgroundSize: "1024px 1024px",
        }}
      />

      <TextureOverlay texture="noise" tone="dark" opacity={0.045} />
    </div>
  );
}
