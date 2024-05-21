'use client'
import React, { useEffect } from 'react'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import components from '@/components/canvas/ComponentRegistry'
import variations from '@/variations'
import { useParams } from 'next/navigation'

const VariationPage = () => {
  const params = useParams()
  const { component, variation } = params

  const Component = components[component]
  const variationProps = variations[component]?.[variation] || {}

  useEffect(() => {
    document.title = `${component} - ${variation}` || 'Industrial Design'
  }, [variation, component])

  if (!Component) {
    notFound()
  }

  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Suspense fallback={null}>
        <Component route='/blob' scale={0.6} position={[0, 0, 0]} {...variationProps} />
      </Suspense>
    </div>
  )
}

export default VariationPage
