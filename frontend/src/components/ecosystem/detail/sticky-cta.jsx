import ActionButton from "@/components/common/actionButton";

export default function StickyCta({ title, subtitle, contactLabel, visitLabel, visitUrl }) {
  return (
    <aside className="lg:sticky lg:top-28">
      <div className="flex flex-col rounded-2xl bg-weecomi-dark-gray p-7 text-white md:p-8">
        <h2 className="font-heading text-[clamp(1.35rem,2.4vw,1.75rem)] leading-snug">{title}</h2>
        {subtitle ? <p className="mt-4 text-sm leading-relaxed text-white/65 md:text-[0.95rem]">{subtitle}</p> : null}
        <ActionButton href="/contact" variant="inverse" showArrow className="mt-7">
          {contactLabel}
        </ActionButton>
        {visitUrl && visitLabel ? (
          <a
            href={visitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center font-heading text-sm text-white/55 transition hover:text-weecomi-orange"
          >
            {visitLabel}
          </a>
        ) : null}
      </div>
    </aside>
  );
}
