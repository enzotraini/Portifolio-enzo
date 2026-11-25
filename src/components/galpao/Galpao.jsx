import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { empresas, produtos } from '../../data/produtos'
import { getWhatsAppUrl } from '../../utils/whatsapp'
import Botao from '../Botao'

const REDUZIR = '(prefers-reduced-motion: reduce)'
function useMidia(consulta) {
  return useSyncExternalStore(
    (avisar) => {
      const mq = window.matchMedia(consulta)
      mq.addEventListener('change', avisar)
      return () => mq.removeEventListener('change', avisar)
    },
    () => window.matchMedia(consulta).matches,
  )
}

let webgl
function temWebgl() {
  if (webgl === undefined) {
    const gl = document.createElement('canvas').getContext('webgl2')
    webgl = Boolean(gl)
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
  }
  return webgl
}

const limite = (v) => Math.min(1, Math.max(0, v))
// A câmera para no meio de cada trecho: o texto fica parado para ser lido.
const parar = (f) => { const t = limite((f - 0.2) / 0.6); return t * t * (3 - 2 * t) }

function Trecho({ id, lado = 'esq', altura = 'h-[190svh]', children, classe = '' }) {
  return (
    <section data-trecho className={`relative ${altura}`}>
      {id && <span id={id} className="ancora absolute top-0" aria-hidden />}
      <div className={`trecho trecho-${lado} sticky top-0 flex h-svh flex-col justify-end px-5 pb-[9svh] sm:px-8 lg:justify-center lg:px-14 lg:pb-0 ${classe}`}>{children}</div>
    </section>
  )
}

function Sistema({ produto, lado }) {
  return (
    <Trecho id={produto.id} lado={lado} classe={`trecho-${produto.id}`}>
      <div className={`w-full max-w-[29rem] ${lado === 'dir' ? 'lg:ml-auto' : ''}`}>
        <h2 className="titulo text-[clamp(2.75rem,5.4vw,5.5rem)]">{produto.nome}</h2>
        <p className="mt-5 text-lg leading-normal text-gelo lg:text-xl">{produto.texto}</p>
        <ul className="mt-6 hidden gap-2 text-gelo/85 min-[900px]:grid">
          {produto.itens.map((item) => <li key={item} className="border-t border-white/14 pt-2">{item}</li>)}
        </ul>
        <div className="mt-7 flex flex-wrap gap-2.5">
          {produto.pagina ? <Botao to={produto.pagina}>Conhecer o {produto.nome}</Botao> : <Botao href={produto.site}>Conhecer o {produto.nome}</Botao>}
          <Botao href={getWhatsAppUrl(produto.whatsapp)} tipo="suave">Agendar demonstração</Botao>
        </div>
      </div>
    </Trecho>
  )
}

export default function Galpao() {
  const raiz = useRef(null)
  const tela = useRef(null)
  const reduzir = useMidia(REDUZIR)
  const retrato = useMidia('(max-aspect-ratio: 1/1)')
  const [falhou, setFalhou] = useState(false)
  const [pronta, setPronta] = useState(false)
  const anima = !reduzir && !falhou && temWebgl()

  useEffect(() => {
    if (!anima) return
    const el = raiz.current
    const canvas = tela.current
    const trechos = [...el.querySelectorAll('[data-trecho]')]
    let cena
    let vivo = true
    let marcado = 0

    function rolar() {
      marcado = 0
      const h = window.innerHeight
      const topo = el.getBoundingClientRect().top + window.scrollY
      const y = window.scrollY - topo
      // y em que cada trecho fica preso no meio; o hero é o topo e o corredor vem no fim dele
      const meio = trechos.map((s) => s.offsetTop + s.offsetHeight / 2 - h / 2)
      const paradas = [0, h * 1.25, ...meio.slice(1)]
      let i = 0
      while (i < paradas.length - 2 && y > paradas[i + 1]) i++
      const f = limite((y - paradas[i]) / (paradas[i + 1] - paradas[i]))
      cena?.progresso(i + (i === 0 ? f : parar(f)))
      trechos.forEach((s, k) => {
        const d = (y - (k ? meio[k] : 0)) / h
        const o = limite(k === 0 ? 1 - d * 2.6 : k === trechos.length - 1 && d > 0 ? 1 : 2.1 - Math.abs(d) * 3.2)
        s.style.setProperty('--o', o)
        s.style.setProperty('--y', `${-d * 36}px`)
        s.style.pointerEvents = o > 0.4 ? '' : 'none'
      })
    }
    const aoRolar = () => { if (!marcado) marcado = requestAnimationFrame(rolar) }
    const aoMudar = () => { cena?.tamanho(canvas.clientWidth, canvas.clientHeight); rolar() }
    const aoMover = (e) => { if (e.pointerType === 'mouse') cena?.mouse((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1) }
    const olho = new IntersectionObserver(([e]) => cena?.ativo(e.isIntersecting))

    const leve = window.matchMedia('(pointer: coarse)').matches || (navigator.hardwareConcurrency || 8) <= 4
    import('./cena').then(({ criar }) => {
      if (!vivo) return
      cena = criar(canvas, { leve, retrato, aoPronta: () => setPronta(true) })
      aoMudar()
      olho.observe(el)
    }).catch(() => vivo && setFalhou(true))

    const perdeu = (e) => { e.preventDefault(); setFalhou(true) }
    canvas.addEventListener('webglcontextlost', perdeu)
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoMudar)
    window.addEventListener('pointermove', aoMover)
    rolar()
    return () => {
      vivo = false
      cancelAnimationFrame(marcado)
      olho.disconnect()
      canvas.removeEventListener('webglcontextlost', perdeu)
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoMudar)
      window.removeEventListener('pointermove', aoMover)
      trechos.forEach((s) => s.removeAttribute('style'))
      cena?.destruir()
    }
  }, [anima, retrato])

  return (
    <div ref={raiz} className={`relative ${anima ? 'galpao-vivo' : 'galpao-parado'}`}>
      {anima && (
        <div className="absolute inset-0" aria-hidden>
          <div className="galpao-fundo sticky top-0 h-svh overflow-hidden">
            <canvas key={String(retrato)} ref={tela} className={`block h-full w-full transition-opacity duration-1000 ${pronta ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        </div>
      )}

      <section id="hero" data-trecho className={`relative ${anima ? 'h-[225svh]' : ''}`}>
        <div className="trecho-hero sticky top-0 flex h-svh flex-col justify-end px-5 pb-[7svh] sm:px-8 lg:px-14">
          <div>
            <h1 className="titulo text-[clamp(2.9rem,8.8vw,9.5rem)]">
              Software que roda <br className="hidden sm:block" />a sua operação.
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-x-12 gap-y-6">
              <p className="max-w-[29rem] text-lg leading-normal text-gelo">EMT ERP, EMT CRM e SteelFlow: gestão, comercial e chão de fábrica ligados ao mesmo ERP.</p>
              <div className="flex flex-wrap gap-2.5">
                <Botao href={getWhatsAppUrl('Olá! Gostaria de conversar sobre um sistema para minha empresa.')}>Falar no WhatsApp</Botao>
                <Botao href="#erp" tipo="suave">Conhecer os sistemas</Botao>
              </div>
            </div>
          </div>
        </div>
      </section>

      {produtos.map((p, i) => <Sistema key={p.id} produto={p} lado={i % 2 ? 'dir' : 'esq'} />)}

      <Trecho lado="dir" altura="h-[160svh]" classe="trecho-corte">
        <div className="w-full max-w-[27rem] lg:ml-auto">
          <h2 className="titulo text-[clamp(2.75rem,5.4vw,5.5rem)]">O pedido vira corte.</h2>
          <p className="mt-5 text-lg leading-normal text-gelo lg:text-xl">A cotação nasce no ERP, o CRM acompanha até fechar, e o pedido vira corte no SteelFlow.</p>
        </div>
      </Trecho>

      <Trecho lado="baixo" altura="h-[150svh]" classe="trecho-portao">
        <div className="mx-auto max-w-5xl text-center lg:mt-auto lg:pb-[6svh]">
          <h2 className="titulo text-[clamp(2rem,3.6vw,3.6rem)]">Empresas com as quais trabalhamos</h2>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-7 gap-y-1.5 text-gelo sm:text-lg">
            {empresas.map((e) => <li key={e}>{e}</li>)}
          </ul>
        </div>
      </Trecho>
    </div>
  )
}
