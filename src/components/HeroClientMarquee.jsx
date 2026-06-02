import { heroClientLogos } from '../data/heroShowcase'

export default function HeroClientMarquee({ lightText = true }) {
  const row = [...heroClientLogos, ...heroClientLogos]

  return (
    <div className="w-full max-w-5xl mx-auto">
      <p
        className={`text-center text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-8 ${
          lightText ? 'text-slate-400' : 'text-[var(--color-muted)]'
        }`}
      >
        Empresas com as quais trabalhamos
      </p>
      <div className="relative overflow-hidden hero-marquee-mask py-2">
        <div className="hero-marquee-track">
          {row.map((logo, i) => (
            <div
              key={`${logo.label}-${logo.src ?? 't'}-${i}`}
              className="flex-shrink-0 flex items-center justify-center px-10 sm:px-14"
            >
              {logo.src ? (
                <img
                  src={logo.src}
                  alt={logo.alt ?? logo.label}
                  className="h-8 sm:h-10 w-auto max-w-[140px] object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-90 transition-all"
                />
              ) : (
                <span
                  className={`text-sm sm:text-base font-display font-semibold tracking-wide whitespace-nowrap select-none ${
                    lightText ? 'text-white/35' : 'text-slate-400'
                  }`}
                >
                  {logo.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
