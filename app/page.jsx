'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'
import components from '@/components/canvas/ComponentRegistry'

export default function Page() {
  const router = useRouter()
  const { component } = router.query
  const Component = components[component]

  const [variation, setVariation] = useState(null)

  useEffect(() => {
    if (router.query.variation) {
      setVariation(router.query.variation)
    }
  }, [router.query.variation])

  if (!Component) {
    notFound()
  }

  const variationSelection = (
    <ul
      style={{
        position: 'absolute',
        bottom: 10,
        right: 10,
        listStyleType: 'none',
        display: 'flex',
        gap: '20px',
        color: 'white',
        zIndex: 1,
      }}
    >
      {Object.keys(variations[component]).map((key) => (
        <li key={key}>
          <button onClick={() => set(variations[component][key])}>{key}</button>
        </li>
      ))}
    </ul>
  )
  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Suspense fallback={null}>
        <Component
          route='/blob'
          scale={0.6}
          position={[0, 0, 0]}
          variation={variation}
          variationSelection={variationSelection}
        />
      </Suspense>
    </div>
  )
}
