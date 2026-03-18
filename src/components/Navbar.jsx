import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '/#sobre', label: 'Sobre' },
  { href: '/#projetos', label: 'Projetos' },
  { href: '/#depoimentos', label: 'Depoimentos' },
  { href: '/#porque-contratar', label: 'Por que nos escolher' },
  { href: '/#contato', label: 'Contato' },
  { href: '/emt', label: 'EMT', isEmt: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[var(--color-void)]/80 backdrop-blur-xl border-b border-[var(--color-border)]' : ''
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="flex items-center justify-between px-5 sm:px-6 md:px-12 lg:px-24 py-4 sm:py-6">
          <a href="/" className="font-display font-bold text-xl">
            EMT
          </a>

          <div className="hidden md:flex gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-[var(--color-muted)] hover:text-white transition-colors relative group ${link.isEmt ? 'text-[var(--color-accent)]/80' : ''}`}
                data-cursor-hover
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-accent)] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                className="block h-0.5 w-full bg-white rounded"
                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="block h-0.5 w-full bg-white rounded"
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.span
                className="block h-0.5 w-full bg-white rounded"
                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              />
            </div>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[var(--color-void)] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.nav
              className="flex flex-col items-center justify-center h-full gap-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {links.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={`text-2xl font-display ${link.isEmt ? 'text-[var(--color-accent)]' : ''}`}
                  onClick={() => setMobileOpen(false)}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
