import React from 'react'
import Button from '../components/button'

export const Activity = () => {
  return (
    <div className="flex flex-col space-y-3 w-90">
      <h2 className="text-8xl">ACTIVITY</h2>
      <div className="flex h-[4rem] bg-[#262626] rounded-[25px] p-2 space-x-4 justify-between">
          <p className="font-fire font-light text-md py-3">Bought weareable xyz</p>
          <Button text="DCLAND" />
      </div>
      <div className="flex h-[4rem] bg-[#262626] rounded-[25px] p-2 justify-between">
          <p className="font-fire font-light text-md py-3">Entered event xyz</p>
            <Button text="DCLAND" />
      </div>
      <div className="flex h-[4rem] bg-[#262626] rounded-[25px] p-2 justify-between">
          <p className="font-fire font-light text-md py-3">Deployed Scene</p>
          <Button text="DCLAND" />
      </div>
    </div>
  )
}
