import Axios from "axios";

const BASE_URL = 'http://localhost:3000'
export const AUTH_URL = 'http://localhost:3001'

export const api = Axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})