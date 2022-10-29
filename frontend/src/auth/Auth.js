import React from 'react'
import { ConnectionButton } from './ConnectionButton'

export const Login = () => {
  return (
    <div className='flex justify-center min-h-screen items-center space-y-20 bg-background text-white'>
      <div className='text-center'>
        <h1>
          METAVERSE
        </h1>
        <h2>
          LOYALTY MODULE
        </h2>
        <p className='font-body text-white text-base w-96'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <ConnectionButton></ConnectionButton>
      </div>
    </div>
  )
}
