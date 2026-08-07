export default function SectionHeader({ eyebrow, title, subtitle, light = false }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p
          className={`text-xs font-bold uppercase ${
            light ? "text-weecomi-orange" : "text-weecomi-blue"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`mt-3 text-3xl font-bold md:text-4xl ${light ? "text-white" : "text-weecomi-dark-gray"}`}>
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 text-base leading-relaxed md:text-lg ${light ? "text-white/75" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
