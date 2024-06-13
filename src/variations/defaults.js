const defaults = {
  bgColor: { value: '#112233' },
  autoRotate: { value: false },
  lightness: { value: 5, min: -100, max: 100, step: 0.1 },
  metalness: { value: 0.9, min: 0, max: 1, step: 0.01 },
  roughness: { value: 0.6, min: 0, max: 1, step: 0.01 },
  chart: { value: '1' },
  bases: { min: 1, max: 100, step: 1 },
  sides: { min: 3, max: 100, step: 1 },
  duration: { value: 2, min: 0, max: 10, step: 0.1 },
  impacts: { value: 'height' },
  itemModifier: { value: 1, min: 0, max: 10, step: 0.1 },
  itemOperation: { value: '*' },
  gapAxis: { value: 'x' },
  gapModifier: { value: 0.1, min: 0, max: 10, step: 0.01 },
  gapOperation: { value: '*' },
}

export default defaults
