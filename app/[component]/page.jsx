'use client'
import React from 'react'
import { useEffect } from 'react'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import components from '@/components/canvas/ComponentRegistry'

const ComponentPage = ({ params }) => {
  const { component } = params
  const Component = components[component]

  useEffect(() => {
    document.title = component || 'Industrial Design'
  }, [component])

  if (!Component) {
    notFound()
  }

  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Suspense fallback={null}>
        <Component route='/blob' scale={0.6} position={[0, 0, 0]} />
      </Suspense>
    </div>
  )
}

export default ComponentPage
