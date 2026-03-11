import { useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const sites = [
  {
    title: 'Food Light',
    description: 'Site para empresa de refeições coletivas. Serviços para indústrias, empresas, hospitais e eventos.',
    tags: ['Site', 'Alimentação'],
    gradient: 'from-emerald-500/20 to-cyan-500/20',
    link: 'https://foodlightsp.com.br',
  },
  {
    title: 'Raio Comercial',
    description: 'Site institucional para distribuidora de parafusos e fixadores. Mais de 20 anos no mercado.',
    tags: ['Site', 'Indústria'],
    gradient: 'from-violet-500/20 to-fuchsia-500/20',
    link: 'https://raiocomercial.com.br',
  },
  {
    title: 'EMT Sites',
    description: 'Landing page de planos de sites profissionais. Apresentação de serviços com foco em conversão.',
    tags: ['Site', 'Serviços'],
    gradient: 'from-amber-500/20 to-orange-500/20',
    link: 'https://edutraini-4.meusitenouol.com.br',
  },
]

const apps = [
  {
    title: 'App Acos Iguatemi',
    description: 'Aplicativo web para o Acos Iguatemi. Solução moderna e funcional para o dia a dia do cliente.',
    tags: ['App', 'Web'],
    gradient: 'from-cyan-500/20 to-blue-500/20',
    link: 'https://web-six-rho-75.vercel.app',
  },
  {
    title: 'BLACKCAR Finance Hub',
    description: 'Sistema de controle financeiro para locações de veículos. Gestão completa de receitas, despesas e relatórios.',
    tags: ['Sistema', 'Financeiro'],
    gradient: 'from-emerald-500/20 to-cyan-500/20',
    link: 'https://blackcar-finance-hub.vercel.app/dashboard',
  },
  {
    title: 'EMT Consultoria',
    description: 'Site institucional da EMT Informática. Presença digital profissional com foco em conversão.',
    tags: ['Site', 'Institucional'],
    gradient: 'from-amber-500/20 to-orange-500/20',
    link: 'https://front-teste-emt-v2-1.onrender.com',
  },
]

const automacao = [
  {
    title: 'Chatbot WhatsApp',
    description: 'Bot de atendimento automático para WhatsApp. Responde dúvidas, agenda horários e qualifica leads 24h.',
    tags: ['Bot', 'WhatsApp', 'Atendimento'],
    gradient: 'from-green-500/20 to-emerald-500/20',
    link: '/#contato',
  },
  {
    title: 'Automação de Processos',
    description: 'Solução para automatizar tarefas repetitivas. Integração com planilhas, e-mails e sistemas.',
    tags: ['Automação', 'Integração'],
    gradient: 'from-rose-500/20 to-pink-500/20',
    link: '/#contato',
  },
]

function ProjectCard({ project, i, isInView, isMobile }) {
  const isExternal = project.link.startsWith('http')
  return (
    <motion.a
      href={project.link}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group block"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      data-cursor-hover
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6 md:p-8 h-full"
        whileHover={isMobile ? {} : { y: -4, borderColor: 'rgba(0,255,136,0.2)' }}
        transition={{ duration: 0.3 }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        <div className="relative z-10">
          <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-[var(--color-accent)] transition-colors">
            {project.title}
          </h3>
          <p className="text-[var(--color-muted)] mb-6">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 text-[var(--color-muted)]">
                {tag}
              </span>
            ))}
          </div>
          <span className="inline-block mt-4 text-[var(--color-accent)] font-medium group-hover:underline">
            {isExternal ? 'Ver projeto →' : 'Saiba mais →'}
          </span>
        </div>
      </motion.div>
    </motion.a>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const [isMobile, setIsMobile] = useState(true)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const orbX = useTransform(scrollYProgress, [0, 0.5, 1], [-40, 20, -40])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section id="projetos" className="relative py-20 sm:py-24 md:py-32 px-5 sm:px-6 md:px-12 lg:px-24 overflow-hidden" ref={ref}>
      {!isMobile && (
        <motion.div
          style={{ x: orbX }}
          className="absolute -left-32 top-1/3 w-80 h-80 rounded-full bg-[var(--color-accent)]/5 blur-[120px] pointer-events-none"
        />
      )}
      <div className="relative">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-16 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Projetos <span className="text-[var(--color-accent)]">recentes</span>
        </motion.h2>

        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-xl font-display font-semibold text-white mb-8">Sites</h3>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sites.map((project, i) => (
              <ProjectCard key={project.title} project={project} i={i} isInView={isInView} isMobile={isMobile} />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl font-display font-semibold text-white mb-8">Apps e Sistemas Web</h3>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {apps.map((project, i) => (
              <ProjectCard key={project.title} project={project} i={i + sites.length} isInView={isInView} isMobile={isMobile} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-xl font-display font-semibold text-white mb-8">Automação com Bot</h3>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {automacao.map((project, i) => (
              <ProjectCard key={project.title} project={project} i={i + sites.length + apps.length} isInView={isInView} isMobile={isMobile} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
