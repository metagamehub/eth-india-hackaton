import React, { useEffect, useState } from 'react'
import { Activity } from '../dashboard/Activity'
import { Inventory } from '../dashboard/Inventory'
import { useAccount } from 'wagmi'
import { Badges } from './Badges'
import { Leaderboard } from './Leaderboard'
import { LevelProgress } from './LevelProgress'
import WalletButton from '../components/WalletButton'
import { Toaster } from "react-hot-toast";

export const Dashboard = () => {
    const account = useAccount()
    const [address, setAddress] = useState('')


    return (
        <>
            <Toaster position="bottom-center" reverseOrder={false} />
            <div className="container-dashboard">
                <div className="item-a">
                    <h1>METAVERSE</h1>
                    <h2 className="ml-10">LOYALTY MODULE</h2>
                </div>
                <iframe
                    className="item-b"
                    id="frame"
                    src="https://avatar-generator-metagamehub.vercel.app/?campaign=mlp&bg=rgb(17%2017%2017%20/%20var(--tw-bg-opacity))&ov=true"
                    width="100%"
                    height="100%"
                ></iframe>
                {/* https://avatar-generator-metagamehub.vercel.app/?campaign=decentraland&bg=rgb(17%2017%2017%20/%20var(--tw-bg-opacity))&ov=true */}
                <div className="item-c">
                    <WalletButton/>
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
        </>
    )
}
