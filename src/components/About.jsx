import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const bullets = [
  'Sites institucionais e landing pages',
  'Sistemas web sob medida',
  'Aplicativos e plataformas',
  'Automação e integrações',
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section id="sobre" className="relative py-20 sm:py-24 md:py-28 px-5 sm:px-6 md:px-12 lg:px-24 bg-[var(--color-surface)]" ref={ref}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <motion.h2
            className="text-3xl sm:text-4xl font-display font-bold text-[var(--color-navy)] mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Sobre a <span className="text-[var(--color-primary)]">EMT</span>
          </motion.h2>
          <motion.div
            className="space-y-4 text-[var(--color-muted)] text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.06 }}
          >
            <p className="text-[var(--color-foreground)]">
              Desenvolvemos sites, sistemas web e aplicativos que resolvem problemas reais e ajudam empresas
              a operar melhor.
            </p>
            <p>
              Atuamos com diferentes segmentos: cada projeto nasce do que você precisa medir, automatizar
              ou comunicar — sem soluções genéricas demais.
            </p>
          </motion.div>
        </div>
        <motion.div
          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-8 sm:p-10"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)] mb-4">
            O que fazemos
          </h3>
          <ul className="space-y-3">
            {bullets.map((item, i) => (
              <motion.li
                key={item}
                className="flex items-start gap-3 text-[var(--color-navy)] font-medium"
                initial={{ opacity: 0, x: -8 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.05 }}
              >
                <span className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
      {!isMobile && (
        <div className="absolute -z-10 top-1/2 right-0 w-72 h-72 rounded-full bg-[var(--color-primary)]/5 blur-[80px] pointer-events-none" />
      )}
    </section>
  )
}
