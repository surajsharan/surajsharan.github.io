"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import ActivationFunction from "@/components/neural-network/activation-function"
import { BrainCircuit, Code, Cpu, Database, LineChart, Network } from "lucide-react"

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-20 bg-gray-50 text-neutral-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Me</h2>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
              <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-purple-600 to-blue-500 p-1">
                {/* Profile image */}
                <img
                  src="/images/suraj-profile.png"
                  alt="Suraj Sharan"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="flex justify-center mt-6 space-x-4">
                <ActivationFunction type="relu" color="#8b5cf6" />
                <ActivationFunction type="sigmoid" color="#3b82f6" />
                <ActivationFunction type="tanh" color="#ec4899" />
              </div>
            </div>

            <div className="md:col-span-2">
              <p className="text-lg mb-4">
                Hello! I'm <strong>Suraj Sharan</strong>, an <strong>Applied AI/ML Engineer</strong> driven by the challenge of translating cutting-edge research into deployable, high-impact systems.
              </p>
              <p className="text-lg mb-4">
                My work lies at the intersection of <strong>multimodal learning</strong>, <strong>edge-based computer vision</strong>, and <strong>vision-language models (VLMs)</strong>.
                I specialize in architecting models that can <em>see</em>, <em>read</em>, and <em>reason</em> — whether that's enabling real-time scene understanding
                on low-power edge devices or fine-tuning large-scale VLMs for domain-specific tasks.
              </p>
              <p className="text-lg mb-6">
                I take pride in bridging the gap between research and production — whether it's fine-tuning LLMs for structured understanding
                or compressing models for edge deployment.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                <div className="flex items-center">
                  <BrainCircuit className="h-5 w-5 text-purple-600 mr-2" />
                  <span>Deep Learning</span>
                </div>
                <div className="flex items-center">
                  <Cpu className="h-5 w-5 text-blue-600 mr-2" />
                  <span>CNN Architecture</span>
                </div>
                <div className="flex items-center">
                  <Code className="h-5 w-5 text-pink-600 mr-2" />
                  <span>PyTorch/TensorFlow</span>
                </div>
                <div className="flex items-center">
                  <Database className="h-5 w-5 text-green-600 mr-2" />
                  <span>RAG</span>
                </div>
                <div className="flex items-center">
                  <LineChart className="h-5 w-5 text-yellow-600 mr-2" />
                  <span>Model Evaluation</span>
                </div>
                <div className="flex items-center">
                  <Network className="h-5 w-5 text-red-600 mr-2" />
                  <span>Transfer Learning</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
