import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Controls from '@/components/dom/Controls'
import { createControls } from '@/helpers/createControls'

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
      <Controls {...{ controls, handleInputChange, currentSettings: settings }} />
    </div>
  )
}

export default Wrap
