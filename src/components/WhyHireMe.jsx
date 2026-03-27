import { useState, useEffect } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { getWhatsAppUrl } from '../utils/whatsapp'

const benefits = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3a.75.75 0 100-1.5.75.75 0 000 1.5z" />
      </svg>
    ),
    title: 'Atendimento próximo',
    text: 'Falamos a língua do seu negócio, com acompanhamento humano em cada etapa.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
    title: 'Comunicação clara',
    text: 'Escopo, prazos e entregas definidos — você sempre sabe o que esperar.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Qualidade e prazo',
    text: 'Performance, usabilidade e código pensados para durar e evoluir.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655-5.653a2.548 2.548 0 010-3.586L11.42 15.17z" />
      </svg>
    ),
    title: 'Suporte após o go-live',
    text: 'Ajustes, melhorias e suporte técnico quando sua operação precisar.',
  },
]

export default function WhyHireMe() {
  const ref = useRef(null)
  const [isMobile, setIsMobile] = useState(true)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const waHref = getWhatsAppUrl('Olá! Quero entender como a EMT pode ajudar minha empresa.')

  return (
    <section id="diferenciais" className="relative py-20 sm:py-24 md:py-28 overflow-hidden bg-[var(--color-void)]" ref={ref}>
      <div className="relative px-5 sm:px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        <motion.p
          className="text-center text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)] mb-3"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          Por que a EMT
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl font-display font-bold mb-4 text-center text-[var(--color-navy)]"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.04 }}
        >
          Mais que código: parceria com o seu time
        </motion.h2>
        <motion.p
          className="text-center text-[var(--color-muted)] max-w-2xl mx-auto mb-14 text-lg"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          Você precisa de soluções que funcionem no mundo real — com suporte e evolução depois da entrega.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {benefits.map((item, i) => (
            <motion.div
              key={item.title}
              className="group flex flex-col gap-3 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/20 transition-all duration-300"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.06 }}
            >
              <span className="inline-flex w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] items-center justify-center">
                {item.icon}
              </span>
              <h3 className="text-lg font-display font-bold text-[var(--color-navy)]">{item.title}</h3>
              <p className="text-[var(--color-muted)] leading-relaxed text-sm sm:text-base">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-14 text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.35 }}
        >
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] text-white font-semibold px-8 py-3.5 min-h-[48px] hover:bg-[var(--color-primary-hover)] transition-colors shadow-sm"
          >
            Solicitar conversa
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
      {!isMobile && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,800px)] h-64 bg-[var(--color-primary)]/[0.04] blur-[100px] rounded-full pointer-events-none" />
      )}
    </section>
  )
}
