'use client'

import dynamic from 'next/dynamic'
import React, { useEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { useControls } from 'leva'
import variations from '@/variations'
import { createControls, updateSettings } from '@/utils'

const Environment = dynamic(() => import('@/components/canvas/Environment'), { ssr: false })

const Bush = (props) => {
  const defaults = variations.Bush.Bush

  const settings = useMemo(() => ['sides', 'count', 'spread', 'growth', 'thickness'], [])
  const controls = createControls(settings, props, defaults)

  const [levaSettings, set] = useControls(() => controls)

  useEffect(() => {
    if (props) {
      updateSettings(settings, props, set)
    }
  }, [props, set, settings])

  const shapes = Array.from({ length: levaSettings.count }, (_, i) => i + 1)

  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Canvas className='size-full' color='black'>
        <Environment />
        {shapes.map((_shape, i) => {
          const height = Math.sqrt(i + 1) * levaSettings.growth
          const width = levaSettings.thickness - i / shapes.length
          const depth = i / shapes.length
          const position = [
            Math.sin(i) * levaSettings.spread,
            (i * height) / 2 / shapes.length - height / 2,
            Math.cos(i) * levaSettings.spread,
          ]
          return (
            <mesh key={i} position={position}>
              <cylinderGeometry attach='geometry' args={[width * 2, depth, height, levaSettings.sides]} />
              <meshPhysicalMaterial attach='material' color='#336600' metalness={0.7} roughness={0.8} />
            </mesh>
          )
        })}
      </Canvas>
    </div>
  )
}

export default Bush
