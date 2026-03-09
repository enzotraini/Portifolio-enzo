import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function EMT() {
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
    <section id="emt" className="relative py-20 sm:py-24 md:py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[var(--color-surface)]" />
      <div className="relative px-5 sm:px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
        <motion.div
          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-12 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {!isMobile && (
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
          )}
          <div className="relative z-10">
            <motion.span
              className="inline-block text-[var(--color-accent)] font-semibold text-sm uppercase tracking-wider mb-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              Onde atuo
            </motion.span>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              EMT <span className="text-[var(--color-accent)]">Informática</span>
            </motion.h2>
            <motion.p
              className="text-lg text-[var(--color-muted)] leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Empresa de consultoria em tecnologia que desenvolve soluções digitais
              para empresas. Sites, sistemas e aplicativos feitos para atender às
              necessidades reais do seu negócio.
            </motion.p>
            <motion.a
              href="https://emt-info.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--color-accent)]/30 text-[var(--color-accent)] hover:bg-[var(--color-accent-dim)] transition-colors font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-cursor-hover
            >
              Conhecer a EMT
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
