import React from 'react'

const Controls = ({ controls, settings, handleInputChange }) => {
  return (
    <aside className='absolute right-2 top-2 grid w-60 grid-cols-12 gap-2 bg-slate-800 p-2 text-sm text-slate-50'>
      {Object.keys(controls).map((control, controlIndex) => {
        const { min, max, step, value } = controls[control]
        const displayValue = typeof value === 'number' ? value : JSON.stringify(value)
        return (
          <React.Fragment key={controlIndex}>
            <label className='col-span-4' htmlFor={control}>
              {control}
            </label>
            <input
              className='col-span-6'
              id={control}
              type='range'
              {...{ min, max, step, value }}
              onChange={handleInputChange}
            />
            <label className='col-span-2'>{displayValue}</label>
          </React.Fragment>
        )
      })}
    </aside>
  )
}

export default Controls
