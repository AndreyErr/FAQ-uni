import axios from "axios";

const $host = axios.create({
    baseURL: 'http://localhost:9000/api/'
})

const $authHost = axios.create({
    baseURL: 'http://localhost:9000/api/'
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