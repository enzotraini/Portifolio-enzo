import { useRotatingIndex } from '../hooks/useHeroCarousel'

function SideSlide({ slide, heroOverlap }) {
  const max = heroOverlap ? 'w-full max-w-full' : 'max-w-[200px]'
  return (
    <div
      className={`relative aspect-[16/10] w-full ${max} overflow-hidden rounded-xl border opacity-60 transition-opacity duration-500 lg:rounded-2xl lg:opacity-75 ${
        heroOverlap
          ? 'border-white/25 bg-slate-200 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)]'
          : 'border-slate-200/90 bg-slate-900/80 shadow-md'
      }`}
    >
      <img
        src={slide.src}
        alt=""
        className={`absolute inset-0 h-full w-full ${
          heroOverlap ? 'object-contain object-top' : 'object-cover object-top'
        }`}
        loading="lazy"
        decoding="async"
        width={400}
        height={250}
        aria-hidden
      />
    </div>
  )
}

function CenterSlide({ slide, heroOverlap }) {
  const max = heroOverlap
    ? 'max-w-[min(100%,min(82vw,2720px))]'
    : 'max-w-[min(100%,560px)]'
  return (
    <div
      className={`relative aspect-[16/10] w-full ${max} overflow-hidden rounded-2xl border ${
        heroOverlap
          ? 'border-white/30 bg-slate-200 shadow-[0_36px_90px_-24px_rgba(0,0,0,0.55)]'
          : 'border-slate-200 bg-slate-900/80 shadow-[0_24px_64px_-16px_rgba(15,23,42,0.2)]'
      }`}
    >
      <img
        src={slide.src}
        alt={slide.alt}
        className={`absolute inset-0 h-full w-full ${
          heroOverlap ? 'object-contain object-top' : 'object-cover object-top'
        }`}
        loading="eager"
        decoding="async"
        width={960}
        height={600}
      />
    </div>
  )
}

export default function HeroScreensCarousel({ slides, reduceMotion, variant }) {
  const heroOverlap = variant === 'heroOverlap'
  const [active, setActive] = useRotatingIndex(slides.length, 5000, reduceMotion)
  const len = slides.length
  const prev = (active - 1 + len) % len
  const next = (active + 1) % len

  const sideCol = heroOverlap
    ? 'md:w-[min(7vw,306px)] md:max-w-[306px]'
    : 'md:w-[min(22%,200px)]'
  const gaps = heroOverlap ? 'gap-1.5 md:gap-4 lg:gap-6' : 'gap-3 md:gap-5 lg:gap-8'
  const maxRow = heroOverlap ? 'w-full max-w-none' : 'max-w-6xl'
  const rowAlign = heroOverlap ? 'items-end justify-center' : 'items-center justify-center'

  return (
    <div className={`w-full px-0 sm:px-2 ${heroOverlap ? 'md:px-3 lg:px-5' : 'sm:px-4'}`}>
      <div className={`mx-auto flex ${maxRow} ${rowAlign} ${gaps}`}>
        <div className={`hidden shrink-0 md:block ${sideCol}`}>
          <SideSlide slide={slides[prev]} heroOverlap={heroOverlap} />
        </div>
        <div className="flex min-w-0 flex-1 justify-center md:items-end">
          <CenterSlide slide={slides[active]} heroOverlap={heroOverlap} />
        </div>
        <div className={`hidden shrink-0 md:block ${sideCol}`}>
          <SideSlide slide={slides[next]} heroOverlap={heroOverlap} />
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-2 sm:mt-8">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? 'w-8 bg-[var(--color-primary)]' : 'w-2 bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Imagem ${i + 1} de ${slides.length}`}
            aria-current={i === active ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  )
}

export function HeroScreensCarouselMobile({ slides, reduceMotion }) {
  const [active, setActive] = useRotatingIndex(slides.length, 5000, reduceMotion)

  return (
    <div className="w-full">
      <div className="relative mx-auto aspect-[16/10] max-w-[min(100%,min(82vw,71.4rem))] overflow-hidden rounded-2xl border border-white/20 bg-slate-200 shadow-[0_28px_70px_-18px_rgba(0,0,0,0.45)]">
        <img
          src={slides[active].src}
          alt={slides[active].alt}
          className="absolute inset-0 h-full w-full object-contain object-top"
          width={960}
          height={600}
        />
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${i === active ? 'w-6 bg-[var(--color-primary)]' : 'w-1.5 bg-slate-300'}`}
            aria-label={`Imagem ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
