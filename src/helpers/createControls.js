export const createControls = (props) => {
  const cameraLightSettings = ['lightness', 'cameraX', 'cameraY', 'cameraZ', 'bgColor']
  const chartSettings = ['chart', 'impacts', 'itemModifier', 'itemOperation', 'gapAxis', 'gapModifier', 'gapOperation']
  const nonShapeSettings = [...cameraLightSettings, ...chartSettings]
  const shapeSettings = Object.keys(props).filter((setting) => !nonShapeSettings.includes(setting))
  const impacts = shapeSettings.filter((setting) => !setting.includes('color'))
  const itemOperations = ['+', '-', '*', '/', 'pow', 'sqrt', 'sin', 'cos', 'tan', 'atan', 'log', 'exp', 'abs', 'mod']
  const axes = ['x', 'z']

  const controls = { ...props }

  Object.keys(controls).forEach((setting) => {
    const isCountable = ['sides', 'bases'].includes(setting)
    controls[setting] = {
      value: controls[setting],
      min: isCountable ? 3 : -100,
      max: 100,
      step: isCountable ? 1 : 0.1,
    }
  })

  controls.impacts = { value: impacts }
  controls.itemOperation = { value: itemOperations }
  controls.gapOperation = { value: itemOperations }
  controls.gapAxis = { value: axes }

  return {
    'Scene settings': Object.fromEntries(cameraLightSettings.map((key) => [key, controls[key]])),
    'Shape settings': Object.fromEntries(shapeSettings.map((key) => [key, controls[key]])),
    'Chart settings': Object.fromEntries(chartSettings.map((key) => [key, controls[key]])),
  }
}
