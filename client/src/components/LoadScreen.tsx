import React from 'react'
import { Spinner } from '@chakra-ui/react'

const LoadScreen = () => {
  return (
    <div
    className='
    absolute top-0 bottom-0 left-0 right-0
    flex items-center justify-center h-full min-h-full
    backdrop-blur-sm bg-white/30 z-10
    '
    >
      <Spinner 
      thickness='5px'
      size={'xl'}
      color='black.400' />
    </div>
  )
}

export default LoadScreen