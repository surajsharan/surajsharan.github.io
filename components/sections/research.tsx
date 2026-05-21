"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const TOPICS = [
  {
    tag: "01 / decoding",
    title: "Speculative Decoding",
    blurb:
      "Drafting tokens with a small model and verifying with a target. Working on draft–target alignment, tree-attention, and adaptive draft length to hit 2–3× speedups without quality regression.",
    bullets: [
      "Draft-target acceptance rate analysis",
      "Tree-based speculative sampling",
      "Adaptive lookahead under load",
    ],
    metric: { label: "speedup", value: "2.4×" },
  },
  {
    tag: "02 / serving",
    title: "LLM Inference Serving",
    blurb:
      "Continuous batching, paged attention, and KV-cache eviction at the engine layer. Squeezing throughput out of single nodes before reaching for more GPUs.",
    bullets: [
      "Continuous batching + paged KV",
      "Quantization (AWQ, GPTQ, FP8)",
      "TTFT under multi-tenant load",
    ],
    metric: { label: "TTFT P99", value: "84ms" },
  },
]

function Diagram() {
  return (
    <svg
      viewBox="0 0 320 80"
      className="h-16 w-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="lime-fade" x1="0" x2="1">
          <stop offset="0" stopColor="#C6FF3E" stopOpacity="0" />
          <stop offset="0.4" stopColor="#C6FF3E" stopOpacity="0.6" />
          <stop offset="1" stopColor="#C6FF3E" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[15, 35, 55].map((y, i) => (
        <line
          key={i}
          x1="0"
          y1={y}
          x2="320"
          y2={y}
          stroke="url(#lime-fade)"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: 18 }).map((_, i) => (
        <circle
          key={i}
          cx={20 + (i * 280) / 18 + (i % 3) * 4}
          cy={15 + ((i * 37) % 45)}
          r={i % 4 === 0 ? 2 : 1.2}
          fill="#C6FF3E"
          opacity={0.5 + ((i % 5) / 10)}
        />
      ))}
    </svg>
  )
}

export default function Research() {
  return (
    <section id="research" className="relative border-t border-white/[0.06] bg-ink-950 py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid-sm opacity-30 mask-fade-bottom" />
      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <div className="label-mono mb-4">// research focus</div>
          <h2 className="text-3xl font-bold leading-tight md:text-5xl">
            Two problems I think about <span className="gradient-lime-text">most.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
            Inference is where models meet reality. Latency is product. Throughput
            is unit economics. Both have to land.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {TOPICS.map((t, i) => (
            <motion.article
              key={t.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.05 + i * 0.08 }}
              className="group relative overflow-hidden rounded-lg border border-white/[0.08] bg-ink-800/40 p-7 transition-colors hover:border-lime/30"
            >
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-lime/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="flex items-center justify-between">
                <span className="label-mono">{t.tag}</span>
                <div className="rounded-md border border-white/[0.08] bg-ink-900 px-2.5 py-1 font-mono text-[11px]">
                  <span className="text-muted-foreground">{t.metric.label} </span>
                  <span className="text-lime">{t.metric.value}</span>
                </div>
              </div>

              <h3 className="mt-5 text-2xl font-semibold md:text-3xl">
                {t.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-white/75">
                {t.blurb}
              </p>

              <ul className="mt-5 space-y-2">
                {t.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 font-mono text-[13px] text-white/80"
                  >
                    <span className="mt-2 inline-block h-[3px] w-3 flex-shrink-0 bg-lime" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Diagram />
              </div>

              <div className="mt-5 flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-lime/80 transition-colors group-hover:text-lime">
                explore notes <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
