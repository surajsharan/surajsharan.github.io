"use client"

import { motion } from "framer-motion"

type Phase = {
  name: string
  detail: string
  ms: number
  color: string
  emphasis?: boolean
}

const PHASES: Phase[] = [
  {
    name: "tokenize",
    detail: "split prompt into tokens",
    ms: 3,
    color: "#3D4757",
  },
  {
    name: "prefill",
    detail: "compute KV-cache over the prompt",
    ms: 68,
    color: "#6CA516",
  },
  {
    name: "decode₁",
    detail: "first forward pass · one token",
    ms: 13,
    color: "#C6FF3E",
    emphasis: true,
  },
]

const TOTAL = PHASES.reduce((s, p) => s + p.ms, 0)

export default function TtftTimeline() {
  return (
    <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-ink-800/40 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="label-mono">// ttft = tokenize + prefill + decode₁</div>
        <div className="font-mono text-sm text-white">
          <span className="text-muted-foreground">total </span>
          <span className="text-lime">{TOTAL}&nbsp;ms</span>
        </div>
      </div>

      <div className="flex w-full overflow-hidden rounded-md border border-white/[0.06]">
        {PHASES.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ width: 0 }}
            whileInView={{ width: `${(p.ms / TOTAL) * 100}%` }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.1 + i * 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ backgroundColor: p.color }}
            className="relative flex h-12 items-center justify-start px-3"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.16em]">
              <span className={p.emphasis ? "text-ink-900" : "text-white/85"}>
                {p.name}
              </span>{" "}
              <span className={p.emphasis ? "text-ink-900/70" : "text-white/55"}>
                {p.ms}ms
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 text-sm text-white/75 md:grid-cols-3">
        {PHASES.map((p) => (
          <div key={p.name} className="flex items-start gap-2">
            <span
              className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-sm"
              style={{ backgroundColor: p.color }}
            />
            <div>
              <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-white">
                {p.name}
              </div>
              <div className="text-muted-foreground">{p.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-white/[0.06] pt-4 font-mono text-[12px] text-muted-foreground">
        prefill is the heavy one — it's a single forward pass over the entire prompt.
        Decode₁ is fast (one token) but you only get to start it once the KV-cache is warm.
        Lower TTFT → faster perceived response.
      </div>
    </div>
  )
}
