import { useState, useEffect } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'

export default function ScrollGradient() {
  const [isMobile, setIsMobile] = useState(true)
  const { scrollYProgress } = useScroll()
  const gradientY = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], ['0%', '20%', '50%', '85%'])
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.4, 0.55, 0.3, 0.45, 0.2])
  const accentIntensity = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0.12, 0.18, 0.08, 0.14, 0.06])

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
            rgba(29, 78, 216, 0.04) 25%,
            rgba(5, 150, 105, 0.03) 55%,
            transparent 100%
          )`,
          opacity: gradientOpacity,
        }}
      />
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-[100%] max-w-6xl h-[70vh]"
        style={{
          y: gradientY,
          background: 'radial-gradient(ellipse 55% 45% at 50% 40%, rgba(29,78,216,0.06), transparent 72%)',
          opacity: accentIntensity,
        }}
      />
    </div>
  )
}
