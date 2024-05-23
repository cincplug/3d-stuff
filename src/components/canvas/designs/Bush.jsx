'use client'

import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Controls from '@/components/dom/Controls'
import { createControls } from '@/utils'

const Environment = dynamic(() => import('@/components/canvas/Environment'), { ssr: false })

const Bush = (props) => {
  const controls = createControls(props)

  const [settings, setSettings] = useState(props)

  const handleInputChange = (event) => {
    setSettings((prevSettings) => {
      return { ...prevSettings, [event.target.id]: event.target.value }
    })
  }

  const { lightness, cameraX, cameraY, cameraZ, sides, count, spread, growth, thickness } = settings
  const shapes = Array.from({ length: count }, (_, i) => i + 1)

  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Canvas className='size-full' color='black'>
        <Environment {...{ lightness, cameraX, cameraY, cameraZ }} />
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
      <Controls {...{ settings, controls, handleInputChange }} />
    </div>
  )
}

export default Bush
