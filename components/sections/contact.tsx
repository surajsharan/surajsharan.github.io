"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Activity } from "lucide-react"

const LINKS = [
  {
    label: "email",
    href: "mailto:suraj.sharan@live.com",
    value: "suraj.sharan@live.com",
    icon: Mail,
  },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/suraj-sharan",
    value: "/in/suraj-sharan",
    icon: Linkedin,
  },
  {
    label: "github",
    href: "https://github.com/surajsharan",
    value: "/surajsharan",
    icon: Github,
  },
  {
    label: "kaggle",
    href: "https://www.kaggle.com/surajsharan",
    value: "/surajsharan",
    icon: Activity,
  },
]

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/[0.06] bg-ink-950 py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30 mask-radial-fade" />

      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="grid gap-16 lg:grid-cols-2"
        >
          <div>
            <div className="label-mono mb-4">// contact</div>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Got a hard inference problem?{" "}
              <span className="gradient-lime-text">Let's talk.</span>
            </h2>
            <p className="mt-5 max-w-md text-base text-muted-foreground md:text-lg">
              Open to applied-research collabs, consulting on LLM inference, and
              full-time roles working on the runtime layer.
            </p>

            <div className="mt-8 flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>Abu Dhabi · UAE · UTC+4</span>
            </div>
          </div>

          <div className="grid gap-3">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.02] p-5 transition-colors hover:border-lime/40"
              >
                <div className="flex items-center gap-4">
                  <l.icon className="h-5 w-5 text-white/70 group-hover:text-lime" />
                  <div>
                    <div className="label-mono">{l.label}</div>
                    <div className="font-mono text-base text-white">
                      {l.value}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
