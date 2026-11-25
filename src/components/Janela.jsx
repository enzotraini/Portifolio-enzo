export default function Janela({ src, alt, w, h, className = '', prioridade = false }) {
  return (
    <img
      src={src}
      alt={alt}
      width={w}
      height={h}
      loading={prioridade ? 'eager' : 'lazy'}
      decoding="async"
      className={`h-auto w-full rounded-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.09),0_50px_100px_-30px_#000] ${className}`}
    />
  )
}
