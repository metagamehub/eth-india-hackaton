import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    connected: false, 
    address: undefined,
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    connect: (state, {payload}) => {
        state.connected = true
        state.address = payload.address
        
    },
    disconnect: state => initialState,
    setChain: (state, {payload}) => {
      state.chainId = payload
    },
    setAddress: (state, {payload}) => {
      state.address = payload
    }
  }
})

export const { connect, disconnect, setChain, setAddress } = accountSlice.actions

export default accountSlice.reducer