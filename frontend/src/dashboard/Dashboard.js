import React from 'react'
import { Activity } from '../dashboard/Activity'
import { Inventory } from '../dashboard/Inventory'

export const Dashboard = () => {
  return (
    <div className='flex justify-center min-h-screen items-center text-base bg-background text-white'>
        <h1>
          METAVERSE
        </h1>
        <h2 className='pb-20'>
          LOYALTY MODULE
        </h2>
      <div className='flex flex-col pb-10'>
      <Activity />
      <Inventory/>
      </div>

    </div>
  )
}
