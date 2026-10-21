import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import RevealWords from './RevealWords'
import TestimonialReel from './TestimonialReel'

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
    text: 'Site moderno e rápido, com mais contatos e presença profissional no mercado.',
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
    <section id="depoimentos" className="below-fold relative py-20 sm:py-24 md:py-28 overflow-hidden bg-[var(--color-void)]" ref={ref}>
      <div className="relative px-5 sm:px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        <RevealWords
          text="O que dizem nossos clientes"
          accent="clientes"
          className="text-3xl sm:text-4xl font-display font-bold mb-4 text-center text-[var(--color-navy)]"
        />
        <motion.p
          className="text-center text-[var(--color-muted)] mb-14 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.06 }}
        >
          Depoimentos de quem confia na EMT para presença digital e sistemas.
        </motion.p>
      </div>

      <TestimonialReel items={testimonials} />
    </section>
  )
}
