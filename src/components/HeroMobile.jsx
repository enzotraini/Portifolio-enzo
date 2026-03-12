export default function HeroMobile() {
  return (
    <section className="min-h-[100svh] min-h-[100dvh] flex flex-col justify-center px-5 py-20 relative" style={{ paddingLeft: 'max(1.25rem, env(safe-area-inset-left))', paddingRight: 'max(1.25rem, env(safe-area-inset-right))' }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(0,255,136,0.08),transparent_50%)] pointer-events-none" />
      <div className="relative z-10">
        <h1 className="flex flex-wrap gap-x-2 gap-y-0 text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display), system-ui, sans-serif' }}>
          <span>Sites.</span>
          <span>Sistemas.</span>
          <span>Apps.</span>
          <span className="bg-gradient-to-r from-[#00ff88] to-cyan-400 bg-clip-text text-transparent">Automação.</span>
        </h1>
        <p className="mt-6 text-base text-[rgba(255,255,255,0.5)] max-w-xl">
          Soluções digitais reais para seu negócio — do site institucional ao sistema de gestão financeira e chatbot no WhatsApp.
        </p>
        <div className="mt-12 flex flex-wrap gap-3">
          <a
            href="/#porque-contratar"
            className="px-6 py-3.5 rounded-full bg-[#00ff88] text-[#0a0a0b] font-semibold text-sm min-h-[44px] flex items-center justify-center"
          >
            Por que me contratar
          </a>
          <a
            href="/#projetos"
            className="px-6 py-3.5 rounded-full border border-white/20 text-sm min-h-[44px] flex items-center justify-center"
          >
            Ver projetos
          </a>
          <a
            href="/#contato"
            className="px-6 py-3.5 rounded-full border border-white/20 text-sm min-h-[44px] flex items-center justify-center"
          >
            Fale comigo
          </a>
        </div>
      </div>
    </section>
  )
}
