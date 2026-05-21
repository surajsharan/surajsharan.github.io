"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Zap } from "lucide-react"
import TokenFlowMount from "@/components/three/token-flow-mount"

const TOKENS = [
  "Hi.",
  " I'm",
  " Suraj",
  " —",
  " an",
  " applied",
  " AI",
  " engineer",
  " working",
  " on",
  " LLM",
  " inference,",
  " speculative",
  " decoding,",
  " and",
  " low-latency",
  " serving.",
]

function useTypedStream(tokens: string[], speedMs = 110) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (count >= tokens.length) return
    const t = setTimeout(() => setCount((c) => c + 1), speedMs)
    return () => clearTimeout(t)
  }, [count, tokens.length, speedMs])
  return tokens.slice(0, count).join("")
}

export default function Hero() {
  const streamed = useTypedStream(TOKENS, 110)

  // mock TTFT readout that locks once tokens start
  const [ttft, setTtft] = useState(0)
  useEffect(() => {
    const start = performance.now()
    let raf = 0
    const tick = () => {
      const elapsed = performance.now() - start
      setTtft(Math.min(elapsed, 38))
      if (elapsed < 38) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const metrics = useMemo(
    () => [
      { label: "TTFT", value: `${ttft.toFixed(0)} ms`, accent: true },
      { label: "throughput", value: "1.8k tok/s" },
      { label: "model", value: "llama-3-8b" },
      { label: "decode", value: "speculative" },
    ],
    [ttft],
  )

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-ink-900">
      {/* 3D scene */}
      <div className="absolute inset-0">
        <TokenFlowMount />
      </div>

      {/* Grid + radial mask */}
      <div className="pointer-events-none absolute inset-0 bg-grid mask-radial-fade opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-ink-900/40 to-ink-900" />

      {/* Top status bar */}
      <div className="absolute left-0 right-0 top-20 z-20 px-6">
        <div className="container mx-auto flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime animate-token-blink" />
            <span>node:gpu-0 · cuda 12.4 · vllm-engine</span>
          </div>
          <div className="hidden md:block">prompt → tokens → response</div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="label-mono mb-6 flex items-center gap-2">
            <Zap className="h-3.5 w-3.5 text-lime" />
            <span>applied · ai · engineer</span>
            <span className="text-ink-400">/</span>
            <span>part-time researcher</span>
          </div>

          <h1 className="text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl lg:text-[88px]">
            <span className="block text-white">Build the model.</span>
            <span className="block gradient-lime-text">Serve the tokens.</span>
            <span className="block text-white/85">Cut the TTFT.</span>
          </h1>

          <div className="mt-8 max-w-2xl rounded-md border border-white/8 bg-ink-800/60 p-4 font-mono text-sm text-white/85 backdrop-blur-md md:text-base">
            <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>stream · stdout</span>
              <span className="text-lime">200 OK</span>
            </div>
            <div className="min-h-[3.5rem]">
              <span className="text-white/90">{streamed}</span>
              <span className="caret-token" />
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-lime px-5 py-3 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-ink-900 transition-transform hover:-translate-y-0.5"
            >
              See the work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#research"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.02] px-5 py-3 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-white hover:bg-white/[0.06]"
            >
              research focus
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-white/70 hover:text-lime"
            >
              say hi →
            </a>
          </div>
        </motion.div>

        {/* Metrics row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid w-full grid-cols-2 gap-px overflow-hidden rounded-md border border-white/10 bg-white/[0.04] md:grid-cols-4"
        >
          {metrics.map((m) => (
            <div
              key={m.label}
              className="bg-ink-900/85 px-5 py-4 backdrop-blur-md"
            >
              <div className="label-mono mb-1.5">{m.label}</div>
              <div
                className={`font-mono text-xl font-semibold ${
                  m.accent ? "text-lime" : "text-white"
                }`}
              >
                {m.value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        scroll ↓
      </div>
    </section>
  )
}
