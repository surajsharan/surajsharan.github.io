"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface Token {
  text: string
  color: string
}

interface AttentionWeight {
  from: number
  to: number
  weight: number
}

const AttentionVisualization = () => {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Sample tokens for visualization
  const tokens: Token[] = [
    { text: "Attention", color: "#8b5cf6" },
    { text: "is", color: "#3b82f6" },
    { text: "all", color: "#ec4899" },
    { text: "you", color: "#10b981" },
    { text: "need", color: "#f59e0b" },
  ]

  // Sample attention weights
  const attentionWeights: AttentionWeight[] = [
    { from: 0, to: 0, weight: 0.7 },
    { from: 0, to: 1, weight: 0.1 },
    { from: 0, to: 2, weight: 0.8 },
    { from: 0, to: 3, weight: 0.3 },
    { from: 0, to: 4, weight: 0.5 },
    { from: 1, to: 0, weight: 0.2 },
    { from: 1, to: 1, weight: 0.9 },
    { from: 1, to: 2, weight: 0.4 },
    { from: 1, to: 3, weight: 0.1 },
    { from: 1, to: 4, weight: 0.3 },
  ]

  // Animation steps
  const steps = [
    "initial", // Initial state
    "query", // Show query vectors
    "key", // Show key vectors
    "qk", // Show query-key product
    "softmax", // Show softmax normalization
    "value", // Show value vectors
    "output", // Show final output
  ]

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setStep((prev) => {
          const nextStep = (prev + 1) % steps.length
          if (nextStep === 0 && prev === steps.length - 1) {
            setPlaying(false)
            return 0
          }
          return nextStep
        })
      }, 2000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [playing, steps.length])

  const togglePlay = () => {
    setPlaying(!playing)
  }

  const resetAnimation = () => {
    setStep(0)
    setPlaying(false)
  }

  const goToStep = (stepIndex: number) => {
    setStep(stepIndex)
    setPlaying(false)
  }

  // Get visible attention weights based on current step
  const getVisibleWeights = () => {
    if (step < 3) return []
    return attentionWeights.filter((_, index) => index < 5) // Only show weights for the first token for simplicity
  }

  // Get opacity for attention lines based on step and weight
  const getLineOpacity = (weight: number) => {
    if (step < 4) return 0.3
    return Math.min(weight + 0.2, 0.9)
  }

  // Get line width based on weight
  const getLineWidth = (weight: number) => {
    return 1 + weight * 3
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 my-8">
      <h3 className="text-2xl font-bold text-center mb-6 text-neutral-900">Attention Mechanism Explained</h3>

      <div className="relative h-[400px] border border-gray-200 rounded-lg bg-gray-50 mb-6">
        {/* Tokens at the top */}
        <div className="absolute top-6 left-0 right-0 flex justify-center space-x-12">
          {tokens.map((token, idx) => (
            <motion.div
              key={`token-${idx}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center"
            >
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: token.color }}
              >
                {token.text.charAt(0)}
              </div>
              <span className="mt-2 text-sm font-medium">{token.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Attention lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {getVisibleWeights().map((weight, idx) => (
            <motion.line
              key={`line-${idx}`}
              x1="50%"
              y1="180"
              x2={`${weight.to * 96 + 96}px`}
              y2="70"
              stroke={tokens[0].color}
              strokeWidth={getLineWidth(weight.weight)}
              strokeOpacity={getLineOpacity(weight.weight)}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: step >= 4 ? 1 : 0.5 }}
              transition={{ duration: 1 }}
            />
          ))}
        </svg>

        {/* Query, Key, Value vectors */}
        <div className="absolute top-[180px] left-0 right-0 flex justify-center space-x-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            className="flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-lg bg-purple-100 border-2 border-purple-500 flex items-center justify-center">
              <span className="font-mono text-sm">{step >= 1 ? "[0.7, 0.2]" : ""}</span>
            </div>
            <span className="mt-2 text-sm font-bold text-purple-600">Query (Q)</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 2 ? 1 : 0 }}
            className="flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-lg bg-blue-100 border-2 border-blue-500 flex items-center justify-center">
              <span className="font-mono text-sm">{step >= 2 ? "[0.8, 0.3]" : ""}</span>
            </div>
            <span className="mt-2 text-sm font-bold text-blue-600">Key (K)</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 5 ? 1 : 0 }}
            className="flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-lg bg-green-100 border-2 border-green-500 flex items-center justify-center">
              <span className="font-mono text-sm">{step >= 5 ? "[0.5, 0.9]" : ""}</span>
            </div>
            <span className="mt-2 text-sm font-bold text-green-600">Value (V)</span>
          </motion.div>
        </div>

        {/* Attention equation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 3 ? 1 : 0 }}
          className="absolute bottom-6 left-0 right-0 flex justify-center"
        >
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="font-mono text-sm mb-2">
              {step >= 3 && step < 4 && "QK^T = Attention Scores"}
              {step >= 4 && step < 5 && "softmax(QK^T / √d) = Attention Weights"}
              {step >= 5 && step < 6 && "Attention(Q,K,V) = softmax(QK^T / √d) × V"}
              {step >= 6 && "Output = Weighted sum of values"}
            </div>
            {step >= 4 && (
              <div className="grid grid-cols-5 gap-1 mt-2">
                {tokens.map((_, idx) => (
                  <div
                    key={`weight-${idx}`}
                    className="w-12 h-8 flex items-center justify-center text-xs bg-gray-100 rounded"
                  >
                    {idx < attentionWeights.length / 2 ? attentionWeights[idx].weight.toFixed(1) : "..."}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Step indicator */}
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm font-medium">Step: {steps[step]}</div>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={togglePlay}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          {playing ? "Pause" : "Play"}
        </button>
        <button
          onClick={resetAnimation}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Step buttons */}
      <div className="flex justify-center flex-wrap gap-2">
        {steps.map((stepName, idx) => (
          <button
            key={stepName}
            onClick={() => goToStep(idx)}
            className={`px-3 py-1 rounded-md text-sm ${
              step === idx ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {stepName}
          </button>
        ))}
      </div>

      {/* Explanation */}
      <div className="mt-6 text-sm text-gray-700">
        <p className="mb-2">
          <strong>How Attention Works:</strong>
        </p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Input tokens are transformed into Query (Q), Key (K), and Value (V) vectors</li>
          <li>Attention scores are computed as dot products between Query and Key vectors (QK^T)</li>
          <li>Scores are scaled (divided by √d) and normalized using softmax to get attention weights</li>
          <li>The output is a weighted sum of Value vectors, where weights are the attention weights</li>
        </ol>
      </div>
    </div>
  )
}

export default AttentionVisualization
