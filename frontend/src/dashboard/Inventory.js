import React from 'react'
import { Wearable } from '../components/wearable'


export const Inventory = () => {
  return (
    <div className="flex flex-col space-y-3 w-90">
      <div className="flex flex-col bg-[#262626] rounded-[25px] p-3 space-x-4 justify-between">
        <h2 className="text-8xl">Inventory</h2>
        <div className='grid grid-cols-2 place-content-center max-w-full lg:max-w-3/4 items-center'>
                <Wearable
                  name="weareable1"
                />
                <Wearable
                  name="weareable1"
                />
                <Wearable
                  name="weareable1"                 
                />
                <Wearable
                  name="weareable1"                 
                />
        </div>    
      </div>
    </div>
  )
}