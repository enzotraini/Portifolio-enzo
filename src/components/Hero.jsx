import { motion, useScroll, useTransform } from 'framer-motion'
import Particles from './Particles'

const words = ['Olá,', 'sou', 'Enzo.']
const subtitle = 'Full Stack Developer · Sistemas web, aplicações e sites de alta performance'

export default function Hero() {
  const { scrollY } = useScroll()

  // Parallax: elementos de fundo se movem mais devagar que o scroll
  const backgroundY = useTransform(scrollY, [0, 600], [0, 200])
  const orbsY = useTransform(scrollY, [0, 600], [0, 120])
  const particlesY = useTransform(scrollY, [0, 600], [0, 80])
  const gradientOpacity = useTransform(scrollY, [0, 400, 800], [1, 0.5, 0])

  return (
    <section className="min-h-screen flex flex-col justify-center px-5 sm:px-6 md:px-12 lg:px-24 relative overflow-hidden min-h-[100dvh]">
      {/* Background com parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div style={{ y: particlesY }} className="absolute inset-0">
          <Particles />
        </motion.div>
        <motion.div
          style={{ y: orbsY }}
          className="absolute w-[600px] h-[600px] rounded-full bg-[var(--color-accent)]/10 blur-[120px] -top-1/2 -left-1/2"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{ y: orbsY }}
          className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px] top-1/2 right-0"
          animate={{
            x: [0, -80, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{ y: backgroundY, opacity: gradientOpacity }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,255,136,0.12),transparent_60%)]"
        />
        <motion.div
          style={{ opacity: gradientOpacity }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_80%,rgba(34,211,238,0.08),transparent_50%)]"
        />
      </div>

      <div className="relative z-10">
        <motion.div
          className="flex flex-wrap gap-x-3 gap-y-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.3,
              },
            },
            hidden: {},
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block overflow-hidden"
              variants={{
                hidden: { y: '100%' },
                visible: { y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block">
                {word === 'Enzo.' ? (
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
          transition={{ delay: 1, duration: 0.6 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className="mt-12 flex flex-wrap gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.a
            href="#porque-contratar"
            className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-[var(--color-accent)] text-[var(--color-void)] font-semibold text-sm sm:text-base min-h-[44px] flex items-center justify-center"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,255,136,0.4)' }}
            whileTap={{ scale: 0.98 }}
            data-cursor-hover
          >
            Por que me contratar
          </motion.a>
          <motion.a
            href="#projetos"
            className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-full border border-white/20 hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent-dim)] transition-colors text-sm sm:text-base min-h-[44px] flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            data-cursor-hover
          >
            Ver projetos
          </motion.a>
          <motion.a
            href="#contato"
            className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-full border border-white/20 hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent-dim)] transition-colors text-sm sm:text-base min-h-[44px] flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            data-cursor-hover
          >
            Fale comigo
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2"
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
    </section>
  )
}
