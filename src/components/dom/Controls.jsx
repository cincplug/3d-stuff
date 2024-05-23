import React, { useState } from 'react'

const Controls = ({ controls, handleInputChange }) => {
  const [selectedValues, setSelectedValues] = useState(() => {
    const initialValues = {}
    Object.keys(controls).forEach((control) => {
      initialValues[control] = controls[control].value
    })
    return initialValues
  })

  const handleSelectChange = (event) => {
    const { id, value } = event.target
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }))
    handleInputChange(event)
  }

  const handleRangeChange = (event) => {
    const { id, value } = event.target
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [id]: Number(value),
    }))
    handleInputChange(event)
  }

  return (
    <aside className='absolute right-2 top-2 grid w-60 grid-cols-12 gap-2 bg-slate-800 p-2 text-sm text-slate-50'>
      {Object.keys(controls).map((control, controlIndex) => {
        const { min, max, step, value } = controls[control]
        const displayValue = typeof value === 'number' ? value : JSON.stringify(value)
        const uiElement = Array.isArray(value) ? (
          <select
            className='col-span-6 text-black'
            id={control}
            value={selectedValues[control]}
            onChange={handleSelectChange}
          >
            {value.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <>
            <input
              className='col-span-6'
              id={control}
              type='range'
              min={min}
              max={max}
              step={step}
              value={selectedValues[control]}
              onChange={handleRangeChange}
            />
            <span className='col-span-2'>{displayValue}</span>
          </>
        )
        return (
          <React.Fragment key={controlIndex}>
            <label className='col-span-4' htmlFor={control}>
              {control}
            </label>
            {uiElement}
          </React.Fragment>
        )
      })}
    </aside>
  )
}

export default Controls
