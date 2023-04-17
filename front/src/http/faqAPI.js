import {$authHost, $host} from "./index"
import jwtDecode from "jwt-decode"
import { useContext } from "react"
import { Context } from ".."

export const addTypeTitle = async (title) => {
    const data = await $authHost.post('faq/addTypeTitle', {
        title: title
    })
    return data.data
}

export const fatchTitles = async () => {
    const titles = await $authHost.get('faq/selectTypeTitle')
    return titles
}

export const deleteTypeTitle = async (id, typeOfDeleteAction) => {
    const status = await $authHost.delete('faq/deleteTypeTitle', {
        data:{
            id: id,
            typeOfDeleteAction: typeOfDeleteAction
        }
    })
    return status.data
}

export const addFaqAct = async (title, q, a) => {
    const data = await $authHost.post('faq/addFaq', {
        title: title,
        q: q,
        a: a
    })
    return data.data
}

export const selectAllAboutFaqTitle = async (id) => {
    if(isFinite(id)){
        return (await $host.get('faq/selectAllAboutFaqTitle?id=' + id)).data
    }else{
        return 'err'
    }
}

export const selectFaqsByType = async (id) => {
    if(isFinite(id)){
        return (await $host.get('faq/selectFaqsByType?id=' + id)).data
    }else{
        return 'err'
    }
}

export const selectAllFaqs = async (type = 'all', count = 5, sort = 'top', blockCount = 0, pageId = -1) => {
    if(isFinite(pageId) && isFinite(blockCount) && isFinite(pageId)){
        const data = await $host.get('faq/selectFaqsByType?type=' + type + '&count=' + count + '&sort=' + sort + '&blockCount=' + blockCount + '&pageId=' + pageId)
        return data.data
    }else{
        return 'err_title'
    }
}

export const deleteFaq = async (id) => {
    if(isFinite(id)){
        const status = await $authHost.delete('faq/deleteFaq', {
            data:{
                id: id
            }
        })
        return status
    }else{
        return 'err'
    }
}

export const updateFaqAct = async (id, title, q, a) => {
    const data = await $authHost.post('faq/updateFaq', {
        id: id,
        title: title,
        q: q,
        a: a
    })
    return data.data
}

export const saveLikeAct = async (id, type) => {
    const data = await $authHost.post('faq/saveLike', {
        id: id,
        type: type
    })
    return data.data
}

export const searchFaq = async (str, limit = 10) => {
    const result = await $host.get('faq/searchFaq?str=' + str + '&limit=' + limit)
    return result
}