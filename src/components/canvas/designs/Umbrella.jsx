import React from 'react'
import { DoubleSide } from 'three'
import { applyOperation, getColorFromIndex } from '@/helpers/utils'
import dynamic from 'next/dynamic'

const View = dynamic(() => import('@/components/canvas/View'), { ssr: false })

const UmbrellaContent = (props) => {
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
    ...settings
  } = props
  const series = chart ? chart.split(',').map(Number) : [1]

  return (
    <>
      <View {...{ lightness, cameraX, cameraY, cameraZ, bgColor }} />
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
            position={[
              gapAxis === 'x' ? modifiedPosition : 0,
              gapAxis === 'y' ? modifiedPosition : 0,
              gapAxis === 'z' ? modifiedPosition : 0,
            ]}
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
    </>
  )
}

export default UmbrellaContent
