"use client"

const ITEMS = [
  "TTFT",
  "speculative decoding",
  "paged KV-cache",
  "FlashAttention",
  "vLLM",
  "AWQ / GPTQ",
  "FP8",
  "CUDA graphs",
  "Triton",
  "continuous batching",
  "EAGLE",
  "Medusa",
  "LoRA",
  "tensor parallel",
  "GQA",
]

export default function Ticker() {
  const repeated = [...ITEMS, ...ITEMS]
  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] bg-ink-950 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
      <div className="flex w-max animate-ticker-flow gap-12 whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.2em] text-white/65">
        {repeated.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            <span>{t}</span>
            <span className="text-lime">/</span>
          </span>
        ))}
      </div>
    </div>
  )
}
