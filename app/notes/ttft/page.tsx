import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/sections/footer"
import ArticleShell from "@/components/notes/article-shell"
import { Callout, CodeBlock, Equation, NumTable } from "@/components/notes/blocks"

const TOC = [
  { id: "what-counts", label: "What counts as TTFT" },
  { id: "prefill", label: "Prefill is the term that matters" },
  { id: "flops", label: "Counting the FLOPs" },
  { id: "roofline", label: "Roofline: compute vs memory" },
  { id: "worked", label: "A worked example" },
  { id: "attention", label: "When attention starts to matter" },
  { id: "first-decode", label: "The first decode forward" },
  { id: "levers", label: "Levers that actually move TTFT" },
  { id: "checklist", label: "Estimation checklist" },
]

export default function TtftPost() {
  return (
    <main className="min-h-screen bg-ink-900 text-white">
      <Navbar />

      <ArticleShell
        tag="// notes · serving · latency"
        title={
          <>
            How to estimate{" "}
            <span className="gradient-lime-text">LLM Time-to-First-Token.</span>
          </>
        }
        dek="A back-of-the-envelope guide to predicting TTFT from FLOPs, bandwidth, and prompt length — and to knowing which lever to pull when it's too slow."
        date="2026 · 05"
        readingTime="11 min"
        toc={TOC}
      >
        <p>
          TTFT — <strong>time to first token</strong> — is the latency users
          actually feel. It's the wall-clock interval from "I hit enter" to "the
          first token shows up." Almost every recent jump in LLM serving
          performance, from <code>vLLM</code> to <code>TensorRT-LLM</code> to
          chunked prefill, is in some way an attack on TTFT. So it's worth
          knowing how to estimate it with a pencil before you reach for a
          profiler.
        </p>
        <p>
          This post draws on the framing in{" "}
          <a
            href="https://apxml.com/posts/how-to-estimate-llm-time-to-first-token-ttft"
            target="_blank"
            rel="noopener noreferrer"
          >
            apxml.com's TTFT estimator
          </a>{" "}
          and fills in the math I keep on the back of an envelope.
        </p>

        <h2 id="what-counts">What counts as TTFT</h2>
        <p>
          Strictly: the time from the request hitting your serving endpoint to
          the first token byte being written to the wire.
        </p>
        <Equation label="components of TTFT">
          TTFT ≈ <span className="text-lime">T_queue</span> + T_tok + T_prefill
          + T_decode₁ + T_stream
        </Equation>
        <p>
          In production, two of these dominate everything else:{" "}
          <code>T_queue</code> (how long your request waited in the scheduler)
          and <code>T_prefill</code> (the forward pass over your prompt). The
          other terms — tokenization, the first decode forward, and the bytes
          flushing to the client — add up to a few milliseconds at most.
        </p>
        <Callout kind="note">
          Don't conflate TTFT with <em>throughput</em>. Throughput is your
          steady-state tokens/sec across all in-flight requests. TTFT is the
          P50/P95/P99 of <em>per-request</em> first-byte latency. The two
          optimisations are different — sometimes opposite.
        </Callout>

        <h2 id="prefill">Prefill is the term that matters</h2>
        <p>
          Once your request is at the head of the queue, the GPU has to chew
          through the entire prompt in <strong>one forward pass</strong>. This
          builds the KV-cache that decode will then sample from. That single
          forward pass is the prefill, and it's where 70–95% of TTFT lives for
          any non-trivial prompt.
        </p>
        <p>
          Prefill is special compared to decode for one reason:{" "}
          <strong>it's a sequence of length N, not 1</strong>. Every weight in
          the model is loaded once from HBM and reused across all N positions.
          That changes the bottleneck dramatically.
        </p>

        <h2 id="flops">Counting the FLOPs</h2>
        <p>
          The forward pass through a dense transformer touches each non-embedding
          parameter twice per token (one multiply, one add). So the linear
          (weight-matmul) part of a forward pass is:
        </p>
        <Equation label="linear FLOPs">
          FLOPs<sub>linear</sub> ≈ <span className="text-lime">2 · P · N</span>{" "}
          &nbsp;(P = params, N = tokens)
        </Equation>
        <p>
          Self-attention adds a quadratic term — it computes an N×N score
          matrix per attention head per layer:
        </p>
        <Equation label="attention FLOPs">
          FLOPs<sub>attn</sub> ≈{" "}
          <span className="text-lime">4 · L · h · d · N²</span>
        </Equation>
        <p>
          where L is layers, h is attention heads (or KV heads for GQA on the K
          and V projections), and d is the head dimension. For short prompts
          this term is dust; at long context it can outgrow the linear part.
          More on that in a minute.
        </p>

        <h2 id="roofline">Roofline: compute or memory?</h2>
        <p>
          You can't just divide FLOPs by peak TFLOPS — the GPU may be waiting
          on HBM instead. The{" "}
          <a
            href="https://en.wikipedia.org/wiki/Roofline_model"
            target="_blank"
            rel="noopener noreferrer"
          >
            roofline model
          </a>{" "}
          says you're bounded by the worse of two terms:
        </p>
        <Equation label="roofline">
          T ≈ max( <span className="text-lime">FLOPs / (FLOPS · MFU)</span>,{" "}
          <span className="text-lime">bytes / (BW · MBU)</span> )
        </Equation>
        <p>
          The crossover is <strong>arithmetic intensity</strong> — FLOPs per
          byte loaded. For a transformer weight matmul the weights are bytes,
          and you do roughly 2·N ops per byte (each weight participates in N
          token-multiplies, twice). So your AI for prefill is:
        </p>
        <Equation label="prefill arithmetic intensity">
          AI<sub>prefill</sub> ≈ <span className="text-lime">N</span>{" "}
          (BF16, weights only)
        </Equation>
        <p>
          Compare to the GPU's <em>ridge point</em> (peak FLOPS ÷ peak HBM
          bandwidth):
        </p>
        <NumTable
          caption="ridge point ≈ ops/byte you need to be compute-bound (BF16 dense)"
          headers={["GPU", "Peak BF16 TFLOPS", "HBM BW", "Ridge point"]}
          rows={[
            ["A100 80GB", "312", "2.0 TB/s", "~156 FLOPs/byte"],
            ["H100 80GB", "989", "3.35 TB/s", "~295 FLOPs/byte"],
            ["H200 141GB", "989", "4.8 TB/s", "~206 FLOPs/byte"],
            ["MI300X", "1307", "5.3 TB/s", "~247 FLOPs/byte"],
          ]}
        />
        <Callout kind="tip" title="rule of thumb">
          On an H100, prefill becomes compute-bound around{" "}
          <strong>N ≳ 300 tokens</strong>. Below that, you're bandwidth-bound
          and TTFT tracks HBM, not FLOPS. <em>Batching helps short prompts.</em>
        </Callout>

        <h2 id="worked">A worked example: Llama-3-8B, 2k tokens, H100</h2>
        <p>Plug in real numbers.</p>
        <NumTable
          caption="Llama-3-8B sketch"
          headers={["quantity", "value"]}
          rows={[
            ["params P", "8.0 × 10⁹"],
            ["layers L", "32"],
            ["heads (Q / KV)", "32 / 8 (GQA)"],
            ["head dim d", "128"],
            ["prompt length N", "2048"],
            ["dtype", "BF16"],
          ]}
        />
        <p>Linear FLOPs first:</p>
        <Equation>
          2 · 8 × 10⁹ · 2048 = <span className="text-lime">32.8 TFLOPs</span>
        </Equation>
        <p>Attention FLOPs:</p>
        <Equation>
          4 · 32 · 32 · 128 · 2048² ={" "}
          <span className="text-lime">≈ 2.2 TFLOPs</span> (6.5% of total)
        </Equation>
        <p>
          With H100 BF16 peak 989 TFLOPS and a realistic{" "}
          <strong>MFU of 0.45</strong> for prefill (typical for vLLM /
          TensorRT-LLM batched prefill):
        </p>
        <Equation label="prefill, compute-bound">
          T<sub>prefill</sub> ≈ (32.8 + 2.2) / (989 · 0.45) ≈{" "}
          <span className="text-lime">79 ms</span>
        </Equation>
        <p>
          Add ~5 ms for the first decode forward (next section), a couple of ms
          for tokenization, and the streaming flush. If the request waited in
          the scheduler — say 20 ms under load — your TTFT lands near{" "}
          <strong>~105 ms</strong>. That's a plausible P50 for a healthy
          deployment.
        </p>

        <Callout kind="warn">
          MFU is a vibes number, not a constant. Prefill MFU varies 0.3–0.6
          depending on tensor parallelism, attention impl (FlashAttention
          helps), and how well the kernel scheduler fuses ops. Always sanity
          check against your actual stack.
        </Callout>

        <h2 id="attention">When attention starts to matter</h2>
        <p>
          The linear term grows as N. The attention term grows as N². Where do
          they meet?
        </p>
        <Equation label="crossover length">
          2 · P · N = 4 · L · h · d · N² &nbsp; ⟹ &nbsp; N<sub>×</sub> ≈{" "}
          <span className="text-lime">P / (2 · L · h · d)</span>
        </Equation>
        <p>
          For Llama-3-8B that's <code>8e9 / (2·32·32·128) ≈ 30,500 tokens</code>.
          So under ~30k context the linear term still dominates; past that,
          attention starts eating prefill time. This is exactly why{" "}
          <strong>FlashAttention 2/3</strong> and{" "}
          <strong>chunked attention kernels</strong> matter more at long
          context — they don't change the FLOP count, but they cut HBM traffic
          inside attention by an order of magnitude.
        </p>

        <h2 id="first-decode">The first decode forward</h2>
        <p>
          After prefill, you do one more forward pass with N=1 to sample the
          first output token. This one is <em>memory-bound</em>: AI ≈ 1, far
          below the ridge point. The cost is reading the model weights from
          HBM one more time.
        </p>
        <Equation label="first decode, memory-bound">
          T<sub>decode₁</sub> ≈ 2 · P · sizeof(dtype) / (BW · MBU)
        </Equation>
        <p>
          For Llama-3-8B on H100 with MBU ≈ 0.7:{" "}
          <code>16 GB / (3350 · 0.7) ≈ 6.8 ms</code>. The KV-cache also has to
          be read, but for a 2k context with GQA it's only ~270 MB — under a
          millisecond.
        </p>
        <Callout kind="note">
          This is also why decode (token-by-token) is{" "}
          <em>always memory-bound</em> at batch size 1. Speculative decoding
          beats this by verifying multiple tokens in one forward — see the{" "}
          <Link href="/notes/speculative-decoding">companion post</Link>.
        </Callout>

        <h2 id="levers">Levers that actually move TTFT</h2>
        <h3>Things that help</h3>
        <ul>
          <li>
            <strong>Prefix caching.</strong> If a prompt shares a prefix with a
            recent one (system prompt, few-shot examples), reuse its
            KV-cache. This skips the most expensive part of prefill entirely.
            Easy 3–10× win on system-prompt-heavy workloads.
          </li>
          <li>
            <strong>FP8 / INT8 weights.</strong> Halves the bytes you load and
            roughly doubles your compute throughput on H100 / MI300X. Direct
            ~1.6–1.9× prefill speedup with FP8.
          </li>
          <li>
            <strong>FlashAttention 2/3.</strong> Eliminates the materialisation
            of the N×N score matrix in HBM. Marginal at short context, huge
            past 16k.
          </li>
          <li>
            <strong>Paged attention + continuous batching.</strong> Doesn't
            speed up <em>your</em> prefill, but cuts <code>T_queue</code> by
            letting more requests share the GPU efficiently. P99 TTFT lives or
            dies here.
          </li>
          <li>
            <strong>Tensor / pipeline parallelism.</strong> More FLOPS at the
            cost of inter-GPU comms. Below ~1k tokens, comms overhead can
            <em>increase</em> TTFT.
          </li>
        </ul>

        <h3>Things that don't help TTFT (even if they help other things)</h3>
        <ul>
          <li>
            <strong>Speculative decoding.</strong> Helps ITL (inter-token
            latency) — i.e. tokens after the first — but TTFT is the same. You
            still pay one full prefill.
          </li>
          <li>
            <strong>Bigger batches.</strong> Improves throughput, often hurts
            P99 TTFT under load.
          </li>
          <li>
            <strong>Sampling tricks (top-k, top-p).</strong> The cost of
            sampling is negligible; you can't optimise here.
          </li>
        </ul>

        <h2 id="checklist">Estimation checklist</h2>
        <Callout kind="tip" title="estimating TTFT in one minute">
          <ol className="space-y-1">
            <li>Compute <code>2·P·N</code> linear FLOPs.</li>
            <li>If <code>N &gt; ~16k</code>, add the attention term.</li>
            <li>Divide by <code>peak_TFLOPS · 0.45</code> for prefill time.</li>
            <li>Add <code>2·P·sizeof(dtype) / (HBM_BW · 0.7)</code> for first decode.</li>
            <li>Add 10–30 ms for queue + scheduler + streaming flush.</li>
          </ol>
        </Callout>

        <p>
          If your measured TTFT is 2–3× higher than what this gives you, the
          problem is almost never the math — it's queueing, tokenizer overhead
          you forgot about, or an MFU on the floor because your kernels aren't
          fused. Start there.
        </p>

        <hr />

        <CodeBlock filename="ttft_estimator.py" lang="python">
{`def estimate_ttft(
    P: float,          # params
    N: int,            # prompt tokens
    L: int, h: int, d: int,  # layers, heads, head dim
    dtype_bytes: float,      # 2 for BF16, 1 for FP8
    peak_tflops: float,      # GPU peak (dense BF16 or FP8 equivalent)
    hbm_bw_gbs: float,       # HBM bandwidth
    mfu: float = 0.45,       # model FLOPs utilisation
    mbu: float = 0.70,       # memory bandwidth utilisation
    queue_ms: float = 15.0,  # scheduler + tokenize + flush
):
    linear_flops = 2 * P * N
    attn_flops   = 4 * L * h * d * N * N
    t_prefill_ms = 1e3 * (linear_flops + attn_flops) / (peak_tflops * 1e12 * mfu)

    weight_bytes  = 2 * P * dtype_bytes
    t_decode1_ms  = 1e3 * weight_bytes / (hbm_bw_gbs * 1e9 * mbu)

    return queue_ms + t_prefill_ms + t_decode1_ms`}
        </CodeBlock>

        <p>
          Run it for your model + GPU before you spin up a load test. If the
          numbers say 80 ms but you're getting 600 ms, the bottleneck isn't
          where you think it is.
        </p>

        <hr />

        <p className="text-muted-foreground">
          Related:{" "}
          <Link href="/notes/speculative-decoding">
            Speculative decoding, the math, and when it breaks
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
                Speculative decoding — the math, and when it breaks
              </h3>
            </div>
            <Link
              href="/notes/speculative-decoding"
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
