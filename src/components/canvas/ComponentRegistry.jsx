import dynamic from 'next/dynamic'

const components = {
  PeeCurl: dynamic(() => import('@/components/canvas/designs/PeeCurl'), { ssr: false }),
  Bush: dynamic(() => import('@/components/canvas/designs/Bush'), { ssr: false }),
  Umbrella: dynamic(() => import('@/components/canvas/designs/Umbrella'), { ssr: false }),
}

export default components
