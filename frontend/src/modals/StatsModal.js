import React from 'react'

export const WalletModal = () => {
  return (
    <>
      <div className='modal text-center text-white'>
        <h2 className='max-h-[3.3rem] mt-11'>User stats</h2>
        <p className='gradientText'> 0x1234556</p>
        <div className='stats'>
          <div className='stats__text'>
            Level
          </div>
          <div className='stats__data'>
            08
          </div>
        </div>
        <div className='stats'>
          <div className='stats__text'>
            Badges
          </div>
          <div className='stats__data'>
            15
          </div>
        </div>
        <div className='stats'>
          <div className='stats__text'>
            Activity
          </div>
          <div className='stats__data'>
            High
          </div>
        </div>
        <div className='regularButton'>
          <button className='my-10'>Close</button>
        </div>
    </div>
    </>
  )
}