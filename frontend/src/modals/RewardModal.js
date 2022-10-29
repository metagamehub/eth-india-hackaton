import React from 'react'

export const RewardModal = () => {
  return (
    <>
      <div className='modal text-center text-white'>
        <h2 className='max-h-[3.3rem] mt-11'>REWARD</h2>
        <Wearable
          name="weareable1"
        />
        <p className='font-body text-white w-96 pb-14'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <div className='regularButton'>
          <button className='my-10'>Claim</button>
        </div>
    </div>
    </>
  )
}