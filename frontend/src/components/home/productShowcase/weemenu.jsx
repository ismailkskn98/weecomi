import { StackCampaignCard } from "@/components/home/_shared";

/** Product showcase card — WeeMenu */
export default function WeemenuCard({ index, title, description, metrics, image, href, cursorLabel }) {
  return (
    <StackCampaignCard
      index={index}
      title={title}
      metrics={metrics}
      image={image}
      imageAlt="WeeMenu"
      href={href}
      cursorLabel={cursorLabel}
      cursorLabelClassName="bg-weecomi-dark-gray text-white"
    >
      {description}
    </StackCampaignCard>
  );
}
