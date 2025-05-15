"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface FeatureMapProps {
  size?: number
  className?: string
  colorScheme?: "viridis" | "plasma" | "grayscale"
}

export default function FeatureMap({ size = 100, className = "", colorScheme = "viridis" }: FeatureMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Color maps
  const colorMaps = {
    viridis: [
      [68, 1, 84], // Dark purple
      [59, 82, 139], // Blue
      [33, 144, 140], // Teal
      [93, 201, 99], // Green
      [253, 231, 37], // Yellow
    ],
    plasma: [
      [13, 8, 135], // Dark blue
      [126, 3, 168], // Purple
      [204, 71, 120], // Pink
      [248, 149, 64], // Orange
      [240, 249, 33], // Yellow
    ],
    grayscale: [
      [0, 0, 0], // Black
      [64, 64, 64], // Dark gray
      [128, 128, 128], // Medium gray
      [192, 192, 192], // Light gray
      [255, 255, 255], // White
    ],
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = size
    canvas.height = size

    // Generate a random feature map
    const cellSize = size / 10
    const colorMap = colorMaps[colorScheme]

    // Create a pattern that resembles CNN feature maps
    for (let y = 0; y < size; y += cellSize) {
      for (let x = 0; x < size; x += cellSize) {
        // Create patterns that look like CNN feature activations
        let value

        // Create different patterns based on position
        const xNorm = x / size
        const yNorm = y / size

        // Generate a value that creates patterns resembling CNN feature maps
        if ((xNorm < 0.5 && yNorm < 0.5) || (xNorm >= 0.5 && yNorm >= 0.5)) {
          // Diagonal pattern
          value = Math.sin(xNorm * 10) * Math.cos(yNorm * 10)
        } else {
          // Edge detection-like pattern
          value = Math.abs(Math.sin(xNorm * 5) - Math.cos(yNorm * 5))
        }

        // Add some noise
        value = value * 0.7 + Math.random() * 0.3

        // Normalize to 0-1
        value = (value + 1) / 2

        // Map value to color
        const colorIndex = Math.min(colorMap.length - 1, Math.floor(value * colorMap.length))
        const nextColorIndex = Math.min(colorMap.length - 1, colorIndex + 1)
        const colorFraction = value * colorMap.length - colorIndex

        // Interpolate between colors
        const r = Math.floor(
          colorMap[colorIndex][0] * (1 - colorFraction) + colorMap[nextColorIndex][0] * colorFraction,
        )
        const g = Math.floor(
          colorMap[colorIndex][1] * (1 - colorFraction) + colorMap[nextColorIndex][1] * colorFraction,
        )
        const b = Math.floor(
          colorMap[colorIndex][2] * (1 - colorFraction) + colorMap[nextColorIndex][2] * colorFraction,
        )

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
        ctx.fillRect(x, y, cellSize, cellSize)
      }
    }
  }, [size, colorScheme])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <canvas ref={canvasRef} width={size} height={size} className="block rounded-md" />
    </motion.div>
  )
}
