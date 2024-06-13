'use client'
import React, { useEffect } from 'react'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import components from '@/components/canvas/ComponentRegistry'
import variations from '@/variations'
import defaults from '@/variations/defaults'
import { useParams } from 'next/navigation'
import Wrap from '@/components/canvas/Wrap'

const VariationPage = () => {
  const params = useParams()
  const { variation } = params
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
    <Suspense fallback={null}>
      <Wrap ContentComponent={Component} initialProps={{ ...defaults, ...variationProps[variation] }} />
    </Suspense>
  )
}

export default VariationPage
