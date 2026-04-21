import { motion, useScroll, useTransform } from 'framer-motion'
import { useRotatingIndex } from '../hooks/useHeroCarousel'

function ScreenFrame({ slide, className = '', eager = false, ariaHidden = false }) {
  return (
    <div
      className={`relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-100 shadow-[0_40px_90px_-28px_rgba(0,0,0,0.7)] ring-1 ring-white/5 ${className}`}
    >
      <img
        src={slide.src}
        alt={ariaHidden ? '' : slide.alt}
        aria-hidden={ariaHidden || undefined}
        className="absolute inset-0 h-full w-full object-cover object-top"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        width={1024}
        height={640}
      />
    </div>
  )
}

function SideSlide({ slide, heroOverlap }) {
  if (heroOverlap) {
    return <ScreenFrame slide={slide} ariaHidden className="opacity-80" />
  }
  return (
    <div className="relative aspect-[16/10] w-full max-w-[200px] overflow-hidden rounded-xl border border-slate-200/90 bg-slate-900/80 opacity-60 shadow-md transition-opacity duration-500 lg:rounded-2xl lg:opacity-75">
      <img
        src={slide.src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top"
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
  if (heroOverlap) {
    return <ScreenFrame slide={slide} eager className="bg-slate-50" />
  }
  return (
    <div className="relative aspect-[16/10] w-full max-w-[min(100%,560px)] overflow-hidden rounded-2xl border border-slate-200 bg-slate-900/80 shadow-[0_24px_64px_-16px_rgba(15,23,42,0.2)]">
      <img
        src={slide.src}
        alt={slide.alt}
        className="absolute inset-0 h-full w-full object-cover object-top"
        loading="eager"
        decoding="async"
        width={960}
        height={600}
      />
    </div>
  )
}

function HeroOverlapCarousel({ slides, reduceMotion, active, setActive, prev, next }) {
  const { scrollY } = useScroll()
  const progress = useTransform(scrollY, [0, 420], [0, 1], { clamp: true })
  const leftX = useTransform(progress, (v) => `${reduceMotion ? 0 : 22 - 22 * v}%`)
  const rightX = useTransform(progress, (v) => `${reduceMotion ? 0 : -22 + 22 * v}%`)
  const sideY = useTransform(progress, (v) => (reduceMotion ? 0 : 14 - 14 * v))
  const sideScale = useTransform(progress, (v) => (reduceMotion ? 0.94 : 0.88 + 0.06 * v))
  const sideOpacity = useTransform(progress, (v) => (reduceMotion ? 0.9 : 0.55 + 0.4 * v))

  return (
    <div className="w-full">
      <div className="relative mx-auto flex w-full max-w-[1720px] items-end justify-center px-2 md:px-6 lg:px-10">
        <motion.div
          style={{ x: leftX, y: sideY, scale: sideScale, opacity: sideOpacity }}
          className="pointer-events-none absolute bottom-0 left-0 hidden w-[clamp(260px,30vw,560px)] origin-bottom-left md:block"
        >
          <SideSlide slide={slides[prev]} heroOverlap />
        </motion.div>

        <motion.div
          style={{ x: rightX, y: sideY, scale: sideScale, opacity: sideOpacity }}
          className="pointer-events-none absolute bottom-0 right-0 hidden w-[clamp(260px,30vw,560px)] origin-bottom-right md:block"
        >
          <SideSlide slide={slides[next]} heroOverlap />
        </motion.div>

        <div className="relative z-10 flex w-full justify-center">
          <div className="w-full max-w-[min(88vw,1120px)]">
            <CenterSlide slide={slides[active]} heroOverlap />
          </div>
        </div>
      </div>

      <div className="relative z-20 mt-6 flex justify-center gap-2 sm:mt-8">
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

export default function HeroScreensCarousel({ slides, reduceMotion, variant }) {
  const heroOverlap = variant === 'heroOverlap'
  const [active, setActive] = useRotatingIndex(slides.length, 5000, reduceMotion)
  const len = slides.length
  const prev = (active - 1 + len) % len
  const next = (active + 1) % len

  if (heroOverlap) {
    return (
      <HeroOverlapCarousel
        slides={slides}
        reduceMotion={reduceMotion}
        active={active}
        setActive={setActive}
        prev={prev}
        next={next}
      />
    )
  }

  return (
    <div className="w-full px-0 sm:px-4">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 md:gap-5 lg:gap-8">
        <div className="hidden shrink-0 md:block md:w-[min(22%,200px)]">
          <SideSlide slide={slides[prev]} heroOverlap={false} />
        </div>
        <div className="flex min-w-0 flex-1 justify-center">
          <CenterSlide slide={slides[active]} heroOverlap={false} />
        </div>
        <div className="hidden shrink-0 md:block md:w-[min(22%,200px)]">
          <SideSlide slide={slides[next]} heroOverlap={false} />
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
      <div className="relative mx-auto aspect-[16/9] max-w-[min(100%,min(82vw,71.4rem))] overflow-hidden rounded-2xl border border-white/20 bg-slate-100 shadow-[0_28px_70px_-18px_rgba(0,0,0,0.45)]">
        <img
          src={slides[active].src}
          alt={slides[active].alt}
          className="absolute inset-0 h-full w-full object-cover object-top"
          width={1024}
          height={640}
        />
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? 'w-6 bg-[var(--color-primary)]' : 'w-1.5 bg-slate-300'
            }`}
            aria-label={`Imagem ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
