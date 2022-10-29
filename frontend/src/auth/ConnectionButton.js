import React from 'react'
import { useConnectModal } from '@web3modal/react'

export const ConnectionButton = () => {
    const { open } = useConnectModal()
    return (
        <>
            <button
                onClick={() => {
                    open()
                }}
            >
                Connect Wallet
            </button>
        </>
    )
}
