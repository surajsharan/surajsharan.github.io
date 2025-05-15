"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Activity } from "lucide-react"
import { Label } from "@/components/ui/label"

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle form submission
    console.log("Form submitted:", formData)
    alert("Thanks for your message ! This is a demo form - in a real portfolio, this would send an email.")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="py-20 bg-gray-50 text-neutral-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Get In Touch</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-purple-600">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-purple-600" />
                  <a href="mailto:suraj.sharan@live.com" className="hover:text-purple-600 transition-colors">
                    suraj.sharan@live.com
                  </a>
                </div>

                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-purple-600" />
                  <a href="tel:+971501055380" className="hover:text-purple-600 transition-colors">
                    (971) 501-055380                  </a>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-purple-600" />
                  <span>Abu Dhabi, United Arab Emirates</span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-purple-600">Connect</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.linkedin.com/in/suraj-sharan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-purple-500/20 text-purple-600 transition-colors"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="https://github.com/surajsharan" // ← Replace with your actual GitHub URL
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-blue-500/20 text-blue-600 transition-colors"
                  >
                    <span className="sr-only">GitHub</span>
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.kaggle.com/surajsharan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-cyan-500/20 text-cyan-600 transition-colors"
                  >
                    <span className="sr-only">Kaggle</span>
                    <Activity className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-sky-500/20 text-sky-600 transition-colors"
                  >
                    <span className="sr-only">Twitter</span>
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6 text-purple-600">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    className="bg-white"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-gray-200 focus:border-purple-500"
                  />
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full min-h-[150px] bg-white border-gray-200 focus:border-purple-500"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
