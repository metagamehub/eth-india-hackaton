import React from 'react'
import { Activity } from '../dashboard/Activity'
import { Inventory } from '../dashboard/Inventory'
import { Badges } from './Badges'
import { Leaderboard } from './Leaderboard'
import { LevelProgress } from './LevelProgress'
import WalletButton from '../components/WalletButton'

export const Dashboard = () => {
    
    
    return (
        <div className="grid grid-cols-3 gap-4 min-h-screen text-base bg-background text-white pr-9 pt-9 space-x-9">
            <div className='row-span-2 space-x-9'>
                <h1>METAVERSE</h1>
                <h2>LOYALTY MODULE</h2>
            </div>
            <iframe
                className="col-start-2 row-start-1 row-end-[9]"
                src="https://avatar-generator-metagamehub.vercel.app/?campaign=decentraland&bg=rgb(17 17 17 / var(--tw-bg-opacity))&ov=true"
                width="100%"
                height="100%"
            ></iframe>

            <div className="col-start-3 row-span-1">
                <WalletButton/>
            </div> 
            <div className="row-span-5 col-start-3">
                <Inventory />
            </div>
            <div className="row-span-4 col-start-1">
                <Badges />
            </div>
            <div className="row-span-6 col-start-3">
                <Activity />
            </div>
            <div className="row-span-4 col-start-1">
                <Leaderboard />
            </div>
            
            <div className="row-span-4 col-start-2 row-start-[10]">
                <LevelProgress progress="60" points={418} level={8} />
            </div>

        </div>
    )
}
