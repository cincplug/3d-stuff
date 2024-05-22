'use client'

import dynamic from 'next/dynamic'
import React, { useEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { useControls } from 'leva'
import { getColorFromIndex, createControls, updateSettings } from '@/utils'

const Environment = dynamic(() => import('@/components/canvas/Environment'), { ssr: false })

const PeeCurl = (props) => {
  const settings = useMemo(() => ['sides', 'count', 'spread', 'curvature', 'thickness', 'height', 'growth'], [])
  const controls = createControls(settings, props)

  const [levaSettings, set] = useControls(() => controls)

  useEffect(() => {
    if (props) {
      updateSettings(settings, props, set)
    }
  }, [props, set, settings])

  const { sides, count, spread, curvature, thickness, height, growth } = levaSettings
  const shapes = Array.from({ length: count * 2 }, (_, index) => index + 1)

  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Canvas className='size-full' color='black'>
        <Environment />
        {shapes.map((_, index) => {
          const angle = (index * Math.PI * 2) / shapes.length
          const radius = index ** (spread / 10)
          const position = [radius * Math.cos(angle * curvature), 0, radius * Math.sin(angle * curvature)]
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
