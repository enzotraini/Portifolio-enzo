import { Link } from 'react-router-dom'
import Botao from '../components/Botao'
import Contato from '../components/Contato'
import Footer from '../components/Footer'
import Galpao from '../components/galpao/Galpao'
import Janela from '../components/Janela'
import { Palco } from '../components/PaginaProduto'
import { STEELFLOW_URL } from '../utils/links'

const etapas = [
  ['Diagnóstico', 'do que você precisa: objetivo, prazo, público.'],
  ['Proposta', 'clara, com escopo e próximos passos.'],
  ['Desenvolvimento', 'com entregas parciais e alinhamento.'],
  ['Publicação,', 'treinamento quando fizer sentido e suporte.'],
]

function PorDentro() {
  return (
    <section id="por-dentro" className="px-5 pt-32 sm:px-8 lg:px-14 lg:pt-44">
      <h2 className="titulo max-w-[16ch] text-[clamp(2.5rem,5vw,5rem)]">Por dentro de cada sistema.</h2>

      <div className="mt-20 grid items-center gap-10 lg:mt-28 lg:grid-cols-[1.55fr_1fr] lg:gap-20">
        <Link to="/crm" className="block" aria-label="Conhecer o EMT CRM"><Palco fundo="verde"><Janela src="/images/sistemas/crm-pipeline.webp" alt="Tela de negociações do EMT CRM, com cotações por etapa" w={1600} h={750} /></Palco></Link>
        <div>
          <h3 className="titulo text-4xl lg:text-5xl">EMT CRM</h3>
          <p className="mt-4 text-lg leading-relaxed text-nevoa">Cada cotação do ERP vira um negócio com valor, peso e preço por quilo. O time vê o que está em proposta, o que está em negociação e o que já virou pedido.</p>
          <Botao to="/crm" tipo="suave" className="mt-7">Conhecer o EMT CRM</Botao>
        </div>
      </div>

      <div className="mt-28 grid items-center gap-10 lg:mt-40 lg:grid-cols-[1fr_1.55fr] lg:gap-20">
        <div className="order-2 lg:order-1">
          <h3 className="titulo text-4xl lg:text-5xl">EMT ERP</h3>
          <p className="mt-4 text-lg leading-relaxed text-nevoa">Do atendimento à nota, sem trocar de sistema: cotação, liberação de preço, pedido, NF-e, contas e estoque por corrida.</p>
          <Botao to="/sistema-gestao" tipo="suave" className="mt-7">Conhecer o EMT ERP</Botao>
        </div>
        <Link to="/sistema-gestao" className="order-1 block lg:order-2" aria-label="Conhecer o EMT ERP"><Palco fundo="azul"><Janela src="/images/sistemas/erp-atendimento.webp" alt="Tela de atendimento do EMT ERP, com uma cotação de chapas" w={1600} h={675} /></Palco></Link>
      </div>

      <div className="mt-28 grid items-center gap-10 lg:mt-40 lg:grid-cols-[1.55fr_1fr] lg:gap-20">
        <a href={STEELFLOW_URL} target="_blank" rel="noopener noreferrer" className="block" aria-label="Conhecer o SteelFlow"><Palco fundo="azul"><Janela src="/images/sistemas/tela-steelflow.webp" alt="Tela do operador no SteelFlow, com o próximo corte e a fila" w={960} h={1040} className="mx-auto max-w-[26rem]" /></Palco></a>
        <div>
          <h3 className="titulo text-4xl lg:text-5xl">SteelFlow</h3>
          <p className="mt-4 text-lg leading-relaxed text-nevoa">O operador abre a fila da serra e vê o próximo corte: medida, quantidade, peso teórico e entrega. O gestor acompanha pelo painel.</p>
          <Botao href={STEELFLOW_URL} tipo="suave" className="mt-7">Conhecer o SteelFlow</Botao>
        </div>
      </div>
      <p className="mt-14 text-sm text-apagado">Telas com dados de exemplo.</p>
    </section>
  )
}

export default function Home() {
  return (
    <div className="bg-noite text-claro">
      <Galpao />
      <PorDentro />

      <section id="como-trabalhamos" className="px-5 pt-32 sm:px-8 lg:px-14 lg:pt-52">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_26rem]">
          <h2 className="titulo text-[clamp(2.5rem,5vw,5rem)]">Como trabalhamos<br />com sua empresa.</h2>
          <p className="text-lg leading-relaxed text-nevoa">Organização e transparência em cada etapa. Você sabe o que será entregue, quando e como medir o resultado, sem surpresas no meio do caminho.</p>
        </div>
        <ol className="mt-14 lg:mt-20">
          {etapas.map(([forte, resto]) => (
            <li key={forte} className="py-3 text-[clamp(1.6rem,3.3vw,3.1rem)] leading-tight font-medium tracking-[-0.025em] text-apagado lg:py-4">
              <span className="text-claro">{forte}</span> {resto}
            </li>
          ))}
        </ol>
      </section>

      <section id="sobre" className="px-5 pt-32 sm:px-8 lg:px-14 lg:pt-52">
        <h2 className="sr-only">Sobre a EMT</h2>
        <p className="max-w-[30ch] text-[clamp(1.9rem,4vw,3.9rem)] leading-[1.12] font-medium tracking-[-0.03em]">
          Desenvolvemos software próprio, o EMT ERP, o EMT CRM e o SteelFlow, e também sites e automações que ajudam empresas a operar melhor.
        </p>
        <p className="mt-8 max-w-[38rem] text-lg leading-relaxed text-nevoa">
          Atuamos com diferentes segmentos: cada projeto nasce do que você precisa medir, automatizar ou comunicar, sem soluções genéricas demais.
        </p>
      </section>

      <Contato />
      <Footer />
    </div>
  )
}
