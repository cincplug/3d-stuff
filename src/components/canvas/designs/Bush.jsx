'use client'

import dynamic from 'next/dynamic'
import * as React from 'react'
import { Canvas } from '@react-three/fiber'
import { useControls } from 'leva'
const Environment = dynamic(() => import('@/components/canvas/Environment'), { ssr: false })

const Bush = () => {
  const { sides } = useControls('Bush', { sides: { value: 17, min: 3, max: 30, step: 1 } })
  const { count } = useControls('Bush', { count: { value: 39, min: 1, max: 200, step: 1 } })
  const { spread } = useControls('Bush', { spread: { value: -6.8, min: -10, max: 10, step: 0.1 } })
  const { growth } = useControls('Bush', { growth: { value: 1, min: 0.7, max: 10, step: 0.1 } })
  const { thickness } = useControls('Bush', { thickness: { value: -1, min: -2, max: 3, step: 0.1 } })

  const shapes = Array.from({ length: count }, (_, i) => i + 1)

  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Canvas className='size-full' color='black'>
        <Environment />
        {shapes.map((_shape, i) => {
          const height = Math.sqrt(i + 1) * growth
          const width = thickness - i / shapes.length
          const depth = i / shapes.length
          const position = [Math.sin(i) * spread, (i * height) / shapes.length - height / 2, Math.cos(i) * spread]
          return (
            <mesh key={i} position={position}>
              <cylinderGeometry attach='geometry' args={[width * 2, depth, height, sides]} />
              <meshStandardMaterial attach='material' color='#336600' metalness={0.7} roughness={3.8} />
            </mesh>
          )
        })}
      </Canvas>
    </div>
  )
}

export default Bush
