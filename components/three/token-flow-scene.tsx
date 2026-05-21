"use client"

import { useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import gsap from "gsap"

const LAYER_COUNT = 8
const LAYER_SPACING = 1.35
const TOKEN_COUNT = 220
const LIME = new THREE.Color("#C6FF3E")
const LIME_DIM = new THREE.Color("#7AAA1F")
const ICE = new THREE.Color("#E0F2FF")

function LayerStack() {
  const groupRef = useRef<THREE.Group>(null)
  const entry = useRef({ progress: 0 })

  // GSAP-driven entry progress (0 → 1) that the per-frame loop respects.
  useEffect(() => {
    const tween = gsap.to(entry.current, {
      progress: 1,
      duration: 2.2,
      ease: "power3.out",
    })
    return () => {
      tween.kill()
    }
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    const p = entry.current.progress
    // Start tilted + scaled-down, ease into the idle pose
    const idleY = Math.sin(t * 0.12) * 0.18
    const idleX = -0.12 + Math.sin(t * 0.08) * 0.04
    groupRef.current.rotation.y = (1 - p) * -0.6 + p * idleY
    groupRef.current.rotation.x = (1 - p) * -0.45 + p * idleX
    const s = 0.7 + p * 0.3
    groupRef.current.scale.set(s, s, s)
  })

  const layers = useMemo(() => {
    const arr: { z: number; opacity: number; emissive: number }[] = []
    const start = -((LAYER_COUNT - 1) * LAYER_SPACING) / 2
    for (let i = 0; i < LAYER_COUNT; i++) {
      arr.push({
        z: start + i * LAYER_SPACING,
        opacity: 0.06 + (i / LAYER_COUNT) * 0.07,
        emissive: 0.05 + (i / LAYER_COUNT) * 0.12,
      })
    }
    return arr
  }, [])

  return (
    <group ref={groupRef}>
      {layers.map((layer, i) => (
        <group key={i} position={[0, 0, layer.z]}>
          {/* Layer slab */}
          <mesh>
            <boxGeometry args={[5.2, 3.4, 0.04]} />
            <meshStandardMaterial
              color="#C6FF3E"
              transparent
              opacity={layer.opacity}
              emissive="#C6FF3E"
              emissiveIntensity={layer.emissive}
              roughness={0.4}
              metalness={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Layer outline */}
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(5.2, 3.4, 0.04)]} />
            <lineBasicMaterial
              color="#C6FF3E"
              transparent
              opacity={0.18 + (i / LAYER_COUNT) * 0.18}
            />
          </lineSegments>
        </group>
      ))}
    </group>
  )
}

function TokenStream() {
  const pointsRef = useRef<THREE.Points>(null)
  const colorAttr = useRef<THREE.BufferAttribute>(null)

  const { positions, colors, sizes, speeds, lanes } = useMemo(() => {
    const positions = new Float32Array(TOKEN_COUNT * 3)
    const colors = new Float32Array(TOKEN_COUNT * 3)
    const sizes = new Float32Array(TOKEN_COUNT)
    const speeds = new Float32Array(TOKEN_COUNT)
    const lanes = new Float32Array(TOKEN_COUNT * 2)

    const halfStack = ((LAYER_COUNT - 1) * LAYER_SPACING) / 2

    for (let i = 0; i < TOKEN_COUNT; i++) {
      const x = (Math.random() - 0.5) * 4.4
      const y = (Math.random() - 0.5) * 2.6
      const z = -halfStack - 1.5 + Math.random() * (halfStack * 2 + 3)
      positions[i * 3 + 0] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      lanes[i * 2 + 0] = x
      lanes[i * 2 + 1] = y

      // Color mix between lime, dim lime, and ice tip
      const c = new THREE.Color()
      const r = Math.random()
      if (r < 0.08) c.copy(ICE)
      else if (r < 0.5) c.copy(LIME)
      else c.copy(LIME_DIM)
      colors[i * 3 + 0] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b

      sizes[i] = Math.random() < 0.05 ? 0.08 : 0.035 + Math.random() * 0.03
      speeds[i] = 0.6 + Math.random() * 1.4
    }
    return { positions, colors, sizes, speeds, lanes }
  }, [])

  useFrame((_, dt) => {
    if (!pointsRef.current) return
    const halfStack = ((LAYER_COUNT - 1) * LAYER_SPACING) / 2
    const farZ = halfStack + 1.5
    const nearZ = -halfStack - 1.5

    const pos = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const arr = pos.array as Float32Array

    for (let i = 0; i < TOKEN_COUNT; i++) {
      const idx = i * 3 + 2
      arr[idx] += speeds[i] * dt
      if (arr[idx] > farZ) {
        arr[idx] = nearZ
        // tiny lane drift
        arr[i * 3 + 0] = lanes[i * 2 + 0] + (Math.random() - 0.5) * 0.1
        arr[i * 3 + 1] = lanes[i * 2 + 1] + (Math.random() - 0.5) * 0.1
      }
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={TOKEN_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          ref={colorAttr}
          attach="attributes-color"
          count={TOKEN_COUNT}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={TOKEN_COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function AttentionLines() {
  const ref = useRef<THREE.LineSegments>(null)
  const { geom, basePositions } = useMemo(() => {
    const halfStack = ((LAYER_COUNT - 1) * LAYER_SPACING) / 2
    const segments = 26
    const positions = new Float32Array(segments * 2 * 3)
    for (let i = 0; i < segments; i++) {
      const x1 = (Math.random() - 0.5) * 4
      const y1 = (Math.random() - 0.5) * 2.4
      const x2 = (Math.random() - 0.5) * 4
      const y2 = (Math.random() - 0.5) * 2.4
      positions[i * 6 + 0] = x1
      positions[i * 6 + 1] = y1
      positions[i * 6 + 2] = -halfStack
      positions[i * 6 + 3] = x2
      positions[i * 6 + 4] = y2
      positions[i * 6 + 5] = halfStack
    }
    const geom = new THREE.BufferGeometry()
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return { geom, basePositions: positions }
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const mat = ref.current.material as THREE.LineBasicMaterial
    mat.opacity = 0.06 + (Math.sin(clock.getElapsedTime() * 0.6) + 1) * 0.04
  })

  return (
    <lineSegments ref={ref} geometry={geom}>
      <lineBasicMaterial color="#C6FF3E" transparent opacity={0.08} />
    </lineSegments>
  )
}

export default function TokenFlowScene() {
  return (
    <Canvas
      camera={{ position: [4.6, 1.8, 6.4], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <color attach="background" args={["#0A0E14"]} />
      <fog attach="fog" args={["#0A0E14", 7, 16]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 5]} intensity={0.6} color="#C6FF3E" />
      <pointLight position={[-4, -2, -4]} intensity={0.4} color="#7AAA1F" />

      <LayerStack />
      <AttentionLines />
      <TokenStream />
    </Canvas>
  )
}
