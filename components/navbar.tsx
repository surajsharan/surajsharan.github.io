"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { name: "About", href: "/#about" },
  { name: "Research", href: "/#research" },
  { name: "Skills", href: "/#skills" },
  { name: "Experience", href: "/#experience" },
  { name: "Projects", href: "/#projects" },
  { name: "Learn", href: "/learn" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/[0.06] bg-ink-900/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 animate-token-blink rounded-full bg-lime" />
              <span className="absolute inset-0 rounded-full bg-lime/40 blur-sm" />
            </span>
            <span className="font-mono text-sm font-semibold tracking-[0.04em]">
              suraj<span className="text-lime">.</span>sharan
              <span className="text-muted-foreground">()</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                className="px-3 py-2 font-mono text-[12px] uppercase tracking-[0.14em] text-white/70 transition-colors hover:text-lime"
              >
                {l.name}
              </Link>
            ))}
            <a
              href="#contact"
              className="ml-3 inline-flex items-center gap-1.5 rounded-md bg-lime px-3.5 py-2 font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-900 hover:bg-lime-400"
            >
              contact
            </a>
          </nav>

          <button
            className="rounded-md p-2 text-white md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/[0.06] bg-ink-900/95 backdrop-blur-md md:hidden">
          <nav className="container mx-auto flex flex-col px-6 py-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="px-2 py-3 font-mono text-sm uppercase tracking-[0.14em] text-white/80 hover:text-lime"
              >
                {l.name}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 mb-3 inline-flex w-fit items-center gap-1.5 rounded-md bg-lime px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-ink-900"
            >
              contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
