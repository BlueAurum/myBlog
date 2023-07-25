import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { IPosts } from '../../shared/types/posts'
import { getPosts } from '../../shared/api/routes/posts'
import { RootState } from '..'

//все запросы связанные с постами можно было бы сюда вынести
// можно было бы сделать так 
/*

const postState: Type = {
    posts: {
        isLoading: false,
        data: [],
        isError: null
    },
    addNewPost: {
        isLoading: false,
        data: [],
        isError: null
    }
}

и так далее 

я в некоторых компонентах написал запросы но стоит сделать так 

*/

interface IState {
    isLoading: boolean,
    data: IPosts[],
    isError: string | null
}

const state: IState = {
    isLoading: false,
    data: [],
    isError: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await getPosts()
    const result = response.data
    return result
})

export const postsSlice = createSlice({
    name: 'posts',
    initialState: state,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchPosts.fulfilled, (state, action: PayloadAction<IPosts[]>) => {
            state.isLoading = false
            state.data = action.payload
        }).addCase(fetchPosts.rejected, (state, action) => {
            state.isLoading = false
            state.data = []
            state.isError = action.error.message!
        })
    }
})

export const selectPosts = (state: RootState) => state.postsSlices
export default postsSlice.reducer