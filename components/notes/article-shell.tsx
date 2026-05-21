"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"

export type TocItem = { id: string; label: string }

export default function ArticleShell({
  tag,
  title,
  dek,
  date,
  readingTime,
  toc,
  children,
}: {
  tag: string
  title: React.ReactNode
  dek: string
  date: string
  readingTime: string
  toc: TocItem[]
  children: React.ReactNode
}) {
  const [activeId, setActiveId] = useState<string>(toc[0]?.id ?? "")

  useEffect(() => {
    const handler = () => {
      let current = toc[0]?.id ?? ""
      for (const t of toc) {
        const el = document.getElementById(t.id)
        if (!el) continue
        if (el.getBoundingClientRect().top - 120 < 0) current = t.id
      }
      setActiveId(current)
    }
    handler()
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [toc])

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.06] pt-32 pb-16">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 mask-radial-fade" />
        <div className="container relative mx-auto px-6">
          <Link
            href="/#research"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-lime"
          >
            <ArrowLeft className="h-3 w-3" />
            back to research
          </Link>

          <div className="mt-6 max-w-3xl">
            <div className="label-mono mb-5">{tag}</div>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              {title}
            </h1>
            <p className="mt-5 text-base text-white/75 md:text-lg">{dek}</p>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>
                by <span className="text-white">suraj sharan</span>
              </span>
              <span>{date}</span>
              <span>{readingTime} read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="border-b border-white/[0.06] py-16">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* TOC */}
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-28">
                <div className="label-mono mb-4">// in this post</div>
                <ul className="space-y-2 text-sm">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className={`block border-l-2 pl-3 py-1 transition-colors ${
                          activeId === t.id
                            ? "border-lime text-lime"
                            : "border-white/[0.08] text-white/70 hover:text-white"
                        }`}
                      >
                        {t.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <article className="prose-article lg:col-span-9">{children}</article>
          </div>
        </div>
      </section>
    </>
  )
}
