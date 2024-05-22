import React from 'react'
import Link from 'next/link'
import { pascalToSpace } from '@/utils'
import components from '@/components/canvas/ComponentRegistry'
import variations from '@/variations'

const Nav = () => {
  return (
    <nav className='absolute z-10 m-3 w-fit'>
      {Object.keys(components).map((component) => (
        <ul className='mb-2 list-none rounded-sm bg-[#252731] p-[10px] text-[small]' key={component}>
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
