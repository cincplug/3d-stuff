'use client'

import * as React from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'

const Pinecone = () => {
  const { sides } = useControls('Shapes', { sides: { value: 10, min: 3, max: 30, step: 1 } })
  const { basesCount } = useControls('Shapes', { basesCount: { value: 100, min: 1, max: 200, step: 1 } })
  const { cameraDistance } = useControls('Environment', {
    cameraDistance: { value: 30, min: 1, max: 100, step: 1 },
  })
  const { lightness } = useControls('Environment', {
    lightness: { value: 1, min: 0.1, max: 3, step: 0.1 },
  })
  const { density } = useControls('Shapes', { density: { value: 2, min: 1, max: 10, step: 1 } })

  const shapes = Array.from({ length: basesCount }, (_, i) => i + 1)
  const cameraPosition = [0, 0, cameraDistance]

  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Canvas className='size-full' color='black'>
        <PerspectiveCamera makeDefault position={cameraPosition} />
        <directionalLight position={[density * 5, 10, 0]} intensity={5 * lightness} />
        <ambientLight position={[0, 2, 10]} intensity={20 * lightness} />
        <OrbitControls />
        {shapes.map((_shape, i) => {
          const height = Math.sqrt(i)
          const width = 2 - i / shapes.length
          const depth = i / shapes.length
          const position = [Math.sin(i) * density, Math.sqrt(i * height), Math.cos(i) * density]
          return (
            <group key={i}>
              <PineconeBase width={width} depth={depth} height={height} position={position} sides={sides} />
            </group>
          )
        })}
      </Canvas>
    </div>
  )
}

const PineconeBase = ({ width, height, depth, position, sides }) => {
  return (
    <mesh position={position}>
      <cylinderGeometry attach='geometry' args={[width * 2, width / 2, height, sides]} />
      <meshStandardMaterial attach='material' color='#336600' metalness={0.9} roughness={0.8} />
    </mesh>
  )
}

export default Pinecone
