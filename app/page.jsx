'use client'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { pascalToSpace } from '@/helpers/utils'
import defaults from '@/variations/defaults'
import variations from '@/variations'
import components from '@/components/canvas/ComponentRegistry'
import Link from 'next/link'

const extractValues = (defaults) => {
  return Object.fromEntries(Object.entries(defaults).map(([key, { value }]) => [key, value]))
}

export default function Page() {
  const variationKeys = Object.values(variations).flatMap(Object.keys)
  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center overflow-y-auto overflow-x-hidden bg-black'>
      <Suspense fallback={null}>
        <div className='grid w-screen grid-cols-3 gap-6 p-6'>
          <header className='flex flex-col items-center justify-center text-sm text-white'>
            <h1 className='text-base'>Data visualization and industrial design</h1>
            <p>using React Three Fiber</p>
            <p>by Luka Činč Stanisavljević</p>
          </header>
          {variationKeys.map((variation, index) => {
            const [component, variationProps] =
              Object.entries(variations).find(([, vars]) => vars.hasOwnProperty(variation)) || []
            const Component = components[component]
            const initialProps = { ...extractValues(defaults), ...variationProps[variation] }
            return (
              <Link
                key={index}
                className='flex h-56 flex-col gap-1 text-white hover:brightness-125'
                href={`/${variation}`}
              >
                <Canvas>
                  <Component {...initialProps} isPreview />
                </Canvas>
                {pascalToSpace(variation)}
              </Link>
            )
          })}
        </div>
      </Suspense>
    </div>
  )
}
