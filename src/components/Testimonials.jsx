import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const testimonials = [
  {
    name: 'Carlos Mendes',
    role: 'Diretor, Raio Comercial',
    text: 'Entregou no prazo, com qualidade e sempre disponível para ajustes. Recomendo.',
    rating: 5,
  },
  {
    name: 'Ana Paula Silva',
    role: 'Gerente, Food Light',
    text: 'Site moderno e rápido — mais contatos e presença profissional no mercado.',
    rating: 5,
  },
  {
    name: 'Ricardo Oliveira',
    role: 'Cliente, App Acos Iguatemi',
    text: 'Foco no resultado do negócio, não só no código. Parceiro de confiança.',
    rating: 5,
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="depoimentos" className="relative py-20 sm:py-24 md:py-28 overflow-hidden bg-[var(--color-void)]" ref={ref}>
      <div className="relative px-5 sm:px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-display font-bold mb-4 text-center text-[var(--color-navy)]"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          O que dizem nossos <span className="text-[var(--color-primary)]">clientes</span>
        </motion.h2>
        <motion.p
          className="text-center text-[var(--color-muted)] mb-14 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.06 }}
        >
          Depoimentos de quem confia na EMT para presença digital e sistemas.
        </motion.p>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="p-6 md:p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <span key={j} className="text-amber-500">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-[var(--color-muted)] leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
              <div>
                <p className="text-[var(--color-navy)] font-semibold">{t.name}</p>
                <p className="text-[var(--color-muted)] text-sm">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
