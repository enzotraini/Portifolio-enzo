import { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const benefits = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3a.75.75 0 100-1.5.75.75 0 000 1.5z" />
      </svg>
    ),
    title: 'Atendimento próximo e humanizado',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
    title: 'Comunicação clara em todas as etapas',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: 'Suporte contínuo após a entrega',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Comprometimento com prazo, performance e qualidade',
  },
]

export default function WhyHireMe() {
  const ref = useRef(null)
  const [isMobile, setIsMobile] = useState(true)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section id="porque-contratar" className="relative py-20 sm:py-24 md:py-32 overflow-hidden" ref={ref}>
      {/* Background - simplificado no mobile */}
      <div className="absolute inset-0">
        {isMobile ? (
          <div className="absolute inset-0 bg-[var(--color-surface)]" />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-void)] via-[var(--color-surface)] to-[var(--color-void)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(0,255,136,0.06),transparent_70%)]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-accent)]/5 blur-[150px] rounded-full" />
          </>
        )}
      </div>

      <div className="relative px-5 sm:px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Por que me <span className="text-[var(--color-accent)]">contratar</span>?
        </motion.h2>

        {/* Hook - destaque visual */}
        <motion.div
          className="relative my-12 md:my-16 p-5 sm:p-6 md:p-12 rounded-2xl border border-[var(--color-accent)]/20 bg-[var(--color-accent-dim)] overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-display font-semibold text-white leading-relaxed">
              Porque você não precisa apenas de alguém que escreva código.
            </p>
            <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl font-display font-semibold text-[var(--color-accent)] leading-relaxed">
              Você precisa de alguém que entenda o seu negócio.
            </p>
          </div>
        </motion.div>

        {/* Parágrafos principais */}
        <motion.div
          className="space-y-8 text-lg text-[var(--color-muted)] leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>
            Desenvolvo <span className="text-white">sites</span>,{' '}
            <span className="text-white">sistemas web</span> e{' '}
            <span className="text-white">aplicativos</span> pensados para resolver
            problemas reais e otimizar o dia a dia da sua empresa. Cada projeto é
            feito para durar e crescer junto com você.
          </p>
          <p>
            Meu diferencial está na forma como conduzo o projeto: organização, clareza
            e compromisso com o resultado. Cada decisão considera o impacto no seu
            negócio — operacional, financeiro e estratégico.
          </p>
          <p>
            Tenho experiência prática com empresas reais. Não é só sobre entregar um
            site ou sistema — é sobre construir algo que gere resultado para você.
          </p>
        </motion.div>

        {/* Você terá - cards */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-display font-bold text-white mb-10">
            Você terá:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {benefits.map((item, i) => (
              <motion.div
                key={item.title}
                className="group flex items-start gap-4 sm:gap-5 p-4 sm:p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-accent-dim)]/50 transition-all duration-300"
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                whileHover={{ y: -2 }}
              >
                <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)] group-hover:bg-[var(--color-accent)]/30 group-hover:scale-110 transition-all duration-300">
                  {item.icon}
                </span>
                <p className="text-white font-medium pt-1">{item.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Investimento */}
        <motion.div
          className="mt-20 p-8 md:p-10 rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-white/[0.02] to-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p className="text-lg text-[var(--color-muted)] leading-relaxed">
            Trabalho com uma estrutura enxuta e eficiente, o que permite oferecer um
            investimento justo, focado no que realmente importa:{' '}
            <span className="text-white font-medium">
              execução sólida, suporte e consistência
            </span>
            .
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.a
            href="/#contato"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-[var(--color-accent)] text-[var(--color-void)] font-semibold text-base sm:text-lg min-h-[44px]"
            whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0,255,136,0.5)' }}
            whileTap={{ scale: 0.98 }}
            data-cursor-hover
          >
            Vamos conversar?
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
