import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

export default function EMT() {
  const ref = useRef(null)
  const [isMobile, setIsMobile] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const handleDownload = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 4000)
  }

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section id="emt" className="relative py-20 sm:py-24 md:py-32 overflow-hidden" ref={ref}>
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] px-6 py-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-accent)]/30 shadow-lg"
            style={{ bottom: 'max(2rem, env(safe-area-inset-bottom))' }}
          >
            <p className="text-sm font-medium text-white">
              Baixou e foi adicionado à sua pasta de Downloads.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
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
            <div id="suporte" className="flex flex-wrap gap-4 scroll-mt-24">
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

              <motion.a
                href="/suporte-emt.zip"
                download="AnyDesk-Suporte-EMT.zip"
                onClick={handleDownload}
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 text-[var(--color-accent)] hover:bg-[var(--color-accent-dim)] transition-colors font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.35 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-cursor-hover
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Baixar suporte remoto
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-[var(--color-void)] border border-[var(--color-border)] text-xs font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                  Nosso suporte
                </span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
