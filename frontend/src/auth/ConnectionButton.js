import React, { useState, useEffect } from 'react'
import AuthClient, { generateNonce } from '@walletconnect/auth-client'
import QRCodeModal from '@walletconnect/qrcode-modal'

export const ConnectionButton = () => {
    const [authClient, setAuthClient] = useState()
    useEffect(() => {
        ;(async () => {
            const client = await AuthClient.init({
                projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID,
                metadata: {
                    name: 'eth-lisbon-hackaton',
                    description: 'A dapp using WalletConnect AuthClient',
                    icons: ['https://my-auth-dapp.com/icons/logo.png'],
                },
            })
            client.on('auth_response', ({ params }) => {
              console.log(params)
                if (Boolean(params.result?.s)) {
                    // Response contained a valid signature -> user is authenticated.
                } else {
                    // Handle error or invalid signature case
                    console.error(params.message)
                }
            })
            setAuthClient(client)
        })()
    }, [])
    return (
        (authClient && (
            <button
                className="pt-1 z-10 border-solid border-2 w-48 h-12 rounded-xl border-white"
                onClick={async () => {
                    const { uri } = await authClient.request({
                        aud: window.location.href,
                        domain: window.location.hostname
                            .split('.')
                            .slice(-2)
                            .join('.'),
                            
                        chainId: 'eip155:137',
                        nonce: generateNonce(),
                    })
                    if (uri) {
                        QRCodeModal.open(uri, () => {
                            console.log('EVENT', 'QR Code Modal closed')
                        })
                    }
                }}
            >
                Connect Wallet
            </button>
        )) || <></>
    )
}
