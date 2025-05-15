import Navbar from "@/components/navbar"
import Footer from "@/components/sections/footer"
import EnhancedAttentionVisualization from "@/components/neural-network/enhanced-attention-visualization"

export default function LearnPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-24 pb-16 learn-section">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-neutral-900">
                        Understanding Neural Networks
                    </h1>
                    <p className="text-lg text-center text-neutral-700 max-w-3xl mx-auto mb-12">
                        Explore the inner workings of modern neural network architectures and mechanisms
                    </p>

                    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-neutral-900">Self-Attention Mechanism</h2>
                        <p className="text-neutral-700 mb-4">
                            Self-attention is a key component in transformer models that allows the network to weigh the importance of
                            different parts of the input sequence. It's what enables models like GPT and BERT to understand context
                            and relationships between words in a sentence.
                        </p>
                        <p className="text-neutral-700 mb-8">
                            The interactive visualization below demonstrates how self-attention works step by step, from the initial
                            token embeddings to the final output representations.
                        </p>
                    </div>

                    <EnhancedAttentionVisualization />

                    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mt-12">
                        <h2 className="text-2xl font-bold mb-4 text-neutral-900">Why Self-Attention Matters</h2>
                        <p className="text-neutral-700 mb-4">
                            Self-attention has revolutionized natural language processing and other sequence modeling tasks for
                            several reasons:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-neutral-700 mb-4">
                            <li>
                                It captures long-range dependencies in sequences without the limitations of recurrent or convolutional
                                architectures
                            </li>
                            <li>It processes all positions in parallel, making training more efficient</li>
                            <li>It provides interpretable attention weights that show which parts of the input are most relevant</li>
                            <li>It scales effectively to very large models and datasets</li>
                        </ul>
                        <p className="text-neutral-700">
                            The success of self-attention in transformer models has led to breakthroughs in machine translation, text
                            generation, image recognition, and even protein structure prediction.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
