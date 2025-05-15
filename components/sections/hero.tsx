"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import CNNVisualization from "@/components/neural-network/cnn-visualization"
import { Code2, BrainCircuit } from "lucide-react"

export default function Hero() {
  const [name, setName] = useState("Suraj Sharan")
  const [title, setTitle] = useState("Applied AI Engineer")

  // You can replace these with your actual information
  useEffect(() => {
    // This would be replaced with your actual name and title
    // For now using placeholder values
  }, [])

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-white">
      <CNNVisualization />

      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-white/60 z-10"></div>

      <div className="relative z-20 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-3xl mx-auto mt-8"
        >
          <div className="flex items-center justify-center mb-6">
            <BrainCircuit className="h-12 w-12 text-purple-600 mr-3" />
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900">{name}</h1>
          </div>

          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white mb-8">
            <Code2 className="h-4 w-4 mr-2" />
            <p className="text-lg md:text-xl font-medium">{title}</p>
          </div>

          <p className="text-xl md:text-2xl text-neutral-700 mb-8 max-w-2xl mx-auto">
            Specializing in deep learning, computer vision, and neural network architecture design
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              className="px-6 py-6 text-base bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Contact Me
            </Button>
            <Button
              variant="outline"
              className="px-6 py-6 text-base border-purple-500 text-purple-500 hover:bg-purple-500/10"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View My Research
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
