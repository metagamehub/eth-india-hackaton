import {
    configureStore,
} from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        basket: basketReducer,
        account: persistedReducer,
        data: dataReducer,
        walletLogin: walletLoginReducer,
        balance: balancesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
})

export default store