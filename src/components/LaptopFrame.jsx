export default function LaptopFrame({ children, className = '', compact = false }) {
  const dot = compact ? 'h-2 w-2' : 'h-3 w-3'
  const chromePad = compact ? 'p-1.5' : 'p-3 md:p-4'
  const titleBar = compact ? 'px-2 py-1' : 'px-3 py-2 md:py-2.5'
  const titleText = compact ? 'text-[9px]' : 'text-[10px] md:text-xs'

  return (
    <div className={`flex w-full flex-col items-center ${className}`}>
      <div
        className={`w-full overflow-hidden border-2 border-slate-500/70 shadow-[0_40px_90px_-28px_rgba(0,0,0,0.65)] ring-1 ring-white/10 ${chromePad} ${compact ? 'rounded-xl' : 'rounded-2xl'}`}
        style={{ background: 'linear-gradient(180deg, #cbd5e1 0%, #94a3b8 100%)' }}
      >
        <div
          className={`flex items-center gap-2 rounded-t-lg border border-slate-400/40 bg-slate-200/95 ${titleBar}`}
        >
          <div className="flex shrink-0 items-center gap-1.5" aria-hidden>
            <span className={`${dot} rounded-full bg-[#ff5f57] shadow-sm ring-1 ring-black/10`} />
            <span className={`${dot} rounded-full bg-[#febc2e] shadow-sm ring-1 ring-black/10`} />
            <span className={`${dot} rounded-full bg-[#28c840] shadow-sm ring-1 ring-black/10`} />
          </div>
          <span
            className={`min-w-0 flex-1 truncate text-center font-medium tracking-wide text-slate-600 ${titleText}`}
          >
            EMT informática
          </span>
          <div className={compact ? 'w-8 shrink-0' : 'w-[58px] shrink-0'} aria-hidden />
        </div>

        <div className={`relative aspect-[2/1] w-full overflow-hidden bg-slate-900 ${compact ? 'rounded-b-sm' : 'rounded-b-md'}`}>
          {children}
        </div>
      </div>

      {!compact && (
        <div className="flex flex-col items-center" aria-hidden>
          <div className="h-5 w-20 bg-gradient-to-b from-slate-400 to-slate-500 md:h-6 md:w-24" />
          <div className="h-2.5 w-44 rounded-b-xl rounded-t-sm bg-gradient-to-b from-slate-400 to-slate-600 shadow-[0_10px_20px_-8px_rgba(0,0,0,0.5)] md:h-3 md:w-56" />
        </div>
      )}
    </div>
  )
}
