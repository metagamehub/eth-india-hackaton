import {React, useState} from 'react'
import Button from '../components/button'
import { RewardModal } from '../modals/RewardModal';

export const Activity = () => {

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
    {openModal && <RewardModal onDismiss={() => setOpenModal(false)} />}
    <div className="flex flex-col space-y-3 w-90 text-white">
      <h2 className="text-xl truncate ">ACTIVITY 
      <button className="ml-4 z-10 border-solid border-2 w-24 h-7 text-[17px] rounded-xl border-white hover:border-tahiti hover:text-tahiti"
        onClick={()=> setOpenModal(true)}>Claim all
      </button>
      </h2>
      <div className="flex h-10 bg-grey rounded-[25px] space-x-0 justify-between">
          <p className="font-fire text-md py-2 pl-4 truncate">Bought weareable</p>
          <Button text="DCLAND"/>
      </div>
      <div className="flex h-10 bg-grey rounded-[25px] space-x-0 justify-between">
          <p className="font-fire text-md py-2 pl-4 truncate">Entered event</p>
            <Button text="DCLAND" />
      </div>
      <div className="flex h-10 bg-grey rounded-[25px] space-x-0 justify-between">
          <p className="font-fire text-md py-2 pl-4 truncate">Deployed Scene</p>
          <Button text="DCLAND" />
      </div>
    </div>
    </>
  )
}
