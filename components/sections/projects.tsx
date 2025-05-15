"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, FileText } from "lucide-react"
import FeatureMap from "@/components/neural-network/feature-map"

// Replace with your actual projects
const projects = [
  {
    id: 1,
    title: "Efficient CNN for Mobile Devices",
    description:
      "Developed a lightweight CNN architecture optimized for mobile devices that achieves 95% of the accuracy of larger models with only 10% of the parameters. Implemented knowledge distillation techniques.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["CNN", "Model Compression", "Knowledge Distillation", "PyTorch"],
    liveUrl: "#",
    githubUrl: "#",
    paperUrl: "#",
    colorScheme: "viridis" as const,
  },
  {
    id: 2,
    title: "Attention Mechanism for Medical Imaging",
    description:
      "Designed a novel attention mechanism for medical image segmentation that improves accuracy on small lesions by 15%. The approach was validated on multiple public datasets.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Medical Imaging", "Attention Mechanism", "Segmentation", "TensorFlow"],
    liveUrl: "#",
    githubUrl: "#",
    paperUrl: "#",
    colorScheme: "plasma" as const,
  },
  {
    id: 3,
    title: "CNN Feature Visualization Tool",
    description:
      "Created an interactive tool for visualizing CNN feature maps and understanding model decisions. Helps researchers interpret what their models are learning at each layer.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Explainable AI", "Feature Visualization", "Interactive Tool", "PyTorch"],
    liveUrl: "#",
    githubUrl: "#",
    paperUrl: "#",
    colorScheme: "grayscale" as const,
  },
]

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="projects" className="py-20 bg-white text-neutral-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Research Projects</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col overflow-hidden bg-white border-gray-200 shadow-md">
                  <div className="aspect-video overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FeatureMap size={200} colorScheme={project.colorScheme} className="w-full h-full" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-neutral-900">{project.title}</CardTitle>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-purple-600 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-neutral-600">{project.description}</p>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-purple-500/30 text-purple-600 hover:bg-purple-500/10"
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-blue-500/30 text-blue-600 hover:bg-blue-500/10"
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-green-500/30 text-green-600 hover:bg-green-500/10"
                    >
                      <a href={project.paperUrl} target="_blank" rel="noopener noreferrer">
                        <FileText className="h-4 w-4 mr-2" />
                        Paper
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
