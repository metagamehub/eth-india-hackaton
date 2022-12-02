import React, { useEffect, useState, useRef } from 'react'
import { Activity } from '../dashboard/Activity'
import { Inventory } from '../dashboard/Inventory'
import { useAccount } from 'wagmi'
import { Badges } from './Badges'
import { Leaderboard } from './Leaderboard'
import { LevelProgress } from './LevelProgress'
import WalletButton from '../components/WalletButton'
import toast, { Toaster } from 'react-hot-toast'

export const Dashboard = () => {
    const account = useAccount()
    const [address, setAddress] = useState('')
    const mounted = useRef(true)

    useEffect(() => {
            account.isConnected &&
                localStorage.setItem('address', account.address)
            setAddress(localStorage.getItem('address'))
            mounted.current &&
                toast.custom((t) => (
                    <div
                        className={`${
                            t.visible ? 'animate-enter' : 'animate-leave'
                        } text-white max-w-md w-full bg-grey rounded-lg pointer-events-auto flex ring-1 ring-white`}
                    >
                        <div className="flex-1 w-0 px-2">
                            <div className="flex items-center">
                                <h2 className="text-md">EXP</h2>
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium">
                                        Points!
                                    </p>
                                    <p className="mt-1 text-sm">
                                        You have earned xx points and they are
                                        currently being minted.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-l border-white">
                            <button
                                onClick={() => toast.dismiss(t.id)}
                                className="w-full rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ))
        
        return () => {
            mounted.current = false
        }
    }, [account.isConnected])

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
                    <WalletButton address={address} />
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
