import { useCallback, useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import LaptopFrame from './LaptopFrame'

export default function HeroLaptopVideo({ src, poster, label, reduceMotion = false }) {
  const boxRef = useRef(null)
  const videoRef = useRef(null)
  const [failed, setFailed] = useState(false)
  const [muted, setMuted] = useState(true)
  const [shouldLoad, setShouldLoad] = useState(false)
  const showStill = reduceMotion || failed || !shouldLoad

  useEffect(() => {
    if (reduceMotion) return
    const node = boxRef.current
    if (!node) return

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setShouldLoad(true)
        observer.disconnect()
      },
      { rootMargin: '240px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reduceMotion])

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
    <div ref={boxRef} className="mx-auto w-full max-w-4xl">
      <LaptopFrame screenClassName="aspect-video">
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
          <video
            ref={attachVideo}
            className="absolute inset-0 h-full w-full bg-slate-950 object-cover object-center"
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={label}
            onError={() => setFailed(true)}
          />
        )}
        {!showStill && (
          <button
            type="button"
            onClick={toggleSound}
            className="absolute right-2.5 bottom-2.5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/70 text-white shadow-md ring-1 ring-white/30 backdrop-blur-sm transition-colors hover:bg-slate-950/90"
            aria-label={muted ? 'Ativar som do vídeo' : 'Desativar som do vídeo'}
          >
            {muted ? <VolumeX className="h-4 w-4" aria-hidden /> : <Volume2 className="h-4 w-4" aria-hidden />}
          </button>
        )}
      </LaptopFrame>
    </div>
  )
}
