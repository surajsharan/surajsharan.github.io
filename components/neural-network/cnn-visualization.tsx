"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface Neuron {
  x: number
  y: number
  connections: number[]
  layer: number
  size: number
  color: string
  opacity: number
  speed: number
}

interface Layer {
  neurons: number
  name: string
}

export default function CNNVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const animationRef = useRef<number>(0)
  const neuronsRef = useRef<Neuron[]>([])
  const timeRef = useRef<number>(0)

  // Define the CNN architecture
  const layers: Layer[] = [
    { neurons: 8, name: "Input" },
    { neurons: 16, name: "Conv1" },
    { neurons: 12, name: "Pool1" },
    { neurons: 24, name: "Conv2" },
    { neurons: 16, name: "Pool2" },
    { neurons: 10, name: "FC" },
    { neurons: 4, name: "Output" },
  ]

  // Colors for different layers
  const layerColors = [
    "rgba(64, 76, 237, 0.8)", // Input - blue
    "rgba(76, 175, 80, 0.8)", // Conv1 - green
    "rgba(255, 152, 0, 0.8)", // Pool1 - orange
    "rgba(156, 39, 176, 0.8)", // Conv2 - purple
    "rgba(3, 169, 244, 0.8)", // Pool2 - light blue
    "rgba(233, 30, 99, 0.8)", // FC - pink
    "rgba(255, 87, 34, 0.8)", // Output - deep orange
  ]

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const container = canvas.parentElement
        if (container) {
          const { width, height } = container.getBoundingClientRect()
          setDimensions({ width, height })
          canvas.width = width
          canvas.height = height

          // Reinitialize neurons when canvas size changes
          initializeNeurons(width, height)
        }
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      initializeNeurons(dimensions.width, dimensions.height)
      startAnimation()
    }

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [dimensions])

  const initializeNeurons = (width: number, height: number) => {
    const neurons: Neuron[] = []
    const totalLayers = layers.length
    const layerSpacing = width / (totalLayers + 1)

    let neuronIndex = 0

    // Create neurons for each layer
    layers.forEach((layer, layerIndex) => {
      const x = layerSpacing * (layerIndex + 1)
      const neuronSpacing = height / (layer.neurons + 1)

      for (let i = 0; i < layer.neurons; i++) {
        const y = neuronSpacing * (i + 1)
        const connections: number[] = []

        // Connect to next layer if not the last layer
        if (layerIndex < totalLayers - 1) {
          const nextLayerStartIndex = neurons.length + layer.neurons
          const nextLayerSize = layers[layerIndex + 1].neurons

          // Connect to a subset of neurons in the next layer
          const connectionsCount = Math.min(3, nextLayerSize)
          for (let j = 0; j < connectionsCount; j++) {
            const targetIndex = nextLayerStartIndex + Math.floor(j * (nextLayerSize / connectionsCount))
            connections.push(targetIndex)
          }
        }

        neurons.push({
          x,
          y,
          connections,
          layer: layerIndex,
          size: 4 + Math.random() * 4,
          color: layerColors[layerIndex],
          opacity: 0.5 + Math.random() * 0.5,
          speed: 0.5 + Math.random() * 1.5,
        })

        neuronIndex++
      }
    })

    neuronsRef.current = neurons
  }

  const startAnimation = () => {
    const animate = (timestamp: number) => {
      if (!timeRef.current) timeRef.current = timestamp
      const elapsed = timestamp - timeRef.current

      drawNetwork(elapsed / 1000)

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  const drawNetwork = (time: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw connections first (so they appear behind neurons)
    neuronsRef.current.forEach((neuron) => {
      neuron.connections.forEach((targetIndex) => {
        if (targetIndex < neuronsRef.current.length) {
          const target = neuronsRef.current[targetIndex]

          // Calculate signal position based on time and neuron speed
          const signalProgress = (time * neuron.speed) % 1

          // Draw connection line - darker for white background
          ctx.beginPath()
          ctx.moveTo(neuron.x, neuron.y)
          ctx.lineTo(target.x, target.y)
          ctx.strokeStyle = `rgba(100, 100, 100, 0.3)`
          ctx.lineWidth = 0.5
          ctx.stroke()

          // Draw moving signal along the connection
          const signalX = neuron.x + (target.x - neuron.x) * signalProgress
          const signalY = neuron.y + (target.y - neuron.y) * signalProgress

          ctx.beginPath()
          ctx.arc(signalX, signalY, 2, 0, Math.PI * 2)
          ctx.fillStyle = neuron.color
          ctx.fill()
        }
      })
    })

    // Draw neurons
    neuronsRef.current.forEach((neuron) => {
      // Neuron pulse effect
      const pulseSize = neuron.size + Math.sin(time * neuron.speed) * 1.5

      ctx.beginPath()
      ctx.arc(neuron.x, neuron.y, pulseSize, 0, Math.PI * 2)
      ctx.fillStyle = neuron.color
      ctx.fill()
    })

    // Draw layer labels with darker text for white background
    ctx.font = "12px Arial"
    ctx.fillStyle = "rgba(50, 50, 50, 0.8)"
    ctx.textAlign = "center"

    const layerSpacing = canvas.width / (layers.length + 1)
    layers.forEach((layer, index) => {
      const x = layerSpacing * (index + 1)
      ctx.fillText(layer.name, x, canvas.height - 10)
    })
  }

  return (
    <div className="absolute inset-0 w-full h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="w-full h-full"
      >
        <canvas ref={canvasRef} className="w-full h-full" />
      </motion.div>
    </div>
  )
}
