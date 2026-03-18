// Altere o número para o seu WhatsApp (código do país + DDD + número, sem espaços ou símbolos)
export const WHATSAPP_NUMBER = '5511996017711'

const MENSAGEM_PADRAO = 'Olá, tudo bem? Gostaria de saber mais sobre seus serviços.'

export function getWhatsAppUrl(message = MENSAGEM_PADRAO) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
