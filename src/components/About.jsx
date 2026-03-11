import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const offerings = [
  'Sites institucionais e landing pages',
  'Sistemas web sob medida',
  'Aplicativos e plataformas digitais',
  'Soluções que crescem com seu negócio',
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isMobile, setIsMobile] = useState(true)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const orbY = useTransform(scrollYProgress, [0, 0.5, 1], [50, -30, 50])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section id="sobre" className="relative py-20 sm:py-24 md:py-32 px-5 sm:px-6 md:px-12 lg:px-24 overflow-hidden" ref={ref}>
      {!isMobile && (
        <motion.div
          style={{ y: orbY }}
          className="absolute -right-40 top-1/2 w-96 h-96 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none"
        />
      )}
      <div className="relative max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-12 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Sobre <span className="text-[var(--color-accent)]">mim</span>
        </motion.h2>

        <motion.div
          className="space-y-6 text-base sm:text-lg text-[var(--color-muted)] leading-relaxed"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p>
            Desenvolvo <span className="text-white">sites</span>,{' '}
            <span className="text-white">sistemas web</span> e{' '}
            <span className="text-white">aplicativos</span> que resolvem problemas reais
            e ajudam empresas a crescer. Meu foco é entender o que você precisa e entregar
            uma solução que funcione.
          </p>
          <p>
            Atuo na <span className="text-white">EMT Informática</span>, onde trabalho
            com empresas de diversos segmentos. Cada projeto é uma oportunidade de
            transformar ideias em ferramentas que fazem a diferença no dia a dia do negócio.{' '}
            <a href="/emt" className="text-[var(--color-accent)] hover:underline">Saiba mais sobre a EMT</a>.
          </p>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <h3 className="text-white font-semibold mb-4">O que eu faço:</h3>
          <ul className="space-y-2 text-[var(--color-muted)]">
            {offerings.map((item, i) => (
              <motion.li
                key={item}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.05 }}
              >
                <span className="text-[var(--color-accent)] mt-1.5">•</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.p
          className="mt-10 text-[var(--color-muted)] leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Meu objetivo é simples: criar soluções que você e sua equipe vão usar todos os dias,
          com qualidade e suporte para evoluir junto com seu negócio.
        </motion.p>
      </div>
    </section>
  )
}
