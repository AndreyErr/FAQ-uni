import {$authHost, $host} from "./index"
import jwtDecode from "jwt-decode"
import { useContext } from "react"
import { Context } from ".."

export const selectConfigData = async () => {
    const data = await $host.get('user/selectConfigData')
    return data
}
