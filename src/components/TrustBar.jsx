import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { label: 'Foco B2B', value: 'Empresas e operações reais' },
  { label: 'Entregas', value: 'Sites, sistemas e automação' },
  { label: 'Relacionamento', value: 'Suporte e evolução contínua' },
]

export default function TrustBar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section className="relative py-10 px-5 sm:px-6 md:px-12 lg:px-24 border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]/80" ref={ref}>
      <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8 sm:gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="text-center sm:text-left"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wide mb-1">
              {s.label}
            </p>
            <p className="text-[var(--color-navy)] font-medium">{s.value}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
