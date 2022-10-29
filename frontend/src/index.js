import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Web3Modal } from '@web3modal/react'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Web3Modal config={ {
        projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID,
        theme: "dark",
        accentColor: "default",
        ethereum: {
          appName: 'web3Modal',
          autoConnect: true
        }
      }}/>
  </React.StrictMode>
);

