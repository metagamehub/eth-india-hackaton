import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccount } from '@web3modal/react'
import { Activity } from '../dashboard/Activity'
import { Inventory } from '../dashboard/Inventory'

export const Dashboard = () => {
    const navigate = useNavigate()
    const { account } = useAccount()
    useEffect(() => {
        {
            account.isConnected != undefined &&
                !account.isConnected &&
                navigate('/', { replace: true })
        }
    }, [account])
    return (
        <div className="flex justify-center min-h-screen items-center text-base bg-background text-white">
            <h1>METAVERSE</h1>
            <h2 className="pb-20">LOYALTY MODULE</h2>
            <div className="flex flex-col pb-10">
                <Activity />
                <Inventory />
            </div>
        </div>
    )
}
