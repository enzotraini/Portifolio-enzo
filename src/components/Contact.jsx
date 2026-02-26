import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contato" className="py-20 sm:py-24 md:py-32 px-5 sm:px-6 md:px-12 lg:px-24" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 md:mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Vamos <span className="text-[var(--color-accent)]">conversar</span>?
        </motion.h2>

        <motion.p
          className="text-lg text-[var(--color-muted)] mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Tem um projeto em mente? Adoraria ouvir. Me envie uma mensagem e vamos
          transformar sua ideia em realidade.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.a
            href="https://github.com/enzotraini"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-[var(--color-accent)] text-[var(--color-void)] font-semibold text-base sm:text-lg min-h-[44px] flex items-center justify-center"
            whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0,255,136,0.5)' }}
            whileTap={{ scale: 0.98 }}
            data-cursor-hover
          >
            GitHub
          </motion.a>
          <motion.a
            href="mailto:enzotraini8@gmail.com"
            className="px-8 py-3.5 sm:px-10 sm:py-4 rounded-full border border-white/20 hover:border-[var(--color-accent)]/50 transition-colors min-h-[44px] flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }} data-cursor-hover
          >
            Enviar e-mail
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
