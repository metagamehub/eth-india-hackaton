import React, { useState, useEffect } from 'react'
import { Wearable } from '../components/wearable'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useAccount } from '@web3modal/react'

export const Inventory = () => {
    const [wearables, setWearables] = useState()
    const wallet = useSelector((state) => state.wallet)
    const {account} = useAccount()
    useEffect(() => {
        const getWearables = async () => {
            
            setWearables(
                (
                    await axios.get(
                        process.env.REACT_APP_WALLETCONNECT_BACKEND_URL +
                            '/wearables?address=' +
                            account.address
                    )
                ).data.wearables
            )
        }
        console.log(account)
        if(account.isConnected)getWearables()
    }, [account])
    return (
        <div className=" relative flex flex-col space-y-3 w-90">
            <div className="flex flex-col bg-[#262626] rounded-[25px] p-3 justify-between">
                <h2 className="text-8xl">Inventory</h2>
                <div className="grid grid-cols-2 place-content-center max-w-full items-center">
                    {wearables &&
                        wearables.map((wearable) => (
                            <Wearable
                                url={wearable.image}
                                title={wearable.title}
                                image_class={`group-hover:grayscale-0 transition duration-300 ease-in-out object-contain`}
                            />
                        ))}
                    {!wearables || wearables?.length == 0 && (
                        <div>Your inventory is empty</div>
                    )}
                </div>
            </div>
        </div>
    )
}
