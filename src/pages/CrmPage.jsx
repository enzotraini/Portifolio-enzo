import { useEffect } from 'react'
import Footer from '../components/Footer'
import { getWhatsAppUrl } from '../utils/whatsapp'

const DEFAULT_TITLE = 'EMT Informática | Sites, sistemas e apps para empresas'

export default function CrmPage() {
  const waHref = getWhatsAppUrl(
    'Olá! Vi a página do EMT CRM e gostaria de ser avisado quando ele estiver disponível.',
  )

  useEffect(() => {
    document.title = 'EMT CRM | EMT Informática'
    return () => {
      document.title = DEFAULT_TITLE
    }
  }, [])

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#120a8f] via-[#191970] to-[#120a8f] px-5 pb-20 pt-32 sm:px-6 md:px-12 md:pt-36 lg:px-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 45% at 50% 0%, rgba(165, 180, 252, 0.28), transparent 68%), radial-gradient(ellipse 24% 30% at 100% 88%, rgba(147, 197, 253, 0.2), transparent 70%)',
          }}
        />
        <div className="relative mx-auto w-full max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-blue-200/90">
            EMT CRM
          </p>
          <h1 className="text-4xl font-display font-bold leading-tight text-white sm:text-5xl">
            Um novo produto da EMT, ainda em produção
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/85 sm:text-lg">
            Estamos construindo o EMT CRM. Os detalhes ficam para o lançamento. Por enquanto, esta página só marca o lugar.
          </p>
          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm font-semibold text-white">
            <span className="h-2 w-2 rounded-full bg-amber-300" />
            Em produção
          </p>
          <div className="mt-9">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[var(--color-primary)] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)]"
            >
              Avisar quando lançar
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-6 md:px-12 md:py-20 lg:px-24">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-8 text-center sm:p-10">
          <h2 className="text-2xl font-display font-bold text-[var(--color-navy)] sm:text-3xl">
            Em breve, mais por aqui
          </h2>
          <p className="mt-4 text-[var(--color-muted)] leading-relaxed">
            Quando o EMT CRM estiver pronto para apresentação, esta página ganha o conteúdo. Até lá, seguimos no desenvolvimento.
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}
