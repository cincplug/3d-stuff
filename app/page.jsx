'use client'

import { Suspense } from 'react'
import { pascalToSpace } from '@/helpers/utils'
import defaults from '@/variations/defaults'
import variations from '@/variations'
import components from '@/components/canvas/ComponentRegistry'
import Link from 'next/link'

const defaultVariation = 'Muffin'

const extractValues = (defaults) => {
  return Object.fromEntries(Object.entries(defaults).map(([key, { value }]) => [key, value]))
}

const [defaultComponent, defaultVariationProps] =
  Object.entries(variations).find(([, vars]) => vars.hasOwnProperty(defaultVariation)) || []

const DefaultComponent = components[defaultComponent]

const Nav = () => {
  const variationKeys = Object.values(variations).flatMap(Object.keys)
  return (
    <div className='absolute grid w-screen grid-cols-4 overflow-auto'>
      {variationKeys.map((variation, index) => (
        <Link
          key={index}
          href={`/${variation}`}
          className='flex h-[20vh] items-center justify-center text-2xl text-white'
        >
          {pascalToSpace(variation)}
        </Link>
      ))}
    </div>
  )
}

export default function Page() {
  const initialProps = { ...extractValues(defaults), ...defaultVariationProps[defaultVariation] }

  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Suspense fallback={null}>
        <Nav />
      </Suspense>
    </div>
  )
}
