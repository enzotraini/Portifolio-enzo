import { Link } from 'react-router-dom'
import PaginaProduto, { Bloco, BlocoLargo, Lista } from '../components/PaginaProduto'
import { produtos } from '../data/produtos'
import { STEELFLOW_URL } from '../utils/links'
import { getWhatsAppUrl } from '../utils/whatsapp'

const erp = produtos.find((p) => p.id === 'erp')
const azul = { frio: [0.06, 0.19, 0.6], brilho: [0.74, 0.86, 1], quente: [0.5, 0.56, 0.68] }
const img = (nome, alt, h = 725) => ({ src: `/images/sistemas/erp-${nome}.webp`, alt, w: 1600, h })

export default function SystemPage() {
  return (
    <PaginaProduto
      nome="EMT ERP"
      titulo="Da cotação à nota, no mesmo sistema."
      texto="Financeiro, faturamento, NF-e, clientes e vendas numa plataforma web, com os dados da operação em tempo real."
      cores={azul}
      tela={img('atendimento', 'Atendimento no EMT ERP, com uma cotação de chapas por medida e peso', 675)}
      acesso={erp.acesso}
      whatsapp={getWhatsAppUrl(erp.whatsapp)}
      contato={{ titulo: 'Quer ver o EMT ERP na sua empresa?', mensagem: erp.whatsapp }}
    >
      <Bloco
        fundo="azul"
        titulo="O atendimento vira pedido sem recomeçar."
        texto="Cliente, medida, peso, condição e preço no mesmo lugar. Fechou a cotação, ela segue para o pedido com o que já foi preenchido."
        itens={['Atendimento e agenda de cotações', 'Pedidos de venda e de compra', 'Clientes, vendedores e transportadoras', 'Condições de pagamento']}
        tela={{ src: '/images/sistemas/tela-erp.webp', alt: 'Lista de cotações do dia no EMT ERP', w: 960, h: 1040 }}
        estreita
      />
      <BlocoLargo
        fundo="azul"
        titulo="Desconto passa por quem decide."
        texto="Item abaixo da tabela entra na fila de liberação. Quem tem permissão libera, nega ou desfaz, com cliente, vendedor e desconto à vista."
        tela={img('preco', 'Fila de liberação de preço com cotações aguardando, liberadas e negadas')}
      />
      <Bloco
        fundo="azul"
        titulo="Nota emitida e conferida na SEFAZ."
        texto="Emissão, controle e consulta de NF-e em telas próprias, com a situação de cada nota à vista."
        itens={['Emissão e controle de notas', 'Consulta de NF-e destinadas', 'ICMS, PIS, COFINS, IBPT e Simples Nacional', 'Natureza de operação e classificação fiscal']}
        tela={img('nota', 'Notas fiscais com situação na SEFAZ', 885)}
        inverter
      />
      <BlocoLargo
        fundo="azul"
        titulo="O que entra, o que sai e o que venceu."
        texto="Contas a receber e a pagar por vencimento. Receba, prorrogue e veja as vencidas sem sair da tela."
        tela={img('receber', 'Contas a receber com duplicatas a vencer, vencidas e recebidas')}
      />
      <Bloco
        fundo="azul"
        titulo="Estoque que sabe de qual corrida saiu."
        texto="Cada entrada e cada saída ficam no kardex, com documento, corrida e saldo. Para produto e para matéria-prima."
        itens={['Kardex de produto e de matéria-prima', 'Entrada de mercadoria', 'Corridas', 'Listagem de estoque']}
        tela={img('kardex', 'Kardex de uma barra 4140 com movimentos por corrida', 885)}
      />
      <Lista
        titulo="Como ele chega na sua empresa"
        itens={[
          ['Acesso web', 'Sistema web acessível de qualquer lugar.'],
          ['Permissão por cargo', 'Cada usuário vê o que faz parte do trabalho dele.'],
          ['Implementação próxima', 'Implementação com suporte próximo, do cadastro ao primeiro faturamento.'],
          ['Evolução contínua', 'O sistema evolui conforme o negócio cresce.'],
        ]}
      />
      <section className="px-5 pt-32 sm:px-8 lg:px-14 lg:pt-52">
        <p className="max-w-[26ch] text-[clamp(1.9rem,4vw,3.9rem)] leading-[1.12] font-medium tracking-[-0.03em] text-apagado">
          E a cotação não para aqui. O <Link to="/crm" className="text-claro underline decoration-white/30 underline-offset-8 hover:decoration-white">EMT CRM</Link> acompanha até fechar, e o <a href={STEELFLOW_URL} target="_blank" rel="noopener noreferrer" className="text-claro underline decoration-white/30 underline-offset-8 hover:decoration-white">SteelFlow</a> leva o pedido para a serra.
        </p>
      </section>
    </PaginaProduto>
  )
}
