import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccount } from '@web3modal/react'
import { Activity } from '../dashboard/Activity'
import { Inventory } from '../dashboard/Inventory'
import { Badges } from './Badges'
import { Leaderboard } from './Leaderboard'
import { LevelProgress } from './LevelProgress'

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
        <div className="grid grid-row-8 grid-cols-3 gap-4 min-h-screen text-base bg-background text-white p-12">
            <div>
                <h1>METAVERSE</h1>
                <h2>LOYALTY MODULE</h2>
            </div>
            <iframe className='row-span-5' src="https://avatar-generator-metagamehub.vercel.app/?campaign=decentraland&bg=rgb(17 17 17 / var(--tw-bg-opacity))&ov=true" width="100%" height="100%"></iframe>
            
            <div className='row-span-3'>
              <Inventory/>
            </div>
            <div className="row-span-2">
              <Badges />
            </div>
            <div className="row-span-3">
              <Leaderboard />
            </div>
            <div className="row-span-4">
              <Activity/>
            </div>
            <div className="col-start-2">
              <LevelProgress progress='60' points={418} level={8}/>
            </div>
            <div className='regularButton col-start-3 text-center'>
              <button className=''>Disconect Wallet</button>
            </div>
        </div>
    )
}
