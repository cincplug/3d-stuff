import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, Suspense } from 'react'
import { Color, Vector3, Box3 } from 'three'

const View = ({ lightness, cameraX, cameraY, cameraZ, bgColor }) => {
  const { camera, scene } = useThree()
  const cameraPosition = [cameraX, cameraY, cameraZ]
  const threeColor = new Color(bgColor)

  useEffect(() => {
    const box = new Box3().setFromObject(scene)
    const center = box.getCenter(new Vector3())

    camera.position.x = center.x
    camera.position.y = center.y
    camera.position.z = center.z - 20

    camera.lookAt(center)
  }, [camera, scene])

  return (
    <>
      <Suspense fallback={null}>
        <color attach='background' args={[threeColor.r, threeColor.g, threeColor.b]} />
        <directionalLight position={[5, 5, 5]} intensity={lightness} />
        <directionalLight position={[-5, -5, -5]} intensity={lightness} />
        <directionalLight position={[5, -5, 5]} intensity={lightness} />
        <directionalLight position={[-5, 5, -5]} intensity={lightness} />
        <ambientLight position={[0, 0, 10]} intensity={lightness} />
        <PerspectiveCamera makeDefault fov={40} position={cameraPosition} />
        <OrbitControls />
      </Suspense>
    </>
  )
}

export default View
