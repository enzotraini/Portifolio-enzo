import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { STEELFLOW_URL } from '../utils/links'
import SteelFlowLink from './SteelFlowLink'

const linkClass =
  'text-sm font-medium uppercase tracking-wide text-white/85 transition-colors hover:text-white'

function FooterLink({ item }) {
  if (item.confirmRedirect) {
    return (
      <SteelFlowLink className={linkClass}>{item.label}</SteelFlowLink>
    )
  }

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {item.label}
      </a>
    )
  }

  if (item.to || (typeof item.href === 'string' && item.href.startsWith('/#'))) {
    return (
      <Link to={item.to || item.href} className={linkClass}>
        {item.label}
      </Link>
    )
  }

  return (
    <a href={item.href} className={linkClass}>
      {item.label}
    </a>
  )
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-white">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((item) => (
          <li key={(item.to || item.href) + item.label}>
            <FooterLink item={item} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#120a8f] via-[#191970] via-[42%] to-[#120a8f] text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 42% at 50% -8%, rgba(129, 140, 248, 0.28), transparent 68%), radial-gradient(ellipse 26% 32% at 100% 26%, rgba(96, 165, 250, 0.14), transparent 70%), radial-gradient(ellipse 22% 28% at 0% 70%, rgba(255, 255, 255, 0.08), transparent 70%)',
        }}
      />

      <div className="relative z-10 px-5 pb-0 pt-14 sm:px-6 sm:pt-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <p className="max-w-[12ch] font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                Fique por dentro
              </p>
            </motion.div>

            <FooterCol
              title="Soluções"
              links={[
                { href: '/#solucoes', label: 'O que entregamos' },
                { to: '/sistema-gestao', label: 'EMT ERP' },
                { to: '/crm', label: 'EMT CRM' },
                { href: STEELFLOW_URL, label: 'SteelFlow SaaS', confirmRedirect: true },
                { to: '/sites', label: 'Criador de sites' },
                { href: '/#como-trabalhamos', label: 'Como trabalhamos' },
              ]}
            />
            <FooterCol
              title="Empresa"
              links={[
                { href: '/#sobre', label: 'Sobre' },
                { href: '/#diferenciais', label: 'Diferenciais' },
                { href: '/#faq', label: 'FAQ' },
              ]}
            />
            <FooterCol
              title="Contato"
              links={[
                { href: '/#contato', label: 'Fale conosco' },
                { href: 'mailto:enzotraini8@gmail.com', label: 'E-mail', external: true },
                {
                  href: 'https://github.com/enzotraini',
                  label: 'GitHub',
                  external: true,
                },
              ]}
            />
          </div>

          <motion.div
            className="mt-14 flex flex-col gap-3 sm:mt-16 sm:flex-row sm:items-center sm:justify-between"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <p className="text-sm text-white/70">
              © {year}. Todos os direitos reservados.
            </p>
            <a
              href="#"
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              Política de privacidade
            </a>
          </motion.div>
        </div>

        <motion.div
          className="pointer-events-none mt-10 select-none overflow-hidden sm:mt-12"
          aria-hidden="true"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="translate-y-[18%] text-center font-display text-[min(42vw,18rem)] font-bold leading-none tracking-[-0.06em] text-white">
            EMT
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
