import { Link } from 'react-router-dom'
import { STEELFLOW_URL } from '../utils/links'
import { getWhatsAppUrl } from '../utils/whatsapp'

const colunas = [
  ['Sistemas', [['EMT ERP', '/sistema-gestao'], ['EMT CRM', '/crm'], ['SteelFlow', STEELFLOW_URL]]],
  ['Empresa', [['Como trabalhamos', '/#como-trabalhamos'], ['Sobre', '/#sobre'], ['Sites e automação', '/sites']]],
  ['Contato', [['WhatsApp', getWhatsAppUrl()], ['E-mail', 'mailto:enzotraini8@gmail.com'], ['GitHub', 'https://github.com/enzotraini'], ['Suporte remoto', '/Suporte-EMT.exe']]],
]

function Item({ nome, destino }) {
  const c = 'inline-block py-1 text-gelo transition-colors hover:text-white'
  if (destino.endsWith('.exe')) return <a href={destino} download className={c}>{nome}</a>
  if (destino.startsWith('/')) return <Link to={destino} className={c}>{nome}</Link>
  return <a href={destino} target="_blank" rel="noopener noreferrer" className={c}>{nome}</a>
}

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-tinta px-5 text-claro sm:px-8 lg:px-14">
      <div className="grid grid-cols-2 gap-10 border-t border-white/10 pt-14 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <p className="col-span-2 text-nevoa lg:col-span-1">EMT Informática, {new Date().getFullYear()}</p>
        {colunas.map(([titulo, itens]) => (
          <div key={titulo}>
            <h3 className="mb-2 text-nevoa">{titulo}</h3>
            <ul>{itens.map(([nome, destino]) => <li key={nome}><Item nome={nome} destino={destino} /></li>)}</ul>
          </div>
        ))}
      </div>
      <img src="/images/sistemas/letreiro.webp" alt="" width={2000} height={610} loading="lazy" className="mx-auto mt-16 -mb-px block w-full max-w-[1500px]" />
    </footer>
  )
}
