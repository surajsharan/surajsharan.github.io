"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Replace with your actual skills
const skills = {
  technical: [
    { name: "PyTorch", level: 95 },
    { name: "Large Language Models (LLMs)", level: 90 },
    { name: "Computer Vision", level: 92 },
    { name: "CNN Architecture", level: 88 },
    { name: "Transfer Learning", level: 85 },
    { name: "Python", level: 95 },
    { name: "Data Preprocessing", level: 90 },
    { name: "Model Deployment", level: 82 },
    { name: "CUDA Optimization", level: 78 },
    { name: "Research Methods", level: 88 },
  ],
  frameworks: [
    "Transformer",
    "ViT",
    "ResNet",
    "EfficientNet",
    "YOLO",
    "Faster R-CNN",
    "U-Net",
    "SegNet",
    "MobileNet",
  ],
  tools: [
    "Jupyter",
    "Git",
    "Docker",
    "AWS",
    "Google Cloud",
    "Weights & Biases",
    "MLflow",
    "TensorBoard",
    "NVIDIA Profiler",
    "Kubernetes",
  ],
}

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="skills" className="py-20 bg-gray-50 text-neutral-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Technical Proficiency</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-purple-600">Core Competencies</h3>
              <div className="space-y-4">
                {skills.technical.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm font-medium text-purple-600">{skill.level}%</span>
                    </div>
                    <Progress
                      value={skill.level}
                      className="h-2 bg-gray-200"
                      indicatorClassName="bg-gradient-to-r from-purple-600 to-blue-500"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6 text-blue-600">Neural Network Frameworks</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {skills.frameworks.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Badge
                      variant="secondary"
                      className="px-3 py-2 text-sm font-medium bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-600"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>

              <h3 className="text-xl font-semibold mb-6 text-green-600">Tools & Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Badge
                      variant="outline"
                      className="px-3 py-2 text-sm font-medium border-green-500/30 text-green-600"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
