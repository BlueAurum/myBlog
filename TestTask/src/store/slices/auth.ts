import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userRegistration, userSignIn, getUserById } from "../../shared/api/routes/auth";

import { IUserAuth, IAuthResponse } from "../../shared/types/auth";
import { RootState } from "..";

interface IState {
    isLoading: boolean
    isAuth: boolean
    authData: IUserAuth | null
    token: string | null
    error: string | null
}

const state: IState = {
    isLoading: false,
    isAuth: false,
    authData: {} as IUserAuth,
    token: null,
    error: null
}

export const registerUser = createAsyncThunk('auth/registerUser', async (payload: IUserAuth) => {
    const response = await userRegistration(payload)
    const result = response.data
    localStorage.setItem('userId', result.user.id!)
    localStorage.setItem('token', result.accessToken)
    return result
})

export const signInUser = createAsyncThunk('auth/signInUser', async (payload: IUserAuth) => {
    const response = await userSignIn(payload)
    const result = response.data
    localStorage.setItem('userId', result.user.id!)
    localStorage.setItem('token', result.accessToken)
    return result
})

// да прекрасно понимаю что никто так не делает , не получает пользователя по id , но на json сервер когда я попытался получить пользователя по токену сервер мне вернул всех пользователей вместо определенного пользователя , так что пришлось сделать именно так .
export const getUser = createAsyncThunk('auth/getUser', async (id: string) => {
    const response = await getUserById(id)
    const result = response.data
    return result
})

const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {
        logOut(state) {
            state.isAuth = false
            state.authData = null
            localStorage.removeItem('userId')
            localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true
        }).addCase(registerUser.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
            state.isLoading = false
            state.isAuth = true
            state.token = action.payload.accessToken
            state.authData = action.payload.user
        }).addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false
            state.isAuth = false
            state.error = action.error.message!
        }).addCase(signInUser.pending, (state) => {
            state.isLoading = true
        }).addCase(signInUser.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
            state.isLoading = false
            state.isAuth = true
            state.token = action.payload.accessToken
            state.authData = action.payload.user
        }).addCase(signInUser.rejected, (state, action) => {
            state.isLoading = false
            state.isAuth = false
            state.error = action.error.message!
        }).addCase(getUser.pending, (state) => {
            state.isLoading = true
        }).addCase(getUser.fulfilled, (state, action: PayloadAction<IUserAuth>) => {
            state.isLoading = false
            state.isAuth = true
            state.authData = action.payload
        }).addCase(getUser.rejected, (state, action) => {
            state.isLoading = false
            state.isAuth = false
            state.error = action.error.message!
        })
    }
})

export const { logOut } = authSlice.actions
export const selectUser = (state: RootState) => state.authSlice
export default authSlice.reducer