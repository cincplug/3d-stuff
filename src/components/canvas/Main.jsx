'use client'

import * as React from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import { getColorFromIndex } from 'utils'

const Shape = ({ sides, position, index, shapesLength }) => {
  const ref = React.useRef(null)
  const color = getColorFromIndex(index, shapesLength)
  const { mouse } = useThree()

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x = ref.current.rotation.y *= mouse.x / 10
    }
  })

  const { basesGrowth } = useControls('Shapes', { basesGrowth: { value: 1, min: 1, max: 10, step: 0.1 } })
  const { rodsDensity } = useControls('Shapes', { rodsDensity: { value: 2, min: 1, max: 10, step: 1 } })
  const { rodsGrowth } = useControls('Shapes', { rodsGrowth: { value: 1, min: -10, max: 10, step: 0.1 } })

  return (
    <mesh ref={ref} position={position}>
      <coneGeometry attach='geometry' args={[1, index / basesGrowth, sides]} />
      <meshStandardMaterial attach='material' color={color} metalness={0.9} roughness={0.5} />
      {index % rodsDensity === 0 && (
        <>
          <coneGeometry attach='geometry' args={[1, index * rodsGrowth, sides]} />
          <meshStandardMaterial attach='material' color={color} metalness={0.8} roughness={0.5} />
        </>
      )}
    </mesh>
  )
}

const Main = () => {
  const { sides } = useControls('Shapes', { sides: { value: 10, min: 3, max: 30, step: 1 } })
  const { basesCount } = useControls('Shapes', { basesCount: { value: 100, min: 1, max: 200, step: 1 } })
  const { curvature } = useControls('Shapes', { curvature: { value: 1, min: -4, max: 4, step: 0.1 } })
  const { cameraDistance } = useControls('Environment', {
    cameraDistance: { value: 30, min: 1, max: 100, step: 1 },
  })
  const { lightness } = useControls('Environment', {
    lightness: { value: 1, min: 0.1, max: 3, step: 0.1 },
  })
  const shapes = Array.from({ length: basesCount }, (_, i) => i + 1)
  const cameraPosition = [0, 0, cameraDistance]
  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Canvas className='size-full' color='black'>
        <PerspectiveCamera makeDefault position={cameraPosition} />
        <directionalLight position={[-5, 5, 10]} intensity={5 * lightness} />
        <ambientLight position={[0, 0, 10]} intensity={20 * lightness} />
        <OrbitControls />
        {shapes.map((_shape, i) => {
          const angle = (i * Math.PI * 2) / shapes.length
          const radius = Math.sqrt(i)
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

export default Main
