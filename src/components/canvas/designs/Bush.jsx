'use client'

import dynamic from 'next/dynamic'
import * as React from 'react'
import { Canvas } from '@react-three/fiber'
import { useControls } from 'leva'

const Environment = dynamic(() => import('@/components/canvas/Environment'), { ssr: false })

const Bush = () => {
  const { sides } = useControls({ sides: { value: 17, min: 3, max: 30, step: 1 } })
  const { count } = useControls({ count: { value: 39, min: 1, max: 200, step: 1 } })
  const { spread } = useControls({ spread: { value: 2, min: -10, max: 10, step: 0.1 } })
  const { growth } = useControls({ growth: { value: 1.5, min: -10, max: 10, step: 0.1 } })
  const { thickness } = useControls({ thickness: { value: -1, min: -2, max: 3, step: 0.1 } })

  const [, set] = useControls(() => ({
    sides,
    count,
    spread,
    growth,
    thickness,
  }))

  const variations = {
    Cake: {
      sides: 17,
      count: 39,
      spread: 4.3,
      growth: 1.4,
      thickness: 1,
    },
    Muffin: {
      sides: 20,
      count: 74,
      spread: 3.5,
      growth: -0.5,
      thickness: 1.7,
    },
    'Ice Cream': {
      sides: 8,
      count: 92,
      spread: -0.1,
      growth: 1.9,
      thickness: 1.5,
    },
  }
  const shapes = Array.from({ length: count }, (_, i) => i + 1)

  return (
    <>
      <ul
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          listStyleType: 'none',
          display: 'flex',
          gap: '20px',
          color: 'white',
          zIndex: 1,
        }}
      >
        {Object.keys(variations).map((key) => (
          <li key={key}>
            <button onClick={() => set(variations[key])}>{key}</button>
          </li>
        ))}
      </ul>

      <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
        <Canvas className='size-full' color='black'>
          <Environment />
          {shapes.map((_shape, i) => {
            const height = Math.sqrt(i + 1) * growth
            const width = thickness - i / shapes.length
            const depth = i / shapes.length
            const position = [Math.sin(i) * spread, (i * height) / 2 / shapes.length - height / 2, Math.cos(i) * spread]
            return (
              <mesh key={i} position={position}>
                <cylinderGeometry attach='geometry' args={[width * 2, depth, height, sides]} />
                <meshPhysicalMaterial attach='material' color='#336600' metalness={0.7} roughness={0.8} />
              </mesh>
            )
          })}
        </Canvas>
      </div>
    </>
  )
}

export default Bush
