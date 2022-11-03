import React, { useEffect, useState } from 'react'
import { useProvider } from '@web3modal/react'
import { getBalance as getMLPBalance } from '../services/MLPContractService'
import { useSelector } from 'react-redux'

export const LevelProgress = ({ progress, level }) => {
    const { provider } = useProvider()
    const wallet = useSelector((state) => state.wallet)
    const [balance, setBalance] = useState()
    const Parentdiv = {
        height: '12px',
        width: '100%',
        backgroundColor: '#292929',
        borderRadius: 5,
    }

    const Childdiv = {
        height: '100%',
        width: `${balance}%`,
        borderRadius: 5,
        textAlign: 'right',
    }

    const progresstext = {
        padding: 10,
        fontWeight: 900,
    }
    useEffect(() => {
        const getBalance = async () => {
            setBalance(await getMLPBalance(wallet.address, provider))
        }
        provider && getBalance()
    }, [provider])
    return (
        <div className="flex flex-col">
            {balance && (
                <div className="flex items-end">
                    <h2>{`${balance}`}</h2>
                    <h3 className="gradientText font-title text-2xl pl-2 pb-1">
                        MLP
                    </h3>
                </div>
            )}
            <div style={Parentdiv}>
                <div style={Childdiv} className="progressbar">
                    <span style={progresstext}></span>
                </div>
            </div>
            <div className="flex ml-auto mr-0">
                <h2 className="gradientText font-title text-xl">LVL</h2>
                <h2 className="pl-2 font-title text-xl">{`${level}`}</h2>
            </div>
        </div>
    )
}
