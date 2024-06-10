import React from 'react'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { Color } from 'three'

const Environment = ({ lightness, cameraX, cameraY, cameraZ, bgColor }) => {
  const cameraPosition = [cameraX, cameraY, cameraZ]
  const threeColor = new Color(bgColor)
  return (
    <>
      <color attach='background' args={[threeColor.r, threeColor.g, threeColor.b]} />
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
