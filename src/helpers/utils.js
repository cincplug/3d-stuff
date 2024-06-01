export const getColorFromIndex = (index, shapesLength, minHex = '#675668', maxHex = '#6d434c') => {
  const minRGB = hexToRGB(minHex)
  const maxRGB = hexToRGB(maxHex)

  const deltaR = (maxRGB.r - minRGB.r) / (shapesLength - 1)
  const deltaG = (maxRGB.g - minRGB.g) / (shapesLength - 1)
  const deltaB = (maxRGB.b - minRGB.b) / (shapesLength - 1)

  const currentR = Math.floor(minRGB.r + index * deltaR)
  const currentG = Math.floor(minRGB.g + index * deltaG)
  const currentB = Math.floor(minRGB.b + index * deltaB)

  return `#${currentR.toString(16).padStart(2, '0')}${currentG.toString(16).padStart(2, '0')}${currentB.toString(16).padStart(2, '0')}`
}

export const hexToRGB = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

export const pascalToSpace = (text) => {
  return text.replace(/([A-Z])/g, ' $1')
}

export const applyOperation = (itemIndex, modifier, operation) => {
  switch (operation) {
    case '+':
      return itemIndex + modifier
    case '-':
      return itemIndex - modifier
    case '*':
      return itemIndex * modifier
    case '/':
      return modifier !== 0 ? itemIndex / modifier : itemIndex
    case 'pow':
      return itemIndex >= 0 ? Math.pow(itemIndex, modifier) : itemIndex
    case 'sqrt':
      return itemIndex >= 0 ? Math.sqrt(itemIndex) * modifier : itemIndex
    case 'sin':
      return Math.sin(itemIndex / modifier)
    case 'cos':
      return Math.cos(itemIndex / modifier)
    case 'tan':
      return Math.tan(itemIndex / modifier)
    case 'atan':
      return Math.atan(itemIndex / modifier)
    case 'log':
      return itemIndex > 0 ? Math.log(itemIndex) * modifier : itemIndex
    case 'exp':
      return Math.exp(itemIndex / modifier)
    case 'abs':
      return Math.abs(itemIndex) * modifier
    case 'mod':
      return modifier !== 0 ? itemIndex % modifier : itemIndex
    default:
      return itemIndex * modifier
  }
}
