import axios from "axios";

const $host = axios.create({
    baseURL: 'https://faq-server.onrender.com/api/'
})

const $authHost = axios.create({
    baseURL: 'https://faq-server.onrender.com/api/'
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