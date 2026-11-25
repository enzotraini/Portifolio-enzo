/**
 * A home da EMT: um galpão de aço que se atravessa rolando a página.
 * `progresso` vai de 0 a 6: 0 = metal líquido do hero, 1 = corredor, 2 a 4 = os três
 * sistemas, 5 = a serra, 6 = o portão.
 */
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { Reflector } from 'three/examples/jsm/objects/Reflector.js'

let semente = 11
const R = () => (semente = (semente * 16807) % 2147483647) / 2147483647
const CORREDOR = 3.9, FIM = -100, NEVOA = 0x071122
const QUENTE = 0xffb682, FRIO = 0x9dbcff

const cv = (w, h, f) => { const c = document.createElement('canvas'); c.width = w; c.height = h; f(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t }
const brilho = cv(256, 256, (g) => { const r = g.createRadialGradient(128, 128, 0, 128, 128, 128); r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(.25, 'rgba(255,255,255,.45)'); r.addColorStop(.6, 'rgba(255,255,255,.1)'); r.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = r; g.fillRect(0, 0, 256, 256) })
const feixe = cv(128, 256, (g, w, h) => { for (let x = 0; x < w; x++) { const a = Math.pow(Math.sin(Math.PI * x / w), 2); const l = g.createLinearGradient(0, 0, 0, h); l.addColorStop(0, `rgba(255,255,255,${a})`); l.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = l; g.fillRect(x, 0, 1, h) } })
const pessoa = cv(256, 640, (g) => { g.fillStyle = '#02040a'; const e = (x, y, a, b) => { g.beginPath(); g.ellipse(x, y, a, b, 0, 0, 7); g.fill() }
  e(128, 62, 34, 40); g.beginPath(); g.ellipse(128, 48, 44, 34, 0, Math.PI, 0); g.fill(); g.fillRect(76, 44, 104, 9); g.fillRect(114, 92, 28, 30)
  g.beginPath(); g.moveTo(70, 128); g.quadraticCurveTo(128, 102, 186, 128); g.lineTo(196, 190); g.lineTo(176, 380); g.lineTo(80, 380); g.lineTo(60, 190); g.fill()
  g.lineCap = 'round'; g.lineWidth = 30; g.strokeStyle = '#02040a'; g.beginPath(); g.moveTo(70, 150); g.lineTo(50, 262); g.lineTo(84, 330); g.stroke(); g.beginPath(); g.moveTo(186, 150); g.lineTo(208, 260); g.lineTo(206, 356); g.stroke()
  g.lineWidth = 44; g.beginPath(); g.moveTo(104, 370); g.lineTo(96, 610); g.stroke(); g.beginPath(); g.moveTo(152, 370); g.lineTo(166, 610); g.stroke() })

function ambiente(gl) {
  const c = new THREE.Scene(); c.background = new THREE.Color(0x050a14)
  const p = (w, h, x, y, z, i, cor) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(cor).multiplyScalar(i), side: 2 })); m.position.set(x, y, z); m.lookAt(0, 0, 0); c.add(m) }
  for (let k = -2; k < 3; k++) p(5, 1, 0, 7, k * 4, 2.4, FRIO)
  p(6, 5, 0, .5, -10, 2.6, QUENTE)   // portão
  p(8, 4, 0, 1, 10, .5, 0x4a6aa8)
  const g = new THREE.PMREMGenerator(gl); const t = g.fromScene(c, .04).texture; g.dispose(); return t
}

// face serrada da barra: riscos do corte e borda escura
const ponta = cv(128, 128, (g) => {
  g.fillStyle = '#b4bac4'; g.fillRect(0, 0, 128, 128)
  for (let i = 0; i < 150; i++) { g.fillStyle = R() > 0.5 ? `rgba(255,255,255,${R() * 0.16})` : `rgba(10,16,28,${R() * 0.22})`; g.fillRect(0, R() * 128, 128, 0.6 + R() * 1.6) }
  const b = g.createRadialGradient(64, 64, 44, 64, 64, 64); b.addColorStop(0, 'rgba(8,12,22,0)'); b.addColorStop(1, 'rgba(8,12,22,.85)'); g.fillStyle = b; g.fillRect(0, 0, 128, 128)
})

function barras(leve) {
  const geo = new THREE.CylinderGeometry(1, 1, 2.6, leve ? 9 : 14); geo.rotateZ(Math.PI / 2)
  const pos = [], raios = leve ? [.11, .15, .19] : [.08, .1, .13, .16], cor = new THREE.Color(), cores = []
  const pintas = [0x2f6bff, 0xd9a441, 0xb5483a, 0x2f8f74]
  for (const lado of [-1, 1]) for (let z = 10; z > FIM; z -= 3.2) for (let n = 0; n < 5; n++) {
    if (R() < .06) continue
    const r = raios[Math.floor(R() * raios.length)], cols = Math.floor(2.75 / (r * 2)), linhas = Math.max(1, Math.floor((.55 + R() * .4) * .98 / (r * 1.74)))
    const tinta = R() < .1 ? pintas[Math.floor(R() * 4)] : 0, tom = .26 + R() * .34
    for (let j = 0; j < linhas; j++) for (let i = 0; i < cols - (j % 2); i++) {
      if (j === linhas - 1 && R() < .3) continue
      pos.push([lado * (CORREDOR + 1.42 + R() * .05), .26 + n * 1.22 + r + j * r * 1.74, z - .22 - r - i * r * 2 - (j % 2) * r, r])
      const v = tom * (.85 + R() * .25); tinta ? cor.setHex(tinta).multiplyScalar(.45) : cor.setRGB(v * .86, v * .95, v * 1.12); cores.push(cor.r, cor.g, cor.b)
    }
  }
  const lado = new THREE.MeshStandardMaterial({ metalness: 1, roughness: .42 }), corte = new THREE.MeshStandardMaterial({ metalness: 1, roughness: .4, map: ponta })
  const m = new THREE.InstancedMesh(geo, [lado, corte, corte], pos.length)
  const o = new THREE.Object3D(); pos.forEach((q, i) => { o.position.set(q[0], q[1], q[2]); o.scale.set(1, q[3], q[3]); o.updateMatrix(); m.setMatrixAt(i, o.matrix) })
  m.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(cores), 3); m.frustumCulled = false; return m
}

function caixas(lista, mat) {
  const m = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), mat, lista.length), o = new THREE.Object3D()
  lista.forEach((b, i) => { o.position.set(b[0], b[1], b[2]); o.scale.set(b[3], b[4], b[5]); o.rotation.z = b[6] || 0; o.updateMatrix(); m.setMatrixAt(i, o.matrix) }); m.frustumCulled = false; return m
}

const PISO = {
  uniforms: { color: { value: null }, tDiffuse: { value: null }, textureMatrix: { value: null }, nevoa: { value: new THREE.Color(NEVOA) }, base: { value: new THREE.Color(0x070b13) } },
  vertexShader: `uniform mat4 textureMatrix;varying vec4 vUv;varying vec3 vW;void main(){vUv=textureMatrix*vec4(position,1.);vW=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
  fragmentShader: `uniform sampler2D tDiffuse;uniform vec3 nevoa,base;varying vec4 vUv;varying vec3 vW;
  float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+1.),f.x),f.y);}
  void main(){vec2 uv=vUv.xy/vUv.w;float d=length(cameraPosition-vW);
    float m=n(vW.xz*.55)*.6+n(vW.xz*2.3)*.3+n(vW.xz*9.)*.1;float bl=mix(.002,.012,m);
    vec3 c=vec3(0.);for(int i=-4;i<=4;i++){float f=float(i);c+=texture2D(tDiffuse,uv+vec2((h(vW.xz+f)-.5)*bl*.7,f*bl*.8)).rgb;}c/=9.;
    vec3 V=normalize(cameraPosition-vW);float fr=.16+.8*pow(1.-max(V.y,0.),4.);
    float junta=smoothstep(.02,.0,abs(fract(vW.z/6.4)-.5)*6.4-.0)*.5;
    vec3 col=base*(.7+.6*m)*(1.-junta)+min(c,vec3(6.))*fr*mix(1.,.45,m);
    float fg=1.-exp(-pow(d*.017,2.));gl_FragColor=vec4(mix(col,nevoa,fg*.8),1.);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }`,
}

const METAL = {
  vertexShader: 'varying vec2 v;void main(){v=uv;gl_Position=vec4(position.xy,0.,1.);}',
  fragmentShader: `varying vec2 v;uniform float t,q,z,razao;uniform vec2 m;uniform sampler2D tDiffuse;
  float altura(vec2 p){float a=t*.11;for(int i=1;i<6;i++){float f=float(i);p+=.62/f*sin(f*1.35*p.yx+vec2(a*1.3+f,a+f*1.7))+vec2(.12,.07);}return sin(p.x*1.1+p.y*.9)*.5+.5;}
  float h1(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  void main(){
    vec3 cena=texture2D(tDiffuse,v).rgb;
    if(q<=.001){gl_FragColor=vec4(cena,1.);return;}
    vec2 c=(v-.5)*vec2(razao,1.);float queda=1.-q;
    vec2 p=c*(1.75-z*1.15)+m*.06+vec2(.3,-.2);
    float e=.01,h=altura(p),hx=altura(p+vec2(e,0.)),hy=altura(p+vec2(0.,e));
    vec3 n=normalize(vec3((h-hx)/e*.8,(h-hy)/e*.8,1.));
    float frio=pow(max(dot(n,normalize(vec3(-.7,.65,.5))),0.),5.),fio=pow(max(dot(n,normalize(vec3(-.35,.8,.55))),0.),42.);
    float quente=pow(max(dot(n,normalize(vec3(.85,-.35,.42))),0.),7.),brasa=pow(max(dot(n,normalize(vec3(.75,-.1,.6))),0.),36.);
    vec3 col=mix(vec3(.006,.010,.020),vec3(.018,.042,.10),h);
    col+=vec3(.06,.19,.62)*frio*1.15+vec3(.70,.84,1.)*fio*.95+vec3(.85,.30,.08)*quente*.5+vec3(1.,.70,.42)*brasa*.8;
    // o canto do título fica mais calmo que o resto
    col*=mix(mix(.34,1.,smoothstep(-.75,.35,c.x*.7+c.y*.9+.15)),1.,z);
    col+=(h1(v*911.+fract(t))-.5)*.016;
    // a abertura: o metal se parte do centro para fora e a fábrica aparece por dentro
    float r=length(c)/length(vec2(razao,1.)*.5);float lim=queda*1.9-.42;float borda=r+(h-.5)*.8;
    float cobre=smoothstep(lim-.012,lim+.012,borda);float aro=(smoothstep(.10,0.,borda-lim)*.5+smoothstep(.022,0.,abs(borda-lim))*1.6)*step(.002,queda);
    col+=vec3(1.,.52,.2)*aro;
    gl_FragColor=vec4(mix(cena,col,cobre),1.);
  }`,
}

export function criar(canvas, { leve = false, retrato = false, aoPronta } = {}) {
  semente = 11
  const gl = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' })
  gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1
  const cena = new THREE.Scene(); cena.background = new THREE.Color(NEVOA).multiplyScalar(.5); cena.fog = new THREE.FogExp2(NEVOA, .017); cena.environment = ambiente(gl); cena.environmentIntensity = 1.15
  const cam = new THREE.PerspectiveCamera(38, 1.6, .1, 180)

  cena.add(barras(leve))
  const ferro = new THREE.MeshStandardMaterial({ color: 0x1b2a45, metalness: .5, roughness: .55 }), escuro = new THREE.MeshStandardMaterial({ color: 0x0b1220, metalness: .4, roughness: .7 })
  const est = [], teto = []
  for (const l of [-1, 1]) {
    for (let z = 10; z > FIM - 3; z -= 3.2) { est.push([l * (CORREDOR + .22), 3.2, z, .16, 6.4, .2]); est.push([l * (CORREDOR + 2.6), 3.2, z, .16, 6.4, .2]) }
    for (let n = 0; n < 6; n++) est.push([l * (CORREDOR + .22), .16 + n * 1.22, -45, .12, .16, 112])
    teto.push([l * (CORREDOR + 4), 5, -45, .3, 10, 120]); teto.push([l * 3, 8.6, -45, .2, .3, 120])
  }
  for (let z = 8; z > FIM; z -= 6.4) { teto.push([0, 8.9, z, 17, .34, .26]); teto.push([-4.2, 8.35, z, 8.6, .14, .14, .13]); teto.push([4.2, 8.35, z, 8.6, .14, .14, -.13]) }
  teto.push([0, 9.5, -45, 18, .1, 120]); teto.push([-7.4, 5, FIM, 6.4, 10, .5]); teto.push([7.4, 5, FIM, 6.4, 10, .5]); teto.push([0, 8.4, FIM, 9, 3.4, .5])
  cena.add(caixas(est, ferro), caixas(teto, escuro))

  // claraboias e feixes
  const feixes = []
  for (let z = 2; z > FIM; z -= 12.8) {
    const c = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 5), new THREE.MeshBasicMaterial({ color: new THREE.Color(FRIO).multiplyScalar(1.9), fog: true })); c.rotation.x = Math.PI / 2; c.position.set(0, 9.4, z - 3.2); cena.add(c)
    for (let k = 0; k < 4; k++) { const f = new THREE.Mesh(new THREE.PlaneGeometry(7, 10), new THREE.MeshBasicMaterial({ map: feixe, color: FRIO, transparent: true, opacity: .03, blending: THREE.AdditiveBlending, depthWrite: false, fog: false, side: 2 })); f.position.set((k - 1.5) * .5, 4.4, z - 2 - k * .9); f.rotation.z = .1; feixes.push(f); cena.add(f) }
  }
  for (let z = -6; z > FIM; z -= 19) { const p = new THREE.PointLight(FRIO, 75, 22, 1.8); p.position.set(0, 7.2, z); cena.add(p) }

  // portão ao amanhecer
  const porta = new THREE.Mesh(new THREE.PlaneGeometry(8.4, 6.7), new THREE.MeshBasicMaterial({ color: new THREE.Color(QUENTE).multiplyScalar(1.7), fog: false })); porta.position.set(0, 3.35, FIM + .2); cena.add(porta)
  const halo = (esc, op, z = FIM + 3, cor = QUENTE) => { const h = new THREE.Sprite(new THREE.SpriteMaterial({ map: brilho, color: cor, transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false, fog: false })); h.scale.setScalar(esc); h.position.set(0, 3.4, z); cena.add(h); return h }
  const halos = [halo(60, .34), halo(26, .5)]
  const luzPorta = new THREE.DirectionalLight(QUENTE, .7); luzPorta.position.set(0, 3, -60); cena.add(luzPorta)
  const gente = (x, z, h) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(h * .4, h), new THREE.MeshBasicMaterial({ map: pessoa, transparent: true, fog: false, alphaTest: .4 })); m.position.set(x, h / 2, z); cena.add(m) }
  gente(1.5, -91, 1.82); gente(-.2, -95, 1.75)

  // a linha do pedido, no chão
  const tempo = { value: 0 }
  const linha = new THREE.Mesh(new THREE.PlaneGeometry(.07, 120).rotateX(-Math.PI / 2), new THREE.ShaderMaterial({
    uniforms: { t: tempo }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: 'varying vec3 w;void main(){w=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*viewMatrix*vec4(w,1.);}',
    fragmentShader: 'uniform float t;varying vec3 w;void main(){float d=fract((w.z+t*9.)/26.);float p=pow(d,9.);float f=exp(-pow(length(cameraPosition-w)*.014,2.));gl_FragColor=vec4(vec3(.10,.30,1.)*(.28+p*3.2)*f,1.);}' }))
  linha.position.set(0, .012, -48); cena.add(linha)

  // as três telas
  const TL = new THREE.TextureLoader()
  ;[[2.15, -17.5, -.42], [-2.15, -33.5, .42], [2.15, -49.5, -.42]].forEach(([x, z, ry], i) => {
    const t = TL.load(`/images/sistemas/tela-${['erp', 'crm', 'steelflow'][i]}.webp`); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8
    const g = new THREE.Group(), w = 2.1, h = 2.275
    const v = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: t, color: new THREE.Color(1.25, 1.25, 1.3), fog: false })); v.position.z = .03
    const b = new THREE.Mesh(new THREE.BoxGeometry(w + .06, h + .06, .05), new THREE.MeshStandardMaterial({ color: 0x0c131f, metalness: .9, roughness: .3 }))
    const pe = new THREE.Mesh(new THREE.BoxGeometry(.09, .8, .05), ferro); pe.position.y = -h / 2 - .4
    const base = new THREE.Mesh(new THREE.BoxGeometry(.9, .03, .5), ferro); base.position.y = -h / 2 - .78
    const l = new THREE.PointLight(0x6f9dff, 5, 6, 1.8); l.position.set(0, 0, 1.2)
    g.add(b, v, pe, base, l); g.position.set(x, 1.95, z); g.rotation.y = ry; cena.add(g)
  })

  // serra
  const lamina = cv(512, 512, (g) => {
    g.fillStyle = '#8d95a3'; g.fillRect(0, 0, 512, 512); g.translate(256, 256)
    for (let i = 0; i < 420; i++) { g.strokeStyle = R() > 0.5 ? `rgba(255,255,255,${R() * 0.1})` : `rgba(0,0,0,${R() * 0.16})`; g.lineWidth = 0.5 + R(); g.beginPath(); g.arc(0, 0, R() * 256, R() * 7, R() * 7 + 1.6); g.stroke() }
    for (let i = 0; i < 90; i++) { g.rotate(Math.PI / 45); g.fillStyle = '#12161d'; g.beginPath(); g.moveTo(256, -5); g.lineTo(240, 0); g.lineTo(256, 5); g.fill() }
    g.fillStyle = '#20262f'; g.beginPath(); g.arc(0, 0, 58, 0, 7); g.fill()
  })
  const serra = new THREE.Group(); serra.position.set(0, 0, -70)
  const aco = new THREE.MeshStandardMaterial({ color: 0x8f99a8, metalness: 1, roughness: .4 })
  const cil = (r, L, x, y, z, m = aco) => { const c = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, 64).rotateZ(Math.PI / 2), m); c.position.set(x, y, z); serra.add(c); return c }
  cil(.36, 3, -1.75, 1.15, 0); cil(.36, .5, .3, 1.15, 0)
  for (const x of [-2.9, -1.9, -.9, .35]) { cil(.1, .9, x, .72, 0, escuro).rotation.y = Math.PI / 2; const c = new THREE.Mesh(new THREE.BoxGeometry(.14, .7, 1), ferro); c.position.set(x, .35, 0); serra.add(c) }
  const disco = new THREE.Mesh(new THREE.CylinderGeometry(.95, .95, .03, 96).rotateZ(Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x7c8696, metalness: 1, roughness: .46, map: lamina })); disco.position.set(-.06, 1.9, -.1); serra.add(disco)
  const corpo = new THREE.Mesh(new THREE.BoxGeometry(.5, .5, 1.2), ferro); corpo.position.set(.45, 2.25, -.5); serra.add(corpo)
  const fogo = new THREE.PointLight(0xff8a3c, 30, 12, 1.7); fogo.position.set(-.05, 1.4, .5); serra.add(fogo)
  const N = 900, pS = new Float32Array(N * 6), vS = [], cS = new Float32Array(N * 6)
  const nasce = (i, frio) => { vS[i] = { x: -.05, y: 1.36, z: .25, vx: (Math.random() - .5) * 1.4, vy: 1 + Math.random() * 3.2, vz: 1.5 + Math.random() * 5, v: frio ? Math.random() * 1.6 : 0, m: .6 + Math.random() } }
  for (let i = 0; i < N; i++) nasce(i, true)
  const gS = new THREE.BufferGeometry(); gS.setAttribute('position', new THREE.BufferAttribute(pS, 3)); gS.setAttribute('color', new THREE.BufferAttribute(cS, 3))
  const faisca = new THREE.LineSegments(gS, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false, toneMapped: false })); faisca.frustumCulled = false; serra.add(faisca); cena.add(serra)

  // poeira
  const gp = new THREE.BufferGeometry(), pp = new Float32Array(2400); for (let i = 0; i < 800; i++) { pp[i * 3] = (R() - .5) * 8; pp[i * 3 + 1] = R() * 6; pp[i * 3 + 2] = -R() * 92 + 6 } gp.setAttribute('position', new THREE.BufferAttribute(pp, 3))
  const poeira = new THREE.Points(gp, new THREE.PointsMaterial({ map: brilho, color: 0xcfe0ff, size: .035, transparent: true, opacity: .55, blending: THREE.AdditiveBlending, depthWrite: false })); cena.add(poeira)

  // sem reflexo em aparelho fraco: ele desenha a cena duas vezes
  const piso = leve
    ? new THREE.Mesh(new THREE.PlaneGeometry(30, 130), new THREE.MeshStandardMaterial({ color: 0x0b1119, metalness: .6, roughness: .34 }))
    : new Reflector(new THREE.PlaneGeometry(30, 130), { textureWidth: 960, textureHeight: 600, shader: PISO, clipBias: .002 }); piso.rotation.x = -Math.PI / 2; piso.position.set(0, 0, -45); cena.add(piso)

  const comp = new EffectComposer(gl, new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType, samples: leve ? 0 : 4 }))
  comp.addPass(new RenderPass(cena, cam))
  comp.addPass(new UnrealBloomPass(new THREE.Vector2(4, 4), .38, .75, 1))
  comp.addPass(new OutputPass())
  const metal = new ShaderPass({ uniforms: { tDiffuse: { value: null }, t: { value: 0 }, q: { value: 1 }, z: { value: 0 }, razao: { value: 1.6 }, m: { value: new THREE.Vector2() } }, ...METAL })
  comp.addPass(metal)
  const grao = new ShaderPass({ uniforms: { tDiffuse: { value: null }, t: { value: 0 } }, vertexShader: METAL.vertexShader, fragmentShader: 'uniform sampler2D tDiffuse;uniform float t;varying vec2 v;float h(vec2 p){return fract(sin(dot(p,vec2(12.9,78.2)))*43758.5);}void main(){vec4 c=texture2D(tDiffuse,v);vec2 q=v-.5;c.rgb*=1.-dot(q,q)*.75;c.rgb+=(h(v*900.+fract(t))-.5)*.022;gl_FragColor=c;}' })
  comp.addPass(grao)

  // paradas da câmera: [x, y, z, mira x, y, z]. Em retrato a tela fica em cima e o texto embaixo.
  const K = retrato
    ? [[0, 34, 9, 0, 0, 4], [0, 1.7, 6, 0, 2, -40], [1.35, 1.6, -10.8, 2.0, 1.0, -17.5], [-1.35, 1.6, -26.8, -2.0, 1.0, -33.5], [1.35, 1.6, -42.8, 2.0, 1.0, -49.5], [1.2, 1.5, -63.2, -.2, .75, -70], [0, 1.7, -77, 0, 1.9, -100]]
    : [[0, 34, 9, 0, 0, 4], [0, 1.55, 6, 0, 2.6, -40], [-.9, 1.75, -12.6, .75, 1.85, -18], [.9, 1.75, -28.6, -.75, 1.85, -34], [-.9, 1.75, -44.6, .75, 1.85, -50], [1.7, 1.5, -64.6, .15, 1.45, -70], [0, 1.7, -79, 0, 2.9, -100]]
  const curva = (o) => new THREE.CatmullRomCurve3(K.map((k) => new THREE.Vector3(k[o], k[o + 1], k[o + 2])), false, 'catmullrom', .25)
  const cx = curva(0), cl = curva(3), V = new THREE.Vector3(), L = new THREE.Vector3()
  const FIM_K = K.length - 1
  let p = 0, alvo = 0, mx = 0, my = 0, ax = 0, ay = 0, ult = performance.now(), raf = 0, ativo = true, vivo = true
  let W = 1, H = 1, dpr = Math.min(window.devicePixelRatio, leve ? 1 : 1.5), lentos = 0, primeiro = true

  function quadro(agora) {
    raf = 0
    if (!vivo || !ativo) return
    raf = requestAnimationFrame(quadro)
    const bruto = (agora - ult) / 1000, dt = Math.min(.05, bruto); ult = agora; tempo.value += dt
    // aparelho não aguenta: baixa a resolução aos poucos
    lentos = bruto > .03 && bruto < .2 ? lentos + 1 : Math.max(0, lentos - 1)
    if (lentos > 60 && dpr > .75) { dpr = Math.max(.75, dpr * .85); lentos = 0; ajustar() }
    p += (alvo - p) * (1 - Math.exp(-dt * 3.4)); ax += (mx - ax) * dt * 2; ay += (my - ay) * dt * 2

    if (p < 1) {
      // queda: reta para baixo e só no fim nivela o olhar
      const f = THREE.MathUtils.smoothstep(p, 0, 1), nivela = THREE.MathUtils.smoothstep(p, .42, 1)
      V.set(0, THREE.MathUtils.lerp(K[0][1], K[1][1], f), THREE.MathUtils.lerp(K[0][2], K[1][2], f))
      L.set(0, THREE.MathUtils.lerp(0, K[1][4], nivela), THREE.MathUtils.lerp(K[0][5], K[1][5], nivela * nivela * nivela))
    } else { const u = Math.min(1, p / FIM_K); cx.getPoint(u, V); cl.getPoint(u, L) }
    cam.position.set(V.x + ax * .25, V.y - ay * .12 + Math.sin(tempo.value * .5) * .015, V.z); cam.lookAt(L.x + ax * .5, L.y - ay * .2, L.z)
    const q = 1 - THREE.MathUtils.smoothstep(p, .6, .98)
    metal.enabled = q > .001
    metal.uniforms.q.value = q; metal.uniforms.z.value = THREE.MathUtils.smoothstep(p, 0, .9); metal.uniforms.t.value = grao.uniforms.t.value = tempo.value; metal.uniforms.m.value.set(ax, -ay)

    // no hero só o metal aparece: não gasta a placa desenhando o galpão
    const cobre = q >= .999 && !primeiro
    if (cobre) {
      metal.renderToScreen = true
      metal.render(gl, null, comp.readBuffer)
    } else {
      metal.renderToScreen = false
      const d = cam.position.z - FIM, lg = Math.min(1, d / 95) * (retrato ? .4 : 1)
      halos[0].material.opacity = .05 + .2 * lg; halos[1].material.opacity = .1 + .38 * lg; halos[0].scale.setScalar(26 + 30 * lg); halos[1].scale.setScalar(11 + 13 * lg)
      feixes.forEach((f) => { f.material.opacity = .036 * Math.min(1, Math.max(0, (cam.position.z - f.position.z - 1) / 5)) })
      const perto = Math.abs(cam.position.z + 66) < 28
      disco.rotation.x -= dt * 22; faisca.visible = perto; fogo.intensity = perto ? 9 + Math.random() * 7 : 0
      if (perto) faiscas(dt)
      poeira.position.y = Math.sin(tempo.value * .2) * .2; poeira.position.x = Math.sin(tempo.value * .13) * .3
      comp.render(dt)
    }
    if (primeiro) { primeiro = false; aoPronta?.() }
  }

  function faiscas(dt) {
    for (let i = 0; i < N; i++) {
      const q = vS[i]; q.v += dt; q.vy -= 9.8 * dt * .8; q.x += q.vx * dt; q.y += q.vy * dt; q.z += q.vz * dt
      if (q.y < .02) { q.y = .02; q.vy *= -.35; q.vz *= .6 }
      if (q.v > q.m * 1.5) nasce(i)
      const j = i * 6, f = Math.max(0, 1 - q.v / (q.m * 1.5)), k = .022
      pS[j] = q.x; pS[j + 1] = q.y; pS[j + 2] = q.z; pS[j + 3] = q.x - q.vx * k; pS[j + 4] = q.y - q.vy * k; pS[j + 5] = q.z - q.vz * k
      cS[j] = 4 * f; cS[j + 1] = 2.2 * f * f; cS[j + 2] = .7 * f * f * f; cS[j + 3] = cS[j] * .1; cS[j + 4] = cS[j + 1] * .1; cS[j + 5] = 0
    }
    gS.attributes.position.needsUpdate = gS.attributes.color.needsUpdate = true
  }

  function ajustar() {
    gl.setPixelRatio(dpr); gl.setSize(W, H, false); comp.setPixelRatio(dpr); comp.setSize(W, H)
    cam.aspect = W / H; cam.fov = retrato ? 56 : 38; cam.updateProjectionMatrix(); metal.uniforms.razao.value = W / H
  }
  const ligar = () => { if (vivo && ativo && !raf) { ult = performance.now(); raf = requestAnimationFrame(quadro) } }

  return {
    tamanho(w, h) { W = w; H = h; ajustar(); ligar() },
    progresso(v) { alvo = v },
    mouse(x, y) { mx = x; my = y },
    ativo(v) { ativo = v; ligar() },
    destruir() {
      vivo = false; cancelAnimationFrame(raf)
      cena.traverse((o) => {
        o.geometry?.dispose()
        for (const m of [o.material].flat()) { if (!m) continue; for (const v of Object.values(m)) if (v?.isTexture) v.dispose(); m.dispose() }
        if (o !== cena) o.dispose?.()
      })
      cena.environment.dispose(); comp.passes.forEach((x) => x.dispose?.()); comp.dispose(); gl.dispose()
    },
  }
}
