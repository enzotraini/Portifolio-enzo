import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { STEELFLOW_URL } from '../utils/links'
import { getWhatsAppUrl } from '../utils/whatsapp'

const links = [
  ['EMT ERP', '/sistema-gestao'],
  ['EMT CRM', '/crm'],
  ['SteelFlow', STEELFLOW_URL],
  ['Como trabalhamos', '/#como-trabalhamos'],
  ['Sobre', '/#sobre'],
]
const zap = getWhatsAppUrl('Olá! Gostaria de conversar sobre um sistema para minha empresa.')

function Item({ nome, destino, className, onClick }) {
  if (destino.startsWith('/')) return <Link to={destino} className={className} onClick={onClick}>{nome}</Link>
  return <a href={destino} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>{nome}</a>
}

function Suporte({ className }) {
  return <a href="/Suporte-EMT.exe" download="Suporte-EMT.exe" className={className}>Suporte</a>
}

export default function Navbar() {
  const [aberto, setAberto] = useState(false)
  const [rolou, setRolou] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const ver = () => setRolou(window.scrollY > 24)
    ver()
    window.addEventListener('scroll', ver, { passive: true })
    return () => window.removeEventListener('scroll', ver)
  }, [])

  useEffect(() => {
    if (!aberto) return
    const tecla = (e) => e.key === 'Escape' && setAberto(false)
    document.addEventListener('keydown', tecla)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', tecla)
      document.body.style.overflow = ''
    }
  }, [aberto])

  const fechar = () => setAberto(false)
  const solido = pathname === '/sites' || aberto

  return (
    <header className={`fixed inset-x-0 top-0 z-50 text-claro transition-colors duration-300 ${solido ? 'bg-noite' : ''}`}>
      {!solido && <div aria-hidden className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-noite from-30% via-noite/80 via-65% to-transparent transition-opacity duration-300 ${rolou ? 'opacity-100' : 'opacity-0'}`} />}
      <nav className="flex h-[76px] items-center px-5 sm:px-8 lg:px-14" aria-label="Principal">
        <Link to="/" onClick={() => { fechar(); if (pathname === '/' && !hash) window.scrollTo(0, 0) }} className="flex-1 text-2xl font-bold tracking-[-0.04em]">EMT</Link>
        <div className="hidden items-center gap-8 lg:flex">
          {links.map(([nome, destino]) => <Item key={nome} nome={nome} destino={destino} className="text-[0.95rem] text-gelo transition-colors hover:text-white" />)}
        </div>
        <div className="hidden flex-1 items-center justify-end gap-6 lg:flex">
          <Suporte className="text-[0.95rem] text-gelo transition-colors hover:text-white" />
          <a href={zap} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full bg-claro px-5 text-[0.95rem] font-medium text-noite transition-colors hover:bg-white">Falar no WhatsApp</a>
        </div>
        <button type="button" onClick={() => setAberto(!aberto)} aria-expanded={aberto} aria-controls="menu" className="-mr-2 px-2 py-3 font-medium lg:hidden">{aberto ? 'Fechar' : 'Menu'}</button>
      </nav>
      {aberto && (
        <div id="menu" className="flex h-[calc(100svh-76px)] flex-col overflow-y-auto px-5 pt-6 pb-10 sm:px-8 lg:hidden">
          {links.map(([nome, destino]) => <Item key={nome} nome={nome} destino={destino} onClick={fechar} className="titulo py-3 text-4xl" />)}
          <div className="mt-auto grid gap-3 pt-10">
            <Suporte className="py-3 text-gelo" />
            <a href={zap} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-claro font-medium text-noite">Falar no WhatsApp</a>
          </div>
        </div>
      )}
    </header>
  )
}
