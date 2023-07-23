import { AxiosPromise } from 'axios'
import { IPosts } from '../../types/posts'
import { IComments } from '../../types/comments'

import { api } from '..'
import { endpoints_posts } from '../endpoints'

export const getPosts = (): AxiosPromise<IPosts[]> => {
    return api.get(endpoints_posts.posts)
}

export const getPostById = (id: string): AxiosPromise<IPosts> => {
    return api.get(`${endpoints_posts.posts}/${id}`)
}

interface ViewsPayload {
    views: number
}
// тут я специально не передал дженерик для AxiosPromise , так как думаю что в нем нет смысла в данном случае
export const updatePostViews = (id: string, payload: ViewsPayload): AxiosPromise => {
    return api.patch(`${endpoints_posts.posts}/${id}`, payload)
}

//этот запрос не работает
export const addComments = (id: string, payload: IComments): AxiosPromise<IComments> => {
    return api.post(`${endpoints_posts.posts}/${id}?_exists_.comments`, payload)
}

export const updatePostImage = (id: string, payload: unknown): AxiosPromise => {
    return api.patch(`${endpoints_posts.posts}/${id}`, payload)
}

export const deletePost = (id: string): AxiosPromise => {
    return api.delete(`${endpoints_posts.posts}/${id}`)
}

export const editTitle = (id: string, payload: unknown): AxiosPromise => {
    return api.patch(`${endpoints_posts.posts}/${id}`, payload)
}