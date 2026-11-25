import Degrade from '../components/Degrade'
import Janela from '../components/Janela'
import PaginaProduto, { Bloco, BlocoLargo, Lista, Palco } from '../components/PaginaProduto'
import { produtos } from '../data/produtos'
import { getWhatsAppUrl } from '../utils/whatsapp'

const crm = produtos.find((p) => p.id === 'crm')
const verde = { frio: [0.03, 0.58, 0.36], brilho: [0.7, 1, 0.86], quente: [0.04, 0.3, 0.42] }
const img = (nome, alt, w, h) => ({ src: `/images/sistemas/crm-${nome}.webp`, alt, w, h })

export default function CrmPage() {
  return (
    <PaginaProduto
      nome="EMT CRM"
      titulo="Da cotação ao contato. O comercial ligado à operação."
      texto="O EMT CRM recebe a cotação do ERP e organiza o follow-up até o contato com o cliente. A Maya acompanha cada passo para nada ficar parado."
      cores={verde}
      tela={img('visao', 'Visão geral do EMT CRM: valor em aberto, cotações por semana e funil por etapa', 1600, 923)}
      acesso={crm.acesso}
      whatsapp={getWhatsAppUrl(crm.whatsapp)}
      contato={{ titulo: 'Quer ver o EMT CRM na sua operação?', mensagem: crm.whatsapp }}
    >
      <BlocoLargo
        titulo="A cotação sai do ERP e aparece aqui."
        texto="Ninguém redigita nada. Cada cotação vira um negócio na etapa certa, com valor, peso em toneladas, preço por quilo e quem está atendendo."
        tela={img('pipeline', 'Negociações por etapa: proposta, negociação, ganho e perdido', 1600, 750)}
        fundo="verde"
      />
      <Bloco
        titulo="Tudo da negociação numa ficha só."
        texto="Abriu o negócio, está tudo ali: o que foi cotado, com quem falar e qual o próximo passo."
        itens={['Valor, probabilidade e previsão', 'Peso, preço médio por quilo e linha', 'Proposta por e-mail ou WhatsApp', 'Contato do cliente e registro da conversa']}
        tela={img('negocio', 'Ficha da negociação com a Caldeiraria Norte', 920, 1000)}
        fundo="verde"
        estreita
        inverter
      />
      <BlocoLargo
        titulo="O dia já começa organizado."
        texto="As tarefas vêm da equipe e do próprio ERP: cotação parada, preço liberado, cliente sem retorno. Atrasadas primeiro, depois hoje, depois a semana."
        tela={img('tarefas', 'Tarefas separadas em atrasadas, hoje e próximos sete dias', 1600, 750)}
        fundo="verde"
      />

      <section className="px-5 pt-32 sm:px-8 lg:px-14 lg:pt-52">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <div className="h-28 w-28 overflow-hidden rounded-full lg:h-36 lg:w-36"><Degrade {...verde} zoom={1.9} /></div>
            <h2 className="titulo mt-8 text-[clamp(2.6rem,5vw,5rem)]">Pergunte para a Maya.</h2>
            <p className="mt-5 max-w-[32rem] text-lg leading-relaxed text-nevoa">Ela lê o CRM e o ERP e responde com o que está na sua carteira: o que pode fechar agora, por onde começar, quem parou de comprar. E prepara o rascunho da mensagem.</p>
            <ul className="mt-7 grid gap-1 text-[1.35rem] text-gelo">
              <li>“O que pode fechar agora?”</li>
              <li>“Por onde começar hoje?”</li>
              <li>“Preparar um follow-up”</li>
            </ul>
          </div>
          <Palco fundo="verde"><Janela {...img('maya', 'Resposta da Maya com os próximos passos do dia', 1200, 840)} /></Palco>
        </div>
      </section>

      <BlocoLargo
        titulo="Quem compra, quem decide, quem sumiu."
        texto="Cliente, conversas e status da negociação juntos, sem planilha paralela e sem retrabalho de cadastro. Último contato, canal preferido e cotações abertas de cada comprador."
        fundo="verde"
        tela={img('contatos', 'Lista de contatos com o resumo de um comprador', 1600, 1000)}
      />
      <Lista
        titulo="Também no EMT CRM"
        itens={[
          ['Nova cotação', 'Abra a cotação pelo próprio CRM. Preço, crédito e regras continuam no ERP.'],
          ['Registro por voz', 'Terminou a visita ou a ligação? Dite o resumo e ele vira registro.'],
          ['Sincronização com o ERP', 'O sistema mostra quando sincronizou e deixa puxar na hora.'],
          ['Busca rápida', 'Empresa, contato ou cotação, de qualquer tela.'],
          ['Exportação', 'Leve os dados em CSV para o Excel ou o Google Planilhas.'],
          ['Acesso web', 'Funciona no navegador, com tema claro ou escuro.'],
        ]}
      />
    </PaginaProduto>
  )
}
