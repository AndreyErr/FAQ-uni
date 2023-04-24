import {$authHost, $host} from "./index"
import jwtDecode from "jwt-decode"
import { useContext } from "react"
import { Context } from ".."

export const regServ = async (login, email, pass) => {
    const {data} = await $host.post('user/userReg', {
        login: login,
        email: email,
        pass: pass
    })
    localStorage.setItem('token', data.accessToken)
    return jwtDecode(data.accessToken)
}

export const loginServ = async (login, pass) => {
    const {data} = await $host.post('user/userLogin', {
        login: login,
        pass: pass
    })
    localStorage.setItem('token', data.accessToken)
    return jwtDecode(data.accessToken)
}

export const check = async () => {
    if(localStorage.getItem('token')){
        const {data} = await $authHost.get('/user/auth')
        localStorage.setItem('token', data.accessToken)
        return jwtDecode(data.accessToken)
    }else{
        return null
    }
}

export const selectData = async (param) => {
    const data = await $authHost.get('/user/selectDataAboutMe?param=' + param)
    return data.data
}

export const selectUsersTypes = async () => {
    const data = await $authHost.get('/user/selectUsersTypes')
    return data.data
}

export const updateUserStatusAct = async (id, status) => {
    const data = await $authHost.post('user/updateUserStatus', {
        id: id,
        status: status
    })
    return data
}

export const updateUserProbAct = async (id, prob) => {
    const data = await $authHost.post('user/updateUserProb', {
        id: id,
        prob: prob
    })
    return data
}

export const fatchUsers = async (limit = 20, page = 1) => {
    const users = await $authHost.get('/user/selectUsers?limit=' + limit + '&page=' + page)
    return users
}

export const deleteUser = async (id) => {
    const status = await $authHost.delete('/user/deleteUser', {
        data:{
            user_id: id
        }
    })
    return status
}

export const selectUsersStaffAct = async () => {
    const users = await $authHost.get('/user/selectUsersStaff')
    return users.data
}