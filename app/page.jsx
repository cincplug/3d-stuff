'use client'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { pascalToSpace } from '@/helpers/utils'
import defaults from '@/variations/defaults'
import variations from '@/variations'
import components from '@/components/canvas/ComponentRegistry'

const extractValues = (defaults) => {
  return Object.fromEntries(Object.entries(defaults).map(([key, { value }]) => [key, value]))
}

const Nav = () => {
  const variationKeys = Object.values(variations).flatMap(Object.keys)
  return (
    <div className='absolute grid w-screen grid-cols-4 overflow-auto'>
      {variationKeys.map((variation, index) => {
        const [component, variationProps] =
          Object.entries(variations).find(([, vars]) => vars.hasOwnProperty(variation)) || []
        const Component = components[component]
        const initialProps = { ...extractValues(defaults), ...variationProps[variation] }
        return (
          <div key={index} className='flex h-[20vh] items-end justify-center text-2xl text-white'>
            {pascalToSpace(variation)}
            <div className='mx-auto flex flex-col flex-wrap items-center bg-black'>
              <Canvas>
                <Component {...initialProps} />
              </Canvas>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Page() {
  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Suspense fallback={null}>
        <Nav />
      </Suspense>
    </div>
  )
}
