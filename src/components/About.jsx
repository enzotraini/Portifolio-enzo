import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const expertise = [
  'Arquitetura de software e projetos escaláveis',
  'Modelagem e otimização de bancos SQL',
  'Regras de negócio complexas',
  'Segurança de aplicações web',
  'Deploy e infraestrutura em nuvem (AWS)',
  'Boas práticas e lógica de programação',
]

const techs = ['TypeScript', 'React', 'Node.js', 'SQL', 'AWS', 'Tailwind', 'Git']

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const orbY = useTransform(scrollYProgress, [0, 0.5, 1], [50, -30, 50])

  return (
    <section id="sobre" className="relative py-20 sm:py-24 md:py-32 px-5 sm:px-6 md:px-12 lg:px-24 overflow-hidden" ref={ref}>
      <motion.div
        style={{ y: orbY }}
        className="absolute -right-40 top-1/2 w-96 h-96 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none"
      />
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
            Sou desenvolvedor <span className="text-white">full stack</span> especializado
            na construção de sistemas web, aplicações e sites de alta performance, com
            foco em arquitetura bem estruturada, segurança e escalabilidade.
          </p>
          <p>
            Atuo principalmente com <span className="text-white">TypeScript</span> e{' '}
            <span className="text-white">React</span>, desenvolvendo interfaces modernas
            e responsivas integradas a backends robustos e orientados a regras de negócio
            bem definidas.
          </p>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <h3 className="text-white font-semibold mb-4">Forte domínio em:</h3>
          <ul className="space-y-2 text-[var(--color-muted)]">
            {expertise.map((item, i) => (
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
          Tenho formação contínua através de cursos e estudos aprofundados, sempre
          buscando aprimorar performance, organização e clareza estrutural dos
          sistemas que desenvolvo.
        </motion.p>

        <motion.p
          className="mt-4 text-[var(--color-muted)] leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          Meu foco vai além do código: desenvolvo soluções pensadas para serem
          sustentáveis, organizadas e alinhadas aos objetivos estratégicos do negócio.
        </motion.p>

        <motion.div
          className="mt-16 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {techs.map((tech, i) => (
            <motion.span
              key={tech}
              className="px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.65 + i * 0.05 }}
              whileHover={{
                borderColor: 'rgba(0,255,136,0.5)',
                scale: 1.05,
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
