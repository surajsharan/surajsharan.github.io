"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Pause, Play, RotateCcw, StepForward } from "lucide-react"

/**
 * Each round: draft model proposes k tokens, target verifies in one pass.
 * `accepted` = how many of the drafted tokens were correct (prefix accepted).
 * If accepted < k, the target ALSO emits a corrected token at position `accepted`.
 */
type Round = {
  drafts: string[]
  targets: string[] // what target would have generated at each draft position
  accepted: number
}

const ROUNDS: Round[] = [
  {
    drafts: ["The", "quick", "brown", "fox", "jumps"],
    targets: ["The", "quick", "brown", "fox", "leaps"],
    accepted: 4,
  },
  {
    drafts: ["over", "the", "lazy", "dog", "."],
    targets: ["over", "the", "lazy", "dog", "."],
    accepted: 5,
  },
  {
    drafts: ["A", "tiny", "model", "drafts", "fast"],
    targets: ["A", "small", "model", "drafts", "fast"],
    accepted: 1,
  },
  {
    drafts: ["and", "the", "big", "one", "verifies"],
    targets: ["and", "the", "big", "one", "verifies"],
    accepted: 5,
  },
]

type Stage =
  | { kind: "idle" }
  | { kind: "drafting"; index: number }
  | { kind: "verifying" }
  | { kind: "settled" }

const STAGE_DURATION = {
  draftTokenMs: 280,
  verifyMs: 900,
  settleMs: 1400,
}

export default function SpecDecodingViz() {
  const [roundIdx, setRoundIdx] = useState(0)
  const [stage, setStage] = useState<Stage>({ kind: "idle" })
  const [playing, setPlaying] = useState(true)
  const [output, setOutput] = useState<string[]>([])
  const timers = useRef<number[]>([])

  const round = ROUNDS[roundIdx]

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }, [])

  const scheduleNext = useCallback(() => {
    clearTimers()
    // Drafting: k * draftTokenMs
    for (let i = 0; i < round.drafts.length; i++) {
      timers.current.push(
        window.setTimeout(() => {
          setStage({ kind: "drafting", index: i })
        }, i * STAGE_DURATION.draftTokenMs),
      )
    }
    // Verifying
    const verifyAt = round.drafts.length * STAGE_DURATION.draftTokenMs
    timers.current.push(
      window.setTimeout(() => {
        setStage({ kind: "verifying" })
      }, verifyAt),
    )
    // Settled
    const settledAt = verifyAt + STAGE_DURATION.verifyMs
    timers.current.push(
      window.setTimeout(() => {
        setStage({ kind: "settled" })
        const accepted = round.drafts.slice(0, round.accepted)
        const correction =
          round.accepted < round.drafts.length ? [round.targets[round.accepted]] : []
        setOutput((prev) => [...prev, ...accepted, ...correction])
      }, settledAt),
    )
    // Next round
    if (playing) {
      const nextAt = settledAt + STAGE_DURATION.settleMs
      timers.current.push(
        window.setTimeout(() => {
          setRoundIdx((r) => (r + 1) % ROUNDS.length)
        }, nextAt),
      )
    }
  }, [round, playing, clearTimers])

  useEffect(() => {
    if (playing) {
      setStage({ kind: "idle" })
      scheduleNext()
    } else {
      clearTimers()
    }
    return clearTimers
  }, [roundIdx, playing, scheduleNext, clearTimers])

  // keep output bounded
  useEffect(() => {
    if (output.length > 22) setOutput((o) => o.slice(o.length - 22))
  }, [output])

  const showDraftIndex =
    stage.kind === "drafting"
      ? stage.index
      : stage.kind === "verifying" || stage.kind === "settled"
        ? round.drafts.length - 1
        : -1

  const verifying = stage.kind === "verifying"
  const settled = stage.kind === "settled"

  const stats = useMemo(() => {
    const totalDrafted = ROUNDS.slice(0, roundIdx).reduce(
      (s, r) => s + r.drafts.length,
      0,
    )
    const totalAccepted = ROUNDS.slice(0, roundIdx).reduce(
      (s, r) => s + r.accepted,
      0,
    )
    return { totalDrafted, totalAccepted }
  }, [roundIdx])

  return (
    <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-ink-800/40">
      {/* Header / Controls */}
      <div className="flex flex-col gap-3 border-b border-white/[0.06] p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="label-mono mb-1">// speculative decoding · live</div>
          <div className="font-mono text-sm text-white/80">
            round{" "}
            <span className="text-lime">
              {String(roundIdx + 1).padStart(2, "0")}/{ROUNDS.length}
            </span>{" "}
            · stage{" "}
            <span className="text-lime">{stage.kind}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/85 hover:border-lime/40 hover:text-lime"
          >
            {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {playing ? "pause" : "play"}
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false)
              setRoundIdx((r) => (r + 1) % ROUNDS.length)
              setPlaying(true)
            }}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/85 hover:border-lime/40 hover:text-lime"
          >
            <StepForward className="h-3 w-3" />
            next
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false)
              clearTimers()
              setOutput([])
              setRoundIdx(0)
              setStage({ kind: "idle" })
              setTimeout(() => setPlaying(true), 50)
            }}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/85 hover:border-lime/40 hover:text-lime"
          >
            <RotateCcw className="h-3 w-3" />
            reset
          </button>
        </div>
      </div>

      <div className="p-5">
        {/* Draft model row */}
        <Row label="draft model · M_q" sub="small · ~10× faster">
          <div className="flex flex-wrap gap-2">
            {round.drafts.map((t, i) => {
              const visible = i <= showDraftIndex
              const accepted = settled && i < round.accepted
              const rejected = settled && i === round.accepted && round.accepted < round.drafts.length
              const dropped = settled && i > round.accepted
              return (
                <motion.div
                  key={`d-${roundIdx}-${i}`}
                  initial={{ opacity: 0, y: -8, scale: 0.9 }}
                  animate={{
                    opacity: visible ? 1 : 0,
                    y: 0,
                    scale: 1,
                  }}
                  transition={{ duration: 0.25 }}
                  className={`relative min-w-[60px] rounded-md border px-3 py-2 text-center font-mono text-sm transition-colors ${
                    accepted
                      ? "border-lime/60 bg-lime/15 text-lime"
                      : rejected
                        ? "border-red-400/50 bg-red-500/10 text-red-300 line-through"
                        : dropped
                          ? "border-white/[0.08] bg-ink-900 text-white/30 line-through"
                          : "border-white/[0.12] bg-white/[0.04] text-white/85"
                  }`}
                >
                  {t}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-sm bg-ink-900 px-1 font-mono text-[9px] text-muted-foreground">
                    t{i + 1}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Row>

        {/* Target model row */}
        <Row label="target model · M_p" sub="large · one parallel forward pass">
          <motion.div
            initial={{ opacity: 0.35 }}
            animate={{ opacity: verifying ? 1 : settled ? 0.85 : 0.35 }}
            transition={{ duration: 0.3 }}
            className="relative w-full overflow-hidden rounded-md border border-white/[0.1] bg-ink-900 p-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                forward(prompt + drafts) →
              </span>
              <AnimatePresence>
                {verifying && (
                  <motion.span
                    key="verifying"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-mono text-[11px] uppercase tracking-[0.16em] text-lime animate-token-blink"
                  >
                    verifying…
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            {/* sweep bar */}
            <div className="relative mt-3 h-2 overflow-hidden rounded-sm bg-ink-800">
              <motion.div
                key={`sweep-${roundIdx}`}
                initial={{ width: "0%" }}
                animate={{
                  width: verifying ? "100%" : settled ? "100%" : "0%",
                }}
                transition={{
                  duration: verifying ? STAGE_DURATION.verifyMs / 1000 : 0.2,
                  ease: "easeInOut",
                }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-lime-600 via-lime to-lime-200"
              />
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {round.targets.map((t, i) => {
                const matches = t === round.drafts[i]
                const correctedHere = settled && i === round.accepted && !matches
                return (
                  <motion.div
                    key={`tg-${roundIdx}-${i}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{
                      opacity: verifying || settled ? 1 : 0,
                      y: 0,
                    }}
                    transition={{ duration: 0.3, delay: 0.05 * i }}
                    className={`min-w-[60px] rounded-md border px-3 py-1.5 text-center font-mono text-[12px] ${
                      correctedHere
                        ? "border-lime/60 bg-lime/15 text-lime"
                        : matches
                          ? "border-white/[0.08] bg-white/[0.02] text-white/60"
                          : "border-red-400/30 bg-red-500/5 text-red-300/80"
                    }`}
                  >
                    {t}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </Row>

        {/* Verification row */}
        <Row label="verify · accept-reject" sub="rejection sampling along the prefix">
          <div className="flex flex-wrap gap-2">
            {round.drafts.map((_, i) => {
              const show = settled
              const accept = i < round.accepted
              const reject = i === round.accepted && round.accepted < round.drafts.length
              const drop = i > round.accepted
              return (
                <div
                  key={`v-${roundIdx}-${i}`}
                  className={`grid h-8 min-w-[60px] place-items-center rounded-md border font-mono text-sm transition-colors ${
                    !show
                      ? "border-white/[0.06] bg-ink-900 text-white/15"
                      : accept
                        ? "border-lime/60 bg-lime/10 text-lime"
                        : reject
                          ? "border-red-400/50 bg-red-500/10 text-red-300"
                          : "border-white/[0.06] bg-ink-900 text-white/30"
                  }`}
                >
                  {!show ? "·" : accept ? "✓" : reject ? "✗" : "—"}
                </div>
              )
            })}
          </div>
        </Row>

        {/* Round summary */}
        <div className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-md border border-white/[0.08] bg-white/[0.04]">
          <Stat
            label="drafted"
            value={`${stage.kind === "drafting" ? stage.index + 1 : verifying || settled ? round.drafts.length : 0}/${round.drafts.length}`}
          />
          <Stat
            label="accepted"
            value={settled ? `${round.accepted}/${round.drafts.length}` : "—"}
            accent={settled}
          />
          <Stat
            label="committed this round"
            value={
              settled
                ? `${round.accepted + (round.accepted < round.drafts.length ? 1 : 0)} toks`
                : "—"
            }
            accent={settled}
          />
        </div>

        {/* Streaming output */}
        <div className="mt-5 rounded-md border border-white/[0.08] bg-ink-900 p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="label-mono">// committed output</div>
            <div className="font-mono text-[11px] text-muted-foreground">
              total drafted{" "}
              <span className="text-white">{stats.totalDrafted}</span> · accepted{" "}
              <span className="text-lime">{stats.totalAccepted}</span>
            </div>
          </div>
          <div className="min-h-[2.5rem] font-mono text-sm text-white/90">
            {output.length === 0 ? (
              <span className="text-muted-foreground">// waiting for first round…</span>
            ) : (
              output.join(" ") + " "
            )}
            <span className="caret-token" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({
  label,
  sub,
  children,
}: {
  label: string
  sub?: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-5">
      <div className="mb-2 flex items-baseline justify-between">
        <div className="label-mono">{label}</div>
        {sub && (
          <div className="font-mono text-[11px] text-muted-foreground">{sub}</div>
        )}
      </div>
      {children}
    </div>
  )
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="bg-ink-900 px-4 py-3">
      <div className="label-mono">{label}</div>
      <div
        className={`font-mono text-lg font-semibold ${
          accent ? "text-lime" : "text-white"
        }`}
      >
        {value}
      </div>
    </div>
  )
}
