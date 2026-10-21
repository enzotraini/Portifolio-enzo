import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

const SIDE = 0.82
const STAGE = 420
const SNAP = { type: 'spring', stiffness: 140, damping: 26, mass: 0.9 }

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function place(offset, cardWidth, gap) {
  const near = (cardWidth * (1 + SIDE)) / 2 + gap
  const step = cardWidth * SIDE + gap
  const distance = Math.abs(offset)
  const travel = distance <= 1 ? distance * near : near + (distance - 1) * step
  return Math.sign(offset) * travel
}

function scaleOf(offset) {
  return 1 - (1 - SIDE) * Math.min(Math.abs(offset), 1)
}

function QuoteCard({ item, index, progress, cardWidth, gap, active, onSelect }) {
  const x = useTransform(progress, (value) => place(index - value, cardWidth, gap))
  const scale = useTransform(progress, (value) => scaleOf(index - value))
  const veil = useTransform(progress, (value) => 0.4 * Math.min(Math.abs(index - value), 1))
  const zIndex = useTransform(progress, (value) => 30 - Math.round(Math.abs(index - value) * 8))

  return (
    <motion.li className="absolute top-1/2 left-1/2" style={{ x, scale, zIndex, width: cardWidth, marginLeft: -cardWidth / 2 }}>
      <div className="relative -translate-y-1/2">
        <article className="relative flex min-h-[250px] flex-col overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-6 shadow-sm">
          <div className="mb-4 flex gap-1" aria-hidden>
            {Array.from({ length: item.rating }, (_, star) => (
              <span key={star} className="text-amber-500">
                ★
              </span>
            ))}
          </div>
          <p className="text-[var(--color-navy)] text-lg leading-relaxed">&ldquo;{item.text}&rdquo;</p>
          <div className="mt-auto pt-6">
            <p className="font-semibold text-[var(--color-navy)]">{item.name}</p>
            <p className="text-sm text-[var(--color-muted)]">{item.role}</p>
          </div>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[var(--color-void)]"
            style={{ opacity: veil }}
          />
        </article>
        <button
          type="button"
          tabIndex={active ? 0 : -1}
          aria-current={active ? 'true' : undefined}
          aria-label={`Depoimento de ${item.name}`}
          onClick={() => onSelect(index)}
          className="absolute inset-0 cursor-pointer rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
        />
      </div>
    </motion.li>
  )
}

function Cable({ index, progress, cardWidth, gap, width }) {
  const mid = STAGE / 2
  const center = width / 2
  const left = useTransform(progress, (value) => {
    const offset = index - value
    return center + place(offset, cardWidth, gap) - cardWidth * scaleOf(offset) * 0.34
  })
  const right = useTransform(progress, (value) => {
    const offset = index - value
    return center + place(offset, cardWidth, gap) + cardWidth * scaleOf(offset) * 0.34
  })
  const opacity = useTransform(progress, (value) => {
    const distance = Math.abs(index - value)
    if (distance >= 1.65) return 0
    if (distance <= 1) return 0.9
    return ((1.65 - distance) / 0.65) * 0.9
  })

  return (
    <motion.g style={{ opacity }}>
      <motion.line x1={center} y1={18} x2={left} y2={mid} />
      <motion.line x1={center} y1={18} x2={right} y2={mid} />
      <motion.line x1={center} y1={STAGE - 18} x2={left} y2={mid} />
      <motion.line x1={center} y1={STAGE - 18} x2={right} y2={mid} />
    </motion.g>
  )
}

function GapTicks({ index, progress, cardWidth, gap }) {
  const x = useTransform(progress, (value) => {
    const current = index - value
    const next = current + 1
    const rightEdge = place(current, cardWidth, gap) + (cardWidth * scaleOf(current)) / 2
    const leftEdge = place(next, cardWidth, gap) - (cardWidth * scaleOf(next)) / 2
    return (rightEdge + leftEdge) / 2
  })

  return (
    <motion.div
      aria-hidden
      className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5"
      style={{ x }}
    >
      {Array.from({ length: 5 }, (_, tick) => (
        <span
          key={tick}
          className={`block w-px rounded-full ${tick === 2 ? 'h-9 bg-[var(--color-navy)]/35' : 'h-4 bg-[var(--color-navy)]/15'}`}
        />
      ))}
    </motion.div>
  )
}

export default function TestimonialReel({ items }) {
  const reduce = useReducedMotion()
  const last = Math.max(0, items.length - 1)
  const start = items.length > 2 ? 1 : 0
  const stageRef = useRef(null)
  const [width, setWidth] = useState(0)
  const [active, setActive] = useState(start)
  const progress = useMotionValue(start)
  const glide = useRef(null)
  const gliding = useRef(false)
  const drag = useRef(null)
  const suppressClick = useRef(false)

  useLayoutEffect(() => {
    const node = stageRef.current
    if (!node) return
    const measure = () => setWidth(node.clientWidth)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const stageWidth = width || 800
  const cardWidth = Math.min(340, stageWidth * (stageWidth < 700 ? 0.74 : 0.38))
  const gap = clamp(cardWidth * 0.2, 36, 68)
  const travel = (cardWidth * (1 + SIDE)) / 2 + gap

  const drift = useTransform(progress, (value) => (start - value) * travel * 0.45)

  const stop = useCallback(() => {
    gliding.current = false
    glide.current?.stop()
    glide.current = null
  }, [])

  const glideTo = useCallback(
    (index, velocity = 0) => {
      const target = clamp(index, 0, last)
      stop()
      setActive(target)
      if (reduce) {
        progress.set(target)
        return
      }
      gliding.current = true
      glide.current = animate(progress, target, {
        ...SNAP,
        velocity,
        restDelta: 0.001,
        onComplete: () => {
          gliding.current = false
          glide.current = null
        },
      })
    },
    [last, progress, reduce, stop],
  )

  useMotionValueEvent(progress, 'change', (value) => {
    if (gliding.current) return
    const next = clamp(Math.round(value), 0, last)
    setActive((prev) => (prev === next ? prev : next))
  })

  useEffect(() => stop, [stop])

  useEffect(() => {
    const node = stageRef.current
    if (!node) return
    let timer = 0
    const onWheel = (event) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return
      event.preventDefault()
      stop()
      const raw = progress.get() + event.deltaX / travel
      progress.set(clamp(raw, -0.28, last + 0.28))
      window.clearTimeout(timer)
      timer = window.setTimeout(() => glideTo(Math.round(progress.get()), 0), 140)
    }
    node.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      node.removeEventListener('wheel', onWheel)
      window.clearTimeout(timer)
    }
  }, [glideTo, last, progress, stop, travel])

  const onPointerDown = (event) => {
    if (event.button !== 0) return
    stop()
    const now = performance.now()
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      origin: progress.get(),
      moved: false,
      lastX: event.clientX,
      lastT: now,
      prevX: event.clientX,
      prevT: now,
    }
  }

  const onPointerMove = (event) => {
    const current = drag.current
    if (!current || event.pointerId !== current.id) return
    const dx = event.clientX - current.x
    const dy = event.clientY - current.y
    if (!current.moved) {
      if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return
      if (Math.abs(dy) > Math.abs(dx)) {
        drag.current = null
        return
      }
      current.moved = true
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    const raw = current.origin - dx / travel
    progress.set(raw < 0 ? raw * 0.32 : raw > last ? last + (raw - last) * 0.32 : raw)
    current.prevX = current.lastX
    current.prevT = current.lastT
    current.lastX = event.clientX
    current.lastT = performance.now()
  }

  const onPointerUp = (event) => {
    const current = drag.current
    if (!current || event.pointerId !== current.id) return
    drag.current = null
    if (!current.moved) return
    suppressClick.current = true
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    const dt = current.lastT - current.prevT
    const pxPerMs = dt > 8 ? (current.lastX - current.prevX) / dt : 0
    const velocity = clamp((-pxPerMs * 1000) / travel, -4, 4)
    const projected = progress.get() + clamp(velocity * 0.28, -2, 2)
    glideTo(Math.round(projected), velocity)
  }

  const select = (index) => {
    if (suppressClick.current) {
      suppressClick.current = false
      return
    }
    glideTo(index)
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      glideTo(active + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      glideTo(active - 1)
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div
        ref={stageRef}
        role="group"
        aria-label="Depoimentos"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        className="relative w-full cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]"
        style={{ height: STAGE }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 font-display text-[9rem] leading-none text-[var(--color-navy)]/[0.05]"
          style={{ x: drift }}
        >
          “
        </motion.div>
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full stroke-[var(--color-navy)]/20"
          fill="none"
          strokeWidth="1"
        >
          {width > 0 &&
            items.map((item, index) => (
              <Cable key={item.name} index={index} progress={progress} cardWidth={cardWidth} gap={gap} width={width} />
            ))}
        </svg>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, transparent, color-mix(in srgb, var(--color-navy) 55%, transparent) 8%, color-mix(in srgb, var(--color-navy) 55%, transparent) 92%, transparent)',
          }}
        />
        {width > 0 &&
          items.slice(0, -1).map((item, index) => (
            <GapTicks key={item.name} index={index} progress={progress} cardWidth={cardWidth} gap={gap} />
          ))}
        <ul className="absolute inset-0">
          {width > 0 &&
            items.map((item, index) => (
              <QuoteCard
                key={item.name}
                item={item}
                index={index}
                progress={progress}
                cardWidth={cardWidth}
                gap={gap}
                active={index === active}
                onSelect={select}
              />
            ))}
        </ul>
      </div>
      <div className="mt-1 flex items-center justify-center gap-2">
        {items.map((item, index) => (
          <button
            key={item.name}
            type="button"
            aria-label={`Ver depoimento de ${item.name}`}
            aria-current={index === active ? 'true' : undefined}
            onClick={() => glideTo(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === active ? 'w-6 bg-[var(--color-primary)]' : 'w-1.5 bg-[var(--color-border)]'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
