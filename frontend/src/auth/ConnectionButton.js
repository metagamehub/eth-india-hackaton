import React from 'react'
import { useConnectModal } from '@web3modal/react'

export const ConnectionButton = () => {
    const { open } = useConnectModal()
    return (
        <>
            <button className="pt-1 z-10 border-solid border-2 w-48 h-12 rounded-xl border-white hover:border-tahiti hover:text-tahiti"
                onClick={() => { open() }}
            >
                Connect Wallet
            </button>
        </>
    )
}
