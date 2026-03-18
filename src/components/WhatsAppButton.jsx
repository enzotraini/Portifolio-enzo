import { useState, useEffect } from 'react'
import { getWhatsAppUrl } from '../utils/whatsapp'

const OPCOES = [
  'Apps',
  'Sistemas gestão de aço',
  'Sistema personalizado',
  'Automação',
  'Outros',
]

export default function WhatsAppButton() {
  const [aberto, setAberto] = useState(false)
  const [selecionado, setSelecionado] = useState(null)

  const mensagemBase = 'Olá, tudo bem? Gostaria de saber sobre:'
  const mensagemCompleta = selecionado
    ? `${mensagemBase} ${selecionado}`
    : mensagemBase

  const abrirWhatsApp = () => {
    const url = getWhatsAppUrl(mensagemCompleta)
    window.open(url, '_blank', 'noopener,noreferrer')
    setAberto(false)
    setSelecionado(null)
  }

  const fechar = () => {
    setAberto(false)
    setSelecionado(null)
  }

  useEffect(() => {
    if (!aberto) return
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setAberto(false)
        setSelecionado(null)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [aberto])

  return (
    <>
      <button
        type="button"
        onClick={() => setAberto(true)}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-all duration-300"
        style={{
          bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
          right: 'max(1.5rem, env(safe-area-inset-right))',
        }}
        aria-label="Fale conosco no WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 text-white"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </button>

      {aberto && (
        <div
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 bg-black/50"
          onClick={fechar}
          role="dialog"
          aria-modal="true"
          aria-labelledby="whatsapp-modal-title"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-xl w-full max-w-md max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5">
              <h3 id="whatsapp-modal-title" className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Fale conosco
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Olá, tudo bem? Gostaria de saber sobre:
              </p>
              <div className="space-y-2 mb-5">
                {OPCOES.map((opcao) => (
                  <label
                    key={opcao}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors border ${
                      selecionado === opcao
                        ? 'border-[#25D366] bg-[#25D366]/10'
                        : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="assunto"
                      value={opcao}
                      checked={selecionado === opcao}
                      onChange={() => setSelecionado(opcao)}
                      className="sr-only"
                    />
                    <span className="text-gray-900 dark:text-white">{opcao}</span>
                    {selecionado === opcao && (
                      <span className="ml-auto text-[#25D366]">✓</span>
                    )}
                  </label>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={fechar}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={abrirWhatsApp}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#25D366] text-white font-medium hover:bg-[#20BD5A] transition-colors flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
