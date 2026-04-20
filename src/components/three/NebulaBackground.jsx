import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Particles({ count = 800, reduced }) {
  const meshRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    // Sphere distribution using Fibonacci lattice
    const phi = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2
      const radius = Math.sqrt(1 - y * y)
      const theta = phi * i
      // Vary the radius slightly for depth
      const r = 2.2 + (Math.random() - 0.5) * 1.2
      pos[i * 3]     = Math.cos(theta) * radius * r
      pos[i * 3 + 1] = y * r
      pos[i * 3 + 2] = Math.sin(theta) * radius * r

      // Purple palette: mix between #a855f7 and #6b21a8
      const t = Math.random()
      col[i * 3]     = 0.66 + t * 0.23  // R: 0.42→0.66 (168/255→168/255)
      col[i * 3 + 1] = 0.13 + t * 0.2   // G
      col[i * 3 + 2] = 0.59 + t * 0.38  // B
    }
    return { positions: pos, colors: col }
  }, [count])

  useFrame((state) => {
    if (!meshRef.current || reduced) return
    const t = state.clock.getElapsedTime()
    // Slow base rotation
    meshRef.current.rotation.y = t * 0.08
    meshRef.current.rotation.x = t * 0.03
    // Mouse parallax — gentle tilt
    meshRef.current.rotation.y += mouse.current.x * 0.15
    meshRef.current.rotation.x += mouse.current.y * 0.1
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  )
}

export default function NebulaBackground({ reduced }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: false, alpha: true }}
    >
      <Particles reduced={reduced} />
    </Canvas>
  )
}
