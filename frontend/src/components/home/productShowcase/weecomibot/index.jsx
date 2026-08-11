import { StackCampaignCard } from "@/components/home/_shared";
import WeebotMedia, { WeebotBrand } from "./media";
import WeebotTerminalLive from "./terminal-live";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { showcaseCardClasses } from "../shared";

/** Product showcase card — WeeComi Bot */
export default function WeecomiBotCard({ index, title, description, href, disclaimer, cursorLabel, mediaTitle }) {
  return (
    <StackCampaignCard
      index={index}
      showIndex={false}
      title={title}
      brand={<WeebotBrand />}
      footer={<WeebotTerminalLive />}
      imageAlt="WeeComi Bot"
      media={<WeebotMedia title={mediaTitle} />}
      href={href}
      disclaimer={disclaimer}
      cursorLabel={cursorLabel}
      cursorLabelClassName="bg-weecomi-dark-gray text-white"
      gridClassName={showcaseCardClasses.gridClassName}
      contentClassName={showcaseCardClasses.contentClassName}
      titleClassName={showcaseCardClasses.titleClassName}
      descriptionClassName={showcaseCardClasses.descriptionClassName}
      disclaimerClassName={showcaseCardClasses.disclaimerClassName}
      footerClassName={`${showcaseCardClasses.footerClassName} hidden md:block`}
      mediaClassName={showcaseCardClasses.mediaClassName}
      backgroundDiv={
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 z-0 bg-[linear-gradient(290deg,#5bfcb1_0%,transparent_55%)]" />
          <TextureOverlay
            texture="grid"
            tone="light"
            opacity={0.18}
            className="z-10 inset-y-0 right-0 left-auto w-1/2 bg-size-[64px_64px] bg-[linear-gradient(#5bfcb1_1px,transparent_1px),linear-gradient(90deg,#5bfcb1_1px,transparent_1px)] mask-[linear-gradient(to_left,black_80%,transparent)] [-webkit-mask-image:linear-gradient(to_left,black_80%,transparent)]"
          />
        </div>
      }
    >
      {description}
    </StackCampaignCard>
  );
}
