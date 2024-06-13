import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Controls from '@/components/dom/Controls'
import { createControls } from '@/helpers/createControls'
import dynamic from 'next/dynamic'

const Nav = dynamic(() => import('@/components/dom/Nav'), { ssr: false })

const Wrap = ({ ContentComponent, initialProps }) => {
  const controls = createControls(initialProps)
  const [settings, setSettings] = useState(initialProps)

  const handleInputChange = (event) => {
    const { id, value } = event.target
    setSettings((prevSettings) => ({
      ...prevSettings,
      [id]: value,
    }))
  }

  return (
    <div className='mx-auto flex size-full flex-col flex-wrap items-center bg-black'>
      <Canvas className='size-full'>
        <ContentComponent {...settings} />
      </Canvas>
      <Nav />
      <Controls {...{ controls, handleInputChange, currentSettings: settings }} />
    </div>
  )
}

export default Wrap
