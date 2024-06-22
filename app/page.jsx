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
          <header className='flex flex-col justify-center text-sm text-slate-200'>
            <h1 className='mb-4 text-base'>Industrially Designed Charts</h1>
            <ul className='list-inside list-disc text-left'>
              <li>They leverage innovation</li>
              <li>They unleash potentials</li>
              <li>They are data-driven</li>
              <li>They strive for user-centricity</li>
              <li>Last but not least, they lorem ipsum</li>
              <li>
                Actually, in third person it is <em>lorem ipsa</em>
              </li>
            </ul>
          </header>
          {variationKeys.map((variation, index) => {
            const [component, variationProps] =
              Object.entries(variations).find(([, vars]) => vars.hasOwnProperty(variation)) || []
            const Component = components[component]
            const initialProps = { ...extractValues(defaults), ...variationProps[variation] }
            return (
              <Link
                key={index}
                className='flex h-56 flex-col gap-1 text-slate-200 hover:brightness-125'
                href={`/${variation}`}
              >
                <Canvas style={{ background: variationProps[variation].bgColor }}>
                  <Component {...initialProps} isPreview />
                </Canvas>
                {pascalToSpace(variation)} Chart
              </Link>
            )
          })}
          <footer className='col-span-3 mt-3 text-center text-xs text-slate-400'>
            <p>
              Designs by{' '}
              <a
                className='text-slate-200'
                href='https://cincplug.com/'
                title='Luka Činč Stanisavljević'
                target='_blank'
                rel='noopener noreferrer'
              >
                LČS
              </a>{' '}
              using{' '}
              <a
                className='text-slate-200'
                href='https://www.npmjs.com/package/@react-three/fiber'
                title='React Three Fiber'
                target='_blank'
                rel='noopener noreferrer'
              >
                RTF
              </a>
            </p>
          </footer>
        </div>
      </Suspense>
    </div>
  )
}
