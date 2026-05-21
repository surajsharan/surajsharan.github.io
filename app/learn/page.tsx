import Link from "next/link"
import { ArrowUpRight, BookOpen, Cpu, Zap } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/sections/footer"
import TtftTimeline from "@/components/learn/ttft-timeline"
import SpecDecodingViz from "@/components/learn/spec-decoding-viz"
import SpeedupPlayground from "@/components/learn/speedup-playground"

const VARIANTS = [
  {
    name: "Vanilla speculative",
    blurb:
      "Pair a small draft model M_q with the target M_p. Verify k draft tokens in one M_p forward pass.",
    tag: "leviathan · 2023",
  },
  {
    name: "Medusa",
    blurb:
      "Add several decoding heads to the target model itself. Heads propose, the base verifies — no separate draft model.",
    tag: "medusa · 2024",
  },
  {
    name: "EAGLE",
    blurb:
      "Train a tiny network on top of the target's hidden states. Re-uses the KV-cache and improves acceptance.",
    tag: "eagle · 2024",
  },
  {
    name: "Lookahead decoding",
    blurb:
      "Use the target itself to generate n-gram drafts via Jacobi iteration. No extra model, but spikier acceptance.",
    tag: "lookahead · 2024",
  },
]

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-ink-900 text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.06] pt-32 pb-20">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 mask-radial-fade" />

        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            <div className="label-mono mb-5 flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5 text-lime" />
              <span>learn · serving · ttft</span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              How tokens leave the GPU{" "}
              <span className="gradient-lime-text">faster.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base text-white/75 md:text-lg">
              A visual walk-through of TTFT and speculative decoding — the two
              ideas behind almost every recent jump in LLM serving latency.
              Play with the variables, watch the speedup peak, and see when it
              collapses.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 font-mono text-[12px] uppercase tracking-[0.14em]">
              <a
                href="#ttft"
                className="rounded-md border border-white/[0.1] bg-white/[0.03] px-3 py-2 text-white/85 hover:border-lime/40 hover:text-lime"
              >
                01 / ttft
              </a>
              <a
                href="#spec"
                className="rounded-md border border-white/[0.1] bg-white/[0.03] px-3 py-2 text-white/85 hover:border-lime/40 hover:text-lime"
              >
                02 / speculative decoding
              </a>
              <a
                href="#playground"
                className="rounded-md border border-white/[0.1] bg-white/[0.03] px-3 py-2 text-white/85 hover:border-lime/40 hover:text-lime"
              >
                03 / playground
              </a>
              <a
                href="#variants"
                className="rounded-md border border-white/[0.1] bg-white/[0.03] px-3 py-2 text-white/85 hover:border-lime/40 hover:text-lime"
              >
                04 / variants
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TTFT */}
      <section id="ttft" className="border-b border-white/[0.06] py-24">
        <div className="container mx-auto px-6">
          <div className="mb-10 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="label-mono mb-3">// 01 · time to first token</div>
              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                TTFT is what users actually feel.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/75">
                Throughput is for the SRE dashboard. TTFT is what you feel when
                you hit enter. It's the wall-clock time from request → first
                token streamed back, dominated by <span className="text-lime">prefill</span>.
              </p>
              <p className="mt-3 text-base leading-relaxed text-white/75">
                Most low-latency tricks either{" "}
                <span className="text-white">shrink prefill</span> (paged KV-cache,
                chunked prefill, prompt caching) or{" "}
                <span className="text-white">overlap it</span> with the first
                decode (continuous batching).
              </p>
            </div>
            <div className="lg:col-span-7">
              <TtftTimeline />
            </div>
          </div>
        </div>
      </section>

      {/* Speculative decoding viz */}
      <section id="spec" className="border-b border-white/[0.06] bg-ink-950 py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="label-mono mb-3 flex items-center justify-center gap-2">
              <Zap className="h-3.5 w-3.5 text-lime" />
              <span>02 · speculative decoding</span>
            </div>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Draft cheap. Verify in parallel.{" "}
              <span className="gradient-lime-text">Commit the prefix.</span>
            </h2>
            <p className="mt-4 text-base text-white/75 md:text-lg">
              A small draft model proposes k tokens. The big target model
              verifies all k in <em>one</em> forward pass. Whatever prefix
              survives gets committed — sometimes you ship 5 tokens for the
              price of 1.
            </p>
          </div>

          <SpecDecodingViz />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Step
              n="01"
              title="Draft k tokens"
              body="Cheap autoregressive run on a small model. ~5–10× faster than the target."
            />
            <Step
              n="02"
              title="One target forward"
              body="Run M_p over prompt + drafts in parallel. Get a probability distribution at every position."
            />
            <Step
              n="03"
              title="Accept the prefix"
              body="Walk left-to-right. Accept while P_target / P_draft ≥ rand(). On reject, sample from the residual."
            />
          </div>

          <CodeBlock />
        </div>
      </section>

      {/* Playground */}
      <section id="playground" className="border-b border-white/[0.06] py-24">
        <div className="container mx-auto px-6">
          <div className="mb-10 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="label-mono mb-3">// 03 · the math, on a slider</div>
              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                Why bigger k isn't always better.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/75">
                Speculative decoding has a cliff. Push k too high with a low
                acceptance rate α and you spend draft time on tokens you'll throw
                away. The optimal k depends on{" "}
                <span className="text-lime">α</span>,{" "}
                <span className="text-lime">c</span>, and your workload.
              </p>
              <ul className="mt-5 space-y-2 font-mono text-[13px] text-white/80">
                <li className="flex items-start gap-2">
                  <span className="mt-2 inline-block h-[3px] w-3 flex-shrink-0 bg-lime" />
                  α high (≥ 0.85) → push k up to 5–7
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 inline-block h-[3px] w-3 flex-shrink-0 bg-lime" />
                  α mid (0.6–0.8) → k = 3–5 is the sweet spot
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 inline-block h-[3px] w-3 flex-shrink-0 bg-lime" />
                  α low (&lt; 0.5) → don't speculate; pick a better draft
                </li>
              </ul>
            </div>
            <div className="lg:col-span-7">
              <SpeedupPlayground />
            </div>
          </div>
        </div>
      </section>

      {/* Variants */}
      <section id="variants" className="border-b border-white/[0.06] bg-ink-950 py-24">
        <div className="container mx-auto px-6">
          <div className="mb-10 max-w-2xl">
            <div className="label-mono mb-3">// 04 · variants</div>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">
              All the ways to draft.
            </h2>
            <p className="mt-3 text-base text-white/75">
              Every flavour you'll see in production is a different answer to
              "where does the draft come from?"
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {VARIANTS.map((v, i) => (
              <article
                key={v.name}
                className="group rounded-lg border border-white/[0.08] bg-white/[0.02] p-6 transition-colors hover:border-lime/30"
              >
                <div className="flex items-center justify-between">
                  <div className="label-mono">
                    {String(i + 1).padStart(2, "0")} / {VARIANTS.length.toString().padStart(2, "0")}
                  </div>
                  <span className="rounded-md border border-white/[0.08] bg-ink-900 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                    {v.tag}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">{v.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {v.blurb}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Take-aways + CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl rounded-lg border border-white/[0.08] bg-ink-800/40 p-8">
            <div className="label-mono mb-3 flex items-center gap-2">
              <Cpu className="h-3.5 w-3.5 text-lime" />
              <span>the take-away</span>
            </div>
            <h3 className="text-2xl font-bold leading-snug md:text-3xl">
              TTFT comes from prefill. Throughput comes from{" "}
              <span className="gradient-lime-text">parallel decode.</span>
            </h3>
            <p className="mt-4 text-base text-white/75">
              Speculative decoding is the cleanest answer when α is high enough
              and the draft is cheap enough. Everything else — Medusa, EAGLE,
              Lookahead — is moving where the draft comes from.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/#research"
                className="inline-flex items-center gap-1.5 rounded-md bg-lime px-4 py-2.5 font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-900 hover:bg-lime-400"
              >
                see the research <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.1] bg-white/[0.02] px-4 py-2.5 font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-white hover:border-lime/40 hover:text-lime"
              >
                say hi →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-lg border border-white/[0.08] bg-ink-800/40 p-5">
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-lime">
        {n}
      </div>
      <h4 className="mt-2 text-base font-semibold text-white">{title}</h4>
      <p className="mt-1.5 text-sm leading-relaxed text-white/70">{body}</p>
    </div>
  )
}

function CodeBlock() {
  return (
    <div className="mt-8 overflow-hidden rounded-lg border border-white/[0.08] bg-ink-950">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        <span>spec_decode.py</span>
        <span className="text-lime">python</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-white/85">
        <code>{`while not done:
    drafts, p_draft = draft_model.sample(prompt, k=K)
    logits_target  = target_model.forward(prompt + drafts)

    accepted = 0
    for i, tok in enumerate(drafts):
        p_t = softmax(logits_target[i])[tok]
        if random() < min(1.0, p_t / p_draft[i]):
            accepted += 1
        else:
            break  # reject + sample from residual at this position

    prompt.extend(drafts[:accepted])
    if accepted < K:
        prompt.append(sample_residual(logits_target[accepted], p_draft[accepted]))
    elif accepted == K:
        prompt.append(sample(logits_target[K]))  # bonus token`}</code>
      </pre>
    </div>
  )
}
