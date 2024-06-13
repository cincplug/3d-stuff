import defaults from '@/variations/defaults'

export const createControls = (props) => {
  const cameraLightSettings = ['lightness', 'autoRotate', 'bgColor']
  const chartSettings = ['chart', 'impacts', 'itemModifier', 'itemOperation', 'gapAxis', 'gapModifier', 'gapOperation']
  const nonShapeSettings = [...cameraLightSettings, ...chartSettings]
  const shapeSettings = Object.keys(props).filter((setting) => !nonShapeSettings.includes(setting))
  const impacts = shapeSettings.filter((setting) => !setting.includes('color'))
  const itemOperations = ['+', '-', '*', '/', 'pow', 'sqrt', 'sin', 'cos', 'tan', 'atan', 'log', 'exp', 'abs', 'mod']
  const axes = ['x', 'y', 'z']

  const controls = {}

  Object.keys(props).forEach((setting) => {
    const { value } = props[setting]
    const { min, max, step } = defaults[setting] || {} // get min, max, step from defaults
    controls[setting] = {
      value,
      min: min !== undefined ? min : -100, // use value from defaults if it exists, otherwise use fallback
      max: max !== undefined ? max : 100, // use value from defaults if it exists, otherwise use fallback
      step: step !== undefined ? step : 0.1, // use value from defaults if it exists, otherwise use fallback
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
