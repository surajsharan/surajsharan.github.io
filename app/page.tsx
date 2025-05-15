import Navbar from "@/components/navbar"
import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Experience from "@/components/sections/experience"
import Skills from "@/components/sections/skills"
import Projects from "@/components/sections/projects"
import Contact from "@/components/sections/contact"
import Footer from "@/components/sections/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      {/* Attention Mechanism Preview Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-neutral-900">
            Understanding Neural Networks
          </h2>
          <p className="text-lg text-center text-neutral-700 max-w-3xl mx-auto mb-12">
            Explore the inner workings of modern neural network architectures and mechanisms
          </p>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
            <h3 className="text-2xl font-bold mb-4 text-neutral-900">Self-Attention Mechanism</h3>
            <p className="text-neutral-700 mb-4">
              Self-attention is a key component in transformer models that allows the network to weigh the importance of
              different parts of the input sequence. It's what enables models like GPT and BERT to understand context
              and relationships between words in a sentence.
            </p>
            <div className="flex justify-center mt-8">
              <Link href="/learn">
                <Button className="px-6 py-6 text-base bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                  Explore Interactive Visualization
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
