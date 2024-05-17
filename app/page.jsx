'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Main = dynamic(() => import('@/components/canvas/Main'), { ssr: false })

export default function Page() {
  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Suspense fallback={null}>
        <Main route='/blob' scale={0.6} position={[0, 0, 0]} />
      </Suspense>
    </div>
  )
}
