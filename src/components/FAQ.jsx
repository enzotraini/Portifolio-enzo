import { useState } from 'react'
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { getWhatsAppUrl } from '../utils/whatsapp'
import RevealWords from './RevealWords'

const SOFT = [0.22, 1, 0.36, 1]

const faqs = [
  {
    q: 'Quanto tempo leva um site ou sistema?',
    a: 'Depende do escopo: um site institucional costuma levar menos que um sistema com integrações e relatórios. Na primeira conversa estimamos prazo e marcos de entrega com clareza.',
  },
  {
    q: 'Vocês fazem manutenção depois da entrega?',
    a: 'Sim. Oferecemos suporte e evoluções conforme a necessidade do projeto: ajustes, novas funcionalidades e acompanhamento técnico.',
  },
  {
    q: 'Como funciona o pagamento?',
    a: 'Combinamos condições alinhadas ao escopo (por etapas é comum). Os detalhes são acertados na proposta, sem letras miúdas.',
  },
  {
    q: 'Atendem apenas empresas?',
    a: 'Trabalhamos principalmente com empresas e projetos B2B, mas avaliamos cada demanda. O foco é entregar solução que gere resultado operacional.',
  },
  {
    q: 'Posso integrar com WhatsApp, planilhas ou ERP?',
    a: 'Quando faz sentido tecnicamente, sim. Integrações e automações fazem parte do que desenvolvemos, sempre com escopo definido.',
  },
]

export default function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [open, setOpen] = useState(null)
  const reduce = useReducedMotion()

  return (
    <section id="faq" className="below-fold relative py-20 sm:py-24 md:py-28 px-5 sm:px-6 md:px-12 lg:px-24 bg-[var(--color-surface)]" ref={ref}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16">
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <RevealWords
            text="FAQ"
            className="text-3xl sm:text-4xl font-display font-bold text-[var(--color-navy)] mb-4"
          />
          <p className="text-[var(--color-muted)] text-lg leading-relaxed mb-8">
            Dúvidas frequentes. Se precisar de mais detalhes, fale com a gente. Respondemos pelo WhatsApp
            ou e-mail.
          </p>
          <a
            href={getWhatsAppUrl('Olá! Tenho uma dúvida sobre os serviços da EMT.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white font-semibold px-8 py-3.5 min-h-[44px] hover:bg-[var(--color-primary-hover)] transition-colors shadow-sm"
          >
            Entre em contato
          </a>
        </motion.div>

        <motion.div
          className="lg:col-span-7 border-t border-[var(--color-border)]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className="border-b border-[var(--color-border)]">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left text-[var(--color-navy)] font-medium text-base sm:text-lg hover:text-[var(--color-primary)] transition-colors"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <motion.span
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-2xl leading-none text-[var(--color-muted)]"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 26 }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : {
                              height: { type: 'spring', bounce: 0.16, duration: 0.48 },
                              opacity: { duration: 0.28, ease: SOFT },
                            }
                      }
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-[var(--color-muted)] leading-relaxed pr-10">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
