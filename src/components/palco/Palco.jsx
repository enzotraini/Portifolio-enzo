import { Component, lazy, Suspense, useCallback, useRef, useState, useSyncExternalStore } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { produtos } from '../../data/produtos'
import { getWhatsAppUrl } from '../../utils/whatsapp'
import SteelFlowLink from '../SteelFlowLink'

const CenaEmt = lazy(() => import('./CenaEmt'))

const CONSULTA = '(min-width: 1024px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)'
let webgl
function temWebgl() {
  if (webgl === undefined) {
    const gl = document.createElement('canvas').getContext('webgl2')
    webgl = Boolean(gl)
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
  }
  return webgl
}
function usePode3d() {
  return useSyncExternalStore(
    (avisar) => {
      const mq = window.matchMedia(CONSULTA)
      mq.addEventListener('change', avisar)
      return () => mq.removeEventListener('change', avisar)
    },
    () => window.matchMedia(CONSULTA).matches && temWebgl(),
  )
}

/** Pacote 3D que não baixou não pode derrubar a home. */
class SemQuebrar extends Component {
  state = { falhou: false }

  static getDerivedStateFromError() {
    return { falhou: true }
  }

  componentDidCatch() {
    this.props.aoFalhar()
  }

  render() {
    return this.state.falhou ? null : this.props.children
  }
}

const pill = 'inline-flex min-h-[52px] items-center justify-center rounded-full px-7 text-base font-semibold transition-colors lg:max-xl:min-h-[46px] lg:max-xl:px-4 lg:max-xl:text-[0.95rem]'
const pillCheio = `${pill} bg-white text-[#1d4ed8] hover:bg-blue-50`
const pillVazado = `${pill} text-white ring-[1.5px] ring-inset ring-white hover:bg-white hover:text-[#1d4ed8]`

function Acessar({ produto, className }) {
  if (!produto.acesso) return <SteelFlowLink className={className}>Acessar</SteelFlowLink>
  return (
    <a href={produto.acesso} target="_blank" rel="noopener noreferrer" className={className}>
      Acessar
    </a>
  )
}

function Chamada({ className }) {
  return (
    <div className={className}>
      <h1 className="font-display text-[clamp(2.5rem,min(4.2vw,6.8svh),4.5rem)] font-semibold leading-[1.03] tracking-[-0.035em]">
        Software que roda
        <br />
        a sua operação.
      </h1>
      <p className="mt-4 max-w-[27rem] text-lg leading-snug text-blue-100 lg:text-xl">
        EMT ERP, EMT CRM e SteelFlow: gestão, comercial e chão de fábrica ligados ao mesmo ERP.
      </p>
    </div>
  )
}

function Botoes({ className, href }) {
  return (
    <div className={className}>
      <a
        href={getWhatsAppUrl('Olá! Gostaria de conversar sobre um sistema para minha empresa.')}
        target="_blank"
        rel="noopener noreferrer"
        className={pillCheio}
      >
        Falar no WhatsApp
      </a>
      <a href={href} className={pillVazado}>
        Conhecer os sistemas
      </a>
    </div>
  )
}

function TextoProduto({ produto, ativo }) {
  const detalhe = produto.pagina && (
    <Link to={produto.pagina} className="font-semibold text-blue-200 underline-offset-4 hover:text-white hover:underline">
      Conhecer o {produto.nome}
    </Link>
  )
  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center"
      initial={false}
      animate={{ opacity: ativo ? 1 : 0, y: ativo ? 0 : 16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ visibility: ativo ? 'visible' : 'hidden', transition: `visibility 0s ${ativo ? '0s' : '0.35s'}` }}
      aria-hidden={!ativo}
    >
      <p className="font-semibold text-blue-300">{produto.area}</p>
      <h2 className="mt-1 font-display text-[clamp(2.75rem,min(4.7vw,7.6svh),4.75rem)] font-semibold leading-none tracking-[-0.04em]">{produto.nome}</h2>
      <p className="mt-[clamp(0.6rem,2svh,1.25rem)] text-lg leading-normal text-blue-100 lg:max-xl:text-base">{produto.texto}</p>
      <ul className="mt-[clamp(1rem,3.5svh,2.5rem)] border-b border-white/20">
        {produto.itens.map((item) => (
          <li key={item} className="border-t border-white/20 py-[clamp(0.35rem,1.35svh,0.8rem)] text-lg lg:max-xl:text-base">
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-[clamp(1rem,3.5svh,2.25rem)] flex flex-wrap items-center gap-3">
        <a href={getWhatsAppUrl(produto.whatsapp)} target="_blank" rel="noopener noreferrer" className={pillCheio}>
          Agendar demonstração
        </a>
        <Acessar produto={produto} className={pillVazado} />
      </div>
      <p className="mt-4 min-h-6">{detalhe}</p>
    </motion.div>
  )
}

function Palco3d({ aoFalhar }) {
  const ref = useRef(null)
  const rotulos = useRef([])
  const [parada, setParada] = useState(0)
  const [pronta, setPronta] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const molaBruta = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })
  // Cada parada ganha um trecho de scroll parado antes de ir para a próxima.
  const progresso = useTransform(molaBruta, [0, 0.05, 0.27, 0.37, 0.58, 0.68, 0.89, 1], [0, 0, 1, 1, 2, 2, 3, 3])
  const noite = useTransform(progresso, [0.05, 0.8], [0, 1])
  const chamada = useTransform(progresso, [0, 0.05, 0.32], [1, 1, 0])
  const sobe = useTransform(progresso, [0, 0.35], [0, -24])
  const cliques = useTransform(progresso, (v) => (v < 0.2 ? 'auto' : 'none'))
  const visivel = useTransform(progresso, (v) => (v < 0.34 ? 'visible' : 'hidden'))
  const sumiu = useTransform(progresso, [0.5, 0.8], [0, 1])

  useMotionValueEvent(progresso, 'change', (v) => setParada(v < 0.6 ? 0 : Math.round(v)))

  const aoProjetar = useCallback((pontos) => {
    pontos.forEach(([x, y], i) => {
      const el = rotulos.current[i]
      if (el) el.style.transform = `translate(${x}px, ${y}px)`
    })
  }, [])
  const aoPronta = useCallback(() => setPronta(true), [])

  function irPara(i) {
    const el = ref.current
    const topo = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: topo + (el.offsetHeight - window.innerHeight) * [0.32, 0.63, 0.95][i], behavior: 'smooth' })
  }

  return (
    <section id="hero" ref={ref} className="relative h-[560svh] bg-[#1d4ed8] text-white">
      {/* âncora dos botões: para no primeiro produto */}
      <span id="sistemas" className="absolute top-[147svh]" aria-hidden />
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="emt-azul absolute inset-0" />
        <motion.div className="emt-noite absolute inset-0" style={{ opacity: noite }} />
        <div className={`absolute inset-0 transition-opacity duration-700 ${pronta ? 'opacity-100' : 'opacity-0'}`}>
          <SemQuebrar aoFalhar={aoFalhar}>
            <Suspense fallback={null}>
              <CenaEmt progresso={progresso} aoProjetar={aoProjetar} aoPronta={aoPronta} aoFalhar={aoFalhar} />
            </Suspense>
          </SemQuebrar>
        </div>

        <motion.div className="absolute inset-0" style={{ opacity: chamada, visibility: visivel }}>
          {produtos.map((p, i) => (
            <div key={p.id} ref={(el) => { rotulos.current[i] = el }} className={`absolute left-0 top-0 transition-opacity duration-500 ${pronta ? '' : 'opacity-0'}`}>
              <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-white" />
              <span className="absolute bottom-0 left-[-0.5px] h-[4.25rem] w-px bg-white/75" />
              <span className="absolute bottom-5 left-3 whitespace-nowrap">
                <span className="block font-display text-[1.05rem] font-semibold leading-tight tracking-tight">{p.nome}</span>
                <span className="block leading-tight text-blue-200">{p.area}</span>
              </span>
            </div>
          ))}
          <motion.div style={{ y: sobe, pointerEvents: cliques }} className="absolute inset-x-[clamp(1.25rem,3.9vw,6rem)] bottom-[clamp(2rem,7.5svh,5rem)] flex items-end justify-between gap-8">
            <Chamada />
            <Botoes href="#sistemas" className="mr-20 flex shrink-0 flex-wrap justify-end gap-3" />
          </motion.div>
        </motion.div>

        <div className="pointer-events-none absolute bottom-[8rem] left-[clamp(1.25rem,3.9vw,6rem)] top-24 w-[min(25rem,31vw)]">
          {produtos.map((p, i) => (
            <div key={p.id} className={parada === i + 1 ? 'pointer-events-auto' : 'pointer-events-none'}>
              <TextoProduto produto={p} ativo={parada === i + 1} />
            </div>
          ))}
        </div>

        <motion.div
          className="absolute bottom-8 left-[39%] right-[clamp(7.5rem,9vw,9rem)] grid grid-cols-3 gap-3.5"
          style={{ opacity: sumiu, visibility: useTransform(sumiu, (v) => (v > 0.02 ? 'visible' : 'hidden')) }}
        >
          {produtos.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => irPara(i)}
              aria-current={parada === i + 1 ? 'step' : undefined}
              className={`border-t-2 pt-3 text-left transition-colors ${parada === i + 1 ? 'border-white text-white' : 'border-white/20 text-blue-200/80 hover:text-white'}`}
            >
              <span className="block font-display text-[1.05rem] font-semibold tracking-tight">{p.nome}</span>
              <span className="text-[0.95rem]">{p.area}</span>
            </button>
          ))}
        </motion.div>
        <motion.p style={{ opacity: sumiu }} className="absolute bottom-8 left-[clamp(1.25rem,3.9vw,6rem)] text-sm text-blue-200/70">
          Telas com dados de exemplo
        </motion.p>
      </div>
    </section>
  )
}

function PalcoPlano() {
  return (
    <>
      <section id="hero" className="emt-azul relative overflow-hidden px-5 pb-12 pt-24 text-white sm:px-8 lg:px-14">
        <img
          src="/images/emt3d/emt.webp"
          alt="EMT em aço, com três letras: EMT ERP, EMT CRM e SteelFlow"
          width={1800}
          height={750}
          fetchPriority="high"
          className="mx-auto w-[108%] max-w-none -translate-x-[4%] sm:w-full sm:translate-x-0 lg:max-w-5xl"
        />
        <Chamada className="mt-6" />
        <Botoes href="#sistemas" className="mt-7 flex flex-col gap-3 sm:flex-row" />
      </section>
      <section id="sistemas" className="emt-noite px-5 py-16 text-white sm:px-8 lg:px-14">
        <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
          Três sistemas.
          <br />
          <span className="text-blue-300">Uma linha só.</span>
        </h2>
        <div className="mt-10 grid gap-14 lg:grid-cols-3 lg:gap-10">
          {produtos.map((p) => (
            <article key={p.id} className="flex flex-col">
              <img src={p.torre} alt={`Tela do ${p.nome}`} width={720} height={720} loading="lazy" className="w-full max-w-md rounded-3xl bg-[#f1f5f9]" />
              <p className="mt-6 font-semibold text-blue-300">{p.area}</p>
              <h3 className="font-display text-3xl font-semibold tracking-tight">{p.nome}</h3>
              <p className="mt-3 text-lg leading-normal text-blue-100">{p.texto}</p>
              <div className="mt-6 flex flex-wrap gap-3 lg:mt-auto lg:pt-6">
                <a href={getWhatsAppUrl(p.whatsapp)} target="_blank" rel="noopener noreferrer" className={pillCheio}>
                  Agendar demonstração
                </a>
                <Acessar produto={p} className={pillVazado} />
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 text-sm text-blue-200/70">Telas com dados de exemplo</p>
      </section>
    </>
  )
}

function TresSistemas() {
  return (
    <section className="overflow-hidden bg-[radial-gradient(90%_80%_at_50%_48%,#fff_0,#f1f5f9_55%,#e2e8f0_100%)] px-[clamp(1.25rem,3.9vw,6rem)] pb-16 pt-28">
      <div className="flex items-start justify-between gap-10">
        <h2 className="font-display text-[clamp(2.5rem,4.2vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--color-navy)]">
          Três sistemas.
          <br />
          <span className="text-[var(--color-primary)]">Uma linha só.</span>
        </h2>
        <p className="mt-3 max-w-sm text-xl leading-normal text-slate-600">
          A cotação nasce no ERP, o CRM acompanha até fechar, e o pedido vira corte no SteelFlow.
        </p>
      </div>
      <motion.div
        className="relative mx-auto mt-2 grid max-w-[1500px] grid-cols-3"
        initial="antes"
        whileInView="depois"
        viewport={{ once: true, margin: '-15% 0px' }}
      >
        {produtos.map((p, i) => (
          <motion.div
            key={p.id}
            className="text-center"
            variants={{ antes: { opacity: 0, y: 40 }, depois: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={p.torre} alt={`Tela do ${p.nome} sobre a letra ${'EMT'[i]} em aço`} width={720} height={720} loading="lazy" className="w-full [mask-image:linear-gradient(90deg,transparent,#000_9%,#000_91%,transparent)]" />
            <span className="relative -mt-1.5 block h-3" aria-hidden>
              <motion.span
                className={`absolute top-1/2 h-0.5 origin-left -translate-y-1/2 bg-[var(--color-primary)] ${i === 0 ? '-left-[50vw]' : 'left-0'} ${i === 2 ? '-right-[50vw]' : 'right-0'}`}
                variants={{ antes: { scaleX: 0 }, depois: { scaleX: 1 } }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.4, ease: 'linear' }}
              />
              <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--color-primary)]" />
            </span>
            <h3 className="mt-5 font-display text-[1.6rem] font-semibold tracking-tight text-[var(--color-navy)]">{p.nome}</h3>
            <p className="text-lg text-slate-600">{p.resumo}</p>
          </motion.div>
        ))}
      </motion.div>
      <p className="mt-8 pr-20 text-right text-sm text-slate-500">Telas com dados de exemplo</p>
    </section>
  )
}

export default function Palco() {
  const pode3d = usePode3d()
  const [falhou, setFalhou] = useState(false)
  const aoFalhar = useCallback(() => setFalhou(true), [])

  if (!pode3d || falhou) return <PalcoPlano />
  return (
    <>
      <Palco3d aoFalhar={aoFalhar} />
      <TresSistemas />
    </>
  )
}
