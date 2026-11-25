import { useEffect, useRef } from 'react'

const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'
const FS = `precision highp float;uniform vec2 r;uniform float t,zoom;uniform vec3 frio,brilho,quente;
float altura(vec2 p){float a=t*.11;for(int i=1;i<6;i++){float f=float(i);p+=.62/f*sin(f*1.35*p.yx+vec2(a*1.3+f,a+f*1.7))+vec2(.12,.07);}return sin(p.x*1.1+p.y*.9)*.5+.5;}
float g(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){vec2 v=gl_FragCoord.xy/r,c=(v-.5)*vec2(r.x/r.y,1.);vec2 p=c*zoom+vec2(.3,-.2);float e=.01,h=altura(p),hx=altura(p+vec2(e,0.)),hy=altura(p+vec2(0.,e));
vec3 n=normalize(vec3((h-hx)/e*.8,(h-hy)/e*.8,1.));
float a=pow(max(dot(n,normalize(vec3(-.7,.65,.5))),0.),5.),b=pow(max(dot(n,normalize(vec3(-.35,.8,.55))),0.),42.),q=pow(max(dot(n,normalize(vec3(.85,-.35,.42))),0.),7.);
vec3 k=mix(vec3(.006,.010,.016),frio*.16,h)+frio*a*1.15+brilho*b*.8+quente*q*.5;k+=(g(v*911.+fract(t))-.5)*.016;gl_FragColor=vec4(k,1.);}`

/** Metal líquido sem three.js, para as páginas de produto e o emblema da Maya. Cores em 0..1. */
export default function Degrade({ frio, brilho, quente, zoom = 1.75, className = '' }) {
  const ref = useRef(null)
  const cores = JSON.stringify([frio, brilho, quente])

  useEffect(() => {
    const el = ref.current
    const gl = el.getContext('webgl', { antialias: false })
    if (!gl) return
    const prog = gl.createProgram()
    for (const [tipo, fonte] of [[gl.VERTEX_SHADER, VS], [gl.FRAGMENT_SHADER, FS]]) {
      const s = gl.createShader(tipo)
      gl.shaderSource(s, fonte)
      gl.compileShader(s)
      gl.attachShader(prog, s)
    }
    gl.bindAttribLocation(prog, 0, 'p')
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
    const u = (n) => gl.getUniformLocation(prog, n)
    JSON.parse(cores).forEach((c, i) => gl.uniform3fv(u(['frio', 'brilho', 'quente'][i]), c))
    gl.uniform1f(u('zoom'), zoom)
    const ut = u('t')
    const ur = u('r')
    const parado = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0

    function desenhar(ms) {
      raf = 0
      gl.uniform1f(ut, ms / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (!parado) raf = requestAnimationFrame(desenhar)
    }
    const medir = new ResizeObserver(() => {
      const d = Math.min(window.devicePixelRatio, 1.5)
      el.width = Math.max(1, el.clientWidth * d)
      el.height = Math.max(1, el.clientHeight * d)
      gl.viewport(0, 0, el.width, el.height)
      gl.uniform2f(ur, el.width, el.height)
      if (parado) desenhar(0)
    })
    medir.observe(el)
    const olho = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf)
      raf = 0
      if (e.isIntersecting && !parado) raf = requestAnimationFrame(desenhar)
    })
    olho.observe(el)
    return () => {
      cancelAnimationFrame(raf)
      medir.disconnect()
      olho.disconnect()
    }
  }, [cores, zoom])

  return <canvas ref={ref} aria-hidden className={`block h-full w-full ${className}`} />
}
