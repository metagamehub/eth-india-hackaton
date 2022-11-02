import {React, useState, useEffect} from 'react'
import { RewardModal } from '../modals/RewardModal';
import { useSelector } from 'react-redux'
import axios from 'axios'


export const Activity = () => {

  const wallet = useSelector((state) => state.wallet)
  const [activities, setActivities] = useState()
  const [activity, setActivity] = useState()
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const getActivities = async () => {
      axios.post(
        process.env.REACT_APP_WALLETCONNECT_BACKEND_URL +
        '/db/claimTokens?walletAddress='
        +wallet.address,
      )
      setActivities(
        (
          await axios.get(
            process.env.REACT_APP_WALLETCONNECT_BACKEND_URL+
            '/db/read-wallet-last?walletAddress='
            +wallet.address,
          )
        ).data
      )
    }
    getActivities()

  }, [])


  const chargeModal = (number) => {
    setOpenModal(true)
    setActivity(activities[number])
  }

  return (
    <>
    {openModal && <RewardModal onDismiss={() => setOpenModal(false)} activity={activity}/>}
    <div className="flex flex-col space-y-3 w-90 text-white">
      <h2 className="text-xl truncate ">ACTIVITY
      </h2>
      {activities && 
      (<>
        <div className="flex h-10 bg-grey rounded-[25px] space-x-0 justify-between" onClick={() => chargeModal(0)}>
            <p className="font-fire text-md py-2 pl-4 truncate">{activities[0]["event_id"]}</p>
            <div className='flex px-3 py-1'>
              <div className='relative w-30 flex sm:scale-85 lg:scale-90 xl:scale-100 font-medium text-xl py-2  items-center border-solid  border-2 rounded-[15px] px-2 border-white' >
                <h2 className='text-[15px] truncate'>DCLAND</h2>
              </div>
            </div>
        </div>
        <div className="flex h-10 bg-grey rounded-[25px] space-x-0 justify-between" onClick={() => chargeModal(1)}>
            <p className="font-fire text-md py-2 pl-4 truncate">{activities[1]["event_id"]}</p>
            <div className='flex px-3 py-1'>
              <div className='relative w-30 flex sm:scale-85 lg:scale-90 xl:scale-100 font-medium text-xl py-2  items-center border-solid  border-2 rounded-[15px] px-2 border-white' >
                <h2 className='text-[15px] truncate'>DCLAND</h2>
              </div>
            </div>
        </div>
        <div className="flex h-10 bg-grey rounded-[25px] space-x-0 justify-between" onClick={() => chargeModal(2)}>
            <p className="font-fire text-md py-2 pl-4 truncate">{activities[2]["event_id"]}</p>
            <div className='flex px-3 py-1'>
              <div className='relative w-30 flex sm:scale-85 lg:scale-90 xl:scale-100 font-medium text-xl py-2  items-center border-solid  border-2 rounded-[15px] px-2 border-white' >
                <h2 className='text-[15px] truncate'>DCLAND</h2>
              </div>
            </div>
        </div>
      </>)
      }
    </div>
    </>
  )
}
