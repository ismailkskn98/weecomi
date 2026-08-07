import { StackCampaignCard } from "@/components/home/_shared";

/** Product showcase card — WeeSale */
export default function WeesaleCard({ index, title, description, metrics, image, href, cursorLabel }) {
  return (
    <StackCampaignCard
      index={index}
      title={title}
      metrics={metrics}
      image={image}
      imageAlt="WeeSale"
      href={href}
      cursorLabel={cursorLabel}
      cursorLabelClassName="bg-weecomi-dark-gray text-white"
    >
      {description}
    </StackCampaignCard>
  );
}
