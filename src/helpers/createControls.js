export const createControls = (props) => {
  const chartDefaults = {
    items: 1,
    modifier: 10,
    impacts: 'height',
    operation: '*',
  }

  const impactss = Object.keys(props)
  const operations = ['+', '-', '*', '/', '**', 'pow', 'sqrt', 'sin', 'cos', 'tan', 'atan']

  const controls = { ...chartDefaults, ...props }

  Object.keys(props).forEach((setting) => {
    const isCountable = ['sides', 'bases'].includes(setting)
    controls[setting] = {
      value: props[setting],
      min: isCountable ? 3 : -100,
      max: 100,
      step: isCountable ? 1 : 0.1,
    }
  })

  controls.impacts = { value: impactss }
  controls.operation = { value: operations }

  return controls
}
