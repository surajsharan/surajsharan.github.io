"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface ActivationFunctionProps {
  type: "relu" | "sigmoid" | "tanh"
  width?: number
  height?: number
  color?: string
  className?: string
}

export default function ActivationFunction({
  type = "relu",
  width = 120,
  height = 60,
  color = "#3b82f6",
  className = "",
}: ActivationFunctionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = width
    canvas.height = height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Set line style
    ctx.strokeStyle = color
    ctx.lineWidth = 2

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(0, height / 2)
    ctx.lineTo(width, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(width / 2, 0)
    ctx.lineTo(width / 2, height)
    ctx.stroke()

    // Draw activation function
    ctx.beginPath()

    switch (type) {
      case "relu":
        // ReLU function: f(x) = max(0, x)
        ctx.moveTo(0, height / 2)
        ctx.lineTo(width / 2, height / 2)
        ctx.lineTo(width, 0)
        break

      case "sigmoid":
        // Sigmoid function: f(x) = 1 / (1 + e^(-x))
        for (let x = 0; x < width; x++) {
          const normalizedX = (x - width / 2) / 10
          const y = height - height / (1 + Math.exp(-normalizedX))
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        break

      case "tanh":
        // Tanh function: f(x) = (e^x - e^(-x)) / (e^x + e^(-x))
        for (let x = 0; x < width; x++) {
          const normalizedX = (x - width / 2) / 10
          const y = (height / 2) * (1 - Math.tanh(normalizedX))
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        break
    }

    ctx.stroke()
  }, [type, width, height, color])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <canvas ref={canvasRef} width={width} height={height} className="block" />
      <p className="text-xs text-center mt-1 font-mono">{type.toUpperCase()}</p>
    </motion.div>
  )
}
