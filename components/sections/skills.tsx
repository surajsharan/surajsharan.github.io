"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import SkillsStackMount from "@/components/three/skills-stack-mount"

type Layer = {
  name: string
  caption: string
  skills: string[]
}

const LAYERS: Layer[] = [
  {
    name: "L1 · embedding",
    caption: "from raw tokens to dense vectors",
    skills: ["BPE / SentencePiece", "Position encodings", "Embedding compression"],
  },
  {
    name: "L2 · attention",
    caption: "where context happens",
    skills: ["FlashAttention", "Paged KV-cache", "GQA / MQA", "Sliding window"],
  },
  {
    name: "L3 · ffn",
    caption: "the heavy lifters",
    skills: ["SwiGLU MLP", "AWQ / GPTQ", "FP8 / INT4", "MoE routing"],
  },
  {
    name: "L4 · decoder",
    caption: "how the next token is chosen",
    skills: ["Speculative decoding", "Medusa heads", "Lookahead decoding", "EAGLE"],
  },
  {
    name: "L5 · scheduler",
    caption: "what runs, when, and for whom",
    skills: ["Continuous batching", "Admission control", "Priority queues", "SLA policies"],
  },
  {
    name: "L6 · serving",
    caption: "tokens, all the way out",
    skills: ["vLLM", "TGI", "Triton", "SSE / gRPC streaming", "Autoscaling"],
  },
]

export default function Skills() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section
      id="skills"
      className="relative border-t border-white/[0.06] bg-ink-900 py-32"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="mb-12 max-w-2xl"
        >
          <div className="label-mono mb-4">// skills</div>
          <h2 className="text-3xl font-bold leading-tight md:text-5xl">
            Skills mapped to the{" "}
            <span className="gradient-lime-text">layers I work in.</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Hover a layer below. Each slab is a level of the inference stack —
            from tokens going in to tokens streaming out.
          </p>
        </motion.div>

        <div className="grid items-stretch gap-6 lg:grid-cols-12">
          {/* 3D visualization */}
          <div className="relative h-[440px] overflow-hidden rounded-lg border border-white/[0.08] bg-ink-950 lg:col-span-7 lg:h-[560px]">
            <SkillsStackMount active={active} setActive={setActive} />
            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>model.forward()</span>
              <span className="text-lime/80">stack.depth = {LAYERS.length}</span>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>↑ tokens flowing through</span>
              <span>hover · interact</span>
            </div>
          </div>

          {/* Layer list */}
          <div className="lg:col-span-5">
            <ul className="space-y-2">
              {LAYERS.map((l, i) => {
                const isActive = active === i
                return (
                  <li key={l.name}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(i)}
                      onBlur={() => setActive(null)}
                      className={`w-full rounded-md border p-4 text-left transition-all ${
                        isActive
                          ? "border-lime/50 bg-lime/[0.06]"
                          : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.16]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-mono text-[12px] uppercase tracking-[0.16em] ${
                            isActive ? "text-lime" : "text-white/85"
                          }`}
                        >
                          {l.name}
                        </span>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}/{LAYERS.length}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {l.caption}
                      </div>
                      <div
                        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${
                          isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="min-h-0">
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {l.skills.map((s) => (
                              <span
                                key={s}
                                className="rounded border border-lime/30 bg-lime/[0.08] px-2 py-1 font-mono text-[11px] text-lime"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
