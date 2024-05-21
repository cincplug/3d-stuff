'use client'

import dynamic from 'next/dynamic'
import * as React from 'react'
import { Canvas } from '@react-three/fiber'
import { useControls } from 'leva'
import variations from '@/variations'

const Environment = dynamic(() => import('@/components/canvas/Environment'), { ssr: false })

const Bush = (props) => {
  const defaults = variations.Bush.Bush

  const levaSettings = useControls({
    sides: { value: defaults.sides, min: 3, max: 30, step: 1 },
    count: { value: defaults.count, min: 1, max: 200, step: 1 },
    spread: { value: defaults.spread, min: -10, max: 10, step: 0.1 },
    growth: { value: defaults.growth, min: -10, max: 10, step: 0.1 },
    thickness: { value: defaults.thickness, min: -2, max: 3, step: 0.1 },
  })

  const { sides, count, spread, growth, thickness } = props || levaSettings

  const shapes = Array.from({ length: count }, (_, i) => i + 1)

  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Canvas className='size-full' color='black'>
        <Environment />
        {shapes.map((_shape, i) => {
          const height = Math.sqrt(i + 1) * growth
          const width = thickness - i / shapes.length
          const depth = i / shapes.length
          const position = [Math.sin(i) * spread, (i * height) / 2 / shapes.length - height / 2, Math.cos(i) * spread]
          return (
            <mesh key={i} position={position}>
              <cylinderGeometry attach='geometry' args={[width * 2, depth, height, sides]} />
              <meshPhysicalMaterial attach='material' color='#336600' metalness={0.7} roughness={0.8} />
            </mesh>
          )
        })}
      </Canvas>
    </div>
  )
}

export default Bush
