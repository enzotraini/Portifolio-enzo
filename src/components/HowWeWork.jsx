import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  'Diagnóstico do que você precisa (objetivo, prazo, público).',
  'Proposta clara com escopo e próximos passos.',
  'Desenvolvimento com entregas parciais e alinhamento.',
  'Publicação, treinamento quando fizer sentido e suporte.',
]

export default function HowWeWork() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="como-trabalhamos" className="relative py-20 sm:py-24 md:py-28 px-5 sm:px-6 md:px-12 lg:px-24 bg-[var(--color-void)]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-16 lg:mb-20">
          <motion.h2
            className="text-3xl sm:text-4xl font-display font-bold text-[var(--color-navy)]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Como trabalhamos com sua empresa
          </motion.h2>
          <motion.div
            className="text-lg text-[var(--color-muted)] leading-relaxed space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p>
              Organização e transparência em cada etapa. Você sabe o que será entregue, quando e como
              medir o resultado — sem surpresas no meio do caminho.
            </p>
            <ul className="space-y-3">
              {steps.map((s) => (
                <li key={s} className="flex gap-3">
                  <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="rounded-3xl bg-[var(--color-navy-deep)] text-white px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20 relative overflow-hidden"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15 }}
        >
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[var(--color-primary)]/20 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-[var(--color-accent)]/15 blur-[80px] pointer-events-none" />
          <div className="relative max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-200/90 mb-4">
              Da ideia à operação
            </p>
            <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4">
              Tecnologia aplicada ao que importa para o seu negócio
            </h3>
            <p className="text-slate-300 leading-relaxed mb-10 text-base sm:text-lg">
              Sites rápidos, sistemas estáveis e automações que sua equipe realmente usa. Foco em
              performance, segurança básica e evolução contínua junto com você.
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 sm:p-8 text-left shadow-2xl">
              <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                Visão do projeto
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: 'Discovery', value: 'Alinhamento' },
                  { label: 'Build', value: 'Entregas' },
                  { label: 'Go-live', value: 'Suporte' },
                ].map((cell) => (
                  <div key={cell.label} className="rounded-xl bg-white/10 px-4 py-3 border border-white/5">
                    <p className="text-xs text-slate-400 uppercase tracking-wide">{cell.label}</p>
                    <p className="font-semibold text-white mt-1">{cell.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
