import Navbar from "@/components/navbar"
import Hero from "@/components/sections/hero"
import Ticker from "@/components/sections/ticker"
import About from "@/components/sections/about"
import Research from "@/components/sections/research"
import Skills from "@/components/sections/skills"
import Experience from "@/components/sections/experience"
import Projects from "@/components/sections/projects"
import Contact from "@/components/sections/contact"
import Footer from "@/components/sections/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-ink-900">
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <Research />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
