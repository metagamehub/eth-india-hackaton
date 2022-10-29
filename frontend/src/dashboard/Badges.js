import React from 'react'
import Badge from '../components/badge'

export const Badges = () => {
  return (
    <div className="bg-grey text-white max-w-xs h-72 rounded-2xl space-y-3">
      <div className='pb-11 pt-6'>
        <h2 className='text-2xl pl-4'>Badges</h2>
        <div className='flex flex-row flex-wrap justify-center'>
        <Badge text={'Blocked'}></Badge>
        <Badge text={'Blocked'}></Badge>
        <Badge text={'Blocked'}></Badge>
        <Badge text={'Blocked'}></Badge>
        <Badge text={'Blocked'}></Badge>
        <Badge text={'Blocked'}></Badge>
        <Badge text={'Blocked'}></Badge>
        <Badge text={'Blocked'}></Badge>
      </div>
      </div>
    </div>
  )
}
