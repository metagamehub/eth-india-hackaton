import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDisconnect } from '@web3modal/react'
import { useDispatch } from 'react-redux'
import { disconnect } from '../state/wallet'
import { useNetwork, useSwitchNetwork } from '@web3modal/react'

export const WalletModal = ({ onDismiss, account }) => {

    const disconnectWallet = useDisconnect()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { network } = useNetwork()
    const { switchNetwork } = useSwitchNetwork()

    useEffect(() => { 
      account.isConnected !== undefined &&
          !account.isConnected &&
          navigate('/', { replace: true })   
  }, [account])
  
  return (
    <>
      <div className='modal text-center text-white'>
      <div onClick={onDismiss} className="absolute h-full w-full bg-black bg-opacity-40 backdrop-filter backdrop-blur" />
        <div className="z-10 w-96 transform scale-85 sm:scale-100 flex flex-col items-stretch shadow-dark p-5 space-y-7 rounded-xl border border-white border-opacity-20 bg-grey-darkest bg-opacity-20 backdrop-filter backdrop-blur-xl">
            <h2 className='truncate max-h-[3.5rem] mx-4 mt-2'>{account?.address}</h2>
            {account && network?.chain?.id !==137 && (
                <button className='py-4 border-solid border-2 rounded-xl border-white hover:border-tahiti hover:text-tahiti'
                    onClick={async () => 
                        switchNetwork({ chainId: 137 }
                    )}>
                    Switch to Polygon
                </button>
            )}
            <button className='py-4 border-solid border-2 rounded-xl border-white hover:border-tahiti hover:text-tahiti'
                onClick={() => {
                    dispatch(disconnect())
                    disconnectWallet()
                }}>
                Disconnect Wallet
            </button>
          <div className='regularButton'>
            <button className='mb-4' onClick={onDismiss} >Close</button>
          </div>
        </div>
    </div>
    </>
  )
}