import React, { useEffect, useState } from 'react'
import { Activity } from '../dashboard/Activity'
import { Inventory } from '../dashboard/Inventory'
import { useAccount } from '@web3modal/react'
import { Badges } from './Badges'
import { Leaderboard } from './Leaderboard'
import { LevelProgress } from './LevelProgress'
import WalletButton from '../components/WalletButton'

export const Dashboard = () => {

    const { account } = useAccount()
    const [address, setAddress] = useState("");
    
    useEffect(() => {
        account.isConnected &&
            localStorage.setItem('address', account.address)
            setAddress(
                localStorage.getItem('address')
            )
    }, [account])
    
    return (
        <div className="container-dashboard">
            <div className='item-a'>
                <h1>METAVERSE</h1>
                <h2 className='ml-10'>LOYALTY MODULE</h2>
            </div>
            <iframe
                className="item-b"
                src="https://avatar-generator-metagamehub.vercel.app/?campaign=decentraland&bg=rgb(17 17 17 / var(--tw-bg-opacity))&ov=true"
                width="100%"
                height="100%"
            ></iframe>

            <div className="item-c">
                <WalletButton address={address}/>
            </div> 
            <div className="item-d">
                <Badges />
            </div>
            <div className="item-e">
                <Inventory />
            </div>
            <div className="item-f">
                <Leaderboard />
            </div>
            <div className="item-g">
                <LevelProgress progress="60" points={418} level={0} />
            </div>
            <div className="item-h">
                <Activity />
            </div>

        </div>
    )
}
