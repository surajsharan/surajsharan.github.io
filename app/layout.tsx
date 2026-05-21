import type React from "react"
import "@/app/globals.css"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Metadata } from "next"

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Suraj Sharan · Applied AI Engineer",
  description:
    "Applied AI engineer and part-time researcher working on LLM inference, speculative decoding, and low-latency serving. Tokens, layers, and TTFT.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`dark ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-ink-900 text-foreground font-sans">{children}</body>
    </html>
  )
}
