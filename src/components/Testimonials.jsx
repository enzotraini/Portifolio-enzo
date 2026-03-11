import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const testimonials = [
  {
    name: 'Carlos Mendes',
    role: 'Diretor, Raio Comercial',
    text: 'Profissional excelente. Entregou nosso site no prazo, com qualidade e sempre disponível para ajustes. Recomendo muito.',
    rating: 5,
  },
  {
    name: 'Ana Paula Silva',
    role: 'Gerente, Food Light',
    text: 'O Enzo transformou nossa presença digital. O site ficou moderno, rápido e conseguimos mais clientes. Superou as expectativas.',
    rating: 5,
  },
  {
    name: 'Ricardo Oliveira',
    role: 'Cliente, App Acos Iguatemi',
    text: 'Trabalho impecável. Desenvolve com foco no resultado do negócio, não só no código. Parceiro de confiança.',
    rating: 5,
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="depoimentos" className="relative py-20 sm:py-24 md:py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[var(--color-surface)]" />
      <div className="relative px-5 sm:px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          O que dizem <span className="text-[var(--color-accent)]">sobre mim</span>
        </motion.h2>
        <motion.p
          className="text-center text-[var(--color-muted)] mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Clientes satisfeitos com sites, sistemas e aplicativos entregues.
        </motion.p>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="p-6 md:p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-void)]"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <span key={j} className="text-[var(--color-accent)]">★</span>
                ))}
              </div>
              <p className="text-[var(--color-muted)] leading-relaxed mb-6">"{t.text}"</p>
              <div>
                <p className="text-white font-semibold">{t.name}</p>
                <p className="text-[var(--color-muted)] text-sm">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
