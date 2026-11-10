import { motion } from 'framer-motion'

export default function TabletFrame({
  children,
  className = '',
  compact = false,
  tilt = 0,
  scale = 1,
  lift = 0,
}) {
  const radius = compact ? 'rounded-[1.4rem]' : 'rounded-[1.85rem] md:rounded-[2.1rem]'
  const screenRadius = compact ? 'rounded-[1.05rem]' : 'rounded-[1.35rem] md:rounded-[1.5rem]'
  const bezel = compact ? 'p-[8px]' : 'p-[10px] md:p-[12px]'

  return (
    <div className={`relative h-full w-full ${className}`}>
      <div
        className="absolute inset-0 flex items-end justify-center"
        style={{
          perspective: compact ? '1200px' : '1800px',
          perspectiveOrigin: '50% 42%',
        }}
      >
        <motion.div
          className={`relative aspect-video ${compact ? 'w-[min(100%,420px)]' : 'w-[min(100%,860px)]'}`}
          style={{
            transformOrigin: '50% 100%',
            rotateX: tilt,
            scale,
            y: lift,
          }}
        >
          <div
            className={`relative h-full w-full ${radius} ${bezel}`}
            style={{
              background: 'linear-gradient(165deg, #8b95a5 0%, #3d4654 36%, #1a1f28 100%)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.5), 0 32px 70px -20px rgba(0,0,0,0.8)',
            }}
          >
            <span
              className="absolute top-[7px] left-1/2 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-black/80 ring-1 ring-white/15 md:top-[9px]"
              aria-hidden
            />
            <div className={`relative h-full w-full overflow-hidden bg-black ${screenRadius}`}>
              {children}
            </div>
          </div>
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-[18%] bottom-[6%] h-10 rounded-[100%] bg-black/45 blur-2xl md:h-14"
        aria-hidden
      />
    </div>
  )
}
