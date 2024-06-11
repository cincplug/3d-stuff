import React, { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { Color } from 'three'

const Environment = ({ lightness, cameraX, cameraY, cameraZ, bgColor }) => {
  const { camera, scene } = useThree()
  const cameraPosition = [cameraX, cameraY, cameraZ]
  const threeColor = new Color(bgColor)

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())

    camera.position.x = center.x
    camera.position.y = center.y
    camera.position.z = center.z - 20

    camera.lookAt(center)
  }, [camera, scene])

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
