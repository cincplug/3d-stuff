'use client'

import dynamic from 'next/dynamic'
import React, { useEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { useControls } from 'leva'
import variations from '@/variations'
import { getColorFromIndex, createControls, updateSettings } from '@/utils'

const Environment = dynamic(() => import('@/components/canvas/Environment'), { ssr: false })

const PeeCurl = (props) => {
  const defaults = variations.PeeCurl.PeeCurl

  const settings = useMemo(() => ['sides', 'count', 'spread', 'curvature', 'thickness', 'height', 'growth'], [])
  const controls = createControls(settings, props, defaults)

  const [levaSettings, set] = useControls(() => controls)

  useEffect(() => {
    if (props) {
      updateSettings(settings, props, set)
    }
  }, [props, set, settings])

  const shapes = Array.from({ length: levaSettings.count * 2 }, (_, index) => index + 1)

  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Canvas className='size-full' color='black'>
        <Environment />
        {shapes.map((_, index) => {
          const angle = (index * Math.PI * 2) / shapes.length
          const radius = index ** levaSettings.spread
          const position = [
            radius * Math.cos(angle * levaSettings.curvature),
            -levaSettings.spread,
            radius * Math.sin(angle * levaSettings.curvature),
          ]
          const color = getColorFromIndex(index, shapes.length)
          const rodHeight = index * levaSettings.growth

          return (
            <group key={index} position={position}>
              {index > 1 && index < shapes.length - 1 && (
                <mesh position={[0, (levaSettings.growth * levaSettings.height) / 2, 0]}>
                  <coneGeometry attach='geometry' args={[2, 1, levaSettings.sides]} />
                  <meshStandardMaterial attach='material' color={color} metalness={0.9} roughness={0.5} />
                </mesh>
              )}
              {index > 0 && index % 2 === 0 && (
                <mesh position={[0, rodHeight / 2, 0]}>
                  <cylinderGeometry
                    attach='geometry'
                    args={[
                      levaSettings.thickness,
                      levaSettings.thickness,
                      rodHeight + levaSettings.growth * levaSettings.height,
                      levaSettings.sides,
                    ]}
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
