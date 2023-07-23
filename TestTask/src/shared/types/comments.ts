interface IAuthor {
    name: string
    surname: string
}

export interface IComments {
    id?: string
    author: IAuthor
    date: string
    description: string
}