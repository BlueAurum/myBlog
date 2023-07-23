import { configureStore } from "@reduxjs/toolkit";
import postsSlices from "./slices/postsSlices";
import authSlice from './slices/auth'

export const store = configureStore({
    reducer: {
        postsSlices,
        authSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch