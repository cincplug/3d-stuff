import React, { useRef } from 'react'
import dynamic from 'next/dynamic'
import { applyOperation, getColorFromIndex } from '@/helpers/utils'
import useAnimation from '@/templates/hooks/useAnimation' // Update the path accordingly

const View = dynamic(() => import('@/components/canvas/View'), { ssr: false })

const Bush = (props) => {
  const {
    lightness,
    autoRotate,
    bgColor,
    chart,
    impacts,
    itemModifier,
    itemOperation,
    gapAxis,
    gapModifier,
    gapOperation,
    duration,
    isPreview,
    ...settings
  } = props
  const series = chart ? chart.split(',').map(Number) : [1]
  const meshRefs = useRef([])
  useAnimation({ initialValue: Math.PI * 2, targetValue: 0, duration, axis: gapAxis, meshRefs })

  return (
    <>
      <View {...{ lightness, autoRotate, bgColor, isPreview }} />
      {series.map((item, seriesIndex) => {
        let modifiedProps = { ...settings }
        if (impacts) {
          modifiedProps[impacts] = applyOperation(settings[impacts], item, itemOperation) * itemModifier
        }
        const { sides, bases, spread, growth, thickness, colorFrom, colorTo, metalness, roughness } = modifiedProps
        const shapes = Array.from({ length: bases }, (_, i) => i + 1)
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
                <mesh
                  ref={(el) => (meshRefs.current[seriesIndex * shapes.length + index] = el)}
                  key={index}
                  position={position}
                >
                  <cylinderGeometry attach='geometry' args={[width * 2, depth, height, sides]} />
                  <meshPhysicalMaterial attach='material' color={color} metalness={metalness} roughness={roughness} />
                </mesh>
              )
            })}
          </group>
        )
      })}
    </>
  )
}

export default Bush
