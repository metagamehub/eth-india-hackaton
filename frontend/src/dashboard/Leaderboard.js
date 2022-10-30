import {React, useState}  from 'react'
import { StatsModal } from '../modals/StatsModal'

export const Leaderboard = () => {

  const [openModal, setOpenModal] = useState(false);
  
  return (
    <>
    {openModal && <StatsModal onDismiss={() => setOpenModal(false)} />}
    <div className="flex flex-col text-white max-w-full space-y-3">
      <h2 className="text-xl">LEADERBOARD</h2>
      <div className="flex h-10 bg-grey rounded-2xl py-2 px-4 space-x-4 justify-between">
          <p>1. 0x145544213123123123123123123123</p>
          <button onClick={() => setOpenModal(true)}>{'>'}</button>
      </div>
      <div className="flex h-10 bg-grey rounded-2xl py-2 px-4 justify-between">
          <p>2. 0x145544</p>
            <button onClick={() => setOpenModal(true)}>{'>'}</button>
      </div>
      <div className="flex h-10 bg-grey rounded-2xl py-2 px-4 justify-between">
          <p>3. 0x145544</p>
          <button onClick={() => setOpenModal(true)}>{'>'}</button>
      </div>
    </div>
    </>
  )
}
