import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Zap,
  Smartphone,
  Search,
  Plug,
  ShieldCheck,
  Palette,
  Factory,
  UtensilsCrossed,
  Music,
  Briefcase,
  Cpu,
  Check,
  Rocket,
  PenTool,
  Code2,
  Globe,
  TrendingUp,
  Brain,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { getWhatsAppUrl } from '../utils/whatsapp'

const waHref = getWhatsAppUrl(
  'Olá! Tenho interesse na criação de um site profissional e gostaria de um orçamento.',
)

function ParticleField() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf = 0
    let w = (canvas.width = canvas.offsetWidth * devicePixelRatio)
    let h = (canvas.height = canvas.offsetHeight * devicePixelRatio)

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio
      h = canvas.height = canvas.offsetHeight * devicePixelRatio
    }
    window.addEventListener('resize', onResize)

    const count = Math.min(110, Math.floor((w * h) / 22000))
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.6 + 0.4,
    }))

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current.x = (e.clientX - rect.left) * devicePixelRatio
      mouse.current.y = (e.clientY - rect.top) * devicePixelRatio
    }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', () => {
      mouse.current.x = -1000
      mouse.current.y = -1000
    })

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        const dx = p.x - mouse.current.x
        const dy = p.y - mouse.current.y
        const dist = Math.hypot(dx, dy)
        if (dist < 160 * devicePixelRatio) {
          const f = (160 * devicePixelRatio - dist) / (160 * devicePixelRatio)
          p.vx += (dx / dist) * f * 0.4
          p.vy += (dy / dist) * f * 0.4
        }
        p.vx *= 0.96
        p.vy *= 0.96
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * devicePixelRatio, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(120,180,255,0.9)'
        ctx.fill()
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          const max = 110 * devicePixelRatio
          if (d < max) {
            ctx.strokeStyle = `rgba(80,140,255,${(1 - d / max) * 0.18})`
            ctx.lineWidth = devicePixelRatio * 0.5
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      if (mouse.current.x > 0) {
        const grad = ctx.createRadialGradient(
          mouse.current.x,
          mouse.current.y,
          0,
          mouse.current.x,
          mouse.current.y,
          180 * devicePixelRatio,
        )
        grad.addColorStop(0, 'rgba(60,140,255,0.25)')
        grad.addColorStop(1, 'rgba(60,140,255,0)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)
      }
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
}

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('is-visible')
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

function BrowserFrame({ children, className = '' }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-[oklch(0.18_0.04_265)]/80 shadow-[0_30px_80px_-20px_rgba(20,80,255,0.45)] backdrop-blur-xl ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        <div className="ml-3 h-4 flex-1 rounded bg-white/5" />
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

export default function SitesPage() {
  useEffect(() => {
    const prev = document.title
    document.title = 'Criação de Sites Profissionais | EMT Informática'
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <div className="emt-sites-root relative min-h-screen overflow-x-hidden bg-[oklch(0.13_0.04_265)] text-white antialiased">
      <style>{sitesCss}</style>
      <Hero />
      <TrustMarquee />
      <ProblemSection />
      <TransformSection />
      <Showcase />
      <Differentials />
      <Simulator />
      <Process />
      <SocialProof />
      <FinalCTA />
      <SitesFooter />
    </div>
  )
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <div className="absolute inset-0">
        <ParticleField />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.35_0.18_260/0.4),transparent_60%)]" />
        <div className="grid-bg absolute inset-0 opacity-[0.18]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col justify-center">
          <span className="reveal mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[oklch(0.75_0.2_230)]" />
            Criação de Sites Profissionais
          </span>
          <h1 className="reveal text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Seu próximo cliente está{' '}
            <span className="bg-gradient-to-r from-[oklch(0.75_0.2_230)] via-[oklch(0.8_0.18_250)] to-white bg-clip-text text-transparent">
              procurando sua empresa
            </span>{' '}
            agora.
          </h1>
          <p className="reveal mt-6 max-w-xl text-lg text-white/70">
            Criamos sites modernos, rápidos e profissionais que transformam visitantes em oportunidades reais de
            negócio.
          </p>
          <div className="reveal mt-9 flex flex-wrap gap-3">
            <a
              href="#orcamento"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[oklch(0.55_0.22_255)] to-[oklch(0.7_0.2_235)] px-6 py-3 text-sm font-semibold shadow-[0_10px_40px_-10px_oklch(0.6_0.25_250/0.8)] transition hover:scale-[1.02]"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition group-hover:translate-x-full" />
              Solicitar orçamento
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#showcase"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 backdrop-blur transition hover:bg-white/10"
            >
              Ver exemplos
            </a>
          </div>
          <div className="reveal mt-12 flex items-center gap-8 text-xs text-white/50">
            <div>
              <div className="text-2xl font-semibold text-white">+10 anos</div>
              criando soluções
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <div className="text-2xl font-semibold text-white">100%</div>
              focado no resultado
            </div>
          </div>
        </div>

        <div className="relative hidden h-[560px] items-center justify-center lg:flex">
          <div className="float-stack relative h-full w-full" style={{ perspective: '1400px' }}>
            <FloatingScreen
              label="Indústria"
              accent="from-[oklch(0.55_0.22_255)] to-[oklch(0.7_0.2_235)]"
              style={{ transform: 'rotateY(-18deg) rotateX(8deg) translateZ(0)', top: '8%', left: '10%' }}
            />
            <FloatingScreen
              label="Comércio"
              accent="from-[oklch(0.7_0.2_235)] to-[oklch(0.85_0.16_220)]"
              style={{ transform: 'rotateY(-12deg) rotateX(4deg)', top: '22%', left: '30%' }}
              delay="2s"
            />
            <FloatingScreen
              label="Serviços"
              accent="from-[oklch(0.6_0.22_260)] to-[oklch(0.75_0.2_240)]"
              style={{ transform: 'rotateY(-6deg) rotateX(2deg)', top: '38%', left: '16%' }}
              delay="4s"
            />
            <FloatingScreen
              label="Tecnologia"
              accent="from-[oklch(0.75_0.2_230)] to-[oklch(0.55_0.22_255)]"
              style={{ transform: 'rotateY(-22deg) rotateX(10deg)', top: '54%', left: '34%' }}
              delay="1s"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function FloatingScreen({ label, accent, style, delay = '0s' }) {
  return (
    <div className="float-anim absolute w-[60%]" style={{ ...style, animationDelay: delay }}>
      <BrowserFrame>
        <div className={`mb-3 h-20 rounded-md bg-gradient-to-br ${accent} opacity-90`} />
        <div className="grid grid-cols-3 gap-2">
          <div className="h-10 rounded bg-white/10" />
          <div className="h-10 rounded bg-white/5" />
          <div className="h-10 rounded bg-white/10" />
        </div>
        <div className="mt-3 h-3 w-2/3 rounded bg-white/10" />
        <div className="mt-1.5 h-3 w-1/2 rounded bg-white/5" />
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-white/40">{label}</span>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/70">emt.com.br</span>
        </div>
      </BrowserFrame>
    </div>
  )
}

function TrustMarquee() {
  const items = [
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind',
    'Node.js',
    'PostgreSQL',
    'Vercel',
    'Cloudflare',
    'Figma',
    'WhatsApp API',
    'Google Analytics',
    'Stripe',
  ]
  const row = [...items, ...items]
  return (
    <section className="relative -mt-6 border-y border-white/5 bg-white/[0.015] py-8 backdrop-blur">
      <div className="mx-auto mb-5 max-w-6xl px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
          Tecnologias & integrações que usamos para entregar resultado
        </p>
      </div>
      <div className="marquee group relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[oklch(0.13_0.04_265)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[oklch(0.13_0.04_265)] to-transparent" />
        <div className="marquee-track flex w-max gap-10 px-6 text-sm text-white/55">
          {row.map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-medium tracking-tight transition hover:text-white"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.75_0.2_230)]" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProblemSection() {
  const ref = useReveal()
  return (
    <section id="problema" className="relative pb-32 pt-20">
      <div className="mx-auto max-w-6xl px-6">
        <div ref={ref} className="reveal mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[oklch(0.75_0.2_230)]">O custo invisível</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Cada dia sem um site profissional é uma <span className="text-white/40 line-through">oportunidade</span>{' '}
            perdida.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { t: 'Visual ultrapassado', d: 'Passa imagem amadora antes da primeira conversa.' },
            { t: 'Sites lentos', d: '70% dos visitantes abandonam em 3 segundos.' },
            { t: 'Sem credibilidade', d: 'Concorrentes com site moderno ganham a venda.' },
            { t: 'Baixa conversão', d: 'Tráfego que entra e sai sem virar oportunidade.' },
          ].map((p, i) => (
            <div
              key={p.t}
              className="reveal group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[oklch(0.6_0.22_250/0.15)] blur-3xl transition group-hover:scale-150" />
              <div className="text-3xl font-semibold text-white/20">0{i + 1}</div>
              <div className="mt-3 text-lg font-semibold">{p.t}</div>
              <p className="mt-2 text-sm text-white/60">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TransformSection() {
  const sectionRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const start = vh * 0.9
      const end = vh * 0.2
      const p = (start - r.top) / (start - end)
      setProgress(Math.min(1, Math.max(0, p)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const t = progress
  return (
    <section ref={sectionRef} className="relative py-32">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.3_0.18_260/0.35),transparent_60%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[oklch(0.75_0.2_230)]">Transformação</p>
            <h2 className="mt-3 text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Do site que afasta clientes{' '}
              <span className="bg-gradient-to-r from-[oklch(0.75_0.2_230)] to-white bg-clip-text text-transparent">
                ao site que vende todo dia.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-white/65">
              Role para ver a transformação. Cada detalhe — performance, design, hierarquia visual e conversão — é
              repensado para o seu negócio.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
              {[
                { l: 'Performance', a: 32, b: 98 },
                { l: 'Conversão', a: 18, b: 84 },
                { l: 'Mobile', a: 41, b: 99 },
              ].map((m) => {
                const v = Math.round(m.a + (m.b - m.a) * t)
                return (
                  <div key={m.l} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="text-xs text-white/50">{m.l}</div>
                    <div className="mt-1 text-2xl font-semibold tabular-nums">{v}</div>
                    <div className="mt-2 h-1 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[oklch(0.55_0.22_255)] to-[oklch(0.75_0.2_230)] transition-[width]"
                        style={{ width: `${v}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <div
                className="transition-all duration-300"
                style={{ opacity: 1 - t, transform: `scale(${1 - t * 0.1}) rotate(${-t * 4}deg)` }}
              >
                <div className="rounded-md border border-white/10 bg-[#1a1d24] p-3 shadow-2xl">
                  <div className="mb-2 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                  </div>
                  <div className="bg-[#2a2e36] p-3">
                    <div className="font-serif text-xl text-yellow-300">★ MINHA EMPRESA ★</div>
                    <div className="mt-2 text-xs text-white/50">Bem-vindo ao nosso site!</div>
                    <div className="mt-2 grid grid-cols-3 gap-1">
                      <div className="h-10 bg-white/5" />
                      <div className="h-10 bg-white/5" />
                      <div className="h-10 bg-white/5" />
                    </div>
                    <div className="mt-2 text-[9px] text-white/30">Visitantes: 0001234</div>
                  </div>
                </div>
              </div>
              <div
                className="absolute inset-0 transition-all duration-300"
                style={{ opacity: t, transform: `scale(${0.92 + t * 0.08})` }}
              >
                <BrowserFrame>
                  <div className="h-24 rounded-lg bg-gradient-to-br from-[oklch(0.55_0.22_255)] to-[oklch(0.75_0.2_230)]" />
                  <div className="mt-3 h-4 w-3/4 rounded bg-white/15" />
                  <div className="mt-2 h-3 w-1/2 rounded bg-white/10" />
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="h-14 rounded-md bg-white/5" />
                    <div className="h-14 rounded-md bg-white/10" />
                    <div className="h-14 rounded-md bg-white/5" />
                  </div>
                  <div className="mt-4 inline-flex rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-black">
                    Falar com especialista →
                  </div>
                </BrowserFrame>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Showcase() {
  const projects = [
    {
      t: 'Indústria Metalúrgica',
      c: 'Catálogo + Orçamentos',
      a: 'from-[oklch(0.5_0.2_250)] to-[oklch(0.65_0.2_220)]',
    },
    { t: 'Clínica Premium', c: 'Agendamento + SEO local', a: 'from-[oklch(0.6_0.18_200)] to-[oklch(0.75_0.18_230)]' },
    { t: 'E-commerce B2B', c: 'Integração com ERP', a: 'from-[oklch(0.55_0.22_260)] to-[oklch(0.7_0.2_240)]' },
  ]
  return (
    <section id="showcase" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mb-14 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[oklch(0.75_0.2_230)]">Exemplos</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Cada projeto, um produto premium.</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((p) => (
            <TiltCard key={p.t} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TiltCard({ project }) {
  const ref = useRef(null)
  const [glow, setGlow] = useState({ x: 50, y: 50 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const rx = (y / r.height - 0.5) * -10
    const ry = (x / r.width - 0.5) * 12
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`
    setGlow({ x: (x / r.width) * 100, y: (y / r.height) * 100 })
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="reveal group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-transform duration-200 will-change-transform"
      style={{
        background: `radial-gradient(600px circle at ${glow.x}% ${glow.y}%, oklch(0.6 0.22 250 / 0.18), transparent 40%), oklch(0.18 0.04 265 / 0.5)`,
      }}
    >
      <div
        className={`h-44 rounded-xl bg-gradient-to-br ${project.a} shadow-[0_20px_60px_-20px_oklch(0.6_0.25_250/0.6)]`}
      >
        <div className="flex h-full items-end justify-end p-4">
          <div className="rounded-md bg-black/30 px-2 py-1 text-[10px] backdrop-blur">Live</div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">{project.t}</div>
          <div className="text-sm text-white/55">{project.c}</div>
        </div>
        <ArrowRight className="h-5 w-5 text-white/40 transition group-hover:translate-x-1 group-hover:text-white" />
      </div>
    </div>
  )
}

function Differentials() {
  const items = [
    { I: Palette, t: 'Design Profissional', d: 'Layouts modernos que fortalecem sua marca.' },
    { I: Smartphone, t: 'Responsividade', d: 'Experiência perfeita em celular, tablet e desktop.' },
    { I: Zap, t: 'Alta Performance', d: 'Sites rápidos, otimizados, prontos para Core Web Vitals.' },
    { I: Search, t: 'SEO', d: 'Estrutura pronta para ser encontrada no Google.' },
    { I: Plug, t: 'Integrações', d: 'WhatsApp, formulários, automações e sistemas.' },
    { I: ShieldCheck, t: 'Segurança', d: 'Tecnologias modernas, atualizadas e protegidas.' },
  ]
  return (
    <section id="diferenciais" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal mb-14 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[oklch(0.75_0.2_230)]">Diferenciais</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Tudo que o seu site precisa, em um só lugar.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ I, t, d }, i) => (
            <div
              key={t}
              className="reveal group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 backdrop-blur transition hover:border-white/20"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[oklch(0.7_0.2_240)] to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.55_0.22_255)] to-[oklch(0.7_0.2_235)] shadow-[0_10px_30px_-10px_oklch(0.6_0.25_250/0.6)]">
                <I className="h-5 w-5" />
              </div>
              <div className="mt-5 text-lg font-semibold">{t}</div>
              <p className="mt-2 text-sm text-white/60">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SiteExamplePreview({ url, name }) {
  const isExternal = url.startsWith('http')

  return (
    <div className="space-y-3">
      <BrowserFrame className="!p-0">
        <div className="relative aspect-[16/10] overflow-hidden bg-white">
          <iframe
            src={url}
            title={`Exemplo ${name}`}
            className="pointer-events-none absolute top-0 left-0 h-[200%] w-[200%] origin-top-left scale-50 border-0"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </BrowserFrame>
      <a
        href={url}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[oklch(0.75_0.2_230)] transition hover:text-white"
      >
        Ver {name} ao vivo
        <ArrowRight className="h-3.5 w-3.5" />
      </a>
    </div>
  )
}

const SEGMENTS = [
  {
    id: 'industria',
    label: 'Indústria',
    I: Factory,
    exampleName: 'Raio Comercial',
    previewUrl: 'https://www.raiocomercial.com.br',
    copy: 'Catálogo industrial, credibilidade e geração de orçamentos — no padrão da Raio Comercial.',
    description: 'indústria e distribuição',
    tags: ['Catálogo', 'Orçamentos', 'SEO', 'WhatsApp'],
  },
  {
    id: 'restaurante',
    label: 'Restaurante',
    I: UtensilsCrossed,
    exampleName: 'Food Light',
    previewUrl: 'https://site-foodlight-wine.vercel.app',
    copy: 'Site institucional que transmite confiança e converte visitas em contatos — como a Food Light.',
    description: 'alimentação e refeições coletivas',
    tags: ['Cardápio', 'WhatsApp', 'SEO local', 'Institucional'],
  },
  {
    id: 'musica',
    label: 'Música',
    I: Music,
    exampleName: 'Allegro Escola de Música',
    previewUrl: 'https://aulasdepianoeteclado.lovable.app',
    copy: 'Presença acolhedora para escolas, estúdios e professores — inspirado na Allegro.',
    description: 'escolas e aulas de música',
    tags: ['Agendamento', 'Cursos', 'WhatsApp', 'Apresentação'],
  },
  {
    id: 'escritorio',
    label: 'Escritório',
    I: Briefcase,
    exampleName: 'EMT Informática',
    previewUrl: '/',
    copy: 'Site institucional que apresenta serviços, soluções e canais de contato da sua empresa.',
    description: 'tecnologia e serviços B2B',
    tags: ['Institucional', 'Soluções', 'Cases', 'Contato'],
  },
  {
    id: 'tech',
    label: 'Tecnologia',
    I: Cpu,
    exampleName: 'Future Motion Studio',
    previewUrl: 'https://motion-architects-studio.lovable.app',
    copy: 'Experiência visual premium para marcas de tecnologia — como o Future Motion Studio.',
    description: 'tecnologia e inovação',
    tags: ['Motion design', 'Portfolio', 'Performance', 'Conversão'],
  },
]

function Simulator() {
  const [seg, setSeg] = useState('industria')
  const s = SEGMENTS.find((x) => x.id === seg)
  const Icon = s.I
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal mb-12 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[oklch(0.75_0.2_230)]">Simulador</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Como seu site poderia parecer?</h2>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {SEGMENTS.map(({ id, label, I }) => (
            <button
              key={id}
              type="button"
              onClick={() => setSeg(id)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                seg === id
                  ? 'border-white/30 bg-white text-black'
                  : 'border-white/15 bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              <I className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-10">
          <div key={seg} className="animate-[fade-in_0.4s_ease-out] grid items-center gap-8 md:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs">
                <Icon className="h-3.5 w-3.5" /> {s.label}
              </div>
              <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">{s.copy}</h3>
              <p className="mt-4 max-w-md text-white/60">
                Estrutura, conteúdo e integrações sob medida para o segmento de{' '}
                <strong className="text-white">{s.description}</strong>. Exemplo real:{' '}
                <strong className="text-white">{s.exampleName}</strong>.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {s.tags.map((b) => (
                  <span key={b} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70">
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <SiteExamplePreview url={s.previewUrl} name={s.exampleName} />
          </div>
        </div>
      </div>
    </section>
  )
}

function Process() {
  const steps = [
    { I: Brain, t: 'Entendimento do negócio', d: 'Imersão na sua operação, público e objetivos.' },
    { I: PenTool, t: 'Planejamento', d: 'Arquitetura, conteúdo e estratégia de conversão.' },
    { I: Palette, t: 'Design', d: 'Identidade premium aplicada a cada detalhe.' },
    { I: Code2, t: 'Desenvolvimento', d: 'Código limpo, performance e segurança.' },
    { I: Globe, t: 'Publicação', d: 'Deploy, domínio, e-mail e ambiente monitorado.' },
    { I: TrendingUp, t: 'Evolução contínua', d: 'Melhorias, métricas e novos recursos.' },
  ]
  return (
    <section id="processo" className="relative py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="reveal mb-14 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[oklch(0.75_0.2_230)]">Processo EMT</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Um método claro, do briefing ao crescimento.
          </h2>
        </div>
        <div className="relative">
          <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-transparent via-[oklch(0.7_0.2_240/0.5)] to-transparent md:left-1/2" />
          <div className="space-y-10">
            {steps.map(({ I, t, d }, i) => (
              <div
                key={t}
                className={`reveal relative grid gap-4 md:grid-cols-2 md:gap-12 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}
              >
                <div className={`md:text-right ${i % 2 ? 'md:text-left' : ''}`}>
                  <div className="text-xs uppercase tracking-widest text-white/40">Etapa 0{i + 1}</div>
                  <div className="mt-1 text-xl font-semibold">{t}</div>
                  <p className="mt-2 text-sm text-white/60">{d}</p>
                </div>
                <div className="relative">
                  <div className="absolute left-5 top-1 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border border-white/15 bg-[oklch(0.13_0.04_265)] shadow-[0_0_30px_oklch(0.6_0.25_250/0.4)] md:left-0">
                    <I className="h-4 w-4 text-[oklch(0.8_0.18_230)]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SocialProof() {
  const stats = [
    { v: 120, suf: '+', l: 'Sites publicados' },
    { v: 80, suf: '+', l: 'Empresas atendidas' },
    { v: 240, suf: '+', l: 'Projetos entregues' },
    { v: 21, suf: ' dias', l: 'Tempo médio de entrega' },
  ]
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl md:grid-cols-4">
          {stats.map((s) => (
            <CountUp key={s.l} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CountUp({ v, suf, l }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now()
          const dur = 1400
          const step = (t) => {
            const p = Math.min(1, (t - start) / dur)
            setN(Math.round(v * (1 - Math.pow(1 - p, 3))))
            if (p < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
          io.disconnect()
        }
      })
    })
    io.observe(el)
    return () => io.disconnect()
  }, [v])
  return (
    <div ref={ref} className="reveal">
      <div className="text-5xl font-semibold tabular-nums tracking-tight bg-gradient-to-br from-white to-[oklch(0.7_0.18_230)] bg-clip-text text-transparent">
        {n}
        {suf}
      </div>
      <div className="mt-2 text-sm text-white/60">{l}</div>
    </div>
  )
}

function FinalCTA() {
  return (
    <section id="orcamento" className="relative overflow-hidden py-36">
      <div className="absolute inset-0">
        <ParticleField />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.45_0.22_255/0.4),transparent_60%)]" />
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <div className="reveal inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs backdrop-blur">
          <Rocket className="h-3.5 w-3.5 text-[oklch(0.8_0.18_230)]" />
          Vagas limitadas neste mês
        </div>
        <h2 className="reveal mt-6 text-balance text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
          Sua empresa merece um site{' '}
          <span className="bg-gradient-to-r from-[oklch(0.75_0.2_230)] via-white to-[oklch(0.75_0.2_230)] bg-clip-text text-transparent">
            à altura do seu negócio.
          </span>
        </h2>
        <p className="reveal mx-auto mt-6 max-w-xl text-lg text-white/70">
          Vamos criar uma presença digital que gere credibilidade, oportunidades e crescimento real.
        </p>
        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-4 text-base font-semibold text-black shadow-[0_20px_60px_-15px_oklch(0.7_0.2_240/0.7)] transition hover:scale-[1.02]"
          >
            Solicitar orçamento
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Check className="h-4 w-4 text-[oklch(0.8_0.18_230)]" />
            Resposta em até 24h úteis
          </div>
        </div>
      </div>
    </section>
  )
}

function SitesFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/5 py-10 text-center text-xs text-white/40">
      <p>
        © {year} EMT Informática — Criação de Sites Profissionais.{' '}
        <Link to="/" className="underline-offset-2 hover:text-white/60 hover:underline">
          Voltar ao site principal
        </Link>
      </p>
    </footer>
  )
}

const sitesCss = `
.grid-bg {
  background-image:
    linear-gradient(oklch(0.7 0.2 240 / 0.15) 1px, transparent 1px),
    linear-gradient(90deg, oklch(0.7 0.2 240 / 0.15) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
}

.reveal {
  opacity: 0;
  transform: translateY(24px);
  animation: reveal-in 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  animation-play-state: paused;
}
.reveal { animation-play-state: running; }
@keyframes reveal-in {
  to { opacity: 1; transform: translateY(0); }
}

.float-anim {
  animation: float 8s ease-in-out infinite;
  transition: transform 0.4s ease;
}
@keyframes float {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -16px; }
}

.marquee-track {
  animation: marquee 38s linear infinite;
}
.marquee:hover .marquee-track { animation-play-state: paused; }
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.emt-sites-root { scroll-behavior: smooth; }
`
