import Image from "next/image";

const GAMES = [
  { src: "/images/weezard-logos/fallarim.avif", label: "Scratch Card", tone: "from-[#dbeafe] to-[#eff6ff]" },
  { src: "/images/weezard-logos/mayin_tarlasi.avif", label: "Minefield", tone: "from-[#fef3c7] to-[#fffbeb]" },
  { src: "/images/weezard-logos/jackpot.avif", label: "Jackpot", tone: "from-[#ffedd5] to-[#fff7ed]" },
  { src: "/images/weezard-logos/mining_symbol.avif", label: "Miner", tone: "from-[#ecfccb] to-[#f7fee7]" },
  { src: "/images/weezard-logos/carkifelek.avif", label: "Wheeler", tone: "from-[#fde68a]/40 to-[#fffbeb]" },
  { src: "/images/weezard-logos/trophy.avif", label: "Cryptonaut", tone: "from-[#e2e8f0] to-[#f8fafc]" },
  { src: "/images/weezard-logos/kahve_fali.avif", label: "WeeCandy", tone: "from-[#fce7f3] to-[#fdf2f8]" },
  { src: "/images/weezard-logos/dogum_haritasi.avif", label: "Birth Chart", tone: "from-[#dcfce7] to-[#f0fdf4]" },
  { src: "/images/weezard-logos/burc.avif", label: "Horoscope", tone: "from-[#ffedd5] to-[#fff7ed]" },
];

function NavIcon({ children, className = "" }) {
  return (
    <span className={`inline-flex size-[1.55em] items-center justify-center rounded-full ${className}`} aria-hidden>
      {children}
    </span>
  );
}

/** Light phone chrome + WeeZard home UI; UI scales via cqw, chrome radius stays rem (cqw on self = viewport → house dome) */
export default function WeezardPhoneMockup() {
  return (
    <div className="@container relative mx-auto aspect-[9/19.2] w-full">
      <div className="absolute inset-0 overflow-hidden rounded-[2.75rem] border border-black/10 bg-[#e8e8ec] p-[0.55rem] shadow-[0_28px_80px_rgba(13,13,13,0.18)] sm:rounded-[3rem] sm:p-[0.6rem] lg:rounded-[3.25rem]">
        <div
          className="relative flex h-full flex-col overflow-hidden rounded-[2.2rem] bg-[#f4f4f6] text-weecomi-dark-gray sm:rounded-[2.45rem] lg:rounded-[2.65rem]"
          style={{ fontSize: "3.85cqw" }}
        >
        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-[0.55em] z-30 h-[0.95em] w-[5.2em] -translate-x-1/2 rounded-full bg-[#1a1a1a]" aria-hidden />

        {/* Status */}
        <div className="relative z-10 flex items-center justify-between px-[1.1em] pb-[0.2em] pt-[0.55em] text-[0.72em] font-medium text-weecomi-dark-gray/50">
          <span>17:06</span>
          <span className="tracking-[0.08em]">▮▮▮ 69%</span>
        </div>

        {/* Top actions — mirrors real app */}
        <div className="relative z-10 flex items-center justify-between px-[0.85em] pt-[0.35em]">
          <div className="flex items-center gap-[0.35em]">
            <NavIcon className="bg-white text-[#F28C28] shadow-sm ring-1 ring-black/5">
              <svg viewBox="0 0 24 24" className="size-[0.85em]" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </NavIcon>
            <NavIcon className="bg-white text-[#E5A100] shadow-sm ring-1 ring-black/5">
              <svg viewBox="0 0 24 24" className="size-[0.85em]" fill="currentColor">
                <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2z" />
              </svg>
            </NavIcon>
          </div>
          <div className="flex items-center gap-[0.3em]">
            <NavIcon className="bg-white text-[#26A5E4] shadow-sm ring-1 ring-black/5">
              <svg viewBox="0 0 24 24" className="size-[0.8em]" fill="currentColor">
                <path d="M9.5 15.5 14 12l-4.5-3.5v2.2L2 12l7.5 1.3v2.2zm6.3-1.1L22 12l-6.2-2.4v1.5l3.3.9-3.3.9v1.5z" />
              </svg>
            </NavIcon>
            <NavIcon className="bg-white text-[#F28C28] shadow-sm ring-1 ring-black/5">
              <svg viewBox="0 0 24 24" className="size-[0.8em]" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 10v6M12 7h.01" />
              </svg>
            </NavIcon>
            <span className="inline-flex h-[1.55em] items-center gap-[0.2em] rounded-full bg-white px-[0.55em] text-[0.68em] font-medium text-weecomi-dark-gray shadow-sm ring-1 ring-black/5">
              EN
              <span className="text-[0.75em] text-muted-foreground">▾</span>
            </span>
          </div>
        </div>

        {/* Hero */}
        <div className="relative z-10 mt-[0.55em] flex items-start justify-between gap-[0.6em] px-[0.95em]">
          <div className="min-w-0 pt-[0.15em]">
            <p className="text-[0.78em] text-muted-foreground">Hello Elon</p>
            <p className="mt-[0.15em] font-heading text-[1.15em] leading-[1.15] tracking-tight text-weecomi-dark-gray">
              TO FUN ARE
              <br />
              YOU READY?
            </p>
          </div>
          <div className="relative size-[4.6em] shrink-0">
            <Image src="/logos/weezard.webp" alt="" fill className="object-contain drop-shadow-sm" sizes="120px" />
          </div>
        </div>

        {/* Balances */}
        <div className="relative z-10 mx-[0.95em] mt-[0.55em] flex items-center justify-between gap-[0.5em] rounded-[0.85em] border border-[#F28C28]/25 bg-white px-[0.75em] py-[0.55em] shadow-[0_6px_18px_rgba(242,140,40,0.08)]">
          <p className="text-[0.72em] leading-none">
            <span className="text-muted-foreground">Principal: </span>
            <span className="font-heading text-[#F28C28]">◆ 97.25</span>
          </p>
          <p className="text-[0.72em] leading-none">
            <span className="text-muted-foreground">Total Earnings: </span>
            <span className="font-heading text-[#F28C28]">◆ 3568.31</span>
          </p>
        </div>
        <p className="relative z-10 mt-[0.35em] px-[0.95em] text-center text-[0.62em] text-[#E5A100]">It is a WeeCoins ecosystem.</p>

        {/* 3×3 game grid */}
        <div className="relative z-10 mt-[0.55em] grid grid-cols-3 gap-[0.45em] px-[0.85em]">
          {GAMES.map((game) => (
            <div
              key={game.label}
              className={`flex aspect-square flex-col items-center justify-center rounded-[1em] border border-black/[0.05] bg-linear-to-b ${game.tone} px-[0.25em] shadow-[0_4px_12px_rgba(13,13,13,0.04)]`}
            >
              <div className="relative size-[2.55em]">
                <Image src={game.src} alt="" fill className="object-contain" sizes="80px" />
              </div>
              <p className="mt-[0.25em] line-clamp-2 text-center font-heading text-[0.55em] leading-tight text-weecomi-dark-gray/80">{game.label}</p>
            </div>
          ))}
        </div>

        {/* Sweepstakes */}
        <div className="relative z-10 mx-[0.85em] mt-[0.55em] flex items-center justify-center gap-[0.4em] rounded-[0.9em] border border-[#E5A100]/45 bg-[linear-gradient(90deg,#fff7ed,#ffffff,#fff7ed)] px-[0.75em] py-[0.65em] shadow-[0_0_0_1px_rgba(229,161,0,0.12),0_8px_20px_rgba(229,161,0,0.12)]">
          <span className="text-[0.95em]" aria-hidden>
            🎁
          </span>
          <span className="font-heading text-[0.78em] text-weecomi-dark-gray">All Sweepstakes</span>
          <span className="text-[0.95em]" aria-hidden>
            🎉
          </span>
        </div>

        {/* Bottom tab bar */}
        <div className="relative z-10 mx-[0.85em] mt-auto mb-[1.1em] flex items-center justify-between rounded-[1.4em] border border-black/[0.06] bg-white/90 px-[0.85em] py-[0.55em] shadow-[0_10px_28px_rgba(13,13,13,0.08)] backdrop-blur-sm">
          <NavIcon className="bg-[#22c55e] text-white">
            <svg viewBox="0 0 24 24" className="size-[0.75em]" fill="currentColor">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11A2.99 2.99 0 0 0 21 5a3 3 0 1 0-2.91 3.82L11 12.93l7.09 4.11A2.99 2.99 0 1 0 18 16.08z" />
            </svg>
          </NavIcon>
          <NavIcon className="bg-[#94a3b8] text-white">
            <svg viewBox="0 0 24 24" className="size-[0.75em]" fill="currentColor">
              <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" />
            </svg>
          </NavIcon>
          <span className="inline-flex size-[2.15em] -translate-y-[0.15em] items-center justify-center rounded-full bg-[#FCD535] text-[1.1em] font-bold text-weecomi-dark-gray shadow-[0_6px_16px_rgba(252,213,53,0.45)]" aria-hidden>
            ?
          </span>
          <NavIcon className="bg-[#ef4444] text-white">
            <svg viewBox="0 0 24 24" className="size-[0.75em]" fill="currentColor">
              <path d="M21 3H3v12h5v4l4-4h9V3z" />
            </svg>
          </NavIcon>
          <NavIcon className="bg-[#22c55e] text-white">
            <svg viewBox="0 0 24 24" className="size-[0.75em]" fill="currentColor">
              <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2A4.5 4.5 0 0 0 14 8.65v6.7A4.5 4.5 0 0 0 16.5 12z" />
            </svg>
          </NavIcon>
        </div>

        <div className="absolute bottom-[0.35em] left-1/2 z-20 h-[0.28em] w-[4.8em] -translate-x-1/2 rounded-full bg-black/15" aria-hidden />
        </div>
      </div>
    </div>
  );
}
