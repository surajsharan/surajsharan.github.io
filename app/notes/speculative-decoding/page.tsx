import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/sections/footer"
import ArticleShell from "@/components/notes/article-shell"
import { Callout, CodeBlock, Equation, NumTable } from "@/components/notes/blocks"

const TOC = [
  { id: "why", label: "Why it works" },
  { id: "loop", label: "The loop, in one screen" },
  { id: "math", label: "The math: expected tokens" },
  { id: "speedup", label: "Speedup, with friction" },
  { id: "cliff", label: "The α–k cliff" },
  { id: "variants", label: "Where the draft comes from" },
  { id: "doesnt-help", label: "What it doesn't help" },
  { id: "tuning", label: "Tuning checklist" },
]

export default function SpecDecodingPost() {
  return (
    <main className="min-h-screen bg-ink-900 text-white">
      <Navbar />

      <ArticleShell
        tag="// notes · decoding · math"
        title={
          <>
            Speculative decoding — the math, and{" "}
            <span className="gradient-lime-text">when it breaks.</span>
          </>
        }
        dek="A small model proposes k tokens, the big model verifies them in one parallel pass. The trick is rejection sampling — but the trick has a cliff, and most production deployments are sitting on the wrong side of it."
        date="2026 · 05"
        readingTime="9 min"
        toc={TOC}
      >
        <p>
          Vanilla autoregressive decoding generates one token per forward pass.
          That makes the inter-token latency (ITL) of a 70B model a
          straightforward function of HBM bandwidth: every step you load
          ~140 GB of weights to produce a single token. Speculative decoding
          breaks that 1:1 by spending cheap compute to verify many tokens in
          one expensive pass.
        </p>
        <p>
          This post is a companion to{" "}
          <Link href="/learn">the visual walk-through on /learn</Link>, with
          the math behind the bar chart.
        </p>

        <h2 id="why">Why it works</h2>
        <p>
          A transformer forward pass over a sequence of length{" "}
          <code>n+k</code> already gives you the next-token distribution at{" "}
          <em>every</em> position — including positions{" "}
          <code>n</code> through <code>n+k-1</code>. Vanilla decoding throws
          those away. Speculative decoding{" "}
          <strong>uses them as cheap verifications</strong> for a draft
          sequence.
        </p>
        <p>
          The brilliant part — from{" "}
          <a
            href="https://arxiv.org/abs/2211.17192"
            target="_blank"
            rel="noopener noreferrer"
          >
            Leviathan, Kalman & Matias, 2023
          </a>{" "}
          — is that you can do this <em>without changing the output
          distribution</em>. The accept/reject step uses rejection sampling so
          the final stream is statistically identical to sampling from the
          target model alone. Lossless.
        </p>

        <h2 id="loop">The loop, in one screen</h2>
        <p>One round consists of:</p>
        <ol>
          <li>
            <strong>Draft.</strong> Run a small model{" "}
            <code>M_q</code> autoregressively for k steps, producing draft
            tokens <code>x₁..x_k</code> with proposal probabilities{" "}
            <code>q(x_i | context)</code>.
          </li>
          <li>
            <strong>Verify.</strong> Run the target <code>M_p</code> once over
            the prompt plus drafts. Get the target distribution{" "}
            <code>p(· | context, x₁..x_{`{i-1}`})</code> at every position.
          </li>
          <li>
            <strong>Accept-reject.</strong> Walk positions left to right. At
            each <code>i</code>, accept <code>x_i</code> with probability{" "}
            <code>min(1, p(x_i) / q(x_i))</code>. On the first reject, sample a
            replacement from the residual <code>(p − q)₊</code>.
          </li>
          <li>
            <strong>Commit.</strong> The accepted prefix plus the residual
            sample become the new state. If <em>all</em> k accept, you get a
            free bonus token from <code>p(· | x₁..x_k)</code>.
          </li>
        </ol>

        <CodeBlock filename="spec_decode.py" lang="python">
{`while not done:
    drafts, q = draft_model.sample(prompt, k=K)
    p_logits  = target_model.forward(prompt + drafts)
    p         = softmax(p_logits)

    accepted = 0
    for i, x in enumerate(drafts):
        if random() < min(1.0, p[i][x] / q[i][x]):
            accepted += 1
        else:
            # sample from residual at this position
            residual = relu(p[i] - q[i])
            prompt.append(sample(residual / residual.sum()))
            break

    prompt.extend(drafts[:accepted])
    if accepted == K:                # all drafts accepted
        prompt.append(sample(p[K]))  # bonus token from M_p`}
        </CodeBlock>

        <Callout kind="note" title="lossless, properly">
          The combined process — accept by ratio, fall back to{" "}
          <code>(p−q)₊</code> — provably preserves the target distribution. You
          are not "approximating" the big model; you are sampling exactly from
          it, just with fewer forward passes.
        </Callout>

        <h2 id="math">The math: expected tokens per round</h2>
        <p>
          Let <code>α</code> be the average per-position acceptance probability
          — basically, how often <code>q ≈ p</code>. The number of accepted
          tokens before the first rejection is geometric-ish. Counting the
          bonus token on full acceptance, the expectation is:
        </p>
        <Equation label="Leviathan et al. 2023">
          E[tokens per round] ={" "}
          <span className="text-lime">(1 − α^(k+1)) / (1 − α)</span>
        </Equation>
        <p>
          A few sanity checks: at <code>α = 1</code> (always accept), the
          formula evaluates to <code>k + 1</code>. At <code>α = 0</code> it
          collapses to <code>1</code> (only the residual token, which you'd
          also have gotten from vanilla decoding). Both match intuition.
        </p>
        <NumTable
          caption="E[tokens/round] for typical α and k"
          headers={["α \\ k", "1", "2", "3", "5", "8"]}
          rows={[
            ["0.5", "1.50", "1.75", "1.88", "1.97", "1.99"],
            ["0.7", "1.70", "2.19", "2.53", "2.92", "3.16"],
            ["0.85", "1.85", "2.57", "3.18", "4.08", "4.81"],
            ["0.95", "1.95", "2.85", "3.71", "5.31", "7.16"],
          ]}
        />

        <h2 id="speedup">Speedup, with friction</h2>
        <p>
          Tokens-per-round is the upper bound. To get wall-clock speedup you
          have to pay for the draft. Let <code>c</code> be the draft cost ratio
          — the time of one draft forward divided by one target forward — and
          model the per-round wall-clock as:
        </p>
        <Equation label="speedup approximation">
          speedup ≈ <span className="text-lime">E[tokens] / (1 + c · k)</span>
        </Equation>
        <p>
          The intuition: the target costs <code>1</code> per round (one big
          forward over the drafts), the draft costs <code>c</code> per token
          times <code>k</code> tokens. You ship{" "}
          <code>E[tokens]</code> in that wall-clock window.
        </p>
        <p>
          With a draft that's ~10× cheaper than the target,{" "}
          <code>c ≈ 0.1</code>. For Llama-3-70B paired with a 1B draft on
          the same hardware, that ratio is realistic.
        </p>
        <Equation>
          α = 0.8, k = 5, c = 0.1 ⟹ E[tokens] ≈ 3.36, speedup ≈{" "}
          <span className="text-lime">2.24×</span>
        </Equation>

        <h2 id="cliff">The α–k cliff</h2>
        <p>
          The optimal <code>k</code> depends on <code>α</code> and{" "}
          <code>c</code>. Push <code>k</code> too high and you spend draft time
          on tokens you'll throw away. Push it too low and you don't amortise
          the verifier.
        </p>
        <p>Differentiating the speedup formula and solving gives:</p>
        <Equation>
          k<sup>*</sup> = argmax<sub>k</sub> &nbsp;{" "}
          <span className="text-lime">(1 − α^(k+1)) / [(1 − α)(1 + c · k)]</span>
        </Equation>
        <NumTable
          caption="optimal k at c = 0.15"
          headers={["α", "best k", "speedup"]}
          rows={[
            ["0.50", 2, "1.32×"],
            ["0.70", 3, "1.74×"],
            ["0.85", 5, "2.50×"],
            ["0.90", 6, "2.99×"],
            ["0.95", 8, "3.93×"],
          ]}
        />
        <Callout kind="warn">
          If your <code>α &lt; 0.55</code>, almost no choice of <code>k</code>{" "}
          will net a meaningful win — the draft is too misaligned with the
          target. Don't tune <code>k</code>; train (or pick) a better draft.
        </Callout>

        <h2 id="variants">Where the draft comes from</h2>
        <p>
          "Speculative decoding" has come to mean a whole family of techniques
          that differ on the answer to one question:{" "}
          <em>where does the draft come from?</em>
        </p>
        <NumTable
          caption="comparison · all numbers indicative"
          headers={["variant", "draft source", "α (typical)", "extra train cost"]}
          rows={[
            ["Vanilla spec (Leviathan)", "separate small LM", "0.6–0.85", "low"],
            ["Medusa", "extra heads on target", "0.6–0.75", "moderate"],
            ["EAGLE", "tiny net on hidden states", "0.8–0.9", "moderate"],
            ["Lookahead decoding", "Jacobi iteration on target", "spiky", "none"],
            ["Tree-attn (SpecInfer, EAGLE-2)", "multi-branch draft tree", "≥0.85 eff.", "moderate"],
          ]}
        />
        <p>
          Tree attention is the next obvious step once you've squeezed plain
          speculative — you draft a small tree of candidate continuations and
          accept along the best path. With shared KV across branches, this is
          almost free verification-side, and pushes effective <code>α</code>{" "}
          well above the single-branch ceiling.
        </p>

        <h2 id="doesnt-help">What it doesn't help</h2>
        <ul>
          <li>
            <strong>TTFT.</strong> You still pay one full prefill before you
            can draft anything. See the{" "}
            <Link href="/notes/ttft">TTFT post</Link>.
          </li>
          <li>
            <strong>Memory-bound batch=1 decode where weights dominate.</strong>{" "}
            Spec helps when the bottleneck is "one forward per token"; if your
            target is small and decode is already cheap, gains are marginal.
          </li>
          <li>
            <strong>Highly creative sampling.</strong> Higher temperature →
            lower α → smaller speedup. At <code>T = 1.5</code>, expect 60–70%
            of the speedup you saw at <code>T = 0.7</code>.
          </li>
        </ul>

        <h2 id="tuning">Tuning checklist</h2>
        <Callout kind="tip" title="getting speculative right">
          <ol className="space-y-1">
            <li>Measure α on a representative eval set, not on the prompts that look easy.</li>
            <li>Set k from the table at your measured α and c.</li>
            <li>Track <em>committed-tokens-per-target-forward</em> as your north-star metric.</li>
            <li>Watch P99, not P50 — variance is the real cost of speculative.</li>
            <li>If α drops &gt; 5% week over week, the draft has drifted. Refresh it.</li>
          </ol>
        </Callout>

        <hr />

        <p className="text-muted-foreground">
          Related:{" "}
          <Link href="/notes/ttft">
            How to estimate LLM time-to-first-token
          </Link>
          .
        </p>
      </ArticleShell>

      <section className="border-b border-white/[0.06] bg-ink-950 py-16">
        <div className="container mx-auto px-6">
          <div className="mx-auto flex max-w-3xl flex-col items-start justify-between gap-4 rounded-lg border border-white/[0.08] bg-ink-800/40 p-6 md:flex-row md:items-center">
            <div>
              <div className="label-mono mb-1">// next</div>
              <h3 className="text-lg font-semibold text-white">
                How to estimate LLM time-to-first-token
              </h3>
            </div>
            <Link
              href="/notes/ttft"
              className="inline-flex items-center gap-1.5 rounded-md bg-lime px-4 py-2.5 font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-900 hover:bg-lime-400"
            >
              read it <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
