export interface IUserAuth {
    id?: string
    name?: string
    email: string
    password: string
}

export interface IAuthResponse {
    accessToken: string
    user: IUserAuth
}