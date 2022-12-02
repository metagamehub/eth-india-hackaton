import { Auth } from './auth/Auth'
import { Dashboard } from './dashboard/Dashboard'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './state/store'
import {
    EthereumClient,
    modalConnectors,
    walletConnectProvider,
} from '@web3modal/ethereum'

import { Web3Modal } from '@web3modal/react'

import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'

const chains = [chain.polygon]

const { provider } = configureChains(chains, [
    walletConnectProvider({
        projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID,
    }),
])
const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({ appName: 'web3Modal', chains }),
    provider,
})

const ethereumClient = new EthereumClient(wagmiClient, chains)

const router = createBrowserRouter([
    {
        path: '/',
        element: <Auth />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
])

function App() {
    return (
        <>
            <Provider store={store}>
                <WagmiConfig client={wagmiClient}>
                    <RouterProvider router={router} />
                </WagmiConfig>
            </Provider>

            <Web3Modal
                projectId={process.env.REACT_APP_WALLETCONNECT_PROJECT_ID}
                ethereumClient={ethereumClient}
            />
        </>
    )
}

export default App
