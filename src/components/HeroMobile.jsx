import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { getWhatsAppUrl } from '../utils/whatsapp'
import { systemDemoVideo } from '../data/heroShowcase'
import HeroClientMarquee from './HeroClientMarquee'
import HeroLaptopVideo from './HeroLaptopVideo'
import RevealWords from './RevealWords'

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
      <div className="relative z-10 flex flex-1 flex-col">
        <div className="text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-300/95">
            Sites · Sistemas · Automação
          </p>
          <RevealWords
            as="h1"
            trigger="mount"
            text="Tecnologia que organiza seu negócio"
            className="font-display text-[1.65rem] font-bold leading-tight tracking-tight text-white sm:text-3xl"
          />
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-blue-100/85">
            Soluções digitais com resultado, prazo claro e suporte após a entrega.
          </p>
        </div>

        <div className="mt-10">
          <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-200/75">
            O sistema em movimento
          </p>
          <HeroLaptopVideo
            src={systemDemoVideo.src}
            poster={systemDemoVideo.poster}
            label={systemDemoVideo.label}
            reduceMotion={reduceMotion}
          />
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
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/25 bg-white/15 px-6 py-3.5 text-sm font-semibold text-white shadow-sm"
          >
            Criação de sites
          </Link>
        </div>
      </div>
    </section>
  )
}
