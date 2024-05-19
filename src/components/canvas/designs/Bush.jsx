'use client'

import dynamic from 'next/dynamic'
import * as React from 'react'
import { Canvas } from '@react-three/fiber'
import { useControls } from 'leva'
const Environment = dynamic(() => import('@/components/canvas/Environment'), { ssr: false })

const Bush = () => {
  const { sides } = useControls('Shapes', { sides: { value: 10, min: 3, max: 30, step: 1 } })
  const { basesCount } = useControls('Shapes', { basesCount: { value: 100, min: 1, max: 200, step: 1 } })
  const { density } = useControls('Shapes', { density: { value: 2, min: 1, max: 10, step: 1 } })
  const shapes = Array.from({ length: basesCount }, (_, i) => i + 1)

  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Canvas className='size-full' color='black'>
        <Environment />
        {shapes.map((_shape, i) => {
          const height = Math.sqrt(i + 1)
          const width = 2 - i / shapes.length
          const depth = i / shapes.length
          const position = [
            Math.sin(i) * density,
            ((i - shapes.length) * height) / shapes.length,
            Math.cos(i) * density,
          ]
          return (
            <group key={i}>
              <BushBase width={width} depth={depth} height={height} position={position} sides={sides} />
            </group>
          )
        })}
      </Canvas>
    </div>
  )
}

const BushBase = ({ width, height, depth, position, sides }) => {
  return (
    <mesh position={position}>
      <cylinderGeometry attach='geometry' args={[width * 2, depth, height, sides]} />
      <meshStandardMaterial attach='material' color='#336600' metalness={0.9} roughness={3.8} />
    </mesh>
  )
}

export default Bush
