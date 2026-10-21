import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getWhatsAppUrl } from '../utils/whatsapp'
import { systemDemoVideo } from '../data/heroShowcase'
import HeroClientMarquee from './HeroClientMarquee'
import HeroLaptopVideo from './HeroLaptopVideo'
import RevealWords from './RevealWords'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const waHref = getWhatsAppUrl('Olá! Gostaria de conversar sobre um projeto para minha empresa.')

  return (
    <section className="relative flex min-h-[min(100dvh,1100px)] flex-col overflow-x-hidden bg-gradient-to-b from-[#120a8f] via-[#191970] via-[42%] to-[#120a8f]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 42% at 50% -8%, rgba(129, 140, 248, 0.34), transparent 68%), radial-gradient(ellipse 26% 32% at 100% 26%, rgba(96, 165, 250, 0.16), transparent 70%), radial-gradient(ellipse 22% 28% at 0% 70%, rgba(255, 255, 255, 0.1), transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col justify-center px-5 pt-32 pb-12 sm:px-8 md:px-12 md:pb-16 lg:px-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-sky-300/95"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            Sites · Sistemas · Apps · Automação
          </motion.p>
          <RevealWords
            as="h1"
            trigger="mount"
            delay={0.05}
            text="Tecnologia que organiza seu negócio e escala com segurança"
            className="text-4xl font-display font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl"
          />
          <motion.p
            className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-blue-100/85 sm:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Da presença digital ao sistema no navegador. Entregamos com clareza, prazo e suporte depois do go-live.
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
              to="/sites"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/25 bg-white/15 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-white/20"
            >
              Criação de sites
            </Link>
          </motion.div>
        </div>

        <div className="mx-auto mt-16 w-full max-w-5xl md:mt-24">
          <HeroClientMarquee lightText />
        </div>
      </div>

      <div className="relative z-20 bg-gradient-to-b from-[#191970] to-[var(--color-void)] px-5 pt-10 pb-8 sm:px-8 md:px-12 md:pt-12 md:pb-10 lg:px-24">
        <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-200/75 md:mb-5">
          O sistema em movimento
        </p>
        <HeroLaptopVideo
          src={systemDemoVideo.src}
          poster={systemDemoVideo.poster}
          label={systemDemoVideo.label}
          reduceMotion={reduceMotion}
        />
      </div>
    </section>
  )
}
