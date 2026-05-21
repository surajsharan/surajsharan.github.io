export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.06] bg-ink-900 py-10">
      <div className="container mx-auto flex flex-col items-start justify-between gap-4 px-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-lime animate-token-blink" />
          <span>© {currentYear} suraj sharan · built with three.js, gsap & next</span>
        </div>
        <div className="flex items-center gap-4">
          <span>tokens/sec ≈ ∞</span>
          <span className="hidden md:inline">·</span>
          <span>ttft ≈ 0</span>
        </div>
      </div>
    </footer>
  )
}
