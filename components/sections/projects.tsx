"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Github, FileText } from "lucide-react"

type Project = {
  id: number
  title: string
  blurb: string
  tags: string[]
  metric: { label: string; value: string }
  liveUrl?: string
  githubUrl?: string
  paperUrl?: string
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Speculative Decoding Bench",
    blurb:
      "Benchmark harness for draft-target speculative decoding across draft sizes, acceptance thresholds, and workloads. Includes tree-attention sampling and adaptive lookahead.",
    tags: ["LLM", "decoding", "PyTorch", "Triton"],
    metric: { label: "speedup", value: "2.4×" },
    githubUrl: "#",
    paperUrl: "#",
  },
  {
    id: 2,
    title: "Tiny-vLLM",
    blurb:
      "Minimal continuous-batching engine I wrote to understand vLLM internals. Paged KV-cache, prefill / decode separation, SSE streaming over a thin HTTP layer.",
    tags: ["serving", "CUDA", "FastAPI"],
    metric: { label: "TTFT P99", value: "84 ms" },
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Edge-VLM Compression",
    blurb:
      "Compressed a vision-language model to fit a 6GB Jetson budget while preserving 96% downstream accuracy via AWQ + LoRA finetuning.",
    tags: ["VLM", "quantization", "edge", "LoRA"],
    metric: { label: "size", value: "−74%" },
    githubUrl: "#",
    paperUrl: "#",
  },
]

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative border-t border-white/[0.06] bg-ink-900 py-32"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end"
        >
          <div className="max-w-xl">
            <div className="label-mono mb-4">// projects</div>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Things I've built &{" "}
              <span className="gradient-lime-text">benchmarked.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base text-muted-foreground">
            All measured. All reproducible. Numbers come from a single A100 unless noted.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.02] p-6 transition-all hover:-translate-y-1 hover:border-lime/40"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  proj_{String(p.id).padStart(2, "0")}
                </span>
                <div className="rounded-md border border-white/[0.08] bg-ink-900 px-2 py-0.5 font-mono text-[11px]">
                  <span className="text-muted-foreground">{p.metric.label} </span>
                  <span className="text-lime">{p.metric.value}</span>
                </div>
              </div>

              <h3 className="mt-5 text-xl font-semibold text-white">{p.title}</h3>
              <p className="mt-2 flex-grow text-sm leading-relaxed text-white/70">
                {p.blurb}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-white/[0.08] px-2 py-0.5 font-mono text-[11px] text-white/65"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-4 border-t border-white/[0.06] pt-4 font-mono text-[12px] uppercase tracking-[0.14em]">
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-white/70 hover:text-lime"
                  >
                    demo <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-white/70 hover:text-lime"
                  >
                    <Github className="h-3.5 w-3.5" /> code
                  </a>
                )}
                {p.paperUrl && (
                  <a
                    href={p.paperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-white/70 hover:text-lime"
                  >
                    <FileText className="h-3.5 w-3.5" /> paper
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
