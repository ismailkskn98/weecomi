import FeatureProgressList from "@/components/ecosystem/feature-progress-list";

export default function DetailContent({
  aboutTitle,
  longDescription,
  disclaimer,
  featuresTitle,
  features = [],
  audienceTitle,
  audience = [],
  howTitle,
  howItWorks = [],
  highlight,
}) {
  return (
    <div className="min-w-0 space-y-12 md:space-y-14">
      <div data-eco-block>
        <h2 className="font-heading text-[clamp(1.45rem,2.8vw,1.85rem)] leading-tight text-weecomi-dark-gray">{aboutTitle}</h2>
        {longDescription ? (
          <p className="mt-5 text-base leading-[1.8] text-weecomi-dark-gray/70 md:text-[1.05rem] md:leading-[1.85]">{longDescription}</p>
        ) : null}
        {disclaimer ? <p className="mt-5 text-sm leading-relaxed text-weecomi-dark-gray/50">{disclaimer}</p> : null}
      </div>

      {features.length ? (
        <div data-eco-block>
          <h2 className="font-heading text-[clamp(1.45rem,2.8vw,1.85rem)] leading-tight text-weecomi-dark-gray">{featuresTitle}</h2>
          <div className="mt-6">
            <FeatureProgressList items={features} />
          </div>
        </div>
      ) : null}

      {audience.length ? (
        <div data-eco-block>
          <h2 className="font-heading text-[clamp(1.45rem,2.8vw,1.85rem)] leading-tight text-weecomi-dark-gray">{audienceTitle}</h2>
          <p className="mt-5 text-base leading-[1.8] text-weecomi-dark-gray/70 md:text-[1.05rem]">{audience.join(", ")}.</p>
        </div>
      ) : null}

      {highlight ? (
        <div data-eco-block className="rounded-2xl bg-[#f4f4f4] px-6 py-5 md:px-7 md:py-6">
          <p className="text-base leading-relaxed text-weecomi-dark-gray/85 md:text-[1.05rem] md:leading-[1.7]">{highlight}</p>
        </div>
      ) : null}

      {howItWorks.length ? (
        <div data-eco-block>
          <h2 className="font-heading text-[clamp(1.45rem,2.8vw,1.85rem)] leading-tight text-weecomi-dark-gray">{howTitle}</h2>
          <div className="mt-5 space-y-6">
            {howItWorks.map((step) => (
              <div key={step.title}>
                <h3 className="font-heading text-lg text-weecomi-dark-gray md:text-xl">{step.title}</h3>
                <p className="mt-2 text-base leading-[1.8] text-weecomi-dark-gray/70">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
