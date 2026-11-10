import { useEffect } from 'react'
import Footer from '../components/Footer'
import { EMT_CRM_URL } from '../utils/links'
import { getWhatsAppUrl } from '../utils/whatsapp'

const DEFAULT_TITLE = 'EMT Informática | Sites, sistemas e apps para empresas'

const modules = [
  {
    title: 'Cotações que chegam do ERP',
    description:
      'A cotação sai da operação e aparece no comercial. O time vê o que chegou, de quem é e o que ainda precisa de retorno.',
  },
  {
    title: 'Da cotação ao contato',
    description:
      'Cada passo da negociação fica no mesmo lugar: quem falou, quando falou e o que falta para fechar.',
  },
  {
    title: 'Maya no acompanhamento',
    description:
      'A Maya acompanha o fluxo para o comercial não perder follow-up nem deixar cotação parada.',
  },
  {
    title: 'Carteira e histórico',
    description:
      'Cliente, conversas e status da negociação juntos, sem planilha paralela e sem retrabalho de cadastro.',
  },
]

const diferencials = [
  'Cotação que chega direto do EMT ERP',
  'Sistema web acessível de qualquer lugar',
  'Implementação com suporte próximo',
  'Histórico do comercial em um só lugar',
]

export default function CrmPage() {
  const waHref = getWhatsAppUrl(
    'Olá! Tenho interesse no EMT CRM e gostaria de uma demonstração.',
  )

  useEffect(() => {
    document.title = 'EMT CRM | EMT Informática'
    return () => {
      document.title = DEFAULT_TITLE
    }
  }, [])

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#120a8f] via-[#191970] to-[#120a8f] px-5 pb-18 pt-30 sm:px-6 md:px-12 md:pt-34 lg:px-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 45% at 50% 0%, rgba(165, 180, 252, 0.28), transparent 68%), radial-gradient(ellipse 24% 30% at 100% 88%, rgba(147, 197, 253, 0.2), transparent 70%)',
          }}
        />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-center">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-blue-200/90">
              EMT CRM
            </p>
            <h1 className="text-4xl font-display font-bold leading-tight text-white sm:text-5xl">
              Da cotação ao contato. O comercial ligado à operação.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-blue-100/85 sm:text-lg">
              O EMT CRM recebe a cotação do ERP e organiza o follow-up até o contato com o cliente.
              A Maya acompanha cada passo para nada ficar parado.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={EMT_CRM_URL}
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
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/30 bg-white/15 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              >
                Agendar demonstração
              </a>
            </div>
          </div>
          <aside className="rounded-3xl border border-white/20 bg-white/15 p-6 shadow-2xl sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-200/95">No fluxo</p>
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
            Feito para o comercial que já usa o EMT ERP
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
            Quer ver o EMT CRM na sua operação?
          </h2>
          <p className="mt-4 max-w-3xl text-[var(--color-muted)] leading-relaxed">
            Mostramos o caminho da cotação até o contato, com a Maya no acompanhamento, a partir do
            que o seu time já faz no ERP.
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
              href={EMT_CRM_URL}
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
