import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

export default function RevealWords({
  as: Tag = 'h2',
  text,
  className,
  accent,
  trigger = 'view',
  delay = 0,
}) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  const accents = new Set(Array.isArray(accent) ? accent : accent ? [accent] : [])

  if (reduce) {
    return (
      <Tag className={className}>
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className={accents.has(word) ? 'text-[var(--color-primary)]' : undefined}>
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </Tag>
    )
  }

  const motionProps =
    trigger === 'mount'
      ? { animate: { y: '0%', opacity: 1 } }
      : {
          whileInView: { y: '0%', opacity: 1 },
          viewport: { once: true, margin: '-12% 0px -8% 0px' },
        }

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden align-bottom pb-[0.18em] leading-[1.15]"
        >
          <motion.span
            className={`inline-block ${i < words.length - 1 ? 'pr-[0.28em]' : ''} ${accents.has(word) ? 'text-[var(--color-primary)]' : ''}`}
            initial={{ y: '108%', opacity: 0 }}
            transition={{ duration: 0.62, delay: delay + i * 0.038, ease: EASE }}
            {...motionProps}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
