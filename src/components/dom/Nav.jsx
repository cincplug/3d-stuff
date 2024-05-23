import React from 'react'
import Link from 'next/link'
import { pascalToSpace } from '@/helpers/utils'
import components from '@/components/canvas/ComponentRegistry'
import variations from '@/variations'

const Nav = () => {
  return (
    <nav className='absolute left-2 top-2 z-10 w-fit'>
      {Object.keys(components).map((component) => (
        <ul className='mb-2 list-none rounded-sm bg-slate-800 p-2 text-sm text-slate-50' key={component}>
          {Object.keys(variations[component]).map((variation) => (
            <li className='text-[#cdcdcd] hover:text-[#fafafa]' key={variation}>
              <Link href={`/${variation}`}>{pascalToSpace(variation)}</Link>
            </li>
          ))}
        </ul>
      ))}
    </nav>
  )
}

export default Nav
