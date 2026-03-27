import { useState, useEffect } from 'react'

/** Índice que avança a cada `intervalMs` ms; pausa se `paused` ou `length < 2`. */
export function useRotatingIndex(length, intervalMs, paused) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (paused || length < 2) return undefined
    const id = window.setInterval(() => {
      setIndex((n) => (n + 1) % length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [length, intervalMs, paused])

  return [index, setIndex]
}
