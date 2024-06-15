import React from 'react'
import { pascalToSpace } from '@/helpers/utils'

const Controls = ({ controls, handleInputChange, currentSettings }) => {
  const handleTextChange = (event) => {
    const { id, value } = event.target
    let newValue = value
    if (id === 'chart') {
      newValue = value.replace(/[^0-9,.-]/g, '')
      newValue = newValue.replace(/\.+/g, '.')
      newValue = newValue.replace(/,+/g, ',')
    } else {
      try {
        newValue = JSON.parse(value) || currentSettings[id]
      } catch {
        newValue = currentSettings[id]
      }
    }
    handleInputChange({ target: { id, value: newValue } })
  }

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target
    handleInputChange({ target: { id, value: checked } })
  }

  const getInputElement = (control, controlProps) => {
    const { value, min, max, step } = controlProps
    const displayValue = currentSettings[control] !== undefined ? currentSettings[control] : value
    const isChart = control === 'chart'
    const isBool = typeof displayValue === 'boolean'
    const isColor = control.toLowerCase().includes('color')
    const isArray = Array.isArray(value)

    const inputProps = {
      className: `col-span-6 justify-self-start bg-slate-900 text-slate-300 hover:bg-black ${!isBool && !isColor ? 'w-full' : ''}`,
      id: control,
      value: displayValue,
      onChange: isChart ? handleTextChange : handleInputChange,
    }

    if (isChart) {
      return <textarea {...inputProps} />
    } else if (isBool) {
      return (
        <input {...inputProps} id={control} type='checkbox' checked={displayValue} onChange={handleCheckboxChange} />
      )
    } else if (isColor) {
      return <input {...inputProps} type='color' />
    } else if (isArray) {
      return (
        <select {...inputProps} value={displayValue} onChange={handleInputChange}>
          {value.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )
    } else {
      return (
        <>
          <input {...inputProps} type='range' min={min} max={max} step={step} />
          <span className='col-span-1'>{displayValue}</span>
        </>
      )
    }
  }

  return (
    <aside className='scrollbar absolute inset-y-2 right-2 w-72 overflow-y-auto overflow-x-hidden bg-slate-700 px-2 text-xs text-slate-300'>
      {Object.entries(controls).map(([category]) => (
        <fieldset key={category} className='grid grid-cols-12 gap-2 pb-2'>
          <legend className='py-2 text-sm'>{category}</legend>
          {Object.entries(controls[category]).map(([control, controlProps], controlIndex) => {
            const label = pascalToSpace(control).toLowerCase()
            return (
              <React.Fragment key={controlIndex}>
                <label className='col-span-5 leading-4' htmlFor={control}>
                  {label}
                </label>
                {getInputElement(control, controlProps)}
              </React.Fragment>
            )
          })}
        </fieldset>
      ))}
    </aside>
  )
}

export default Controls
