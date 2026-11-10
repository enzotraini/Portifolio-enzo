import { useReducedMotion } from 'framer-motion'

export default function HeroAtmosphere() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="hero-foam-base absolute inset-0" />
      <div className={`hero-foam-blob hero-foam-a ${reduceMotion ? '' : 'hero-foam-move-a'}`} />
      <div className={`hero-foam-blob hero-foam-b ${reduceMotion ? '' : 'hero-foam-move-b'}`} />
      <div className={`hero-foam-blob hero-foam-c ${reduceMotion ? '' : 'hero-foam-move-c'}`} />
      <div className={`hero-foam-blob hero-foam-d ${reduceMotion ? '' : 'hero-foam-move-d'}`} />
    </div>
  )
}
