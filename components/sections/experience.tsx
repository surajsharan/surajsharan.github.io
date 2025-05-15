"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FeatureMap from "@/components/neural-network/feature-map"

// Replace with your actual experience
const experiences = [
  {
    id: 1,
    title: "Senior ML Engineer",
    company: "AI Research Lab",
    period: "2021 - Present",
    description:
      "Leading research on efficient CNN architectures for edge devices. Developed a novel attention mechanism that reduced model size by 30% while maintaining accuracy. Published findings in top-tier conferences.",
    colorScheme: "viridis" as const,
  },
  {
    id: 2,
    title: "Computer Vision Specialist",
    company: "Tech Innovations Inc.",
    period: "2018 - 2021",
    description:
      "Implemented state-of-the-art object detection models for autonomous systems. Optimized inference time by 40% through model pruning and quantization techniques.",
    colorScheme: "plasma" as const,
  },
  {
    id: 3,
    title: "ML Research Assistant",
    company: "University Research Group",
    period: "2016 - 2018",
    description:
      "Contributed to research on CNN interpretability and feature visualization. Developed tools for visualizing network activations and understanding model decisions.",
    colorScheme: "grayscale" as const,
  },
]

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-neutral-900">
            Research & Work Experience
          </h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {experiences.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white border-gray-200 shadow-md overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 p-4 flex justify-center items-center bg-gray-50">
                      <FeatureMap size={100} colorScheme={job.colorScheme} />
                    </div>
                    <div className="md:w-3/4">
                      <CardHeader>
                        <CardTitle className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 text-neutral-900">
                          <span>
                            {job.title} at {job.company}
                          </span>
                          <span className="text-sm font-normal text-neutral-500">{job.period}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-neutral-700">{job.description}</p>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
