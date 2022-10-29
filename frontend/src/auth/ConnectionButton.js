import React, { useState, useEffect } from 'react'
import AuthClient, { generateNonce } from '@walletconnect/auth-client'
import QRCodeModal from '@walletconnect/qrcode-modal'

export const ConnectionButton = () => {
    const [authClient, setAuthClient] = useState()
    useEffect(() => {
        ;(async () => {
          console.log(window.location.host)
            const client = await AuthClient.init({
                projectId: process.env.WALLETCONNECT_PROJECT_ID,
                relayUrl:"wss://relay.walletconnect.com",
                metadata: {
                    name: 'eth-lisbon-hackaton',
                    description: 'A dapp using WalletConnect AuthClient',
                    url: window.location.host,
                    icons: ['https://my-auth-dapp.com/icons/logo.png'],
                },
            })
            client.on('auth_response', ({ params }) => {
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
                className="stroke-black"
                onClick={async () => {
                    const { uri } = await authClient.request({
                        aud: '<FULL_URL_OF_LOGIN_PAGE>',
                        domain: '<YOUR_DOMAIN>',
                        chainId: 'eip155:1',
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
