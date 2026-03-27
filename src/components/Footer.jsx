import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  const col = (title, links) => (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={(l.to || l.href) + l.label}>
            {l.external ? (
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-navy)] hover:text-[var(--color-primary)] transition-colors"
              >
                {l.label}
              </a>
            ) : l.to ? (
              <Link to={l.to} className="text-sm text-[var(--color-navy)] hover:text-[var(--color-primary)] transition-colors">
                {l.label}
              </Link>
            ) : (
              <a href={l.href} className="text-sm text-[var(--color-navy)] hover:text-[var(--color-primary)] transition-colors">
                {l.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface-muted)]/60">
      <div className="px-5 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display font-bold text-xl text-[var(--color-navy)] mb-3">EMT</p>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-xs">
              Sites, sistemas web, aplicativos e automação para empresas.
            </p>
          </div>
          {col('Soluções', [
            { href: '/#solucoes', label: 'O que entregamos' },
            { to: '/projetos', label: 'Projetos' },
            { href: '/#como-trabalhamos', label: 'Como trabalhamos' },
          ])}
          {col('Empresa', [
            { href: '/#sobre', label: 'Sobre' },
            { href: '/#diferenciais', label: 'Diferenciais' },
            { href: '/#faq', label: 'FAQ' },
          ])}
          {col('Contato', [
            { href: '/#contato', label: 'Fale conosco' },
            { href: 'mailto:enzotraini8@gmail.com', label: 'E-mail', external: true },
            {
              href: 'https://github.com/enzotraini',
              label: 'GitHub',
              external: true,
            },
          ])}
        </div>
        <motion.div
          className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-[var(--color-muted)] text-sm text-center sm:text-left">
            © {year} EMT. Todos os direitos reservados.
          </p>
          <a href="#" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
            Política de privacidade
          </a>
        </motion.div>
      </div>
    </footer>
  )
}
