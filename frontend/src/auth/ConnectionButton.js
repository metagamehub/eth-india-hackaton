import React, { useState, useRef } from 'react'
import { Web3Button, useAccount,useConnectModal } from '@web3modal/react'

export const ConnectionButton = () => {
    const { isOpen, open, close } = useConnectModal()
    return (
        <>
            <button
                onClick={() => {
open()
                }}
            >
                Connect Wallet
       
            <Web3Button
                    id="web3Modal"
                    style={{ display: 'none' }}
                />     </button>
        </>
    )
}
