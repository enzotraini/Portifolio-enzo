import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { STEELFLOW_URL } from '../utils/links'
import SteelFlowLink from './SteelFlowLink'

const links = [
  { href: '/#solucoes', label: 'Soluções' },
  { to: '/sistema-gestao', label: 'Sistema EMT' },
  { to: '/sites', label: 'Sites' },
  { href: STEELFLOW_URL, label: 'SteelFlow', confirmRedirect: true },
  { href: '/#sobre', label: 'Sobre' },
  { href: '/#depoimentos', label: 'Depoimentos' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#contato', label: 'Contato' },
]

function NavItem({ link, className, onClick }) {
  if (link.confirmRedirect) {
    return (
      <SteelFlowLink className={className} onNavigate={onClick}>
        {link.label}
      </SteelFlowLink>
    )
  }
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {link.label}
      </a>
    )
  }
  if (link.to) {
    return (
      <Link to={link.to} className={className} onClick={onClick}>
        {link.label}
      </Link>
    )
  }
  return (
    <a href={link.href} className={className} onClick={onClick}>
      {link.label}
    </a>
  )
}

function linkKey(link) {
  return link.to || link.href
}

function navLinkClass(useLightNav) {
  return `text-sm font-medium transition-colors ${
    useLightNav
      ? 'text-[var(--color-muted)] hover:text-[var(--color-navy)]'
      : 'text-white hover:text-white/85'
  }`
}

function SupportIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <path d="M4.93 4.93l2.83 2.83" />
      <path d="M16.24 16.24l2.83 2.83" />
      <path d="M4.93 19.07l2.83-2.83" />
      <path d="M16.24 7.76l2.83-2.83" />
    </svg>
  )
}

function supportBtnClass(useLightNav) {
  const base =
    'inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

  if (useLightNav) {
    return `${base} bg-[var(--color-primary)] text-white shadow-md shadow-blue-600/25 hover:bg-[var(--color-primary-hover)] hover:shadow-lg hover:shadow-blue-600/30 focus-visible:outline-[var(--color-primary)]`
  }

  return `${base} bg-white text-[var(--color-primary)] shadow-lg shadow-black/20 hover:bg-blue-50 hover:shadow-xl focus-visible:outline-white`
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const useLightNav = scrolled || !isHome || mobileOpen

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const supportClass = supportBtnClass(useLightNav)

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          useLightNav
            ? 'bg-white/95 backdrop-blur-md border-b border-[var(--color-border)] shadow-sm'
            : 'border-b border-transparent bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="relative mx-auto flex max-w-[1600px] items-center justify-between gap-x-4 px-5 py-3.5 sm:px-6 md:px-12 md:py-4 lg:px-24">
          {/* Esquerda: marca */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <a
              href="/"
              className={`font-display shrink-0 text-lg font-bold transition-colors sm:text-xl ${
                useLightNav ? 'text-[var(--color-navy)]' : 'text-white'
              }`}
            >
              EMT
            </a>
          </div>

          {/* Centro: âncoras (desktop) */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
            {links.map((link) => (
              <NavItem key={linkKey(link)} link={link} className={navLinkClass(useLightNav)} />
            ))}
          </div>

          {/* Direita: CTAs ou menu */}
          <div className="flex justify-end">
            <div className="hidden items-center lg:flex">
              <a href="/Suporte-EMT.exe" download="Suporte-EMT.exe" className={supportClass}>
                <SupportIcon className="h-4 w-4" />
                Suporte
              </a>
            </div>

            <button
              type="button"
              className={`rounded-lg p-2 lg:hidden ${useLightNav ? 'text-[var(--color-navy)]' : 'text-white'}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              <div className="flex h-5 w-6 flex-col justify-between">
                <motion.span
                  className="block h-0.5 w-full rounded bg-current"
                  animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="block h-0.5 w-full rounded bg-current"
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span
                  className="block h-0.5 w-full rounded bg-current"
                  animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white pt-24 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            role="presentation"
          >
            <motion.nav
              className="flex flex-col gap-6 px-6"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              {links.map((link) => (
                <NavItem
                  key={linkKey(link)}
                  link={link}
                  className="font-display text-xl font-semibold text-[var(--color-navy)]"
                  onClick={() => setMobileOpen(false)}
                />
              ))}
              <div className="mt-2 border-t border-[var(--color-border)] pt-6">
                <a
                  href="/Suporte-EMT.exe"
                  download="Suporte-EMT.exe"
                  className={`${supportBtnClass(true)} w-full`}
                  onClick={() => setMobileOpen(false)}
                >
                  <SupportIcon className="h-4 w-4" />
                  Baixar suporte remoto
                </a>
                <p className="mt-2 text-center text-xs text-[var(--color-muted)]">
                  Acesso remoto para assistência técnica
                </p>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
