import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { getWhatsAppUrl } from '../utils/whatsapp'
import { heroCarouselSlides } from '../data/heroShowcase'
import HeroClientMarquee from './HeroClientMarquee'
import { HeroScreensCarouselMobile } from './HeroScreensCarousel'

export default function HeroMobile() {
  const waHref = getWhatsAppUrl('Olá! Gostaria de conversar sobre um projeto para minha empresa.')
  const reduceMotion = useReducedMotion()

  return (
    <section
      className="relative flex min-h-[100svh] min-h-[100dvh] flex-col overflow-hidden bg-gradient-to-b from-[#120a8f] via-[#191970] via-[42%] to-[#120a8f] px-5 pb-10 pt-28"
      style={{
        paddingLeft: 'max(1.25rem, env(safe-area-inset-left))',
        paddingRight: 'max(1.25rem, env(safe-area-inset-right))',
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 left-1/2 h-64 w-[130%] -translate-x-1/2 rounded-full bg-indigo-400/15 blur-[90px]" />
        <div className="absolute bottom-1/3 right-0 h-48 w-48 rounded-full bg-blue-400/10 blur-[60px]" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-300/95">
            Sites · Sistemas · Automação
          </p>
          <h1 className="font-display text-[1.65rem] font-bold leading-tight tracking-tight text-white sm:text-3xl">
            Tecnologia que organiza seu negócio
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-blue-100/85">
            Soluções digitais com resultado, prazo claro e suporte após a entrega.
          </p>
        </div>

        <div className="mt-10">
          <HeroScreensCarouselMobile slides={heroCarouselSlides} reduceMotion={reduceMotion} />
        </div>

        <div className="mt-12">
          <HeroClientMarquee lightText />
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-12">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#2563eb] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25"
          >
            Falar no WhatsApp
          </a>
          <Link
            to="/sites"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white shadow-sm backdrop-blur-sm"
          >
            Criação de sites
          </Link>
        </div>
      </div>
    </section>
  )
}
