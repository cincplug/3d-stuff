import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Controls from '@/components/dom/Controls'
import { getColorFromIndex, applyOperation } from '@/helpers/utils'
import { createControls } from '@/helpers/createControls'

const Environment = dynamic(() => import('@/components/canvas/Environment'), { ssr: false })

const Umbrella = (props) => {
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
      <Canvas className='size-full' color='black'>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Environment lightness={lightness} cameraX={cameraX} cameraY={cameraY} cameraZ={cameraZ} />
        <OrbitControls />
        {series.map((item, seriesIndex) => {
          let modifiedProps = { ...settings }
          if (impacts) {
            modifiedProps[impacts] = applyOperation(settings[impacts], item, itemOperation) * itemModifier
          }
          const { sides, bases, fold, thickness, height, growth, xScale, yScale } = modifiedProps
          const shapes = Array.from({ length: bases }, (_, index) => index + 1)
          const modifiedPosition = applyOperation(settings[impacts], seriesIndex, gapOperation) * gapModifier
          return (
            <group
              key={seriesIndex}
              position={[gapAxis === 'x' ? modifiedPosition : 0, height / 2, gapAxis === 'z' ? modifiedPosition : 0]}
            >
              <mesh position={[0, -height / 2, 0]}>
                <cylinderGeometry attach='geometry' args={[thickness, thickness, height, sides, 1]} />
                <meshPhysicalMaterial
                  attach='material'
                  color='gray'
                  metalness={0.9}
                  roughness={0.7}
                  side={THREE.DoubleSide}
                  transmission={0}
                />
              </mesh>
              {shapes.map((_, index) => {
                const scale = 1 - (index / shapes.length) * growth
                const yOffset = height * (1 - fold) * (index / shapes.length)
                const color = getColorFromIndex(index, shapes.length)
                return (
                  <mesh key={index} position={[0, yOffset, 0]} scale={[scale, 1, scale]}>
                    <coneGeometry attach='geometry' args={[xScale, yScale, sides, 1, true]} />
                    <meshPhysicalMaterial
                      attach='material'
                      color={color}
                      metalness={0.9}
                      roughness={0.5}
                      side={THREE.DoubleSide}
                      transmission={0}
                    />
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

export default Umbrella
