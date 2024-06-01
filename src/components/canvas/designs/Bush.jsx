'use client'

import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Controls from '@/components/dom/Controls'
import { createControls } from '@/helpers/createControls'

const Environment = dynamic(() => import('@/components/canvas/Environment'), { ssr: false })

const Bush = (props) => {
  const controls = createControls(props)
  const [settings, setSettings] = useState(props)

  const handleInputChange = (event) => {
    const { id, value } = event.target
    setSettings((prevSettings) => {
      return { ...prevSettings, [id]: value }
    })
  }

  const { lightness, cameraX, cameraY, cameraZ, chart, impacts, itemModifier, itemOperation } = settings
  const series = chart ? chart.split(',').map(Number) : [1]

  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Canvas className='size-full' color='black'>
        <Environment {...{ lightness, cameraX, cameraY, cameraZ }} />
        {series.map((item, seriesIndex) => {
          let modifiedProps = { ...settings }
          if (impacts) {
            modifiedProps[impacts] = settings[impacts] * item * itemModifier
          }
          const { sides, bases, spread, growth, thickness } = modifiedProps
          const shapes = Array.from({ length: bases }, (_, i) => i + 1)
          return (
            <group key={seriesIndex} position={[seriesIndex * itemModifier, 0, 0]}>
              {shapes.map((_shape, i) => {
                const height = Math.sqrt(i + 1) * growth
                const width = thickness - i / shapes.length
                const depth = i / shapes.length
                const position = [
                  Math.sin(i) * spread,
                  (i * height) / 2 / shapes.length - height / 2,
                  Math.cos(i) * spread,
                ]
                return (
                  <mesh key={i} position={position}>
                    <cylinderGeometry attach='geometry' args={[width * 2, depth, height, sides]} />
                    <meshPhysicalMaterial attach='material' color='#336600' metalness={0.7} roughness={0.8} />
                  </mesh>
                )
              })}
            </group>
          )
        })}
      </Canvas>
      <Controls {...{ controls, handleInputChange, currentSettings: settings }} />
    </div>
  )
}

export default Bush
