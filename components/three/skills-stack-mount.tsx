"use client"

import dynamic from "next/dynamic"

const SkillsStackScene = dynamic(() => import("./skills-stack-scene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
      loading layers…
    </div>
  ),
})

export default function SkillsStackMount({
  active,
  setActive,
}: {
  active: number | null
  setActive: (i: number | null) => void
}) {
  return <SkillsStackScene active={active} setActive={setActive} />
}
