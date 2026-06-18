import { useEffect, useState } from 'react'
import { STEELFLOW_URL } from '../utils/links'

export default function SteelFlowLink({ className = '', children, onNavigate }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const handleEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [open])

  const handleOpen = (event) => {
    event.preventDefault()
    setOpen(true)
  }

  const handleConfirm = () => {
    window.open(STEELFLOW_URL, '_blank', 'noopener,noreferrer')
    setOpen(false)
    onNavigate?.()
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className={`cursor-pointer border-0 bg-transparent p-0 font-inherit ${className}`}
      >
        {children}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-end justify-center bg-black/50 p-4 sm:items-center"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="steelflow-modal-title"
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-t-2xl bg-white shadow-xl sm:rounded-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="p-6">
              <h3 id="steelflow-modal-title" className="font-display text-xl font-bold text-[var(--color-navy)]">
                Conhecer o SteelFlow
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                Você será redirecionado para conhecer outro sistema da EMT informática — o SteelFlow, nosso SaaS
                para gestão de cortes. Deseja continuar?
              </p>
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-surface-muted)]"
                >
                  Não, voltar
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)]"
                >
                  Sim, conhecer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
