import * as THREE from 'three'

/**
 * Cena do hero: "EMT" em aço, cortado em três. `p` vai de 0 a 3:
 * 0 = bloco inteiro, 1 = ERP, 2 = CRM, 3 = SteelFlow.
 */

// Contornos da Plus Jakarta Sans 800 (altura da maiúscula = 1)
const LETRAS = {
  E: [0.6725, 0, 0, 0, 0, 1, 0.6725, 1, 0.6725, 0.8188, 0.2081, 0.8188, 0.2081, 0.5919, 0.6456, 0.5919, 0.6456, 0.4107, 0.2081, 0.4107, 0.2081, 0.1812, 0.6725, 0.1812],
  M: [0.2081, 0, 0, 0, 0, 1, 0.2013, 1, 0.5275, 0.5664, 0.8456, 1, 1.047, 1, 1.047, 0, 0.8389, 0, 0.8389, 0.6443, 0.5369, 0.255, 0.5101, 0.255, 0.2081, 0.6591],
  T: [0.4617, 0, 0.2537, 0, 0.2537, 0.8188, 0, 0.8188, 0, 1, 0.7114, 1, 0.7114, 0.8188, 0.4617, 0.8188],
}
const LARGURA = { E: 0.6725, M: 1.047, T: 0.7114 }
const ORDEM = ['E', 'M', 'T']
const PROF = 1.05

const TELAS = [
  ['/images/emt3d/tela-erp.webp', 1766 / 891],
  ['/images/emt3d/tela-crm.webp', 940 / 637],
  ['/images/emt3d/tela-steelflow.webp', 940 / 637],
]
const ALTURA_TELA = 1.48

// [x, z, rotação, escala] de cada letra em cada parada
const FRENTE = [-0.72, -0.2, 0.14, 1.78]
// o M é mais largo: um passo à direita para não entrar no texto
const FRENTE_M = [-0.4, -0.2, 0.14, 1.78]
const FUNDO_A = [1.7, -3, -0.05, 2.75]
const FUNDO_B = [4.5, -3.9, -0.12, 2.75]
const total = LARGURA.E + LARGURA.M + LARGURA.T + 0.07
const inteiro = (() => {
  let x = -total / 2
  return ORDEM.map((l) => {
    const c = x + LARGURA[l] / 2
    x += LARGURA[l] + 0.035
    return [c * 1.62, 0, 0, 1.62]
  })
})()
const PARADAS = [
  inteiro,
  [FRENTE, FUNDO_A, FUNDO_B],
  [FUNDO_B, FRENTE_M, FUNDO_A],
  [FUNDO_B, FUNDO_A, FRENTE],
]

const suave = (t, a = 0, b = 1) => THREE.MathUtils.smootherstep(t, a, b)
const mix = THREE.MathUtils.lerp

function aleatorio(s) {
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function riscos(w, h, n, base, desenha) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const g = c.getContext('2d')
  const R = aleatorio(7)
  g.fillStyle = base
  g.fillRect(0, 0, w, h)
  for (let i = 0; i < n; i++) desenha(g, R)
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.anisotropy = 8
  return t
}

function materiais() {
  const escovado = riscos(768, 768, 3000, '#c3c6ca', (g, R) => {
    g.strokeStyle = R() > 0.5 ? `rgba(255,255,255,${R() * 0.07})` : `rgba(0,0,0,${R() * 0.08})`
    g.lineWidth = 0.5 + R()
    const x = R() * 768
    const y = R() * 768
    g.beginPath()
    g.moveTo(x, y)
    g.lineTo(x + 100 + R() * 400, y)
    g.stroke()
  })
  escovado.repeat.set(0.8, 0.8)
  // estrias do corte na lateral da chapa
  const estrias = riscos(1024, 256, 900, '#808080', (g, R) => {
    const a = R() * 0.22
    g.strokeStyle = R() > 0.5 ? `rgba(255,255,255,${a})` : `rgba(0,0,0,${a})`
    g.lineWidth = 0.5 + R() * 1.6
    const x = R() * 1024
    g.beginPath()
    g.moveTo(x, 0)
    g.quadraticCurveTo(x + 2, 150, x + 8, 256)
    g.stroke()
  })
  estrias.repeat.set(0.35, 1)
  return [
    new THREE.MeshPhysicalMaterial({ color: 0xdfe3ea, roughnessMap: escovado, metalness: 1, roughness: 0.4, anisotropy: 0.3 }),
    new THREE.MeshStandardMaterial({ color: 0xc9ced8, metalness: 1, roughness: 0.42, bumpMap: estrias, bumpScale: 0.55 }),
  ]
}

function ambiente(gl) {
  const s = new THREE.Scene()
  s.background = new THREE.Color(0x2c438c)
  const luz = (w, h, x, y, z, i, cor = 0xffffff, giro = 0) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(cor).multiplyScalar(i), side: THREE.DoubleSide }),
    )
    m.position.set(x, y, z)
    m.lookAt(0, 0, 0)
    m.rotateZ(giro)
    s.add(m)
  }
  luz(11, 3, 0, 7, 1, 8)
  luz(4, 8, -9, 2, -1, 1.5)
  luz(14, 1.6, 0, 3.4, -9, 3)
  luz(9, 9, 4, 0, 9.4, 0.42)
  luz(1.5, 12, 1.5, 0, 9, 3.4, 0xffffff, 0.28)
  luz(0.5, 12, 3.3, 0, 8.8, 3.2, 0xffffff, 0.28)
  luz(1.9, 12, 5.2, 0, 8, 3.6, 0xffffff, 0.28)
  luz(0.7, 12, 7.6, 0, 6.6, 3, 0xffffff, 0.28)
  luz(30, 30, 0, -6, 0, 0.9, 0x3b66e0)
  luz(5, 9, 9, 1, -4, 0.05)
  const g = new THREE.PMREMGenerator(gl)
  const t = g.fromScene(s, 0.012).texture
  g.dispose()
  descartar(s)
  return t
}

function descartar(raiz) {
  raiz.traverse((o) => {
    o.geometry?.dispose()
    for (const m of [o.material].flat()) {
      if (!m) continue
      for (const v of Object.values(m)) if (v?.isTexture) v.dispose()
      m.dispose()
    }
  })
}

const AMOSTRAS = 40

export function criarCena(canvas, { aoProjetar }) {
  const gl = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' })
  gl.shadowMap.enabled = true
  gl.shadowMap.type = THREE.PCFSoftShadowMap
  gl.toneMapping = THREE.NeutralToneMapping
  gl.setClearColor(0, 0)

  const cena = new THREE.Scene()
  cena.environment = ambiente(gl)
  cena.fog = new THREE.Fog(0x16309c, 11, 60)
  const cam = new THREE.PerspectiveCamera(26, 1.6, 0.1, 60)

  const aco = materiais()
  const letras = ORDEM.map((l) => {
    const q = LETRAS[l]
    const s = new THREE.Shape()
    for (let i = 0; i < q.length; i += 2) s[i ? 'lineTo' : 'moveTo'](q[i], q[i + 1])
    const geo = new THREE.ExtrudeGeometry(s, { depth: PROF, bevelSize: 0.014, bevelThickness: 0.014, bevelOffset: -0.014, bevelSegments: 3 })
    geo.translate(-LARGURA[l] / 2, 0, -PROF / 2)
    const m = new THREE.Mesh(geo, aco)
    m.castShadow = m.receiveShadow = true
    cena.add(m)
    return m
  })

  // painel com a tela do produto
  const painel = new THREE.Group()
  const moldura = new THREE.Mesh(
    new THREE.BoxGeometry(1, ALTURA_TELA + 0.05, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x14181f, metalness: 0.6, roughness: 0.4 }),
  )
  moldura.castShadow = true
  const carregador = new THREE.TextureLoader()
  const telas = TELAS.map(([src]) => {
    const t = carregador.load(src, () => pedir())
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 8
    return t
  })
  const visor = new THREE.Mesh(
    new THREE.PlaneGeometry(1, ALTURA_TELA),
    new THREE.MeshBasicMaterial({ map: telas[0], color: new THREE.Color(0.93, 0.93, 0.93), fog: false }),
  )
  visor.position.z = 0.027
  const giro = new THREE.Group()
  giro.position.y = 0.96
  giro.add(moldura, visor)
  const metal = new THREE.MeshStandardMaterial({ color: 0xb4b9c2, metalness: 1, roughness: 0.35 })
  const haste = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.26, 24), metal)
  haste.position.set(0, 0.14, -0.06)
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.44, 0.04, 48), metal)
  base.position.set(0, 0.02, -0.06)
  base.castShadow = base.receiveShadow = true
  painel.add(giro, haste, base)
  cena.add(painel)

  const sombra = new THREE.ShadowMaterial({ color: 0x061047, opacity: 0.62, fog: false })
  const chao = new THREE.Mesh(new THREE.PlaneGeometry(60, 60).rotateX(-Math.PI / 2), sombra)
  chao.receiveShadow = true
  cena.add(chao)
  const fio = new THREE.Mesh(
    new THREE.PlaneGeometry(16, 0.018).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: 0x7ea2ff, toneMapped: false, transparent: true, fog: false }),
  )
  fio.position.set(6.5, 0.004, 1.75)
  cena.add(fio)

  const POS_LUZ = new THREE.Vector3(-4.5, 8, 4.6)
  const luz = new THREE.DirectionalLight(0xffffff, 1.5)
  luz.castShadow = true
  luz.shadow.mapSize.set(2048, 2048)
  Object.assign(luz.shadow.camera, { left: -6.5, right: 6.5, top: 6.5, bottom: -6.5, near: 0.1, far: 30 })
  luz.shadow.radius = 5
  luz.shadow.bias = -0.0004
  luz.shadow.normalBias = 0.012
  const contra = new THREE.DirectionalLight(0x9db8ff, 1.8)
  contra.position.set(6, 3.5, -5.5)
  cena.add(luz, luz.target, contra)

  // Tudo passa por aqui: em movimento é uma amostra; parado, a média de várias com a luz
  // espalhada numa área, que amacia a sombra. Depois de AMOSTRAS não renderiza mais nada.
  const um = new THREE.WebGLRenderTarget(1, 1, { samples: 4, type: THREE.HalfFloatType })
  const soma = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, depthBuffer: false })
  const tela = new THREE.Scene()
  const camTela = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  const vs = 'varying vec2 v;void main(){v=uv;gl_Position=vec4(position.xy,0.,1.);}'
  const somar = new THREE.ShaderMaterial({
    uniforms: { t: { value: um.texture } },
    vertexShader: vs,
    fragmentShader: 'varying vec2 v;uniform sampler2D t;void main(){gl_FragColor=min(texture2D(t,v),vec4(20.));}',
    blending: THREE.CustomBlending,
    blendSrc: THREE.OneFactor,
    blendDst: THREE.OneFactor,
    blendSrcAlpha: THREE.OneFactor,
    blendDstAlpha: THREE.OneFactor,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
  })
  const mostrar = new THREE.ShaderMaterial({
    uniforms: { t: { value: soma.texture }, n: { value: 1 } },
    vertexShader: vs,
    fragmentShader:
      'varying vec2 v;uniform sampler2D t;uniform float n;void main(){vec4 c=texture2D(t,v)*n;gl_FragColor=vec4(c.a>0.?c.rgb/c.a:vec3(0.),c.a);\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\ngl_FragColor.rgb*=gl_FragColor.a;}',
    blending: THREE.NoBlending,
    depthTest: false,
    depthWrite: false,
  })
  const quadro = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), somar)
  tela.add(quadro)

  let W = 0
  let H = 0
  let p = 0
  let n = 0
  let raf = 0

  const mira = new THREE.Vector3()
  function posicionar() {
    const i = Math.min(2, Math.floor(p))
    const f = p - i
    const corte = suave(p, 0.08, 0.9) // do bloco inteiro ao primeiro produto
    letras.forEach((m, k) => {
      const a = PARADAS[i][k]
      const b = PARADAS[i + 1][k]
      // quem sai da frente vai primeiro; quem chega espera, para não se atravessarem
      const t = i === 0 ? suave(f, 0.08 + (2 - k) * 0.05, 0.85) : a === FRENTE || a === FRENTE_M ? suave(f, 0.1, 0.62) : b === FRENTE || b === FRENTE_M ? suave(f, 0.38, 0.92) : suave(f, 0.2, 0.8)
      m.position.set(mix(a[0], b[0], t), 0, mix(a[1], b[1], t))
      m.rotation.y = mix(a[2], b[2], t)
      m.scale.setScalar(mix(a[3], b[3], t))
    })

    const troca = i === 0 ? 0 : suave(f, 0.25, 0.78)
    const idx = i === 0 ? 0 : troca < 0.5 ? i - 1 : i
    if (visor.material.map !== telas[idx]) visor.material.map = telas[idx]
    const larg = ALTURA_TELA * TELAS[idx][1]
    visor.scale.x = larg
    moldura.scale.x = larg + 0.05
    painel.position.set(2 + (1 - corte) * 7, 0, 1.2)
    painel.visible = corte > 0.02
    giro.rotation.y = -0.2 + Math.PI * (troca < 0.5 ? troca : troca - 1)

    cam.position.set(mix(-3.1, -1.4, corte), mix(1.2, 1.9, corte), mix(7.7, 11.6, corte))
    cam.lookAt(mira.set(mix(0.15, 1, corte), mix(0.62, 1.02, corte), mix(0, 0.4, corte)))
    const fov = mix(26, 25, corte)
    const meia = Math.tan((fov * Math.PI) / 360) * Math.max(1, 1.6 / (W / H))
    cam.fov = (Math.atan(meia) * 360) / Math.PI
    cam.aspect = W / H
    cam.setViewOffset(W, H, (mix(-64, -206, corte) / 1440) * W, (mix(46, -2, corte) / 900) * H, W, H)
    cam.updateMatrixWorld()

    cena.environmentIntensity = mix(1.28, 0.85, corte)
    cena.fog.far = mix(60, 21, corte)
    sombra.opacity = mix(0.62, 0.72, corte)
    fio.material.opacity = corte
    fio.visible = corte > 0.01

    aoProjetar?.(
      letras.map((m, k) => {
        const q = new THREE.Vector3((k === 1 ? 0.36 : 0) * LARGURA.M, 1, 0.12).applyMatrix4(m.matrixWorld.compose(m.position, m.quaternion, m.scale)).project(cam)
        return [((q.x + 1) / 2) * W, ((1 - q.y) / 2) * H]
      }),
    )
  }

  function passo() {
    raf = 0
    if (!W || !H) return
    if (n === 0) posicionar()
    const a = n * 2.39996
    const d = Math.sqrt((n + 0.5) / AMOSTRAS) * 2.5
    luz.position.set(POS_LUZ.x + Math.cos(a) * d, POS_LUZ.y, POS_LUZ.z + Math.sin(a) * d)
    gl.setRenderTarget(um)
    gl.clear()
    gl.render(cena, cam)
    gl.setRenderTarget(soma)
    if (n === 0) gl.clear()
    gl.autoClear = false
    quadro.material = somar
    gl.render(tela, camTela)
    gl.setRenderTarget(null)
    quadro.material = mostrar
    mostrar.uniforms.n.value = 1 / ++n
    gl.clear()
    gl.render(tela, camTela)
    gl.autoClear = true
    if (n < AMOSTRAS) raf = requestAnimationFrame(passo)
  }

  function pedir() {
    n = 0
    if (!raf) raf = requestAnimationFrame(passo)
  }

  return {
    progresso(v) {
      if (Math.abs(v - p) < 0.0004) return
      p = v
      pedir()
    },
    tamanho(w, h) {
      W = w
      H = h
      const dpr = Math.min(window.devicePixelRatio, 1.5)
      gl.setPixelRatio(dpr)
      gl.setSize(w, h, false)
      um.setSize(w * dpr, h * dpr)
      soma.setSize(w * dpr, h * dpr)
      pedir()
    },
    destruir() {
      cancelAnimationFrame(raf)
      raf = -1
      descartar(cena)
      telas.forEach((t) => t.dispose())
      cena.environment.dispose()
      um.dispose()
      soma.dispose()
      somar.dispose()
      mostrar.dispose()
      gl.dispose()
    },
  }
}
