export default function ScrollGradient() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] hidden md:block" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(29, 78, 216, 0.035) 28%, rgba(5, 150, 105, 0.025) 58%, transparent 100%)',
        }}
      />
    </div>
  )
}
