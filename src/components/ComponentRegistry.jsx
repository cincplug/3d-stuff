import dynamic from 'next/dynamic'

const components = {
  Main: dynamic(() => import('@/components/canvas/Main'), { ssr: false }),
  // Add other components here
  Pinecone: dynamic(() => import('@/components/canvas/Pinecone'), { ssr: false }),
}

export default components
