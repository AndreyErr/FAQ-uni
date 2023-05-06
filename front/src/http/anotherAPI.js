import {$authHost} from "./index"

export const selectConfigData = async () => {
    const data = await $authHost.get('user/selectConfigData')
    return data
}
