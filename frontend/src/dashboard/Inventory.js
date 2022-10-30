import React, { useState, useEffect } from 'react'
import { Wearable } from '../components/wearable'
import { useAccount } from '@web3modal/react'
import axios from 'axios'
export const Inventory = () => {
    const [wearables, setWearables] = useState()
    const { account } = useAccount()

    useEffect(() => {
      console.log(account)
        const getWearables = async () => {
            setWearables(
                (
                    await axios.get(
                        process.env.REACT_APP_WALLETCONNECT_BACKEND_URL +
                            '/wearables?address=0x179edfb309c13d847a1ce41e472581156a17fa14' /* +
                            account.address */
                    )
                ).data.wearables
            )
            console.log(wearables?.length == 0)
        }
        getWearables()
    }, [])
    return (
        <div className=" relative flex flex-col space-y-3 w-90">
            <div className="flex flex-col bg-[#262626] rounded-[25px] p-3 justify-between">
                <h2 className="text-8xl">Inventory</h2>
                <div className="grid grid-cols-2 place-content-center max-w-full items-center">
                    {wearables &&
                        wearables.map((wearable) => <Wearable
                        url={wearable.image}
                        title={wearable.title}
                        image_class={`group-hover:grayscale-0 transition duration-300 ease-in-out object-contain`}
                    /> )
                            
                        }
                    {wearables?.length == 0 && <div>Your inventory is empty</div>}
                </div>
            </div>
        </div>
    )
}
