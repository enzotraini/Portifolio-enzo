import { motion, useScroll, useTransform } from 'framer-motion'
import { useRotatingIndex } from '../hooks/useHeroCarousel'
import LaptopFrame from './LaptopFrame'

function ScreenImage({ slide, eager = false, ariaHidden = false }) {
  return (
    <img
      src={slide.src}
      alt={ariaHidden ? '' : slide.alt}
      aria-hidden={ariaHidden || undefined}
      className="absolute inset-0 h-full w-full object-cover object-top"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      width={1920}
      height={960}
    />
  )
}

function ScreenFrame({ slide, className = '', eager = false, ariaHidden = false, compact = false }) {
  return (
    <LaptopFrame className={className} compact={compact}>
      <ScreenImage slide={slide} eager={eager} ariaHidden={ariaHidden} />
    </LaptopFrame>
  )
}

function SideSlide({ slide, heroOverlap }) {
  if (heroOverlap) {
    return <ScreenFrame slide={slide} ariaHidden compact className="opacity-80" />
  }
  return (
    <LaptopFrame compact className="opacity-60 lg:opacity-75">
      <ScreenImage slide={slide} ariaHidden />
    </LaptopFrame>
  )
}

function CenterSlide({ slide, heroOverlap }) {
  if (heroOverlap) {
    return <ScreenFrame slide={slide} eager />
  }
  return (
    <LaptopFrame>
      <ScreenImage slide={slide} eager />
    </LaptopFrame>
  )
}

function HeroOverlapCarousel({ slides, reduceMotion, active, setActive, prev, next }) {
  const { scrollY } = useScroll()
  const progress = useTransform(scrollY, [0, 420], [0, 1], { clamp: true })
  const sideOffset = useTransform(progress, (v) => (reduceMotion ? 52 : 52 - 10 * v))
  const sideScale = useTransform(progress, (v) => (reduceMotion ? 0.9 : 0.84 + 0.08 * v))
  const sideOpacity = useTransform(progress, (v) => (reduceMotion ? 0.65 : 0.45 + 0.4 * v))
  const leftX = useTransform(sideOffset, (o) => `calc(-50% - ${o}%)`)
  const rightX = useTransform(sideOffset, (o) => `calc(-50% + ${o}%)`)

  return (
    <div className="w-full overflow-hidden">
      <div className="relative mx-auto w-full max-w-4xl">
        <div className="relative mx-auto w-full">
          <motion.div
            style={{ x: leftX, scale: sideScale, opacity: sideOpacity }}
            className="pointer-events-none absolute top-0 left-1/2 z-0 hidden w-[min(78%,520px)] origin-center md:block"
          >
            <SideSlide slide={slides[prev]} heroOverlap />
          </motion.div>

          <motion.div
            style={{ x: rightX, scale: sideScale, opacity: sideOpacity }}
            className="pointer-events-none absolute top-0 left-1/2 z-0 hidden w-[min(78%,520px)] origin-center md:block"
          >
            <SideSlide slide={slides[next]} heroOverlap />
          </motion.div>

          <div className="relative z-10 w-full">
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
      <div className="relative mx-auto max-w-[min(100%,min(82vw,56rem))]">
        <LaptopFrame>
          <ScreenImage slide={slides[active]} eager />
        </LaptopFrame>
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
