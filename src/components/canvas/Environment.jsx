import React from 'react'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'

const Environment = ({ lightness, cameraX, cameraY, cameraZ }) => {
  const cameraPosition = [cameraX, cameraY, cameraZ]
  return (
    <>
      <PerspectiveCamera makeDefault position={cameraPosition} />
      <directionalLight position={[5, 5, 5]} intensity={lightness} />
      <directionalLight position={[-5, -5, -5]} intensity={lightness} />
      <directionalLight position={[5, -5, 5]} intensity={lightness} />
      <directionalLight position={[-5, 5, -5]} intensity={lightness} />
      <ambientLight position={[0, 0, 10]} intensity={lightness} />
      <OrbitControls />
    </>
  )
}

export default Environment
