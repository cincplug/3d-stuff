'use client'

import dynamic from 'next/dynamic'
import React, { useEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import * as THREE from 'three'
import { getColorFromIndex, createControls, updateSettings } from '@/utils'

const Environment = dynamic(() => import('@/components/canvas/Environment'), { ssr: false })

const Umbrella = (props) => {
  const settings = useMemo(() => ['sides', 'count', 'fold', 'thickness', 'height', 'growth', 'xScale', 'yScale'], [])
  const controls = createControls(settings, props)

  const [levaSettings, set] = useControls(() => controls)

  useEffect(() => {
    if (props) {
      updateSettings(settings, props, set)
    }
  }, [props, set, settings])

  const chart = props.chart
  const series = chart ? chart.data : [1]
  const shapes = Array.from({ length: levaSettings.count }, (_, index) => index + 1)

  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Canvas className='size-full' color='black'>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Environment />
        <OrbitControls />
        {series.map((item, seriesIndex) => {
          let modifiedProps = { ...levaSettings }
          if (chart) {
            chart.props.forEach((prop) => {
              let affectedProp = settings.find((p) => p === prop)
              modifiedProps[affectedProp] *= item
            })
          }
          const { sides, fold, thickness, height, growth, xScale, yScale } = modifiedProps
          return (
            <group key={seriesIndex} position={[seriesIndex, height / 2, 0]}>
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
              {shapes.map((_, index) => {
                const scale = 1 - (index / shapes.length) * growth
                const yOffset = height * (1 - fold) * (index / shapes.length)
                const color = getColorFromIndex(index, shapes.length)
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
          )
        })}
      </Canvas>
    </div>
  )
}

export default Umbrella
