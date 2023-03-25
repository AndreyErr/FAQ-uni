import {$authHost, $host} from "./index"
import jwtDecode from "jwt-decode"

export const regServ = async (login, email, pass) => {
    const {data} = await $host.post('user/userReg', {
        login: login,
        email: email,
        pass: pass
    })
    return jwtDecode(data.accessToken)
}

export const loginServ = async (login, pass) => {
    const {data} = await $host.post('user/userLogin', {
        login: login,
        pass: pass
    })
    return jwtDecode(data.accessToken)
}