import Controls from '@/components/dom/Controls'
import { createControls } from '@/helpers/createControls'
import { applyOperation, getColorFromIndex } from '@/helpers/utils'
import { Canvas } from '@react-three/fiber'
import { DoubleSide } from 'three'
import dynamic from 'next/dynamic'
import { useState } from 'react'

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
    bgColor,
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
        <Environment {...{ lightness, cameraX, cameraY, cameraZ, bgColor }} />
        {series.map((item, seriesIndex) => {
          let modifiedProps = { ...settings }
          if (impacts) {
            modifiedProps[impacts] = applyOperation(settings[impacts], item, itemOperation) * itemModifier
          }
          const { sides, bases, fold, thickness, height, growth, xScale, yScale, colorFrom, colorTo } = modifiedProps
          const shapes = Array.from({ length: bases }, (_, index) => index + 1)
          const modifiedPosition = applyOperation(settings[impacts], seriesIndex, gapOperation) * gapModifier
          return (
            <group
              key={seriesIndex}
              position={[gapAxis === 'x' ? modifiedPosition : 0, 0, gapAxis === 'z' ? modifiedPosition : 0]}
            >
              <mesh position={[0, -height / 2, 0]}>
                <cylinderGeometry attach='geometry' args={[thickness, thickness, height, sides, 1]} />
                <meshPhysicalMaterial
                  attach='material'
                  color='gray'
                  metalness={0.9}
                  roughness={0.7}
                  side={DoubleSide}
                  transmission={0}
                />
              </mesh>
              {shapes.map((_, index) => {
                const scale = 1 - (index / shapes.length) * growth
                const yOffset = height * (1 - fold) * (index / shapes.length)
                const color = getColorFromIndex(index, shapes.length, colorFrom, colorTo)
                return (
                  <mesh key={index} position={[0, yOffset, 0]} scale={[scale, 1, scale]}>
                    <coneGeometry attach='geometry' args={[xScale, yScale, sides, 1, true]} />
                    <meshPhysicalMaterial
                      attach='material'
                      color={color}
                      metalness={0.9}
                      roughness={0.5}
                      side={DoubleSide}
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
