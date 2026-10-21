import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { getWhatsAppUrl } from '../utils/whatsapp'
import RevealWords from './RevealWords'

export default function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="below-fold relative py-16 sm:py-20 px-5 sm:px-6 md:px-12 lg:px-24 bg-[var(--color-void)]" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="rounded-3xl bg-[var(--color-navy-deep)] text-white px-8 py-12 sm:px-12 sm:py-14 text-center relative overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 40% 50% at 100% 0%, rgba(29, 78, 216, 0.28), transparent 70%), radial-gradient(ellipse 34% 46% at 0% 100%, rgba(96, 165, 250, 0.14), transparent 70%)',
            }}
          />
          <div className="relative">
            <RevealWords
              text="Comece a transformação digital da sua empresa"
              className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4"
            />
            <p className="text-slate-300 max-w-2xl mx-auto mb-10 text-base sm:text-lg leading-relaxed">
              Agende uma conversa e entenda como sites, sistemas e automações podem simplificar o dia a
              dia do seu time.
            </p>
            <a
              href={getWhatsAppUrl('Olá! Gostaria de falar sobre um projeto para minha empresa.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white font-semibold px-10 py-4 min-h-[48px] hover:bg-[var(--color-primary-hover)] transition-colors shadow-lg"
            >
              Falar no WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
