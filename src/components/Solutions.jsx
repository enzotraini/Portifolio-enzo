import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const items = [
  {
    title: 'Sites institucionais',
    description: 'Presença profissional, landing pages e sites que convertem visitantes em contatos.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: 'Sistemas e aplicativos',
    description: 'Sistemas web sob medida e apps que organizam processos, finanças e operações do dia a dia.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: 'Automação e integrações',
    description: 'Chatbots no WhatsApp, integrações e automações que reduzem trabalho manual e aceleram respostas.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
]

export default function Solutions() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="solucoes" className="relative py-20 sm:py-24 md:py-28 px-5 sm:px-6 md:px-12 lg:px-24 bg-[var(--color-surface)]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-center text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)] mb-3"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          O que entregamos
        </motion.p>
        <motion.h2
          className="text-center text-3xl sm:text-4xl font-display font-bold text-[var(--color-navy)] mb-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Soluções digitais para sua empresa crescer com segurança
        </motion.h2>
        <motion.p
          className="text-center text-[var(--color-muted)] max-w-2xl mx-auto mb-14 text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Da presença online à operação interna — um time próximo do seu negócio.
        </motion.p>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
            >
              <Link
                to="/projetos"
                className="group block rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-8 shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/25 transition-all duration-300"
              >
                <span className="inline-flex rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] p-3 mb-5">
                  {item.icon}
                </span>
                <h3 className="text-xl font-display font-bold text-[var(--color-navy)] mb-3">{item.title}</h3>
                <p className="text-[var(--color-muted)] leading-relaxed mb-6">{item.description}</p>
                <span className="font-semibold text-[var(--color-primary)] group-hover:underline inline-flex items-center gap-1">
                  Ver projetos
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
