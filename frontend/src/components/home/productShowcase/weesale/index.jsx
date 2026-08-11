import { StackCampaignCard } from "@/components/home/_shared";
import WeesaleMedia, { WeesaleBrand } from "./media";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { showcaseTallCardClasses } from "../shared";

/** Product showcase card — WeeSale */
export default function WeesaleCard({ index, title, paragraphs, metrics, href, cursorLabel, mediaTitle }) {
  return (
    <StackCampaignCard
      index={index}
      showIndex={false}
      title={title}
      brand={<WeesaleBrand />}
      metrics={metrics}
      imageAlt="WeeSale"
      media={<WeesaleMedia title={mediaTitle} />}
      href={href}
      cursorLabel={cursorLabel}
      cursorLabelClassName="bg-weecomi-dark-gray text-white"
      gridClassName={showcaseTallCardClasses.gridClassName}
      contentClassName={showcaseTallCardClasses.contentClassName}
      titleClassName={showcaseTallCardClasses.titleClassName}
      descriptionClassName={showcaseTallCardClasses.descriptionClassName}
      footerClassName={showcaseTallCardClasses.footerClassName}
      mediaClassName={showcaseTallCardClasses.mediaClassName}
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
      {(paragraphs ?? []).map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </StackCampaignCard>
  );
}
