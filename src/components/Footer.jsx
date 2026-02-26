import { motion } from 'framer-motion'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-12 px-6 md:px-12 lg:px-24 border-t border-[var(--color-border)]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.p
          className="text-[var(--color-muted)] text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          © {year} Enzo. Feito com paixão.
        </motion.p>
        <a
          href="https://github.com/enzotraini"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors text-sm"
          data-cursor-hover
        >
          GitHub
        </a>
      </div>
    </footer>
  )
}
