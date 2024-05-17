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

  const { rodsDensity } = useControls('Rods Density', { rodsDensity: { value: 2, min: 1, max: 10, step: 1 } })
  const { rodsGrowth } = useControls('Rods growth', { rodsGrowth: { value: 1, min: -10, max: 10, step: 0.1 } })

  return (
    <mesh ref={ref} position={position}>
      <coneGeometry attach='geometry' args={[-index + sides, index / sides, sides]} />
      <meshStandardMaterial attach='material' color={color} metalness={0.9} roughness={0.5} />
      {index % rodsDensity === 0 && (
        <>
          <coneGeometry attach='geometry' args={[index / index, index * rodsGrowth, sides]} />
          <meshStandardMaterial attach='material' color={color} metalness={0.8} roughness={0.5} />
        </>
      )}
    </mesh>
  )
}

const Main = () => {
  const { basesCount } = useControls('Bases count', { basesCount: { value: 100, min: 1, max: 200, step: 1 } })
  const { basesGrowth } = useControls('Bases growth', { basesGrowth: { value: 1, min: -10, max: 10, step: 0.1 } })
  const { curvature } = useControls('Curvature', { curvature: { value: 1, min: -4, max: 4, step: 0.1 } })
  const { cameraDistance } = useControls('Camera distance', {
    cameraDistance: { value: 30, min: 1, max: 100, step: 1 },
  })
  const shapes = Array.from({ length: basesCount }, (_, i) => i + basesGrowth)
  const cameraPosition = [0, 0, cameraDistance]
  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Canvas className='size-full' color='black'>
        <PerspectiveCamera makeDefault position={cameraPosition} />
        <directionalLight position={[-5, 5, 10]} intensity={5} />
        <ambientLight position={[0, 0, 10]} intensity={20} />
        <OrbitControls />
        {shapes.map((sides, i) => {
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
