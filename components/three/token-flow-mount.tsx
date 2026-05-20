"use client"

import dynamic from "next/dynamic"

const TokenFlowScene = dynamic(() => import("./token-flow-scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        warming up gpu kernels…
      </div>
    </div>
  ),
})

export default function TokenFlowMount() {
  return (
    <div className="absolute inset-0">
      <TokenFlowScene />
    </div>
  )
}
