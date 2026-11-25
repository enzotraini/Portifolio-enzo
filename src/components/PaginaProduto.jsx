import { useEffect } from 'react'
import Botao from './Botao'
import Contato from './Contato'
import Degrade from './Degrade'
import Footer from './Footer'
import Janela from './Janela'

const TITULO_PADRAO = 'EMT Informática | ERP, CRM e software para empresas'

/** Moldura com o metal na cor do produto. */
export function Palco({ fundo, className = '', children }) {
  return <div className={`overflow-hidden rounded-3xl bg-cover bg-center p-[clamp(1rem,4vw,4rem)] ${className}`} style={{ backgroundImage: `url(/images/sistemas/metal-${fundo}.webp)` }}>{children}</div>
}

/** Texto de um lado, tela do outro. */
export function Bloco({ titulo, texto, itens, tela, inverter = false, estreita = false, fundo }) {
  return (
    <section className="grid items-center gap-10 px-5 pt-28 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-14 lg:pt-44">
      <div className={inverter ? 'lg:order-2' : ''}>
        <h2 className="titulo max-w-[14ch] text-[clamp(2.3rem,4vw,4rem)]">{titulo}</h2>
        <p className="mt-5 max-w-[34rem] text-lg leading-relaxed text-nevoa">{texto}</p>
        {itens && (
          <ul className="mt-7 max-w-[34rem]">
            {itens.map((i) => <li key={i} className="border-t border-white/10 py-3 text-gelo">{i}</li>)}
          </ul>
        )}
      </div>
      <Palco fundo={fundo}><Janela {...tela} className={estreita ? 'mx-auto max-w-[28rem]' : ''} /></Palco>
    </section>
  )
}

/** Título e texto em cima, tela larga embaixo. */
export function BlocoLargo({ titulo, texto, tela, fundo }) {
  return (
    <section className="px-5 pt-28 sm:px-8 lg:px-14 lg:pt-44">
      <div className="grid items-end gap-6 lg:grid-cols-[1fr_30rem] lg:gap-16">
        <h2 className="titulo max-w-[16ch] text-[clamp(2.3rem,4.6vw,4.6rem)]">{titulo}</h2>
        <p className="text-lg leading-relaxed text-nevoa">{texto}</p>
      </div>
      <Palco fundo={fundo} className="mt-12 lg:mt-16"><Janela {...tela} /></Palco>
    </section>
  )
}

export function Lista({ titulo, itens }) {
  return (
    <section className="grid gap-10 px-5 pt-28 sm:px-8 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:px-14 lg:pt-44">
      <h2 className="titulo text-[clamp(2rem,3.2vw,3.2rem)]">{titulo}</h2>
      <dl className="grid gap-x-12 sm:grid-cols-2">
        {itens.map(([nome, texto]) => (
          <div key={nome} className="border-t border-white/10 py-5">
            <dt className="text-lg text-claro">{nome}</dt>
            <dd className="mt-1 leading-relaxed text-nevoa">{texto}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default function PaginaProduto({ nome, titulo, texto, cores, tela, acesso, whatsapp, contato, children }) {
  useEffect(() => {
    document.title = `${nome} | EMT Informática`
    return () => { document.title = TITULO_PADRAO }
  }, [nome])

  return (
    <div className="bg-noite text-claro">
      <section className="relative px-5 pt-36 sm:px-8 lg:px-14 lg:pt-52">
        <div className="absolute inset-x-0 top-0 h-[min(62rem,118svh)] [mask-image:linear-gradient(#000_45%,transparent)]">
          <Degrade {...cores} />
          <div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_22%_45%,rgba(6,10,18,0.6),transparent_75%)]" />
        </div>
        <div className="relative">
          <p className="text-xl font-medium">{nome}</p>
          <h1 className="titulo mt-4 max-w-[17ch] text-[clamp(2.7rem,6.6vw,6.6rem)]">{titulo}</h1>
          <p className="mt-7 max-w-[36rem] text-lg leading-relaxed text-gelo lg:text-xl">{texto}</p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <Botao href={whatsapp}>Agendar demonstração</Botao>
            <Botao href={acesso} tipo="suave">Acessar o sistema</Botao>
          </div>
          <Janela {...tela} prioridade className="mt-16 lg:mt-24" />
          <p className="mt-5 text-sm text-apagado">Telas com dados de exemplo.</p>
        </div>
      </section>
      {children}
      <Contato titulo={contato.titulo} mensagem={contato.mensagem} />
      <Footer />
    </div>
  )
}
