import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { getWhatsAppUrl } from '../utils/whatsapp'

const links = [
  { href: '/#solucoes', label: 'Soluções' },
  { to: '/projetos', label: 'Projetos' },
  { href: '/#sobre', label: 'Sobre' },
  { href: '/#depoimentos', label: 'Depoimentos' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#contato', label: 'Contato' },
]

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

  const waHref = getWhatsAppUrl('Olá! Gostaria de falar com a EMT sobre um projeto.')

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
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-3.5 sm:px-6 md:px-12 md:py-4 lg:px-24">
          <a
            href="/"
            className={`font-display text-xl font-bold transition-colors ${
              useLightNav ? 'text-[var(--color-navy)]' : 'text-white'
            }`}
          >
            EMT
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {links.map((link) =>
              link.to ? (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-colors ${
                    useLightNav
                      ? 'text-[var(--color-muted)] hover:text-[var(--color-navy)]'
                      : 'text-white hover:text-white/85'
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    useLightNav
                      ? 'text-[var(--color-muted)] hover:text-[var(--color-navy)]'
                      : 'text-white hover:text-white/85'
                  }`}
                >
                  {link.label}
                </a>
              ),
            )}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="/#contato"
              className={`inline-flex min-h-[44px] items-center rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                useLightNav
                  ? 'border-[var(--color-border)] text-[var(--color-navy)] hover:bg-[var(--color-surface-muted)]'
                  : 'border-white/40 text-white hover:bg-white/10'
              }`}
            >
              Contato
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-primary-hover)]"
            >
              Falar no WhatsApp
            </a>
          </div>

          <button
            type="button"
            className={`rounded-lg p-2 md:hidden ${useLightNav ? 'text-[var(--color-navy)]' : 'text-white'}`}
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
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white pt-24 md:hidden"
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
              {links.map((link) =>
                link.to ? (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="font-display text-xl font-semibold text-[var(--color-navy)]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="font-display text-xl font-semibold text-[var(--color-navy)]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ),
              )}
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex justify-center rounded-full bg-[var(--color-primary)] px-6 py-3.5 font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                Falar no WhatsApp
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
