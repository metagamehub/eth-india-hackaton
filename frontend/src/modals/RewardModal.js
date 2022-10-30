import React from 'react'

export const RewardModal = ({onDismiss}) => {
  return (
    <>
      <div className='modal text-center text-white'>
      <div onClick={onDismiss} className="absolute h-full w-full bg-black bg-opacity-40 backdrop-filter backdrop-blur" />
        <div className="z-10 w-96 transform scale-85 sm:scale-100 flex flex-col items-stretch shadow-dark p-5 space-y-7 rounded-xl border border-white border-opacity-20 bg-grey-darkest bg-opacity-20 backdrop-filter backdrop-blur-xl">
        <h2 className='max-h-[3.3rem] mt-11'>REWARD</h2>
        <p className='font-body text-white w-96 pb-14'>
          asdasdfs
        </p>
        <div className='regularButton'>
          <button className='my-10'>Claim</button>
        </div>
      </div>
    </div>
    </>
  )
}