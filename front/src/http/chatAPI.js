import {$authHost, $host} from "./index"
import jwtDecode from "jwt-decode"
import { useContext } from "react"
import { Context } from ".."
import { io } from "socket.io-client"
import socket from "./socket"

export const addDialogByClientAct = async (id, message) => {
    const data = await $authHost.post('chat/addDialogByClient', {
        id: id,
        message: message
    })
    return data.data
}

export const selectDialogs = async (userId, type, flag = '') => {
    if(flag !== ''){
        flag = '&flag=' + flag
    }
    console.log('chat/selectDialogs?userId=' + userId + '&type=' + type + flag)
    const data = await $authHost.get('chat/selectDialogs?userId=' + userId + '&type=' + type + flag)
    return data.data
}

export const selectDialogAct = async (dialogid) => {
    const data = await $authHost.get('chat/selectDialog?dialogid=' + dialogid)
    return data.data
}

export const addMessageAct = async (dialogid, message, finFlag = 0) => {
    const data = await $authHost.post('chat/addMessage', {
        dialogid: dialogid,
        message: message,
        finFlag: finFlag
    })
    return data.data
}

export const selectMessagesAct = async (dialogid, limit = 10, page = 1) => {
    const data = await $authHost.get('chat/selectMessages?dialogid=' + dialogid + '&limit=' + limit + '&page=' + page)
    console.log(data.data)
    return data.data
}

export const setMessageReadAct = async (dialogid) => {
    const data = await $authHost.post('chat/setMessageRead', {
        dialogid: dialogid
    })
    return data.data
}

export const deleteDialogAct = async (dialogid) => {
    const data = await $authHost.delete('chat/deleteDialog', {
        data:{
            dialogid: dialogid
        }
    })
    return data.data
}