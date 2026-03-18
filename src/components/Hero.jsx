import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Particles from './Particles'

const words = ['Sites.', 'Sistemas.', 'Apps.', 'Automação.']
const subtitle = 'Soluções digitais reais para seu negócio — do site institucional ao sistema de gestão financeira e chatbot no WhatsApp.'

export default function Hero() {
  const [isMobile, setIsMobile] = useState(true)
  const { scrollY } = useScroll()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const backgroundY = useTransform(scrollY, [0, 600], [0, 200])
  const orbsY = useTransform(scrollY, [0, 600], [0, 120])
  const particlesY = useTransform(scrollY, [0, 600], [0, 80])
  const gradientOpacity = useTransform(scrollY, [0, 400, 800], [1, 0.5, 0])

  const parallaxStyle = isMobile ? {} : { y: particlesY }
  const orbsStyle = isMobile ? {} : { y: orbsY }
  const bgStyle = isMobile ? {} : { y: backgroundY, opacity: gradientOpacity }
  const gradient2Style = isMobile ? {} : { opacity: gradientOpacity }

  return (
    <section className="min-h-screen min-h-[100dvh] flex flex-col justify-center px-5 sm:px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Background - simplificado no mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {!isMobile && (
          <>
            <motion.div style={parallaxStyle} className="absolute inset-0">
              <Particles />
            </motion.div>
            <motion.div
              style={orbsStyle}
              className="absolute w-[600px] h-[600px] rounded-full bg-[var(--color-accent)]/10 blur-[120px] -top-1/2 -left-1/2"
              animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              style={orbsStyle}
              className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px] top-1/2 right-0"
              animate={{ x: [0, -80, 0], y: [0, -30, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              style={bgStyle}
              className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,255,136,0.12),transparent_60%)]"
            />
            <motion.div
              style={gradient2Style}
              className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_80%,rgba(34,211,238,0.08),transparent_50%)]"
            />
          </>
        )}
        {isMobile && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(0,255,136,0.08),transparent_50%)]" />
        )}
      </div>

      <div className="relative z-10">
        <motion.div
          className="flex flex-wrap gap-x-3 gap-y-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.08, delayChildren: isMobile ? 0.1 : 0.3 } },
            hidden: {},
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block overflow-hidden"
              variants={{ hidden: { y: '100%' }, visible: { y: 0 } }}
              transition={{ duration: isMobile ? 0.4 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block">
                {word === 'Automação.' ? (
                  <span className="bg-gradient-to-r from-[var(--color-accent)] to-cyan-400 bg-clip-text text-transparent">
                    {word}
                  </span>
                ) : (
                  word
                )}
              </span>
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          className="mt-6 text-base sm:text-lg md:text-xl text-[var(--color-muted)] max-w-xl font-body"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: isMobile ? 0.1 : 1, duration: 0.6 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className="mt-12 flex flex-wrap gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: isMobile ? 0.2 : 1.2, duration: 0.6 }}
        >
          <a
            href="/#porque-contratar"
            className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-[var(--color-accent)] text-[var(--color-void)] font-semibold text-sm sm:text-base min-h-[44px] flex items-center justify-center"
          >
            Por que nos escolher
          </a>
          <a
            href="/#projetos"
            className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-full border border-white/20 hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent-dim)] transition-colors text-sm sm:text-base min-h-[44px] flex items-center justify-center"
          >
            Ver projetos
          </a>
          <a
            href="/#contato"
            className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-full border border-white/20 hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent-dim)] transition-colors text-sm sm:text-base min-h-[44px] flex items-center justify-center"
          >
            Fale conosco
          </a>
          <a
            href="/suporte-emt.zip"
            download="AnyDesk-Suporte-EMT.zip"
            className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-white/10 border border-white/30 hover:bg-white/20 text-white font-semibold text-sm sm:text-base min-h-[44px] flex items-center justify-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Instalar suporte
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator - só no desktop */}
      {!isMobile && (
        <motion.div
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
