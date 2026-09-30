/**
 * Logos: adicione arquivos em public/images/logos/ e use { src: '/images/logos/nome.svg', alt: 'Empresa' }.
 * Enquanto não houver arquivo, usamos `label` (texto no ticker).
 */
export const heroClientLogos = [
  { label: 'Food Light' },
  { label: 'Raio Comercial' },
  { label: 'Aços Iguatemi' },
  { label: 'BLACKCAR' },
  { label: 'EMT Consultoria' },
  { label: 'Agropecuária' },
  { label: 'Multiço' },
  { label: 'Starkvale' },
  { label: 'Viação Águia Branca' },
  { label: 'Viação Salutaris' },
  { label: 'Viação Cidade Sol' },
  { label: 'Viação Rota' },
  { label: 'Viação Jequié Cidade Sol' },
  { label: 'Viação Brasileiro' },
  { label: 'Viação Vix' },
  { label: 'Viação Planeta' },
]

/** Motion do sistema, reproduzido dentro da tela do computador no hero. */
export const systemDemoVideo = {
  src: '/videos/emt-sistema.mp4',
  poster: '/images/projects/emt-sistema-dashboard.png',
  label: 'Demonstração em motion do sistema comercial e fiscal EMT',
}

/** Capturas do sistema — galeria em /sistema-gestao */
export const systemScreens = [
  {
    src: '/images/projects/emt-sistema-login.png',
    title: 'Login',
    alt: 'Tela de login do sistema comercial e fiscal EMT',
  },
  {
    src: '/images/projects/emt-sistema-dashboard.png',
    title: 'Visão geral',
    alt: 'Dashboard com visão geral das operações do sistema EMT',
  },
  {
    src: '/images/projects/emt-sistema-atendimento.png',
    title: 'Atendimento',
    alt: 'Painel de atendimento ao cliente com cotação de venda',
  },
  {
    src: '/images/projects/emt-sistema-nfe.png',
    title: 'NF-e',
    alt: 'Consulta de NF-e com status fiscal e integração SEFAZ',
  },
  {
    src: '/images/projects/emt-sistema-financeiro.png',
    title: 'Financeiro',
    alt: 'Módulo financeiro com contas a receber e duplicatas',
  },
  {
    src: '/images/projects/emt-sistema-vendedores.png',
    title: 'Vendedores',
    alt: 'Cadastro de vendedores no módulo comercial do sistema',
  },
]
