import { Link } from 'react-router-dom'

const base = 'inline-flex min-h-[50px] items-center justify-center rounded-full px-6 font-medium whitespace-nowrap transition-colors duration-200'
const estilos = {
  cheio: `${base} bg-claro text-noite hover:bg-white`,
  suave: `${base} bg-white/12 text-claro hover:bg-white/22`,
}

export default function Botao({ to, href, tipo = 'cheio', className = '', children }) {
  const c = `${estilos[tipo]} ${className}`
  if (to) return <Link to={to} className={c}>{children}</Link>
  if (href.startsWith('#')) return <a href={href} className={c}>{children}</a>
  return <a href={href} target="_blank" rel="noopener noreferrer" className={c}>{children}</a>
}
