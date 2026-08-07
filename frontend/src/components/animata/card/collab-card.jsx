import { cn } from "@/lib/utils";
import "./collab-card.css";

const defaultCollaborators = [
  {
    name: "WeeNetwork",
    pill: "bg-weecomi-blue",
    pillText: "text-white",
    cursor: "text-weecomi-blue",
  },
  {
    name: "WeeCoins",
    pill: "bg-weecomi-orange",
    pillText: "text-white",
    cursor: "text-weecomi-orange",
  },
];

const defaultPresenceColors = ["#346c92", "#f09f2f", "#6fa4c7", "#c63927"];

function PresenceStack({ colors, extraCount, className }) {
  const overlap = "-ml-[1.08cqi]";

  return (
    <ul className={cn("m-0 flex list-none items-center p-0", className)} aria-hidden="true">
      {colors.map((color, index) => (
        <li
          key={`${color}-${index}`}
          className={cn("relative size-[3.25cqi] shrink-0", index > 0 && overlap)}
          style={{ zIndex: index + 1 }}
        >
          <span
            className="block size-full rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] ring-2 ring-[#0e0e12]"
            style={{ backgroundColor: color }}
          />
        </li>
      ))}
      {extraCount > 0 ? (
        <li className={cn("relative size-[3.25cqi] shrink-0", overlap)} style={{ zIndex: colors.length + 1 }}>
          <span className="flex size-full items-center justify-center rounded-full bg-[oklch(0.26_0.012_285)] font-mono text-[1.65cqi] font-medium leading-none tracking-tight text-white/88 tabular-nums shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] ring-2 ring-[#0e0e12]">
            +{extraCount}
          </span>
        </li>
      ) : null}
    </ul>
  );
}

function Cursor({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("h-[6.5cqi] w-[6.5cqi] drop-shadow-[0_2px_4px_rgba(0,0,0,0.28)]", className)}
    >
      <path
        d="M4 3.2 L4 19.4 L8.6 15.2 L11.4 21.2 L14 20 L11.2 14 L17.2 13.6 Z"
        fill="currentColor"
        stroke="white"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClickBurst({ className }) {
  return (
    <span
      data-burst=""
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inline-block h-[3cqi] w-[3cqi]",
        "before:absolute before:inset-[35%] before:rounded-full before:bg-current",
        "after:absolute after:inset-0 after:rounded-full",
        "after:bg-[conic-gradient(from_0deg,transparent_0_8%,currentColor_8%_12%,transparent_12%_33%,currentColor_33%_37%,transparent_37%_58%,currentColor_58%_62%,transparent_62%_83%,currentColor_83%_87%,transparent_87%)]",
        "after:mask-[radial-gradient(circle,transparent_38%,black_40%,black_60%,transparent_62%)]",
        className,
      )}
    />
  );
}

/**
 * Animata Collab Card — bento tile with live presence + animated cursors (CSS only).
 * @see https://animata.design/docs/card/collab-card
 */
export default function CollabCard({
  greeting = "hello!",
  eyebrow = "Now in multiplayer",
  intro = "editing",
  conjunction = "&",
  trailing = "",
  liveLabel = "Live · 4 editing",
  presenceColors = defaultPresenceColors,
  extraCount = 2,
  collaborators = defaultCollaborators,
  backgroundUrl,
  className,
}) {
  const [first, second] = collaborators;

  return (
    <div
      className={cn(
        "group/collab relative isolate aspect-3/2 w-full overflow-hidden rounded-[18px]",
        "border border-black/6 bg-white/90 text-weecomi-dark-gray shadow-[0_20px_50px_-40px_rgba(13,13,13,0.35)]",
        "@container",
        className,
      )}
      style={
        backgroundUrl
          ? {
              backgroundImage: `url(${backgroundUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {!backgroundUrl && (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(165deg,rgba(255,255,255,0.96)_0%,rgba(248,249,250,0.95)_100%)]"
        />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_18%_88%,color-mix(in_oklch,#346c92_14%,transparent)_0%,transparent_70%),radial-gradient(ellipse_60%_50%_at_88%_22%,color-mix(in_oklch,#f09f2f_16%,transparent)_0%,transparent_68%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(13,13,13,0.14)_1px,transparent_1.2px)] bg-size-[14px_14px] opacity-[0.12] mask-[radial-gradient(ellipse_at_center,black_40%,transparent_88%)]"
      />

      <header className="absolute inset-x-[5cqi] top-[4cqi] z-10 flex items-center justify-between gap-[2cqi]">
        <span className="flex min-w-0 items-center gap-[1.4cqi] text-[2.4cqi] font-medium leading-none tracking-tight text-weecomi-dark-gray/65">
          <span className="relative inline-flex h-[1.7cqi] w-[1.7cqi] shrink-0">
            <span className="collab-live-ping absolute inset-0 rounded-full bg-emerald-400/45" />
            <span className="relative inline-block h-full w-full rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.45)]" />
          </span>
          <span className="truncate leading-snug tabular-nums">{liveLabel}</span>
        </span>
        <PresenceStack colors={presenceColors} extraCount={extraCount} />
      </header>

      <div className="relative flex h-full w-full flex-col items-center justify-center gap-[3.2cqi] px-[5.5cqi] pt-[9cqi] pb-[5cqi]">
        <div className="relative w-full rounded-[1.5rem] border border-white/50 bg-[linear-gradient(180deg,#163247_0%,#0d1520_100%)] px-[5.5cqi] py-[4.8cqi] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <p className="max-w-[88%] text-center text-[2.75cqi] font-medium leading-snug tracking-tight text-weecomi-light-blue">
          {eyebrow}
        </p>

        <div className="relative mx-auto w-[80%] max-w-full">
          <div className="relative grid place-items-center rounded-[1.8cqi] border border-dashed border-weecomi-light-blue/50 bg-white/3 px-[5.5cqi] py-[4.2cqi]">
            {[
              "-left-[0.9cqi] -top-[0.9cqi]",
              "-right-[0.9cqi] -top-[0.9cqi]",
              "-left-[0.9cqi] -bottom-[0.9cqi]",
              "-right-[0.9cqi] -bottom-[0.9cqi]",
            ].map((pos) => (
              <span
                key={pos}
                aria-hidden="true"
                className={cn(
                  "absolute h-[1.5cqi] w-[1.5cqi] rounded-[0.25cqi] bg-[#122434] shadow-[0_2px_4px_rgba(0,0,0,0.28)] ring-[1px] ring-weecomi-light-blue/80",
                  pos,
                )}
              />
            ))}
            <p className="font-display text-[15cqi] leading-[0.92] font-medium tracking-[-0.035em] text-white">
              {greeting}
            </p>
          </div>

          <span
            aria-hidden="true"
            className="collab-cursor collab-cursor--host pointer-events-none absolute top-[-3.4cqi] left-[-2.8cqi] text-white/90"
          >
            <Cursor />
          </span>
        </div>

        <p className="flex max-w-full flex-wrap items-baseline justify-center gap-x-[1.5cqi] gap-y-[1.2cqi] text-[3.4cqi] font-medium leading-none tracking-tight text-white/95">
          <span className="text-white/72">{intro}</span>

          <span className="relative inline-flex items-center">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-[2.8cqi] py-[0.55cqi] text-[3.5cqi] leading-none font-semibold",
                first.pill,
                first.pillText ?? "text-white",
              )}
            >
              {first.name}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "collab-cursor collab-cursor--first pointer-events-none absolute right-[-1.8cqi] bottom-[-2.9cqi]",
                first.cursor,
              )}
            >
              <Cursor className="-scale-x-100" />
              <ClickBurst className="top-[-0.7cqi] right-[-0.7cqi]" />
            </span>
          </span>

          <span className="text-white/50">{conjunction}</span>

          <span className="relative inline-flex items-center">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-[2.8cqi] py-[0.55cqi] text-[3.5cqi] leading-none font-semibold",
                second.pill,
                second.pillText ?? "text-white",
              )}
            >
              {second.name}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "collab-cursor collab-cursor--second pointer-events-none absolute top-[-3.2cqi] right-[-2.8cqi]",
                second.cursor,
              )}
            >
              <Cursor />
              <ClickBurst className="bottom-[-0.7cqi] left-[-0.7cqi]" />
            </span>
          </span>

          {trailing ? <span className="text-white/80">{trailing}</span> : null}
        </p>
        </div>
      </div>
    </div>
  );
}
