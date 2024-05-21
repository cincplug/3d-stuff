import * as React from 'react'
import { useEffect } from 'react'
import variations from '@/variations'
import { pascalToSpace } from '@/utils'

const VariationNav = ({ component, defaultValues, set }) => {
  const [title, setTitle] = React.useState(component)

  const handleClick = (key) => {
    set(variations[component][key])
    setTitle(key)
  }

  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <ul
      style={{
        position: 'absolute',
        backgroundColor: '#333',
        top: 50,
        left: 0,
        listStyleType: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        color: 'white',
        zIndex: 1,
        padding: '10px',
      }}
    >
      <li>
        <button onClick={() => set(defaultValues)}>{pascalToSpace(component)}</button>
      </li>
      {Object.keys(variations[component]).map((key) => (
        <li key={key}>
          <button onClick={() => handleClick(key)}>{key}</button>
        </li>
      ))}
    </ul>
  )
}

export default VariationNav
