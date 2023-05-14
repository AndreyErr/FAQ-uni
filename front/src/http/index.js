import axios from "axios";

const $host = axios.create({
    baseURL: '***SERVERPASS***/api/'
})

const $authHost = axios.create({
    baseURL: '***SERVERPASS***/api/'
})

const authInterceptor = config => {
    config.headers.authorization = `AndreyErr ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}