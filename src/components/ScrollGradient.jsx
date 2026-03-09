import { useState, useEffect } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'

export default function ScrollGradient() {
  const [isMobile, setIsMobile] = useState(true)
  const { scrollYProgress } = useScroll()
  const gradientY = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], ['0%', '25%', '55%', '90%'])
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.5, 0.7, 0.35, 0.55, 0.25])
  const accentIntensity = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0.2, 0.3, 0.15, 0.25, 0.1])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            180deg,
            transparent 0%,
            rgba(0, 255, 136, 0.03) 20%,
            rgba(34, 211, 238, 0.04) 50%,
            rgba(0, 255, 136, 0.02) 80%,
            transparent 100%
          )`,
          opacity: gradientOpacity,
        }}
      />
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-[120%] h-[80vh]"
        style={{
          y: gradientY,
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,255,136,0.08), transparent 70%)',
          opacity: accentIntensity,
        }}
      />
    </div>
  )
}
