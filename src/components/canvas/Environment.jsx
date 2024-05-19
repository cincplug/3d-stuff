'use client'

import * as React from 'react'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'

const Environment = () => {
  const { cameraDistance } = useControls('Environment', {
    cameraDistance: { value: 30, min: 1, max: 100, step: 1 },
  })
  const { lightness } = useControls('Environment', {
    lightness: { value: 15, min: 0.1, max: 30, step: 0.1 },
  })
  const cameraPosition = [0, 0, cameraDistance]

  return (
    <>
      <PerspectiveCamera makeDefault position={cameraPosition} />
      <directionalLight position={[-5, 5, 10]} intensity={lightness} />
      <ambientLight position={[0, 0, 10]} intensity={lightness} />
      <OrbitControls />
    </>
  )
}

export default Environment
