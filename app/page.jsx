'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import defaults from '@/variations/defaults'
import variations from '@/variations'
import Wrap from '@/components/canvas/Wrap'

const defaultVariation = 'Muffin'

const [defaultComponent, defaultVariationProps] =
  Object.entries(variations).find(([, vars]) => vars.hasOwnProperty(defaultVariation)) || []

const DefaultComponent = dynamic(() => import(`@/components/canvas/designs/${defaultComponent}`), {
  ssr: false,
})

export default function Page() {
  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Suspense fallback={null}>
        <Wrap
          ContentComponent={DefaultComponent}
          initialProps={{ ...defaults, ...defaultVariationProps[defaultVariation] }}
        />
      </Suspense>
    </div>
  )
}
