import React from 'react'

export const Leaderboard = () => {
  return (
    <div className="flex flex-col text-white max-w-xs space-y-3">
      <h2 className="text-xl">LEADERBOARD</h2>
      <div className="flex h-10 bg-grey rounded-2xl py-2 px-4 space-x-4 justify-between">
          <p className="font-fire text-md">1. 0x145544</p>
          <button>{'>'}</button>
      </div>
      <div className="flex h-10 bg-grey rounded-2xl py-2 px-4 justify-between">
          <p className="font-fire text-md">2. 0x145544</p>
            <button>{'>'}</button>
      </div>
      <div className="flex h-10 bg-grey rounded-2xl py-2 px-4 justify-between">
          <p className="font-fire text-md">3. 0x145544</p>
          <button>{'>'}</button>
      </div>
    </div>
  )
}
