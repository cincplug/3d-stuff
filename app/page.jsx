'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const PeeCurl = dynamic(() => import('@/components/canvas/designs/PeeCurl'), { ssr: false })

export default function Page() {
  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Suspense fallback={null}>
        <PeeCurl />
      </Suspense>
    </div>
  )
}
