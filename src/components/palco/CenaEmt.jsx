import { useEffect, useRef } from 'react'
import { criarCena } from './cena'

/** `progresso` é um MotionValue de 0 a 3. */
export default function CenaEmt({ progresso, aoProjetar, aoPronta, aoFalhar }) {
  const ref = useRef(null)

  useEffect(() => {
    // Canvas novo a cada montagem: depois do dispose o contexto do anterior não volta.
    const caixa = ref.current
    const canvas = document.createElement('canvas')
    canvas.className = 'absolute inset-0 h-full w-full'
    caixa.append(canvas)
    let cena
    try {
      cena = criarCena(canvas, { aoProjetar })
    } catch {
      canvas.remove()
      aoFalhar()
      return undefined
    }
    const ro = new ResizeObserver(() => cena.tamanho(caixa.clientWidth, caixa.clientHeight))
    ro.observe(caixa)
    cena.progresso(progresso.get())
    const parar = progresso.on('change', (v) => cena.progresso(v))
    aoPronta()
    return () => {
      parar()
      ro.disconnect()
      cena.destruir()
      canvas.remove()
    }
  }, [progresso, aoProjetar, aoPronta, aoFalhar])

  return <div ref={ref} className="absolute inset-0" aria-hidden />
}
