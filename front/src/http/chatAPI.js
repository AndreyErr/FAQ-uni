import {$authHost} from "./index"

export const addDialogByClientAct = async (id, message, file) => {
    const data = await $authHost.post('chat/addDialogByClient', {
        id: id,
        message: message,
        file: file
    })
    return data.data
}

export const selectDialogs = async (userId, type, limit = 10, page = 0, flag = '') => {
    if(flag !== ''){
        flag = '&flag=' + flag
    }
    const data = await $authHost.get('chat/selectDialogs?userId=' + userId + '&type=' + type  + '&limit=' + limit + '&page=' + page + flag)
    return data.data
}

export const selectDialogAct = async (dialogid) => {
    const data = await $authHost.get('chat/selectDialog?dialogid=' + dialogid)
    return data.data
}

export const addMessageAct = async (dialogid, message, finFlag = 0, file = false) => {
    const data = await $authHost.post('chat/addMessage', {
        dialogid: dialogid,
        message: message,
        finFlag: finFlag,
        file: file
    })
    return data.data
}

export const selectMessagesAct = async (dialogid, limit = 10, page = 1) => {
    const data = await $authHost.get('chat/selectMessages?dialogid=' + dialogid + '&limit=' + limit + '&page=' + page)
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

export const updateDialogStatusAct = async (dialogid, status) => {
    const data = await $authHost.post('chat/updateDialogStatus', {
        dialogid: dialogid,
        status: status
    })
    return data.data
}

export const changeAnsUserAct = async (dialogid, ansuserid) => {
    const data = await $authHost.post('chat/changeAnsUser', {
        dialogid: dialogid,
        ansuserid: ansuserid
    })
    return data.data
}

export const fileUploadAct = async (file) => {
    const data = await $authHost.post('chat/fileUpload', file)
    return data.data
}