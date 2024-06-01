'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import defaults from '@/variations/defaults'
import variations from '@/variations'

const PeeCurl = dynamic(() => import('@/components/canvas/designs/PeeCurl'), { ssr: false })
const variation = 'Amphitheater'

export default function Page() {
  const [_component, variationProps] =
    Object.entries(variations).find(([, vars]) => vars.hasOwnProperty(variation)) || []
  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Suspense fallback={null}>
        <PeeCurl {...{ ...defaults, ...variationProps[variation] }} />
      </Suspense>
    </div>
  )
}
