import StatValue from "./stat-value";

export default function StatItem({ value, suffix, label, text }) {
  return (
    <div className="text-center sm:text-left">
      <StatValue value={value} suffix={suffix} />
      <p className="mt-3 font-heading text-sm text-weecomi-orange md:text-base">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-[15px] md:leading-relaxed">{text}</p>
    </div>
  );
}
