/** Numbered hairline feature list - no decorative progress bars. */
export default function FeatureProgressList({ items = [] }) {
  if (!items.length) return null;

  return (
    <ul className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
      {items.map((feature, index) => (
        <li key={feature} className="grid gap-2 py-5 sm:grid-cols-[3.5rem_1fr] sm:items-baseline sm:gap-6 sm:py-6">
          <span className="font-heading text-[11px] text-weecomi-orange">{String(index + 1).padStart(2, "0")}</span>
          <p className="font-heading text-base text-weecomi-dark-gray md:text-lg">{feature}</p>
        </li>
      ))}
    </ul>
  );
}
