import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { getWhatsAppUrl } from '../utils/whatsapp'

export default function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-16 sm:py-20 px-5 sm:px-6 md:px-12 lg:px-24 bg-[var(--color-void)]" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="rounded-3xl bg-[var(--color-navy-deep)] text-white px-8 py-12 sm:px-12 sm:py-14 text-center relative overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[var(--color-primary)]/25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
              Comece a transformação digital da sua empresa
            </h2>
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
