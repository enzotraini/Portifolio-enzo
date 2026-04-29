import Footer from '../components/Footer'
import { getWhatsAppUrl } from '../utils/whatsapp'

const modules = [
  {
    title: 'Financeiro e faturamento',
    description: 'Controle de contas, recebimentos, fluxo de caixa e indicadores para decisões mais seguras.',
  },
  {
    title: 'Clientes e atendimento',
    description: 'Cadastro centralizado, histórico completo e acompanhamento da jornada de cada cliente.',
  },
  {
    title: 'Operação e produtividade',
    description: 'Organização de processos internos, tarefas e rotinas para reduzir gargalos e retrabalho.',
  },
  {
    title: 'Relatórios gerenciais',
    description: 'Painéis com métricas-chave para acompanhar desempenho e crescimento do negócio.',
  },
]

const diferencials = [
  'Sistema web acessível de qualquer lugar',
  'Implementação com suporte próximo',
  'Evolução contínua conforme o negócio cresce',
  'Arquitetura focada em estabilidade e segurança',
]

export default function SystemPage() {
  const waHref = getWhatsAppUrl(
    'Olá! Tenho interesse no sistema de gestão empresarial da EMT e gostaria de uma demonstração.',
  )

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#120a8f] via-[#191970] to-[#120a8f] px-5 pb-18 pt-30 sm:px-6 md:px-12 md:pt-34 lg:px-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-72 w-[min(130vw,920px)] -translate-x-1/2 rounded-full bg-indigo-300/20 blur-[110px]" />
          <div className="absolute bottom-10 right-0 h-52 w-52 rounded-full bg-blue-300/20 blur-[90px]" />
        </div>
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-center">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-blue-200/90">
              Software próprio EMT
            </p>
            <h1 className="text-4xl font-display font-bold leading-tight text-white sm:text-5xl">
              Sistema de gestão empresarial para organizar e escalar sua operação
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-blue-100/85 sm:text-lg">
              Uma plataforma desenvolvida para centralizar processos, melhorar a visão do negócio e
              aumentar produtividade com dados em tempo real.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="https://front-teste-emt-v2-1.onrender.com/auth/sign-in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[var(--color-primary)] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)]"
              >
                Acessar sistema
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
              >
                Agendar demonstração
              </a>
            </div>
          </div>
          <aside className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-200/95">Principais ganhos</p>
            <ul className="mt-5 space-y-3">
              {diferencials.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/90 sm:text-base">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="bg-[var(--color-void)] px-5 py-20 sm:px-6 md:px-12 md:py-24 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)]">
            Funcionalidades
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-display font-bold text-[var(--color-navy)] sm:text-4xl">
            Tudo o que sua empresa precisa para uma gestão mais inteligente
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {modules.map((module) => (
              <article
                key={module.title}
                className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-display font-bold text-[var(--color-navy)]">{module.title}</h3>
                <p className="mt-3 text-[var(--color-muted)] leading-relaxed">{module.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 pb-20 sm:px-6 md:px-12 md:pb-24 lg:px-24">
        <div className="mx-auto max-w-6xl rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-8 sm:p-10 md:p-12">
          <h2 className="text-3xl font-display font-bold text-[var(--color-navy)] sm:text-4xl">
            Quer ver como esse sistema pode funcionar na sua empresa?
          </h2>
          <p className="mt-4 max-w-3xl text-[var(--color-muted)] leading-relaxed">
            Apresentamos o fluxo completo com base na realidade da sua operação, mostrando como o
            software reduz tarefas manuais, melhora controle e acelera decisões.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[var(--color-primary)] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)]"
            >
              Falar com especialista
            </a>
            <a
              href="https://front-teste-emt-v2-1.onrender.com/auth/sign-in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-7 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-surface)]"
            >
              Ir para login
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
