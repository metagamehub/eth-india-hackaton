import React, { useState, useEffect } from 'react'
import { Wearable } from '../components/wearable'

export const Inventory = () => {
  return (
    <div className=" relative flex flex-col space-y-3 w-90">
      <div className="flex flex-col bg-[#262626] rounded-[25px] p-3 justify-between">
        <h2 className="text-8xl">Inventory</h2>
        <div className='grid grid-cols-2 place-content-center max-w-full items-center'>
                <Wearable
                  url="/images/weareable1.png"
                  description={`imagen`}
                  image_class={`group-hover:grayscale-0 transition duration-300 ease-in-out object-contain`}
                />
                <Wearable
                  name="weareable1"
                  description={`imagen`}
                  image_class={`group-hover:grayscale-0 transition duration-300 ease-in-out object-contain`}
                />
                <Wearable
                  name="weareable1"
                  description={`imagen`}
                  image_class={`group-hover:grayscale-0 transition duration-300 ease-in-out object-contain`}               
                />
                <Wearable
                  name="weareable1"
                  description={`imagen`}
                  image_class={`group-hover:grayscale-0 transition duration-300 ease-in-out object-contain`}               
                />
        </div>    
      </div>
    </div>
  )
}
