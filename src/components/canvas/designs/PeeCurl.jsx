'use client'

import dynamic from 'next/dynamic'
import * as React from 'react'
import { Canvas } from '@react-three/fiber'
import { useControls } from 'leva'
import { getColorFromIndex } from 'utils'
const Environment = dynamic(() => import('@/components/canvas/Environment'), { ssr: false })

const Shape = ({ sides, position, index, shapesLength }) => {
  const ref = React.useRef(null)
  const color = getColorFromIndex(index, shapesLength)

  const { rodsDensity } = useControls('Shapes', { rodsDensity: { value: 2, min: 1, max: 10, step: 1 } })
  const { rodsGrowth } = useControls('Shapes', { rodsGrowth: { value: 1, min: -10, max: 10, step: 0.1 } })

  return (
    <mesh ref={ref} position={position}>
      <coneGeometry attach='geometry' args={[2, 1, sides]} />
      <meshStandardMaterial attach='material' color={color} metalness={0.9} roughness={0.5} />
      {index % rodsDensity === 0 && (
        <>
          <coneGeometry attach='geometry' args={[1, index * rodsGrowth, sides]} />
          <meshStandardMaterial attach='material' color={color} metalness={0.9} roughness={0.7} />
        </>
      )}
    </mesh>
  )
}

const PeeCurl = () => {
  const { sides } = useControls('Shapes', { sides: { value: 10, min: 3, max: 30, step: 1 } })
  const { basesCount } = useControls('Shapes', { basesCount: { value: 100, min: 1, max: 200, step: 1 } })
  const { spread } = useControls('Shapes', { spread: { value: 0.7, min: 0.1, max: 1.5, step: 0.1 } })
  const { curvature } = useControls('Shapes', { curvature: { value: 1, min: -4, max: 4, step: 0.1 } })
  const shapes = Array.from({ length: basesCount }, (_, i) => i + 1)
  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Canvas className='size-full' color='black'>
        <Environment />
        {shapes.map((_shape, i) => {
          const angle = (i * Math.PI * 2) / shapes.length
          const radius = i ** spread
          return (
            <Shape
              key={i}
              index={i}
              sides={sides}
              position={[radius * Math.cos(angle * curvature), 0, radius * Math.sin(angle * curvature)]}
              shapesLength={shapes.length}
            />
          )
        })}
      </Canvas>
    </div>
  )
}

export default PeeCurl
