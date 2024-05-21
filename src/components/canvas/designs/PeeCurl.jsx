'use client'

import dynamic from 'next/dynamic'
import * as React from 'react'
import { Canvas } from '@react-three/fiber'
import { useControls } from 'leva'
import variations from '@/variations'
import { getColorFromIndex } from '@/utils'

const Environment = dynamic(() => import('@/components/canvas/Environment'), { ssr: false })

const PeeCurl = (props) => {
  const defaults = variations.PeeCurl.PeeCurl

  const levaSettings = useControls({
    sides: { value: defaults.sides, min: 3, max: 30, step: 1 },
    count: { value: defaults.count, min: 20, max: 100, step: 2 },
    spread: { value: defaults.spread, min: 0.1, max: 1.5, step: 0.1 },
    curvature: { value: defaults.curvature, min: -4, max: 4, step: 0.1 },
    thickness: { value: defaults.thickness, min: 0.1, max: 2, step: 0.1 },
    height: { value: defaults.height, min: 0.1, max: 50, step: 0.1 },
    growth: { value: defaults.growth, min: -10, max: 10, step: 0.1 },
  })

  const { sides, count, spread, curvature, thickness, height, growth } = props || levaSettings

  const shapes = Array.from({ length: count * 2 }, (_, index) => index + 1)

  return (
    <>
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
    </>
  )
}

export default PeeCurl
