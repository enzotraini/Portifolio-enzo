import { EMT_CRM_URL, EMT_SYSTEM_URL, STEELFLOW_URL } from '../utils/links'

export const produtos = [
  {
    id: 'erp',
    nome: 'EMT ERP',
    texto: 'Financeiro, faturamento, NF-e, clientes e vendas numa plataforma web, com os dados da operação em tempo real.',
    itens: ['Atendimento, cotação e pedido', 'Liberação de preço', 'NF-e e contas a receber', 'Estoque por corrida, no kardex'],
    pagina: '/sistema-gestao',
    acesso: EMT_SYSTEM_URL,
    whatsapp: 'Olá! Tenho interesse no EMT ERP e gostaria de uma demonstração.',
    tela: '/images/sistemas/tela-erp.webp',
  },
  {
    id: 'crm',
    nome: 'EMT CRM',
    texto: 'Recebe a cotação do ERP e organiza o follow-up até o contato com o cliente. A Maya acompanha cada passo.',
    itens: ['Cotações que chegam do ERP', 'Negociações por etapa', 'Tarefas e follow-up do dia', 'Maya no acompanhamento'],
    pagina: '/crm',
    acesso: EMT_CRM_URL,
    whatsapp: 'Olá! Tenho interesse no EMT CRM e gostaria de uma demonstração.',
    tela: '/images/sistemas/tela-crm.webp',
  },
  {
    id: 'steelflow',
    nome: 'SteelFlow',
    texto: 'Do pedido no ERP à fila do operador na serra, com lote, retalho e conferência de peso até a liberação.',
    itens: ['Tarefas por operador e serra', 'Lote, retalho e sucata', 'Conferência na balança', 'Painel do gestor'],
    site: STEELFLOW_URL,
    whatsapp: 'Olá! Tenho interesse no SteelFlow e gostaria de uma demonstração.',
    tela: '/images/sistemas/tela-steelflow.webp',
  },
]

export const empresas = [
  'Food Light', 'Raio Comercial', 'Aços Iguatemi', 'BLACKCAR', 'EMT Consultoria', 'Agropecuária', 'Multiço', 'Starkvale',
  'Viação Águia Branca', 'Viação Salutaris', 'Viação Cidade Sol', 'Viação Rota', 'Viação Jequié Cidade Sol', 'Viação Brasileiro', 'Viação Vix', 'Viação Planeta',
]
