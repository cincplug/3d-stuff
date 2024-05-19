import * as React from 'react'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'

const Environment = () => {
  const { cameraX, cameraY, cameraZ, lightness } = useControls('Environment', {
    cameraX: { value: 0, min: -100, max: 200, step: 1 },
    cameraY: { value: 0, min: -100, max: 200, step: 1 },
    cameraZ: { value: 30, min: 1, max: 100, step: 1 },
    lightness: { value: 15, min: 0.1, max: 30, step: 0.1 },
  })
  const cameraPosition = [cameraX, cameraY, cameraZ]

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
