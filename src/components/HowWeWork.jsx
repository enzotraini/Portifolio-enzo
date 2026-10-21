import { motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import RevealWords from './RevealWords'

const phases = [
  'Diagnóstico do que você precisa (objetivo, prazo, público).',
  'Proposta clara com escopo e próximos passos.',
  'Desenvolvimento com entregas parciais e alinhamento.',
  'Publicação, treinamento quando fizer sentido e suporte.',
]

function ProcessSteps() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.72', 'end 0.42'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 70, damping: 26, mass: 0.35 })
  const [active, setActive] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const next = Math.min(phases.length - 1, Math.floor(latest * phases.length * 0.9999))
    setActive((prev) => (prev === next ? prev : next))
  })

  return (
    <ol ref={ref} className="relative">
      <span className="pointer-events-none absolute bottom-8 left-2 top-8 w-px bg-[var(--color-border)]" />
      <motion.span
        className="pointer-events-none absolute bottom-8 left-2 top-8 w-px origin-top bg-[var(--color-primary)]"
        style={{ scaleY: reduce ? 1 : scaleY }}
      />
      {phases.map((step, i) => {
        const on = reduce || i === active
        const passed = !reduce && i < active
        return (
          <li key={step} className="relative flex min-h-[18vh] items-center py-6 pl-10 md:min-h-[22vh]">
            <span
              className={`absolute left-0 top-1/2 z-10 h-4 w-4 -translate-y-1/2 rounded-full border-2 transition-colors duration-500 ${
                on
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)]'
                  : passed
                    ? 'border-[var(--color-primary)] bg-[var(--color-surface)]'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)]'
              }`}
            />
            <div className={`max-w-md transition-opacity duration-500 ${on ? 'opacity-100' : passed ? 'opacity-70' : 'opacity-40'}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                0{i + 1}
              </p>
              <p className="mt-1 font-display text-lg font-semibold leading-snug text-[var(--color-navy)]">{step}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export default function HowWeWork() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="como-trabalhamos" className="relative py-20 sm:py-24 md:py-28 px-5 sm:px-6 md:px-12 lg:px-24 bg-[var(--color-void)]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-16 lg:mb-20">
          <div className="lg:sticky lg:top-28">
            <RevealWords
              text="Como trabalhamos com sua empresa"
              className="text-3xl sm:text-4xl font-display font-bold text-[var(--color-navy)]"
            />
            <motion.p
              className="mt-6 text-lg text-[var(--color-muted)] leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Organização e transparência em cada etapa. Você sabe o que será entregue, quando e como
              medir o resultado, sem surpresas no meio do caminho.
            </motion.p>
          </div>
          <ProcessSteps />
        </div>

        <motion.div
          className="rounded-3xl bg-[var(--color-navy-deep)] text-white px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20 relative overflow-hidden"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 42% 55% at 100% 0%, rgba(29, 78, 216, 0.32), transparent 70%), radial-gradient(ellipse 36% 48% at 0% 100%, rgba(5, 150, 105, 0.2), transparent 70%)',
            }}
          />
          <div className="relative max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-200/90 mb-4">
              Da ideia à operação
            </p>
            <RevealWords
              as="h3"
              text="Tecnologia aplicada ao que importa para o seu negócio"
              className="text-2xl sm:text-3xl font-display font-bold mb-4"
            />
            <p className="text-slate-300 leading-relaxed mb-10 text-base sm:text-lg">
              Sites rápidos, sistemas estáveis e automações que sua equipe realmente usa. Foco em
              performance, segurança básica e evolução contínua junto com você.
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-6 sm:p-8 text-left shadow-2xl">
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
