"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Grid, Info } from "lucide-react"
import React from "react"

interface Token {
  text: string
  color: string
  position: number
}

interface AttentionWeight {
  from: number
  to: number
  weight: number
}

const EnhancedAttentionVisualization = () => {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [showMatrix, setShowMatrix] = useState(false)
  const [activeToken, setActiveToken] = useState(0)
  const [showPositionalInfo, setShowPositionalInfo] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const tokenRefs = useRef<(HTMLDivElement | null)[]>([])
  const [blockCenters, setBlockCenters] = useState<{x: number, y: number}[]>([])

  // Sample tokens for visualization
  const tokens: Token[] = [
    { text: "A", color: "#8b5cf6", position: 0 },
    { text: "i", color: "#3b82f6", position: 1 },
    { text: "a", color: "#ec4899", position: 2 },
    { text: "y", color: "#10b981", position: 3 },
    { text: "n", color: "#f59e0b", position: 4 },
  ]

  // Generate attention weights matrix
  const generateAttentionWeights = () => {
    const weights: AttentionWeight[] = []
    for (let i = 0; i < tokens.length; i++) {
      for (let j = 0; j < tokens.length; j++) {
        let weight = Math.random()
        if (i === j) weight = Math.max(weight, 0.7)
        if (i === activeToken) {
          weights.push({ from: i, to: j, weight })
        }
      }
    }
    return weights
  }

  const attentionWeights = generateAttentionWeights()

  // Animation steps
  const steps = [
    { id: "initial", label: "Initial Tokens" },
    { id: "positional", label: "Positional Encoding" },
    { id: "embedding", label: "Token + Position" },
    { id: "query", label: "Query Vectors" },
    { id: "key", label: "Key Vectors" },
    { id: "qk", label: "Dot Product" },
    { id: "softmax", label: "Softmax" },
    { id: "value", label: "Value Selection" },
    { id: "output", label: "Final Output" },
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

  useEffect(() => {
    const centers = tokenRefs.current.map(ref => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        // Adjust for scroll and SVG container offset
        const svgRect = containerRef.current?.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - (svgRect?.left ?? 0),
          y: rect.top + rect.height - (svgRect?.top ?? 0)
        };
      }
      return { x: 0, y: 0 };
    });
    setBlockCenters(centers);
  }, [tokens.length, showMatrix, step]);

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

  const nextStep = () => {
    setStep((prev) => (prev + 1) % steps.length)
    setPlaying(false)
  }

  const prevStep = () => {
    setStep((prev) => (prev - 1 + steps.length) % steps.length)
    setPlaying(false)
  }

  const toggleMatrixView = () => {
    setShowMatrix(!showMatrix)
  }

  const togglePositionalInfo = () => {
    setShowPositionalInfo(!showPositionalInfo)
  }

  const selectToken = (index: number) => {
    setActiveToken(index)
    resetAnimation()
  }

  // Get opacity for attention lines based on step and weight
  const getLineOpacity = (weight: number, currentStep: number) => {
    if (currentStep < 6) return 0.3
    return Math.min(weight + 0.2, 0.9)
  }

  // Get line width based on weight
  const getLineWidth = (weight: number) => {
    return 1 + weight * 4
  }

  // Get color for attention line
  const getLineColor = (weight: number, type: string) => {
    // Different colors based on the type of connection
    if (type === "query") return "#8b5cf6" // Purple for Query
    if (type === "key") return "#ef4444" // Red for Key
    if (type === "value") return "#10b981" // Green for Value
    if (type === "positional") return "#f59e0b" // Orange for Positional

    // Purple gradient based on weight for attention
    const r = Math.floor(139 - 50 * weight)
    const g = Math.floor(92 - 30 * weight)
    const b = Math.floor(246)
    return `rgba(${r}, ${g}, ${b}, ${getLineOpacity(weight, step)})`
  }

  // Get equation based on current step
  const getEquation = () => {
    switch (step) {
      case 0:
        return "Input Tokens"
      case 1:
        return "PE(pos, 2i) = sin(pos/10000^(2i/d_model))"
      case 2:
        return "X = Embedding + PositionalEncoding"
      case 3:
        return "Q = W^Q × X"
      case 4:
        return "K = W^K × X"
      case 5:
        return "Scores = Q × K^T"
      case 6:
        return "Attention = softmax(Scores / √d_k)"
      case 7:
        return "V = W^V × X"
      case 8:
        return "Output = Attention × V"
      default:
        return ""
    }
  }

  // Generate positional encoding values (simplified for visualization)
  const getPositionalEncoding = (position: number, dim: number) => {
    // Simplified positional encoding for visualization
    if (dim % 2 === 0) {
      return Math.sin(position / Math.pow(10000, dim / 64))
    } else {
      return Math.cos(position / Math.pow(10000, (dim - 1) / 64))
    }
  }

  // Generate a visual representation of positional encoding
  const generatePositionalVector = (position: number) => {
    const vector = []
    for (let i = 0; i < 4; i++) {
      vector.push(getPositionalEncoding(position, i))
    }
    return vector
  }

  // Calculate token positions for SVG paths - with wider spacing to use full width
  const tokenPositions = tokens.map((_, idx) => ({
    x: 300 + idx * 200,
    y: 100,
  }))

  // Calculate vector positions - further improved layout with better spacing
  const queryPosition = { x: 400, y: 350 }
  const keyPosition = { x: 1000, y: 350 }
  const dotProductPosition = { x: 700, y: 430 }
  const valuePosition = { x: 700, y: 550 }
  const outputPosition = { x: 700, y: 650 }

  // Function to check if an element should be shown at current step
  const shouldShowAtStep = (elementStep: number) => {
    return step >= elementStep;
  }

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-xl p-6 my-8" ref={containerRef}>
      {/* Title and Subtitle */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-neutral-900 mb-2">Self-Attention Mechanism with Positional Encoding</h3>
        <p className="text-neutral-600">
          Visualizing how tokens and their positions are processed in transformer models
        </p>
      </div>

      {/* Main Visualization Area */}
      <div className="relative h-[800px] border border-gray-200 rounded-lg bg-gradient-to-b from-gray-50 to-white mb-6 overflow-hidden">
        {/* Toggle Matrix View Button */}
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
          <button
            onClick={togglePositionalInfo}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            title="Toggle Positional Info"
          >
            <Info size={20} className={showPositionalInfo ? "text-orange-500" : "text-gray-600"} />
          </button>
          <button
            onClick={toggleMatrixView}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            title="Toggle Matrix View"
          >
            <Grid size={20} className={showMatrix ? "text-purple-600" : "text-gray-600"} />
          </button>
        </div>

        {/* Step indicator */}
        <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-full shadow-md text-sm font-medium text-purple-600 border border-purple-200">
          Step {step + 1}: {steps[step].label}
        </div>

        {showMatrix ? (
          // Matrix View
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              <h4 className="text-center font-semibold mb-4 text-neutral-800">Attention Matrix</h4>
              <div className="grid grid-cols-6 gap-1">
                <div className=""></div>
                {tokens.map((token, idx) => (
                  <div
                    key={`col-${idx}`}
                    className="h-10 flex items-center justify-center text-xs font-medium bg-gray-100 rounded p-1"
                    style={{ color: token.color }}
                  >
                    {token.text}
                  </div>
                ))}

                {tokens.map((rowToken, i) => (
                  <React.Fragment key={`matrix-row-${i}`}>
                    <div
                      key={`row-${i}`}
                      className="h-10 flex items-center justify-center text-xs font-medium bg-gray-100 rounded p-1"
                      style={{ color: rowToken.color }}
                    >
                      {rowToken.text}
                    </div>
                    {tokens.map((colToken, j) => {
                      const weight = Math.random() * 0.5 + (i === j ? 0.5 : 0)
                      const bgColor = `rgba(139, 92, 246, ${weight.toFixed(2)})`
                      return (
                        <div
                          key={`cell-${i}-${j}`}
                          className="h-10 flex items-center justify-center text-xs rounded"
                          style={{
                            backgroundColor: bgColor,
                            color: weight > 0.5 ? "white" : "black",
                          }}
                        >
                          {weight.toFixed(2)}
                        </div>
                      )
                    })}
                  </React.Fragment>
                ))}
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-center">
                  <div className="w-full h-4 bg-gradient-to-r from-purple-100 to-purple-600 rounded-full"></div>
                </div>
                <div className="flex justify-between text-xs text-neutral-600 mt-1">
                  <span>Low Attention (0.0)</span>
                  <span>High Attention (1.0)</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Standard Visualization
          <>
            {/* Tokens at the top */}
            <div className="absolute top-16 left-0 right-0 flex justify-center space-x-28 px-4">
              {tokens.map((token: Token, idx: number) => (
                <motion.div
                  key={`token-${idx}`}
                  ref={el => { tokenRefs.current[idx] = el; }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center"
                  onClick={() => selectToken(idx)}
                >
                  <div
                    className={`w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold shadow-lg cursor-pointer transition-transform hover:scale-105 border-2 ${activeToken === idx ? "ring-2 ring-offset-2 ring-purple-500 border-white" : "border-transparent"
                      }`}
                    style={{ backgroundColor: token.color }}
                  >
                    {token.text}
                  </div>
                  <div className="mt-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-md text-xs font-mono">
                    pos={token.position}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* SVG for all connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Positional encoding connections - visible in step 1 and onward */}
              {shouldShowAtStep(1) && (
                <>
                  {blockCenters.map((center, idx) => (
                    <motion.line
                      key={`pos-line-${idx}`}
                      x1={center.x - 20}
                      y1={center.y - 85}
                      x2={center.x - 20}
                      y2={center.y - 32}
                      stroke={getLineColor(0.8, "positional")}
                      strokeWidth={2}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  ))}
                </>
              )}

              {/* Query connections - visible in step 3 and onward */}
              {shouldShowAtStep(3) && (
                <>
                  {tokens.map((token, idx) => {
                    // Generate a unique color based on token color but translucent
                    const tokenColorBase = token.color;
                    const [r, g, b] = [
                      parseInt(tokenColorBase.slice(1, 3), 16),
                      parseInt(tokenColorBase.slice(3, 5), 16),
                      parseInt(tokenColorBase.slice(5, 7), 16)
                    ];

                    return (
                      <motion.path
                        key={`query-${idx}`}
                        d={`M ${blockCenters[idx]?.x - 20} ${blockCenters[idx]?.y - 85}
                           C ${blockCenters[idx]?.x - 20} ${(blockCenters[idx]?.y - 85 + queryPosition.y) / 2},
                             ${queryPosition.x + (idx - 2) * 10} ${(blockCenters[idx]?.y - 85 + queryPosition.y) / 2 + 40},
                             ${queryPosition.x} ${queryPosition.y - 30}`}
                        fill="none"
                        stroke={idx === activeToken ? getLineColor(0.9, "query") : `rgba(${r}, ${g}, ${b}, 0.4)`}
                        strokeWidth={idx === activeToken ? 3 : 1.5}
                        strokeOpacity={idx === activeToken ? 0.9 : 0.5}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8 }}
                      />
                    );
                  })}
                </>
              )}

              {/* Key connections - visible in step 4 and onward */}
              {shouldShowAtStep(4) && (
                <>
                  {tokens.map((token, idx) => {
                    // Generate a unique color based on token color but translucent
                    const tokenColorBase = token.color;
                    const [r, g, b] = [
                      parseInt(tokenColorBase.slice(1, 3), 16),
                      parseInt(tokenColorBase.slice(3, 5), 16),
                      parseInt(tokenColorBase.slice(5, 7), 16)
                    ];

                    return (
                      <motion.path
                        key={`key-${idx}`}
                        d={`M ${blockCenters[idx]?.x - 20} ${blockCenters[idx]?.y - 85}
                           C ${blockCenters[idx]?.x - 20} ${(blockCenters[idx]?.y - 85 + keyPosition.y) / 2},
                             ${keyPosition.x + (idx - 2) * 10} ${(blockCenters[idx]?.y - 85 + keyPosition.y) / 2 + 40},
                             ${keyPosition.x} ${keyPosition.y - 30}`}
                        fill="none"
                        stroke={idx === activeToken ? "#ef4444" : `rgba(${r}, ${g}, ${b}, 0.4)`}
                        strokeWidth={idx === activeToken ? 3 : 1.5}
                        strokeOpacity={idx === activeToken ? 0.9 : 0.5}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8 }}
                      />
                    );
                  })}
                </>
              )}

              {/* Dot product connections - visible in step 5 and onward */}
              {shouldShowAtStep(5) && (
                <>
                  {/* Query to dot product */}
                  <motion.path
                    key="query-to-dot"
                    d={`M ${queryPosition.x + 70} ${queryPosition.y} 
                           C ${queryPosition.x + 200} ${queryPosition.y + 20}, 
                             ${dotProductPosition.x - 140} ${dotProductPosition.y - 40}, 
                             ${dotProductPosition.x - 80} ${dotProductPosition.y - 10}`}
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    strokeOpacity={0.8}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8 }}
                  />

                  {/* Key to dot product */}
                  <motion.path
                    key="key-to-dot"
                    d={`M ${keyPosition.x - 70} ${keyPosition.y} 
                           C ${keyPosition.x - 200} ${keyPosition.y + 20}, 
                             ${dotProductPosition.x + 140} ${dotProductPosition.y - 40}, 
                             ${dotProductPosition.x + 80} ${dotProductPosition.y - 10}`}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth={3}
                    strokeOpacity={0.8}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                </>
              )}

              {/* Value connections - visible in step 7 and onward */}
              {shouldShowAtStep(7) && (
                <>
                  {tokens.map((token, idx) => {
                    // Generate a unique color based on token color but translucent
                    const tokenColorBase = token.color;
                    const [r, g, b] = [
                      parseInt(tokenColorBase.slice(1, 3), 16),
                      parseInt(tokenColorBase.slice(3, 5), 16),
                      parseInt(tokenColorBase.slice(5, 7), 16)
                    ];

                    return (
                      <motion.path
                        key={`value-${idx}`}
                        d={`M ${blockCenters[idx]?.x - 20} ${blockCenters[idx]?.y - 85}
                           C ${blockCenters[idx]?.x - 20} ${(blockCenters[idx]?.y - 85 + valuePosition.y) / 2},
                             ${valuePosition.x + (idx - 2) * 10} ${(blockCenters[idx]?.y - 85 + valuePosition.y) / 2 + 50},
                             ${valuePosition.x} ${valuePosition.y - 30}`}
                        fill="none"
                        stroke={idx === activeToken ? "#10b981" : `rgba(${r}, ${g}, ${b}, 0.4)`}
                        strokeWidth={idx === activeToken ? 3 : 1.5}
                        strokeOpacity={idx === activeToken ? 0.9 : 0.5}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8 }}
                      />
                    );
                  })}
                </>
              )}

              {/* Dot product to value connections */}
              {shouldShowAtStep(7) && (
                <motion.path
                  key="dot-to-value"
                  d={`M ${dotProductPosition.x} ${dotProductPosition.y + 60} 
                         C ${dotProductPosition.x} ${dotProductPosition.y + 80}, 
                           ${valuePosition.x} ${valuePosition.y - 50}, 
                           ${valuePosition.x} ${valuePosition.y - 30}`}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth={3}
                  strokeOpacity={0.8}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8 }}
                />
              )}

              {/* Output connections - visible in output step */}
              {shouldShowAtStep(8) && (
                <motion.path
                  key="value-to-output"
                  d={`M ${valuePosition.x} ${valuePosition.y + 40} 
                         C ${valuePosition.x} ${valuePosition.y + 60}, 
                           ${outputPosition.x} ${outputPosition.y - 50}, 
                           ${outputPosition.x} ${outputPosition.y - 30}`}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  strokeOpacity={0.8}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8 }}
                />
              )}
            </svg>

            {/* Query vector */}
            {shouldShowAtStep(3) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute"
                style={{ left: `${queryPosition.x - 80}px`, top: `${queryPosition.y - 60}px` }}
              >
                <div className="flex flex-col items-center">
                  <div
                    className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-500 flex items-center justify-center shadow-md p-4"
                    style={{ width: "160px", height: "120px" }}
                  >
                    <div className="text-center">
                      <span className="font-mono text-sm block">[0.6, 0.7]</span>
                      <span className="font-mono text-sm block mt-1">[0.2, 0.6]</span>
                    </div>
                  </div>
                  <span className="mt-3 text-sm font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full shadow-sm">Query (Q)</span>
                </div>
              </motion.div>
            )}

            {/* Key vector */}
            {shouldShowAtStep(4) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute"
                style={{ left: `${keyPosition.x - 80}px`, top: `${keyPosition.y - 60}px` }}
              >
                <div className="flex flex-col items-center">
                  <div
                    className="rounded-lg bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-500 flex items-center justify-center shadow-md p-4"
                    style={{ width: "160px", height: "120px" }}
                  >
                    <div className="text-center">
                      <span className="font-mono text-sm block">[0.8, 0.2]</span>
                      <span className="font-mono text-sm block mt-1">[0.4, 0.3]</span>
                    </div>
                  </div>
                  <span className="mt-3 text-sm font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full shadow-sm">Key (K)</span>
                </div>
              </motion.div>
            )}

            {/* Dot product visualization */}
            {shouldShowAtStep(5) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute"
                style={{ left: `${dotProductPosition.x - 100}px`, top: `${dotProductPosition.y - 80}px` }}
              >
                <div className="flex flex-col items-center">
                  <div
                    className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 flex items-center justify-center shadow-md p-4"
                    style={{ width: "200px", height: "160px" }}
                  >
                    <div className="text-center">
                      <span className="font-mono text-sm block mb-2">softmax(Q·K/√d)</span>
                      <div className="grid grid-cols-5 gap-2 mt-3">
                        {tokens.map((token: Token, idx: number) => (
                          <div
                            key={`dot-${idx}`}
                            className="h-10 w-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: idx === activeToken ? '#8b5cf6' : '#d8b4fe', color: 'white' }}
                          >
                            <span className="text-xs font-medium">
                              {idx === activeToken ? "0.8" : (Math.random() * 0.3 + 0.1).toFixed(1)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="mt-3 text-sm font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full shadow-sm">Attention Weights</span>
                </div>
              </motion.div>
            )}

            {/* Softmax visualization - removed as it's now combined with dot product */}
            {/* We're now showing the softmax directly in the dot product step */}

            {/* Value vector */}
            {shouldShowAtStep(7) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute"
                style={{ left: `${valuePosition.x - 68}px`, top: `${valuePosition.y + 10}px` }}
              >
                <div className="flex flex-col items-center">
                  <div
                    className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-500 flex items-center justify-center shadow-md p-4"
                    style={{ width: "120px", height: "90px" }}
                  >
                    <div className="text-center">
                      <span className="font-mono text-sm block">[0.5, 0.9]</span>
                      <span className="font-mono text-sm block mt-1">[0.3, 0.7]</span>
                    </div>
                  </div>
                  <span className="mt-3 text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full shadow-sm">Value (V)</span>
                </div>
              </motion.div>
            )}

            {/* Output vector */}
            {shouldShowAtStep(8) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute"
                style={{ left: `${outputPosition.x + 80}px`, top: `${outputPosition.y - 90}px` }}
              >
                <div className="flex flex-col items-center">
                  <div
                    className="rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-500 flex items-center justify-center shadow-md p-4"
                    style={{ width: "120px", height: "90px" }}
                  >
                    <div className="text-center">
                      <span className="font-mono text-sm block">[0.48, 0.85]</span>
                      <span className="font-mono text-sm block mt-1">[0.32, 0.65]</span>
                    </div>
                  </div>
                  <span className="mt-3 text-sm font-bold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full shadow-sm">Output</span>
                </div>
              </motion.div>
            )}

            {/* Equation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-24 left-0 right-0 flex justify-center"
            >
              <div style={step >= 7 ? { marginLeft: '-390px' } : {}}>
                <div className="bg-white p-4 rounded-lg shadow-md max-w-3xl  w-full">
                  <div className="font-mono text-sm text-center font-medium text-neutral-800">{getEquation()}</div>

                  {step >= 6 && step < 9 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 overflow-hidden"
                    >
                      <p className="text-xs text-center text-neutral-600 mb-2">Attention Weights</p>
                      <div className="grid grid-cols-5 gap-1">
                        {tokens.map((_: Token, idx: number) => {
                          const relevantWeight = attentionWeights.find((w: AttentionWeight) => w.to === idx)
                          const weight = relevantWeight ? relevantWeight.weight : 0
                          return (
                            <div
                              key={`weight-${idx}`}
                              className="h-6 flex items-center justify-center text-xs rounded"
                              style={{
                                backgroundColor: `rgba(139, 92, 246, ${weight.toFixed(2)})`,
                                color: weight > 0.5 ? "white" : "black",
                              }}
                            >
                              {weight.toFixed(2)}
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Controls and Legend */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-neutral-700 mb-3">Controls</h4>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={togglePlay}
              className={`px-4 py-2 rounded-md text-white font-medium flex items-center ${playing ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-500 hover:bg-purple-600"
                } transition-colors shadow-sm`}
            >
              {playing ? <Pause size={16} className="mr-1" /> : <Play size={16} className="mr-1" />}
              {playing ? "Pause" : "Play"}
            </button>

            <button
              onClick={resetAnimation}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors flex items-center shadow-sm"
            >
              <RotateCcw size={16} className="mr-1" />
              Reset
            </button>

            <div className="flex items-center ml-2">
              <button
                onClick={prevStep}
                disabled={step === 0}
                className={`p-2 rounded-l-md ${step === 0 ? "bg-gray-200 text-gray-400" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  } transition-colors shadow-sm`}
              >
                <ChevronLeft size={16} />
              </button>

              <button
                onClick={nextStep}
                disabled={step === steps.length - 1}
                className={`p-2 rounded-r-md ${step === steps.length - 1
                  ? "bg-gray-200 text-gray-400"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  } transition-colors shadow-sm`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {steps.map((stepInfo, idx) => (
              <button
                key={stepInfo.id}
                onClick={() => goToStep(idx)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors shadow-sm ${step === idx
                  ? "bg-purple-100 text-purple-700 border border-purple-300"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                  }`}
              >
                {idx + 1}. {stepInfo.label}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-neutral-700 mb-3">Legend</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
              <span className="text-xs text-neutral-700">Query Vector</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
              <span className="text-xs text-neutral-700">Key Vector</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
              <span className="text-xs text-neutral-700">Value Vector</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-xs text-neutral-700">Output Vector</span>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs text-neutral-700 mb-2">Attention Weight</p>
            <div className="h-2 bg-gradient-to-r from-purple-100 to-purple-600 rounded-full"></div>
            <div className="flex justify-between text-xs text-neutral-600 mt-1">
              <span>Low (0.0)</span>
              <span>High (1.0)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-6 text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
        <p className="mb-2 font-medium">How Self-Attention Works:</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Each input token is transformed into Query (Q), Key (K), and Value (V) vectors through learned projections</li>
          <li>For each token, its Query vector is compared with all Key vectors to compute attention scores</li>
          <li>Scores are scaled (divided by √d<sub>k</sub>) and normalized using softmax to get attention weights</li>
          <li>Each token's output is a weighted sum of all Value vectors, where weights are the attention weights</li>
          <li>This allows the model to focus on relevant parts of the input sequence, regardless of distance</li>
        </ol>
      </div>
    </div>
  )
}

export default EnhancedAttentionVisualization
