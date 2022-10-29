import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccount } from '@web3modal/react'
import { Activity } from '../dashboard/Activity'
import { Inventory } from '../dashboard/Inventory'
import { Badges } from './Badges'
import { Leaderboard } from './Leaderboard'

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
        <div className="grid grid-cols-3 grid-rows-3 min-h-screen items-center text-base bg-background text-white">
            <div className="order-1">
                <h1>METAVERSE</h1>
                <h2 className="pb-20">LOYALTY MODULE</h2>
            </div>

            <div className="order-3">
                <Badges></Badges>
            </div>
            <div className="order-6">
                <Leaderboard></Leaderboard>
            </div>
            <div className="order-2">
                <Inventory />
            </div>
            <iframe className="order-1 row-span-3" src="https://avatar-generator-metagamehub.vercel.app/?campaign=decentraland&bg=rgb(17 17 17 / var(--tw-bg-opacity))&ov=true" width="100%" height="100%"></iframe>
            <div className="order-5"><Activity  /></div>
            
        </div>
    )
}
