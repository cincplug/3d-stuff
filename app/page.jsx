'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import defaults from '@/variations/defaults'
import variations from '@/variations'
import Wrap from '@/components/canvas/Wrap'
import components from '@/components/canvas/ComponentRegistry'

const defaultVariation = 'Muffin'

const extractValues = (defaults) => {
  return Object.fromEntries(Object.entries(defaults).map(([key, { value }]) => [key, value]))
}

const [defaultComponent, defaultVariationProps] =
  Object.entries(variations).find(([, vars]) => vars.hasOwnProperty(defaultVariation)) || []

const DefaultComponent = components[defaultComponent]

export default function Page() {
  const initialProps = { ...extractValues(defaults), ...defaultVariationProps[defaultVariation] }

  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Suspense fallback={null}>
        <Wrap ContentComponent={DefaultComponent} initialProps={initialProps} />
      </Suspense>
    </div>
  )
}
