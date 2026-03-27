import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { getWhatsAppUrl } from '../utils/whatsapp'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const waHref = getWhatsAppUrl('Olá! Gostaria de falar sobre um projeto.')

  return (
    <section id="contato" className="py-20 sm:py-24 md:py-28 px-5 sm:px-6 md:px-12 lg:px-24 bg-[var(--color-surface)]" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 text-[var(--color-navy)]"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Fale com a <span className="text-[var(--color-primary)]">EMT</span>
        </motion.h2>

        <motion.p
          className="text-[var(--color-muted)] mb-2 text-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.06 }}
        >
          Conte o que precisa — respondemos pelo WhatsApp em horário comercial.
        </motion.p>
        <motion.p
          className="text-sm text-[var(--color-muted)] mb-10"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Para orçamentos e suporte comercial, prefira o WhatsApp. E-mail para propostas e documentos.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.14 }}
        >
          <motion.a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-[#25D366] text-white font-semibold text-base min-h-[48px] flex items-center justify-center gap-2 shadow-sm hover:brightness-105 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp (principal)
          </motion.a>
          <motion.a
            href="mailto:enzotraini8@gmail.com"
            className="px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-[var(--color-primary)] text-white font-semibold text-base min-h-[48px] flex items-center justify-center hover:bg-[var(--color-primary-hover)] transition-colors shadow-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Enviar e-mail
          </motion.a>
          <motion.a
            href="https://github.com/enzotraini"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 sm:px-10 sm:py-4 rounded-full border border-[var(--color-border)] text-[var(--color-navy)] font-medium text-base min-h-[48px] flex items-center justify-center hover:bg-[var(--color-surface-muted)] transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
