import { IComments } from "./comments"

export interface IPosts {
    views: number
    id: string
    image: string
    title: string
    category: string[]
    description: string
    comments: IComments[]
}