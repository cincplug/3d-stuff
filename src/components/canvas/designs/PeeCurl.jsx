'use client'

import dynamic from 'next/dynamic'
import * as React from 'react'
import { Canvas } from '@react-three/fiber'
import { useControls } from 'leva'
import { getColorFromIndex } from '@/utils'
const Environment = dynamic(() => import('@/components/canvas/Environment'), { ssr: false })

const PeeCurl = () => {
  const { sides } = useControls('Pee curl', { sides: { value: 10, min: 3, max: 30, step: 1 } })
  const { count } = useControls('Pee curl', { count: { value: 50, min: 20, max: 100, step: 2 } })
  const { spread } = useControls('Pee curl', { spread: { value: 0.7, min: 0.1, max: 1.5, step: 0.1 } })
  const { curvature } = useControls('Pee curl', { curvature: { value: 1, min: -4, max: 4, step: 0.1 } })
  const { thickness } = useControls('Pee curl', { thickness: { value: 1, min: 0.1, max: 2, step: 0.1 } })
  const { height } = useControls('Pee curl', { height: { value: 20, min: 0.1, max: 50, step: 0.1 } })
  const { growth } = useControls('Pee curl', { growth: { value: 1, min: -10, max: 10, step: 0.1 } })

  const shapes = Array.from({ length: count * 2 }, (_, index) => index + 1)
  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Canvas className='size-full' color='black'>
        <Environment />
        {shapes.map((_, index) => {
          const angle = (index * Math.PI * 2) / shapes.length
          const radius = index ** spread
          const position = [radius * Math.cos(angle * curvature), -spread, radius * Math.sin(angle * curvature)]
          const color = getColorFromIndex(index, shapes.length)
          const rodHeight = index * growth

          return (
            <group key={index} position={position}>
              {index > 1 && index < shapes.length - 1 && (
                <mesh position={[0, (growth * height) / 2, 0]}>
                  <coneGeometry attach='geometry' args={[2, 1, sides]} />
                  <meshStandardMaterial attach='material' color={color} metalness={0.9} roughness={0.5} />
                </mesh>
              )}
              {index > 0 && index % 2 === 0 && (
                <mesh position={[0, rodHeight / 2, 0]}>
                  <cylinderGeometry
                    attach='geometry'
                    args={[thickness, thickness, rodHeight + growth * height, sides]}
                  />
                  <meshStandardMaterial attach='material' color={color} metalness={0.9} roughness={0.7} />
                </mesh>
              )}
            </group>
          )
        })}
      </Canvas>
    </div>
  )
}

export default PeeCurl
