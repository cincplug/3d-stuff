export const createControls = (props) => {
  const impacts = Object.keys(props)
  const operations = ['+', '-', '*', '/', '**', 'pow', 'sqrt', 'sin', 'cos', 'tan', 'atan']

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

  return controls
}
