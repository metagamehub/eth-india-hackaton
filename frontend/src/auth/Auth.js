import React, { useEffect } from 'react'
import { ConnectionButton } from './ConnectionButton'
import { useNavigate } from 'react-router-dom'
import { useAccount } from '@web3modal/react'
import { useDispatch } from 'react-redux'
import { connect } from '../state/wallet'
import { Web3Modal } from '@web3modal/react'
import { chains, providers } from '@web3modal/ethereum'
import { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

import {
    ParticlesOne,
    ParticlesTwo,
    ParticlesThree,
} from '../lib/particles-config'
import './Particles.css'

export const Auth = () => {
    const navigate = useNavigate()
    const { account } = useAccount()
    const dispatch = useDispatch()
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine)
    }, [])
    const particlesLoaded = useCallback(async (container) => {}, [])
    useEffect(() => {
        {
            account.isConnected &&
                dispatch(connect({ address: account.address })) &&
                navigate('/dashboard', { replace: true })
        }
    }, [account])

    const style = {
        z: 20 + '!important',
    }

    return (
        <>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={ParticlesThree}
                className="particles"
            />
            <div className="flex justify-center min-h-screen items-center text-base text-white z-10">
                <div className="text-center">
                    <h1>METAVERSE</h1>
                    <h2 className="pb-20">LOYALTY MODULE</h2>
                    <p className="font-body text-white w-96 pb-14">
                        Social engagement module to incentivize users to
                        participate in the Decentraland ecosystem through
                        different onchain and offchain activities.
                    </p>
                    <ConnectionButton />
                </div>
                <div className="flex flex-col pb-10"></div>
            </div>
            <Web3Modal
                config={{
                    projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID,
                    theme: 'dark',
                    accentColor: 'default',
                    ethereum: {
                        appName: 'web3Modal',
                        autoConnect: true,
                        chains: [chains.polygon],
                    },
                }}
            />
        </>
    )
}
