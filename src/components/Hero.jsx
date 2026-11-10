import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { getWhatsAppUrl } from '../utils/whatsapp'
import { systemDemoVideo } from '../data/heroShowcase'
import HeroAtmosphere from './HeroAtmosphere'
import HeroClientMarquee from './HeroClientMarquee'
import HeroLaptopVideo from './HeroLaptopVideo'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const waHref = getWhatsAppUrl('Olá! Gostaria de conversar sobre um projeto para minha empresa.')
  const stageRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  })

  const copyOpacity = useTransform(scrollYProgress, [0, 0.1, 0.34], [1, 0.9, 0])
  const copyY = useTransform(scrollYProgress, [0, 0.34], [0, -28])

  return (
    <section id="hero" className="relative bg-[#1d4ed8] text-white">
      <HeroAtmosphere />

      <div ref={stageRef} className={reduceMotion ? 'relative min-h-svh' : 'relative h-[240svh]'}>
        <div className={reduceMotion ? 'relative min-h-svh' : 'sticky top-0 h-svh overflow-hidden'}>
          <div className="absolute inset-x-0 -bottom-[7%] top-36 flex items-end px-5 sm:px-8">
            <HeroLaptopVideo
              src={systemDemoVideo.src}
              poster={systemDemoVideo.poster}
              label={systemDemoVideo.label}
              reduceMotion={reduceMotion}
              scrollProgress={reduceMotion ? undefined : scrollYProgress}
            />
          </div>

          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-[calc(100svh-17.75rem-32px)] flex-col items-center justify-end px-5 pb-3 pt-24 text-center sm:px-8 md:h-[calc(100svh-18rem-32px)] md:pb-4"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="pointer-events-auto mx-auto max-w-4xl"
              style={reduceMotion ? undefined : { opacity: copyOpacity, y: copyY }}
            >
              <p className="font-display text-[clamp(2.85rem,6.5vw,5.5rem)] font-semibold leading-none tracking-[-0.07em] text-white">
                EMT
              </p>
              <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-[2.15rem]">
                Tecnologia que organiza o negócio.
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                Sites, sistemas e automação — com prazo claro e suporte depois do go-live.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#1d4ed8] transition-colors hover:bg-white/90"
                >
                  Falar no WhatsApp
                </a>
                <Link
                  to="/sites"
                  className="text-base font-medium text-white/80 transition-colors hover:text-white"
                >
                  Criação de sites
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="h-[12vh] md:h-[14vh]" aria-hidden />
      <div className="relative px-5 pb-16 sm:px-8 md:px-12 lg:px-24">
        <HeroClientMarquee lightText />
      </div>
      <div className="pointer-events-none h-24 bg-gradient-to-b from-transparent to-[var(--color-void)]" />
    </section>
  )
}
