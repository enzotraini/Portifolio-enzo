import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const projects = [
  {
    title: 'BLACKCAR Finance Hub',
    description: 'Sistema de controle financeiro para locações de veículos. Dashboard completo com gestão de receitas, despesas e relatórios.',
    tags: ['React', 'Dashboard', 'Financeiro'],
    gradient: 'from-emerald-500/20 to-cyan-500/20',
    link: 'https://blackcar-finance-hub.vercel.app/dashboard',
  },
  {
    title: 'App Acos Iguatemi',
    description: 'Aplicação web desenvolvida para o Acos Iguatemi. Interface moderna e funcional para o cliente.',
    tags: ['React', 'Web App', 'Vercel'],
    gradient: 'from-violet-500/20 to-fuchsia-500/20',
    link: 'https://web-six-rho-75.vercel.app',
  },
  {
    title: 'EMT Consultoria',
    description: 'Site institucional da EMT Consultoria. Plataforma web com design profissional e experiência de usuário otimizada.',
    tags: ['React', 'Web', 'Render'],
    gradient: 'from-amber-500/20 to-orange-500/20',
    link: 'https://front-teste-emt-v2-1.onrender.com',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const orbX = useTransform(scrollYProgress, [0, 0.5, 1], [-40, 20, -40])

  return (
    <section id="projetos" className="relative py-32 px-6 md:px-12 lg:px-24 overflow-hidden" ref={ref}>
      <motion.div
        style={{ x: orbX }}
        className="absolute -left-32 top-1/3 w-80 h-80 rounded-full bg-[var(--color-accent)]/5 blur-[120px] pointer-events-none"
      />
      <div className="relative">
      <motion.h2
        className="text-4xl md:text-5xl font-display font-bold mb-20 relative"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Projetos <span className="text-[var(--color-accent)]">recentes</span>
      </motion.h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.a
            key={project.title}
            href={project.link}
            className="group block"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            data-cursor-hover
          >
            <motion.div
              className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 h-full"
              whileHover={{ y: -4, borderColor: 'rgba(0,255,136,0.2)' }}
              transition={{ duration: 0.3 }}
            >
              {/* Glow effect on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="relative z-10">
                <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[var(--color-muted)] mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-white/5 text-[var(--color-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.span
                  className="inline-block mt-4 text-[var(--color-accent)] font-medium"
                  initial={false}
                  whileHover={{ x: 4 }}
                >
                  Ver projeto →
                </motion.span>
              </div>
            </motion.div>
          </motion.a>
        ))}
      </div>
    </div>
    </section>
  )
}
