import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getWhatsAppUrl } from '../utils/whatsapp'
import { heroCarouselSlides } from '../data/heroShowcase'
import HeroClientMarquee from './HeroClientMarquee'
import HeroScreensCarousel from './HeroScreensCarousel'

export default function Hero() {
  const [isMobile, setIsMobile] = useState(true)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile) return null

  const waHref = getWhatsAppUrl('Olá! Gostaria de conversar sobre um projeto para minha empresa.')

  return (
    <section className="relative flex min-h-[min(100dvh,1100px)] flex-col overflow-x-hidden bg-gradient-to-b from-[#120a8f] via-[#191970] via-[42%] to-[#120a8f]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[min(75vw,560px)] w-[min(130vw,880px)] -translate-x-1/2 rounded-full bg-indigo-400/15 blur-[100px]" />
        <div className="absolute top-1/4 right-0 h-72 w-72 rounded-full bg-blue-400/10 blur-[90px]" />
        <div className="absolute bottom-1/3 left-0 h-64 w-64 rounded-full bg-white/10 blur-[70px]" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-24 pt-32 pb-12 md:pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-sky-300/95"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            Sites · Sistemas · Apps · Automação
          </motion.p>
          <motion.h1
            className="text-4xl font-display font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Tecnologia que organiza seu negócio e escala com segurança
          </motion.h1>
          <motion.p
            className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-blue-100/85 sm:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Da presença digital ao sistema no navegador — entregamos com clareza, prazo e suporte depois do go-live.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#2563eb] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-colors hover:bg-blue-500"
            >
              Falar no WhatsApp
            </a>
            <Link
              to="/projetos"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white shadow-sm backdrop-blur-sm transition-colors hover:bg-white/15"
            >
              Ver mostruário
            </Link>
          </motion.div>
        </div>

        <div className="mx-auto mt-16 w-full max-w-5xl md:mt-24">
          <HeroClientMarquee lightText />
        </div>
      </div>

      <div className="relative z-20 bg-gradient-to-b from-[#191970] to-[var(--color-void)] pb-10 pt-12 md:pb-14 md:pt-16">
        <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-200/75 md:mb-5">
          Algumas das nossas entregas
        </p>
        <div className="relative z-20 mt-4 md:mt-6">
          <HeroScreensCarousel slides={heroCarouselSlides} reduceMotion={reduceMotion} variant="heroOverlap" />
        </div>
      </div>
    </section>
  )
}
