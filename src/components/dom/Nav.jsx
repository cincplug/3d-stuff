'use client'

import React from 'react'
import Link from 'next/link'
import { pascalToSpace } from 'utils'
import components from '@/components/canvas/ComponentRegistry'

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
            <Link href={`/${component}`}>{pascalToSpace(component)}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav
