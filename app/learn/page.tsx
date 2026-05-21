import Navbar from "@/components/navbar"
import Footer from "@/components/sections/footer"
import EnhancedAttentionVisualization from "@/components/neural-network/enhanced-attention-visualization"

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-ink-900 text-white">
      <Navbar />

      <div className="learn-section pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="label-mono mb-4">// learn</div>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Understanding{" "}
              <span className="gradient-lime-text">self-attention.</span>
            </h1>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              An interactive walk-through of the mechanism that powers every
              modern transformer — from token embeddings to the final output.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl rounded-lg border border-white/[0.08] bg-ink-800/60 p-6 backdrop-blur-md">
            <h2 className="text-2xl font-semibold text-white">
              Self-Attention Mechanism
            </h2>
            <p className="mt-3 leading-relaxed text-white/75">
              Self-attention lets a transformer weigh the importance of every
              other token when encoding the current one. It's what enables
              models like GPT and BERT to understand context and relationships
              between words in a sentence.
            </p>
            <p className="mt-3 leading-relaxed text-white/75">
              The visualization below shows the flow step by step — from the
              initial token embeddings, through query/key/value projection, into
              attention scores, and out to the final contextual representations.
            </p>
          </div>

          <div className="mt-12">
            <EnhancedAttentionVisualization />
          </div>

          <div className="mx-auto mt-12 max-w-4xl rounded-lg border border-white/[0.08] bg-ink-800/60 p-6 backdrop-blur-md">
            <h2 className="text-2xl font-semibold text-white">
              Why Self-Attention Matters
            </h2>
            <p className="mt-3 leading-relaxed text-white/75">
              Self-attention has reshaped sequence modelling. A few reasons it
              matters:
            </p>
            <ul className="mt-4 space-y-2 pl-5 text-white/75">
              <li className="list-disc">
                Captures long-range dependencies without the limitations of RNNs
                or CNNs.
              </li>
              <li className="list-disc">
                Processes all positions in parallel, which makes training
                massively more efficient.
              </li>
              <li className="list-disc">
                Provides interpretable attention weights, showing which inputs
                drove each output.
              </li>
              <li className="list-disc">
                Scales cleanly to very large models and datasets.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
