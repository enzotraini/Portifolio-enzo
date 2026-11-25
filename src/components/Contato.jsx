import { getWhatsAppUrl } from '../utils/whatsapp'
import Botao from './Botao'

export default function Contato({ titulo = 'Conte o que a sua operação precisa.', mensagem = 'Olá! Gostaria de falar sobre um projeto.' }) {
  return (
    <section id="contato" className="mt-32 grid items-end gap-10 bg-gradient-to-b from-noite to-tinta px-5 pt-24 pb-28 sm:px-8 lg:mt-44 lg:grid-cols-[1fr_26rem] lg:gap-16 lg:px-14">
      <h2 className="titulo text-[clamp(2.9rem,7vw,7rem)]">{titulo}</h2>
      <div>
        <p className="text-lg leading-relaxed text-nevoa">Respondemos pelo WhatsApp em horário comercial. E-mail para propostas e documentos.</p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          <Botao href={getWhatsAppUrl(mensagem)}>Falar no WhatsApp</Botao>
          <Botao href="mailto:enzotraini8@gmail.com" tipo="suave">Enviar e-mail</Botao>
        </div>
      </div>
    </section>
  )
}
