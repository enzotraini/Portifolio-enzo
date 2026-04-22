import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { getWhatsAppUrl } from '../utils/whatsapp'

/** Troque `image` / `imageSecondary` pelos arquivos em public/images/projects/ quando tiver as artes finais. */
const featured = {
  title: 'BLACKCAR Finance Hub',
  subtitle: 'Sistema · locação e financeiro',
  description:
    'Painel completo com KPIs, receita, frota e fluxo de login — exemplo de produto em uso no dia a dia do cliente.',
  tags: ['Sistema web', 'Financeiro', 'Dashboard'],
  image: '/images/projects/showcase-dashboard.png',
  imageAlt: 'BLACKCAR: dashboard com métricas e gráficos',
  imageSecondary: '/images/projects/a_full_screen_web_application_dashboard_interface.png',
  imageSecondaryAlt: 'BLACKCAR: visão expandida do sistema',
}

const sites = [
  {
    title: 'Food Light',
    description: 'Presença digital para refeições coletivas e operações B2B.',
    tags: ['Site', 'Alimentação'],
    image: '/images/projects/food-light.svg',
    imageAlt: 'Mostruário — projeto Food Light',
  },
  {
    title: 'Raio Comercial',
    description: 'Institucional para distribuidora industrial com foco em credibilidade.',
    tags: ['Site', 'Indústria'],
    image: '/images/projects/raio-comercial.svg',
    imageAlt: 'Mostruário — Raio Comercial',
  },
  {
    title: 'EMT Sites',
    description: 'Landing com planos e conversão para serviços digitais.',
    tags: ['Landing', 'Serviços'],
    image: '/images/projects/emt-sites.svg',
    imageAlt: 'Mostruário — EMT Sites',
  },
]

const systems = [
  {
    title: 'App Acos Iguatemi',
    description: 'Aplicativo web orientado à operação e ao cliente final.',
    tags: ['App', 'Web'],
    image: '/images/projects/acos-iguatemi.svg',
    imageAlt: 'Mostruário — Acos Iguatemi',
  },
  {
    title: 'EMT Consultoria',
    description: 'Institucional com hierarquia clara e foco em contato.',
    tags: ['Site', 'Institucional'],
    image: '/images/projects/emt-consultoria.svg',
    imageAlt: 'Mostruário — EMT Consultoria',
  },
]

const automation = [
  {
    title: 'Chatbot WhatsApp',
    description: 'Atendimento, agendamento e qualificação automatizados.',
    tags: ['Bot', 'WhatsApp'],
    image: '/images/projects/chatbot-wa.svg',
    imageAlt: 'Mostruário — automação WhatsApp',
  },
  {
    title: 'Automação de processos',
    description: 'Integrações entre planilhas, e-mail e sistemas internos.',
    tags: ['Automação', 'Integração'],
    image: '/images/projects/automacao.svg',
    imageAlt: 'Mostruário — automação de processos',
  },
]

function ShowcaseCard({ item, index, isInView }) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_20px_50px_-24px_rgba(15,23,42,0.25)] transition-shadow duration-500 hover:shadow-[0_28px_60px_-20px_rgba(29,78,216,0.18)]"
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.06 * index }}
    >
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 ${
          item.imageSecondary ? 'aspect-[16/11] sm:aspect-[21/9]' : 'aspect-[16/10]'
        }`}
      >
        <div className="absolute inset-0 bg-[var(--color-navy-deep)]/[0.02]" />
        {item.imageSecondary ? (
          <div className="grid h-full sm:grid-cols-2">
            <div className="relative border-b border-white/20 sm:border-b-0 sm:border-r overflow-hidden">
              <img
                src={item.imageSecondary}
                alt={item.imageSecondaryAlt}
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
                width={960}
                height={540}
              />
            </div>
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.imageAlt}
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
                width={960}
                height={540}
              />
            </div>
          </div>
        ) : (
          <img
            src={item.image}
            alt={item.imageAlt}
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            loading="lazy"
            decoding="async"
            width={1200}
            height={750}
          />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--color-navy-deep)]/40 to-transparent opacity-80" />
      </div>
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap gap-2 mb-3">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl sm:text-2xl font-display font-bold text-[var(--color-navy)] mb-2">{item.title}</h3>
        {item.subtitle && (
          <p className="text-sm font-medium text-[var(--color-muted)] mb-2">{item.subtitle}</p>
        )}
        <p className="text-[var(--color-muted)] leading-relaxed max-w-prose">{item.description}</p>
      </div>
    </motion.article>
  )
}

export default function ProjectShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const waHref = getWhatsAppUrl('Olá! Vi o mostruário de projetos e quero conversar sobre uma solução.')

  return (
    <div id="projetos" className="relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-[min(100vw,42rem)] h-[min(100vw,42rem)] rounded-full bg-[var(--color-primary)]/[0.07] blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-[var(--color-accent)]/[0.06] blur-[100px] pointer-events-none" />

      <div className="relative px-5 sm:px-6 md:px-12 lg:px-24 max-w-7xl mx-auto pt-4 pb-20 sm:pb-28">
        <nav className="text-sm text-[var(--color-muted)] mb-10" aria-label="Trilha">
          <Link to="/" className="hover:text-[var(--color-primary)] transition-colors">
            Início
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <span className="text-[var(--color-navy)] font-medium">Projetos</span>
        </nav>

        <motion.div
          className="max-w-3xl mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)] mb-4">
            Mostruário
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-[var(--color-navy)] tracking-tight leading-[1.1] mb-6">
            Entregas que mostram padrão, não link
          </h1>
          <p className="text-lg text-[var(--color-muted)] leading-relaxed mb-4">
            Seleção visual do tipo de trabalho que construímos: sites, sistemas e automações. As telas abaixo são
            para referência e confiança — <strong className="text-[var(--color-navy)] font-semibold">endereços e demos ficam sob consulta</strong>.
          </p>
          <p className="text-sm text-[var(--color-muted)] border-l-4 border-[var(--color-primary)]/40 pl-4 py-1">
            Quando você enviar as imagens finais, substituímos as prévias em <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">public/images/projects/</code> mantendo este layout.
          </p>
        </motion.div>

        {/* Destaque */}
        <div className="mb-16 sm:mb-24">
          <motion.p
            className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
          >
            Destaque
          </motion.p>
          <ShowcaseCard item={featured} index={0} isInView={isInView} />
        </div>

        <Section title="Sites" items={sites} startIndex={1} isInView={isInView} />
        <Section title="Sistemas e aplicativos" items={systems} startIndex={1 + sites.length} isInView={isInView} />
        <Section title="Automação" items={automation} startIndex={1 + sites.length + systems.length} isInView={isInView} />

        <motion.div
          className="mt-20 rounded-3xl bg-[var(--color-navy-deep)] text-white px-8 py-12 sm:px-12 sm:py-14 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-3">Quer um projeto no mesmo nível?</h2>
            <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed">
              Conte objetivo, prazo e segmento — retornamos com próximos passos, sem compromisso.
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white font-semibold px-8 py-3.5 min-h-[48px] hover:bg-[var(--color-primary-hover)] transition-colors shadow-lg"
            >
              Falar com a EMT
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function Section({ title, items, startIndex, isInView }) {
  return (
    <section className="mb-16 sm:mb-20">
      <motion.h2
        className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)] mb-8"
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        {title}
      </motion.h2>
      <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <ShowcaseCard key={item.title} item={item} index={startIndex + i} isInView={isInView} />
        ))}
      </div>
    </section>
  )
}
