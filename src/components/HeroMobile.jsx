import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getWhatsAppUrl } from '../utils/whatsapp'
import { systemDemoVideo } from '../data/heroShowcase'
import HeroAtmosphere from './HeroAtmosphere'
import HeroClientMarquee from './HeroClientMarquee'
import HeroLaptopVideo from './HeroLaptopVideo'

export default function HeroMobile() {
  const waHref = getWhatsAppUrl('Olá! Gostaria de conversar sobre um projeto para minha empresa.')
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#1d4ed8] text-white"
      style={{
        paddingLeft: 'max(1.25rem, env(safe-area-inset-left))',
        paddingRight: 'max(1.25rem, env(safe-area-inset-right))',
      }}
    >
      <HeroAtmosphere />

      <div className="relative z-10 flex min-h-[100svh] flex-col px-5 pt-24">
        <motion.div
          className="flex flex-1 flex-col justify-end pb-5 text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-display text-[clamp(2.8rem,16vw,4.25rem)] font-semibold leading-none tracking-[-0.07em] text-white">
            EMT
          </p>
          <h1 className="mt-4 font-display text-[1.55rem] font-semibold leading-snug tracking-tight text-white">
            Tecnologia que organiza o negócio.
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-white/85">
            Sites, sistemas e automação — com prazo claro e suporte depois do go-live.
          </p>
          <div className="mt-6 flex flex-col items-center gap-2.5">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] w-full max-w-xs items-center justify-center rounded-full bg-white px-6 py-3.5 text-base font-semibold text-[#1d4ed8]"
            >
              Falar no WhatsApp
            </a>
            <Link to="/sites" className="text-base font-medium text-white/80">
              Criação de sites
            </Link>
          </div>
        </motion.div>

        <div className="relative mx-auto mt-4 min-h-0 w-full max-w-md flex-1 pb-4">
          <HeroLaptopVideo
            src={systemDemoVideo.src}
            poster={systemDemoVideo.poster}
            label={systemDemoVideo.label}
            reduceMotion={reduceMotion}
            compact
          />
        </div>
      </div>

      <div className="relative z-10 px-5 pb-10 pt-16">
        <HeroClientMarquee lightText />
      </div>
      <div className="pointer-events-none h-16 bg-gradient-to-b from-transparent to-[var(--color-void)]" />
    </section>
  )
}
