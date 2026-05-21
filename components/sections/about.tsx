"use client"

import { motion } from "framer-motion"

const TAGS = [
  "LLM serving",
  "speculative decoding",
  "vLLM / TGI",
  "CUDA",
  "PyTorch",
  "VLMs",
  "edge inference",
  "RAG",
  "evals",
]

export default function About() {
  return (
    <section id="about" className="relative border-t border-white/[0.06] bg-ink-900 py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="grid gap-16 lg:grid-cols-12"
        >
          <div className="lg:col-span-4">
            <div className="label-mono mb-4">// about</div>
            <div className="sticky top-28">
              <div className="overflow-hidden rounded-md border border-white/[0.08] bg-ink-800">
                <img
                  src="/images/suraj-profile.png"
                  alt="Suraj Sharan"
                  className="aspect-square w-full object-cover grayscale contrast-[1.05]"
                />
              </div>
              <div className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <span>abu dhabi · uae</span>
                <span className="text-lime">● available</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              I build the layer below the model —{" "}
              <span className="text-muted-foreground">
                the runtime, the kernels, the schedulers that let tokens leave the GPU before you finish your sentence.
              </span>
            </h2>

            <div className="my-10 divider-fade" />

            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <div className="label-mono mb-3">role</div>
                <p className="text-lg leading-relaxed text-white/85">
                  Applied AI engineer working across the inference stack — from
                  model compression and quantization to high-throughput serving
                  on tight latency budgets.
                </p>
              </div>
              <div>
                <div className="label-mono mb-3">research</div>
                <p className="text-lg leading-relaxed text-white/85">
                  Part-time researcher exploring speculative decoding,
                  draft-target alignment, and KV-cache scheduling. Applied first,
                  papers second.
                </p>
              </div>
            </div>

            <div className="my-10 divider-fade" />

            <div className="label-mono mb-4">stack</div>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 font-mono text-[12px] text-white/80 transition-colors hover:border-lime/40 hover:text-lime"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
