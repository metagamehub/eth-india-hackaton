import React,{useEffect} from 'react'
import { ConnectionButton } from './ConnectionButton'
import { useNavigate } from 'react-router-dom'
import { useAccount } from '@web3modal/react'

export const Auth = () => {
    const navigate = useNavigate()
    const { account } = useAccount()


    useEffect(() => {
        {
            account.isConnected && navigate('/dashboard',{replace:true})
        }
    }, [account])
    return (
        <div className="flex justify-center min-h-screen items-center text-base bg-background text-white">
            <div className="text-center">
                <h1>METAVERSE</h1>
                <h2 className="pb-20">LOYALTY MODULE</h2>
                <p className="font-body text-white w-96 pb-14">
                    Social engagement module to incentivize users to participate
                    in the Decentraland ecosystem through different onchain and
                    offchain activities.
                </p>
                <ConnectionButton />
            </div>
            <div className="flex flex-col pb-10"></div>
        </div>
    )
}
