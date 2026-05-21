"use client"

import { useMemo, useState } from "react"

/**
 * Expected tokens-per-step under speculative decoding (Leviathan et al, 2023):
 *   E[tokens] = (1 - α^(k+1)) / (1 - α)         when α < 1
 *             = k + 1                            when α = 1
 *
 * Wall-clock speedup approximation, parametrised by the draft cost ratio c
 * (draft forward time / target forward time):
 *   speedup = E[tokens] / (1 + c · k)
 *
 * c=0 would be "free drafts" (perfect upper bound = k+1).
 */
function expectedTokens(alpha: number, k: number) {
  if (alpha >= 0.9999) return k + 1
  return (1 - Math.pow(alpha, k + 1)) / (1 - alpha)
}

function speedup(alpha: number, k: number, c: number) {
  return expectedTokens(alpha, k) / (1 + c * k)
}

export default function SpeedupPlayground() {
  const [alpha, setAlpha] = useState(0.7)
  const [k, setK] = useState(5)
  const [c, setC] = useState(0.15)

  const expected = useMemo(() => expectedTokens(alpha, k), [alpha, k])
  const s = useMemo(() => speedup(alpha, k, c), [alpha, k, c])

  // Sweep k from 1..8 at current alpha & c for the bar chart
  const sweep = useMemo(() => {
    const arr: { k: number; s: number }[] = []
    for (let i = 1; i <= 8; i++) arr.push({ k: i, s: speedup(alpha, i, c) })
    return arr
  }, [alpha, c])

  const maxS = Math.max(...sweep.map((p) => p.s), 1.5)
  const optimalK = sweep.reduce((best, p) => (p.s > best.s ? p : best), sweep[0])

  return (
    <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-ink-800/40">
      <div className="border-b border-white/[0.06] p-5">
        <div className="label-mono mb-1">// playground · speedup model</div>
        <div className="text-base text-white/85">
          Drag the sliders. Watch when the speedup peaks and when it collapses.
        </div>
      </div>

      <div className="grid gap-6 p-5 md:grid-cols-12">
        {/* Sliders */}
        <div className="md:col-span-5">
          <Slider
            label="acceptance rate · α"
            hint="fraction of draft tokens the target accepts"
            value={alpha}
            min={0}
            max={1}
            step={0.01}
            display={alpha.toFixed(2)}
            onChange={setAlpha}
          />
          <Slider
            label="draft length · k"
            hint="tokens proposed by the draft each round"
            value={k}
            min={1}
            max={8}
            step={1}
            display={String(k)}
            onChange={setK}
          />
          <Slider
            label="draft cost · c"
            hint="draft-forward time ÷ target-forward time"
            value={c}
            min={0}
            max={0.6}
            step={0.01}
            display={c.toFixed(2)}
            onChange={setC}
          />

          <div className="mt-4 rounded-md border border-white/[0.08] bg-ink-900 p-4 font-mono text-[13px] leading-relaxed text-white/85">
            <div className="text-muted-foreground">E[tokens/step] =</div>
            <div className="mt-1">
              (1 − α<sup>k+1</sup>) ÷ (1 − α) ={" "}
              <span className="text-lime">{expected.toFixed(2)}</span>
            </div>
            <div className="mt-3 text-muted-foreground">speedup ≈</div>
            <div className="mt-1">
              E[tokens] ÷ (1 + c·k) ={" "}
              <span className="text-lime text-lg font-semibold">
                {s.toFixed(2)}×
              </span>
            </div>
          </div>
        </div>

        {/* Bar chart */}
        <div className="md:col-span-7">
          <div className="mb-3 flex items-center justify-between">
            <div className="label-mono">speedup vs draft length</div>
            <div className="font-mono text-[11px] text-muted-foreground">
              peak at k=<span className="text-lime">{optimalK.k}</span> · {optimalK.s.toFixed(2)}×
            </div>
          </div>
          <div className="grid grid-cols-8 gap-2 h-56 items-end rounded-md border border-white/[0.06] bg-ink-900 p-4">
            {sweep.map((p) => {
              const heightPct = Math.max(4, (p.s / maxS) * 100)
              const isCurrent = p.k === k
              const isPeak = p.k === optimalK.k
              return (
                <div key={p.k} className="flex h-full flex-col items-center justify-end gap-2">
                  <div className="font-mono text-[10px] text-white/70">
                    {p.s.toFixed(2)}×
                  </div>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className={`w-full rounded-t-sm transition-all ${
                      isCurrent
                        ? "bg-lime ring-2 ring-lime/40"
                        : isPeak
                          ? "bg-lime-400"
                          : "bg-lime/30"
                    }`}
                  />
                  <div
                    className={`font-mono text-[10px] uppercase tracking-[0.16em] ${
                      isCurrent ? "text-lime" : "text-muted-foreground"
                    }`}
                  >
                    k={p.k}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-3 font-mono text-[11px] text-muted-foreground">
            speedup &gt; 1 means net win. As α drops, longer drafts waste compute and the curve collapses.
          </div>
        </div>
      </div>
    </div>
  )
}

function Slider({
  label,
  hint,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string
  hint: string
  value: number
  min: number
  max: number
  step: number
  display: string
  onChange: (v: number) => void
}) {
  return (
    <label className="mb-5 block">
      <div className="mb-1 flex items-baseline justify-between">
        <span className="label-mono">{label}</span>
        <span className="font-mono text-sm text-lime">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="slider-lime w-full"
      />
      <div className="mt-1 font-mono text-[11px] text-muted-foreground">{hint}</div>
    </label>
  )
}
