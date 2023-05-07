import axios from "axios";

const $host = axios.create({
    baseURL: 'xxx/api/'
})

const $authHost = axios.create({
    baseURL: 'xxx/api/'
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