import { useCallback, useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import TabletFrame from './TabletFrame'

const SPRING = { stiffness: 100, damping: 28, mass: 0.4 }

export default function HeroLaptopVideo({
  src,
  poster,
  label,
  reduceMotion = false,
  scrollProgress,
  compact = false,
}) {
  const boxRef = useRef(null)
  const videoRef = useRef(null)
  const [failed, setFailed] = useState(false)
  const [muted, setMuted] = useState(true)
  const [onScreen, setOnScreen] = useState(false)
  const [screenOn, setScreenOn] = useState(() => !!reduceMotion)
  const showStill = reduceMotion || failed

  const idleProgress = useMotionValue(reduceMotion ? 1 : 0)
  const progress = scrollProgress ?? idleProgress

  const tiltRaw = useTransform(progress, [0, 0.7], [18, 0])
  const scale = useTransform(progress, [0, 0.8], [compact ? 0.92 : 0.62, compact ? 1 : 1.04])
  const lift = useTransform(progress, [0, 0.74], [compact ? 18 : 28, compact ? -16 : -80])
  const videoFade = useTransform(progress, [0.2, 0.5], [0, 1])
  const glassFade = useTransform(progress, [0.12, 0.44], [1, 0])

  const tilt = useSpring(tiltRaw, SPRING)

  useEffect(() => {
    if (scrollProgress || reduceMotion) return
    idleProgress.set(0)
    const t = window.setTimeout(() => {
      animate(idleProgress, 1, { duration: 1.7, ease: [0.16, 1, 0.3, 1] })
    }, 380)
    return () => window.clearTimeout(t)
  }, [idleProgress, reduceMotion, scrollProgress])

  useMotionValueEvent(progress, 'change', (value) => {
    setScreenOn(value > 0.28)
  })

  useEffect(() => {
    if (reduceMotion) return
    const node = boxRef.current
    if (!node) return

    if (!('IntersectionObserver' in window)) {
      const frame = requestAnimationFrame(() => setOnScreen(true))
      return () => cancelAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen((entry?.intersectionRatio ?? 0) >= 0.28),
      { threshold: [0, 0.28] },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reduceMotion])

  useEffect(() => {
    const video = videoRef.current
    if (!video || showStill) return
    if (onScreen && screenOn) {
      const play = video.play()
      if (play && typeof play.catch === 'function') play.catch(() => {})
    } else {
      video.pause()
    }
  }, [onScreen, screenOn, showStill])

  const attachVideo = useCallback((node) => {
    videoRef.current = node
    if (node) node.muted = true
  }, [])

  function toggleSound() {
    const video = videoRef.current
    if (!video) return

    const nextMuted = !video.muted
    video.muted = nextMuted
    if (!nextMuted) {
      video.volume = 1
      const play = video.play()
      if (play && typeof play.catch === 'function') play.catch(() => {})
    }
    setMuted(nextMuted)
  }

  return (
    <div ref={boxRef} className="h-full w-full">
      <TabletFrame
        compact={compact}
        tilt={reduceMotion ? 0 : tilt}
        scale={reduceMotion ? 1 : scale}
        lift={reduceMotion ? 0 : lift}
      >
        <div className="absolute inset-0 bg-[#0b0e14]" />

        {showStill ? (
          <img
            src={poster}
            alt={label}
            className="absolute inset-0 h-full w-full object-cover object-top"
            width={1766}
            height={891}
            decoding="async"
          />
        ) : (
          <motion.video
            ref={attachVideo}
            className="absolute inset-0 h-full w-full bg-black object-cover object-center"
            style={{ opacity: videoFade }}
            src={src}
            muted
            loop
            playsInline
            preload="auto"
            aria-label={label}
            onError={() => setFailed(true)}
          />
        )}

        {!reduceMotion && (
          <motion.p
            className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-4xl font-semibold tracking-[-0.08em] text-white/20 sm:text-6xl"
            style={{ opacity: glassFade }}
            aria-hidden
          >
            EMT
          </motion.p>
        )}

        {!reduceMotion && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: glassFade,
              background:
                'linear-gradient(155deg, rgba(255,255,255,0.16) 0%, transparent 32%, transparent 58%, rgba(148,163,184,0.1) 100%)',
            }}
            aria-hidden
          />
        )}

        {!showStill && screenOn && (
          <button
            type="button"
            onClick={toggleSound}
            className="absolute right-2.5 bottom-2.5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/70 text-white shadow-md ring-1 ring-white/30 backdrop-blur-sm transition-colors hover:bg-slate-950/90"
            aria-label={muted ? 'Ativar som do vídeo' : 'Desativar som do vídeo'}
          >
            {muted ? <VolumeX className="h-4 w-4" aria-hidden /> : <Volume2 className="h-4 w-4" aria-hidden />}
          </button>
        )}
      </TabletFrame>
    </div>
  )
}
