import { StackCampaignCard } from "@/components/home/_shared";
import CriptoSwapsMedia, { CriptoSwapsBrand } from "./media";
import CriptoSwapsTradesLive from "./trades-live";
import { TextureOverlay } from "@/components/ui/texture-overlay";

/** Product showcase card — CriptoSwaps */
export default function CriptoSwapsCard({ index, title, description, href, disclaimer, cursorLabel }) {
  return (
    <StackCampaignCard
      index={index}
      showIndex={false}
      title={title}
      brand={<CriptoSwapsBrand />}
      footer={<CriptoSwapsTradesLive />}
      imageAlt="CriptoSwaps"
      media={<CriptoSwapsMedia />}
      href={href}
      disclaimer={disclaimer}
      cursorLabel={cursorLabel}
      cursorLabelClassName="bg-weecomi-dark-gray text-[#FCD535]"
      gridClassName="md:grid-cols-[0.95fr_1.05fr]"
      contentClassName="p-4 sm:p-5 md:p-6 lg:p-8"
      titleClassName="mt-3 text-lg leading-display sm:mt-4 sm:text-xl md:text-2xl lg:mt-5 lg:text-3xl"
      descriptionClassName="mt-2.5 line-clamp-2 text-sm leading-relaxed sm:mt-3 sm:line-clamp-3 md:line-clamp-3 lg:mt-4 lg:line-clamp-none lg:text-base"
      disclaimerClassName="mt-3 hidden lg:mt-3.5 lg:block"
      footerClassName="mt-4 hidden border-t border-black/6 pt-4 md:mt-5 md:block md:pt-5 lg:mt-5 lg:pt-5"
      mediaClassName="min-h-0"
      backgroundDiv={
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 z-0 bg-[linear-gradient(290deg,#FCD535_0%,transparent_55%)]" />
          <TextureOverlay
            texture="grid"
            tone="light"
            opacity={0.18}
            className="z-10 inset-y-0 right-0 left-auto w-1/2 bg-size-[64px_64px] bg-[linear-gradient(#FCD535_1px,transparent_1px),linear-gradient(90deg,#FCD535_1px,transparent_1px)] mask-[linear-gradient(to_left,black_80%,transparent)] [-webkit-mask-image:linear-gradient(to_left,black_80%,transparent)]"
          />
        </div>
      }
    >
      {description}
    </StackCampaignCard>
  );
}
