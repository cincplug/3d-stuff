'use client'

import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Controls from '@/components/dom/Controls'
import { applyOperation, getColorFromIndex } from '@/helpers/utils'
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

  const {
    lightness,
    cameraX,
    cameraY,
    cameraZ,
    chart,
    impacts,
    itemModifier,
    itemOperation,
    gapAxis,
    gapModifier,
    gapOperation,
  } = settings
  const series = chart ? chart.split(',').map(Number) : [1]
  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Canvas className='size-full'>
        <Environment {...{ lightness, cameraX, cameraY, cameraZ, bgColor }} />
        {series.map((item, seriesIndex) => {
          let modifiedProps = { ...settings }
          if (impacts) {
            modifiedProps[impacts] = applyOperation(settings[impacts], item, itemOperation) * itemModifier
          }
          const { sides, bases, spread, growth, thickness, colorFrom, colorTo } = modifiedProps
          const shapes = Array.from({ length: bases }, (_, i) => i + 1)
          const modifiedPosition = applyOperation(settings[impacts], seriesIndex, gapOperation) * gapModifier
          return (
            <group
              key={seriesIndex}
              position={[gapAxis === 'x' ? modifiedPosition : 0, 0, gapAxis === 'z' ? modifiedPosition : 0]}
            >
              {shapes.map((_shape, index) => {
                const height = Math.sqrt(index + 1) * growth
                const width = thickness - index / shapes.length
                const depth = index / shapes.length
                const position = [
                  Math.sin(index) * spread,
                  (index * height) / 2 / shapes.length - height / 2,
                  Math.cos(index) * spread,
                ]
                const color = getColorFromIndex(index, shapes.length, colorFrom, colorTo)
                return (
                  <mesh key={index} position={position}>
                    <cylinderGeometry attach='geometry' args={[width * 2, depth, height, sides]} />
                    <meshPhysicalMaterial attach='material' color={color} metalness={0.7} roughness={0.8} />
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
