import React from 'react'
import Link from 'next/link'
import { pascalToSpace } from '@/utils'
import components from '@/components/canvas/ComponentRegistry'
import variations from '@/variations'

const Nav = () => {
  return (
    <nav
      style={{
        padding: '10px',
        backgroundColor: '#333',
        color: '#fff',
        width: 'fit-content',
        position: 'absolute',
        zIndex: 1,
      }}
    >
      <ul style={{ listStyleType: 'none', display: 'flex', gap: '20px' }}>
        {Object.keys(components).map((component) => (
          <li key={component}>
            <ul>
              {Object.keys(variations[component]).map((variation) => (
                <li key={variation}>
                  <Link href={`/${component}/${variation}`}>{variation}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav
