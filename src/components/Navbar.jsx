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

  const supportBtnClass = `inline-flex min-h-[44px] items-center rounded-full border px-3 py-2 text-sm font-semibold transition-colors sm:px-4 ${
    useLightNav
      ? 'border-[var(--color-border)] text-[var(--color-navy)] hover:bg-[var(--color-surface-muted)]'
      : 'border-white/40 text-white hover:bg-white/10'
  }`

  const contactBtnClass = `inline-flex min-h-[44px] items-center rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
    useLightNav
      ? 'border-[var(--color-border)] text-[var(--color-navy)] hover:bg-[var(--color-surface-muted)]'
      : 'border-white/40 text-white hover:bg-white/10'
  }`

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
            <div className="hidden items-center gap-3 lg:flex">
              <a href="/#contato" className={contactBtnClass}>
                Contato
              </a>
              <a href="/suporte-emt.zip" download="AnyDesk-Suporte-EMT.zip" className={supportBtnClass}>
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
              <a
                href="/#contato"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[var(--color-border)] px-6 py-3 font-semibold text-[var(--color-navy)]"
                onClick={() => setMobileOpen(false)}
              >
                Contato
              </a>
              <a
                href="/suporte-emt.zip"
                download="AnyDesk-Suporte-EMT.zip"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[var(--color-border)] px-6 py-3 font-semibold text-[var(--color-navy)]"
                onClick={() => setMobileOpen(false)}
              >
                Suporte
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
