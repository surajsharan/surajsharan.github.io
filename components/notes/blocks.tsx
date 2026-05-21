import { Info, AlertTriangle, Lightbulb } from "lucide-react"

export function Callout({
  kind = "note",
  title,
  children,
}: {
  kind?: "note" | "warn" | "tip"
  title?: string
  children: React.ReactNode
}) {
  const cfg = {
    note: { icon: Info, color: "border-lime/30 bg-lime/[0.04]", label: "note" },
    warn: { icon: AlertTriangle, color: "border-amber-400/30 bg-amber-400/[0.04]", label: "watch out" },
    tip: { icon: Lightbulb, color: "border-lime/30 bg-lime/[0.04]", label: "rule of thumb" },
  }[kind]
  const Icon = cfg.icon
  return (
    <div className={`my-6 rounded-lg border ${cfg.color} p-5`}>
      <div className="mb-1 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-lime">
        <Icon className="h-3.5 w-3.5" />
        {title ?? cfg.label}
      </div>
      <div className="text-[15px] leading-relaxed text-white/85">{children}</div>
    </div>
  )
}

export function Equation({
  children,
  label,
}: {
  children: React.ReactNode
  label?: string
}) {
  return (
    <div className="my-6 overflow-hidden rounded-md border border-white/[0.08] bg-ink-950">
      <div className="overflow-x-auto px-5 py-6 text-center font-mono text-[15px] text-white/90">
        {children}
      </div>
      {label && (
        <div className="border-t border-white/[0.06] px-5 py-2 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          ({label})
        </div>
      )}
    </div>
  )
}

export function CodeBlock({
  lang = "python",
  filename,
  children,
}: {
  lang?: string
  filename?: string
  children: string
}) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-white/[0.08] bg-ink-950">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        <span>{filename ?? "snippet"}</span>
        <span className="text-lime">{lang}</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-white/85">
        <code>{children}</code>
      </pre>
    </div>
  )
}

export function NumTable({
  caption,
  headers,
  rows,
}: {
  caption?: string
  headers: string[]
  rows: (string | number)[][]
}) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-white/[0.08]">
      <table className="w-full font-mono text-[13px]">
        <thead className="bg-ink-950">
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="border-b border-white/[0.08] px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/[0.04] last:border-b-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 ${j === row.length - 1 ? "text-lime" : "text-white/85"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && (
        <div className="border-t border-white/[0.06] bg-ink-900 px-4 py-2 font-mono text-[11px] text-muted-foreground">
          {caption}
        </div>
      )}
    </div>
  )
}
