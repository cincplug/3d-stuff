'use client'

import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Controls from '@/components/dom/Controls'
import { getColorFromIndex } from '@/helpers/utils'
import { createControls } from '@/helpers/createControls'

const Environment = dynamic(() => import('@/components/canvas/Environment'), { ssr: false })

const PeeCurl = (props) => {
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
          const { sides, bases, spread, curvature, thickness, height, growth } = modifiedProps
          const shapes = Array.from({ length: bases * 2 }, (_, index) => index + 1)
          return (
            <group key={seriesIndex} position={[seriesIndex * itemModifier, seriesIndex * itemModifier, 0]}>
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
            </group>
          )
        })}
      </Canvas>
      <Controls {...{ controls, handleInputChange, currentSettings: settings }} />
    </div>
  )
}

export default PeeCurl
