import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'

const useAnimation = ({ initialValue, targetValue, duration, axis, meshRefs }) => {
  const [isAnimationFinished, setIsAnimationFinished] = useState(false)
  const animatedValue = useRef(initialValue)

  useEffect(() => {
    const start = performance.now()
    const animate = (time) => {
      const elapsed = (time - start) / 1000
      const progress = Math.min(elapsed / duration, 1)

      animatedValue.current = initialValue + (targetValue - initialValue) * progress

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsAnimationFinished(true)
      }
    }
    requestAnimationFrame(animate)
  }, [initialValue, targetValue, duration])

  useFrame(() => {
    if (!isAnimationFinished) {
      meshRefs.current.forEach((mesh, meshIndex) => {
        if (mesh) {
          mesh.rotation[axis] = animatedValue.current / (meshRefs.current.length - meshIndex + 1)
        }
      })
    }
  })

  return [animatedValue, isAnimationFinished]
}

export default useAnimation
