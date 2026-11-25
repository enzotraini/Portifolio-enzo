import { EMT_CRM_URL, EMT_SYSTEM_URL } from '../utils/links'

export const produtos = [
  {
    id: 'erp',
    nome: 'EMT ERP',
    area: 'Gestão',
    texto: 'Financeiro, faturamento, NF-e, clientes e vendas numa plataforma web, com os dados da operação em tempo real.',
    resumo: 'Cotação, pedido, nota e financeiro.',
    itens: ['Financeiro e faturamento', 'Clientes e atendimento', 'NF-e e estoque', 'Relatórios gerenciais'],
    pagina: '/sistema-gestao',
    acesso: EMT_SYSTEM_URL,
    whatsapp: 'Olá! Tenho interesse no EMT ERP e gostaria de uma demonstração.',
    torre: '/images/emt3d/torre-erp.webp',
  },
  {
    id: 'crm',
    nome: 'EMT CRM',
    area: 'Comercial',
    texto: 'Recebe a cotação do ERP e organiza o follow-up até o contato com o cliente. A Maya acompanha cada passo.',
    resumo: 'Follow-up de cada cotação, com a Maya.',
    itens: ['Cotações que chegam do ERP', 'Da cotação ao contato', 'Maya no acompanhamento', 'Carteira e histórico'],
    pagina: '/crm',
    acesso: EMT_CRM_URL,
    whatsapp: 'Olá! Tenho interesse no EMT CRM e gostaria de uma demonstração.',
    torre: '/images/emt3d/torre-crm.webp',
  },
  {
    id: 'steelflow',
    nome: 'SteelFlow',
    area: 'Chão de fábrica',
    texto: 'Do pedido no ERP à fila do operador na serra, com lote, retalho e conferência de peso até a liberação.',
    resumo: 'O pedido vira tarefa na fila da serra.',
    itens: ['Tarefas por operador e serra', 'Lote, retalho e sucata', 'Conferência na balança', 'Painel do gestor'],
    whatsapp: 'Olá! Tenho interesse no SteelFlow e gostaria de uma demonstração.',
    torre: '/images/emt3d/torre-steelflow.webp',
  },
]
