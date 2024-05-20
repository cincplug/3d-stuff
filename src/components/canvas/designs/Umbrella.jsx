'use client'

import dynamic from 'next/dynamic'
import * as React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import * as THREE from 'three'
import { getColorFromIndex, getDefaultValues } from '@/utils'
import VariationNav from '../VariationNav'

const Environment = dynamic(() => import('@/components/canvas/Environment'), { ssr: false })

const Umbrella = () => {
  const defaultSettings = {
    sides: { value: 10, min: 3, max: 30, step: 1 },
    baseCount: { value: 10, min: 1, max: 20, step: 1 },
    fold: { value: 1, min: -1, max: 2, step: 0.01 },
    thickness: { value: 0.5, min: 0.1, max: 2, step: 0.1 },
    height: { value: 20, min: -40, max: 40, step: 0.1 },
    growth: { value: 0.9, min: -3, max: 3, step: 0.1 },
    xScale: { value: 10, min: -3, max: 23, step: 0.1 },
    yScale: { value: 5, min: -3, max: 23, step: 0.1 },
  }

  const { sides, baseCount, fold, thickness, height, growth, xScale, yScale } = useControls(defaultSettings)
  const defaultValues = getDefaultValues(defaultSettings)
  const [, set] = useControls(() => defaultValues)

  return (
    <>
      <VariationNav {...{ set, defaultValues, component: 'Umbrella' }} />
      <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
        <Canvas className='size-full' color='black'>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Environment />
          <OrbitControls />
          <group position={[0, height / 2, 0]}>
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
            {Array.from({ length: baseCount }).map((_, index) => {
              const scale = 1 - (index / baseCount) * growth
              const yOffset = height * (1 - fold) * (index / baseCount)
              const color = getColorFromIndex(index, baseCount)
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
        </Canvas>
      </div>
    </>
  )
}

export default Umbrella
