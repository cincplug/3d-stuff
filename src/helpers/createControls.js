export const createControls = (props) => {
  const chartDefaults = {
    items: 1,
    modifier: 10,
    modifierProp: 'height',
    modifierOperation: '*',
  }
  const controls = {}
  Object.keys(props).forEach((setting) => {
    const isCountable = ['sides', 'bases'].includes(setting)
    controls[setting] = {
      value: props?.[setting],
      min: isCountable ? 3 : -100,
      max: 100,
      step: isCountable ? 1 : 0.1,
    }
    if (setting === 'chart') {
      controls[setting].rows = true
    }
  })
  return { ...controls, ...chartDefaults }
}
