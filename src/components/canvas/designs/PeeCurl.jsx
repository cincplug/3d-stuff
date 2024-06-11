import dynamic from 'next/dynamic'
import { applyOperation, getColorFromIndex } from '@/helpers/utils'

const Environment = dynamic(() => import('@/components/canvas/Environment'), { ssr: false })

const PeeCurl = (props) => {
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
      <Environment {...{ lightness, cameraX, cameraY, cameraZ, bgColor }} />
      {series.map((item, seriesIndex) => {
        let modifiedProps = { ...settings }
        if (impacts) {
          modifiedProps[impacts] = applyOperation(settings[impacts], item, itemOperation) * itemModifier
        }
        const { sides, bases, spread, curvature, thickness, height, growth, colorFrom, colorTo } = modifiedProps
        const shapes = Array.from({ length: bases * 2 }, (_, index) => index + 1)
        const modifiedPosition = applyOperation(settings[impacts], seriesIndex, gapOperation) * gapModifier
        return (
          <group
            key={seriesIndex}
            position={[
              gapAxis === 'x' ? modifiedPosition : 0,
              gapAxis === 'y' ? modifiedPosition : seriesIndex * itemModifier,
              gapAxis === 'z' ? modifiedPosition : 0,
            ]}
          >
            {shapes.map((_, index) => {
              const angle = (index * Math.PI * 2) / shapes.length
              const radius = index ** (spread / 10)
              const position = [radius * Math.cos(angle * curvature), 0, radius * Math.sin(angle * curvature)]
              const color = getColorFromIndex(index, shapes.length, colorFrom, colorTo)
              const rodHeight = index * growth

              return (
                <group key={index} position={position}>
                  {index > 1 && index < shapes.length - 1 && (
                    <mesh position={[0, (growth * height) / 2, 0]}>
                      <coneGeometry attach='geometry' args={[2, 1, sides]} />
                      <meshStandardMaterial attach='material' color={color} metalness={0.9} roughness={0.5} />
                    </mesh>
                  )}
                  {index > 0 && index % 2 === 0 && (
                    <mesh position={[0, rodHeight / 2, 0]}>
                      <cylinderGeometry
                        attach='geometry'
                        args={[thickness, thickness, rodHeight + growth * height, sides]}
                      />
                      <meshStandardMaterial attach='material' color={color} metalness={0.9} roughness={0.7} />
                    </mesh>
                  )}
                </group>
              )
            })}
          </group>
        )
      })}
    </>
  )
}

export default PeeCurl
