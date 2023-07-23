import { AxiosPromise } from "axios";
import { endpoints_auth } from "../endpoints";
import { IAuthResponse, IUserAuth } from "../../types/auth";
import { api, AUTH_URL } from "..";


export const userSignIn = (payload: IUserAuth): AxiosPromise<IAuthResponse> => {
    return api.post(`${AUTH_URL}${endpoints_auth.signIn}`, payload)
}

export const userRegistration = (payload: IUserAuth): AxiosPromise<IAuthResponse> => {
    return api.post(`${AUTH_URL}${endpoints_auth.registration}`, payload)
}

// да прекрасно понимаю что никто так не делает , не получает пользователя по id , но на json сервер когда я попытался получить пользователя по токену сервер мне вернул всех пользователей вместо определенного пользователя , так что пришлось сделать именно так .
export const getUserById = (id: string): AxiosPromise<IUserAuth> => {
    return api.get(`${AUTH_URL}${endpoints_auth.registration}/${id}`)
}