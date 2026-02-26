import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function Particles() {
  const layers = useMemo(() => {
    // Camada fundo: partículas grandes, lentas, baixa opacidade
    const far = Array.from({ length: 15 }, (_, i) => ({
      id: `far-${i}`,
      x: Math.random() * 120 - 60,
      y: Math.random() * 120 - 60,
      size: Math.random() * 4 + 3,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 10,
      opacity: 0.08,
      blur: true,
    }))
    // Camada meio: partículas médias
    const mid = Array.from({ length: 25 }, (_, i) => ({
      id: `mid-${i}`,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      size: Math.random() * 2.5 + 1,
      duration: Math.random() * 18 + 12,
      delay: Math.random() * 6,
      opacity: 0.25,
      blur: false,
    }))
    // Camada frente: partículas pequenas, mais nítidas
    const near = Array.from({ length: 30 }, (_, i) => ({
      id: `near-${i}`,
      x: Math.random() * 80 - 40,
      y: Math.random() * 80 - 40,
      size: Math.random() * 1.5 + 0.5,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 4,
      opacity: 0.4,
      blur: false,
    }))

    return [...far, ...mid, ...near]
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {layers.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[var(--color-accent)]"
          style={{
            left: `${50 + p.x}%`,
            top: `${50 + p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            filter: p.blur ? 'blur(2px)' : 'none',
            boxShadow: p.blur ? 'none' : `0 0 ${p.size * 2}px rgba(0,255,136,0.3)`,
          }}
          animate={{
            opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5],
            scale: [1, 1.3, 1],
            x: [0, (Math.random() - 0.5) * 20, 0],
            y: [0, (Math.random() - 0.5) * 20, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
