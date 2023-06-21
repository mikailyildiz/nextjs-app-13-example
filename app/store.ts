import { configureStore } from '@reduxjs/toolkit'
import { api } from './services/auth'
import authReducer from './slice/authSlice'
import productsReducer from './slice/productsSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
