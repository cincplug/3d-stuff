import React from 'react'
import Link from 'next/link'
import { pascalToSpace } from '@/helpers/utils'
import components from '@/components/canvas/ComponentRegistry'
import variations from '@/variations'

const Nav = ({ currentPath }) => {
  return (
    <nav className='absolute left-2 top-2 z-10 w-fit'>
      {Object.keys(components).map((component) => (
        <ul className='mb-2 list-none rounded-sm bg-slate-700 p-2 text-sm' key={component}>
          {Object.keys(variations[component]).map((variation) => {
            const isActive = currentPath === `/${variation}`
            return (
              <li key={variation}>
                <Link
                  href={`/${variation}`}
                  className={`text-slate-300 hover:text-yellow-300 ${isActive ? 'text-yellow-300' : ''}`}
                >
                  {pascalToSpace(variation)} Chart
                </Link>
              </li>
            )
          })}
        </ul>
      ))}
    </nav>
  )
}

export default Nav
