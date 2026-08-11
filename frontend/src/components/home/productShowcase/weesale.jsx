import { StackCampaignCard } from "@/components/home/_shared";
import WeesaleMedia, { WeesaleBrand } from "./weesale-media";
import { TextureOverlay } from "@/components/ui/texture-overlay";

/** Product showcase card — WeeSale */
export default function WeesaleCard({ index, title, description, metrics, href, cursorLabel }) {
  return (
    <StackCampaignCard
      index={index}
      showIndex={false}
      title={title}
      brand={<WeesaleBrand />}
      metrics={metrics}
      imageAlt="WeeSale"
      media={<WeesaleMedia />}
      href={href}
      cursorLabel={cursorLabel}
      cursorLabelClassName="bg-weecomi-dark-gray text-white"
      gridClassName="md:grid-cols-[0.94fr_1.06fr]"
      contentClassName="p-4 sm:p-5 md:p-6 lg:p-8"
      titleClassName="mt-3 text-lg leading-display sm:mt-4 sm:text-xl md:text-2xl lg:mt-5 lg:text-3xl"
      descriptionClassName="mt-2.5 line-clamp-3 text-sm leading-relaxed sm:mt-3 md:line-clamp-none lg:mt-4 lg:text-base"
      backgroundDiv={
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(290deg,rgba(240,159,47,0.22)_0%,transparent_58%)]" />
          <TextureOverlay
            texture="grid"
            tone="light"
            opacity={0.12}
            className="inset-y-0 right-0 left-auto z-10 w-1/2 bg-size-[56px_56px] bg-[linear-gradient(rgba(240,159,47,0.42)_1px,transparent_1px),linear-gradient(90deg,rgba(240,159,47,0.42)_1px,transparent_1px)] mask-[linear-gradient(to_left,black_78%,transparent)] [-webkit-mask-image:linear-gradient(to_left,black_78%,transparent)]"
          />
        </div>
      }
    >
      {description}
    </StackCampaignCard>
  );
}
