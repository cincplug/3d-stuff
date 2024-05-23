'use client'
import React, { useEffect } from 'react'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import components from '@/components/canvas/ComponentRegistry'
import variations from '@/variations'
import { useParams } from 'next/navigation'

const VariationPage = () => {
  const params = useParams()
  const { variation } = params
  const defaults = {
    cameraX: 0,
    cameraY: 0,
    cameraZ: 30,
    lightness: 15,
  }
  const [component, variationProps] =
    Object.entries(variations).find(([, vars]) => vars.hasOwnProperty(variation)) || []

  const Component = components[component]

  useEffect(() => {
    document.title = `${variation} ::: Industrial Design`
  }, [variation])

  if (!Component) {
    notFound()
  }

  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Suspense fallback={null}>
        <Component {...{ ...defaults, ...variationProps[variation] }} />
      </Suspense>
    </div>
  )
}

export default VariationPage
