'use client'

import dynamic from 'next/dynamic'
import * as React from 'react'
import { Canvas } from '@react-three/fiber'
import { useControls } from 'leva'
import VariationNav from '../VariationNav'
import { getDefaultValues } from '@/utils'

const Environment = dynamic(() => import('@/components/canvas/Environment'), { ssr: false })

const Bush = () => {
  const defaultSettings = {
    sides: { value: 17, min: 3, max: 30, step: 1 },
    count: { value: 39, min: 1, max: 200, step: 1 },
    spread: { value: 2, min: -10, max: 10, step: 0.1 },
    growth: { value: 1.5, min: -10, max: 10, step: 0.1 },
    thickness: { value: -1, min: -2, max: 3, step: 0.1 },
  }
  const { sides, count, spread, growth, thickness } = useControls(defaultSettings)
  const defaultValues = getDefaultValues(defaultSettings)
  const [, set] = useControls(() => defaultValues)

  const shapes = Array.from({ length: count }, (_, i) => i + 1)

  return (
    <>
      <VariationNav {...{ set, defaultValues, component: 'Bush' }} />
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
    </>
  )
}

export default Bush
