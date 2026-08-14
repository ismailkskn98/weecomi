import { TextureOverlay } from "@/components/ui/texture-overlay";
import AuthBrandPanel from "./auth-brand-panel";
import { AuthRevealItem } from "./auth-reveal";

export default function AuthShell({ title, description, children }) {
  return (
    <div className="flex min-h-[100dvh] flex-col md:grid md:grid-cols-[minmax(0,1.38fr)_minmax(22rem,1fr)]">
      <AuthBrandPanel />
      <main className="relative flex flex-1 flex-col justify-center bg-[#f6f7f8] px-6 py-10 md:px-12 lg:px-16 xl:px-20">
        <TextureOverlay texture="noise" tone="dark" opacity={0.04} />
        <div className="relative mx-auto w-full max-w-[24rem]">
          <AuthRevealItem>
            <h1 className="font-heading text-3xl font-normal leading-[1.12] tracking-[-0.03em] text-weecomi-dark-gray md:text-4xl">{title}</h1>
          </AuthRevealItem>
          {description ? (
            <AuthRevealItem delay={0.08}>
              <p className="mt-3 text-sm leading-relaxed text-weecomi-dark-gray/70 md:text-base">{description}</p>
            </AuthRevealItem>
          ) : null}
          <AuthRevealItem delay={0.16}>
            <div className="mt-8">{children}</div>
          </AuthRevealItem>
        </div>
      </main>
    </div>
  );
}
