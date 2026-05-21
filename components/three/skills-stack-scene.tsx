"use client"

import { useMemo, useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

type Layer = {
  name: string
  detail: string
}

const LAYERS: Layer[] = [
  { name: "embedding", detail: "tokenizer · positional · embeddings" },
  { name: "attention", detail: "multi-head · flash-attn · paged kv" },
  { name: "ffn", detail: "swiglu · mlp · quantization" },
  { name: "decoder", detail: "speculative · medusa · lookahead" },
  { name: "scheduler", detail: "continuous batching · admission control" },
  { name: "serving", detail: "vllm · tgi · triton · gRPC" },
]

function Slab({
  index,
  total,
  active,
  onPointer,
}: {
  index: number
  total: number
  active: boolean
  onPointer: (i: number | null) => void
}) {
  const mesh = useRef<THREE.Mesh>(null)
  const edges = useRef<THREE.LineSegments>(null)
  const targetY = (index - (total - 1) / 2) * 0.55

  useFrame((_, dt) => {
    if (!mesh.current) return
    const target = active ? 0.18 : 0.04
    const mat = mesh.current.material as THREE.MeshStandardMaterial
    mat.opacity += (target - mat.opacity) * Math.min(1, dt * 6)
    mat.emissiveIntensity += ((active ? 0.55 : 0.12) - mat.emissiveIntensity) * Math.min(1, dt * 6)

    const targetX = active ? 0.25 : 0
    mesh.current.position.x += (targetX - mesh.current.position.x) * Math.min(1, dt * 6)
    if (edges.current) edges.current.position.x = mesh.current.position.x

    const targetScale = active ? 1.05 : 1
    const s = mesh.current.scale.x + (targetScale - mesh.current.scale.x) * Math.min(1, dt * 6)
    mesh.current.scale.set(s, s, s)
    if (edges.current) edges.current.scale.set(s, s, s)
  })

  return (
    <group position={[0, targetY, 0]}>
      <mesh
        ref={mesh}
        onPointerOver={(e) => {
          e.stopPropagation()
          onPointer(index)
        }}
        onPointerOut={() => onPointer(null)}
      >
        <boxGeometry args={[4.6, 0.34, 2.2]} />
        <meshStandardMaterial
          color="#C6FF3E"
          transparent
          opacity={0.05}
          emissive="#C6FF3E"
          emissiveIntensity={0.12}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      <lineSegments ref={edges}>
        <edgesGeometry args={[new THREE.BoxGeometry(4.6, 0.34, 2.2)]} />
        <lineBasicMaterial
          color={active ? "#C6FF3E" : "#FFFFFF"}
          transparent
          opacity={active ? 0.9 : 0.35}
        />
      </lineSegments>
    </group>
  )
}

function FlowingTokens() {
  const ref = useRef<THREE.Points>(null)
  const N = 120

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(N * 3)
    const speeds = new Float32Array(N)
    for (let i = 0; i < N; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 4
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2.4
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1.8
      speeds[i] = 0.3 + Math.random() * 0.7
    }
    return { positions, speeds }
  }, [])

  useFrame((_, dt) => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute
    const arr = pos.array as Float32Array
    for (let i = 0; i < N; i++) {
      arr[i * 3 + 1] += speeds[i] * dt
      if (arr[i * 3 + 1] > 1.7) {
        arr[i * 3 + 1] = -1.7
        arr[i * 3 + 0] = (Math.random() - 0.5) * 4
        arr[i * 3 + 2] = (Math.random() - 0.5) * 1.8
      }
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={N}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#C6FF3E"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Stack({
  active,
  setActive,
}: {
  active: number | null
  setActive: (i: number | null) => void
}) {
  const group = useRef<THREE.Group>(null)
  const { mouse } = useThree()

  useFrame((_, dt) => {
    if (!group.current) return
    const targetY = -0.5 + mouse.x * 0.4
    const targetX = 0.2 + mouse.y * 0.15
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, dt * 3)
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(1, dt * 3)
  })

  return (
    <group ref={group} rotation={[0.2, -0.5, 0]}>
      {LAYERS.map((_, i) => (
        <Slab
          key={i}
          index={i}
          total={LAYERS.length}
          active={active === i}
          onPointer={setActive}
        />
      ))}
      <FlowingTokens />
    </group>
  )
}

export default function SkillsStackScene({
  active,
  setActive,
}: {
  active: number | null
  setActive: (i: number | null) => void
}) {
  return (
    <Canvas
      camera={{ position: [4.2, 0.6, 5.5], fov: 38 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 5, 4]} intensity={0.5} color="#C6FF3E" />
      <pointLight position={[-3, -2, -3]} intensity={0.3} color="#7AAA1F" />
      <Stack active={active} setActive={setActive} />
    </Canvas>
  )
}
