"use client"

import { motion } from "framer-motion"

type Job = {
  title: string
  company: string
  companyUrl?: string
  period: string
  description: string
  tags: string[]
}

const JOBS: Job[] = [
  {
    title: "Principal Data Scientist",
    company: "AIQ, a G42 company (Abu Dhabi, UAE)",
    companyUrl: "https://aiq.ae/",
    period: "2023 — present",
    description:
      "Lead on LLM inference. Shipped a continuous-batching engine that cut P99 TTFT by 38% under multi-tenant load. Designed a speculative-decoding pipeline that delivered ~2.4× speedup on summarisation workloads.",
    tags: ["vLLM", "speculative decoding", "CUDA", "Triton"],
  },
  {
    title: "Computer Vision Specialist", 
    company: "AIQ, a G42 company (Abu Dhabi, UAE)",
    companyUrl: "https://aiq.ae/",
    period: "2021 — 2023",
    description:
      "Built and deployed real-time detection models for edge devices. Brought inference latency from 90ms → 28ms via pruning, distillation and INT8 quantization on Jetson-class hardware.",
    tags: ["edge", "quantization", "TensorRT", "YOLO"],
  },
  {
    title: "ML Research Engineer",
    company: "University Research Group",
    period: "2021 — 2023",
    description:
      "Worked on CNN interpretability and feature-map visualization. Wrote tooling that became the default introspection layer for the group's vision projects.",
    tags: ["interpretability", "PyTorch", "visualization"],
  },
]

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative border-t border-white/[0.06] bg-ink-950 py-32"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <div className="label-mono mb-4">// experience</div>
          <h2 className="text-3xl font-bold leading-tight md:text-5xl">
            Where I've shipped.
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-2 bottom-2 hidden w-px bg-gradient-to-b from-transparent via-white/15 to-transparent md:block" />
          <ul className="space-y-3">
            {JOBS.map((job, i) => (
              <motion.li
                key={job.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-lg border border-white/[0.08] bg-white/[0.02] p-6 md:pl-10 transition-colors hover:border-lime/30"
              >
                <span className="absolute left-0 top-9 hidden h-2 w-2 -translate-x-1/2 rounded-full bg-white/30 group-hover:bg-lime md:block" />

                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="label-mono mb-2">{job.period}</div>
                    <h3 className="text-xl font-semibold text-white md:text-2xl">
                      {job.title}{" "}
                      <span className="font-normal text-muted-foreground">
                        · {job.companyUrl ? (
                          <a 
                            href={job.companyUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-lime transition-colors"
                          >
                            {job.company}
                          </a>
                        ) : (
                          job.company
                        )}
                      </span>
                    </h3>
                    <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/75">
                      {job.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {job.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-white/[0.08] bg-ink-900 px-2 py-1 font-mono text-[11px] text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
