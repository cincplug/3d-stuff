import dynamic from 'next/dynamic'
import { applyOperation, getColorFromIndex } from '@/helpers/utils'

const View = dynamic(() => import('@/components/canvas/View'), { ssr: false })

const Bush = (props) => {
  const {
    lightness,
    cameraX,
    cameraY,
    cameraZ,
    bgColor,
    chart,
    impacts,
    itemModifier,
    itemOperation,
    gapAxis,
    gapModifier,
    gapOperation,
    ...settings
  } = props
  const series = chart ? chart.split(',').map(Number) : [1]
  return (
    <>
      <View {...{ lightness, cameraX, cameraY, cameraZ, bgColor }} />
      {series.map((item, seriesIndex) => {
        let modifiedProps = { ...settings }
        if (impacts) {
          modifiedProps[impacts] = applyOperation(settings[impacts], item, itemOperation) * itemModifier
        }
        const { sides, bases, spread, growth, thickness, colorFrom, colorTo } = modifiedProps
        const shapes = Array.from({ length: bases }, (_, i) => i + 1)
        const modifiedPosition = applyOperation(settings[impacts], seriesIndex, gapOperation) * gapModifier
        return (
          <group
            key={seriesIndex}
            position={[
              gapAxis === 'x' ? modifiedPosition : 0,
              gapAxis === 'y' ? modifiedPosition : 0,
              gapAxis === 'z' ? modifiedPosition : 0,
            ]}
          >
            {shapes.map((_shape, index) => {
              const height = Math.sqrt(index + 1) * growth
              const width = thickness - index / shapes.length
              const depth = index / shapes.length
              const position = [
                Math.sin(index) * spread,
                (index * height) / 2 / shapes.length - height / 2,
                Math.cos(index) * spread,
              ]
              const color = getColorFromIndex(index, shapes.length, colorFrom, colorTo)
              return (
                <mesh key={index} position={position}>
                  <cylinderGeometry attach='geometry' args={[width * 2, depth, height, sides]} />
                  <meshPhysicalMaterial attach='material' color={color} metalness={0.7} roughness={0.8} />
                </mesh>
              )
            })}
          </group>
        )
      })}
    </>
  )
}

export default Bush
