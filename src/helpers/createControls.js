export const createControls = (props) => {
  const cameraLightSettings = ['lightness', 'cameraX', 'cameraY', 'cameraZ']
  const chartSettings = ['chart', 'impacts', 'modifier', 'operation']
  const nonImpactedSettings = [...cameraLightSettings, ...chartSettings]
  const impactedSettings = Object.keys(props).filter((setting) => !nonImpactedSettings.includes(setting))
  const impacts = impactedSettings
  const operations = ['+', '-', '*', '/', 'pow', 'sqrt', 'sin', 'cos', 'tan', 'atan', 'log', 'exp', 'abs', 'mod']

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
  controls.operation = { value: operations }

  return {
    'Scene settings': Object.fromEntries(cameraLightSettings.map((key) => [key, controls[key]])),
    'Shape settings': Object.fromEntries(impactedSettings.map((key) => [key, controls[key]])),
    'Chart settings': Object.fromEntries(chartSettings.map((key) => [key, controls[key]])),
  }
}
