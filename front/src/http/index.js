import axios from "axios";
import Cookies from 'js-cookie';

const $host = axios.create({
    baseURL: 'http://localhost:9000/'
})

const $authHost = axios.create({
    baseURL: 'http://localhost:9000/'
})

const authInterceptor = config => {
    config.headers.authInterceptor = `Bearer ${Cookies.get('accessToken')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}